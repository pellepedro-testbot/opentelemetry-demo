// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import {
  addProductToCartFromPage,
  emptyStoredCart,
  formatCents,
  getCartLine,
  getCartLinePrices,
  getCartLineQuantity,
  getElementByField,
  getStoredCart,
  priceToCents,
  readStoredSession,
} from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

const PRODUCT_ID = 'OLJCESPC7Z';
const PRODUCT_NAME = 'National Park Foundation Explorascope';
const SECOND_PRODUCT_ID = 'L9ECAV7KIM';
const SECOND_PRODUCT_NAME = 'Lens Cleaning Kit';

const readProductPagePrice = (productId: string) =>
  cy.request(`/api/products/${productId}?currencyCode=USD`).then(({ body }) => {
    const cents = Number(body.priceUsd.units) * 100 + Math.round(Number(body.priceUsd.nanos) / 1e7);
    cy.visit(`/product/${productId}`);
    getElementByField(CypressFields.ProductDetail).should('contain', `$ ${formatCents(cents)}`);
    return cy.wrap(cents);
  });

const lineCell = (productName: string, column: 'Price' | 'Total') =>
  getCartLinePrices(productName).eq(column === 'Price' ? 0 : 1);

const storedQuantity = (userId: string, productId: string) =>
  getStoredCart(userId).then(
    cart => cart.items.find((item: { productId: string }) => item.productId === productId)?.quantity
  );

describe('Cart page', () => {
  afterEach(() => {
    readStoredSession().then(session => {
      if (session) emptyStoredCart(session.userId);
    });
  });

  it('sets the stored quantity to the value chosen in the line selector', () => {
    cy.intercept('POST', '/api/cart*').as('updateCart');
    cy.intercept('GET', '/api/cart*').as('getCart');
    addProductToCartFromPage(PRODUCT_ID, 2);

    readStoredSession().then(({ userId }) => {
      [3, 1].forEach(quantity => {
        getCartLineQuantity(PRODUCT_NAME).select(String(quantity));
        cy.wait('@updateCart');
        cy.wait('@getCart');
        getCartLineQuantity(PRODUCT_NAME).should('have.value', String(quantity));
        storedQuantity(userId, PRODUCT_ID).should('eq', quantity);

        cy.reload();
        getCartLineQuantity(PRODUCT_NAME).should('have.value', String(quantity));
      });
    });
  });

  it('totals unit price times quantity of every line plus shipping', () => {
    cy.intercept('GET', '/api/shipping*').as('getShipping');
    readProductPagePrice(PRODUCT_ID).as('firstPrice');
    readProductPagePrice(SECOND_PRODUCT_ID).as('secondPrice');
    addProductToCartFromPage(PRODUCT_ID, 2);
    addProductToCartFromPage(SECOND_PRODUCT_ID, 1);
    getCartLine(SECOND_PRODUCT_NAME).should('exist');
    cy.wait('@getShipping');

    cy.contains('section span', 'Shipping')
      .next()
      .invoke('text')
      .then(shippingText => {
        const shipping = priceToCents(shippingText);
        cy.get<number>('@firstPrice').then(firstPrice => {
          cy.get<number>('@secondPrice').then(secondPrice => {
            cy.contains('section h3', 'Total')
              .next()
              .should('have.text', `$ ${formatCents(2 * firstPrice + secondPrice + shipping)}`);
          });
        });
      });
  });

  it('shows the unit price under Price on a line at quantity 2', () => {
    readProductPagePrice(PRODUCT_ID).then(price => {
      addProductToCartFromPage(PRODUCT_ID, 2);
      lineCell(PRODUCT_NAME, 'Price').should('have.text', `$ ${formatCents(price)}`);
    });
  });

  it('shows unit price times quantity under Total on a line', () => {
    cy.intercept('POST', '/api/cart*').as('updateCart');
    cy.intercept('GET', '/api/cart*').as('getCart');
    readProductPagePrice(PRODUCT_ID).then(price => {
      addProductToCartFromPage(PRODUCT_ID, 2);
      cy.get('section label').eq(3).should('have.text', 'Total');
      lineCell(PRODUCT_NAME, 'Total').should('have.text', `$ ${formatCents(2 * price)}`);

      getCartLineQuantity(PRODUCT_NAME).select('3');
      cy.wait('@updateCart');
      cy.wait('@getCart');
      lineCell(PRODUCT_NAME, 'Total').should('have.text', `$ ${formatCents(3 * price)}`);
    });
  });

  it('lists the cart items in the header cart dropdown', () => {
    readProductPagePrice(PRODUCT_ID).then(price => {
      addProductToCartFromPage(PRODUCT_ID, 2);
      cy.visit('/');
      getElementByField(CypressFields.CartItemCount).should('have.text', '1');

      getElementByField(CypressFields.CartIcon).click();
      getElementByField(CypressFields.CartDropdown).should('contain', 'Shopping Cart');
      getElementByField(CypressFields.CartDropdownItem).should('have.length', 1);
      getElementByField(CypressFields.CartDropdownItem)
        .should('contain', PRODUCT_NAME)
        .and('contain', `$ ${formatCents(price)}`)
        .and('contain', 'Quantity: 2');

      getElementByField(CypressFields.HotProducts).click();
      getElementByField(CypressFields.CartDropdown).should('not.exist');

      getElementByField(CypressFields.CartIcon).click();
      getElementByField(CypressFields.CartGoToShopping).click();
      cy.location('pathname').should('eq', '/cart');
    });
  });

  it('empties the cart with Empty Cart', () => {
    addProductToCartFromPage(PRODUCT_ID, 1);
    getCartLine(PRODUCT_NAME).should('exist');

    cy.contains('button', 'Empty Cart').click();
    cy.contains('Your shopping cart is empty!').should('be.visible');
    readStoredSession().then(({ userId }) => {
      getStoredCart(userId).its('items').should('have.length', 0);
    });

    cy.reload();
    cy.contains('Your shopping cart is empty!').should('be.visible');
  });

  it('opens the order confirmation page after Place Order', () => {
    cy.intercept('POST', '/api/checkout*').as('placeOrder');
    addProductToCartFromPage(PRODUCT_ID, 2);
    getCartLine(PRODUCT_NAME).should('exist');

    getElementByField(CypressFields.CheckoutPlaceOrder).click();
    cy.wait('@placeOrder');

    cy.location('pathname')
      .should('match', /^\/cart\/checkout\/[^/]+$/)
      .then(pathname => {
        const orderId = pathname.split('/').pop() as string;
        expect(orderId).to.not.be.empty;
        cy.contains('Order ID:').next().should('have.text', orderId);
      });
    cy.contains('Your order is complete!').should('be.visible');
    cy.contains("We've sent you a confirmation email.").should('be.visible');
    cy.contains('1600 Amphitheatre Parkway').should('be.visible');
    cy.contains('Mountain View, CA 94043').should('be.visible');
    cy.contains('United States').should('be.visible');
    cy.contains('div', 'Quantity: 2').should('contain', PRODUCT_NAME);

    cy.visit('/cart');
    cy.contains('Your shopping cart is empty!').should('be.visible');
  });
});

export {};
