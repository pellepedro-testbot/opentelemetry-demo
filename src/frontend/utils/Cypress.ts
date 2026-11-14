// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { CypressFields } from './enums/CypressFields';

export { CypressFields };

export const getElementByField = (field: CypressFields, context: Cypress.Chainable = cy) =>
  context.get(`[data-cy="${field}"]`);

const FLAGD_READ_URL = '/feature/api/read';
const FLAGD_WRITE_URL = '/feature/api/write';
const FLAG_PROPAGATION_MS = 10000;

export const setFlag = (flagName: string, defaultVariant: string) => {
  cy.request('GET', FLAGD_READ_URL).then(({ body }) => {
    body.flags[flagName].defaultVariant = defaultVariant;

    cy.request('POST', FLAGD_WRITE_URL, { data: body });
    cy.wait(FLAG_PROPAGATION_MS);
  });
};

export const setProductCatalogFailure = (variant: 'on' | 'off') => {
  cy.request('GET', FLAGD_READ_URL).then(({ body }) => {
    body.flags.productCatalogFailure.targeting.if[1] = variant;

    cy.request('POST', FLAGD_WRITE_URL, { data: body });
    cy.wait(FLAG_PROPAGATION_MS);
  });
};

export interface IStoredSession {
  userId: string;
  currencyCode: string;
}

export const readStoredSession = () =>
  cy.window().then(win => JSON.parse(win.localStorage.getItem('session') || 'null') as IStoredSession);

export const priceToCents = (text: string) => Math.round(parseFloat(text.replace(/[^\d.]/g, '')) * 100);

export const formatCents = (cents: number) => (cents / 100).toFixed(2);

const productPriceSelector = `[data-cy="${CypressFields.ProductPrice}"]`;

const isQuantitySelect = (el: Element) => 'selectedIndex' in el && 'options' in el;

const isCartLine = (el: Element, productName: string) =>
  !!el.textContent?.includes(productName) &&
  el.querySelectorAll(productPriceSelector).length === 2 &&
  Array.from(el.querySelectorAll('*')).some(isQuantitySelect);

export const getCartLine = (productName: string) =>
  cy
    .get('body')
    .find('*')
    .filter((_, el) => isCartLine(el, productName));

export const getCartLinePrices = (productName: string) => getCartLine(productName).find(productPriceSelector);

export const getCartLineQuantity = (productName: string) =>
  getCartLine(productName)
    .find('*')
    .filter((_, el) => isQuantitySelect(el));

export const emptyStoredCart = (userId: string) =>
  cy.request({ method: 'DELETE', url: '/api/cart', body: { userId }, failOnStatusCode: false });

export const getStoredCart = (userId: string) =>
  cy.request(`/api/cart?sessionId=${userId}&currencyCode=USD`).its('body');

export const addProductToCartFromPage = (productId: string, quantity: number) => {
  cy.intercept('POST', '/api/cart*').as('addToCart');
  cy.visit(`/product/${productId}`);
  getElementByField(CypressFields.ProductName).should('not.be.empty');
  getElementByField(CypressFields.ProductQuantity).select(String(quantity));
  getElementByField(CypressFields.ProductAddToCart).click();
  cy.wait('@addToCart');
  cy.location('pathname').should('eq', '/cart');
};

export const productCardImageUrl = (card: HTMLElement) =>
  Array.from(card.querySelectorAll('*'))
    .map(el => el.ownerDocument.defaultView?.getComputedStyle(el).backgroundImage || 'none')
    .find(backgroundImage => backgroundImage.startsWith('url(')) || 'none';

// Matches url("...") with at least one character between the quotes.
export const NON_EMPTY_CSS_URL = /^url\("[^"]+"\)$/;

export const createSoftChecks = () => {
  const failures: string[] = [];

  return {
    check(step: string, assertion: () => void) {
      try {
        assertion();
      } catch (error) {
        failures.push(`${step}: ${(error as Error).message}`);
      }
    },
    assertAll() {
      cy.then(() => {
        expect(failures, failures.join('\n')).to.be.empty;
      });
    },
  };
};
