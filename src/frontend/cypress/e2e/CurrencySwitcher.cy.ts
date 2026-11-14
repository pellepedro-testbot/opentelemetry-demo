// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import getSymbolFromCurrency from 'currency-symbol-map';
import { getElementByField, parsePrice } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

const PRODUCT_NAME = 'National Park Foundation Explorascope';
const USD_PER_EUR = 1.1305;

const productCardPrice = () =>
  cy
    .contains(`[data-cy="${CypressFields.ProductCard}"]`, PRODUCT_NAME)
    .find(`[data-cy="${CypressFields.ProductPrice}"]`);

describe('Currency switcher', () => {
  it('lists currency codes in alphabetical order', () => {
    cy.visit('/');
    getElementByField(CypressFields.CurrencySwitcher)
      .find('option')
      .should('have.length.greaterThan', 1)
      .then($options => {
        const codes = [...$options].map(o => (o as HTMLOptionElement).value);
        expect(codes).to.deep.eq([...codes].sort());
      });
  });

  it('reprices products in the selected currency', () => {
    cy.visit('/');
    productCardPrice().should('contain', '$');
    productCardPrice()
      .invoke('text')
      .then(usdText => {
        getElementByField(CypressFields.CurrencySwitcher).find('option[value="EUR"]').should('exist');
        getElementByField(CypressFields.CurrencySwitcher).select('EUR');
        productCardPrice()
          .should('contain', getSymbolFromCurrency('EUR'))
          .should($price => expect(parsePrice($price.text())).to.be.closeTo(parsePrice(usdText) / USD_PER_EUR, 0.01));
      });
  });
});

export {};
