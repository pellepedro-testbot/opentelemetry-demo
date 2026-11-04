// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { addItemToCart, placeOrder as submitOrder, setFlag } from '../../utils/CypressStoreApi';

const FLAGD_READ_URL = '/feature/api/read';
const FLAGD_WRITE_URL = '/feature/api/write';

// productCatalogFailure targets a specific product via a targeting rule rather than
// defaultVariant, so toggling it requires flipping the rule's true-branch (matching how
// the /feature UI itself edits this flag) instead of the simple defaultVariant swap setFlag does.
const setProductCatalogFailure = (variant: 'on' | 'off') => {
  cy.request('GET', FLAGD_READ_URL).then(({ body }) => {
    body.flags.productCatalogFailure.targeting.if[1] = variant;

    cy.request('POST', FLAGD_WRITE_URL, { data: body });
  });
};

const FLAG_REFRESH_MS = 3000;

const placeOrder = (userId: string, productId = '0PUK6V6EV0') => {
  addItemToCart(userId, productId);

  return submitOrder(userId);
};

describe('Checkout API payment failure handling', () => {
  describe('intentional payment failure', () => {
    before(() => {
      setFlag('paymentFailure', '100%');
      cy.wait(FLAG_REFRESH_MS);
    });
    after(() => setFlag('paymentFailure', 'off'));

    it('answers a declined payment with the checkout error format', () => {
      placeOrder(`cypress-payment-failure-${Date.now()}`).then(response => {
        expect(response.status).to.eq(500);
        expect(response.body).to.deep.eq({ error: 'Failed to place order.' });
      });
    });
  });

  describe('unrelated internal failure', () => {
    before(() => {
      setProductCatalogFailure('on');
      cy.wait(FLAG_REFRESH_MS);
    });
    after(() => setProductCatalogFailure('off'));

    it('still returns a generic 500 and is not misclassified as PAYMENT_FAILED', () => {
      // OLJCESPC7Z is the product productCatalogFailure targets; failing here happens
      // during order-item preparation, before chargeCard is ever reached.
      placeOrder(`cypress-catalog-failure-${Date.now()}`, 'OLJCESPC7Z').then(response => {
        expect(response.status).to.eq(500);
        expect(response.body).to.deep.eq({ error: 'Failed to place order.' });
      });
    });
  });
});

export {};
