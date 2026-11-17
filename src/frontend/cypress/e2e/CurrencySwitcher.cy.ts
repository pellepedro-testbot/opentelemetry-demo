// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { getElementByField } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

describe('Currency switcher', () => {
  it('lists the supported currencies alphabetically, starts on USD and keeps euros on the next page', () => {
    cy.log('Step 1: open the home page in a fresh session');
    cy.visit('/');
    getElementByField(CypressFields.CurrencySwitcher).should('have.value', 'USD');

    cy.log('Step 2: read the offered currencies');
    cy.request<string[]>('/api/currency').then(({ body: supported }) => {
      getElementByField(CypressFields.CurrencySwitcher)
        .find('option')
        .then(options => {
          const offered = [...options].map(option => option.value);
          expect(offered, 'options in alphabetical order').to.deep.eq([...offered].sort());
          expect(offered[0], 'first option').to.eq('AUD');
          expect(offered[0], 'first option').not.to.eq('USD');
          expect(new Set(offered).size, 'each code once').to.eq(offered.length);
          expect([...offered].sort(), 'codes of GET /api/currency').to.deep.eq([...supported].sort());
        });
    });

    cy.log('Step 3: choose euros');
    getElementByField(CypressFields.CurrencySwitcher).select('EUR');
    getElementByField(CypressFields.CurrencySwitcher).should('have.value', 'EUR');

    cy.log('Step 4: open a product');
    getElementByField(CypressFields.ProductCard, getElementByField(CypressFields.ProductList)).first().click();
    cy.location('pathname').should('match', /^\/product\/[A-Z0-9]+$/);
    getElementByField(CypressFields.CurrencySwitcher).should('have.value', 'EUR');
    getElementByField(CypressFields.ProductPrice, getElementByField(CypressFields.ProductDetail)).should(
      'contain',
      '€'
    );
  });
});

export {};
