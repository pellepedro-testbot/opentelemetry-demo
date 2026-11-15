// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { getElementByField } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';
import { StepChecks } from '../helpers/storefront';

const LOADS = 5;

describe('Product recommendations', () => {
  it('looks at a product and its recommendations, which never include the product itself', () => {
    const checks = new StepChecks();

    for (let load = 1; load <= LOADS; load++) {
      checks.step(`Step 1, load ${load}: open the first product`);
      cy.intercept('GET', '/api/recommendations*').as('getRecommendations');
      cy.visit('/');
      getElementByField(CypressFields.ProductCard).first().click();
      getElementByField(CypressFields.ProductDetail).should('be.visible');
      getElementByField(CypressFields.ProductPicture).should('exist');
      cy.wait('@getRecommendations');
      getElementByField(CypressFields.RecommendationList).should('be.visible');

      checks.step(`Step 2, load ${load}: read the recommendations`);
      getElementByField(CypressFields.ProductName)
        .invoke('text')
        .then(viewed => {
          getElementByField(CypressFields.ProductCard, getElementByField(CypressFields.RecommendationList))
            .should('have.length.greaterThan', 0)
            .then($cards => {
              const names = [...$cards].map(card => card.querySelector('p')?.textContent?.trim());
              checks.check(`Step 2, load ${load} recommendations`, () => expect(names).to.not.include(viewed.trim()));
            });
        });
    }

    checks.assertAll();
  });
});

export {};
