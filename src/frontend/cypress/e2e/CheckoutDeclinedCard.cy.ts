// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { CypressFields, getElementByField, setFlagVariant } from '../../utils/Cypress';

const DECLINED_MESSAGE = 'Your payment could not be processed';
const FLAG_PROPAGATION_MS = 6000;

const cardNumberInput = () => cy.get('input[name="creditCardNumber"]');

const addFirstProductToCart = () => {
  getElementByField(CypressFields.ProductCard).first().click();
  cy.location('pathname')
    .should('match', /^\/product\//)
    .as('productPath');
  getElementByField(CypressFields.ProductName).invoke('text').should('not.be.empty').as('productName');
  getElementByField(CypressFields.ProductAddToCart).click();
  cy.location('pathname').should('eq', '/cart');
  getElementByField(CypressFields.CheckoutPlaceOrder).should('be.visible');
};

// Recommendations on the cart page leave out what is in the cart, so a link to the
// product with its name is the cart line.
const productLineOnCart = () =>
  cy
    .get<string>('@productPath')
    .then(path => cy.get<string>('@productName').then(name => cy.contains(`a[href="${path}"]`, name)));

describe('Checkout with a declined card', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/checkout*').as('placeOrder');
  });

  it('keeps the shopper on the cart after a decline and places the order on retry', () => {
    // The checkout form does not catch the rejected request; only the expected decline is tolerated.
    cy.on('uncaught:exception', error => !error.message.includes(DECLINED_MESSAGE));
    cy.visit('/');

    cy.log('step 1-2: open a product and add it to the cart');
    addFirstProductToCart();
    productLineOnCart().should('be.visible');

    cy.log('step 3: place the order with a card that fails validation');
    cardNumberInput().clear().type('1234-5678-9012-3456');
    getElementByField(CypressFields.CheckoutPlaceOrder).click();
    cy.wait('@placeOrder').its('response.statusCode').should('eq', 422);
    cy.wait(2000);
    cy.location('pathname').should('eq', '/cart');
    getElementByField(CypressFields.CheckoutPlaceOrder).should('be.visible');
    productLineOnCart().should('be.visible');

    cy.log('step 4: retry with a valid card');
    cardNumberInput().clear().type('4432-8015-6152-0454');
    getElementByField(CypressFields.CheckoutPlaceOrder).click();
    cy.wait('@placeOrder').then(({ response }) => {
      expect(response?.statusCode).to.eq(200);
      const { orderId } = response?.body as { orderId: string };
      expect(orderId).to.be.a('string').and.have.length.greaterThan(0);

      cy.log('step 5: the order page is the order the checkout answered');
      cy.location('pathname').should('eq', `/cart/checkout/${orderId}`);
      cy.get('main').should('contain', 'Quantity: 1');
    });

    cy.log('step 6: the cart is empty after the order');
    getElementByField(CypressFields.CartIcon).click({ force: true });
    getElementByField(CypressFields.CartGoToShopping).click();
    cy.location('pathname').should('eq', '/cart');
    cy.contains('Your shopping cart is empty').should('be.visible');
    cy.reload();
    cy.contains('Your shopping cart is empty').should('be.visible');
  });
});

describe('Checkout while the payment service is unreachable', () => {
  before(() => {
    setFlagVariant('paymentUnreachable', 'on');
    cy.wait(FLAG_PROPAGATION_MS);
  });

  after(() => {
    setFlagVariant('paymentUnreachable', 'off');
  });

  it('answers 500, keeps the cart and still lets the shopper empty it', () => {
    cy.on('uncaught:exception', error => !error.message.includes('Failed to place order'));
    cy.intercept('POST', '/api/checkout*').as('placeOrder');
    cy.visit('/');

    cy.log('step 1: add a product to the cart');
    addFirstProductToCart();
    productLineOnCart().should('be.visible');

    cy.log('step 2: place the order with the prefilled valid card');
    getElementByField(CypressFields.CheckoutPlaceOrder).click();
    cy.wait('@placeOrder').its('response.statusCode').should('eq', 500);
    cy.wait(2000);
    cy.location('pathname').should('eq', '/cart');
    getElementByField(CypressFields.CheckoutPlaceOrder).should('be.visible');

    cy.log('step 3: with the payment service back, the cart still holds the product');
    setFlagVariant('paymentUnreachable', 'off');
    cy.reload();
    getElementByField(CypressFields.CheckoutPlaceOrder).should('be.visible');
    productLineOnCart().should('be.visible');

    cy.log('step 4: Empty Cart empties it');
    cy.intercept('DELETE', '/api/cart*').as('emptyCart');
    cy.contains('button', 'Empty Cart').click();
    cy.wait('@emptyCart').its('response.statusCode').should('eq', 204);
    cy.contains('Your shopping cart is empty').should('be.visible');
    cy.reload();
    cy.contains('Your shopping cart is empty').should('be.visible');
    cy.window().then(win => {
      const { userId } = JSON.parse(win.localStorage.getItem('session') || '{}');
      cy.request(`/api/cart?sessionId=${userId}&currencyCode=USD`).its('body.items').should('have.length', 0);
    });
  });
});

export {};
