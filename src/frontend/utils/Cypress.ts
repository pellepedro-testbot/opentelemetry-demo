// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { CypressFields } from './enums/CypressFields';

export { CypressFields };

export const getElementByField = (field: CypressFields, context: Cypress.Chainable = cy) =>
  context.get(`[data-cy="${field}"]`);

export const getProductCard = (productId: string) =>
  getElementByField(CypressFields.ProductList).find(`a[href="/product/${productId}"]`);

export const getCartRow = (productId: string) =>
  cy
    .get(`main a[href="/product/${productId}"]`)
    .parent()
    .filter((_, el) => !!el.querySelector('select'));

export const getCartSummaryPrice = (label: 'Shipping' | 'Total') =>
  cy.contains('main span, main h3', new RegExp(`^${label}$`)).parent().find(`[data-cy="${CypressFields.ProductPrice}"]`);

export const getConfirmationItemPrice = (quantity: number) =>
  cy.contains(`Quantity: ${quantity}`).parent().parent().find(`[data-cy="${CypressFields.ProductPrice}"]`);

export const getConfirmationPrice = (label: 'Shipping:' | 'Total:') =>
  cy.contains('main span', new RegExp(`^${label}$`)).parent().find(`[data-cy="${CypressFields.ProductPrice}"]`);

/** Reads the amount of a rendered price such as "$ 175.00" or "€ 7.95". */
export const priceAmount = (text: string) => Number(text.replace(/[^0-9.]/g, ''));

type TStoredSession = { userId: string; currencyCode: string } | null;

const readStoredSession = (win: Window): TStoredSession => {
  try {
    return JSON.parse(win.localStorage.getItem('session') || 'null');
  } catch {
    return null;
  }
};

export const getStoredSession = (): Cypress.Chainable<TStoredSession> =>
  cy.window().then(win => cy.wrap<TStoredSession>(readStoredSession(win), { log: false }));
