// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { getElementByField } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';
import { JourneySteps, priceAmount } from '../support/journeySteps';

// The EUR rate of USD the currency service is built with (src/currency/src/server.cpp).
const USD_PER_EUR = 1.1305;

const quantityMenu = (productName: string) => cy.get(`select[aria-label="Quantity of ${productName}"]`);

describe('Checkout after removing an item', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/cart*').as('addToCart');
    cy.intercept('GET', '/api/cart*').as('getCart');
    cy.intercept('POST', '/api/checkout*').as('placeOrder');
  });

  it('puts two products in the cart, removes one and buys the other in euros', () => {
    const steps = new JourneySteps();
    const kept = { id: '', name: '', eurPrice: 0 };
    let removedName = '';

    cy.log('Step 1: select EUR');
    cy.visit('/');
    getElementByField(CypressFields.CurrencySwitcher).select('EUR');
    cy.wait(1500);
    getElementByField(CypressFields.ProductPrice).then($prices =>
      steps.check('Step 1 prices in EUR', () => expect($prices.first().text()).to.contain('€'))
    );

    cy.log('Step 2: add 2 of a product');
    getElementByField(CypressFields.ProductCard).first().click();
    getElementByField(CypressFields.ProductDetail).should('exist');
    cy.location('pathname').then(path => {
      kept.id = path.split('/').pop() ?? '';
    });
    getElementByField(CypressFields.ProductName)
      .should('not.be.empty')
      .invoke('text')
      .then(name => {
        kept.name = name.trim();
      });
    getElementByField(CypressFields.ProductPrice, getElementByField(CypressFields.ProductDetail))
      .first()
      .should('contain', '€')
      .invoke('text')
      .then(text => {
        kept.eurPrice = priceAmount(text);
      });
    getElementByField(CypressFields.ProductQuantity).select('2');
    getElementByField(CypressFields.ProductAddToCart).click();
    cy.wait('@addToCart');
    cy.wait('@getCart', { timeout: 10000 });
    cy.location('pathname').should('eq', '/cart');
    cy.then(() =>
      quantityMenu(kept.name).then($select =>
        steps.check('Step 2 line quantity', () => expect($select.val()).to.eq('2'))
      )
    );

    cy.log('Step 3: add a different product');
    cy.get('header a[href="/"], nav a[href="/"]').first().click();
    cy.location('pathname').should('eq', '/');
    getElementByField(CypressFields.ProductCard).last().click();
    getElementByField(CypressFields.ProductName)
      .should('not.be.empty')
      .invoke('text')
      .then(name => {
        removedName = name.trim();
      });
    getElementByField(CypressFields.ProductAddToCart).click();
    cy.wait('@addToCart');
    cy.wait('@getCart', { timeout: 10000 });
    cy.location('pathname').should('eq', '/cart');
    cy.wait(1000);
    cy.get('select[aria-label^="Quantity of "]').then($menus =>
      steps.check('Step 3 two lines', () => expect($menus).to.have.length(2))
    );

    cy.log('Step 4: remove the second product');
    cy.then(() => quantityMenu(removedName).select('Remove'));
    cy.wait('@addToCart');
    cy.wait('@getCart', { timeout: 10000 });
    cy.wait(1000);
    cy.get('select[aria-label^="Quantity of "]').then($menus =>
      steps.check('Step 4 only the first product remains', () =>
        expect([...$menus].map(m => m.getAttribute('aria-label'))).to.deep.eq([`Quantity of ${kept.name}`])
      )
    );

    cy.log('Step 5: place the order with the default form values');
    cy.get('input[value="4432-8015-6152-0454"]').should('exist');
    // A failed order surfaces as an unhandled rejection in the page; the step check below reports it.
    cy.on('uncaught:exception', err => !err.message.includes('Failed to place order'));
    getElementByField(CypressFields.CheckoutPlaceOrder).click();
    let placed = false;
    cy.wait('@placeOrder', { timeout: 20000 }).then(({ response }) => {
      placed = response?.statusCode === 200;
      steps.check('Step 5 order placed', () => expect(response?.statusCode).to.eq(200));
    });

    cy.then(() => {
      if (!placed) return;
      cy.location('pathname', { timeout: 20000 }).should('match', /\/cart\/checkout\//);
      cy.log('Step 6: read the confirmation');
      cy.contains('Your order is complete!').should('exist');
      cy.contains('Order ID:')
        .next()
        .invoke('text')
        .then(orderId => steps.check('Step 6 order id', () => expect(orderId.trim()).to.not.be.empty));
      cy.get('body').then($body => {
        const quantities = [...$body.find('p, span, div')].filter(
          e => /^Quantity: \d+$/.test(e.textContent?.trim() ?? '') && e.children.length === 0
        );
        steps.check('Step 6 one item, quantity 2', () =>
          expect(quantities.map(e => e.textContent?.trim())).to.deep.eq(['Quantity: 2'])
        );
      });
      cy.contains('span', 'Shipping:')
        .next()
        .invoke('text')
        .then(shippingText => {
          cy.contains('Total:')
            .next()
            .invoke('text')
            .then(totalText => {
              steps.check('Step 6 total in EUR', () => expect(totalText).to.contain('€'));
              steps.check('Step 6 total is 2 x unit price + shipping', () =>
                expect(priceAmount(totalText)).to.be.closeTo(2 * kept.eurPrice + priceAmount(shippingText), 0.02)
              );
            });
        });
      cy.then(() =>
        cy.request(`/api/products/${kept.id}`).then(({ body }) => {
          const usd = body.priceUsd.units + body.priceUsd.nanos / 1e9;
          steps.check('Step 6 EUR price consistent with the USD price', () =>
            expect(kept.eurPrice).to.be.closeTo(usd / USD_PER_EUR, 0.01)
          );
        })
      );
    });

    steps.assertAllPassed();
  });
});

export {};
