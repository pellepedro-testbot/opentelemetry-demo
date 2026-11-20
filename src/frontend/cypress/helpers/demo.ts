// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { getElementByField } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

/*
 * The flag UI, Jaeger and the OTLP endpoint are served by the frontend proxy, not by
 * the frontend itself. When the suite runs against the frontend (CI sets baseUrl to
 * http://frontend:8080) they are reached on frontend-proxy, at the same port.
 */
export const proxyOrigin = (): string => {
  const configured = Cypress.expose('FRONTEND_PROXY_URL');
  if (configured) return String(configured);
  return String(Cypress.config('baseUrl') || '').replace('//frontend:', '//frontend-proxy:');
};

export const readFlags = () => cy.request('GET', `${proxyOrigin()}/feature/api/read`).its('body');

const writeFlags = (body: object) =>
  cy.request('POST', `${proxyOrigin()}/feature/api/write`, { data: body }).then(() => cy.wait(3000));

export const setFlag = (flagName: string, defaultVariant: string) =>
  readFlags().then(body => {
    body.flags[flagName].defaultVariant = defaultVariant;
    return writeFlags(body);
  });

export const setProductCatalogFailure = (variant: 'on' | 'off') =>
  readFlags().then(body => {
    body.flags.productCatalogFailure.targeting.if[1] = variant;
    return writeFlags(body);
  });

export const resolveFlag = (kind: 'Boolean' | 'Float' | 'Int' | 'String', flagKey: string, context = {}) =>
  cy.request({
    method: 'POST',
    url: `${proxyOrigin()}/flagservice/flagd.evaluation.v1.Service/Resolve${kind}`,
    body: { flagKey, context },
    failOnStatusCode: false,
  });

export const sessionUserId = () =>
  cy.window().then(win => JSON.parse(win.localStorage.getItem('session') || '{}').userId as string);

export const serverCart = (userId: string, currencyCode = 'USD') =>
  cy.request(`/api/cart?sessionId=${userId}&currencyCode=${currencyCode}`).its('body');

/* A cart line: the row of the cart table that links to the product. */
export const cartLine = (productId: string) => cy.get(`:has(> [href="/product/${productId}"])`);

export const moneyOf = (text: string) => Number(text.replace(/[^0-9.]/g, ''));

export const EXPLORASCOPE = 'National Park Foundation Explorascope';

/* Open a product of the home page by its name and add it to the cart; yields the product id. */
export const addProductToCart = (quantity?: number, productName = EXPLORASCOPE) => {
  cy.intercept('POST', '/api/cart*').as('addToCart');
  getElementByField(CypressFields.ProductList).contains(productName).click();
  cy.location('pathname').should('match', /^\/product\/\w+$/);
  if (quantity) getElementByField(CypressFields.ProductQuantity).select(String(quantity));
  getElementByField(CypressFields.ProductAddToCart).click();
  cy.wait('@addToCart').its('request.body.item.productId').as('addedProductId');
  cy.location('pathname').should('eq', '/cart');
  return cy.get<string>('@addedProductId');
};
