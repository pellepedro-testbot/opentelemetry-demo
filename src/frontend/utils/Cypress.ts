// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { CypressFields } from './enums/CypressFields';

export { CypressFields };

export const getElementByField = (field: CypressFields, context: Cypress.Chainable = cy) =>
  context.get(`[data-cy="${field}"]`);

export interface IStoredSession {
  userId: string;
  currencyCode: string;
}

export const readStoredSession = (): Cypress.Chainable<IStoredSession | null> =>
  cy.window().then(win => cy.wrap<IStoredSession | null>(JSON.parse(win.localStorage.getItem('session') || 'null')));

export const seedSession = (session: IStoredSession) => (win: Window) =>
  win.localStorage.setItem('session', JSON.stringify(session));

// Prices of the page body in order (cart rows or order items, then shipping and total), leaving out the recommendation cards.
export const getDetailPrices = () =>
  getElementByField(CypressFields.ProductPrice).not(
    `[data-cy="${CypressFields.RecommendationList}"] [data-cy="${CypressFields.ProductPrice}"]`
  );

// Reads a rendered price such as "¥ 1234.56" as whole cents.
export const priceTextToCents = (text: string) => Math.round(parseFloat(text.replace(/[^\d.]/g, '')) * 100);
