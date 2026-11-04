// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import {
  AMEX,
  addToCart,
  emptyCart,
  getCart,
  getShippingQuote,
  newUserId,
  placeOrder,
  validCard,
} from '../../utils/CypressStoreApi';

const TELESCOPE_ID = '66VCHSJNUP';
const IMAGER_ID = '0PUK6V6EV0';

describe('Checkout API', () => {
  let userId: string;

  beforeEach(() => {
    userId = newUserId('cypress-checkout');
  });

  afterEach(() => {
    emptyCart(userId);
  });

  it('answers a successful order with 200 and the order', () => {
    addToCart(userId, IMAGER_ID);
    placeOrder({ userId }).then(({ status, body }) => {
      expect(status).to.eq(200);
      expect(body.orderId).to.be.a('string').and.have.length.greaterThan(0);
      expect(body.shippingTrackingId).to.be.a('string').and.have.length.greaterThan(0);
      expect(body.shippingCost).to.include.keys('currencyCode', 'units', 'nanos');
      expect(body.shippingAddress).to.include({ streetAddress: '1600 Amphitheatre Parkway', zipCode: '94043' });
      expect(body.items).to.have.length(1);
      expect(body.items[0].item.productId).to.eq(IMAGER_ID);
      expect(body.items[0].item.product).to.include({ id: IMAGER_ID });
      expect(body.items[0].cost).to.include.keys('currencyCode', 'units', 'nanos');
    });
  });

  it('answers an AMEX card refused by payment with 422 PAYMENT_FAILED', () => {
    addToCart(userId, IMAGER_ID);
    placeOrder({ userId, card: validCard({ creditCardNumber: AMEX }) }).then(({ status, body }) => {
      expect(status).to.eq(422);
      expect(body).to.have.property('code', 'PAYMENT_FAILED');
      expect(body).to.have.property('error').that.is.a('string').and.has.length.greaterThan(0);
    });
  });

  it('answers a card that expired last year with 422 PAYMENT_FAILED', () => {
    addToCart(userId, IMAGER_ID);
    placeOrder({ userId, card: validCard({ creditCardExpirationYear: new Date().getFullYear() - 1 }) }).then(
      ({ status, body }) => {
        expect(status).to.eq(422);
        expect(body).to.have.property('code', 'PAYMENT_FAILED');
        expect(body).to.have.property('error').that.is.a('string').and.has.length.greaterThan(0);
      }
    );
  });

  it('charges a card that expires this month', () => {
    const now = new Date();
    addToCart(userId, IMAGER_ID);
    placeOrder({
      userId,
      card: validCard({
        creditCardExpirationYear: now.getUTCFullYear(),
        creditCardExpirationMonth: now.getUTCMonth() + 1,
      }),
    }).then(({ status, body }) => {
      expect(status, JSON.stringify(body)).to.eq(200);
      expect(body.orderId).to.be.a('string').and.have.length.greaterThan(0);
    });
  });

  it('refuses a card that expired last month and keeps the cart', () => {
    const now = new Date();
    const lastMonth = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 1, 1));
    addToCart(userId, IMAGER_ID);
    placeOrder({
      userId,
      card: validCard({
        creditCardExpirationYear: lastMonth.getUTCFullYear(),
        creditCardExpirationMonth: lastMonth.getUTCMonth() + 1,
      }),
    }).then(({ status, body }) => {
      expect(status).not.to.eq(200);
      expect(body).not.to.have.property('orderId');
    });
    getCart(userId).then(({ status, body }) => {
      expect(status).to.eq(200);
      expect(body.items.map((i: { productId: string }) => i.productId)).to.deep.equal([IMAGER_ID]);
    });
  });

  it('charges shipping converted to the shopper currency', () => {
    addToCart(userId, TELESCOPE_ID);
    getShippingQuote([{ productId: TELESCOPE_ID, quantity: 1 }], 'USD').then(usdQuote => {
      getShippingQuote([{ productId: TELESCOPE_ID, quantity: 1 }], 'JPY').then(jpyQuote => {
        expect(jpyQuote.currencyCode).to.eq('JPY');
        placeOrder({ userId, currencyCode: 'JPY' }).then(({ status, body }) => {
          expect(status).to.eq(200);
          expect(body.shippingCost.currencyCode).to.eq('JPY');
          expect({ units: Number(body.shippingCost.units), nanos: body.shippingCost.nanos }, 'order shipping').to.deep.equal({
            units: Number(jpyQuote.units),
            nanos: jpyQuote.nanos,
          });
          expect(
            { units: Number(body.shippingCost.units), nanos: body.shippingCost.nanos },
            'order shipping is not the USD quote'
          ).not.to.deep.equal({ units: Number(usdQuote.units), nanos: usdQuote.nanos });
        });
      });
    });
  });
});

export {};
