// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { getElementByField, journeySteps } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

interface IStoredSession {
  userId?: unknown;
  currencyCode?: unknown;
}

const readStoredSession = (win: Window): IStoredSession | string => {
  const raw = win.localStorage.getItem('session') || '';
  try {
    return JSON.parse(raw);
  } catch {
    return raw;
  }
};

const expectValidSession = (session: IStoredSession | string) => {
  expect(session, 'stored session').to.be.an('object');
  const { userId, currencyCode } = session as IStoredSession;
  expect(userId, 'userId').to.be.a('string').and.have.length.above(0);
  expect(currencyCode, 'currencyCode').to.be.a('string').and.have.length.above(0);
};

const visitWithStoredSession = (stored: string, pageErrors: string[]) => {
  cy.on('uncaught:exception', error => {
    pageErrors.push(error.message);
    return false;
  });
  cy.visit('/', {
    onBeforeLoad(win) {
      win.localStorage.setItem('session', stored);
    },
  });
};

describe('Session restore', () => {
  const cartUsers: string[] = [];

  afterEach(() => {
    cartUsers
      .splice(0)
      .forEach(userId => cy.request({ method: 'DELETE', url: '/api/cart', body: { userId }, failOnStatusCode: false }));
  });

  it('comes back to the shop and finds the currency and cart as they were left', () => {
    const steps = journeySteps();
    const pageErrors: string[] = [];
    let userId = '';

    cy.intercept('POST', '/api/cart*').as('addToCart');
    cy.intercept('GET', '/api/cart*').as('getCart');

    cy.log('Step 1: open the shop with no stored session');
    cy.clearLocalStorage();
    cy.visit('/');
    getElementByField(CypressFields.ProductCard).should('have.length', 10);
    cy.window().then(win => {
      const session = readStoredSession(win);
      steps.check('1. a new session is stored', () => {
        expectValidSession(session);
        expect((session as IStoredSession).currencyCode).to.eq('USD');
      });
      userId = String((session as IStoredSession).userId);
      cartUsers.push(userId);
    });
    getElementByField(CypressFields.CurrencySwitcher).then($select =>
      steps.check('1. switcher shows USD', () => expect($select.val()).to.eq('USD'))
    );

    cy.log('Step 2: choose CAD and add a product');
    getElementByField(CypressFields.CurrencySwitcher).select('CAD');
    getElementByField(CypressFields.CurrencySwitcher).should('have.value', 'CAD');
    getElementByField(CypressFields.ProductList).find('a[href="/product/0PUK6V6EV0"]').click();
    getElementByField(CypressFields.ProductAddToCart).click();
    cy.wait('@addToCart');
    cy.wait('@getCart');
    getElementByField(CypressFields.CartItemCount).should('have.text', '1');

    cy.log('Step 3: reopen the shop');
    cy.visit('/');
    getElementByField(CypressFields.ProductCard).should('have.length', 10);
    cy.wait(3000);
    getElementByField(CypressFields.CurrencySwitcher).then($select =>
      steps.check('3. switcher still shows CAD', () => expect($select.val()).to.eq('CAD'))
    );
    cy.get('body').then($body =>
      steps.check('3. cart count still 1', () => expect($body.find('[data-cy="cart-item-count"]').text()).to.eq('1'))
    );
    cy.window().then(win => {
      const session = readStoredSession(win) as IStoredSession;
      steps.check('3. stored session keeps the user and CAD', () => {
        expect(session.userId).to.eq(userId);
        expect(session.currencyCode).to.eq('CAD');
      });
    });

    for (const stored of ['not-json', '{}']) {
      cy.log(`Step 4: reload with a corrupt stored session ${stored}`);
      visitWithStoredSession(stored, pageErrors);
      cy.wait(2000);
      cy.get('body').then($body => {
        steps.check(`4. ${stored}: product cards render`, () =>
          expect($body.find('[data-cy="product-card"]').length).to.eq(10)
        );
        steps.check(
          `4. ${stored}: session id shown`,
          () => expect($body.find('[data-cy="session-id"]').text().replace('session-id:', '').trim()).not.to.be.empty
        );
      });
      cy.window().then(win =>
        steps.check(`4. ${stored}: stored session replaced`, () => expectValidSession(readStoredSession(win)))
      );
      cy.then(() => {
        steps.check(`4. ${stored}: no page error`, () => expect(pageErrors).to.be.empty);
        pageErrors.length = 0;
      });
    }

    cy.then(() => steps.assertAll());
  });

  const expectCorruptSessionReplaced = (stored: string) => {
    const pageErrors: string[] = [];

    visitWithStoredSession(stored, pageErrors);

    getElementByField(CypressFields.ProductCard, getElementByField(CypressFields.ProductList)).should(
      'have.length',
      10
    );
    // A non-blank id after the 'session-id:' label.
    getElementByField(CypressFields.SessionId)
      .invoke('text')
      .should('match', /session-id: \S+/);
    cy.window().then(win => expectValidSession(readStoredSession(win)));
    cy.then(() => expect(pageErrors, 'uncaught page errors').to.be.empty);
  };

  it('replaces a corrupt stored session (not-json) with a fresh one', () => {
    expectCorruptSessionReplaced('not-json');
  });

  it('replaces a corrupt stored session ({}) with a fresh one', () => {
    expectCorruptSessionReplaced('{}');
  });
});

export {};
