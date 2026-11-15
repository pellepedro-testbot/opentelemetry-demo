// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { createStepLogger, getElementByField, setFlagDefaultVariant } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

const PRODUCT_NAME = 'Roof Binoculars';
const DECLINE_MESSAGE = 'Your payment could not be processed. Please check your card details and try again.';

const step = createStepLogger();

describe('Release 3.1.0 declined payment in the cart', () => {
  after(() => {
    setFlagDefaultVariant('paymentFailure', 'off');
  });

  it('keeps the user on the cart with the item when the card is declined', () => {
    cy.intercept('POST', '/api/checkout*').as('placeOrder');
    cy.on('uncaught:exception', error => !error.message.includes(DECLINE_MESSAGE));

    step('Step 1: decline every payment, then open a product from the home page', () => {
      setFlagDefaultVariant('paymentFailure', '100%');
      cy.wait(4000);
      cy.visit('/');
      cy.contains(`[data-cy="${CypressFields.ProductCard}"]`, PRODUCT_NAME).click();
      getElementByField(CypressFields.ProductDetail).should('be.visible');
    });

    step('Step 2: add the product to the cart', () => {
      getElementByField(CypressFields.ProductAddToCart).click();
      cy.location('pathname', { timeout: 15000 }).should('eq', '/cart');
    });

    step('Step 3: place the order', () => {
      getElementByField(CypressFields.CheckoutPlaceOrder).click();
      cy.wait('@placeOrder').then(({ response }) => {
        expect(response?.statusCode).to.eq(422);
        expect(response?.body).to.deep.eq({
          error: DECLINE_MESSAGE,
          code: 'PAYMENT_FAILED',
        });
      });
      cy.wait(3000);
      cy.location('pathname').should('eq', '/cart');
      cy.contains('Shopping Cart').should('be.visible');
      cy.contains(PRODUCT_NAME).should('be.visible');
    });

    step('Step 4: restore payments and reload the cart', () => {
      setFlagDefaultVariant('paymentFailure', 'off');
      cy.reload();
      getElementByField(CypressFields.CheckoutPlaceOrder).should('be.visible');
      cy.contains(PRODUCT_NAME).should('be.visible');
      getElementByField(CypressFields.CartItemCount).should('contain', '1');
      cy.location('pathname').should('eq', '/cart');
    });
  });
});

export {};
