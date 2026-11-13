// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import getSymbolFromCurrency from 'currency-symbol-map';
import { getElementByField, getStoredSession, startJourney } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

const assertPricesIn = (symbol: string) =>
  getElementByField(CypressFields.ProductPrice, getElementByField(CypressFields.ProductList))
    .should('have.length', 10)
    .each(price => {
      expect(price.text()).to.match(new RegExp(`^${symbol} \\d+\\.\\d{2}$`));
    });

describe('Currency journey', () => {
  it('switches the currency and finds it kept when coming back later', () => {
    const journey = startJourney();
    const euro = getSymbolFromCurrency('EUR') as string;
    const seen: { sessionId?: string } = {};
    cy.intercept('GET', '/api/currency*').as('getCurrencies');

    journey.step('1. / - open the currency switcher', () => {
      cy.visit('/');
      getStoredSession().then(({ userId }) => {
        seen.sessionId = userId;
      });
      cy.wait('@getCurrencies')
        .its('response.body')
        .then((codes: string[]) => {
          getElementByField(CypressFields.CurrencySwitcher)
            .find('option')
            .should('have.length', codes.length)
            .then(options => {
              expect([...options].map(option => option.value)).to.deep.eq([...codes].sort());
            });
        });
    });

    journey.step('2. / - select EUR', () => {
      getElementByField(CypressFields.CurrencySwitcher).select('EUR');
      getElementByField(CypressFields.CurrencySwitcher).should('have.value', 'EUR');
      assertPricesIn(euro);
    });

    journey.step('3. / - reload the page', () => {
      cy.reload();
      getElementByField(CypressFields.CurrencySwitcher).should('have.value', 'EUR');
      assertPricesIn(euro);
      getStoredSession().then(({ userId, currencyCode }) => {
        expect(userId).to.eq(seen.sessionId);
        expect(currencyCode).to.eq('EUR');
        getElementByField(CypressFields.SessionId).should('have.text', `session-id: ${seen.sessionId}`);
      });
    });

    journey.assertNoFailedChecks();
  });
});

export {};
