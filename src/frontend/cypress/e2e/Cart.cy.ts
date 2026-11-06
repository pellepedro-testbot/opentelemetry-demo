// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { getDetailPrices, getElementByField, priceTextToCents, seedSession } from '../../utils/Cypress';
import { addToCart, emptyCart, setFlag, uniqueUserId } from '../../utils/CypressRequests';
import { CypressFields } from '../../utils/enums/CypressFields';

const PRODUCT_ID = '66VCHSJNUP';

const openCartWith = (prefix: string, quantity: number) => {
  const userId = uniqueUserId(prefix);
  addToCart(userId, PRODUCT_ID, quantity);
  cy.intercept('GET', '/api/cart*').as('getCart');
  cy.visit('/cart', { onBeforeLoad: seedSession({ userId, currencyCode: 'USD' }) });
  cy.wait('@getCart');
  cy.contains('h1, h2, h3, p, span', 'Shopping Cart').should('be.visible');
  return cy.wrap(userId);
};

describe('Cart page', () => {
  it('shows the unit price and unit price x quantity on a line of three', () => {
    openCartWith('cypress-cart-qty3', 3).then(userId => {
      cy.request(`/api/products/${PRODUCT_ID}?currencyCode=USD`).then(({ body: product }) => {
        const unitCents = Math.round(Number(product.priceUsd.units) * 100 + Number(product.priceUsd.nanos) / 1e7);
        getDetailPrices().should('have.length', 4);
        getDetailPrices()
          .eq(0)
          .invoke('text')
          .then(text => expect(priceTextToCents(text), 'Price column').to.eq(unitCents));
        getDetailPrices()
          .eq(1)
          .invoke('text')
          .then(text => expect(priceTextToCents(text), 'Total column').to.eq(unitCents * 3));
      });
      emptyCart(userId);
    });
  });

  it('shows the unit price in both columns on a line of one', () => {
    openCartWith('cypress-cart-qty1', 1).then(userId => {
      cy.request(`/api/products/${PRODUCT_ID}?currencyCode=USD`).then(({ body: product }) => {
        const unitCents = Math.round(Number(product.priceUsd.units) * 100 + Number(product.priceUsd.nanos) / 1e7);
        getDetailPrices()
          .eq(0)
          .invoke('text')
          .then(text => expect(priceTextToCents(text), 'Price column').to.eq(unitCents));
        getDetailPrices()
          .eq(1)
          .invoke('text')
          .then(text => expect(priceTextToCents(text), 'Total column').to.eq(unitCents));
      });
      emptyCart(userId);
    });
  });

  it('lazy-loads the product images of the cart page and the cart dropdown', () => {
    openCartWith('cypress-cart-lazy', 1).then(userId => {
      cy.request(`/api/products/${PRODUCT_ID}?currencyCode=USD`).then(({ body: product }) => {
        cy.get(`img[alt="${product.name}"]`).should('have.length', 1).and('have.attr', 'loading', 'lazy');
        getElementByField(CypressFields.CartIcon).click({ force: true });
        getElementByField(CypressFields.CartDropdownItem)
          .should('have.length', 1)
          .find('img')
          .should('have.attr', 'loading', 'lazy');
      });
      emptyCart(userId);
    });
  });

  describe('when the payment is declined', () => {
    before(() => setFlag('paymentFailure', '100%'));
    after(() => setFlag('paymentFailure', 'off'));

    it('keeps the shopper on the cart with the item and the Place Order form', () => {
      cy.on('uncaught:exception', err => !err.message.includes('Failed to place order'));
      cy.intercept('POST', '/api/checkout*').as('placeOrder');
      cy.visit('/');
      getElementByField(CypressFields.ProductCard).first().click();
      getElementByField(CypressFields.ProductName)
        .should($name => expect($name.text()).to.not.be.empty)
        .invoke('text')
        .then(productName => {
          getElementByField(CypressFields.ProductAddToCart).click();
          cy.location('pathname', { timeout: 15000 }).should('eq', '/cart');
          getElementByField(CypressFields.CheckoutPlaceOrder).click();
          cy.wait('@placeOrder').then(({ response }) => {
            expect(response?.statusCode).to.be.within(400, 599);
            expect(response?.body).to.have.property('error').that.is.a('string').and.not.equal('');
          });
          cy.location('pathname').should('eq', '/cart');
          cy.contains('a', productName).should('be.visible');
          getElementByField(CypressFields.CheckoutPlaceOrder).should('be.visible');
          getElementByField(CypressFields.CartItemCount).should('contain', '1');
        });
    });
  });
});

export {};
