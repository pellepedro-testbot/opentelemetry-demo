// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { getElementByField } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

const MISSING_PAGE = '/this-page-does-not-exist';

describe('Missing page', () => {
  it('shows the 404 page and its link goes back to the shop', () => {
    cy.log('Step 1: open a page that does not exist');
    cy.request({ url: MISSING_PAGE, failOnStatusCode: false }).its('status').should('eq', 404);
    cy.visit(MISSING_PAGE, { failOnStatusCode: false });
    cy.title().should('eq', 'Otel Demo - Page Not Found');
    cy.contains('h1', '404').should('be.visible');
    cy.contains('This page could not be found.').should('be.visible');

    cy.log('Step 2: follow the link to the homepage');
    cy.contains('a', 'Go to homepage').should('have.attr', 'href', '/').click();
    cy.location('pathname').should('eq', '/');
    getElementByField(CypressFields.ProductCard, getElementByField(CypressFields.ProductList)).should(
      'have.length.greaterThan',
      0
    );
  });
});

export {};
