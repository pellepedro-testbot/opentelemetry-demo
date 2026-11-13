// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { createStepChecks, getElementByField } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

// A v4 uuid such as 0f8fad5b-d9cb-469f-a165-70867728950e.
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

const IMAGER = { id: '0PUK6V6EV0', name: 'Solar System Color Imager' };

const readStoredSession = () => cy.window().then(win => cy.wrap<string | null>(win.localStorage.getItem('session')));

const parseSession = (raw: string | null) => {
  try {
    return JSON.parse(raw || 'null');
  } catch {
    return null;
  }
};

const isValidSession = (session: { userId?: unknown; currencyCode?: unknown } | null) =>
  !!session && typeof session.userId === 'string' && !!session.userId && typeof session.currencyCode === 'string';

const reloadWithStoredSession = (stored: string) => {
  cy.window().then(win => win.localStorage.setItem('session', stored));
  cy.reload();
};

describe('Session restore', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/cart*').as('addToCart');
  });

  it('keeps the currency and cart after a reload and recovers from a corrupted session', () => {
    const steps = createStepChecks();
    let userId = '';

    cy.log('Step 1: a first visit stores a new session');
    cy.visit('/');
    getElementByField(CypressFields.ProductCard).should('have.length.at.least', 1);
    readStoredSession().then(raw => {
      const session = parseSession(raw);
      expect(session, 'stored session').to.have.property('currencyCode', 'USD');
      expect(session.userId, 'stored userId').to.match(UUID);
      userId = session.userId;
    });

    cy.log('Step 2: choose GBP and add a product');
    getElementByField(CypressFields.CurrencySwitcher).select('GBP');
    getElementByField(CypressFields.ProductCard).filter(`:contains("${IMAGER.name}")`).click();
    cy.location('pathname').should('eq', `/product/${IMAGER.id}`);
    getElementByField(CypressFields.ProductAddToCart).click();
    cy.wait('@addToCart');
    getElementByField(CypressFields.CartItemCount).should('contain', '1');

    cy.log('Step 3: come back later');
    cy.reload();
    getElementByField(CypressFields.CurrencySwitcher).should('have.value', 'GBP');
    getElementByField(CypressFields.CartItemCount).should('contain', '1');
    readStoredSession().then(raw => {
      expect(parseSession(raw), 'stored session after reload').to.deep.equal({ userId, currencyCode: 'GBP' });
    });

    cy.log('Step 4: a corrupted stored session does not break the shop');
    // A page error is read below as missing product cards, so the journey goes on to step 5.
    cy.on('uncaught:exception', () => false);
    ['not-json', '{}'].forEach(stored => {
      reloadWithStoredSession(stored);
      // Give the page time to render (or to fail) before reading it.
      cy.wait(3000);
      cy.get('body').then($body => {
        const cards = $body.find(`[data-cy="${CypressFields.ProductCard}"]`).length;
        steps.check(cards > 0, `step 4: with session ${stored} the home page shows ${cards} product cards`);
      });
      readStoredSession().then(raw =>
        steps.check(isValidSession(parseSession(raw)), `step 4: with session ${stored} the stored session is ${raw}`)
      );
    });

    cy.log('Step 5: the cart page opens');
    cy.get('body').then($body => {
      const cartIcon = $body.find(`[data-cy="${CypressFields.CartIcon}"]`);
      steps.check(cartIcon.length === 1, 'step 5: no cart icon to open the cart from');
      if (cartIcon.length === 1) {
        getElementByField(CypressFields.CartIcon).click({ force: true });
        getElementByField(CypressFields.CartGoToShopping).click();
      }
    });
    cy.wait(3000);
    cy.get('body').then($body => {
      const headings = $body.find('h1').filter((_, h1) => h1.textContent === 'Shopping Cart').length;
      steps.check(headings === 1, 'step 5: the cart page shows no Shopping Cart heading');
    });

    steps.assertAll();
  });

  const replacesStoredSession = (stored: string) => {
    // Let the checks below report what the shopper sees rather than the page error.
    cy.on('uncaught:exception', () => false);
    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.setItem('session', stored);
      },
    });

    getElementByField(CypressFields.ProductCard).should('have.length.at.least', 1);
    readStoredSession().then(raw => expect(isValidSession(parseSession(raw)), `stored session ${raw}`).to.eq(true));
    cy.visit('/cart');
    cy.contains('h1', 'Shopping Cart').should('be.visible');
  };

  it('replaces a stored session of not-json with a fresh one', () => {
    replacesStoredSession('not-json');
  });

  it('replaces a stored session of {} with a fresh one', () => {
    replacesStoredSession('{}');
  });
});

export {};
