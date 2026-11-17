// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { createStepChecks, getElementByField } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

const storedSession = (win: Window) => JSON.parse(win.localStorage.getItem('session') || 'null');

const footerSessionId = () =>
  getElementByField(CypressFields.SessionId)
    .should($el => expect($el.text().replace('session-id:', '').trim()).to.match(UUID))
    .invoke('text')
    .then(text => text.replace('session-id:', '').trim());

const visitWithStoredSession = (value: string) =>
  cy.visit('/', {
    onBeforeLoad(win) {
      win.localStorage.setItem('session', value);
    },
  });

describe('Session restore on load', () => {
  it('comes back to the shop later', () => {
    const steps = createStepChecks();
    let firstUserId = '';
    let step = 'step 1';
    cy.on('uncaught:exception', error => {
      steps.check(`${step} page error`, () => {
        throw error;
      });
      return false;
    });

    // Step 1: first visit with an empty localStorage
    cy.visit('/');
    getElementByField(CypressFields.ProductCard, getElementByField(CypressFields.ProductList)).should(
      'have.length',
      10
    );
    footerSessionId().then(id => {
      firstUserId = id;
      steps.check('step 1 footer session id is a uuid', () => expect(id).to.match(UUID));
    });
    cy.window().then(win => {
      const session = storedSession(win);
      steps.check('step 1 stored session', () => {
        expect(session?.userId).to.equal(firstUserId);
        expect(session?.currencyCode).to.equal('USD');
      });
    });

    // Step 2: select GBP and reload
    cy.then(() => (step = 'step 2'));
    getElementByField(CypressFields.CurrencySwitcher).select('GBP');
    getElementByField(CypressFields.ProductCard).should('contain', '£');
    cy.reload();
    getElementByField(CypressFields.ProductCard, getElementByField(CypressFields.ProductList)).should(
      'have.length',
      10
    );
    getElementByField(CypressFields.CurrencySwitcher).then($select =>
      steps.check('step 2 currency kept after reload', () => expect($select.val()).to.equal('GBP'))
    );
    footerSessionId().then(id =>
      steps.check('step 2 same session id after reload', () => expect(id).to.equal(firstUserId))
    );

    // Step 3: add a product, then empty the cart
    cy.then(() => (step = 'step 3'));
    cy.contains('[data-cy="product-card"]', 'Solar Filter').click();
    cy.contains('button', 'Add To Cart').click();
    cy.location('pathname').should('eq', '/cart');
    cy.contains('main', 'Solar Filter').should('exist');
    cy.contains('button', 'Empty Cart').click();
    cy.contains('main', 'Your shopping cart is empty').should('be.visible');
    cy.get('main').then($main =>
      steps.check('step 3 no cart line left', () => expect($main.find('img[alt="Solar Filter"]')).to.have.length(0))
    );

    // Step 4: come back with a corrupted stored session
    cy.then(() => (step = 'step 4'));
    visitWithStoredSession('not}{valid-json');
    cy.wait(3000);
    cy.get('body').then($body =>
      steps.check('step 4 product cards render', () =>
        expect($body.find('[data-cy="product-list"] [data-cy="product-card"]')).to.have.length(10)
      )
    );
    cy.get('body').then($body => {
      const text = $body.find('[data-cy="session-id"]').text().replace('session-id:', '').trim();
      steps.check('step 4 footer session id is a uuid', () => expect(text).to.match(UUID));
    });
    cy.window().then(win => {
      let session: { userId?: unknown; currencyCode?: unknown } | null = null;
      try {
        session = storedSession(win);
      } catch {
        session = null;
      }
      steps.check('step 4 stored session replaced', () => {
        expect(session?.userId).to.be.a('string');
        expect(session?.currencyCode).to.equal('USD');
      });
    });

    // Step 5: come back with an incomplete stored session
    cy.then(() => (step = 'step 5'));
    visitWithStoredSession('{"foo":1}');
    cy.wait(3000);
    cy.get('body').then($body => {
      const text = $body.find('[data-cy="session-id"]').text().replace('session-id:', '').trim();
      steps.check('step 5 footer session id is a uuid', () => expect(text).to.match(UUID));
      steps.check('step 5 currency switcher shows USD', () =>
        expect($body.find('[data-cy="currency-switcher"]').val()).to.equal('USD')
      );
    });

    steps.assertAllPassed();
  });

  it('restores a valid stored session after a reload', () => {
    cy.intercept('GET', '/api/currency*', req => {
      delete req.headers['if-none-match'];
      req.continue(res => {
        if (Array.isArray(res.body) && !res.body.includes('EUR')) res.body.push('EUR');
      });
    });
    cy.visit('/');
    footerSessionId().as('firstUserId');
    getElementByField(CypressFields.CurrencySwitcher).select('EUR');
    getElementByField(CypressFields.ProductCard).should('contain', '€');

    cy.reload();

    cy.get<string>('@firstUserId').then(firstUserId => {
      footerSessionId().should('equal', firstUserId);
      getElementByField(CypressFields.CurrencySwitcher).should('have.value', 'EUR');
      cy.window().then(win => expect(storedSession(win).userId).to.equal(firstUserId));
    });
  });

  it('creates and saves a new session when none is stored', () => {
    cy.clearLocalStorage();
    cy.visit('/');

    footerSessionId().then(id => {
      expect(id).to.match(UUID);
      cy.window().then(win => {
        expect(storedSession(win)).to.deep.equal({ userId: id, currencyCode: 'USD' });
      });
    });
  });

  it('replaces a stored session that is not valid JSON', () => {
    visitWithStoredSession('not}{valid-json');

    getElementByField(CypressFields.ProductCard, getElementByField(CypressFields.ProductList)).should(
      'have.length',
      10
    );
    footerSessionId().then(id => {
      expect(id).to.match(UUID);
      cy.window().then(win => {
        expect(storedSession(win)).to.deep.equal({ userId: id, currencyCode: 'USD' });
      });
    });
  });

  it('replaces a stored session that lacks userId and currencyCode', () => {
    visitWithStoredSession('{"foo":1}');

    getElementByField(CypressFields.ProductCard, getElementByField(CypressFields.ProductList)).should(
      'have.length',
      10
    );
    footerSessionId();
    getElementByField(CypressFields.CurrencySwitcher).should('have.value', 'USD');
    getElementByField(CypressFields.ProductCard).should('contain', '$');
    cy.window().then(win => {
      const session = storedSession(win);
      expect(session.userId).to.be.a('string');
      expect(session.currencyCode).to.equal('USD');
    });
  });
});

export {};
