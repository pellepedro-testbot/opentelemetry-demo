// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { getElementByField } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

export const CART_LINE = '[class*="CartItems-styled__CartItem-"]';
const CART_DATA_ROW = '[class*="CartItems-styled__DataRow-"]';
export const ORDER_ITEM = '[class*="Checkout-styled__OrderItem-"]';
const ORDER_SUMMARY_ROW = '[class*="Checkout-styled__SummaryRow-"]';
const ORDER_TOTAL_ROW = '[class*="Checkout-styled__TotalRow-"]';
const PRICE = `[data-cy="${CypressFields.ProductPrice}"]`;
const PRODUCT_DETAIL_PRICE = '[class*="ProductDetail-styled__ProductPrice-"]';

const shownAmount = (row: Cypress.Chainable<JQuery<HTMLElement>>) =>
  row
    .find(PRICE)
    .should($price => expect(priceValue($price.text())).to.be.greaterThan(0))
    .invoke('text')
    .then(text => priceValue(text));

export interface IShownProduct {
  name: string;
  price: number;
}

// Drops everything but digits and the decimal point, e.g. "€ 1,234.50" -> "1234.50".
export const priceValue = (text: string) => Number(text.replace(/[^0-9.]/g, ''));

/**
 * Collects failed checks so a journey goes on to its next step, then fails once
 * at the end with every step that went wrong.
 */
export class StepChecks {
  private failures: string[] = [];

  step(title: string) {
    cy.log(`**${title}**`);
  }

  check(step: string, assertion: () => void) {
    try {
      assertion();
    } catch (error) {
      this.failures.push(`${step}: ${(error as Error).message}`);
    }
  }

  assertAll() {
    cy.then(() => {
      expect(this.failures.join('\n'), 'failed step checks').to.eq('');
    });
  }
}

export const interceptStorefrontApi = () => {
  cy.intercept('POST', '/api/cart*').as('addToCart');
  cy.intercept('GET', '/api/cart*').as('getCart');
  cy.intercept('POST', '/api/checkout*').as('placeOrder');
};

/** On a product page: reads its name and price, picks a quantity and adds it to the cart. */
export const addShownProductToCart = (quantity = 1) => {
  const product: IShownProduct = { name: '', price: 0 };
  getElementByField(CypressFields.ProductName)
    .should($name => expect($name.text().trim()).to.not.be.empty)
    .invoke('text')
    .then(name => {
      product.name = name.trim();
    });
  cy.get(PRODUCT_DETAIL_PRICE)
    .find(PRICE)
    .should($price => expect(priceValue($price.text())).to.be.greaterThan(0))
    .invoke('text')
    .then(text => {
      product.price = priceValue(text);
    });
  if (quantity !== 1) {
    getElementByField(CypressFields.ProductQuantity).select(String(quantity));
  }
  getElementByField(CypressFields.ProductAddToCart).click();
  cy.wait('@addToCart');
  cy.location('pathname').should('eq', '/cart');
  cy.contains('h1', 'Shopping Cart').should('be.visible');
  return cy.wrap(product);
};

export const cartLine = (name: string) => cy.contains(CART_LINE, name);

/** The Price and Total cells of a cart line, in the order of the Price | Total columns. */
export const cartLinePrices = (name: string) =>
  cartLine(name)
    .find(PRICE)
    .should('have.length', 2)
    .then($prices => ({ price: priceValue($prices.eq(0).text()), total: priceValue($prices.eq(1).text()) }));

export const cartShipping = () => shownAmount(cy.contains(CART_DATA_ROW, 'Shipping'));

export const cartTotal = () => shownAmount(cy.contains(CART_DATA_ROW, 'Total'));

export const orderShipping = () => shownAmount(cy.contains(ORDER_SUMMARY_ROW, 'Shipping:'));

export const orderTotal = () => shownAmount(cy.contains(ORDER_TOTAL_ROW, 'Total:'));

export const placeOrder = () => {
  getElementByField(CypressFields.CheckoutPlaceOrder).click();
  return cy.wait('@placeOrder');
};
