// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { getElementByField, StepChecks } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const storedSession = () => cy.window().then(win => String(win.localStorage.getItem('session')));

const footerSessionId = () =>
  getElementByField(CypressFields.SessionId)
    .should('not.have.text', 'session-id: ')
    .invoke('text')
    .then(text => text.replace('session-id:', '').trim());

const visitWithStoredSession = (value: string) =>
  cy.visit('/', {
    onBeforeLoad(win) {
      win.localStorage.setItem('session', value);
    },
  });

describe('Stored session', () => {
  it('saves a new session with a uuid user id and USD on the first visit', () => {
    cy.clearLocalStorage();
    cy.visit('/');
    getElementByField(CypressFields.ProductCard, getElementByField(CypressFields.ProductList)).should(
      'have.length',
      10
    );

    storedSession().then(raw => {
      const session = JSON.parse(raw);
      expect(session.userId).to.match(UUID);
      expect(session.currencyCode).to.eq('USD');
      footerSessionId().should('eq', session.userId);
    });
  });

  it('restores the same user id and the chosen currency after a reload', () => {
    cy.visit('/');
    footerSessionId().then(userId => {
      expect(userId).to.match(UUID);
      getElementByField(CypressFields.CurrencySwitcher).select('GBP');
      getElementByField(CypressFields.ProductCard).should('contain', '£');

      cy.reload();

      footerSessionId().should('eq', userId);
      getElementByField(CypressFields.CurrencySwitcher).should('have.value', 'GBP');
      getElementByField(CypressFields.ProductCard).should('contain', '£');
    });
  });

  it('replaces a corrupted stored session with a fresh valid one', () => {
    cy.on('uncaught:exception', () => false);
    visitWithStoredSession('not}{valid-json');

    getElementByField(CypressFields.ProductCard, getElementByField(CypressFields.ProductList)).should(
      'have.length',
      10
    );
    footerSessionId().then(userId => {
      expect(userId).to.match(UUID);
      storedSession().then(raw => {
        expect(JSON.parse(raw).userId).to.eq(userId);
      });
    });
  });

  it('replaces a stored session without a user id so cart requests carry one', () => {
    cy.intercept('POST', '/api/cart*').as('addToCart');
    visitWithStoredSession('{"currencyCode":"USD"}');

    footerSessionId().should('match', UUID);
    getElementByField(CypressFields.ProductCard).first().click();
    getElementByField(CypressFields.ProductName)
      .invoke('text')
      .then(productName => {
        getElementByField(CypressFields.ProductAddToCart).click();
        cy.wait('@addToCart').then(({ request }) => {
          expect(request.body.userId).to.be.a('string').and.not.be.empty;
        });
        cy.location('pathname', { timeout: 15000 }).should('eq', '/cart');
        cy.contains('a[href^="/product/"]', productName).should('be.visible');
      });
  });

  it('keeps the session across reloads and recovers from a damaged stored session', () => {
    const checks = new StepChecks();
    cy.on('uncaught:exception', () => false);

    cy.log('Step 1: first visit');
    cy.clearLocalStorage();
    cy.visit('/');
    footerSessionId().should('match', UUID);
    storedSession().then(raw => {
      const session = JSON.parse(raw);
      checks.check('step 1 stored currency', session.currencyCode, 'USD');
      checks.check('step 1 stored userId is a uuid', UUID.test(session.userId), true);
      footerSessionId().then(shown => checks.check('step 1 footer shows stored userId', shown, session.userId));
    });

    cy.log('Step 2: choose GBP and reload');
    footerSessionId().then(userId => {
      getElementByField(CypressFields.CurrencySwitcher).select('GBP');
      cy.reload();
      getElementByField(CypressFields.CurrencySwitcher).find('option').should('have.length.greaterThan', 1);
      getElementByField(CypressFields.ProductCard).should('have.length', 10);
      getElementByField(CypressFields.CurrencySwitcher)
        .invoke('val')
        .then(value => checks.check('step 2 currency after reload', value, 'GBP'));
      footerSessionId().then(shown => checks.check('step 2 same userId after reload', shown, userId));
    });

    cy.log('Step 3: corrupted stored session');
    visitWithStoredSession('not}{valid-json');
    cy.wait(3000);
    cy.get('body').then($body => {
      checks.check('step 3 product cards', $body.find(`[data-cy="${CypressFields.ProductCard}"]`).length, 10);
      const shown = $body.find(`[data-cy="${CypressFields.SessionId}"]`).text().replace('session-id:', '').trim();
      checks.check('step 3 footer userId is a uuid', UUID.test(shown), true);
    });
    storedSession().then(raw => {
      let valid = false;
      try {
        valid = UUID.test(JSON.parse(raw).userId);
      } catch {
        valid = false;
      }
      checks.check('step 3 stored session replaced by valid JSON', valid, true);
    });

    cy.log('Step 4: stored session without userId, add a product');
    cy.intercept('POST', '/api/cart*').as('addToCart');
    visitWithStoredSession('{"currencyCode":"USD"}');
    getElementByField(CypressFields.ProductCard).first().click();
    getElementByField(CypressFields.SessionId)
      .invoke('text')
      .then(text => checks.check('step 4 footer userId is a uuid', UUID.test(text.replace('session-id:', '').trim()), true));
    getElementByField(CypressFields.ProductAddToCart).click();
    cy.wait('@addToCart').then(({ request }) => {
      const userId = request.body.userId;
      checks.check('step 4 cart request userId', typeof userId === 'string' && userId.length > 0, true);
    });

    checks.assertAll();
  });
});

export {};
