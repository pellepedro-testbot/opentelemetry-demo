// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import {
  addProductToCartFromHome,
  formatPrice,
  getElementByField,
  getOrderItem,
  getOrderSummaryRow,
  toNanos,
} from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

interface IOrder {
  orderId: string;
  shippingCost: { units: number; nanos: number };
  items: { cost: { units: number; nanos: number }; item: { quantity: number; product: { name: string } } }[];
}

describe('Order confirmation', () => {
  it('shows the placed order with its address, items, shipping and total, then empties the cart', () => {
    addProductToCartFromHome('Starsense Explorer Refractor Telescope', 2);
    cy.intercept('POST', '/api/checkout*').as('placeOrder');

    getElementByField(CypressFields.CheckoutPlaceOrder).click();
    cy.wait('@placeOrder').then(({ response }) => {
      expect(response?.statusCode).to.eq(200);
      const order = response?.body as IOrder;

      cy.location('pathname').should('eq', `/cart/checkout/${order.orderId}`);
      cy.contains('h1', 'Your order is complete!').should('be.visible');
      cy.contains(order.orderId).should('be.visible');
      cy.contains('p', '1600 Amphitheatre Parkway').should('be.visible');
      cy.contains('p', 'Mountain View, CA 94043').should('be.visible');

      expect(order.items).to.have.length(1);
      const [{ cost, item }] = order.items;
      expect(item.quantity).to.eq(2);
      const itemsTotal = 2 * toNanos(cost);
      getOrderItem(item.product.name, 2, formatPrice(itemsTotal, '$')).should('exist');
      getOrderSummaryRow('Shipping:').should('contain', formatPrice(toNanos(order.shippingCost), '$'));
      getOrderSummaryRow('Total:').should('contain', formatPrice(itemsTotal + toNanos(order.shippingCost), '$'));
    });

    cy.visit('/cart');
    cy.contains('Your shopping cart is empty!').should('be.visible');
    getElementByField(CypressFields.CartItemCount).should('not.exist');
  });
});

export {};
