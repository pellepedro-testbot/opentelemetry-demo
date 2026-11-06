// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

// Reads what the order pipeline leaves behind (collector debug output, container logs, the accounting
// database) through the docker task of cypress.config.ts, so it needs the docker CLI of the host running the demo.

import { addToCart, placeOrder, uniqueUserId, VISA_CARD_NUMBER } from '../../utils/CypressRequests';

const PRODUCT_ID = '66VCHSJNUP';

const docker = (args: string[], timeout = 60000) => cy.task<string>('docker', args, { log: false, timeout });

const dockerLogsSince = (container: string, since: string) => docker(['logs', '--since', since, container]);

const pollUntil = (
  read: () => Cypress.Chainable<string>,
  found: (out: string) => boolean,
  tries = 20
): Cypress.Chainable<string> =>
  read().then(out => {
    if (found(out) || tries <= 1) return cy.wrap(out);
    cy.wait(3000);
    return pollUntil(read, found, tries - 1);
  });

// Splits the debug exporter's output into log records, each starting at "LogRecord #n".
const logRecords = (out: string) => out.split(/\nLogRecord #\d+\n/);

const recordAttribute = (record: string, key: string) => {
  // Matches an attribute line of the debug exporter: "-> key: Type(value)".
  const match = record.match(new RegExp(`-> ${key.replace(/\./g, '\\.')}: \\w+\\(([^)]*)\\)`));
  return match ? match[1] : undefined;
};

const now = () => new Date(Date.now() - 2000).toISOString();

const orderWithFreshCart = (prefix: string, email?: string) => {
  const userId = uniqueUserId(prefix);
  addToCart(userId, PRODUCT_ID);
  return placeOrder(userId, { email }).then(({ status, body }) => {
    expect(status, JSON.stringify(body)).to.eq(200);
    return body;
  });
};

const curlInDemoNetwork = (url: string, body: unknown) =>
  docker([
    'run',
    '--rm',
    '--network',
    'opentelemetry-demo',
    'curlimages/curl:8.11.1',
    '-s',
    '-X',
    'POST',
    '-H',
    'content-type: application/json',
    '-d',
    JSON.stringify(body),
    url,
  ]);

describe('Order processing', () => {
  it('logs the order id on the order confirmation email record', () => {
    const since = now();
    const emailRecordsOf = (out: string) =>
      logRecords(out).filter(r => r.includes('Body: Str(order confirmation email sent)'));
    orderWithFreshCart('cypress-email-log').then(({ orderId }) => {
      pollUntil(
        () => dockerLogsSince('otel-collector', since),
        out => emailRecordsOf(out).some(r => r.includes(orderId))
      ).then(out => {
        const orderIds = emailRecordsOf(out).map(r => recordAttribute(r, 'demo.order.id'));
        expect(orderIds, 'demo.order.id of the order confirmation email records').to.include(orderId);
      });
    });
  });

  it('logs the user id and product id of an added cart item in their own fields', () => {
    const since = now();
    const userId = uniqueUserId('probe-user');
    addToCart(userId, PRODUCT_ID, 2);
    pollUntil(
      () => dockerLogsSince('otel-collector', since),
      out => out.includes(userId)
    ).then(out => {
      const record = logRecords(out).find(r => r.includes('EventName: cart.add_item') && r.includes(userId));
      expect(record, 'cart.add_item log record').to.not.equal(undefined);
      expect(recordAttribute(record!, 'userId')).to.eq(userId);
      expect(recordAttribute(record!, 'productId')).to.eq(PRODUCT_ID);
      expect(recordAttribute(record!, 'quantity')).to.eq('2');
    });
  });

  it('stores the full shipping cost of an order in accounting', () => {
    orderWithFreshCart('cypress-accounting').then(({ orderId, shippingCost }) => {
      const read = () =>
        docker([
          'exec',
          'astronomy-db',
          'psql',
          '-U',
          'postgres',
          '-d',
          'astronomy_db',
          '-tAc',
          `SELECT shipping_cost_units, shipping_cost_nanos FROM accounting.shipping WHERE order_id='${orderId}'`,
        ]).then(out => out.trim());
      pollUntil(read, row => row !== '').then(row => {
        expect(row, 'accounting.shipping row (units|nanos)').to.eq(`${shippingCost.units}|${shippingCost.nanos}`);
        expect(Number(shippingCost.nanos), 'the quote has cents').to.be.greaterThan(0);
      });
    });
  });

  it('reports the consumed order id in the fraud-detection log', () => {
    const since = now();
    orderWithFreshCart('cypress-fraud').then(({ orderId, shippingTrackingId }) => {
      pollUntil(
        () => dockerLogsSince('fraud-detection', since),
        out => out.includes(orderId) || out.includes(shippingTrackingId)
      ).then(out => {
        expect(out).to.include(`Consumed record with orderId: ${orderId}`);
      });
    });
  });

  it('keeps raw card and email values out of telemetry while emitRawPii is off', () => {
    const since = now();
    const email = `pii-probe-${Date.now()}@example.com`;
    cy.request('/feature/api/read').its('body.flags.emitRawPii.defaultVariant').should('eq', 'off');
    orderWithFreshCart('cypress-pii', email).then(({ orderId }) => {
      pollUntil(
        () => dockerLogsSince('otel-collector', since),
        out => out.includes(`demo.order.id: Str(${orderId})`)
      ).then(out => {
        expect(out).to.include(orderId);
        expect(out).to.not.include(VISA_CARD_NUMBER);
        expect(out).to.not.include(email);
      });
    });
  });

  describe('shipping quote from the quote service', () => {
    const shippingUrl = Cypress.expose('SHIPPING_URL') || 'http://shipping:50050';
    const quoteUrl = Cypress.expose('QUOTE_URL') || 'http://quote:8090';
    const address = {
      street_address: '1600 Amphitheatre Parkway',
      city: 'Mountain View',
      state: 'CA',
      country: 'USA',
      zip_code: '94043',
    };

    [28, 29, 30, 35].forEach(count => {
      it(`keeps the cents of the quote for ${count} distinct items`, () => {
        curlInDemoNetwork(`${quoteUrl}/getquote`, { numberOfItems: count }).then(quoteText => {
          const quoteCents = Math.round(parseFloat(quoteText) * 100);
          const items = Array.from({ length: count }, (_, i) => ({ product_id: `p${i}`, quantity: 1 }));
          curlInDemoNetwork(`${shippingUrl}/get-quote`, { items, address }).then(shippingText => {
            const { cost_usd } = JSON.parse(shippingText);
            expect(cost_usd.currency_code).to.eq('USD');
            expect(cost_usd.units, `units for quote ${quoteText}`).to.eq(Math.floor(quoteCents / 100));
            expect(cost_usd.nanos, `nanos for quote ${quoteText}`).to.eq((quoteCents % 100) * 10_000_000);
          });
        });
      });
    });
  });
});

export {};
