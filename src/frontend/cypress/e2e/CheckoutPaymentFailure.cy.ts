// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { getElementByField } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

const FLAGD_READ_URL = '/feature/api/read';
const FLAGD_WRITE_URL = '/feature/api/write';

const setFlag = (flagName: string, defaultVariant: string) => {
  cy.request('GET', FLAGD_READ_URL).then(({ body }) => {
    body.flags[flagName].defaultVariant = defaultVariant;

    cy.request('POST', FLAGD_WRITE_URL, { data: body });
    // flagd picks up the rewritten flag file asynchronously.
    cy.wait(5000);
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

describe('Checkout API payment failure handling', () => {
  describe('intentional payment failure', () => {
    before(() => setFlag('paymentFailure', '100%'));
    after(() => setFlag('paymentFailure', 'off'));

    it('returns the single checkout error format', () => {
      placeOrder(`cypress-payment-failure-${Date.now()}`).then(response => {
        expect(response.status).to.eq(500);
        expect(response.body).to.not.have.property('code');
        expect(response.body).to.have.property('error').that.is.a('string').and.is.not.empty;
      });
    });

    it('shopper stays on the cart when payment fails', () => {
      cy.on('uncaught:exception', error => !error.message.includes('Failed to place order.'));
      cy.intercept('POST', '/api/cart*').as('addToCart');
      cy.intercept('POST', '/api/checkout*').as('placeOrder');

      cy.log('**Step 1: add the first product to the cart**');
      cy.visit('/');
      getElementByField(CypressFields.ProductCard).first().click();
      getElementByField(CypressFields.ProductAddToCart).click();
      cy.wait('@addToCart');
      cy.location('pathname').should('eq', '/cart');
      getElementByField(CypressFields.CartItemCount).should('contain', '1');

      cy.log('**Step 2: place the order**');
      getElementByField(CypressFields.CheckoutPlaceOrder).click();
      cy.wait('@placeOrder').then(({ response }) => {
        expect(response?.statusCode).to.eq(500);
        expect(response?.body).to.deep.equal({ error: 'Failed to place order.' });
      });
      cy.location('pathname').should('eq', '/cart');
      getElementByField(CypressFields.CartItemCount).should('contain', '1');

      cy.reload();
      cy.location('pathname').should('eq', '/cart');
      getElementByField(CypressFields.CartItemCount).should('contain', '1');
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
