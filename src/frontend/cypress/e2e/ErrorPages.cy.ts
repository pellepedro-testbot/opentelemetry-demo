// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { getElementByField } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';
import { StepChecks } from '../helpers/storefront';

const BROKEN_PATH = '/this-page-does-not-exist';

describe('Error pages', () => {
  it('answers an unknown route with the custom 404 page', () => {
    cy.request({ url: BROKEN_PATH, failOnStatusCode: false }).its('status').should('eq', 404);

    cy.visit(BROKEN_PATH, { failOnStatusCode: false });

    cy.title().should('eq', 'Otel Demo - Page Not Found');
    cy.contains('404').should('be.visible');
    cy.contains('This page could not be found.').should('be.visible');
    cy.contains('a', 'Go to homepage').should('have.attr', 'href', '/');
  });

  it('renders the 500 page', () => {
    cy.visit('/500', { failOnStatusCode: false });

    cy.title().should('eq', 'Otel Demo - Server Error');
    cy.contains('500').should('be.visible');
    cy.contains('A server-side error occurred. Please try again.').should('be.visible');
    cy.contains('a', 'Go to homepage').should('have.attr', 'href', '/');
  });

  it('follows a broken link and gets back to the shop', () => {
    const checks = new StepChecks();

    checks.step('Step 1: open the broken URL');
    cy.visit(BROKEN_PATH, { failOnStatusCode: false });
    cy.contains('404').should('be.visible');
    cy.contains('This page could not be found.').should('be.visible');

    checks.step('Step 2: go to the homepage');
    cy.contains('a', 'Go to homepage').click();
    cy.location('pathname').should('eq', '/');
    getElementByField(CypressFields.ProductCard, getElementByField(CypressFields.ProductList)).should(
      'have.length',
      10
    );

    checks.step('The storefront stays after a reload');
    cy.reload();
    cy.location('pathname').should('eq', '/');
    getElementByField(CypressFields.ProductCard, getElementByField(CypressFields.ProductList)).should(
      'have.length',
      10
    );

    checks.assertAll();
  });
});

export {};
