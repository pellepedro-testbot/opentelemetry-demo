// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { createJourney, getElementByField } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

describe('Not found page', () => {
  it('explains an unknown page and links back to the shop', () => {
    const journey = createJourney();

    journey.step('1. open an unknown URL', () => {
      cy.request({ url: '/no-such-page', failOnStatusCode: false }).its('status').should('eq', 404);
      cy.visit('/no-such-page', { failOnStatusCode: false });
      cy.title().should('eq', 'Otel Demo - Page Not Found');
      cy.contains('404').should('be.visible');
      cy.contains('This page could not be found.').should('be.visible');
      cy.contains('a', 'Go to homepage').should('be.visible').and('have.attr', 'href', '/');
    });

    journey.step('2. go to the homepage', () => {
      cy.contains('a', 'Go to homepage').click();
      cy.location('pathname').should('eq', '/');
      getElementByField(CypressFields.ProductCard, getElementByField(CypressFields.ProductList)).should(
        'have.length',
        10
      );
    });

    journey.verify();
  });
});

export {};
