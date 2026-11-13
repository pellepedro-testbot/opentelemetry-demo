// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { getElementByField } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

describe('Product page recommendations', () => {
  it('hides the recommendations section when there are no recommendations', () => {
    let answerEmpty = true;
    cy.intercept('GET', '/api/recommendations*', req => {
      if (answerEmpty) req.reply([]);
    }).as('getRecommendations');
    cy.intercept('GET', '/api/products/*').as('getProduct');

    cy.visit('/');
    cy.contains(`[data-cy="${CypressFields.ProductCard}"]`, 'Roof Binoculars').click();
    cy.wait('@getProduct');
    cy.wait('@getRecommendations').its('response.body').should('deep.equal', []);
    getElementByField(CypressFields.ProductName).should('have.text', 'Roof Binoculars');
    getElementByField(CypressFields.RecommendationList).should('not.exist');
    cy.contains('You May Also Like').should('not.exist');

    cy.then(() => {
      answerEmpty = false;
    });
    cy.visit('/');
    cy.contains(`[data-cy="${CypressFields.ProductCard}"]`, 'Solar Filter').click();
    cy.wait('@getRecommendations').its('response.body').should('have.length.at.least', 1);
    getElementByField(CypressFields.RecommendationList).should('be.visible').and('contain', 'You May Also Like');
    getElementByField(CypressFields.ProductCard, getElementByField(CypressFields.RecommendationList)).should(
      'have.length.at.least',
      1
    );
  });
});

export {};
