// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import {
  getCartSummaryPrice,
  getConfirmationItemPrice,
  getConfirmationPrice,
  getElementByField,
  getProductCard,
  priceAmount,
} from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

const PRODUCT_ID = '0PUK6V6EV0';

const addProductFromProductPage = () => {
  cy.intercept('POST', '/api/cart*').as('addToCart');
  getProductCard(PRODUCT_ID).click();
  getElementByField(CypressFields.ProductAddToCart).click();
  cy.wait('@addToCart');
  cy.location('pathname').should('eq', '/cart');
};

const amountIn = ($el: JQuery<HTMLElement>) => priceAmount($el.text());

describe('Checkout confirmation', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/checkout*').as('placeOrder');
  });

  it('shows the CAD shipping estimate of the cart and a matching total', () => {
    cy.visit('/');
    getElementByField(CypressFields.CurrencySwitcher).select('CAD');
    getElementByField(CypressFields.CurrencySwitcher).should('have.value', 'CAD');
    addProductFromProductPage();

    getCartSummaryPrice('Shipping')
      .should($price => expect(amountIn($price)).to.be.greaterThan(0))
      .then(amountIn)
      .then(cartShipping => {
        getElementByField(CypressFields.CheckoutPlaceOrder).click();
        cy.wait('@placeOrder');
        cy.location('pathname').should('match', /^\/cart\/checkout\//);
        cy.contains('Your order is complete!');

        getConfirmationPrice('Shipping:').should($price => expect(amountIn($price)).to.be.closeTo(cartShipping, 0.01));
        getConfirmationItemPrice(1)
          .then(amountIn)
          .then(itemTotal => {
            getConfirmationPrice('Total:').should($price =>
              expect(amountIn($price)).to.be.closeTo(itemTotal + cartShipping, 0.01)
            );
          });
      });
  });

  it('completes an order paid with a card that expires this month', () => {
    const now = new Date();
    cy.visit('/');
    addProductFromProductPage();

    cy.get('#credit_card_expiration_month').select(String(now.getMonth() + 1));
    cy.get('#credit_card_expiration_year').select(String(now.getFullYear()));
    getElementByField(CypressFields.CheckoutPlaceOrder).click();

    cy.wait('@placeOrder').its('response.statusCode').should('eq', 200);
    cy.location('pathname').should('match', /^\/cart\/checkout\/[^/]+$/);
    cy.contains('Your order is complete!');
  });
});

export {};
