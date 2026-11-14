// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import getSymbolFromCurrency from 'currency-symbol-map';
import {
  cartCell,
  cartSection,
  createStepChecks,
  emptyStoredCart,
  getElementByField,
  parsePrice,
} from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

const PRODUCT_ID = 'OLJCESPC7Z';
const PRODUCT_NAME = 'National Park Foundation Explorascope';
const EURO = getSymbolFromCurrency('EUR') as string;

describe('Checkout in euros', () => {
  afterEach(() => emptyStoredCart());

  it('shops in euros and sees the order shipping in euros', () => {
    const checks = createStepChecks();
    let shippingEstimate = '';

    cy.intercept('POST', '/api/cart*').as('addToCart');
    cy.intercept('POST', '/api/checkout*').as('placeOrder');

    cy.log('Step 1: select EUR in the currency switcher');
    cy.visit('/');
    getElementByField(CypressFields.ProductCard).should('have.length.greaterThan', 0);
    getElementByField(CypressFields.CurrencySwitcher)
      .find('option')
      .then($options => {
        const codes = [...$options].map(o => (o as HTMLOptionElement).value);
        checks.check(1, codes.includes('EUR'), `EUR is not offered: ${codes.join()}`);
        if (!codes.includes('EUR')) return;

        getElementByField(CypressFields.CurrencySwitcher).select('EUR');
        getElementByField(CypressFields.ProductCard).should('contain', EURO);

        cy.log('Step 2: reload the page');
        cy.reload();
        getElementByField(CypressFields.CurrencySwitcher).then($select =>
          checks.check(2, $select.val() === 'EUR', `currency shows ${$select.val()} after reload`)
        );

        cy.log('Step 3: open the product and add it to the cart');
        cy.contains(`[data-cy="${CypressFields.ProductCard}"]`, PRODUCT_NAME).click();
        cy.location('pathname').should('eq', `/product/${PRODUCT_ID}`);
        getElementByField(CypressFields.ProductAddToCart).click();
        cy.wait('@addToCart');
        cy.location('pathname').should('eq', '/cart');
        cartCell(PRODUCT_NAME, 'Price')
          .invoke('text')
          .then(text => checks.check(3, text.startsWith(EURO), `cart price shows ${text}`));
        cartSection()
          .children('div')
          .filter(':contains("Shipping")')
          .find(`[data-cy="${CypressFields.ProductPrice}"]`)
          .should($price => expect(parsePrice($price.text()), 'shipping estimate').to.be.greaterThan(0))
          .then($price => {
            shippingEstimate = $price.text();
            checks.check(3, shippingEstimate.startsWith(EURO), `shipping estimate shows ${shippingEstimate}`);
          });

        cy.log('Step 4: place the order with the default form');
        getElementByField(CypressFields.CheckoutPlaceOrder).click();
        cy.wait('@placeOrder').its('response.statusCode').should('eq', 200);
        cy.location('pathname').should('match', /^\/cart\/checkout\/[^/]+$/);
        cy.contains('h5', PRODUCT_NAME).should('be.visible');
        cy.contains('div', 'Shipping:')
          .find(`[data-cy="${CypressFields.ProductPrice}"]`)
          .invoke('text')
          .then(text =>
            checks.check(
              4,
              text === shippingEstimate,
              `order shipping shows ${text}, cart estimate was ${shippingEstimate}`
            )
          );
      });

    checks.assertAll();
  });
});

export {};
