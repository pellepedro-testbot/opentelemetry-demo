// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { Product } from '../../protos/demo';
import {
  addItemToCart,
  cardExpiringIn,
  emptyCart,
  getCart,
  getShippingQuote,
  moneyValue,
  placeOrder,
  uniqueUserId,
} from '../../utils/CypressStoreApi';

const SHIPPING_URL = Cypress.expose('SKYRAMP_TEST_SERVICE_URL_SHIPPING') || 'http://localhost:50050';

const RATE_TABLE_CODES = [
  'EUR', 'USD', 'JPY', 'BGN', 'CZK', 'DKK', 'GBP', 'HUF', 'PLN', 'RON', 'SEK', 'CHF', 'ISK', 'NOK', 'HRK', 'RUB', 'TRY',
  'AUD', 'BRL', 'CAD', 'CNY', 'HKD', 'IDR', 'ILS', 'INR', 'KRW', 'MXN', 'MYR', 'NZD', 'PHP', 'SGD', 'THB', 'ZAR',
];

const quoteAddress = {
  street_address: '1600 Amphitheatre Parkway',
  city: 'Mountain View',
  state: 'CA',
  country: 'USA',
  zip_code: '94043',
};

const getQuote = (items: { product_id: string; quantity: number }[]) =>
  cy.request('POST', `${SHIPPING_URL}/get-quote`, { items, address: quoteAddress });

const distinctItems = (count: number) =>
  Array.from({ length: count }, (_, i) => ({ product_id: `QUOTE-ITEM-${i}`, quantity: 1 }));

const withCart = (prefix: string, productId = '0PUK6V6EV0', quantity = 1) => {
  const userId = uniqueUserId(prefix);
  addItemToCart(userId, productId, quantity);
  return cy.wrap(userId);
};

const getRecommendations = (productIds: string[]) =>
  cy.request({
    method: 'GET',
    url: '/api/recommendations',
    qs: { productIds, sessionId: 's', currencyCode: 'USD' },
  });

describe('Checkout API', () => {
  it('places a USD order whose shipping cost is the USD quote', () => {
    withCart('cypress-usd').then(userId => {
      placeOrder(userId, 'USD').then(({ status, body }) => {
        expect(status).to.eq(200);
        expect(body.orderId).to.be.a('string').and.have.length.greaterThan(0);
        expect(body.shippingCost).to.deep.eq({ currencyCode: 'USD', units: 8, nanos: 990000000 });
      });
    });
  });

  ['EUR', 'CAD'].forEach(currencyCode => {
    it(`charges shipping converted to ${currencyCode} for a ${currencyCode} order`, () => {
      withCart(`cypress-${currencyCode.toLowerCase()}`).then(userId => {
        getShippingQuote([{ productId: '0PUK6V6EV0', quantity: 1 }], currencyCode).then(({ body: quote }) => {
          expect(quote.currencyCode).to.eq(currencyCode);

          placeOrder(userId, currencyCode).then(({ status, body }) => {
            expect(status).to.eq(200);
            expect(body.shippingCost.currencyCode).to.eq(currencyCode);
            expect(moneyValue(body.shippingCost)).to.be.closeTo(moneyValue(quote), 0.01);
          });
        });
      });
    });
  });

  it('charges shipping for distinct items, not units, at checkout', () => {
    withCart('cypress-qty3', '0PUK6V6EV0', 3).then(userId => {
      placeOrder(userId, 'USD').then(({ status, body }) => {
        expect(status).to.eq(200);
        expect(body.shippingCost).to.deep.eq({ currencyCode: 'USD', units: 8, nanos: 990000000 });
      });
    });
  });

  it('accepts a card that expires this month', () => {
    withCart('cypress-card-this-month').then(userId => {
      placeOrder(userId, 'USD', cardExpiringIn(0)).then(({ status, body }) => {
        expect(status).to.eq(200);
        expect(body.orderId).to.be.a('string').and.have.length.greaterThan(0);
      });
    });
  });

  it('accepts a card that expires next month', () => {
    withCart('cypress-card-next-month').then(userId => {
      placeOrder(userId, 'USD', cardExpiringIn(1)).then(({ status, body }) => {
        expect(status).to.eq(200);
        expect(body.orderId).to.be.a('string').and.have.length.greaterThan(0);
      });
    });
  });

  it('rejects a card that expired last month in the checkout error format and keeps the cart', () => {
    withCart('cypress-card-expired').then(userId => {
      placeOrder(userId, 'USD', cardExpiringIn(-1)).then(({ status, body }) => {
        expect(status).to.eq(500);
        expect(body).to.deep.eq({ error: 'Failed to place order.' });
      });

      getCart(userId).then(({ body }) => {
        expect(body.items.map((i: { productId: string }) => i.productId)).to.deep.eq(['0PUK6V6EV0']);
      });
      emptyCart(userId);
    });
  });
});

describe('Shipping quote API', () => {
  it('prices one item with quantity 5 as one item', () => {
    getQuote([{ product_id: '0PUK6V6EV0', quantity: 5 }]).then(({ status, body }) => {
      expect(status).to.eq(200);
      expect(body.cost_usd).to.deep.eq({ currency_code: 'USD', units: 8, nanos: 990000000 });
    });
  });

  it('prices by the number of distinct items', () => {
    getQuote(distinctItems(3)).then(({ body }) => {
      expect(body.cost_usd).to.deep.eq({ currency_code: 'USD', units: 26, nanos: 970000000 });
    });
    getQuote([
      { product_id: '0PUK6V6EV0', quantity: 2 },
      { product_id: '66VCHSJNUP', quantity: 7 },
    ]).then(({ body }) => {
      expect(body.cost_usd).to.deep.eq({ currency_code: 'USD', units: 17, nanos: 980000000 });
    });
  });

  it('quotes zero for an empty item list', () => {
    getQuote([]).then(({ status, body }) => {
      expect(status).to.eq(200);
      expect(body.cost_usd).to.deep.eq({ currency_code: 'USD', units: 0, nanos: 0 });
    });
  });

  [
    { count: 29, units: 260, nanos: 710000000 },
    { count: 35, units: 314, nanos: 650000000 },
    { count: 57, units: 512, nanos: 430000000 },
  ].forEach(({ count, units, nanos }) => {
    it(`keeps every cent of the quote for ${count} items`, () => {
      getQuote(distinctItems(count)).then(({ body }) => {
        expect(body.cost_usd).to.deep.eq({ currency_code: 'USD', units, nanos });
      });
    });
  });
});

describe('Currency API', () => {
  it('lists every currency that has a rate', () => {
    cy.request('GET', '/api/currency').then(({ status, body }: { status: number; body: string[] }) => {
      expect(status).to.eq(200);
      expect(new Set(body).size, 'no duplicates').to.eq(body.length);
      expect(body).to.include('EUR');
      expect(body).to.include.members(RATE_TABLE_CODES);
    });
  });
});

describe('Recommendations API', () => {
  let catalogIds: string[] = [];

  before(() => {
    cy.request('GET', '/api/products?currencyCode=USD').then(({ body }: { body: Product[] }) => {
      catalogIds = body.map(({ id }) => id);
    });
  });

  it('never recommends the product asked about', () => {
    cy.wrap(null).then(() => {
      catalogIds.forEach(id => {
        Cypress._.times(20, () => {
          getRecommendations([id]).then(({ body }: { body: Product[] }) => {
            expect(body.map(p => p.id), `recommendations for ${id}`).not.to.include(id);
          });
        });
      });
    });
  });

  it('never recommends any of several products asked about, without duplicates', () => {
    cy.wrap(null).then(() => {
      [catalogIds.slice(0, 2), catalogIds.slice(0, 9)].forEach(input => {
        Cypress._.times(10, () => {
          getRecommendations(input).then(({ body }: { body: Product[] }) => {
            const ids = body.map(p => p.id);
            expect(ids.length).to.be.at.most(4);
            expect(new Set(ids).size, 'no duplicates').to.eq(ids.length);
            expect(ids.filter(id => input.includes(id)), `recommendations for ${input.length} ids`).to.deep.eq([]);
          });
        });
      });
    });
  });

  it('recommends up to 4 distinct products when none are asked about', () => {
    cy.request('GET', '/api/recommendations?sessionId=s&currencyCode=USD').then(
      ({ status, body }: { status: number; body: Product[] }) => {
        expect(status).to.eq(200);
        const ids = body.map(p => p.id);
        expect(ids.length).to.be.within(1, 4);
        expect(new Set(ids).size).to.eq(ids.length);
      }
    );
  });
});

export {};
