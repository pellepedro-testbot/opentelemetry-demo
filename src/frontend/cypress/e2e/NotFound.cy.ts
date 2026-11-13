// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { getElementByField, startJourney } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

describe('Not found journey', () => {
  it('follows a broken link and gets back to the home page', () => {
    const journey = startJourney();

    journey.step('1. /no-such-page - land on an unknown URL', () => {
      cy.request({ url: '/no-such-page', failOnStatusCode: false }).its('status').should('eq', 404);
      cy.visit('/no-such-page', { failOnStatusCode: false });
      cy.contains('404').should('be.visible');
      cy.contains('This page could not be found.').should('be.visible');
    });

    journey.step('2. /no-such-page - follow the link home', () => {
      cy.contains('a', 'Go to homepage').should('have.attr', 'href', '/').click();
      cy.location('pathname').should('eq', '/');
      getElementByField(CypressFields.ProductCard, getElementByField(CypressFields.ProductList)).should(
        'have.length',
        10
      );
    });

    journey.assertNoFailedChecks();
  });
});

export {};
