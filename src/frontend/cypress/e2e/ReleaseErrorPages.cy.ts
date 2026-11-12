// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { getElementByField } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

const step = (title: string) => cy.log(`**${title}**`);

describe('Storefront error pages', () => {
  it('shows the custom 404 page for an unknown URL and links back to the shop', () => {
    step('1. Open a URL that does not exist');
    cy.request({ url: '/does-not-exist', failOnStatusCode: false }).its('status').should('eq', 404);
    cy.visit('/does-not-exist', { failOnStatusCode: false });
    cy.contains('h1', /^404$/).should('be.visible');
    cy.contains('This page could not be found.').should('be.visible');
    cy.title().should('eq', 'Otel Demo - Page Not Found');
    cy.contains('a', 'Go to homepage').should('have.attr', 'href', '/');

    step('2. Go to the homepage');
    cy.contains('a', 'Go to homepage').click();
    cy.location('pathname').should('eq', '/');
    getElementByField(CypressFields.ProductList).should('be.visible');
  });

  it('renders the custom 500 page', () => {
    cy.visit('/500', { failOnStatusCode: false });
    cy.title().should('eq', 'Otel Demo - Server Error');
    cy.contains('h1', /^500$/).should('be.visible');
    cy.contains('A server-side error occurred. Please try again.').should('be.visible');
    cy.contains('a', 'Go to homepage').should('have.attr', 'href', '/');
  });
});

export {};
