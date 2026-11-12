// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import getSymbolFromCurrency from 'currency-symbol-map';
import { createJourney, emptyStoredSessionCart, getElementByField, getStoredSession } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

const productName = 'National Park Foundation Explorascope';
const corruptedSession = 'not}{valid-json';
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

const getHomeProductCards = () =>
  getElementByField(CypressFields.ProductCard, getElementByField(CypressFields.ProductList));

const readCurrencyOptions = () =>
  getElementByField(CypressFields.CurrencySwitcher)
    .find('option')
    .then($options => [...$options].map(option => (option as HTMLOptionElement).value));

describe('Currency and session', () => {
  afterEach(() => {
    emptyStoredSessionCart();
  });

  it('switches to euro and still has euro selected after a reload', () => {
    const journey = createJourney();
    let userId = '';

    journey.step('1. read the currency list', () => {
      cy.visit('/');
      getElementByField(CypressFields.CurrencySwitcher).should('have.value', 'USD');
      getStoredSession().then(session => {
        userId = session.userId || '';
      });
      cy.request('/api/currency').then(({ body }) => {
        const codes = body as string[];
        getElementByField(CypressFields.CurrencySwitcher).find('option').should('have.length', codes.length);
        readCurrencyOptions().then(options => {
          expect(options).to.deep.equal([...new Set(codes)].sort());
          expect(options[0]).to.eq('AUD');
          expect(options[options.length - 1]).to.eq('ZAR');
        });
      });
    });

    journey.step('2. select euro', () => {
      getElementByField(CypressFields.CurrencySwitcher).select('EUR');
      getElementByField(CypressFields.CurrencySwitcher).should('have.value', 'EUR');
      getHomeProductCards().should('have.length', 10).first().should('contain', getSymbolFromCurrency('EUR'));
      getStoredSession().its('currencyCode').should('eq', 'EUR');
    });

    journey.step('3. reload the storefront', () => {
      cy.reload();
      getElementByField(CypressFields.CurrencySwitcher).should('have.value', 'EUR');
      getHomeProductCards().first().should('contain', getSymbolFromCurrency('EUR'));
      cy.then(() => getElementByField(CypressFields.SessionId).should('contain', `session-id: ${userId}`));
      getStoredSession().should(session => {
        expect(session.userId).to.eq(userId);
        expect(session.currencyCode).to.eq('EUR');
      });
    });

    journey.verify();
  });

  it('returns to the shop with a damaged saved session', () => {
    const journey = createJourney();

    journey.step('1. first visit', () => {
      cy.visit('/');
      getStoredSession().then(session => {
        expect(session.userId).to.match(uuidPattern);
        expect(session.currencyCode).to.eq('USD');
        getElementByField(CypressFields.SessionId).should('contain', session.userId);
      });
    });

    journey.step('2. load the storefront with a damaged saved session', () => {
      cy.on('uncaught:exception', error => {
        journey.check(() => assert.fail(`the page threw ${error.message}`));
        return false;
      });
      cy.visit('/', {
        onBeforeLoad(win) {
          win.localStorage.setItem('session', corruptedSession);
        },
      });
      cy.wait(5000);
      cy.get('body').then($body =>
        journey.check(() =>
          expect($body.find('[data-cy="product-list"] [data-cy="product-card"]').length, 'product cards').to.eq(10)
        )
      );
      cy.window().then(win => {
        const stored = win.localStorage.getItem('session') || '';
        journey.check(() => {
          const session = JSON.parse(stored);
          expect(session.userId).to.be.a('string').and.not.be.empty;
          expect(Cypress.$('[data-cy="session-id"]').text()).to.contain(session.userId);
        });
      });
    });

    journey.step('3. add a product to the cart', () => {
      cy.contains('[data-cy="product-card"]', productName).click();
      getElementByField(CypressFields.ProductAddToCart).click();
      cy.location('pathname').should('eq', '/cart');
      cy.get('main').should('contain', productName);
    });

    journey.verify();
  });

  it('recovers a corrupted stored session on load', () => {
    cy.on('uncaught:exception', () => false);
    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.setItem('session', corruptedSession);
      },
    });
    getHomeProductCards().should('have.length', 10);
    cy.window().then(win => {
      const session = JSON.parse(win.localStorage.getItem('session') || '');
      expect(session.userId).to.be.a('string').and.not.be.empty;
      getElementByField(CypressFields.SessionId).should('contain', `session-id: ${session.userId}`);
    });
  });
});

export {};
