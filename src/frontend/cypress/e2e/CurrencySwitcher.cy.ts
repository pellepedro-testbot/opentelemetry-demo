// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { CypressFields, getElementByField } from '../../utils/Cypress';

const optionValues = () =>
  getElementByField(CypressFields.CurrencySwitcher)
    .find('option')
    .then(options => Cypress.$.makeArray(options).map(option => (option as HTMLOptionElement).value));

describe('Currency switcher', () => {
  it('lists the supported currencies sorted, starts in USD and keeps EUR across pages', () => {
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.visit('/');

    cy.log('step 1: a fresh session shows USD selected among sorted options');
    getElementByField(CypressFields.CurrencySwitcher).should('have.value', 'USD');
    optionValues().then(values => {
      expect(values).to.deep.equal([...values].sort());
      expect(values[0]).to.not.eq('USD');
      cy.request<string[]>('/api/currency').then(({ body }) => {
        expect(new Set(values).size).to.eq(values.length);
        expect([...values].sort()).to.deep.equal([...body].sort());
      });
    });

    cy.log('step 2: choose EUR');
    getElementByField(CypressFields.CurrencySwitcher).select('EUR');
    getElementByField(CypressFields.ProductCard).first().should('contain', '€');

    cy.log('step 3: open a product; EUR is still selected and the price is in euros');
    getElementByField(CypressFields.ProductCard).first().click();
    cy.location('pathname').should('match', /^\/product\//);
    getElementByField(CypressFields.CurrencySwitcher).should('have.value', 'EUR');
    getElementByField(CypressFields.ProductPrice, getElementByField(CypressFields.ProductDetail)).should(
      'contain',
      '€'
    );

    cy.log('step 4: EUR survives a reload');
    cy.reload();
    getElementByField(CypressFields.CurrencySwitcher).should('have.value', 'EUR');
    getElementByField(CypressFields.ProductPrice, getElementByField(CypressFields.ProductDetail)).should(
      'contain',
      '€'
    );
  });
});

export {};
