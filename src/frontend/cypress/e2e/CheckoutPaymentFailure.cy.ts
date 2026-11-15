// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { getElementByField } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';
import {
  addShownProductToCart,
  CART_LINE,
  cartLine,
  interceptStorefrontApi,
  placeOrder as placeOrderFromCart,
  StepChecks,
} from '../helpers/storefront';

const FLAGD_READ_URL = '/feature/api/read';
const FLAGD_WRITE_URL = '/feature/api/write';

const setFlag = (flagName: string, defaultVariant: string) => {
  cy.request('GET', FLAGD_READ_URL).then(({ body }) => {
    body.flags[flagName].defaultVariant = defaultVariant;

    cy.request('POST', FLAGD_WRITE_URL, { data: body });
  });
};

// productCatalogFailure targets a specific product via a targeting rule rather than
// defaultVariant, so toggling it requires flipping the rule's true-branch (matching how
// the /feature UI itself edits this flag) instead of the simple defaultVariant swap above.
const setProductCatalogFailure = (variant: 'on' | 'off') => {
  cy.request('GET', FLAGD_READ_URL).then(({ body }) => {
    body.flags.productCatalogFailure.targeting.if[1] = variant;

    cy.request('POST', FLAGD_WRITE_URL, { data: body });
  });
};

const placeOrder = (userId: string, productId = '0PUK6V6EV0') => {
  cy.request('POST', '/api/cart', {
    userId,
    item: { productId, quantity: 1 },
  });

  return cy.request({
    method: 'POST',
    url: '/api/checkout?currencyCode=USD',
    failOnStatusCode: false,
    body: {
      userId,
      userCurrency: 'USD',
      address: {
        streetAddress: '1600 Amphitheatre Parkway',
        city: 'Mountain View',
        state: 'CA',
        country: 'USA',
        zipCode: '94043',
      },
      email: 'cypress-test@example.com',
      creditCard: {
        creditCardNumber: '4432801561520454',
        creditCardCvv: 123,
        creditCardExpirationYear: new Date().getFullYear() + 1,
        creditCardExpirationMonth: 1,
      },
    },
  });
};

describe('Placing an order while payments fail', () => {
  before(() => setFlag('paymentFailure', '100%'));
  after(() => setFlag('paymentFailure', 'off'));

  it('leaves the shopper on the cart page with the cart intact after a failed order', () => {
    cy.on('uncaught:exception', () => false);
    interceptStorefrontApi();
    cy.visit('/');
    getElementByField(CypressFields.ProductCard).first().click();
    addShownProductToCart().then(({ name }) => {
      placeOrderFromCart();
      cy.wait(2000);

      cy.location('pathname').should('eq', '/cart');
      cartLine(name).should('be.visible');
      cy.get(CART_LINE).should('have.length', 1);
      cy.contains('Your order is complete!').should('not.exist');
    });
  });

  it('keeps the shopper on the cart with the item when the order fails', () => {
    const checks = new StepChecks();
    cy.on('uncaught:exception', () => false);
    interceptStorefrontApi();

    checks.step('Step 1: add the first product to the cart');
    let productName = '';
    cy.visit('/');
    getElementByField(CypressFields.ProductCard).first().click();
    addShownProductToCart().then(product => {
      productName = product.name;
    });
    cy.get(CART_LINE).should('have.length', 1);

    checks.step('Step 2: place the order');
    placeOrderFromCart().then(interception => {
      checks.check('Step 2 order answer status', () => expect(interception.response?.statusCode).to.eq(422));
      checks.check('Step 2 order answer code', () =>
        expect(interception.response?.body).to.have.property('code', 'PAYMENT_FAILED')
      );
    });
    cy.wait(2000);
    cy.location('pathname').should('eq', '/cart');
    cy.then(() => cartLine(productName).should('be.visible'));
    cy.contains('Your order is complete!').should('not.exist');

    checks.assertAll();
  });
});

describe('Checkout API payment failure handling', () => {
  describe('intentional payment failure', () => {
    before(() => setFlag('paymentFailure', '100%'));
    after(() => setFlag('paymentFailure', 'off'));

    it('returns a structured 422 PAYMENT_FAILED error instead of an unhandled 500', () => {
      placeOrder(`cypress-payment-failure-${Date.now()}`).then(response => {
        expect(response.status).to.eq(422);
        expect(response.body).to.have.property('code', 'PAYMENT_FAILED');
        expect(response.body).to.have.property('error').that.is.a('string').and.is.not.empty;
      });
    });
  });

  describe('unrelated internal failure', () => {
    before(() => setProductCatalogFailure('on'));
    after(() => setProductCatalogFailure('off'));

    it('still returns a generic 500 and is not misclassified as PAYMENT_FAILED', () => {
      // OLJCESPC7Z is the product productCatalogFailure targets; failing here happens
      // during order-item preparation, before chargeCard is ever reached.
      placeOrder(`cypress-catalog-failure-${Date.now()}`, 'OLJCESPC7Z').then(response => {
        expect(response.status).to.eq(500);
        expect(response.body).to.not.have.property('code');
        expect(response.body).to.have.property('error').that.is.a('string').and.is.not.empty;
      });
    });
  });
});

export {};
