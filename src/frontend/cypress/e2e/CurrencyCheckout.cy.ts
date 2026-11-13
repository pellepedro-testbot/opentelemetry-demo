// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import {
  addOpenProductToCart,
  getCartRow,
  getElementByField,
  getPriceInRow,
  getProductCardByName,
  StepChecks,
} from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

const currencyOptions = () =>
  getElementByField(CypressFields.CurrencySwitcher)
    .find('option')
    .should('have.length.greaterThan', 1)
    .then($options => [...$options].map(o => (o as HTMLOptionElement).value));

describe('Shopping in another currency', () => {
  it('lists the currency switcher options in alphabetical order', () => {
    cy.visit('/');
    currencyOptions().then(values => {
      expect(values).to.deep.equal([...values].sort());
    });
  });

  it('places a JPY order whose confirmation shows the shipping the cart quoted', () => {
    const checks = new StepChecks();

    cy.log('Step 1: currency options');
    cy.visit('/');
    currencyOptions().then(values => {
      checks.check('step 1 options sorted', values, [...values].sort());
      checks.check('step 1 EUR offered', values.includes('EUR'), true);
    });

    cy.log('Step 2: choose JPY');
    getElementByField(CypressFields.CurrencySwitcher).select('JPY');
    getElementByField(CypressFields.CurrencySwitcher).should('have.value', 'JPY');
    getElementByField(CypressFields.ProductCard).should('contain', '¥');

    cy.log('Step 3: add Lens Cleaning Kit');
    getProductCardByName('Lens Cleaning Kit').click();
    getElementByField(CypressFields.ProductName).should('have.text', 'Lens Cleaning Kit');
    addOpenProductToCart();
    cy.contains('h1', 'Shopping Cart').should('be.visible');
    getCartRow('L9ECAV7KIM').should('have.length', 1);

    cy.log('Step 4: cart shipping');
    getPriceInRow('Shipping')
      .should('contain.text', '¥')
      .and('not.have.text', '¥ 0.00')
      .invoke('text')
      .then(cartShipping => {
        checks.check('step 4 cart shipping', cartShipping, '¥ 1005.16');

        cy.log('Step 5: place the order');
        cy.intercept('POST', '/api/checkout*').as('placeOrder');
        getElementByField(CypressFields.CheckoutPlaceOrder).click();
        cy.wait('@placeOrder');
        cy.location('pathname', { timeout: 15000 }).should('match', /^\/cart\/checkout\/[^/]+$/);
        cy.contains('Your order is complete!').should('be.visible');

        cy.log('Step 6: confirmation shipping');
        getPriceInRow('Shipping:')
          .invoke('text')
          .then(orderShipping => checks.check('step 6 confirmation shipping', orderShipping, cartShipping));
      });

    checks.assertAll();
  });
});

export {};
