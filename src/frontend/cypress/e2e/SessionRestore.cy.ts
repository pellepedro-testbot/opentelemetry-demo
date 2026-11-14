// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import {
  cartRow,
  createStepChecks,
  emptyStoredCart,
  getElementByField,
  readStoredSession,
  UUID_PATTERN,
} from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

const PRODUCT_ID = 'OLJCESPC7Z';
const PRODUCT_NAME = 'National Park Foundation Explorascope';

const visitWithStoredSession = (stored: string) => {
  cy.visit('/', {
    onBeforeLoad(win) {
      win.localStorage.setItem('session', stored);
    },
  });
};

const expectFreshSession = () =>
  cy.window().should(win => {
    const session = readStoredSession(win);
    expect(session?.userId, 'stored userId').to.match(UUID_PATTERN);
    expect(session?.currencyCode, 'stored currency').to.eq('USD');
  });

const expectAddToCartUsesStoredUser = () => {
  cy.intercept('POST', '/api/cart*').as('addToCart');
  cy.contains(`[data-cy="${CypressFields.ProductCard}"]`, PRODUCT_NAME).click();
  cy.location('pathname').should('eq', `/product/${PRODUCT_ID}`);
  getElementByField(CypressFields.ProductAddToCart).click();
  cy.wait('@addToCart').then(({ request }) => {
    cy.window().then(win => {
      const session = readStoredSession(win);
      expect(request.body.userId).to.be.a('string').and.not.be.empty;
      expect(request.body.userId).to.eq(session?.userId);
    });
  });
};

describe('Session restore', () => {
  afterEach(() => emptyStoredCart());

  it('creates a fresh USD session when none is stored', () => {
    cy.clearLocalStorage();
    cy.visit('/');
    getElementByField(CypressFields.ProductCard).should('have.length.greaterThan', 0);
    expectFreshSession();
    getElementByField(CypressFields.CurrencySwitcher).should('have.value', 'USD');
  });

  it('keeps the user id, selected currency and cart across a reload', () => {
    cy.visit('/');
    getElementByField(CypressFields.ProductCard).should('have.length.greaterThan', 0);
    cy.window().then(win => cy.wrap(readStoredSession(win)?.userId).as('userId'));

    getElementByField(CypressFields.CurrencySwitcher).select('CAD');
    cy.intercept('POST', '/api/cart*').as('addToCart');
    cy.contains(`[data-cy="${CypressFields.ProductCard}"]`, PRODUCT_NAME).click();
    getElementByField(CypressFields.ProductAddToCart).click();
    cy.wait('@addToCart');
    cy.location('pathname').should('eq', '/cart');

    cy.visit('/');
    cy.reload();
    getElementByField(CypressFields.CurrencySwitcher).should('have.value', 'CAD');
    getElementByField(CypressFields.CartItemCount).should('have.text', '1');
    cy.get('@userId').then(userId => {
      cy.window().should(win => expect(readStoredSession(win)?.userId).to.eq(userId));
    });
  });

  it('replaces a stored session that is not JSON', () => {
    visitWithStoredSession('not-json');
    getElementByField(CypressFields.ProductCard).should('have.length.greaterThan', 0);
    expectFreshSession();
    expectAddToCartUsesStoredUser();
  });

  it('replaces a stored session without a user id or currency', () => {
    visitWithStoredSession('{}');
    getElementByField(CypressFields.ProductCard).should('have.length.greaterThan', 0);
    expectFreshSession();
    expectAddToCartUsesStoredUser();
  });

  it('returns to the shop after a broken saved session', () => {
    const checks = createStepChecks();
    cy.on('uncaught:exception', err => {
      checks.check(1, false, `page error: ${err.message}`);
      return false;
    });

    cy.log('Step 1: arrive with a broken saved session');
    visitWithStoredSession('not-json');
    cy.get('body').should('be.visible');
    cy.wait(3000);
    cy.get('body').then($body => {
      const cards = $body.find(`[data-cy="${CypressFields.ProductCard}"]`).length;
      checks.check(1, cards > 0, 'home shows no product cards');
    });
    cy.window().then(win => {
      const session = readStoredSession(win);
      checks.check(
        1,
        UUID_PATTERN.test(String(session?.userId)) && session?.currencyCode === 'USD',
        `stored session is ${win.localStorage.getItem('session')}`
      );
    });

    cy.log('Step 2: open a product and add it to the cart');
    cy.intercept('POST', '/api/cart*').as('addToCart');
    cy.get('body').then($body => {
      if (!$body.find(`[data-cy="${CypressFields.ProductCard}"]`).length) checks.assertAll();
    });
    cy.contains(`[data-cy="${CypressFields.ProductCard}"]`, PRODUCT_NAME).click();
    getElementByField(CypressFields.ProductAddToCart).click();
    cy.wait('@addToCart');
    cy.location('pathname').should('eq', '/cart');
    cartRow(PRODUCT_NAME).should('have.length', 1);
    cy.window().then(win => {
      const session = readStoredSession(win);
      checks.check(
        2,
        UUID_PATTERN.test(String(session?.userId)),
        `stored session is ${win.localStorage.getItem('session')}`
      );
    });

    cy.reload();
    cartRow(PRODUCT_NAME).should('have.length', 1);
    cy.window().then(win => {
      const session = readStoredSession(win);
      checks.check(
        2,
        UUID_PATTERN.test(String(session?.userId)) && session?.currencyCode === 'USD',
        `stored session after reload is ${win.localStorage.getItem('session')}`
      );
    });

    checks.assertAll();
  });
});

export {};
