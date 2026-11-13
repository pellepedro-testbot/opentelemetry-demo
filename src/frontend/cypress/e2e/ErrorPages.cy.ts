// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { getElementByField } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

describe('Error pages', () => {
  it('gets back to the shop from a missing page', () => {
    cy.log('Step 1: open a mistyped address');
    cy.visit('/this-page-does-not-exist', { failOnStatusCode: false });
    cy.title().should('eq', 'Otel Demo - Page Not Found');
    cy.contains('h1', '404').should('be.visible');
    cy.contains('This page could not be found.').should('be.visible');
    cy.contains('a', 'Go to homepage').should('have.attr', 'href', '/');

    cy.log('Step 2: go to the homepage');
    cy.contains('a', 'Go to homepage').click();
    cy.location('pathname').should('eq', '/');
    getElementByField(CypressFields.HomePage).should('exist');
    getElementByField(CypressFields.ProductCard).should('have.length', 10);
  });
});

export {};
