// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { CypressFields } from './enums/CypressFields';

export { CypressFields };

export const getElementByField = (field: CypressFields, context: Cypress.Chainable = cy) =>
  context.get(`[data-cy="${field}"]`);

// Strips the currency symbol and spaces from a rendered price ("$ 21.95" -> 21.95).
export const priceAmount = (text: string) => Number(text.replace(/[^0-9.]/g, ''));

// Cart lines and the Shipping / Total rows carry no data-cy; their styled-components class names identify them.
export const getCartLine = (productName: string) =>
  cy.contains('[class*="CartItems-styled__CartItem-sc"]', productName);

export const getCartSummaryRow = (label: 'Shipping' | 'Total') =>
  cy.contains('[class*="CartItems-styled__DataRow"]', label);

// Collects failed checks of a journey so one failed step does not hide the steps after it.
export const createStepChecks = () => {
  const failures: string[] = [];

  return {
    check(ok: boolean, message: string) {
      if (!ok) failures.push(message);
    },
    assertAll() {
      cy.then(() => expect(failures.join('\n'), 'failed journey checks').to.equal(''));
    },
  };
};

// The order confirmation's Order ID, Shipping and Total rows, by their styled-components class names.
export const getOrderSummaryRow = (label: 'Order ID:' | 'Shipping:' | 'Total:') =>
  cy.contains(
    '[class*="Checkout-styled__OrderInfo-sc"], [class*="Checkout-styled__SummaryRow-sc"], [class*="Checkout-styled__TotalRow-sc"]',
    label
  );
