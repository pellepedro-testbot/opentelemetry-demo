// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { CypressFields } from './enums/CypressFields';

export { CypressFields };

export const getElementByField = (field: CypressFields, context: Cypress.Chainable = cy) =>
  context.get(`[data-cy="${field}"]`);

export interface IStoredSession {
  userId?: unknown;
  currencyCode?: unknown;
}

export const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

export const readStoredSession = (win: Window): IStoredSession | null => {
  try {
    return JSON.parse(win.localStorage.getItem('session') || 'null');
  } catch {
    return null;
  }
};

export const parsePrice = (text: string) => Number(text.replace(/[^0-9.]/g, ''));

export const formatPrice = (symbol: string, amount: number) => `${symbol} ${amount.toFixed(2)}`;

// Collects failed checks of a journey so a failing step does not hide the steps after it.
export const createStepChecks = () => {
  const failures: string[] = [];

  return {
    check(step: number, ok: boolean, message: string) {
      if (!ok) failures.push(`step ${step}: ${message}`);
    },
    assertAll() {
      cy.then(() => expect(failures, failures.join('\n')).to.be.empty);
    },
  };
};

export const emptyStoredCart = () =>
  cy.window().then(win => {
    const session = readStoredSession(win);
    if (typeof session?.userId === 'string' && session.userId) {
      cy.request({ method: 'DELETE', url: '/api/cart', body: { userId: session.userId }, failOnStatusCode: false });
    }
  });

export const cartSection = () => cy.contains('section', 'Quantity');

export const cartRow = (productName: string) => cartSection().children('div').filter(`:contains("${productName}")`);

// The cart header labels (Product, Quantity, Price, Total) name the cells of each cart row in the same order.
export const cartCell = (productName: string, column: string) =>
  cartSection()
    .find('label')
    .then($labels => {
      const index = [...$labels].findIndex(label => label.textContent?.trim() === column);
      expect(index, `cart column "${column}"`).to.be.greaterThan(-1);
      return cartRow(productName).children().eq(index);
    });
