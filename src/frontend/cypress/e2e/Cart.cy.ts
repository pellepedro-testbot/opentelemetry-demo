// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { getElementByField, getPagePrices, toAmounts } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

const near = (actual: number, expected: number) => Math.abs(actual - expected) <= 0.011;

describe('Cart Page', () => {
  it('shows unit price times quantity in the Total column of a cart line', () => {
    cy.intercept('POST', '/api/cart*').as('addToCart');
    cy.intercept('GET', '/api/cart*').as('getCart');

    cy.visit('/product/66VCHSJNUP');
    getElementByField(CypressFields.ProductName).should('not.be.empty');
    getElementByField(CypressFields.ProductQuantity).select('3');
    getElementByField(CypressFields.ProductAddToCart).click();
    cy.wait('@addToCart');
    cy.location('pathname').should('eq', '/cart');

    // With one product line, the first two prices are the line's Price and Total columns.
    cy.get('main select')
      .filter((_, el) => (el as HTMLSelectElement).value === '3')
      .should('have.length', 1);
    getPagePrices()
      .should($prices => expect(toAmounts($prices)[0]).to.be.greaterThan(0))
      .then($prices => {
        const [price, total] = toAmounts($prices);
        expect(near(total, 3 * price), `Total ${total} for 3 x Price ${price}`).to.eq(true);
      });

    cy.get('main select')
      .filter((_, el) => (el as HTMLSelectElement).value === '3')
      .select('2');
    cy.wait('@getCart');
    cy.get('main select')
      .filter((_, el) => (el as HTMLSelectElement).value === '2')
      .should('have.length', 1);
    getPagePrices().should($prices => {
      const [price, total] = toAmounts($prices);
      expect(near(total, 2 * price), `Total ${total} for 2 x Price ${price}`).to.eq(true);
    });
  });
});

export {};
