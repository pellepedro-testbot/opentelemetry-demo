// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { getElementByField, readStoredSession } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

const expectValidSession = () =>
  readStoredSession().then(session => {
    expect(session, 'stored session').to.be.an('object');
    expect(session?.userId).to.be.a('string').and.not.equal('');
    expect(session?.currencyCode).to.be.a('string').and.not.equal('');
    return session!;
  });

describe('Session', () => {
  it('creates and stores a default USD session when none is stored', () => {
    cy.clearLocalStorage();
    cy.visit('/');
    getElementByField(CypressFields.ProductCard).should('have.length.at.least', 1);
    expectValidSession().then(session => {
      expect(session.currencyCode).to.eq('USD');
      getElementByField(CypressFields.SessionId).should('contain', session.userId);
    });
    getElementByField(CypressFields.CurrencySwitcher).should('have.value', 'USD');
    getElementByField(CypressFields.ProductCard).first().should('contain', '$');
  });

  it('restores the stored user and currency after a reload', () => {
    cy.visit('/');
    getElementByField(CypressFields.ProductCard).should('have.length.at.least', 1);
    expectValidSession().then(({ userId }) => {
      getElementByField(CypressFields.CurrencySwitcher).select('JPY');
      getElementByField(CypressFields.CurrencySwitcher).should('have.value', 'JPY');
      cy.reload();
      getElementByField(CypressFields.ProductCard).should('have.length.at.least', 1);
      getElementByField(CypressFields.CurrencySwitcher).should('have.value', 'JPY');
      readStoredSession().should('deep.equal', { userId, currencyCode: 'JPY' });
      getElementByField(CypressFields.SessionId).should('contain', userId);
    });
  });

  [
    { kind: 'not JSON', stored: 'not-json{' },
    { kind: 'missing userId and currencyCode', stored: '{}' },
  ].forEach(({ kind, stored }) => {
    it(`replaces a stored session that is ${kind} with a valid one`, () => {
      cy.visit('/', { onBeforeLoad: win => win.localStorage.setItem('session', stored) });
      getElementByField(CypressFields.ProductCard, getElementByField(CypressFields.ProductList)).should(
        'have.length',
        10
      );
      expectValidSession().then(({ userId }) => {
        getElementByField(CypressFields.SessionId).should('contain', userId);
      });
    });
  });
});

export {};
