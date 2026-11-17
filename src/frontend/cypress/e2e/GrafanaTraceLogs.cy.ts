// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

const DEMO_DASHBOARD = '/grafana/d/W2gX2zHVk/demo-dashboard';
const LOAD_FAILURE = 'Grafana has failed to load its application files';

const hex = (length: number) => Array.from({ length }, () => Math.floor(Math.random() * 16).toString(16)).join('');

const placeTracedOrder = (traceId: string) => {
  const userId = `cypress-grafana-${traceId}`;
  cy.request('POST', '/api/cart', { userId, item: { productId: 'OLJCESPC7Z', quantity: 1 } });
  return cy.request({
    method: 'POST',
    url: '/api/checkout?currencyCode=USD',
    headers: { traceparent: `00-${traceId}-${hex(16)}-01` },
    body: {
      userId,
      userCurrency: 'USD',
      email: 'cypress-grafana@example.com',
      address: {
        streetAddress: '1600 Amphitheatre Parkway',
        city: 'Mountain View',
        state: 'CA',
        country: 'United States',
        zipCode: '94043',
      },
      creditCard: {
        creditCardNumber: '4432-8015-6152-0454',
        creditCardCvv: 672,
        creditCardExpirationYear: new Date().getFullYear() + 1,
        creditCardExpirationMonth: 1,
      },
    },
  });
};

const dashboardUrl = (traceId: string) =>
  `${DEMO_DASHBOARD}?orgId=1&var-service=All&var-traceId=${traceId}&from=now-15m&to=now`;

describe('Demo dashboard logs by trace id', () => {
  it("lists only the log records of one checkout's trace", () => {
    const traceA = hex(32);
    const traceB = hex(32);

    cy.log('Step 1: place two orders with known trace ids');
    placeTracedOrder(traceA).its('status').should('eq', 200);
    placeTracedOrder(traceB).its('status').should('eq', 200);
    cy.wait(20000);

    cy.log('Step 2: open the dashboard filtered by the first trace id');
    cy.visit(dashboardUrl(traceA));
    cy.get('body', { timeout: 30000 }).should('not.contain', LOAD_FAILURE);
    cy.get('input#var-traceId', { timeout: 30000 }).should('have.value', traceA);
    cy.contains('Log Records (100 recent entries)', { timeout: 30000 })
      .closest('section')
      .within(() => {
        cy.get('[role="row"]', { timeout: 30000 }).should('have.length.greaterThan', 1);
        cy.get('[role="cell"]').filter(`:contains("${traceA}")`).should('have.length.greaterThan', 0);
        cy.get('[role="cell"]').filter(`:contains("${traceB}")`).should('have.length', 0);
      });
  });

  it('opens without restarting Grafana', () => {
    const traceId = hex(32);
    placeTracedOrder(traceId).its('status').should('eq', 200);
    cy.visit(dashboardUrl(traceId));
    cy.contains('Log Records (100 recent entries)', { timeout: 30000 }).should('be.visible');
    cy.get('body').should('not.contain', LOAD_FAILURE);
  });
});

export {};
