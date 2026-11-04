// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import getSymbolFromCurrency from 'currency-symbol-map';
import { getElementByField } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

const switcherOptions = () =>
  getElementByField(CypressFields.CurrencySwitcher)
    .find('option')
    .then($options => [...$options].map(option => (option as HTMLOptionElement).value));

describe('Currency switcher', () => {
  it('lists the supported currencies in alphabetical order', () => {
    cy.request('GET', '/api/currency').then(({ body }: { body: string[] }) => {
      cy.visit('/');
      switcherOptions().should(options => {
        expect(options).to.have.length(new Set(body).size);
        expect(options).to.deep.eq([...options].sort());
        expect(options).to.have.members([...new Set(body)]);
      });
    });
  });

  it('offers EUR and shows prices in euros once it is chosen', () => {
    cy.visit('/');
    switcherOptions().should('include', 'EUR');
    getElementByField(CypressFields.CurrencySwitcher).select('EUR');
    getElementByField(CypressFields.CurrencySwitcher).should('have.value', 'EUR');
    getElementByField(CypressFields.ProductCard)
      .first()
      .find(`[data-cy="${CypressFields.ProductPrice}"]`)
      .should('contain', getSymbolFromCurrency('EUR'));
  });
});

export {};
