// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { v4 } from 'uuid';

export const FLAGD_READ_URL = '/feature/api/read';
export const FLAGD_WRITE_URL = '/feature/api/write';

export interface IMoney {
  currencyCode: string;
  units: number;
  nanos: number;
}

export interface ICard {
  creditCardNumber: string;
  creditCardCvv: number;
  creditCardExpirationYear: number;
  creditCardExpirationMonth: number;
}

export const TEST_ADDRESS = {
  streetAddress: '1600 Amphitheatre Parkway',
  city: 'Mountain View',
  state: 'CA',
  country: 'USA',
  zipCode: '94043',
};

export const VALID_VISA = '4432801561520454';
export const AMEX = '378282246310005';

export const newUserId = (prefix = 'cypress') => `${prefix}-${v4()}`;

export const validCard = (overrides: Partial<ICard> = {}): ICard => ({
  creditCardNumber: VALID_VISA,
  creditCardCvv: 123,
  creditCardExpirationYear: new Date().getFullYear() + 1,
  creditCardExpirationMonth: 1,
  ...overrides,
});

export const moneyAmount = ({ units = 0, nanos = 0 }: Partial<IMoney>) => Number(units) + Number(nanos) / 1e9;

export const readFlags = () => cy.request('GET', FLAGD_READ_URL).its('body');

export const setFlagDefaultVariant = (flagName: string, defaultVariant: string) =>
  readFlags().then(body => {
    body.flags[flagName].defaultVariant = defaultVariant;
    return cy.request('POST', FLAGD_WRITE_URL, { data: body });
  });

export const addToCart = (userId: string, productId: string, quantity = 1) =>
  cy.request('POST', '/api/cart', { userId, item: { productId, quantity } });

export const getCart = (userId: string, currencyCode = 'USD') =>
  cy.request({
    method: 'GET',
    url: '/api/cart',
    qs: { sessionId: userId, currencyCode },
    failOnStatusCode: false,
  });

export const emptyCart = (userId: string) =>
  cy.request({ method: 'DELETE', url: '/api/cart', body: { userId }, failOnStatusCode: false });

export const placeOrder = ({
  userId,
  currencyCode = 'USD',
  card = validCard(),
}: {
  userId: string;
  currencyCode?: string;
  card?: ICard;
}) =>
  cy.request({
    method: 'POST',
    url: `/api/checkout?currencyCode=${currencyCode}`,
    failOnStatusCode: false,
    body: {
      userId,
      userCurrency: currencyCode,
      address: TEST_ADDRESS,
      email: 'cypress-test@example.com',
      creditCard: card,
    },
  });

export const getShippingQuote = (items: { productId: string; quantity: number }[], currencyCode = 'USD') =>
  cy
    .request({
      method: 'GET',
      url: '/api/shipping',
      qs: {
        itemList: JSON.stringify(items),
        currencyCode,
        address: JSON.stringify(TEST_ADDRESS),
      },
    })
    .its('body');
