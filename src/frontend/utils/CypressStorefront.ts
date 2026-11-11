// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { getElementByField } from './Cypress';
import { CypressFields } from './enums/CypressFields';

// A product card of the storefront's product list, by the product's name.
export const productCardNamed = (name: string) =>
  getElementByField(CypressFields.ProductList)
    .find(`[data-cy="${CypressFields.ProductCard}"]`)
    .filter(`:contains("${name}")`);

// A cart page line is the row that links to its product and holds its quantity select.
const cartLineSelector = (productId: string) => `main div:has(> a[href="/product/${productId}"]):has(select)`;

export const cartLine = (productId: string) => cy.get(cartLineSelector(productId));

// The line's cells after the product link, in the order of the cart header: Quantity, Price, Total.
export const readCartLine = ($body: JQuery<HTMLElement>, productId: string) => {
  const cells = $body.find(`${cartLineSelector(productId)} > div`);
  return {
    quantity: String(cells.eq(0).find('select').val() ?? ''),
    price: cells.eq(1).text().trim(),
    total: cells.eq(2).text().trim(),
  };
};

// The value shown beside a label such as "Shipping" or "Total:" in main.
export const readLabelledValue = ($body: JQuery<HTMLElement>, label: string) =>
  $body
    .find('main *:not(label)')
    .filter((_, el) => el.childElementCount === 0 && el.textContent?.trim() === label)
    .map((_, el) => Cypress.$(el).next().text().trim())
    .get()
    .filter(Boolean)
    .join(' | ');

// Parses a price as the storefront shows it ("$ 349.95") into cents; the regex drops
// everything but digits and the decimal point (currency symbol, spaces).
export const priceCents = (text: string) => Math.round(Number(text.replace(/[^0-9.]/g, '')) * 100);

export const formatUsd = (cents: number) => `$ ${(cents / 100).toFixed(2)}`;
