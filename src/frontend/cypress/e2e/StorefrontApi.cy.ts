// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import {
  addToCart,
  emptyCart,
  expiryMonthsFromNow,
  placeOrder,
  setFlag,
  shippingAddress,
  toCents,
  uniqueUserId,
} from '../../utils/CypressRequests';

const PRODUCT_ID = '66VCHSJNUP';
const OTHER_PRODUCT_ID = 'OLJCESPC7Z';

// Every currency of the rates table in src/currency/src/server.cpp.
const RATE_TABLE_CURRENCIES = [
  'EUR',
  'USD',
  'JPY',
  'BGN',
  'CZK',
  'DKK',
  'GBP',
  'HUF',
  'PLN',
  'RON',
  'SEK',
  'CHF',
  'ISK',
  'NOK',
  'HRK',
  'RUB',
  'TRY',
  'AUD',
  'BRL',
  'CAD',
  'CNY',
  'HKD',
  'IDR',
  'ILS',
  'INR',
  'KRW',
  'MXN',
  'MYR',
  'NZD',
  'PHP',
  'SGD',
  'THB',
  'ZAR',
];

const getShippingQuote = (items: { productId: string; quantity: number }[], currencyCode: string) =>
  cy.request({
    method: 'GET',
    url: '/api/shipping',
    qs: { itemList: JSON.stringify(items), currencyCode, address: JSON.stringify(shippingAddress) },
  });

const orderWithFreshCart = (prefix: string, options: Parameters<typeof placeOrder>[1] = {}) => {
  const userId = uniqueUserId(prefix);
  addToCart(userId, PRODUCT_ID);
  return placeOrder(userId, options);
};

describe('Storefront API', () => {
  describe('checkout', () => {
    it('answers 200 with the placed order and its product details', () => {
      orderWithFreshCart('cypress-order-shape').then(({ status, body }) => {
        expect(status).to.eq(200);
        expect(body.orderId).to.be.a('string').and.not.equal('');
        expect(body.shippingTrackingId).to.be.a('string').and.not.equal('');
        expect(body.shippingCost).to.have.property('currencyCode', 'USD');
        expect(body.items).to.have.length(1);
        expect(body.items[0].item.productId).to.eq(PRODUCT_ID);
        expect(body.items[0].item.product.name).to.be.a('string').and.not.equal('');
      });
    });

    it('charges a non-USD order the USD shipping quote converted into the shopper currency', () => {
      const items = [{ productId: PRODUCT_ID, quantity: 1 }];
      getShippingQuote(items, 'USD').then(({ body: usdQuote }) => {
        getShippingQuote(items, 'JPY').then(({ body: jpyQuote }) => {
          expect(jpyQuote.currencyCode).to.eq('JPY');
          orderWithFreshCart('cypress-shipping-jpy', { currencyCode: 'JPY' }).then(({ status, body }) => {
            expect(status).to.eq(200);
            expect(body.shippingCost.currencyCode).to.eq('JPY');
            expect(Number(body.shippingCost.units)).to.be.closeTo(Number(jpyQuote.units), 1);
            expect(Number(body.shippingCost.units)).to.not.eq(Number(usdQuote.units));
          });
        });
      });
    });

    it('charges a USD order the USD shipping quote', () => {
      getShippingQuote([{ productId: PRODUCT_ID, quantity: 1 }], 'USD').then(({ body: usdQuote }) => {
        orderWithFreshCart('cypress-shipping-usd').then(({ status, body }) => {
          expect(status).to.eq(200);
          expect(body.shippingCost.currencyCode).to.eq('USD');
          expect(toCents(body.shippingCost)).to.eq(toCents(usdQuote));
        });
      });
    });
  });

  describe('card expiry', () => {
    it('accepts a card in its expiry month', () => {
      orderWithFreshCart('cypress-card-this-month', { expiry: expiryMonthsFromNow(0) }).then(({ status, body }) => {
        expect(status, JSON.stringify(body)).to.eq(200);
        expect(body.orderId).to.be.a('string').and.not.equal('');
      });
    });

    it('rejects a card that expired last month with a JSON error', () => {
      orderWithFreshCart('cypress-card-last-month', { expiry: expiryMonthsFromNow(-1) }).then(({ status, body }) => {
        expect(status).to.be.within(400, 599);
        expect(body).to.have.property('error').that.is.a('string').and.not.equal('');
        expect(body).to.not.have.property('orderId');
      });
    });

    it('accepts a card that expires next month', () => {
      orderWithFreshCart('cypress-card-next-month', { expiry: expiryMonthsFromNow(1) }).then(({ status, body }) => {
        expect(status, JSON.stringify(body)).to.eq(200);
        expect(body.orderId).to.be.a('string').and.not.equal('');
      });
    });
  });

  describe('shipping quote', () => {
    it('quotes by distinct items, not summed quantity', () => {
      getShippingQuote([{ productId: PRODUCT_ID, quantity: 1 }], 'USD').then(({ body: one }) => {
        getShippingQuote([{ productId: PRODUCT_ID, quantity: 5 }], 'USD').then(({ body: fiveOfOne }) => {
          expect(toCents(fiveOfOne)).to.eq(toCents(one));
        });
        getShippingQuote(
          [
            { productId: PRODUCT_ID, quantity: 1 },
            { productId: OTHER_PRODUCT_ID, quantity: 1 },
          ],
          'USD'
        ).then(({ body: twoLines }) => {
          getShippingQuote([{ productId: OTHER_PRODUCT_ID, quantity: 2 }], 'USD').then(({ body: twoOfOne }) => {
            expect(toCents(twoLines)).to.be.greaterThan(toCents(one));
            expect(toCents(twoOfOne)).to.eq(toCents(one));
          });
        });
      });
    });
  });

  describe('currencies', () => {
    it('lists every currency of the rates table, EUR included', () => {
      cy.request('GET', '/api/currency').then(({ status, body }) => {
        expect(status).to.eq(200);
        expect(body).to.include.members(RATE_TABLE_CURRENCIES);
        expect(new Set(body).size).to.eq(body.length);
      });
    });
  });

  describe('recommendations', () => {
    ['OLJCESPC7Z', '66VCHSJNUP', '1YMWWN1N4O'].forEach(productId => {
      it(`never recommends the requested product ${productId}`, () => {
        Cypress._.times(20, () => {
          cy.request(
            'GET',
            `/api/recommendations?productIds=${productId}&sessionId=cypress-reco&currencyCode=USD`
          ).then(({ body }) => {
            expect(body.map(({ id }: { id: string }) => id)).to.not.include(productId);
          });
        });
      });
    });

    it('returns at most four distinct products', () => {
      Cypress._.times(20, () => {
        cy.request('GET', `/api/recommendations?productIds=${PRODUCT_ID}&sessionId=cypress-reco&currencyCode=USD`).then(
          ({ body }) => {
            const ids = body.map(({ id }: { id: string }) => id);
            expect(ids.length).to.be.within(1, 4);
            expect(new Set(ids).size).to.eq(ids.length);
          }
        );
      });
    });
  });

  describe('cartFailure flag', () => {
    const userId = uniqueUserId('cypress-cart-failure');

    before(() => addToCart(userId, PRODUCT_ID));
    after(() => {
      setFlag('cartFailure', 'off');
      emptyCart(userId);
    });

    it('fails cart operations at 100% and serves the cart again once off', () => {
      setFlag('cartFailure', '100%');
      cy.request({ url: `/api/cart?sessionId=${userId}&currencyCode=USD`, failOnStatusCode: false }).then(
        ({ status: readStatus }) => {
          emptyCart(userId).then(({ status: emptyStatus }) => {
            expect(Math.max(readStatus, emptyStatus), 'GetCart or EmptyCart fails').to.be.at.least(500);
          });
        }
      );

      setFlag('cartFailure', 'off');
      addToCart(userId, PRODUCT_ID);
      cy.request(`/api/cart?sessionId=${userId}&currencyCode=USD`).then(({ status, body }) => {
        expect(status).to.eq(200);
        expect(body.items.map(({ productId }: { productId: string }) => productId)).to.include(PRODUCT_ID);
      });
    });
  });
});

export {};
