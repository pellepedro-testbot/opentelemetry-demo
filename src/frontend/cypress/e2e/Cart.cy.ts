// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { getElementByField } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

// The cart page's prices in page order: each line's unit price then its line total, then
// shipping, then the cart total. The recommendations below the cart are left out.
const cartPrices = () =>
  getElementByField(CypressFields.ProductPrice, cy.get('main')).not(
    `[data-cy="${CypressFields.RecommendationList}"] [data-cy="${CypressFields.ProductPrice}"]`
  );

// The cart line's quantity select is the only unnamed select in the page; the checkout
// form's selects are named after their fields.
const lineQuantitySelect = () => cy.get('main select:not([name])');

// Drops everything but digits and the decimal point, so '$ 101.96' reads as 101.96.
const amountOf = (text: string) => Number(text.replace(/[^0-9.]/g, ''));

const addToCart = (productId: string, quantity = 1) =>
  cy.window().then(win => {
    const { userId } = JSON.parse(win.localStorage.getItem('session') as string);

    cy.request('POST', '/api/cart', { userId, item: { productId, quantity } });
  });

describe('Cart Page', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/cart*').as('getCart');
    cy.intercept('POST', '/api/cart*').as('updateCart');
    cy.visit('/');
    getElementByField(CypressFields.SessionId).should('contain', 'session-id: ');
  });

  afterEach(() => {
    cy.window().then(win => {
      const { userId } = JSON.parse(win.localStorage.getItem('session') as string);

      cy.request({ method: 'DELETE', url: '/api/cart', body: { userId }, failOnStatusCode: false });
    });
  });

  it('should show a line total of unit price times quantity', () => {
    addToCart('OLJCESPC7Z');
    cy.visit('/cart');
    cartPrices().should('have.length', 4);

    lineQuantitySelect().select('3');
    cy.wait('@updateCart');
    cy.wait('@getCart');
    lineQuantitySelect().should('have.value', '3');

    cartPrices()
      .eq(3)
      .should($total => expect(amountOf($total.text())).to.be.greaterThan(101.96 * 3));
    cartPrices().then($prices => {
      const [unit, lineTotal, shipping, total] = [...$prices].map(price => amountOf(price.textContent || ''));

      expect(unit, 'unit price').to.eq(101.96);
      expect(lineTotal, 'line total').to.eq(305.88);
      expect(total, 'cart total').to.be.closeTo(lineTotal + shipping, 0.005);
    });
  });

  it('should update the line total when the quantity changes', () => {
    addToCart('0PUK6V6EV0');
    cy.visit('/cart');
    cartPrices().should('have.length', 4);
    lineQuantitySelect().should('have.value', '1');

    cartPrices().then($before => {
      const [unitBefore, lineTotalBefore] = [...$before].map(price => amountOf(price.textContent || ''));
      expect(lineTotalBefore, 'line total at quantity 1').to.eq(unitBefore);

      lineQuantitySelect().select('2');
      cy.wait('@updateCart');
      cy.wait('@getCart');
      lineQuantitySelect().should('have.value', '2');

      cartPrices()
        .eq(3)
        .should($total => expect(amountOf($total.text())).to.be.greaterThan(unitBefore * 2));
      cartPrices().then($after => {
        const [unit, lineTotal, shipping, total] = [...$after].map(price => amountOf(price.textContent || ''));

        expect(unit, 'unit price').to.eq(unitBefore);
        expect(lineTotal, 'line total').to.eq(unitBefore * 2);
        expect(total, 'cart total').to.be.closeTo(lineTotal + shipping, 0.005);
      });
    });
  });

  it('should not request a missing product picture from the cart', () => {
    cy.intercept('GET', '/api/cart*', req => {
      delete req.headers['if-none-match'];
      req.continue(res => {
        res.body.items.forEach((item: { product: { picture?: string } }) => delete item.product.picture);
      });
    }).as('getCartWithoutPictures');
    cy.intercept('GET', '/images/products/undefined').as('undefinedImage');

    addToCart('OLJCESPC7Z');
    cy.visit('/cart');
    cy.wait('@getCartWithoutPictures');
    cartPrices().should('have.length', 4);
    cy.contains('main p', 'National Park Foundation Explorascope').should('be.visible');

    getElementByField(CypressFields.CartIcon).click({ force: true });
    getElementByField(CypressFields.CartDropdownItem).should('have.length', 1);

    cy.get('img[src$="/images/products/undefined"]').should('not.exist');
    cy.get('@undefinedImage.all').should('have.length', 0);
  });
});

export {};
