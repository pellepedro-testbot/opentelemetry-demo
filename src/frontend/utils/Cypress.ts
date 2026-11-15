// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { CypressFields } from './enums/CypressFields';

export { CypressFields };

export const getElementByField = (field: CypressFields, context: Cypress.Chainable = cy) =>
  context.get(`[data-cy="${field}"]`);

// The regex drops everything but digits and the decimal point, e.g. '$ 349.95' -> '349.95'.
export const toAmount = (priceText: string) => parseFloat(priceText.replace(/[^\d.]/g, ''));

export const toAmounts = ($prices: JQuery<HTMLElement>) => [...$prices].map(el => toAmount(el.textContent || ''));

// The prices on a page outside its recommendation list, in page order.
export const getPagePrices = () =>
  getElementByField(CypressFields.ProductPrice).not('[data-cy="recommendation-list"] [data-cy="product-price"]');
