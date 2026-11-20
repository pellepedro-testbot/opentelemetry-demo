// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { getElementByField } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

describe('Page not found', () => {
  it('lands on a missing page and goes home', () => {
    cy.log('step 1: the 404 page');
    cy.visit('/this-page-does-not-exist', { failOnStatusCode: false });
    cy.title().should('eq', 'Otel Demo - Page Not Found');
    cy.contains('h1', '404').should('be.visible');
    cy.contains('This page could not be found.').should('be.visible');

    cy.log('step 2: go to the homepage');
    cy.contains('a', 'Go to homepage').should('have.attr', 'href', '/').click();
    cy.location('pathname').should('eq', '/');
    getElementByField(CypressFields.HomePage).should('be.visible');
    getElementByField(CypressFields.ProductCard, getElementByField(CypressFields.ProductList)).should(
      'have.length.greaterThan',
      0
    );
  });

  it('links "Go to homepage" to / and opens the storefront home page', () => {
    cy.request({ url: '/this-page-does-not-exist', failOnStatusCode: false }).its('status').should('eq', 404);
    cy.visit('/this-page-does-not-exist', { failOnStatusCode: false });
    cy.contains('a', 'Go to homepage').should('have.attr', 'href', '/');
    cy.contains('a', 'Go to homepage').click();
    cy.location('pathname').should('eq', '/');
    getElementByField(CypressFields.ProductList).should('be.visible');
  });
});

export {};
