// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { getElementByField } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';
import { createJourney } from '../../utils/CypressJourney';

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

const storedSession = () => cy.window().then(win => JSON.parse(win.localStorage.getItem('session') || 'null'));

const shownSessionId = () =>
  getElementByField(CypressFields.SessionId)
    .should($el => expect($el.text()).to.match(/^session-id: \S+/))
    .invoke('text')
    .then(text => text.replace('session-id: ', ''));

const visitWithStoredSession = (stored: string) =>
  cy.visit('/', {
    onBeforeLoad(win) {
      win.localStorage.setItem('session', stored);
    },
  });

const productListCards = () =>
  getElementByField(CypressFields.ProductCard, getElementByField(CypressFields.ProductList));

describe('Session', () => {
  it('writes a fresh session on a first visit and shows its id', () => {
    cy.clearLocalStorage();
    cy.visit('/');
    productListCards().should('have.length', 10);
    storedSession().then(session => {
      expect(session.userId, 'stored userId').to.match(UUID);
      expect(session.currencyCode, 'stored currency').to.eq('USD');
      getElementByField(CypressFields.SessionId).should('have.text', `session-id: ${session.userId}`);
    });
  });

  it('restores the stored session after a reload and uses it for the cart', () => {
    cy.visit('/');
    shownSessionId().then(userId => {
      expect(userId).to.match(UUID);
      cy.intercept('GET', '/api/cart*').as('getCart');
      cy.reload();
      getElementByField(CypressFields.SessionId).should('have.text', `session-id: ${userId}`);
      cy.wait('@getCart').its('request.url').should('include', `sessionId=${userId}`);
    });
  });

  it('replaces a corrupted stored session with a fresh valid one', () => {
    visitWithStoredSession('not}{valid-json');
    productListCards().should('have.length', 10);
    shownSessionId().then(userId => {
      expect(userId, 'shown session id').to.match(UUID);
      storedSession().should('deep.equal', { userId, currencyCode: 'USD' });
    });
  });

  it('replaces a stored session without a userId', () => {
    cy.intercept('GET', '/api/cart*').as('getCart');
    visitWithStoredSession('{}');
    productListCards().should('have.length', 10);
    shownSessionId().then(userId => {
      expect(userId, 'shown session id').to.match(UUID);
      cy.wait('@getCart').its('request.url').should('include', `sessionId=${userId}`);
    });
    getElementByField(CypressFields.CurrencySwitcher).should('have.value', 'USD');
  });

  it('replaces a stored session whose userId is not a string', () => {
    visitWithStoredSession('{"userId":5}');
    productListCards().should('have.length', 10);
    shownSessionId().should('match', UUID);
    getElementByField(CypressFields.CurrencySwitcher).should('have.value', 'USD');
  });

  it('comes back with a broken saved session', () => {
    const journey = createJourney();
    const readShownId = ($b: JQuery<HTMLElement>) =>
      $b.find(`[data-cy="${CypressFields.SessionId}"]`).text().replace('session-id: ', '');
    const isUuid = (value: unknown) => UUID.test(String(value));
    let shownId = '';
    const cartRequests: string[] = [];
    cy.intercept('/api/cart*', req => {
      cartRequests.push(req.url);
    });
    cy.on('uncaught:exception', error => {
      journey.record('page error', false, error.message.split('\n').find(line => line.trim().startsWith('>')) || error.message);
      return false;
    });

    journey.step('Step 1: open the store with a corrupted saved session', () => {
      visitWithStoredSession('not}{valid-json');
      journey.check(
        'product cards',
        $b => $b.find(`[data-cy="${CypressFields.ProductList}"] [data-cy="${CypressFields.ProductCard}"]`).length,
        10
      );
      journey.check('session id shown', readShownId, '<uuid>', isUuid);
      cy.window().then(win => {
        let stored: { userId?: unknown } | null = null;
        try {
          stored = JSON.parse(win.localStorage.getItem('session') || 'null');
        } catch {
          stored = null;
        }
        journey.record('stored session is valid JSON with a uuid', isUuid(stored?.userId), `got ${win.localStorage.getItem('session')}`);
      });
    });

    journey.step('Step 2: open the store with a saved session of the wrong shape', () => {
      visitWithStoredSession('{}');
      productListCards().should('have.length', 10);
      journey.check('session id shown for {}', readShownId, '<uuid>', isUuid);
      visitWithStoredSession('{"userId":5}');
      productListCards().should('have.length', 10);
      getElementByField(CypressFields.SessionId).should('not.have.text', 'session-id: ');
      journey.check('session id shown for {"userId":5}', readShownId, '<uuid>', isUuid);
      cy.get('body').then($b => {
        shownId = readShownId($b);
      });
    });

    journey.step('Step 3: add a product to the cart', () => {
      cy.intercept('POST', '/api/cart*').as('addToCart');
      getElementByField(CypressFields.ProductCard).first().click();
      getElementByField(CypressFields.ProductAddToCart).click();
      cy.wait('@addToCart');
      cy.location('pathname').should('eq', '/cart');
      journey.check('cart shows the item', $b => $b.find('select').length > 1, true);
      cy.then(() => {
        const bad = cartRequests.filter(url => {
          const qs = new URL(url).searchParams;
          return qs.has('sessionId') && (qs.get('sessionId') !== shownId || !/^[A-Z]{3}$/.test(qs.get('currencyCode') || ''));
        });
        journey.record(
          'cart requests carry the shown session id and a currency',
          isUuid(shownId) && bad.length === 0,
          `shown id ${JSON.stringify(shownId)}; requests ${JSON.stringify(bad)}`
        );
      });
    });

    cy.location('pathname').should('eq', '/cart');
    cy.get('select').should('have.length.greaterThan', 1);
    cy.window().then(win => {
      const stored = JSON.parse(win.localStorage.getItem('session') || 'null');
      expect(String(stored?.userId), 'stored session userId').to.match(UUID);
      getElementByField(CypressFields.SessionId).should('have.text', `session-id: ${stored.userId}`);
    });

    journey.finish();
  });
});

export {};
