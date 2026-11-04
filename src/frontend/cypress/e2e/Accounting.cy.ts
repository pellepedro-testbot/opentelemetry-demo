// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { addToCart, newUserId, placeOrder } from '../../utils/CypressStoreApi';

// Reads the accounting tables of the demo database through the astronomy-db container,
// so this spec needs a docker CLI that reaches the running demo.
const sql = (query: string) =>
  cy
    .task<{ code: number; stdout: string; stderr: string }>('docker', [
      'exec',
      'astronomy-db',
      'psql',
      '-U',
      'postgres',
      '-d',
      'astronomy_db',
      '-tAc',
      query,
    ])
    .then(({ code, stdout, stderr }) => {
      expect(code, stderr).to.eq(0);
      return stdout.trim();
    });

const pollRow = (query: string, timeout = 60000): Cypress.Chainable<string> => {
  let deadline = 0;
  const poll = (): Cypress.Chainable<string> =>
    sql(query).then(row => {
      if (row) return cy.wrap(row);
      if (Date.now() > deadline) throw new Error(`no row within ${timeout} ms for: ${query}`);
      return cy.wait(2000, { log: false }).then(poll);
    });
  return cy
    .then(() => {
      deadline = Date.now() + timeout;
    })
    .then(poll);
};

const placeTelescopeOrder = () => {
  const userId = newUserId('cypress-accounting');
  addToCart(userId, '66VCHSJNUP');
  return placeOrder({ userId }).then(({ status, body }) => {
    expect(status).to.eq(200);
    return body;
  });
};

describe('Accounting', () => {
  it('stores the shipping cost with its cents', () => {
    placeTelescopeOrder().then(order => {
      expect(order.shippingCost.nanos, 'shipping cost of the order has cents').not.to.eq(0);
      pollRow(
        `select shipping_cost_units || '|' || shipping_cost_nanos from accounting.shipping where shipping_tracking_id = '${order.shippingTrackingId}'`
      ).should('eq', `${order.shippingCost.units}|${order.shippingCost.nanos}`);
    });
  });
});

export {};
