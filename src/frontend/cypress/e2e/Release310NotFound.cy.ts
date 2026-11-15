// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { createStepLogger, getElementByField } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

const step = createStepLogger();

describe('Release 3.1.0 not found page', () => {
  it('shows the 404 page for an unknown route and links back home', () => {
    step('Step 1: open an unknown URL', () => {
      cy.visit('/');
      getElementByField(CypressFields.ProductCard).should('have.length.at.least', 1);
      cy.window().then(win => win.location.assign('/this-page-does-not-exist'));
      cy.get('h1').should('have.text', '404');
      cy.contains('This page could not be found.').should('be.visible');
      cy.title().should('eq', 'Otel Demo - Page Not Found');
      cy.contains('a', 'Go to homepage').should('have.attr', 'href', '/');
    });

    step('Step 2: follow the link to the homepage', () => {
      cy.contains('a', 'Go to homepage').click();
      cy.location('pathname').should('eq', '/');
      getElementByField(CypressFields.ProductCard).should('have.length.at.least', 1);
    });
  });
});

export {};
