// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { getElementByField } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

const PRODUCT_ID = 'OLJCESPC7Z';
const PRODUCT_NAME = 'National Park Foundation Explorascope';

describe('Product page', () => {
  it('does not recommend the product being viewed', () => {
    cy.intercept('GET', '/api/recommendations*').as('getRecommendations');
    for (let load = 0; load < 8; load++) {
      cy.visit(`/product/${PRODUCT_ID}`);
      cy.wait('@getRecommendations');
      getElementByField(CypressFields.ProductCard, getElementByField(CypressFields.RecommendationList)).should(
        'have.length.greaterThan',
        0
      );
      getElementByField(CypressFields.RecommendationList)
        .find(`a[href="/product/${PRODUCT_ID}"]`)
        .should('have.length', 0);
    }
  });

  it('renders without the reviews section or calls to the removed review APIs', () => {
    cy.intercept('/api/product-reviews*').as('reviews');
    cy.intercept('/api/product-reviews-avg-score*').as('reviewScore');
    cy.intercept('/api/product-ask-ai-assistant*').as('askAi');

    cy.visit(`/product/${PRODUCT_ID}`);
    getElementByField(CypressFields.ProductName).should('have.text', PRODUCT_NAME);
    getElementByField(CypressFields.ProductAddToCart).should('be.visible');
    cy.wait(2000);

    cy.contains('Customer Reviews').should('not.exist');
    cy.contains('Ask AI About This Product').should('not.exist');
    cy.get('@reviews.all').should('have.length', 0);
    cy.get('@reviewScore.all').should('have.length', 0);
    cy.get('@askAi.all').should('have.length', 0);
  });
});

export {};
