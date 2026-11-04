// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { addItemToCart, placeOrder, uniqueUserId } from '../../utils/CypressStoreApi';

const POLL_INTERVAL_MS = 2000;

const pollTask = (
  task: string,
  arg: unknown,
  done: (output: string) => boolean,
  attempts = 15
): Cypress.Chainable<string> =>
  cy.task<string>(task, arg, { log: false }).then(output => {
    if (done(output) || attempts <= 1) return cy.wrap(output);
    cy.wait(POLL_INTERVAL_MS);
    return pollTask(task, arg, done, attempts - 1);
  });

const pollLogs = (container: string, done: (output: string) => boolean) =>
  pollTask('containerLogs', { container, since: '60s' }, done);

const placeUsdOrder = (prefix: string) => {
  const userId = uniqueUserId(prefix);
  addItemToCart(userId, '0PUK6V6EV0', 1);
  return placeOrder(userId, 'USD').then(({ status, body }) => {
    expect(status).to.eq(200);
    return body as { orderId: string; shippingTrackingId: string };
  });
};

describe('Records kept by the backend services', () => {
  it('logs the order id on the order confirmation email record of checkout', () => {
    placeUsdOrder('cypress-email-log').then(({ orderId }) => {
      pollLogs('otel-collector', out => out.includes(`demo.order.id: Str(${orderId})`)).then(
        out => {
          const records = out.split('LogRecord #');
          const emailRecord = records.find(
            r => r.includes('Body: Str(order confirmation email sent)') && r.includes(`demo.order.id: Str(${orderId})`)
          );
          expect(emailRecord, `order confirmation email sent record with demo.order.id ${orderId}`).to.not.equal(undefined);
        }
      );
    });
  });

  it('logs the user id and product id in their own fields when an item is added to the cart', () => {
    const userId = uniqueUserId('log-user');
    addItemToCart(userId, '66VCHSJNUP', 1);

    pollLogs('cart', out => out.includes(userId)).then(out => {
      const line = out.split('\n').find(l => l.includes('AddItemAsync called with') && l.includes(userId));
      expect(line).to.contain(`AddItemAsync called with userId=${userId}, productId=66VCHSJNUP, quantity=1`);
    });
  });

  it('stores the full shipping cost of an order in accounting', () => {
    placeUsdOrder('cypress-accounting').then(({ shippingTrackingId }) => {
      const query = `SELECT shipping_cost_units || '|' || shipping_cost_nanos FROM accounting.shipping WHERE shipping_tracking_id='${shippingTrackingId}'`;
      pollTask('accountingQuery', query, out => out.trim() !== '').then(out => {
        expect(out.trim()).to.eq('8|990000000');
      });
    });
  });

  it('logs the order id of each order fraud detection consumes', () => {
    placeUsdOrder('cypress-fraud-log').then(({ orderId, shippingTrackingId }) => {
      pollLogs(
        'fraud-detection',
        out => out.includes(orderId) || out.includes(shippingTrackingId)
      ).then(out => {
        expect(out).to.contain(`Consumed record with orderId: ${orderId}`);
      });
    });
  });
});

export {};
