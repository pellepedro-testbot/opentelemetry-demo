// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { CypressFields } from './enums/CypressFields';

export { CypressFields };

export const getElementByField = (field: CypressFields, context: Cypress.Chainable = cy) =>
  context.get(`[data-cy="${field}"]`);

export const getProductCardByName = (name: string) => cy.contains(`[data-cy="${CypressFields.ProductCard}"]`, name);

export const getCartRow = (productId: string) =>
  cy
    .get('div')
    .filter(
      (_, el) =>
        [...el.children].some(child => child.getAttribute('href') === `/product/${productId}`) &&
        el.querySelector('select') !== null
    );

export const getPriceRow = (label: string) =>
  cy
    .get('div')
    .filter(
      (_, el) =>
        [...el.children].some(child => child.textContent?.trim() === label) &&
        el.querySelector(`[data-cy="${CypressFields.ProductPrice}"]`) !== null
    );

export const getPriceInRow = (label: string) =>
  getPriceRow(label).find(`[data-cy="${CypressFields.ProductPrice}"]`);

export const priceValue = (text: string) => Number(text.replace(/[^0-9.]/g, ''));

export const addOpenProductToCart = () => {
  cy.intercept('POST', '/api/cart*').as('addToCart');
  getElementByField(CypressFields.ProductAddToCart).click();
  cy.wait('@addToCart');
  cy.location('pathname', { timeout: 15000 }).should('eq', '/cart');
};

export class StepChecks {
  private readonly failures: string[] = [];

  check(step: string, actual: unknown, expected: unknown) {
    Cypress.log({ name: 'check', message: `${step}: ${JSON.stringify(actual)}` });
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
      this.failures.push(`${step}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
    }
  }

  assertAll() {
    cy.then(() => expect(this.failures.join('; '), 'failed steps').to.equal(''));
  }
}
