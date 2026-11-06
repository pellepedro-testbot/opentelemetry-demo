// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { addToCart, placeOrder as placeOrderRequest, setFlag } from '../../utils/CypressRequests';

const FLAGD_READ_URL = '/feature/api/read';
const FLAGD_WRITE_URL = '/feature/api/write';

// productCatalogFailure targets a specific product via a targeting rule rather than
// defaultVariant, so toggling it requires flipping the rule's true-branch (matching how
// the /feature UI itself edits this flag) instead of the simple defaultVariant swap above.
const setProductCatalogFailure = (variant: 'on' | 'off') => {
  cy.request('GET', FLAGD_READ_URL).then(({ body }) => {
    body.flags.productCatalogFailure.targeting.if[1] = variant;

    cy.request('POST', FLAGD_WRITE_URL, { data: body });
    // flagd serves a written flag file a few seconds later.
    cy.wait(5000);
  });
};

const placeOrder = (userId: string, productId = '0PUK6V6EV0') => {
  addToCart(userId, productId);

  return placeOrderRequest(userId);
};

describe('Checkout API payment failure handling', () => {
  describe('intentional payment failure', () => {
    before(() => setFlag('paymentFailure', '100%'));
    after(() => setFlag('paymentFailure', 'off'));

    it('answers a JSON error body instead of an unhandled failure', () => {
      placeOrder(`cypress-payment-failure-${Date.now()}`).then(response => {
        expect(response.status).to.be.within(400, 599);
        expect(response.headers['content-type']).to.include('application/json');
        expect(response.body).to.have.property('error').that.is.a('string').and.not.equal('');
        expect(response.body).to.not.have.property('orderId');
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
        expect(response.body).to.have.property('error').that.is.a('string').and.not.equal('');
      });
    });
  });
});

export {};
