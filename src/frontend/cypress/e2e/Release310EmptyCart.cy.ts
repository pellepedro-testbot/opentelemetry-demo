// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { createStepLogger, getElementByField } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

const PRODUCT_NAME = 'Roof Binoculars';

const step = createStepLogger();

describe('Release 3.1.0 empty cart', () => {
  it('empties the shopping cart and keeps it empty after a reload', () => {
    cy.intercept('DELETE', '/api/cart*').as('emptyCart');

    step('Step 1: add a product to the cart', () => {
      cy.visit('/');
      cy.contains(`[data-cy="${CypressFields.ProductCard}"]`, PRODUCT_NAME).click();
      getElementByField(CypressFields.ProductAddToCart).click();
      cy.location('pathname', { timeout: 15000 }).should('eq', '/cart');
      cy.contains(PRODUCT_NAME).should('be.visible');
    });

    step('Step 2: empty the cart', () => {
      cy.contains('button', 'Empty Cart').click();
      cy.wait('@emptyCart').its('response.statusCode').should('eq', 204);
      cy.contains('Your shopping cart is empty!').should('be.visible');
      getElementByField(CypressFields.CheckoutPlaceOrder).should('not.exist');
    });

    step('Step 3: reload the cart', () => {
      cy.reload();
      cy.contains('Your shopping cart is empty!').should('be.visible');
      cy.contains(PRODUCT_NAME).should('not.exist');
    });
  });
});

export {};
