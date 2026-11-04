// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import getSymbolFromCurrency from 'currency-symbol-map';
import { getElementByField } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';
import { cartShipping, cartTotal, confirmationShipping, confirmationTotal } from '../../utils/CypressCartPage';
import { createJourney } from '../../utils/CypressJourney';

// The currency service's rate table (src/currency/src/server.cpp, currency_conversion).
const RATE_TABLE_CODES = [
  'EUR', 'USD', 'JPY', 'BGN', 'CZK', 'DKK', 'GBP', 'HUF', 'PLN', 'RON', 'SEK', 'CHF', 'ISK', 'NOK', 'HRK', 'RUB', 'TRY',
  'AUD', 'BRL', 'CAD', 'CNY', 'HKD', 'IDR', 'ILS', 'INR', 'KRW', 'MXN', 'MYR', 'NZD', 'PHP', 'SGD', 'THB', 'ZAR',
];

const TELESCOPE = 'Starsense Explorer';

const switcherOptions = () =>
  getElementByField(CypressFields.CurrencySwitcher)
    .find('option')
    .should('have.length.greaterThan', 1)
    .then($options => $options.toArray().map(o => (o as HTMLOptionElement).value));

const storedSession = () => cy.window().then(win => JSON.parse(win.localStorage.getItem('session') || '{}'));

const addTelescopeFromHome = () => {
  cy.intercept('POST', '/api/cart*').as('addToCart');
  getElementByField(CypressFields.ProductCard).filter(`:contains("${TELESCOPE}")`).first().click();
  getElementByField(CypressFields.ProductName).should('contain', TELESCOPE);
  getElementByField(CypressFields.ProductAddToCart).click();
  cy.wait('@addToCart');
  cy.location('pathname').should('eq', '/cart');
};

describe('Currency', () => {
  it('answers GET /api/currency with every currency of the rate table', () => {
    cy.request('/api/currency').then(({ status, body }) => {
      expect(status).to.eq(200);
      expect(body).to.be.an('array');
      expect(body).to.include.members(RATE_TABLE_CODES);
    });
  });

  it('lists the supported currencies in the switcher sorted, euros included', () => {
    cy.visit('/');
    switcherOptions().then(values => {
      expect(values, 'options in ascending order').to.deep.equal([...values].sort());
      expect(values, 'options').to.include('EUR');
    });
  });

  it('re-prices the store in euros and keeps the choice after a reload', () => {
    cy.visit('/');
    switcherOptions();
    getElementByField(CypressFields.CurrencySwitcher).select('EUR');
    getElementByField(CypressFields.CurrencySwitcher).should('have.value', 'EUR');
    getElementByField(CypressFields.ProductCard, getElementByField(CypressFields.ProductList)).should('have.length', 10);
    getElementByField(CypressFields.ProductCard).first().should('contain', getSymbolFromCurrency('EUR'));
    cy.reload();
    switcherOptions();
    getElementByField(CypressFields.CurrencySwitcher).should('have.value', 'EUR');
  });

  it('keeps the cart shipping and total on the confirmation of an order in yen', () => {
    cy.intercept('POST', '/api/checkout*').as('placeOrder');
    cy.intercept('GET', '/api/shipping*').as('getShipping');
    cy.visit('/');
    switcherOptions();
    getElementByField(CypressFields.CurrencySwitcher).select('JPY');
    getElementByField(CypressFields.CurrencySwitcher).should('have.value', 'JPY');
    addTelescopeFromHome();
    cy.wait('@getShipping');
    cy.get('body').should($b => {
      expect(cartShipping($b), 'cart shipping').to.match(/^¥ \d+\.\d\d$/);
      expect(cartTotal($b), 'cart total').to.match(/^¥ \d+\.\d\d$/);
    });
    cy.get('body').then($b => {
      const shipping = cartShipping($b);
      const total = cartTotal($b);
      getElementByField(CypressFields.CheckoutPlaceOrder).click();
      cy.wait('@placeOrder').its('response.statusCode').should('eq', 200);
      cy.contains('Your order is complete!').should('be.visible');
      cy.get('body').should($confirmation => {
        expect(confirmationShipping($confirmation), 'confirmation shipping').to.eq(shipping);
        expect(confirmationTotal($confirmation), 'confirmation total').to.eq(total);
      });
    });
  });

  it('shops in euros', () => {
    const journey = createJourney();
    let userId = '';
    let euroOffered = false;
    cy.intercept('POST', '/api/checkout*').as('placeOrder');
    cy.intercept('GET', '/api/shipping*').as('getShipping');

    journey.step('Step 1: read the currency switcher', () => {
      cy.visit('/');
      switcherOptions().then(values => {
        euroOffered = values.includes('EUR');
        journey.record('options sorted', Cypress._.isEqual(values, [...values].sort()), `got ${values.join(',')}`);
        journey.record('EUR offered', euroOffered, `options were ${values.join(',')}`);
      });
      storedSession().then(session => {
        userId = session.userId;
      });
    });

    cy.then(() => {
      if (!euroOffered) {
        journey.record('Steps 2-5 not reached', false, 'EUR cannot be selected, so the euro journey stops at step 2');
        return;
      }

      journey.step('Step 2: select euros', () => {
        getElementByField(CypressFields.CurrencySwitcher).select('EUR');
        journey.check('switcher value', $b => $b.find(`[data-cy="${CypressFields.CurrencySwitcher}"]`).val(), 'EUR');
        journey.check(
          'first product card priced in euros',
          $b => $b.find(`[data-cy="${CypressFields.ProductCard}"]`).first().text().includes('€'),
          true
        );
        storedSession().then(session => {
          journey.record('stored currency', session.currencyCode === 'EUR', `got ${session.currencyCode}`);
          journey.record('stored userId unchanged', session.userId === userId, `got ${session.userId}`);
        });
      });

      journey.step('Step 3: reload', () => {
        cy.reload();
        journey.check('switcher value after reload', $b => $b.find(`[data-cy="${CypressFields.CurrencySwitcher}"]`).val(), 'EUR');
        journey.check(
          'session id after reload',
          $b => $b.find(`[data-cy="${CypressFields.SessionId}"]`).text(),
          `session-id: ${userId}`
        );
      });

      journey.step('Step 4: add the telescope to the cart', () => {
        addTelescopeFromHome();
        cy.wait('@getShipping');
        journey.check('cart shipping in euros', cartShipping, '€ <amount>', actual => /^€ \d+\.\d\d$/.test(String(actual)));
        journey.check('cart total in euros', cartTotal, '€ <amount>', actual => /^€ \d+\.\d\d$/.test(String(actual)));
      });

      journey.step('Step 5: place the order', () => {
        cy.get('body').then($b => {
          const shipping = cartShipping($b);
          const total = cartTotal($b);
          getElementByField(CypressFields.CheckoutPlaceOrder).click();
          cy.wait('@placeOrder').its('response.statusCode').should('eq', 200);
          cy.location('pathname').should('match', /^\/cart\/checkout\/[^/]+$/);
          journey.check('confirmation title', $c => $c.text().includes('Your order is complete!'), true);
          journey.check('confirmation shipping equals cart shipping', confirmationShipping, shipping);
          journey.check('confirmation total equals cart total', confirmationTotal, total);
          cy.get('body').should($c => {
            expect($c.text()).to.include('Your order is complete!');
            expect(confirmationShipping($c), 'confirmation Shipping:').to.eq(shipping).and.match(/^€ /);
            expect(confirmationTotal($c), 'confirmation Total:').to.eq(total).and.match(/^€ /);
          });
        });
      });
    });

    journey.finish();
  });
});

export {};
