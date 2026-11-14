// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import getSymbolFromCurrency from 'currency-symbol-map';
import { createSoftChecks, getElementByField, readStoredSession } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

const productCards = () => getElementByField(CypressFields.ProductCard, getElementByField(CypressFields.ProductList));

const footerText = () => getElementByField(CypressFields.SessionId).invoke('text');

describe('Currency and session journeys', () => {
  it('picks a currency and finds it kept after a reload', () => {
    const soft = createSoftChecks();

    cy.log('Step 1: open the storefront with no saved session');
    cy.clearLocalStorage();
    cy.visit('/');
    productCards().should('have.length', 10);
    getElementByField(CypressFields.CurrencySwitcher).should('have.value', 'USD');
    readStoredSession().then(session => {
      soft.check('Step 1 stored currency', () => expect(session.currencyCode).to.eq('USD'));
      footerText().should('eq', `session-id: ${session.userId}`);
      cy.wrap(session.userId).as('userId');
    });

    cy.log('Step 2: open the currency switcher');
    cy.request('/api/currency').then(({ body }) => {
      getElementByField(CypressFields.CurrencySwitcher)
        .find('option')
        .then(options => {
          const values = Array.from(options, option => (option as HTMLOptionElement).value);
          soft.check('Step 2 options sorted', () => expect(values).to.deep.eq([...(body as string[])].sort()));
        });
    });

    cy.log('Step 3: select EUR');
    getElementByField(CypressFields.CurrencySwitcher).select('EUR');
    getElementByField(CypressFields.CurrencySwitcher).should('have.value', 'EUR');
    productCards().should('contain', getSymbolFromCurrency('EUR'));

    cy.log('Step 4: reload the page');
    cy.reload();
    productCards().should('have.length', 10);
    getElementByField(CypressFields.CurrencySwitcher).should('have.value', 'EUR');
    productCards().each(card => {
      cy.wrap(card).should('contain', getSymbolFromCurrency('EUR'));
    });
    cy.get<string>('@userId').then(userId => {
      footerText().should('eq', `session-id: ${userId}`);
    });

    soft.assertAll();
  });

  it('comes back with a damaged saved session and still shops', () => {
    const soft = createSoftChecks();
    cy.on('uncaught:exception', () => false);
    cy.intercept('GET', '/api/cart*').as('getCart');

    const openWithStoredSession = (stored: string, step: string) => {
      cy.clearLocalStorage();
      cy.visit('/', {
        onBeforeLoad(win) {
          win.localStorage.setItem('session', stored);
        },
      });
      cy.wait(2000);
      cy.get('body').then(body => {
        const cards = body.find(`[data-cy="${CypressFields.ProductCard}"]`);
        const footer = body.find(`[data-cy="${CypressFields.SessionId}"]`).text();
        soft.check(`${step} (${stored}) product cards`, () => expect(cards).to.have.length(10));
        soft.check(`${step} (${stored}) footer session id`, () => expect(footer).to.match(/^session-id: \S+$/));
      });
      cy.window().then(win => {
        soft.check(`${step} (${stored}) stored session`, () => {
          const session = JSON.parse(win.localStorage.getItem('session') as string);
          expect(session).to.be.an('object').and.not.be.an('array');
          expect(session.userId).to.be.a('string');
          expect(session.currencyCode).to.eq('USD');
        });
      });
    };

    cy.log('Step 1: open the storefront with an unreadable saved session');
    openWithStoredSession('not}{valid-json', 'Step 1');

    cy.log('Step 2: reopen with saved sessions that are not session objects');
    ['null', '{}'].forEach(stored => openWithStoredSession(stored, 'Step 2'));
    cy.get('@getCart.all').then(requests => {
      const urls = (requests as unknown as { request: { url: string } }[]).map(({ request }) => request.url);
      soft.check('Step 2 cart requests', () => urls.forEach(url => expect(url).to.not.contain('sessionId=undefined')));
    });

    cy.log('Step 3: open a product');
    productCards().first().click();
    getElementByField(CypressFields.ProductDetail).should('exist');
    cy.wait(1000);
    cy.window().then(win => {
      const footer = win.document.querySelector(`[data-cy="${CypressFields.SessionId}"]`)?.textContent;
      soft.check('Step 3 stored session shown in footer', () => {
        const session = JSON.parse(win.localStorage.getItem('session') as string);
        expect(session.userId).to.be.a('string');
        expect(footer).to.eq(`session-id: ${session.userId}`);
      });
    });

    soft.assertAll();
  });
});

export {};
