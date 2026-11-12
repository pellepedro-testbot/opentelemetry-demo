// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import getSymbolFromCurrency from 'currency-symbol-map';
import SessionGateway from '../../gateways/Session.gateway';
import { getElementByField, getElementByFieldAndText } from '../../utils/Cypress';
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

  it('should restore a valid stored session', () => {
    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.setItem('session', JSON.stringify({ userId: 'restore-me-123', currencyCode: 'GBP' }));
      },
    });
    getElementByField(CypressFields.SessionId).should('contain', 'restore-me-123');
    getElementByField(CypressFields.CurrencySwitcher).should('have.value', 'GBP');
    getElementByField(CypressFields.ProductList).should('contain', getSymbolFromCurrency('GBP'));
  });

  it('should create and store a new session when none is stored', () => {
    cy.clearLocalStorage();
    cy.visit('/');
    getElementByField(CypressFields.SessionId).should($span => {
      const session = JSON.parse(localStorage.getItem('session') as string);
      expect(session.userId).to.be.a('string').and.not.be.empty;
      expect(session.currencyCode).to.eq('USD');
      expect($span).to.contain(session.userId);
    });
  });

  ['null', '{}', '{"userId":5}'].forEach(stored => {
    it(`should replace a stored session value that is not a session: ${stored}`, () => {
      cy.visit('/', {
        onBeforeLoad(win) {
          win.localStorage.setItem('session', stored);
        },
      });
      getElementByField(CypressFields.ProductCard).should('have.length', 10);
      getElementByField(CypressFields.SessionId).should($span => {
        const session = JSON.parse(localStorage.getItem('session') as string);
        expect(session.userId).to.be.a('string').and.not.be.empty;
        expect(session.currencyCode).to.be.a('string').and.not.be.empty;
        expect($span).to.contain(session.userId);
      });
    });
  });

  it('should list currencies in alphabetical order', () => {
    cy.visit('/');
    getElementByField(CypressFields.CurrencySwitcher).should($select => {
      const codes = [...($select[0] as HTMLSelectElement).options].map(o => o.value);
      expect(codes).to.have.length.at.least(2);
      expect(codes).to.deep.equal([...codes].sort());
    });
  });

  it('should load product card images with the image request headers', () => {
    const imageRequestHeaders: Record<string, string | string[]>[] = [];
    cy.intercept('GET', '/images/products/*', req => {
      imageRequestHeaders.push(req.headers);
    });
    cy.visit('/');

    getElementByField(CypressFields.ProductCard).should('have.length', 10);
    getElementByField(CypressFields.ProductCard).each($card => {
      cy.wrap($card).should(() => {
        const withBlob = [...$card[0].children].filter(el => getComputedStyle(el).backgroundImage.includes('blob:'));
        expect(withBlob, 'card image loaded as a blob').to.have.length(1);
      });
    });
    cy.wrap(imageRequestHeaders).should('have.length.at.least', 10);
    cy.wrap(imageRequestHeaders).each((headers: Record<string, string | string[]>) => {
      expect(headers).to.have.property('x-envoy-fault-delay-request');
      expect(headers).to.have.property('cache-control', 'no-cache');
    });
  });

  it('returning shopper with a broken saved session keeps shopping', () => {
    cy.intercept('POST', '/api/cart*').as('addToCart');
    let sessionId = '';

    cy.log('**Step 1: open the storefront with a corrupted saved session**');
    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.setItem('session', 'not}{valid-json');
      },
    });
    getElementByField(CypressFields.ProductCard).should('have.length', 10);
    getElementByField(CypressFields.SessionId).should($span => {
      const session = JSON.parse(localStorage.getItem('session') as string);
      expect(session.userId).to.be.a('string').and.not.be.empty;
      expect($span).to.contain(session.userId);
      sessionId = session.userId;
    });

    cy.log('**Step 2: reload the page**');
    cy.reload();
    getElementByField(CypressFields.SessionId).should($span => {
      expect($span).to.contain(sessionId);
    });

    cy.log('**Step 3: add a product to the cart**');
    getElementByFieldAndText(CypressFields.ProductCard, 'Solar System Color Imager').click();
    getElementByField(CypressFields.ProductAddToCart).click();
    cy.wait('@addToCart');
    cy.location('pathname').should('eq', '/cart');
    getElementByField(CypressFields.CartItemCount).should('contain', '1');

    cy.reload();
    getElementByField(CypressFields.SessionId).should('contain', sessionId);
    getElementByField(CypressFields.CartItemCount).should('contain', '1');
  });

  it('shopper switches the shop to euros', () => {
    cy.log('**Step 1: open the currency switcher**');
    cy.visit('/');
    getElementByField(CypressFields.CurrencySwitcher).should($select => {
      const codes = [...($select[0] as HTMLSelectElement).options].map(o => o.value);
      expect(codes).to.have.length.at.least(2);
      expect(codes).to.deep.equal([...codes].sort());
      expect(codes).to.include('EUR');
    });

    cy.log('**Step 2: select EUR**');
    getElementByField(CypressFields.CurrencySwitcher).select('EUR');
    getElementByField(CypressFields.CurrencySwitcher).should('have.value', 'EUR');
    getElementByField(CypressFields.ProductList).should('contain', getSymbolFromCurrency('EUR'));

    cy.log('**Step 3: reload**');
    cy.reload();
    getElementByField(CypressFields.CurrencySwitcher).should('have.value', 'EUR');
    getElementByField(CypressFields.ProductList).should('contain', getSymbolFromCurrency('EUR'));
  });
});
