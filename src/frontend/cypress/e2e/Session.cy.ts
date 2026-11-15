// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { getElementByField } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

const visitWithStoredSession = (stored: string) => {
  // A stored session that cannot be read must not stop the page; the checks below report what it does instead.
  cy.on('uncaught:exception', () => false);
  cy.visit('/', {
    onBeforeLoad(win) {
      win.localStorage.setItem('session', stored);
    },
  });
};

const expectHomeAndValidStoredSession = () => {
  getElementByField(CypressFields.ProductCard, getElementByField(CypressFields.ProductList)).should('have.length', 10);
  cy.window().should(win => {
    const session = JSON.parse(win.localStorage.getItem('session') || 'null');
    expect(session, 'stored session').to.be.an('object');
    expect(session.userId, 'stored userId').to.be.a('string').and.not.be.empty;
    expect(session.currencyCode, 'stored currencyCode').to.be.a('string').and.not.be.empty;
  });
};

describe('Stored session', () => {
  it('replaces a stored session that is not JSON', () => {
    visitWithStoredSession('not-json{');
    expectHomeAndValidStoredSession();
  });

  it('replaces a stored session that is JSON null', () => {
    visitWithStoredSession('null');
    expectHomeAndValidStoredSession();
  });

  it('replaces a stored session that is an empty object', () => {
    visitWithStoredSession('{}');
    expectHomeAndValidStoredSession();
  });
});

export {};
