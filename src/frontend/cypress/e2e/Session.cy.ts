// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import getSymbolFromCurrency from 'currency-symbol-map';
import {
  addProductToCartFromHome,
  assertFooterShowsSession,
  getElementByField,
  getStoredSession,
} from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

describe('Storefront session', () => {
  it('creates, stores and shows a new session when none is stored', () => {
    cy.clearLocalStorage();
    cy.visit('/');
    getElementByField(CypressFields.ProductCard).should('have.length.at.least', 1);

    getStoredSession().then(session => {
      expect(session.userId).to.match(UUID);
      expect(session.currencyCode).to.eq('USD');
      getElementByField(CypressFields.SessionId).should('have.text', `session-id: ${session.userId}`);
    });
  });

  it('restores the stored session on load: same session id, cart and currency', () => {
    cy.visit('/');
    getStoredSession().then(({ userId }) => {
      getElementByField(CypressFields.SessionId).should('have.text', `session-id: ${userId}`);
      getElementByField(CypressFields.CurrencySwitcher).select('EUR');
      addProductToCartFromHome('Roof Binoculars', 1);

      cy.visit('/');
      getElementByField(CypressFields.SessionId).should('have.text', `session-id: ${userId}`);
      getStoredSession().should('deep.equal', { userId, currencyCode: 'EUR' });
      getElementByField(CypressFields.CartItemCount).should('have.text', '1');
      getElementByField(CypressFields.CurrencySwitcher).should('have.value', 'EUR');
      getElementByField(CypressFields.ProductPrice, getElementByField(CypressFields.ProductList)).each(price => {
        expect(price.text()).to.match(new RegExp(`^${getSymbolFromCurrency('EUR')} `));
      });
    });
  });

  it('shows one footer with the session id and platform on every page of the purchase flow', () => {
    cy.intercept('POST', '/api/checkout*').as('placeOrder');
    cy.visit('/');
    assertFooterShowsSession();

    cy.contains(`[data-cy="${CypressFields.ProductCard}"]`, 'Solar Filter').click();
    getElementByField(CypressFields.ProductName).should('have.text', 'Solar Filter');
    assertFooterShowsSession();

    getElementByField(CypressFields.ProductAddToCart).click();
    cy.location('pathname').should('eq', '/cart');
    getElementByField(CypressFields.CheckoutPlaceOrder).should('be.visible');
    assertFooterShowsSession();

    getElementByField(CypressFields.CheckoutPlaceOrder).click();
    cy.wait('@placeOrder');
    cy.location('pathname').should('match', /^\/cart\/checkout\/.+/);
    cy.contains('h1', 'Your order is complete!');
    assertFooterShowsSession();
  });

  it('sends the session id as baggage on the browser API calls', () => {
    cy.intercept('GET', '/api/products*').as('getProducts');
    cy.visit('/');
    cy.wait('@getProducts').then(({ request }) => {
      getStoredSession().then(({ userId }) => {
        expect(request.headers.baggage).to.contain(`session.id=${userId}`);
      });
    });
  });

  it('serves the storefront and the product catalog from the frontend built from this branch', () => {
    cy.request('/').then(({ status, body }) => {
      expect(status).to.eq(200);
      expect(body).to.match(/<title[^>]*>Otel Demo - Home<\/title>/);
    });
    cy.request('/api/products').then(({ status, body }) => {
      expect(status).to.eq(200);
      expect(body).to.have.length(10);
      expect((body as { id: string }[]).map(({ id }) => id)).to.include.members(['OLJCESPC7Z', '66VCHSJNUP']);
    });
  });
});

export {};
