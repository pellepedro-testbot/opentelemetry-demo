// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

const FLAGD_READ_URL = '/feature/api/read';
const FLAGD_WRITE_URL = '/feature/api/write';

const FLAGD_RESOLVE_ALL_URL = '/flagservice/flagd.evaluation.v1.Service/ResolveAll';

const waitForFlagVariant = (flagName: string, variant: string, tries = 30): Cypress.Chainable<string> =>
  cy.request('POST', FLAGD_RESOLVE_ALL_URL, { context: {} }).then(({ body }) => {
    if (body.flags?.[flagName]?.variant === variant) return cy.wrap(variant);
    if (tries <= 1)
      throw new Error(`flagd still serves ${flagName}=${body.flags?.[flagName]?.variant}, want ${variant}`);
    cy.wait(1000);
    return waitForFlagVariant(flagName, variant, tries - 1);
  });

// Writes the flag and waits until flagd serves it, plus a moment for the services' providers to pick it up.
export const setFlag = (flagName: string, defaultVariant: string) =>
  cy
    .request('GET', FLAGD_READ_URL)
    .then(({ body }) => {
      body.flags[flagName].defaultVariant = defaultVariant;

      return cy.request('POST', FLAGD_WRITE_URL, { data: body });
    })
    .then(() => waitForFlagVariant(flagName, defaultVariant))
    .then(() => cy.wait(2000));

export const shippingAddress = {
  streetAddress: '1600 Amphitheatre Parkway',
  city: 'Mountain View',
  state: 'CA',
  country: 'USA',
  zipCode: '94043',
};

export const VISA_CARD_NUMBER = '4432801561520454';

export interface ICardExpiry {
  creditCardExpirationMonth: number;
  creditCardExpirationYear: number;
}

export const nextYearExpiry = (): ICardExpiry => ({
  creditCardExpirationMonth: 1,
  creditCardExpirationYear: new Date().getFullYear() + 1,
});

export const expiryMonthsFromNow = (offset: number): ICardExpiry => {
  const now = new Date();
  const target = new Date(now.getFullYear(), now.getMonth() + offset, 1);
  return { creditCardExpirationMonth: target.getMonth() + 1, creditCardExpirationYear: target.getFullYear() };
};

export const uniqueUserId = (prefix: string) => `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1e6)}`;

export const addToCart = (userId: string, productId: string, quantity = 1) =>
  cy.request('POST', '/api/cart', { userId, item: { productId, quantity } });

export const emptyCart = (userId: string) =>
  cy.request({ method: 'DELETE', url: '/api/cart', body: { userId }, failOnStatusCode: false });

interface IPlaceOrderOptions {
  currencyCode?: string;
  email?: string;
  expiry?: ICardExpiry;
}

export const placeOrder = (
  userId: string,
  { currencyCode = 'USD', email = 'cypress-test@example.com', expiry = nextYearExpiry() }: IPlaceOrderOptions = {}
) =>
  cy.request({
    method: 'POST',
    url: `/api/checkout?currencyCode=${currencyCode}`,
    failOnStatusCode: false,
    body: {
      userId,
      userCurrency: currencyCode,
      address: shippingAddress,
      email,
      creditCard: {
        creditCardNumber: VISA_CARD_NUMBER,
        creditCardCvv: 672,
        ...expiry,
      },
    },
  });

export const toCents = ({ units = 0, nanos = 0 }: { units?: number; nanos?: number }) =>
  Math.round(Number(units) * 100 + Number(nanos) / 1e7);
