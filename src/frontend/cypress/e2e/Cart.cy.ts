// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import {
  addProductToCartFromHome,
  formatPrice,
  getCartFromApi,
  getCartColumnHeaders,
  getCartLine,
  getCartSummaryRow,
  getElementByField,
  getShippingQuote,
  getStoredSession,
  toNanos,
} from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

const STARSENSE = { id: '66VCHSJNUP', name: 'Starsense Explorer Refractor Telescope' };
const ROOF_BINOCULARS = { id: '2ZYFJ3GM2N', name: 'Roof Binoculars' };

interface ICartItem {
  productId: string;
  quantity: number;
  product: { priceUsd: { units: number; nanos: number } };
}

const storedQuantity = (userId: string, productId: string) =>
  getCartFromApi(userId).then(
    (cart: { items: ICartItem[] }) => cart.items.find(item => item.productId === productId)?.quantity ?? 0
  );

describe('Cart page', () => {
  it('adds the quantity chosen on the product page to the cart', () => {
    addProductToCartFromHome(STARSENSE.name, 2);

    getCartLine(STARSENSE.name).should('have.length', 1).find('select').should('have.value', '2');
    getElementByField(CypressFields.CartItemCount).should('be.visible');
    getElementByField(CypressFields.CartIcon).click({ force: true });
    getElementByField(CypressFields.CartDropdownItem)
      .should('have.length', 1)
      .and('contain', STARSENSE.name)
      .and('contain', 'Quantity: 2');
    getStoredSession().then(({ userId }) => storedQuantity(userId, STARSENSE.id).should('eq', 2));
  });

  it('saves the quantity picked in the line quantity selector, up and down', () => {
    addProductToCartFromHome(STARSENSE.name, 1);
    cy.intercept('POST', '/api/cart*').as('updateCart');
    cy.intercept('GET', '/api/cart*').as('getCart');

    getCartLine(STARSENSE.name).find('select').select('3');
    cy.wait('@updateCart');
    cy.wait('@getCart');
    getCartLine(STARSENSE.name).find('select').should('have.value', '3');
    getStoredSession().then(({ userId }) => storedQuantity(userId, STARSENSE.id).should('eq', 3));

    getCartLine(STARSENSE.name).find('select').select('2');
    cy.wait('@updateCart');
    cy.wait('@getCart');
    getCartLine(STARSENSE.name).find('select').should('have.value', '2');
    getStoredSession().then(({ userId }) => storedQuantity(userId, STARSENSE.id).should('eq', 2));

    cy.reload();
    getCartLine(STARSENSE.name).find('select').should('have.value', '2');
    getStoredSession().then(({ userId }) => storedQuantity(userId, STARSENSE.id).should('eq', 2));
  });

  it('keeps the last quantity picked when the selector is changed twice in quick succession', () => {
    addProductToCartFromHome(STARSENSE.name, 1);
    getCartLine(STARSENSE.name).find('select').should('have.value', '1');

    getCartLine(STARSENSE.name)
      .find('select')
      .then($select => {
        const select = $select[0] as HTMLSelectElement;
        const win = select.ownerDocument.defaultView as Window & typeof globalThis;
        const setValue = Object.getOwnPropertyDescriptor(win.HTMLSelectElement.prototype, 'value')!.set!;
        ['3', '1'].forEach(value => {
          setValue.call(select, value);
          select.dispatchEvent(new win.Event('change', { bubbles: true }));
        });
      });
    cy.wait(3000);

    getStoredSession().then(({ userId }) => storedQuantity(userId, STARSENSE.id).should('eq', 1));
    getCartLine(STARSENSE.name).find('select').should('have.value', '1');
  });

  it('stores the picked quantity even when the cart changed elsewhere since the page loaded', () => {
    addProductToCartFromHome(STARSENSE.name, 3);
    getCartLine(STARSENSE.name).find('select').should('have.value', '3');

    getStoredSession().then(({ userId }) => {
      cy.request('POST', '/api/cart', { userId, item: { productId: STARSENSE.id, quantity: -2 } });
      storedQuantity(userId, STARSENSE.id).should('eq', 1);

      getCartLine(STARSENSE.name).find('select').select('1');
      cy.wait(3000);

      storedQuantity(userId, STARSENSE.id).should('eq', 1);
    });
  });

  it('shows the unit price under Price and price times quantity under Total for each line', () => {
    addProductToCartFromHome(STARSENSE.name, 3);
    getCartLine(STARSENSE.name).find('select').should('have.value', '3');

    getCartColumnHeaders().should('have.length', 1);

    getStoredSession().then(({ userId }) => {
      getCartFromApi(userId).then((cart: { items: ICartItem[] }) => {
        const price = toNanos(cart.items[0].product.priceUsd);
        getCartLine(STARSENSE.name)
          .find(`[data-cy="${CypressFields.ProductPrice}"]`)
          .then(cells => {
            expect(cells).to.have.length(2);
            expect(cells.eq(0).text()).to.eq(formatPrice(price, '$'));
            expect(cells.eq(1).text()).to.eq(formatPrice(3 * price, '$'));
          });
        getShippingQuote(cart.items).then(shipping => {
          getCartSummaryRow('Total').should('contain', formatPrice(3 * price + toNanos(shipping), '$'));
        });
      });
    });
  });

  it('totals each line price times its quantity plus shipping', () => {
    addProductToCartFromHome(STARSENSE.name, 2);
    addProductToCartFromHome(ROOF_BINOCULARS.name, 1);
    getCartLine(ROOF_BINOCULARS.name).should('have.length', 1);
    getCartLine(STARSENSE.name).find('select').should('have.value', '2');

    getStoredSession().then(({ userId }) => {
      getCartFromApi(userId).then((cart: { items: ICartItem[] }) => {
        const priceOf = (productId: string) =>
          toNanos(cart.items.find(item => item.productId === productId)!.product.priceUsd);
        const itemsTotal = 2 * priceOf(STARSENSE.id) + priceOf(ROOF_BINOCULARS.id);

        getShippingQuote(cart.items).then(shipping => {
          getCartSummaryRow('Shipping').should('contain', formatPrice(toNanos(shipping), '$'));
          getCartSummaryRow('Total').should('contain', formatPrice(itemsTotal + toNanos(shipping), '$'));
        });
      });
    });
  });
});

export {};
