// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import {
  createSoftChecks,
  getElementByField,
  requestShippingQuote,
  visiblePrices,
  waitForCartShipping,
} from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

const TELESCOPE = { id: '66VCHSJNUP', name: 'Starsense Explorer Refractor Telescope' };

const addTelescopeToCart = (quantity: number) => {
  cy.intercept('GET', '/api/cart*').as('getCart');
  cy.visit('/');
  cy.contains(`[data-cy="${CypressFields.ProductCard}"]`, TELESCOPE.name).click();
  getElementByField(CypressFields.ProductQuantity).select(String(quantity));
  getElementByField(CypressFields.ProductAddToCart).click();
  cy.location('pathname').should('eq', '/cart');
  cy.wait('@getCart');
};

describe('Cart line totals', () => {
  it('shows quantity times unit price as the line total', () => {
    cy.request(`/api/products/${TELESCOPE.id}?currencyCode=USD`).then(({ body }) => {
      const unitCents = body.priceUsd.units * 100 + Math.round(body.priceUsd.nanos / 1e7);
      const unit = `$ ${(unitCents / 100).toFixed(2)}`;
      const lineTotal = `$ ${((unitCents * 3) / 100).toFixed(2)}`;

      addTelescopeToCart(3);
      cy.contains('main p', TELESCOPE.name).should('be.visible');
      requestShippingQuote([{ productId: TELESCOPE.id, quantity: 3 }], 'USD').then(waitForCartShipping);

      visiblePrices().then(prices => {
        expect(prices).to.include(unit);
        expect(prices).to.include(lineTotal);
      });
    });
  });
});

describe('Buying three telescopes', () => {
  it('shows the line total in the cart and on the order confirmation', () => {
    const soft = createSoftChecks();

    cy.log('Step 1: open the telescope from the home page');
    cy.visit('/');
    cy.contains(`[data-cy="${CypressFields.ProductCard}"]`, TELESCOPE.name).click();
    getElementByField(CypressFields.ProductPicture).should('be.visible');

    cy.log('Step 2: add three to the cart');
    cy.intercept('GET', '/api/cart*').as('getCart');
    getElementByField(CypressFields.ProductQuantity).select('3');
    getElementByField(CypressFields.ProductAddToCart).click();
    cy.location('pathname').should('eq', '/cart');
    cy.wait('@getCart');
    getElementByField(CypressFields.CartItemCount).should('have.text', '1');

    cy.log('Step 3: read the cart line');
    cy.contains('main p', TELESCOPE.name).should('be.visible');
    requestShippingQuote([{ productId: TELESCOPE.id, quantity: 3 }], 'USD').then(waitForCartShipping);
    visiblePrices().then(prices => {
      soft.check('step 3 unit price', () => expect(prices).to.include('$ 349.95'));
      soft.check('step 3 line total', () => expect(prices).to.include('$ 1049.85'));
      soft.check('step 3 cart total', () => expect(prices).to.include('$ 1058.84'));
    });
    cy.get(`main img[alt="${TELESCOPE.name}"]`).then($img => {
      soft.check('step 3 lazy image', () => expect($img).to.have.attr('loading', 'lazy'));
    });

    cy.log('Step 4: place the order');
    cy.intercept('POST', '/api/checkout*').as('placeOrder');
    cy.contains('button', 'Place Order').click();
    cy.wait('@placeOrder');
    cy.location('pathname').should('match', /^\/cart\/checkout\/[^/]+$/);

    cy.log('Step 5: read the confirmation');
    cy.contains('Your order is complete!').should('be.visible');
    cy.contains('Quantity: 3').should('be.visible');
    visiblePrices().then(prices => {
      soft.check('step 5 item total', () => expect(prices).to.include('$ 1049.85'));
      soft.check('step 5 shipping', () => expect(prices).to.include('$ 8.99'));
      soft.check('step 5 order total', () => expect(prices).to.include('$ 1058.84'));
    });
    getElementByField(CypressFields.RecommendationList)
      .find('a')
      .should('have.length.greaterThan', 0)
      .then($links => {
        const hrefs = Cypress._.map($links, link => link.getAttribute('href'));
        soft.check('step 5 recommendations', () => expect(hrefs).not.to.include(`/product/${TELESCOPE.id}`));
      });

    soft.assertAll();
  });
});

export {};
