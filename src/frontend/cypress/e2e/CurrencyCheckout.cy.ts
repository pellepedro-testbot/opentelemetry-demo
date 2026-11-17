// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { createStepChecks, getElementByField, priceValue } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

const CART_SHIPPING = /^Shipping\s*¥\s*[\d.]+$/;
const ORDER_SHIPPING = /^Shipping:\s*¥\s*[\d.]+$/;

const switcherOptions = () =>
  getElementByField(CypressFields.CurrencySwitcher)
    .find('option')
    .then($options => Cypress.$.makeArray($options).map(o => (o as HTMLOptionElement).value));

const addBinocularsInYen = () => {
  cy.visit('/');
  getElementByField(CypressFields.CurrencySwitcher).select('JPY');
  getElementByField(CypressFields.ProductList).should('contain', '¥');
  cy.contains('[data-cy="product-card"]', 'Roof Binoculars').click();
  getElementByField(CypressFields.ProductName).should('have.text', 'Roof Binoculars');
  cy.contains('button', 'Add To Cart').click();
  cy.location('pathname').should('eq', '/cart');
  cy.contains('main', 'Roof Binoculars').should('exist');
};

describe('Shopping in another currency', () => {
  it('shops and pays in Japanese yen', () => {
    const steps = createStepChecks();
    let cartShipping = '';

    // Step 1: open the currency switcher
    cy.visit('/');
    getElementByField(CypressFields.ProductCard, getElementByField(CypressFields.ProductList)).should(
      'have.length',
      10
    );
    switcherOptions().then(values => {
      steps.check('step 1 options sorted without duplicates', () =>
        expect(values.join(',')).to.equal([...new Set(values)].sort().join(','))
      );
      steps.check('step 1 options include EUR', () => expect(values.join(',')).to.contain('EUR'));
    });

    // Step 2: select JPY
    getElementByField(CypressFields.CurrencySwitcher).select('JPY');
    getElementByField(CypressFields.ProductList).should('contain', '¥');

    // Step 3: add Roof Binoculars to the cart
    cy.contains('[data-cy="product-card"]', 'Roof Binoculars').click();
    cy.contains('button', 'Add To Cart').click();
    cy.location('pathname').should('eq', '/cart');
    cy.contains('main', 'Roof Binoculars').should('exist');
    cy.contains('main div', CART_SHIPPING)
      .should($row => expect(priceValue($row.text())).to.be.greaterThan(0))
      .invoke('text')
      .then(text => {
        cartShipping = text;
        steps.check('step 3 cart shipping is about ¥ 1005', () => expect(priceValue(text)).to.be.closeTo(1005.16, 1));
      });

    // Step 4: place the order
    cy.contains('button', 'Place Order').click();
    cy.location('pathname', { timeout: 15000 }).should('match', /^\/cart\/checkout\/[\w-]+$/);

    // Step 5: read the confirmation
    cy.contains('main', 'Your order is complete!').should('be.visible');
    cy.contains('main', 'Roof Binoculars').should('exist');
    cy.contains('main div', ORDER_SHIPPING)
      .invoke('text')
      .then(text =>
        steps.check('step 5 confirmation shipping equals the cart shipping', () =>
          expect(priceValue(text)).to.equal(priceValue(cartShipping))
        )
      );
    cy.contains('main', /Total:\s*¥\s*[\d.]+/)
      .invoke('text')
      .then(text => {
        const total = priceValue((text.match(/Total:\s*¥\s*([\d.]+)/) || [])[1] || '');
        steps.check('step 5 total includes the shipping', () =>
          expect(total).to.be.greaterThan(priceValue(cartShipping) + 1)
        );
      });

    steps.assertAllPassed();
  });

  it('lists the currencies in alphabetical order', () => {
    cy.visit('/');
    getElementByField(CypressFields.CurrencySwitcher).find('option').should('have.length.greaterThan', 1);

    switcherOptions().then(values => {
      expect(values[0]).to.equal('AUD');
      expect(values.join(',')).to.equal([...new Set(values)].sort().join(','));
    });
  });

  it('switches prices to the selected currency from the sorted list', () => {
    cy.visit('/');
    getElementByField(CypressFields.CurrencySwitcher).select('JPY');

    getElementByField(CypressFields.CurrencySwitcher).should('have.value', 'JPY');
    getElementByField(CypressFields.ProductCard, getElementByField(CypressFields.ProductList)).each($card =>
      expect($card.text()).to.contain('¥')
    );
  });

  it('shows on the confirmation the shipping cost the cart quoted', () => {
    addBinocularsInYen();
    cy.contains('main div', CART_SHIPPING)
      .should($row => expect(priceValue($row.text())).to.be.greaterThan(0))
      .invoke('text')
      .as('cartShipping');

    cy.contains('button', 'Place Order').click();
    cy.location('pathname', { timeout: 15000 }).should('match', /^\/cart\/checkout\/[\w-]+$/);

    cy.get<string>('@cartShipping').then(cartShipping => {
      cy.contains('main div', ORDER_SHIPPING)
        .invoke('text')
        .then(text => expect(priceValue(text)).to.equal(priceValue(cartShipping)));
    });
  });
});

export {};
