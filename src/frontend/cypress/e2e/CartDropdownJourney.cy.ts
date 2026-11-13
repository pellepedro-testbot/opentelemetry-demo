// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import {
  formatPrice,
  getCartFromApi,
  getCartLine,
  getElementByField,
  getStoredSession,
  startJourney,
  toNanos,
} from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

const PRODUCT = 'Eclipsmart Travel Refractor Telescope';

describe('Cart dropdown journey', () => {
  it('uses the cart dropdown, then empties the cart', () => {
    const journey = startJourney();
    cy.intercept('POST', '/api/cart*').as('addToCart');
    cy.intercept('DELETE', '/api/cart*').as('emptyCart');

    journey.step('1. / - add a product, come back home and open the cart dropdown', () => {
      cy.visit('/');
      cy.contains(`[data-cy="${CypressFields.ProductCard}"]`, PRODUCT).click();
      getElementByField(CypressFields.ProductName).should('have.text', PRODUCT);
      getElementByField(CypressFields.ProductAddToCart).click();
      cy.wait('@addToCart');
      cy.location('pathname').should('eq', '/cart');
      cy.get('header a[href="/"]').click();
      cy.location('pathname').should('eq', '/');
      getElementByField(CypressFields.CartIcon).click({ force: true });

      getElementByField(CypressFields.CartDropdownItem)
        .should('have.length', 1)
        .and('contain', PRODUCT)
        .and('contain', 'Quantity: 1')
        .find('img')
        .should('have.attr', 'loading', 'lazy')
        .and('have.attr', 'src')
        .and('match', /^\/images\/products\/[^?]+\?w=\d+&q=75$/);
      getElementByField(CypressFields.CartDropdownItem)
        .find('img')
        .should(img => {
          expect((img[0] as HTMLImageElement).naturalWidth).to.be.greaterThan(0);
        });
    });

    journey.step('2. / - go to the shopping cart', () => {
      getElementByField(CypressFields.CartGoToShopping).click();
      cy.location('pathname').should('eq', '/cart');
      getStoredSession().then(({ userId }) =>
        getCartFromApi(userId).then(
          (cart: { items: { product: { priceUsd: { units: number; nanos: number } } }[] }) => {
            const price = formatPrice(toNanos(cart.items[0].product.priceUsd), '$');
            getCartLine(PRODUCT)
              .find(`[data-cy="${CypressFields.ProductPrice}"]`)
              .should('have.length', 2)
              .then(cells => {
                journey.check('line Price', cells.eq(0).text(), price);
                journey.check('line Total', cells.eq(1).text(), price);
              });
          }
        )
      );
    });

    journey.step('3. /cart - empty the cart', () => {
      cy.contains('button', 'Empty Cart').click();
      cy.wait('@emptyCart').its('response.statusCode').should('eq', 204);
      cy.contains('Your shopping cart is empty!').should('be.visible');
      getElementByField(CypressFields.CartItemCount).should('not.exist');
    });

    journey.step('outcome - the emptied cart stays empty after a reload', () => {
      cy.reload();
      cy.contains('Your shopping cart is empty!').should('be.visible');
      getStoredSession().then(({ userId }) => getCartFromApi(userId).its('items').should('deep.equal', []));
    });

    journey.assertNoFailedChecks();
  });
});

export {};
