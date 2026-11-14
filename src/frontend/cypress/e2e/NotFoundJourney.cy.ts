// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { getElementByField } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

describe('Not found journey', () => {
  it('follows a broken link back to the product list', () => {
    cy.log('Step 1: open a mistyped address');
    cy.visit('/no-such-page', { failOnStatusCode: false });
    cy.contains('404').should('be.visible');
    cy.contains('This page could not be found.').should('be.visible');

    cy.log('Step 2: follow Go to homepage');
    cy.contains('a', 'Go to homepage').click();
    cy.location('pathname').should('eq', '/');
    getElementByField(CypressFields.HomePage).should('exist');
    getElementByField(CypressFields.ProductCard, getElementByField(CypressFields.ProductList)).should(
      'have.length',
      10
    );
  });
});

export {};
