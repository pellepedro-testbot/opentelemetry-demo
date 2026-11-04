// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import {
  getCartRow,
  getCartSummaryPrice,
  getElementByField,
  getProductCard,
  getStoredSession,
  priceAmount,
} from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';
import { emptyCart, getCart } from '../../utils/CypressStoreApi';

const PRODUCT_ID = '0PUK6V6EV0';

const rowPrices = () => getCartRow(PRODUCT_ID).find(`[data-cy="${CypressFields.ProductPrice}"]`);

const amountOf = (expected: (amount: number) => void) => ($el: JQuery<HTMLElement>) => expected(priceAmount($el.text()));

describe('Cart page rows', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/cart*').as('addToCart');
    cy.visit('/');
    getProductCard(PRODUCT_ID).click();
    getElementByField(CypressFields.ProductName).should('exist');
    getElementByField(CypressFields.ProductName)
      .parent()
      .find(`[data-cy="${CypressFields.ProductPrice}"]`)
      .should($price => expect(priceAmount($price.text())).to.be.greaterThan(0))
      .invoke('text')
      .then(text => cy.wrap(priceAmount(text)).as('unitPrice'));
    getElementByField(CypressFields.ProductQuantity).select('3');
    getElementByField(CypressFields.ProductAddToCart).click();
    cy.wait('@addToCart');
    cy.location('pathname').should('eq', '/cart');
    getCartRow(PRODUCT_ID).find('select').should('have.value', '3');
  });

  afterEach(() => {
    getStoredSession().then(session => session && emptyCart(session.userId));
  });

  it('shows the unit price in the price column', () => {
    cy.get<number>('@unitPrice').then(unitPrice => {
      rowPrices().should('have.length', 2);
      rowPrices().eq(0).should(amountOf(amount => expect(amount).to.eq(unitPrice)));
    });
  });

  it('shows unit price times quantity in the total column', () => {
    cy.get<number>('@unitPrice').then(unitPrice => {
      rowPrices().should('have.length', 2);
      rowPrices().eq(1).should(amountOf(amount => expect(amount).to.be.closeTo(unitPrice * 3, 0.005)));
    });
  });

  it('updates the cart and the totals when the quantity is changed, and keeps it after a reload', () => {
    cy.get<number>('@unitPrice').then(unitPrice => {
      getCartRow(PRODUCT_ID).find('select').select('2');
      cy.wait('@addToCart');

      getStoredSession().then(session => {
        getCart(session!.userId).then(({ body }) => {
          expect(body.items.map(({ productId, quantity }: { productId: string; quantity: number }) => [productId, quantity])).to.deep.eq([
            [PRODUCT_ID, 2],
          ]);
        });
      });

      getCartRow(PRODUCT_ID).find('select').should('have.value', '2');
      getCartSummaryPrice('Shipping')
        .should(amountOf(amount => expect(amount).to.be.greaterThan(0)))
        .invoke('text')
        .then(shipping => {
          getCartSummaryPrice('Total').should(
            amountOf(amount => expect(amount).to.be.closeTo(unitPrice * 2 + priceAmount(shipping), 0.005))
          );
        });

      cy.reload();
      getCartRow(PRODUCT_ID).find('select').should('have.value', '2');
      rowPrices().eq(1).should(amountOf(amount => expect(amount).to.be.closeTo(unitPrice * 2, 0.005)));
    });
  });
});

export {};
