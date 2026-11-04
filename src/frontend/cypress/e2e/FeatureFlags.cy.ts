// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { addToCart, emptyCart, getCart, newUserId, readFlags, setFlagDefaultVariant } from '../../utils/CypressStoreApi';

interface IProductSummary {
  id: string;
  name: string;
  priceUsd: unknown;
}

const summarize = (products: IProductSummary[]) =>
  products.map(({ id, name, priceUsd }) => ({ id, name, priceUsd })).sort((a, b) => a.id.localeCompare(b.id));

const timedProductList = () => {
  const started = Date.now();
  return cy
    .request({ url: '/api/products', qs: { currencyCode: 'USD' }, failOnStatusCode: false, timeout: 40000 })
    .then(response => ({ status: response.status, body: response.body, ms: Date.now() - started }));
};

describe('Feature flags', () => {
  it('drops the load-generator flags and adds the new scenario flags, off by default', () => {
    readFlags().then(({ flags }) => {
      expect(flags).not.to.have.any.keys('loadGeneratorTraffic', 'loadGeneratorVUs');
      ['productCatalogLockContention', 'emitRawPii', 'aiSlowResponse', 'aiRunawayAgent'].forEach(name => {
        expect(flags, name).to.have.property(name);
        expect(flags[name].defaultVariant, `${name} default`).to.eq('off');
      });
    });
  });

  describe('cartFailure', () => {
    const userId = newUserId('cypress-cart-failure');

    before(() => addToCart(userId, '66VCHSJNUP'));
    afterEach(() => setFlagDefaultVariant('cartFailure', 'off'));
    after(() => emptyCart(userId));

    it('fails cart calls at the configured rate and recovers when set back to off', () => {
      setFlagDefaultVariant('cartFailure', '100%');
      cy.wait(2000);
      const statuses: number[] = [];
      cy.request({ url: '/api/cart', qs: { sessionId: userId, currencyCode: 'USD' }, failOnStatusCode: false, timeout: 40000 }).then(
        ({ status }) => statuses.push(status)
      );
      emptyCart(userId).then(({ status }) => statuses.push(status));
      cy.then(() => {
        expect(statuses.some(status => status >= 400), `cart call statuses with cartFailure 100%: ${statuses}`).to.eq(true);
      });

      setFlagDefaultVariant('cartFailure', 'off');
      cy.wait(2000);
      getCart(userId).its('status').should('eq', 200);
    });
  });

  describe('productCatalogLockContention', () => {
    afterEach(() => setFlagDefaultVariant('productCatalogLockContention', 'off'));

    it('blocks product listing while the catalog lock is held, then serves it unchanged', () => {
      timedProductList().then(baseline => {
        expect(baseline.status).to.eq(200);
        const products = summarize(baseline.body);
        expect(products).to.have.length(10);

        setFlagDefaultVariant('productCatalogLockContention', 'on');
        const deadline = Date.now() + 30000;
        const waitForBlocking = (): void => {
          timedProductList().then(({ status, ms }) => {
            if (status !== 200 || ms > 5000) {
              cy.log(`product listing blocked: ${status} after ${ms} ms`);
              return;
            }
            if (Date.now() > deadline) {
              throw new Error('product listing never blocked within 30s of turning productCatalogLockContention on');
            }
            cy.wait(2000).then(waitForBlocking);
          });
        };
        waitForBlocking();

        setFlagDefaultVariant('productCatalogLockContention', 'off');
        const recoveredBy = Date.now() + 90000;
        const waitForRecovery = (): void => {
          timedProductList().then(({ status, body, ms }) => {
            if (status === 200 && ms < 5000) {
              expect(summarize(body), 'products after the lock').to.deep.equal(products);
              return;
            }
            if (Date.now() > recoveredBy) {
              throw new Error(`product listing still blocked after turning the flag off: ${status} after ${ms} ms`);
            }
            cy.wait(2000).then(waitForRecovery);
          });
        };
        waitForRecovery();
      });
    });
  });
});

export {};
