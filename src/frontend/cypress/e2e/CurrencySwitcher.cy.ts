// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import getSymbolFromCurrency from 'currency-symbol-map';
import { getElementByField } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

describe('Currency switcher', () => {
  it('lists the supported currencies in alphabetical order', () => {
    cy.intercept('GET', '/api/currency*').as('getCurrencies');
    cy.visit('/');
    cy.wait('@getCurrencies').then(({ response }) => {
      const supported: string[] = response?.body;
      getElementByField(CypressFields.CurrencySwitcher)
        .find('option')
        .should('have.length', supported.length)
        .then(options => {
          const values = Cypress._.map(options, 'value');
          expect(values).to.deep.equal([...supported].sort());
        });
    });
  });

  it('re-renders the prices in the currency picked from the list', () => {
    cy.intercept('GET', '/api/products?currencyCode=JPY*').as('getProductsInYen');
    cy.visit('/');
    getElementByField(CypressFields.ProductCard, getElementByField(CypressFields.ProductList)).should(
      'have.length',
      10
    );
    getElementByField(CypressFields.CurrencySwitcher).select('JPY');
    cy.wait('@getProductsInYen');
    getElementByField(CypressFields.CurrencySwitcher).should('have.value', 'JPY');
    getElementByField(CypressFields.ProductPrice, getElementByField(CypressFields.ProductList)).each(price =>
      expect(price.text()).to.contain(getSymbolFromCurrency('JPY'))
    );
  });
});

export {};
