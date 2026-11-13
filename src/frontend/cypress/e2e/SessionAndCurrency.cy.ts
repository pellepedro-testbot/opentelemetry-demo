// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import {
  createSoftChecks,
  formatPrice,
  getElementByField,
  requestShippingQuote,
  visiblePrices,
  waitForCartShipping,
} from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

const TELESCOPE = { id: '66VCHSJNUP', name: 'Starsense Explorer Refractor Telescope' };
const COLOR_IMAGER = { id: '0PUK6V6EV0', name: 'Solar System Color Imager' };
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

const storedSession = (win: Window) => JSON.parse(win.localStorage.getItem('session') ?? 'null');

const currencyOptions = () =>
  getElementByField(CypressFields.CurrencySwitcher)
    .find('option')
    .then($options => Cypress._.map($options, option => (option as HTMLOptionElement).value));

const addTelescopeFromHome = () => {
  cy.intercept('GET', '/api/cart*').as('getCart');
  cy.contains(`[data-cy="${CypressFields.ProductCard}"]`, TELESCOPE.name).click();
  getElementByField(CypressFields.ProductAddToCart).click();
  cy.location('pathname').should('eq', '/cart');
  cy.wait('@getCart');
};

const visitWithStoredSession = (stored: string) => {
  cy.on('uncaught:exception', () => false);
  cy.visit('/', {
    onBeforeLoad(win) {
      win.localStorage.setItem('session', stored);
    },
  });
};

describe('Currency switcher', () => {
  it('lists the supported currencies in alphabetical order', () => {
    cy.request('/api/currency').then(({ body }: { body: string[] }) => {
      cy.visit('/');
      currencyOptions().should(codes => {
        expect(codes).to.deep.equal([...codes].sort());
        expect([...codes].sort()).to.deep.equal([...body].sort());
      });
    });
  });
});

describe('Session restore', () => {
  it('keeps the user and chosen currency after a reload', () => {
    cy.visit('/');
    getElementByField(CypressFields.ProductCard).should('have.length.greaterThan', 0);
    cy.window().then(win => {
      const { userId } = storedSession(win);
      expect(userId).to.match(UUID);

      getElementByField(CypressFields.CurrencySwitcher).select('CAD');
      addTelescopeFromHome();
      cy.reload();

      getElementByField(CypressFields.CurrencySwitcher).should('have.value', 'CAD');
      cy.contains('main p', TELESCOPE.name).should('be.visible');
      getElementByField(CypressFields.SessionId).should('contain', userId);
      cy.window().then(reloaded => {
        expect(storedSession(reloaded)).to.include({ userId, currencyCode: 'CAD' });
      });
    });
  });

  const expectFreshSession = (stored: string) => {
    visitWithStoredSession(stored);

    getElementByField(CypressFields.ProductCard, getElementByField(CypressFields.ProductList)).should(
      'have.length',
      10
    );
    cy.window().then(win => {
      const session = storedSession(win);
      expect(session.userId).to.match(UUID);
      expect(session.currencyCode).to.eq('USD');
    });
  };

  it('replaces a stored session that is not JSON with a fresh one', () => {
    expectFreshSession('{not json');
  });

  it('replaces a stored session without userId and currencyCode with a fresh one', () => {
    expectFreshSession('{}');
  });
});

describe('Shopping in another currency', () => {
  it('keeps the CAD session after a reload and orders at the shipping cost the cart showed', () => {
    const soft = createSoftChecks();

    cy.log('Step 1: read the currency list');
    cy.visit('/');
    currencyOptions().then(codes => {
      soft.check('step 1 sorted', () => expect(codes).to.deep.equal([...codes].sort()));
      soft.check('step 1 EUR offered', () => expect(codes).to.include('EUR'));
    });

    cy.log('Step 2: switch to CAD');
    cy.window().then(win => cy.wrap(storedSession(win).userId).as('userId'));
    cy.request(`/api/products/${COLOR_IMAGER.id}?currencyCode=CAD`).then(({ body }) => {
      getElementByField(CypressFields.CurrencySwitcher).select('CAD');
      getElementByField(CypressFields.CurrencySwitcher).should('have.value', 'CAD');
      cy.contains(`[data-cy="${CypressFields.ProductCard}"]`, COLOR_IMAGER.name).should(
        'contain',
        formatPrice(body.priceUsd)
      );
    });

    cy.log('Step 3: add the telescope and reload the cart');
    addTelescopeFromHome();
    cy.reload();
    getElementByField(CypressFields.CurrencySwitcher).should('have.value', 'CAD');
    cy.contains('main p', TELESCOPE.name).should('be.visible');
    cy.get<string>('@userId').then(userId => {
      cy.window().then(win => {
        soft.check('step 3 same user', () => expect(storedSession(win).userId).to.eq(userId));
      });
    });

    cy.log('Step 4: place the order');
    requestShippingQuote([{ productId: TELESCOPE.id, quantity: 1 }], 'CAD').then(preview => {
      waitForCartShipping(preview);

      cy.intercept('POST', '/api/checkout*').as('placeOrder');
      cy.contains('button', 'Place Order').click();
      cy.wait('@placeOrder');
      cy.location('pathname').should('match', /^\/cart\/checkout\/[^/]+$/);
      cy.contains('Your order is complete!').should('be.visible');
      cy.contains('Shipping:').should('be.visible');
      visiblePrices().then(prices => {
        soft.check('step 4 confirmation shipping', () => expect(prices).to.include(preview));
      });
    });

    soft.assertAll();
  });

  it('opens with a corrupted stored session and adds a product to the cart', () => {
    cy.log('Step 1: open the shop with a corrupted session');
    visitWithStoredSession('{not json');
    getElementByField(CypressFields.ProductCard).should('have.length.greaterThan', 0);
    cy.window().then(win => {
      const session = storedSession(win);
      expect(session.userId).to.match(UUID);
      expect(session.currencyCode).to.eq('USD');
    });

    cy.log('Step 2: add the telescope');
    addTelescopeFromHome();
    cy.contains('main p', TELESCOPE.name).should('be.visible');
  });
});

export {};
