// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { addProductToCart, cartLine, moneyOf, serverCart, sessionUserId } from '../helpers/demo';
import { getElementByField } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

// Watch only the cart updates that follow adding the product.
const watchCartUpdates = () => cy.intercept('POST', '/api/cart*').as('updateCart');

const QUANTITY_OPTIONS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

const lineQuantity = (productId: string) => cartLine(productId).find('select');
// The line's two prices are its Price and Total columns, in that order.
const linePrices = (productId: string) => cartLine(productId).find(`[data-cy="${CypressFields.ProductPrice}"]`);

const serverQuantity = (productId: string) =>
  sessionUserId().then(userId =>
    serverCart(userId)
      .its('items')
      .then((items: { productId: string; quantity: number }[]) => items.find(i => i.productId === productId)?.quantity)
  );

const expectTotalIsQuantityTimesPrice = (productId: string, quantity: number) =>
  linePrices(productId).should($prices => {
    expect($prices).to.have.length(2);
    const price = moneyOf($prices.eq(0).text());
    const total = moneyOf($prices.eq(1).text());
    expect(total, `Total for ${quantity} x ${price}`).to.be.closeTo(price * quantity, 0.005);
  });

describe('Cart line quantity', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('changes a product quantity in the cart', () => {
    cy.log('step 1: open the first product and add it to the cart');
    addProductToCart().then(productId => {
      cy.log('step 2: the item table and the line quantity dropdown');
      cy.get('main [class*="CartItems-styled__CardItemsHeader"] label').then($labels => {
        expect([...$labels].map(l => l.textContent)).to.deep.equal(['Product', 'Quantity', 'Price', 'Total']);
      });
      lineQuantity(productId).should('have.value', '1');
      lineQuantity(productId)
        .find('option')
        .then($o => expect([...$o].map(o => o.textContent)).to.deep.equal(QUANTITY_OPTIONS));

      cy.log('step 3: choose 3');
      watchCartUpdates();
      lineQuantity(productId).select('3');
      cy.wait('@updateCart').its('request.body.item').should('deep.include', { productId, quantity: 2 });
      lineQuantity(productId).should('have.value', '3');
      expectTotalIsQuantityTimesPrice(productId, 3);

      cy.log('step 4: reload keeps 3');
      cy.reload();
      lineQuantity(productId).should('have.value', '3');
      serverQuantity(productId).should('eq', 3);

      cy.log('step 5: choose 2 and reload');
      watchCartUpdates();
      lineQuantity(productId).select('2');
      cy.wait('@updateCart');
      cy.reload();
      lineQuantity(productId).should('have.value', '2');
      serverQuantity(productId).should('eq', 2);
      expectTotalIsQuantityTimesPrice(productId, 2);
    });
  });

  it('shows the item table headings Product, Quantity, Price and Total', () => {
    addProductToCart();
    cy.get('main [class*="CartItems-styled__CardItemsHeader"] label').then($labels => {
      expect([...$labels].map(l => l.textContent)).to.deep.equal(['Product', 'Quantity', 'Price', 'Total']);
    });
  });

  it('shows each line quantity as a 1 to 10 dropdown with the current quantity selected', () => {
    addProductToCart(4).then(productId => {
      lineQuantity(productId)
        .find('option')
        .then($o => expect([...$o].map(o => o.value)).to.deep.equal(QUANTITY_OPTIONS));
      lineQuantity(productId).should('have.value', '4');
      lineQuantity(productId).find('option:selected').should('have.text', '4');
    });
  });

  it('shows a line Total of the unit price times the quantity', () => {
    addProductToCart(3).then(productId => {
      lineQuantity(productId).should('have.value', '3');
      expectTotalIsQuantityTimesPrice(productId, 3);
    });
  });

  it('raises a line from 1 to 3 by adding 2 and keeps 3', () => {
    addProductToCart().then(productId => {
      watchCartUpdates();
      lineQuantity(productId).select('3');
      cy.wait('@updateCart').its('request.body.item').should('deep.include', { productId, quantity: 2 });
      cy.wait(1000);
      cy.get('@updateCart.all').should('have.length', 1);
      serverQuantity(productId).should('eq', 3);
      cy.reload();
      lineQuantity(productId).should('have.value', '3');
    });
  });

  it('lowers a line from 5 to 2 and keeps the product with quantity 2', () => {
    addProductToCart(5).then(productId => {
      lineQuantity(productId).should('have.value', '5');
      watchCartUpdates();
      lineQuantity(productId).select('2');
      cy.wait('@updateCart').its('request.body.item').should('deep.include', { productId, quantity: -3 });
      cy.reload();
      lineQuantity(productId).should('have.value', '2');
      serverQuantity(productId).should('eq', 2);
    });
  });

  it('keeps euro prices on a cart line whose Total is quantity times Price', () => {
    getElementByField(CypressFields.CurrencySwitcher).select('EUR');
    getElementByField(CypressFields.CurrencySwitcher).should('have.value', 'EUR');
    addProductToCart(2).then(productId => {
      getElementByField(CypressFields.CurrencySwitcher).should('have.value', 'EUR');
      linePrices(productId).each($p => expect($p.text()).to.contain('€'));
      expectTotalIsQuantityTimesPrice(productId, 2);
      cy.request(`/api/products/${productId}?currencyCode=EUR`)
        .its('body.priceUsd')
        .then(price => {
          const unit = price.units + price.nanos / 1e9;
          linePrices(productId)
            .first()
            .should($p => expect(moneyOf($p.text())).to.be.closeTo(unit, 0.005));
        });
    });
  });
});

export {};
