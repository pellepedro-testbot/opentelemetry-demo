// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import getSymbolFromCurrency from 'currency-symbol-map';
import {
  addProductToCartFromPage,
  emptyStoredCart,
  getElementByField,
  getStoredCart,
  readStoredSession,
} from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

const footerSessionId = () =>
  getElementByField(CypressFields.SessionId)
    .invoke('text')
    .should('match', /^session-id: \S+$/)
    .then(text => text.replace('session-id: ', ''));

const visitWithStoredSession = (stored: string) => {
  cy.on('uncaught:exception', () => false);
  cy.intercept('GET', '/api/cart*').as('getCart');
  cy.visit('/', {
    onBeforeLoad(win) {
      win.localStorage.setItem('session', stored);
    },
  });
};

const expectRecoveredSession = () => {
  getElementByField(CypressFields.HomePage).should('exist');
  getElementByField(CypressFields.ProductCard, getElementByField(CypressFields.ProductList)).should('have.length', 10);
  footerSessionId().then(sessionId => {
    cy.window().then(win => {
      const stored = JSON.parse(win.localStorage.getItem('session') as string);
      expect(stored).to.be.an('object').and.not.be.an('array');
      expect(stored.userId).to.be.a('string').and.eq(sessionId);
      expect(stored.currencyCode).to.eq('USD');
    });
  });
};

const expectNonObjectSessionRecovered = (stored: string) => {
  visitWithStoredSession(stored);
  expectRecoveredSession();
  cy.get('@getCart.all').each(({ request }: { request: { url: string } }) => {
    expect(request.url).to.not.contain('sessionId=undefined');
  });
};

describe('Stored session', () => {
  it('restores the currency, session id and cart after a reload', () => {
    addProductToCartFromPage('OLJCESPC7Z', 1);
    cy.visit('/');
    footerSessionId().then(sessionId => {
      getElementByField(CypressFields.CartItemCount).should('have.text', '1');
      getElementByField(CypressFields.CurrencySwitcher).select('EUR');
      getElementByField(CypressFields.CurrencySwitcher).should('have.value', 'EUR');

      cy.reload();

      getElementByField(CypressFields.CurrencySwitcher).should('have.value', 'EUR');
      getElementByField(CypressFields.ProductCard).should('contain', getSymbolFromCurrency('EUR'));
      getElementByField(CypressFields.SessionId).should('have.text', `session-id: ${sessionId}`);
      getElementByField(CypressFields.CartItemCount).should('have.text', '1');
      getStoredCart(sessionId).its('items').should('have.length', 1);
      emptyStoredCart(sessionId);
    });
  });

  it('replaces a stored session that is not valid JSON with a fresh one', () => {
    visitWithStoredSession('not}{valid-json');
    expectRecoveredSession();
    footerSessionId().should('match', UUID);
  });

  it('replaces a stored session of null with a fresh one', () => {
    expectNonObjectSessionRecovered('null');
  });

  it('replaces a stored session of {} with a fresh one', () => {
    expectNonObjectSessionRecovered('{}');
  });

  it('replaces a stored session of [] with a fresh one', () => {
    expectNonObjectSessionRecovered('[]');
  });

  it('creates and stores a new session on a first visit', () => {
    cy.clearLocalStorage();
    cy.visit('/');
    getElementByField(CypressFields.ProductCard).should('have.length.at.least', 1);
    readStoredSession().then(session => {
      expect(session.userId).to.match(UUID);
      expect(session.currencyCode).to.eq('USD');
      getElementByField(CypressFields.SessionId).should('have.text', `session-id: ${session.userId}`);
    });
    getElementByField(CypressFields.CurrencySwitcher).should('have.value', 'USD');
  });

  it('shows the stored session id in the footer of every page', () => {
    ['/', '/product/OLJCESPC7Z', '/cart'].forEach(path => {
      cy.visit(path);
      readStoredSession().then(({ userId }) => {
        getElementByField(CypressFields.SessionId).should('have.text', `session-id: ${userId}`);
      });
    });
  });
});

export {};
