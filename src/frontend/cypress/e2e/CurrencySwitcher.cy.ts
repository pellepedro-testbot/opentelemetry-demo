// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { getElementByField } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

const switcherOptions = () =>
  getElementByField(CypressFields.CurrencySwitcher)
    .find('option')
    .then($o => [...$o].map(o => o.value));

describe('Currency switcher', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/currency*').as('getCurrencies');
    cy.visit('/');
  });

  it('switches the shop to euros', () => {
    cy.log('step 1: fresh visit lists the currencies alphabetically with USD selected');
    cy.wait('@getCurrencies');
    cy.request('/api/currency')
      .its('body')
      .then((codes: string[]) => {
        getElementByField(CypressFields.CurrencySwitcher).should('have.value', 'USD');
        switcherOptions().then(options => {
          expect(options, 'alphabetical').to.deep.equal([...options].sort());
          expect(options[0]).to.eq('AUD');
          expect(options, 'same codes as /api/currency, each once').to.have.members(codes);
          expect(new Set(options).size).to.eq(options.length);
        });
      });

    cy.log('step 2: choose EUR and open a product');
    getElementByField(CypressFields.CurrencySwitcher).select('EUR');
    getElementByField(CypressFields.ProductCard).first().click();
    cy.location('pathname').should('match', /^\/product\/\w+$/);
    getElementByField(CypressFields.CurrencySwitcher).should('have.value', 'EUR');
    cy.get(`[data-cy="${CypressFields.ProductDetail}"] [data-cy="${CypressFields.ProductPrice}"]`).should(
      'contain',
      '€'
    );
  });

  it('lists the currencies in alphabetical order', () => {
    cy.wait('@getCurrencies');
    switcherOptions().then(options => {
      expect(options.length).to.be.greaterThan(1);
      expect(options).to.deep.equal([...options].sort());
    });
  });

  it('selects USD on a first visit although USD is not the first option', () => {
    cy.wait('@getCurrencies');
    getElementByField(CypressFields.CurrencySwitcher).should('have.value', 'USD');
    switcherOptions().then(options => expect(options[0]).not.to.eq('USD'));
  });

  it('offers exactly the codes /api/currency returns, each once', () => {
    cy.wait('@getCurrencies');
    cy.request('/api/currency')
      .its('body')
      .then((codes: string[]) => {
        expect(codes.length).to.be.greaterThan(1);
        switcherOptions().then(options => {
          expect(options).to.have.length(codes.length);
          expect(options).to.have.members(codes);
          expect(new Set(options).size).to.eq(options.length);
        });
      });
  });

  it('keeps EUR selected on the next page and shows euro prices', () => {
    getElementByField(CypressFields.CurrencySwitcher).select('EUR');
    getElementByField(CypressFields.ProductCard).first().click();
    cy.location('pathname').should('match', /^\/product\/\w+$/);
    getElementByField(CypressFields.CurrencySwitcher).should('have.value', 'EUR');
    cy.get(`[data-cy="${CypressFields.ProductDetail}"] [data-cy="${CypressFields.ProductPrice}"]`).should(
      'contain',
      '€'
    );
  });
});

export {};
