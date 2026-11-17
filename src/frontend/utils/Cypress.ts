// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { CypressFields } from './enums/CypressFields';

export { CypressFields };

export const getElementByField = (field: CypressFields, context: Cypress.Chainable = cy) =>
  context.get(`[data-cy="${field}"]`);

export const createStepChecks = () => {
  const failures: string[] = [];
  return {
    check(step: string, assertion: () => void) {
      try {
        assertion();
      } catch (error) {
        failures.push(`${step}: ${(error as Error).message}`);
      }
    },
    assertAllPassed() {
      cy.then(() => {
        if (failures.length) throw new Error(`Failed step checks:\n${failures.join('\n')}`);
      });
    },
  };
};

export const priceValue = (text: string) => Number(text.replace(/[^\d.]/g, ''));

export const getImageByName = (name: string) => cy.get(`img[alt="${name}"]`);

export const getPageContent = () => cy.get('main');

export const getCartPrices = () =>
  cy
    .get(`main [data-cy="${CypressFields.ProductPrice}"]`)
    .not(`[data-cy="${CypressFields.RecommendationList}"] [data-cy="${CypressFields.ProductPrice}"]`);

export const getCartLineQuantity = () => cy.get('main select:not([name])');

export const getRecommendationLinks = () => getElementByField(CypressFields.RecommendationList).find('a');

export const countGetRequests = (url: string) => {
  const requests = { count: 0 };
  cy.intercept('GET', url, () => {
    requests.count += 1;
  });
  return requests;
};
