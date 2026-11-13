// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { CypressFields } from './enums/CypressFields';

export { CypressFields };

export const getElementByField = (field: CypressFields, context: Cypress.Chainable = cy) =>
  context.get(`[data-cy="${field}"]`);

export const createSoftChecks = () => {
  const failures: string[] = [];

  return {
    check(step: string, assertion: () => void) {
      try {
        assertion();
      } catch (error) {
        failures.push(`${step}: ${(error as Error).message}`);
      }
    },
    assertAll() {
      cy.then(() => {
        expect(failures, failures.join('\n')).to.be.empty;
      });
    },
  };
};

const priceTexts = ($prices: JQuery<HTMLElement>) =>
  Cypress._.filter($prices, el => !el.closest(`[data-cy="${CypressFields.RecommendationList}"]`)).map(
    el => el.textContent?.trim() ?? ''
  );

export const visiblePrices = (): Cypress.Chainable<string[]> =>
  getElementByField(CypressFields.ProductPrice).then(priceTexts);

export const CART_SHIPPING_ADDRESS = {
  streetAddress: '1600 Amphitheatre Parkway',
  city: 'Mountain View',
  state: 'CA',
  country: 'United States',
  zipCode: '94043',
};

export const formatPrice = ({ units = 0, nanos = 0 }: { units?: number; nanos?: number }) =>
  `$ ${(Number(units) + nanos / 1e9).toFixed(2)}`;

export const requestShippingQuote = (
  items: { productId: string; quantity: number }[],
  currencyCode: string
): Cypress.Chainable<string> =>
  cy
    .request({
      url: '/api/shipping',
      qs: { itemList: JSON.stringify(items), currencyCode, address: JSON.stringify(CART_SHIPPING_ADDRESS) },
    })
    .then(({ body }) => formatPrice(body));

export const waitForCartShipping = (shipping: string) =>
  getElementByField(CypressFields.ProductPrice).should($prices => {
    expect(priceTexts($prices)).to.include(shipping);
  });
