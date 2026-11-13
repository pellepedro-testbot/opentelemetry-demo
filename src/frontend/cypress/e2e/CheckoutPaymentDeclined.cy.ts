// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { FLAG_RELOAD_MS, getElementByField, setFlag } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

const PRODUCT_NAME = 'Solar System Color Imager';
const DECLINE_MESSAGE = 'Your payment could not be processed. Please check your card details and try again.';

describe('Checkout with a declined card', () => {
  before(() => {
    setFlag('paymentFailure', '100%');
    cy.wait(FLAG_RELOAD_MS);
  });

  after(() => {
    setFlag('paymentFailure', 'off');
  });

  it('keeps the shopper on the cart with the item when the payment is declined', () => {
    const pageErrors: string[] = [];
    cy.on('uncaught:exception', err => {
      pageErrors.push(err.message);
      return !err.message.includes(DECLINE_MESSAGE);
    });
    cy.intercept('POST', '/api/checkout*').as('placeOrder');

    cy.log('Step 1: open the shop and the product');
    cy.visit('/');
    cy.contains(`[data-cy="${CypressFields.ProductCard}"]`, PRODUCT_NAME).click();
    getElementByField(CypressFields.ProductName).should('have.text', PRODUCT_NAME);

    cy.log('Step 2: add it to the cart');
    getElementByField(CypressFields.ProductAddToCart).click();
    cy.location('pathname').should('eq', '/cart');
    getElementByField(CypressFields.CartItemCount).should('have.text', '1');

    cy.log('Step 3: place the order');
    getElementByField(CypressFields.CheckoutPlaceOrder).click();
    cy.wait('@placeOrder').then(({ response }) => {
      expect(response?.statusCode).to.eq(422);
      expect(response?.body).to.deep.eq({ error: DECLINE_MESSAGE, code: 'PAYMENT_FAILED' });
    });
    cy.wait(1000);
    cy.location('pathname').should('eq', '/cart');
    cy.location('href').should('not.contain', '/cart/checkout/');
    cy.contains('Shopping Cart').should('be.visible');
    getElementByField(CypressFields.CheckoutPlaceOrder).should('be.visible');
    cy.get('main').should('contain', PRODUCT_NAME);
    cy.wrap(pageErrors).should(errors => {
      expect(errors).to.have.length(1);
      expect(errors[0]).to.contain(DECLINE_MESSAGE);
    });

    cy.log('Step 4: reload the cart');
    cy.reload();
    cy.get('main').should('contain', PRODUCT_NAME);
    getElementByField(CypressFields.CartItemCount).should('have.text', '1');
  });
});

export {};
