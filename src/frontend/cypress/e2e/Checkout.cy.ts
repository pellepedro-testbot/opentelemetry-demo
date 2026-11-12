// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { getElementByField } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

describe('Checkout Flow', () => {
  before(() => {
    cy.intercept('POST', '/api/cart*').as('addToCart');
    cy.intercept('GET', '/api/cart*').as('getCart');
    cy.intercept('POST', '/api/checkout*').as('placeOrder');
  });

  beforeEach(() => {
    cy.visit('/');
  });

  it('should create an order with two items', () => {
    getElementByField(CypressFields.ProductCard).first().click();
    getElementByField(CypressFields.ProductAddToCart).click();

    cy.wait('@addToCart');
    cy.wait('@getCart', { timeout: 10000 });
    cy.wait(2000);

    cy.location('href').should('match', /\/cart$/);
    getElementByField(CypressFields.CartItemCount).should('contain', '1');

    cy.visit('/');

    getElementByField(CypressFields.ProductCard).last().click();
    getElementByField(CypressFields.ProductAddToCart).click();

    cy.wait('@addToCart');
    cy.wait('@getCart', { timeout: 10000 });
    cy.wait(2000);

    cy.location('href').should('match', /\/cart$/);
    getElementByField(CypressFields.CartItemCount).should('contain', '2');

    getElementByField(CypressFields.CartIcon).click({ force: true });
    getElementByField(CypressFields.CartGoToShopping).click();

    cy.location('href').should('match', /\/cart$/);

    getElementByField(CypressFields.CheckoutPlaceOrder).click();

    cy.wait('@placeOrder');

    cy.location('href').should('match', /\/checkout/);
    getElementByField(CypressFields.CheckoutItem).should('have.length', 2);
  });

  it('should show one confirmation row per ordered item with its name, quantity and price', () => {
    const userId = `cypress-confirmation-${Date.now()}`;
    const productIds = ['0PUK6V6EV0', '66VCHSJNUP'];
    cy.intercept('POST', '/api/checkout*').as('confirmOrder');

    productIds.forEach(productId => {
      cy.request('POST', '/api/cart', { userId, item: { productId, quantity: 1 } });
    });
    cy.visit('/cart', {
      onBeforeLoad(win) {
        win.localStorage.setItem('session', JSON.stringify({ userId, currencyCode: 'USD' }));
      },
    });
    getElementByField(CypressFields.CartItemCount).should('contain', '2');

    getElementByField(CypressFields.CheckoutPlaceOrder).click();
    cy.wait('@confirmOrder');
    cy.location('pathname').should('match', /^\/cart\/checkout\//);

    getElementByField(CypressFields.CheckoutItem).should('have.length', 2);
    productIds.forEach(productId => {
      cy.request(`/api/products/${productId}?currencyCode=USD`).then(({ body: product }) => {
        getElementByField(CypressFields.CheckoutItem)
          .filter(`:contains("${product.name}")`)
          .should('have.length', 1)
          .and('contain', 'Quantity: 1')
          .find(`[data-cy="${CypressFields.ProductPrice}"]`)
          .should(
            'have.text',
            `$ ${(Number(product.priceUsd.units) + (product.priceUsd.nanos || 0) / 1e9).toFixed(2)}`
          );
      });
    });
  });
});

export {};
