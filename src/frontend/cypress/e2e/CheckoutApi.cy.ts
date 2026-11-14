// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { emptyStoredCart, getStoredCart, setFlag, setProductCatalogFailure } from '../../utils/Cypress';

const address = {
  streetAddress: '1600 Amphitheatre Parkway',
  city: 'Mountain View',
  state: 'CA',
  country: 'USA',
  zipCode: '94043',
};

const creditCard = {
  creditCardNumber: '4432801561520454',
  creditCardCvv: 123,
  creditCardExpirationYear: new Date().getFullYear() + 1,
  creditCardExpirationMonth: 1,
};

const checkoutBody = (userId: string) => ({
  userId,
  userCurrency: 'USD',
  address,
  email: 'cypress-test@example.com',
  creditCard,
});

const uniqueUserId = (label: string) => `cypress-${label}-${Date.now()}-${Math.floor(Math.random() * 1e6)}`;

const addToCart = (userId: string, productId: string, quantity: number) =>
  cy.request('POST', '/api/cart', { userId, item: { productId, quantity } });

const checkout = (body: object) =>
  cy.request({
    method: 'POST',
    url: '/api/checkout?currencyCode=USD',
    failOnStatusCode: false,
    body,
  });

const expectErrorShape = (response: Cypress.Response<Record<string, unknown>>) => {
  expect(response.headers['content-type']).to.match(/^application\/json/);
  expect(response.body).to.be.an('object');
  expect(response.body.error).to.be.a('string').and.not.be.empty;
  if ('code' in response.body) {
    expect(response.body.code).to.be.a('string');
  }
};

describe('Shipping quote API', () => {
  const quote = (currencyCode: string) =>
    cy.request({
      url: '/api/shipping',
      qs: {
        itemList: JSON.stringify([{ productId: 'OLJCESPC7Z', quantity: 1 }]),
        currencyCode,
        address: JSON.stringify(address),
      },
    });

  it('quotes shipping in the requested currency', () => {
    ['USD', 'EUR'].forEach(currencyCode => {
      quote(currencyCode).then(response => {
        expect(response.status).to.eq(200);
        expect(response.body.currencyCode).to.eq(currencyCode);
        expect(response.body.units).to.be.a('number');
        expect(response.body.nanos).to.be.a('number');
        expect(response.body.units + response.body.nanos / 1e9).to.be.greaterThan(0);
      });
    });
  });
});

describe('Checkout API', () => {
  const createdUsers: string[] = [];

  const newUser = (label: string) => {
    const userId = uniqueUserId(label);
    createdUsers.push(userId);
    return userId;
  };

  afterEach(() => {
    createdUsers.splice(0).forEach(userId => emptyStoredCart(userId));
  });

  it('places the order and answers it with product details', () => {
    const userId = newUser('checkout-success');
    addToCart(userId, 'OLJCESPC7Z', 2);

    checkout(checkoutBody(userId)).then(response => {
      expect(response.status).to.eq(200);
      expect(response.body.orderId).to.be.a('string').and.not.be.empty;
      expect(response.body.shippingTrackingId).to.be.a('string').and.not.be.empty;
      expect(response.body.shippingAddress).to.deep.eq(address);
      expect(response.body.shippingCost).to.include.keys('currencyCode', 'units', 'nanos');
      expect(response.body.items).to.have.length(1);
      const [{ item, cost }] = response.body.items;
      expect(item.productId).to.eq('OLJCESPC7Z');
      expect(item.quantity).to.eq(2);
      expect(item.product.name).to.eq('National Park Foundation Explorascope');
      expect(cost).to.include.keys('currencyCode', 'units', 'nanos');
    });
  });

  describe('with the paymentFailure flag at 100%', () => {
    before(() => setFlag('paymentFailure', '100%'));
    after(() => setFlag('paymentFailure', 'off'));

    it('answers a payment failure with 422 PAYMENT_FAILED and a message', () => {
      const userId = newUser('payment-failure');
      addToCart(userId, 'OLJCESPC7Z', 1);

      checkout(checkoutBody(userId)).then(response => {
        expect(response.status).to.eq(422);
        expect(response.body).to.have.property('code', 'PAYMENT_FAILED');
        expect(response.body).to.have.property('error').that.is.a('string').and.is.not.empty;
      });
    });
  });

  it('answers an expired card with 422 PAYMENT_FAILED and keeps the cart', () => {
    const userId = newUser('expired-card');
    addToCart(userId, 'OLJCESPC7Z', 1);

    checkout({ ...checkoutBody(userId), creditCard: { ...creditCard, creditCardExpirationYear: 2001 } }).then(
      response => {
        expect(response.status).to.eq(422);
        expect(response.body).to.have.property('code', 'PAYMENT_FAILED');
        expect(response.body).to.have.property('error').that.is.a('string').and.is.not.empty;
      }
    );

    getStoredCart(userId).then(cart => {
      expect(cart.items.map(({ productId }: { productId: string }) => productId)).to.deep.eq(['OLJCESPC7Z']);
    });
  });

  describe('with productCatalogFailure targeting OLJCESPC7Z', () => {
    before(() => setProductCatalogFailure('on'));
    after(() => setProductCatalogFailure('off'));

    it('answers a failure unrelated to payment with a generic 500 and no code', () => {
      const userId = newUser('catalog-failure');
      addToCart(userId, 'OLJCESPC7Z', 1);

      checkout(checkoutBody(userId)).then(response => {
        expect(response.status).to.eq(500);
        expect(response.body).to.not.have.property('code');
        expect(response.body).to.have.property('error').that.is.a('string').and.is.not.empty;
        expectErrorShape(response);
      });
    });
  });

  it('answers rejected checkout bodies with the same JSON error shape', () => {
    const emptyCartUser = newUser('empty-cart');
    checkout(checkoutBody(emptyCartUser)).then(response => {
      expect(response.status).to.be.at.least(400);
      expectErrorShape(response);
    });

    const noCardUser = newUser('no-credit-card');
    addToCart(noCardUser, 'OLJCESPC7Z', 1);
    checkout({ userId: noCardUser, userCurrency: 'USD', address, email: 'cypress-test@example.com' }).then(response => {
      expect(response.status).to.be.at.least(400);
      expectErrorShape(response);
    });
  });
});

export {};
