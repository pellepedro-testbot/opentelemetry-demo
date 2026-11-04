// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { CypressFields } from './enums/CypressFields';

const priceSelector = `[data-cy="${CypressFields.ProductPrice}"]`;

const textOf = ($el: JQuery<HTMLElement>) => $el.text().replace(/\s+/g, ' ').trim();

const exactText = ($scope: JQuery<HTMLElement>, selector: string, text: string) =>
  $scope.find(selector).filter((_, el) => textOf(Cypress.$(el)) === text);

/** The cart page row of a product: its link (picture and name), quantity select, unit price and line total. */
export const cartLine = ($body: JQuery<HTMLElement>, productName: string) =>
  $body
    .find('a')
    .filter((_, el) => textOf(Cypress.$(el)).includes(productName))
    .has('img')
    .first()
    .parent();

/** [unit price, line total] as shown in the Price and Total columns of the product's cart row. */
export const cartLinePrices = (productName: string) => ($body: JQuery<HTMLElement>) =>
  cartLine($body, productName)
    .find(priceSelector)
    .toArray()
    .map(el => textOf(Cypress.$(el)));

export const cartLineQuantitySelect = (productName: string) =>
  cy.contains('a', productName).parent().find('select');

const priceInRow = ($body: JQuery<HTMLElement>, labelSelector: string, label: string) =>
  textOf(exactText($body, labelSelector, label).first().parent().find(priceSelector));

export const cartShipping = ($body: JQuery<HTMLElement>) => priceInRow($body, 'span', 'Shipping');
export const cartTotal = ($body: JQuery<HTMLElement>) => {
  const row = exactText($body, 'h3', 'Total').first().parent();
  return textOf(row.find(priceSelector));
};

export const confirmationShipping = ($body: JQuery<HTMLElement>) => priceInRow($body, 'span', 'Shipping:');
export const confirmationTotal = ($body: JQuery<HTMLElement>) => priceInRow($body, 'span', 'Total:');

/** Name, "Quantity: n" and price of a product's line on the order confirmation page. */
export const confirmationItem = (productName: string) => ($body: JQuery<HTMLElement>) => {
  const item = exactText($body, 'h5', productName).first().parent().parent();
  return {
    quantity: textOf(item.find('p').filter((_, el) => textOf(Cypress.$(el)).startsWith('Quantity:'))),
    price: textOf(item.find(priceSelector)),
  };
};
