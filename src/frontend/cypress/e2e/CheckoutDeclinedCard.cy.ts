// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { getElementByField } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

const PRODUCT_NAME = 'National Park Foundation Explorascope';
const DECLINE_MESSAGE = 'Your payment could not be processed. Please check your card details and try again.';
// Matches the field's pattern, so the browser submits it, but fails the payment service's card check.
const INVALID_CARD = '1234-1234-1234-1234';
const cardNumberField = () => cy.get('input[placeholder="0000-0000-0000-0000"]');

describe('Checkout with a declined card', () => {
  it('keeps the cart after a declined card and places the order once the card is corrected', () => {
    cy.intercept('POST', '/api/checkout*').as('placeOrder');
    // The cart page leaves the rejected checkout request unhandled; only that rejection is tolerated.
    cy.on('uncaught:exception', err => !err.message.includes(DECLINE_MESSAGE));

    cy.log('Step 1: open the product from the home page');
    cy.visit('/');
    getElementByField(CypressFields.ProductCard).contains(PRODUCT_NAME).click();
    getElementByField(CypressFields.ProductAddToCart).should('be.visible');

    cy.log('Step 2: add it to the cart');
    getElementByField(CypressFields.ProductAddToCart).click();
    cy.location('pathname').should('eq', '/cart');
    cy.get(`img[alt="${PRODUCT_NAME}"]`).should('be.visible');

    cy.log('Step 3: place the order with a card that fails validation');
    cardNumberField().clear().type(INVALID_CARD);
    getElementByField(CypressFields.CheckoutPlaceOrder).click();
    cy.wait('@placeOrder').its('response.statusCode').should('eq', 422);
    cy.wait(4000);
    cy.location('pathname').should('eq', '/cart');
    cy.get(`img[alt="${PRODUCT_NAME}"]`).should('be.visible');

    cy.log('Step 4: correct the card and place the order again');
    cardNumberField().clear().type('4432-8015-6152-0454');
    getElementByField(CypressFields.CheckoutPlaceOrder).click();
    cy.wait('@placeOrder').then(({ response }) => {
      expect(response?.statusCode, 'second POST /api/checkout status').to.eq(200);
      const orderId = response?.body.orderId;
      expect(orderId, 'orderId of the checkout answer').to.be.a('string').and.not.be.empty;
      cy.location('pathname', { timeout: 15000 }).should('eq', `/cart/checkout/${orderId}`);

      cy.log('Step 5: read the confirmation page');
      cy.contains('Your order is complete!').should('be.visible');
      cy.contains(orderId).should('be.visible');
      cy.contains('Order Items').parent().should('contain', PRODUCT_NAME).and('contain', 'Quantity: 1');
    });
  });
});

export {};
