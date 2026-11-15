// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import getSymbolFromCurrency from 'currency-symbol-map';
import SessionGateway from '../../gateways/Session.gateway';
import { getElementByField } from '../../utils/Cypress';
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

  it('should offer EUR in the currency switcher', () => {
    cy.visit('/');
    getElementByField(CypressFields.CurrencySwitcher).find('option[value="EUR"]').should('have.length', 1);
  });

  it('should not load product images below the fold before scrolling', () => {
    let imageRequests = 0;
    cy.intercept('GET', '/images/products/**', () => {
      imageRequests += 1;
    });
    cy.viewport(1280, 400);

    cy.visit('/');
    getElementByField(CypressFields.ProductCard, getElementByField(CypressFields.ProductList)).should(
      'have.length',
      10
    );
    cy.wait(1000);
    cy.then(() => imageRequests).then(beforeScroll => {
      cy.scrollTo('bottom');
      cy.wait(1000);
      cy.then(() => expect(beforeScroll, 'product image requests before scrolling').to.be.lessThan(imageRequests));
    });
  });

  it('should recover corrupted stored session', () => {
    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.setItem('session', 'not}{valid-json');
      },
    });
    getElementByField(CypressFields.SessionId).should('contain', SessionGateway.getSession().userId);
  });
});
