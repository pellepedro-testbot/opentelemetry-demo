// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import getSymbolFromCurrency from 'currency-symbol-map';
import SessionGateway from '../../gateways/Session.gateway';
import { createStepChecks, getCurrencyCodes, getElementByField, getProductCardByName } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

describe('Home Page', () => {
  it('should validate the home page', () => {
    cy.visit('/');
    getElementByField(CypressFields.HomePage).should('exist');
    getElementByField(CypressFields.ProductCard, getElementByField(CypressFields.ProductList)).should('have.length', 10);

    getElementByField(CypressFields.SessionId).should('contain', SessionGateway.getSession().userId);
  });

  it('should change currency', () => {
    cy.visit('/');
    getElementByField(CypressFields.CurrencySwitcher).select('EUR');
    getElementByField(CypressFields.ProductCard, getElementByField(CypressFields.ProductList)).should('have.length', 10);

    getElementByField(CypressFields.CurrencySwitcher).should('have.value', 'EUR');

    getElementByField(CypressFields.ProductCard).should('contain', getSymbolFromCurrency('EUR'));
  });

  it('should recover corrupted stored session', () => {
    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.setItem('session', 'not}{valid-json');
      },
    });
    getElementByField(CypressFields.SessionId).should($span => {
      const session = JSON.parse(localStorage.getItem('session') as string);
      expect(session.userId).to.be.a('string').and.not.be.empty;
      expect($span).to.contain(session.userId);
    });
  });

  it('should store a new session and show its user id', () => {
    cy.clearLocalStorage();
    cy.visit('/');
    getElementByField(CypressFields.ProductCard, getElementByField(CypressFields.ProductList)).should(
      'have.length',
      10
    );

    readStoredSession().then(session => {
      expect(session.userId).to.be.a('string').and.not.be.empty;
      expect(session.currencyCode).to.eq('USD');
      getElementByField(CypressFields.SessionId).should('contain', session.userId);
    });
  });

  it('should keep the session and the chosen currency after a reload', () => {
    cy.visit('/');
    getElementByField(CypressFields.CurrencySwitcher).select('CAD');
    getElementByField(CypressFields.CurrencySwitcher).should('have.value', 'CAD');

    readStoredSession().then(before => {
      cy.reload();

      getElementByField(CypressFields.CurrencySwitcher).should('have.value', 'CAD');
      getElementByField(CypressFields.SessionId).should('contain', before.userId);
      readStoredSession().its('userId').should('eq', before.userId);
    });
  });

  it('should replace a stored session of null with a usable one', () => {
    expectStoredSessionReplaced('null');
  });

  it('should replace a stored session of {} with a usable one', () => {
    expectStoredSessionReplaced('{}');
  });

  it('should list the supported currencies in alphabetical order', () => {
    cy.request('/api/currency').then(({ body }: { body: string[] }) => {
      cy.visit('/');
      getElementByField(CypressFields.CurrencySwitcher)
        .should($select => expect(getCurrencyCodes($select)).to.have.length(body.length))
        .then($select => {
          const values = getCurrencyCodes($select);
          expect(values).to.deep.eq([...values].sort());
          expect([...values].sort()).to.deep.eq([...body].sort());
        });
    });
  });

  it('should show prices in the currency chosen from the list', () => {
    cy.visit('/');
    getElementByField(CypressFields.CurrencySwitcher).select('CAD');

    getElementByField(CypressFields.CurrencySwitcher).should('have.value', 'CAD');
    getElementByField(CypressFields.ProductCard, getElementByField(CypressFields.ProductList)).should(
      'have.length',
      10
    );
    getProductCardByName('Solar System Color Imager').should('contain', getSymbolFromCurrency('CAD'));
  });

  it('should not request a missing product picture from the home page', () => {
    let productWithoutPicture = '';
    let undefinedImageRequests = 0;
    cy.intercept({ method: 'GET', pathname: '/api/products' }, req => {
      delete req.headers['if-none-match'];
      req.continue(res => {
        productWithoutPicture = res.body[0].name;
        delete res.body[0].picture;
      });
    }).as('getProducts');
    cy.intercept('GET', '/images/products/undefined', () => {
      undefinedImageRequests += 1;
    });

    cy.visit('/');
    cy.wait('@getProducts');

    getElementByField(CypressFields.ProductCard, getElementByField(CypressFields.ProductList)).should(
      'have.length',
      10
    );
    cy.then(() => getProductCardByName(productWithoutPicture).should('contain', '$'));
    cy.wait(2000);
    cy.then(() => expect(undefinedImageRequests).to.eq(0));
  });

  it('should let a shopper whose stored session is broken switch currency and add to cart', () => {
    cy.intercept('POST', '/api/cart*').as('addToCart');

    cy.log('Step 1: open the storefront with a corrupted stored session');
    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.setItem('session', 'not}{valid-json');
      },
    });
    getElementByField(CypressFields.ProductCard, getElementByField(CypressFields.ProductList)).should(
      'have.length',
      10
    );
    readStoredSession().then(session => {
      expect(session.userId, 'step 1: stored userId').to.be.a('string').and.not.be.empty;
      getElementByField(CypressFields.SessionId).should('contain', session.userId);

      cy.log('Step 2: choose CAD and reload');
      getElementByField(CypressFields.CurrencySwitcher).select('CAD');
      cy.reload();
      getElementByField(CypressFields.CurrencySwitcher).should('have.value', 'CAD');
      getElementByField(CypressFields.SessionId).should('contain', session.userId);
    });

    cy.log('Step 3: add the first product to the cart');
    getProductCardByName('Solar System Color Imager').click();
    getElementByField(CypressFields.ProductAddToCart).click();
    cy.wait('@addToCart');
    cy.location('pathname').should('eq', '/cart');
    getElementByField(CypressFields.CartItemCount).should('contain', '1');
    cy.contains(`[data-cy="${CypressFields.ProductPrice}"]`, getSymbolFromCurrency('CAD') as string).should('exist');
  });

  it('should switch the shop to euros', () => {
    const checks = createStepChecks();

    cy.log('Step 1: open the storefront and read the currency list');
    cy.visit('/');
    getElementByField(CypressFields.CurrencySwitcher)
      .should($select => expect(getCurrencyCodes($select)).to.have.length.greaterThan(1))
      .then($select => {
        const values = getCurrencyCodes($select);
        checks.check('step 1: currencies in alphabetical order', () => expect(values).to.deep.eq([...values].sort()));
        checks.check('step 1: EUR offered', () => expect(values).to.include('EUR'));

        cy.log('Step 2: choose EUR');
        if (!values.includes('EUR')) {
          checks.check('step 2: choose EUR', () => expect(values, 'currency switcher options').to.include('EUR'));
          return;
        }
        getElementByField(CypressFields.CurrencySwitcher).select('EUR');
        getElementByField(CypressFields.CurrencySwitcher).should('have.value', 'EUR');
        getProductCardByName('Solar System Color Imager').should('contain', getSymbolFromCurrency('EUR'));
      });

    checks.assertAll();
  });
});

const expectStoredSessionReplaced = (storedValue: string) => {
  cy.visit('/', {
    onBeforeLoad(win) {
      win.localStorage.setItem('session', storedValue);
    },
  });
  getElementByField(CypressFields.ProductCard, getElementByField(CypressFields.ProductList)).should('have.length', 10);

  readStoredSession().then(session => {
    expect(session.userId).to.be.a('string').and.not.be.empty;
    expect(session.currencyCode).to.be.a('string').and.not.be.empty;
    getElementByField(CypressFields.SessionId).should('contain', session.userId).and('not.contain', 'undefined');
  });
};

const readStoredSession = () =>
  cy
    .window()
    .then(win => JSON.parse(win.localStorage.getItem('session') as string) as { userId: string; currencyCode: string });
