// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { getElementByField, getPagePrices, toAmounts } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

describe('Order Confirmation Page', () => {
  it('charges the cart shipping quote in the shopper currency', () => {
    let cartShipping = 0;
    cy.intercept('POST', '/api/cart*').as('addToCart');
    cy.intercept('POST', '/api/checkout*').as('placeOrder');

    cy.visit('/');
    getElementByField(CypressFields.CurrencySwitcher).select('CAD');
    getElementByField(CypressFields.CurrencySwitcher).should('have.value', 'CAD');

    cy.visit('/product/0PUK6V6EV0');
    getElementByField(CypressFields.ProductName).should('not.be.empty');
    getElementByField(CypressFields.ProductQuantity).select('2');
    getElementByField(CypressFields.ProductAddToCart).click();
    cy.wait('@addToCart');
    cy.location('pathname').should('eq', '/cart');

    // With one product line, the cart prices are the line's Price, its Total, the Shipping row and the Total row.
    getPagePrices()
      .should($prices => {
        expect($prices).to.have.length(4);
        expect(toAmounts($prices)[2]).to.be.greaterThan(0);
      })
      .then($prices => {
        cartShipping = toAmounts($prices)[2];
      });

    getElementByField(CypressFields.CheckoutPlaceOrder).click();
    cy.wait('@placeOrder').its('response.statusCode').should('eq', 200);
    cy.contains('Your order is complete!').should('be.visible');

    // On the confirmation, the prices are the item's price, Shipping and Total.
    getPagePrices()
      .should('have.length', 3)
      .then($prices => {
        const [items, shipping, total] = toAmounts($prices);
        expect(shipping, 'confirmation Shipping').to.be.closeTo(cartShipping, 0.011);
        expect(total, 'confirmation Total').to.be.closeTo(items + cartShipping, 0.011);
      });
  });
});

export {};
