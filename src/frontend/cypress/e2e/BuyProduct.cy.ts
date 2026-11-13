// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { getElementByField } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

const PRODUCT_NAME = 'Solar System Color Imager';

describe('Buy a product', () => {
  it('buys one Solar System Color Imager and gets an order confirmation', () => {
    cy.intercept('POST', '/api/checkout*').as('placeOrder');

    cy.log('Step 1: open the shop home page');
    cy.visit('/');
    getElementByField(CypressFields.ProductCard).should('have.length', 10);
    cy.contains('footer div', /^local$/).should('exist');

    cy.log('Step 2: open the product page');
    cy.contains(`[data-cy="${CypressFields.ProductCard}"]`, PRODUCT_NAME).click();
    getElementByField(CypressFields.ProductName).should('have.text', PRODUCT_NAME);
    getElementByField(CypressFields.ProductPicture).should('be.visible');
    getElementByField(CypressFields.RecommendationList).should('be.visible');

    cy.log('Step 3: add one to the cart');
    getElementByField(CypressFields.ProductAddToCart).click();
    cy.location('pathname').should('eq', '/cart');
    getElementByField(CypressFields.CartItemCount).should('have.text', '1');
    cy.contains('span', 'Shipping').parent().should('contain', '8.99');

    cy.log('Step 4: place the order');
    getElementByField(CypressFields.CheckoutPlaceOrder).click();
    cy.wait('@placeOrder').its('response.statusCode').should('eq', 200);
    cy.contains('Your order is complete!').should('be.visible');
    cy.get('main').should('contain', PRODUCT_NAME).and('contain', 'Quantity: 1');
    cy.get(`img[alt="${PRODUCT_NAME}"]`).should($img => {
      expect($img.attr('src')).to.match(/^\/images\/products\//);
      expect(($img[0] as HTMLImageElement).naturalWidth).to.be.greaterThan(0);
    });
    cy.get('main').invoke('text').should('contain', '8.99').and('contain', '183.99');

    cy.log('Step 5: continue shopping, then the cart is empty');
    cy.contains('button', 'Continue Shopping').click();
    cy.location('pathname').should('eq', '/');
    getElementByField(CypressFields.ProductCard).should('have.length', 10);
    getElementByField(CypressFields.CartIcon).click({ force: true });
    getElementByField(CypressFields.CartGoToShopping).click();
    cy.location('pathname').should('eq', '/cart');
    cy.get('main').should('contain', 'Your shopping cart is empty');
    cy.reload();
    cy.get('main').should('contain', 'Your shopping cart is empty');
  });
});

export {};
