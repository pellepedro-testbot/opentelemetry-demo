// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import {
  addOpenProductToCart,
  getCartRow,
  getElementByField,
  getPriceInRow,
  getProductCardByName,
  priceValue,
  StepChecks,
} from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

const ROOF_BINOCULARS = { id: '2ZYFJ3GM2N', name: 'Roof Binoculars' };
const LENS_CLEANING_KIT = { id: 'L9ECAV7KIM', name: 'Lens Cleaning Kit' };

const addProduct = (name: string) => {
  cy.visit('/');
  getProductCardByName(name).click();
  getElementByField(CypressFields.ProductName).should('have.text', name);
  addOpenProductToCart();
};

const setQuantity = (productId: string, quantity: number) => {
  cy.intercept('GET', '/api/cart*').as('reloadCart');
  getCartRow(productId).find('select').select(String(quantity));
  cy.wait('@reloadCart');
  getCartRow(productId).find('select').should('have.value', String(quantity));
};

const loadedShipping = () => getPriceInRow('Shipping').should('not.have.text', '$ 0.00').invoke('text');

const rowPrices = (productId: string) =>
  getCartRow(productId)
    .find(`[data-cy="${CypressFields.ProductPrice}"]`)
    .then($prices => [...$prices].map(el => el.innerText.trim()));

describe('Cart totals', () => {
  it('shows price times quantity in the line Total column', () => {
    addProduct(ROOF_BINOCULARS.name);
    setQuantity(ROOF_BINOCULARS.id, 3);

    rowPrices(ROOF_BINOCULARS.id).should('deep.equal', ['$ 209.95', '$ 629.85']);
  });

  it('adds the line totals and shipping up to the cart Total', () => {
    addProduct(ROOF_BINOCULARS.name);
    setQuantity(ROOF_BINOCULARS.id, 2);
    addProduct(LENS_CLEANING_KIT.name);

    getPriceInRow('Shipping').should('have.text', '$ 17.98');
    rowPrices(ROOF_BINOCULARS.id).then(roof => {
      rowPrices(LENS_CLEANING_KIT.id).then(kit => {
        getPriceInRow('Shipping')
          .invoke('text')
          .then(shipping => {
            const expected = priceValue(roof[1]) + priceValue(kit[1]) + priceValue(shipping);
            getPriceInRow('Total')
              .invoke('text')
              .then(total => expect(priceValue(total)).to.be.closeTo(expected, 0.001));
          });
      });
    });
  });

  it('shows the shipping quote for a single item', () => {
    addProduct(ROOF_BINOCULARS.name);

    getPriceInRow('Shipping').should('have.text', '$ 8.99');
  });

  it('buys several products and the confirmation repeats the cart lines, shipping and total', () => {
    const checks = new StepChecks();

    cy.log('Step 1: home page lists the catalog');
    cy.visit('/');
    getElementByField(CypressFields.ProductCard, getElementByField(CypressFields.ProductList)).should(
      'have.length',
      10
    );

    cy.log('Step 2: open Roof Binoculars');
    getProductCardByName(ROOF_BINOCULARS.name).click();
    getElementByField(CypressFields.ProductName).should('have.text', ROOF_BINOCULARS.name);

    cy.log('Step 3: add it to the cart');
    addOpenProductToCart();
    cy.contains('h1', 'Shopping Cart').should('be.visible');

    cy.log('Step 4: shipping for one item');
    loadedShipping().then(text => checks.check('step 4 shipping', text, '$ 8.99'));

    cy.log('Step 5: quantity 3');
    setQuantity(ROOF_BINOCULARS.id, 3);
    rowPrices(ROOF_BINOCULARS.id).then(prices => checks.check('step 5 price/total', prices, ['$ 209.95', '$ 629.85']));
    loadedShipping().then(text => checks.check('step 5 shipping', text, '$ 8.99'));

    cy.log('Step 6: add Lens Cleaning Kit');
    addProduct(LENS_CLEANING_KIT.name);
    getPriceInRow('Shipping').should('contain.text', '17.98');
    getPriceInRow('Shipping')
      .invoke('text')
      .then(text => checks.check('step 6 shipping', text, '$ 17.98'));

    cy.log('Step 7: cart total');
    getPriceInRow('Total')
      .invoke('text')
      .then(text => checks.check('step 7 total', text, '$ 669.78'));

    cy.log('Step 8: place the order');
    cy.intercept('POST', '/api/checkout*').as('placeOrder');
    getElementByField(CypressFields.CheckoutPlaceOrder).click();
    cy.wait('@placeOrder');
    cy.location('pathname', { timeout: 15000 }).should('match', /^\/cart\/checkout\/[^/]+$/);

    const verifyConfirmation = (label: string) => {
      cy.contains('Your order is complete!').should('be.visible');
      cy.get(`div:has(> img[alt="${ROOF_BINOCULARS.name}"])`)
        .invoke('text')
        .then(text => checks.check(`${label} Roof Binoculars line`, text.includes('Quantity: 3') && text.includes('$ 629.85'), true));
      cy.get(`div:has(> img[alt="${LENS_CLEANING_KIT.name}"])`)
        .invoke('text')
        .then(text => checks.check(`${label} Lens Cleaning Kit line`, text.includes('Quantity: 1') && text.includes('$ 21.95'), true));
      getPriceInRow('Shipping:')
        .invoke('text')
        .then(text => checks.check(`${label} shipping`, text, '$ 17.98'));
      getPriceInRow('Total:')
        .invoke('text')
        .then(text => checks.check(`${label} total`, text, '$ 669.78'));
    };

    cy.log('Step 9: confirmation');
    verifyConfirmation('step 9');

    cy.log('Step 10: reload the confirmation');
    cy.location('pathname').then(orderPath => {
      cy.reload();
      cy.location('pathname').should('eq', orderPath);
    });
    verifyConfirmation('step 10');

    checks.assertAll();
  });
});

export {};
