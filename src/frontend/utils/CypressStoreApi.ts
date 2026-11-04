// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { Money } from '../protos/demo';

const FLAGD_READ_URL = '/feature/api/read';
const FLAGD_WRITE_URL = '/feature/api/write';

export const shippingAddress = {
  streetAddress: '1600 Amphitheatre Parkway',
  city: 'Mountain View',
  state: 'CA',
  country: 'USA',
  zipCode: '94043',
};

export interface ICreditCard {
  creditCardNumber: string;
  creditCardCvv: number;
  creditCardExpirationYear: number;
  creditCardExpirationMonth: number;
}

export const cardExpiringIn = (monthOffset: number): ICreditCard => {
  const now = new Date();
  const expiry = new Date(now.getFullYear(), now.getMonth() + monthOffset, 1);

  return {
    creditCardNumber: '4432801561520454',
    creditCardCvv: 672,
    creditCardExpirationYear: expiry.getFullYear(),
    creditCardExpirationMonth: expiry.getMonth() + 1,
  };
};

export const validCard = (): ICreditCard => cardExpiringIn(12);

export const uniqueUserId = (prefix: string) => `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1e6)}`;

export const moneyValue = ({ units = 0, nanos = 0 }: Partial<Money>) => Number(units) + Number(nanos) / 1e9;

export const addItemToCart = (userId: string, productId = '0PUK6V6EV0', quantity = 1) =>
  cy.request('POST', '/api/cart', { userId, item: { productId, quantity } });

export const getCart = (userId: string, currencyCode = 'USD') =>
  cy.request({
    method: 'GET',
    url: `/api/cart?sessionId=${encodeURIComponent(userId)}&currencyCode=${currencyCode}`,
    failOnStatusCode: false,
  });

export const emptyCart = (userId: string) =>
  cy.request({ method: 'DELETE', url: '/api/cart', body: { userId }, failOnStatusCode: false });

export const placeOrder = (userId: string, currencyCode = 'USD', creditCard: ICreditCard = validCard()) =>
  cy.request({
    method: 'POST',
    url: `/api/checkout?currencyCode=${currencyCode}`,
    failOnStatusCode: false,
    body: {
      userId,
      userCurrency: currencyCode,
      address: shippingAddress,
      email: 'cypress-test@example.com',
      creditCard,
    },
  });

export const getShippingQuote = (items: { productId: string; quantity: number }[], currencyCode: string) =>
  cy.request({
    method: 'GET',
    url: '/api/shipping',
    qs: {
      itemList: JSON.stringify(items),
      currencyCode,
      address: JSON.stringify(shippingAddress),
    },
  });

export const setFlag = (flagName: string, defaultVariant: string) => {
  cy.request('GET', FLAGD_READ_URL).then(({ body }) => {
    body.flags[flagName].defaultVariant = defaultVariant;

    cy.request('POST', FLAGD_WRITE_URL, { data: body });
  });
};
