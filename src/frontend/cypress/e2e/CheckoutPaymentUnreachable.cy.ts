// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { getElementByField } from '../../utils/Cypress';
import { setFlagVariant } from '../../utils/CypressFlagd';
import { CypressFields } from '../../utils/enums/CypressFields';

const PRODUCT_NAME = 'The Comet Book';

describe('Checkout while payment is unreachable', () => {
  before(() => setFlagVariant('paymentUnreachable', 'on'));
  after(() => setFlagVariant('paymentUnreachable', 'off'));

  it('answers 500 and keeps the shopper on the cart with the product', () => {
    cy.intercept('POST', '/api/checkout*').as('placeOrder');
    // The cart page leaves the rejected checkout request unhandled; only that rejection is tolerated.
    cy.on('uncaught:exception', err => !err.message.includes('Failed to place order.'));

    cy.log('Step 1: open the product from the home page');
    cy.visit('/');
    getElementByField(CypressFields.ProductCard).contains(PRODUCT_NAME).click();
    getElementByField(CypressFields.ProductAddToCart).should('be.visible');

    cy.log('Step 2: add it to the cart');
    getElementByField(CypressFields.ProductAddToCart).click();
    cy.location('pathname').should('eq', '/cart');
    cy.get(`img[alt="${PRODUCT_NAME}"]`).should('be.visible');

    cy.log('Step 3: place the order with the default card');
    getElementByField(CypressFields.CheckoutPlaceOrder).click();
    cy.wait('@placeOrder').then(({ response }) => {
      expect(response?.statusCode, 'POST /api/checkout status').to.eq(500);
      expect(response?.body, 'POST /api/checkout body').to.deep.eq({ error: 'Failed to place order.' });
    });
    cy.wait(2000);
    cy.location('pathname').should('eq', '/cart');
    cy.get(`img[alt="${PRODUCT_NAME}"]`).should('be.visible');
  });
});

export {};
