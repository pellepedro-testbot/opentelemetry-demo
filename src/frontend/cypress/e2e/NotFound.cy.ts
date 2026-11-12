// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { getElementByField } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

describe('Not Found Page', () => {
  it('should answer an unknown route with the custom 404 page linking home', () => {
    cy.request({ url: '/no-such-page', failOnStatusCode: false }).its('status').should('eq', 404);

    cy.visit('/no-such-page', { failOnStatusCode: false });
    cy.contains('404').should('be.visible');
    cy.contains('This page could not be found.').should('be.visible');
    cy.contains('a', 'Go to homepage').should('have.attr', 'href', '/').click();

    cy.location('pathname').should('eq', '/');
    getElementByField(CypressFields.ProductCard).should('have.length', 10);
  });
});

export {};
