// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import {
  createStepChecks,
  getCartLine,
  getCartSummaryRow,
  getElementByField,
  getOrderSummaryRow,
  priceAmount,
} from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

const IMAGER = { id: '0PUK6V6EV0', name: 'Solar System Color Imager', usdPrice: '$ 175.00' };

const cents = (amount: number) => Math.round(amount * 100);

describe('Checkout in another currency', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/cart*').as('addToCart');
    cy.intercept('GET', '/api/shipping*').as('getShipping');
    cy.intercept('POST', '/api/checkout*').as('placeOrder');
  });

  it('pays in CAD with the shipping and total the cart showed', () => {
    const steps = createStepChecks();
    let cartShipping = 0;
    let cartTotal = 0;

    cy.log('Step 1: the currency list is sorted and offers EUR');
    cy.visit('/');
    getElementByField(CypressFields.CurrencySwitcher)
      .find('option')
      .should('have.length.at.least', 2)
      .then($options => {
        const codes = $options.toArray().map(option => (option as HTMLOptionElement).value);
        steps.check(
          JSON.stringify(codes) === JSON.stringify([...codes].sort()),
          `step 1: currency options are not sorted: ${codes.join(',')}`
        );
        steps.check(codes.includes('EUR'), `step 1: EUR is not offered: ${codes.join(',')}`);
      });

    cy.log('Step 2: choose CAD');
    getElementByField(CypressFields.CurrencySwitcher).select('CAD');
    getElementByField(CypressFields.CurrencySwitcher).should('have.value', 'CAD');
    getElementByField(CypressFields.ProductCard)
      .filter(`:contains("${IMAGER.name}")`)
      .find(`[data-cy="${CypressFields.ProductPrice}"]`)
      .should('not.contain', IMAGER.usdPrice);

    cy.log('Step 3: add the Solar System Color Imager');
    getElementByField(CypressFields.ProductCard).filter(`:contains("${IMAGER.name}")`).click();
    cy.location('pathname').should('eq', `/product/${IMAGER.id}`);
    getElementByField(CypressFields.ProductAddToCart).click();
    cy.wait('@addToCart');
    cy.location('pathname').should('eq', '/cart');
    getCartLine(IMAGER.name).find(`[data-cy="${CypressFields.ProductPrice}"]`).eq(0).should('not.contain', '175.00');

    cy.log('Step 4: note the cart Shipping and Total, place the order');
    cy.wait('@getShipping').its('request.url').should('include', 'currencyCode=CAD');
    getCartSummaryRow('Shipping')
      .find(`[data-cy="${CypressFields.ProductPrice}"]`)
      .should($shipping => expect(priceAmount($shipping.text())).to.be.greaterThan(0))
      .then($shipping => {
        cartShipping = priceAmount($shipping.text());
      });
    getCartSummaryRow('Total')
      .find(`[data-cy="${CypressFields.ProductPrice}"]`)
      .then($total => {
        cartTotal = priceAmount($total.text());
      });
    getElementByField(CypressFields.CheckoutPlaceOrder).click();
    cy.wait('@placeOrder').its('response.statusCode').should('eq', 200);
    cy.location('pathname').should('match', /^\/cart\/checkout\/[^/]+$/);

    cy.log('Step 5: the confirmation shows the cart Shipping and Total');
    cy.contains('h1', 'Your order is complete!').should('be.visible');
    cy.contains(IMAGER.name).should('be.visible');
    getOrderSummaryRow('Shipping:').then($row => {
      const shipping = priceAmount($row.text());
      steps.check(cents(shipping) === cents(cartShipping), `step 5: Shipping ${shipping}, cart showed ${cartShipping}`);
    });
    getOrderSummaryRow('Total:').then($row => {
      const total = priceAmount($row.text());
      steps.check(cents(total) === cents(cartTotal), `step 5: Total ${total}, cart showed ${cartTotal}`);
    });

    steps.assertAll();
  });
});

export {};
