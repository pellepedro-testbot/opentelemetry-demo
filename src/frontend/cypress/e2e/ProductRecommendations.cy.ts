// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { getElementByField } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

describe('Product page recommendations', () => {
  it('never recommends the product being viewed', () => {
    cy.intercept('GET', '/api/recommendations*').as('getRecommendations');
    ['66VCHSJNUP', 'OLJCESPC7Z', 'L9ECAV7KIM'].forEach(productId => {
      cy.visit('/');
      cy.get(`[data-cy="product-list"] a[href="/product/${productId}"]`).click();
      cy.location('pathname').should('eq', `/product/${productId}`);
      for (let visit = 0; visit < 3; visit++) {
        if (visit > 0) cy.reload();
        cy.wait('@getRecommendations');
        getElementByField(CypressFields.ProductCard, getElementByField(CypressFields.RecommendationList)).should(
          'have.length',
          4
        );
        getElementByField(CypressFields.RecommendationList)
          .find('a')
          .should($links => {
            const hrefs = Cypress.$.makeArray($links).map(a => a.getAttribute('href'));
            expect(hrefs.join(', ')).not.to.contain(`/product/${productId}`);
          });
      }
    });
  });
});

export {};
