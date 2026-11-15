// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { getElementByField } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';
import { addShownProductToCart, cartLine, interceptStorefrontApi, StepChecks } from '../helpers/storefront';

const RENDER_WAIT_MS = 5000;

const visitWithStoredSession = (stored: string) => {
  cy.on('uncaught:exception', () => false);
  cy.visit('/', {
    onBeforeLoad(win) {
      win.localStorage.setItem('session', stored);
    },
  });
};

const shownSessionId = () =>
  getElementByField(CypressFields.SessionId)
    .invoke('text')
    .then(text => text.replace('session-id:', '').trim());

const storedSession = () => cy.window().then(win => JSON.parse(win.localStorage.getItem('session') || 'null'));

const expectFreshSession = () => {
  getElementByField(CypressFields.ProductCard, getElementByField(CypressFields.ProductList)).should('have.length', 10);
  shownSessionId().then(sessionId => {
    expect(sessionId, 'shown session id').to.not.be.empty;
    storedSession().then(session => {
      expect(session).to.be.an('object');
      expect(session.userId, 'stored userId').to.eq(sessionId);
      expect(session.currencyCode, 'stored currencyCode').to.be.a('string');
    });
  });
};

describe('Stored session recovery', () => {
  it('reuses a valid stored session', () => {
    visitWithStoredSession(JSON.stringify({ userId: 'u-1', currencyCode: 'CAD' }));

    getElementByField(CypressFields.SessionId).should('contain', 'u-1');
    getElementByField(CypressFields.CurrencySwitcher).should('have.value', 'CAD');
  });

  it('replaces a stored session that is not valid JSON', () => {
    visitWithStoredSession('not}{valid-json');

    expectFreshSession();
  });

  it('replaces a stored session that is JSON null', () => {
    visitWithStoredSession('null');

    expectFreshSession();
  });

  it('replaces a stored session that lacks userId and currencyCode', () => {
    visitWithStoredSession('{"foo":1}');

    expectFreshSession();
  });

  it('comes back with a damaged saved session and keeps shopping', () => {
    const checks = new StepChecks();
    let homeSessionId = '';

    const checkHomeRenders = (step: string) => {
      cy.wait(RENDER_WAIT_MS);
      cy.get('body').then($body => {
        const cards = $body.find(`[data-cy="${CypressFields.ProductList}"] [data-cy="${CypressFields.ProductCard}"]`);
        checks.check(`${step} product cards`, () => expect(cards.length).to.eq(10));
        const sessionId = $body.find(`[data-cy="${CypressFields.SessionId}"]`).text().replace('session-id:', '').trim();
        checks.check(`${step} session id`, () => expect(sessionId).to.not.be.empty);
        homeSessionId = sessionId;
      });
    };

    checks.step('Step 1: load the storefront with a stored session that is not JSON');
    visitWithStoredSession('not}{valid-json');
    checkHomeRenders('Step 1');

    checks.step('Step 2: load the storefront with a stored session of null');
    visitWithStoredSession('null');
    checkHomeRenders('Step 2');

    checks.step('Step 3: add a product to the cart');
    interceptStorefrontApi();
    cy.get('body').then($body => {
      const cards = $body.find(`[data-cy="${CypressFields.ProductCard}"]`);
      checks.check('Step 3 product to open', () =>
        expect(cards.length, 'product cards on the page').to.be.greaterThan(0)
      );
      if (cards.length === 0) {
        return;
      }
      getElementByField(CypressFields.ProductCard).first().click();
      addShownProductToCart().then(product => {
        cartLine(product.name).should('be.visible');
      });
      shownSessionId().then(sessionId => {
        checks.check('Step 3 same session id', () => expect(sessionId).to.eq(homeSessionId));
      });
    });

    checks.assertAll();
  });
});

export {};
