// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { getElementByField } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

describe('Empty the cart', () => {
  it('empties the cart and it stays empty after a reload', () => {
    cy.intercept('DELETE', '/api/cart*').as('emptyCart');

    cy.log('Step 1: add a product to the cart');
    cy.visit('/');
    getElementByField(CypressFields.ProductCard).first().click();
    getElementByField(CypressFields.ProductAddToCart).click();
    cy.location('pathname').should('eq', '/cart');
    getElementByField(CypressFields.CartItemCount).should('have.text', '1');

    cy.log('Step 2: empty the cart');
    cy.contains('button', 'Empty Cart').click();
    cy.wait('@emptyCart').its('response.statusCode').should('eq', 204);
    cy.get('main').should('contain', 'Your shopping cart is empty');
    getElementByField(CypressFields.CartItemCount).should('not.exist');

    cy.log('Step 3: reload the cart');
    cy.reload();
    cy.get('main').should('contain', 'Your shopping cart is empty');
  });
});

export {};
