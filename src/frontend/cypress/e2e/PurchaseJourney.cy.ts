// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import {
  assertFooterShowsSession,
  formatPrice,
  getCartFromApi,
  getCartLine,
  getCartSummaryRow,
  getElementByField,
  getOrderItem,
  getOrderSummaryRow,
  getShippingQuote,
  getStoredSession,
  startJourney,
  toNanos,
} from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

const PRODUCT = 'Solar System Color Imager';

interface IMoney {
  units: number;
  nanos: number;
}

interface ICartItem {
  productId: string;
  quantity: number;
  product: { priceUsd: IMoney };
}

describe('Purchase journey', () => {
  it('buys several units of a product and sees the order confirmation', () => {
    const journey = startJourney();
    const seen: { sessionId?: string; price?: number; items?: ICartItem[] } = {};
    cy.intercept('POST', '/api/cart*').as('updateCart');
    cy.intercept('POST', '/api/checkout*').as('placeOrder');

    journey.step('1. / - product list', () => {
      cy.visit('/');
      getElementByField(CypressFields.ProductCard, getElementByField(CypressFields.ProductList))
        .should('have.length', 10)
        .each(card => {
          cy.wrap(card)
            .find(`[data-cy="${CypressFields.ProductPrice}"]`)
            .invoke('text')
            .should('match', /^\$ \d+\.\d{2}$/);
          cy.wrap(card)
            .find('div')
            .should($divs => {
              expect([...$divs].some(div => /^url\("blob:/.test(Cypress.$(div).css('background-image')))).to.be.true;
            });
        });
      assertFooterShowsSession();
      getStoredSession().then(({ userId }) => {
        seen.sessionId = userId;
      });
      cy.contains(`[data-cy="${CypressFields.ProductCard}"]`, PRODUCT).click();
    });

    journey.step('2. /product/:productId - add quantity 1 to the cart', () => {
      getElementByField(CypressFields.ProductName).should('have.text', PRODUCT);
      assertFooterShowsSession();
      getElementByField(CypressFields.ProductQuantity).select('1');
      getElementByField(CypressFields.ProductAddToCart).click();
      cy.location('pathname').should('eq', '/cart');
      getCartLine(PRODUCT).should('have.length', 1).find('select').should('have.value', '1');
    });

    journey.step('3. /cart - change the line quantity to 3', () => {
      getCartLine(PRODUCT).find('select').select('3');
      cy.wait('@updateCart');
      getCartLine(PRODUCT).find('select').should('have.value', '3');
      getStoredSession().then(({ userId }) =>
        getCartFromApi(userId).then((cart: { items: ICartItem[] }) => {
          seen.items = cart.items;
          seen.price = toNanos(cart.items[0].product.priceUsd);
        })
      );
      getCartLine(PRODUCT)
        .find(`[data-cy="${CypressFields.ProductPrice}"]`)
        .should('have.length', 2)
        .then(cells => {
          journey.check('line Price', cells.eq(0).text(), formatPrice(seen.price!, '$'));
          journey.check('line Total', cells.eq(1).text(), formatPrice(3 * seen.price!, '$'));
        });
    });

    journey.step('4. /cart - reload', () => {
      cy.reload();
      getCartLine(PRODUCT).find('select').should('have.value', '3');
      getStoredSession().then(({ userId }) => expect(userId).to.eq(seen.sessionId));
      assertFooterShowsSession();
    });

    journey.step('5. /cart - order summary', () => {
      cy.then(() => getShippingQuote(seen.items!)).then((shipping: IMoney) => {
        getCartSummaryRow('Shipping').should('contain', formatPrice(toNanos(shipping), '$'));
        getCartSummaryRow('Total').should('contain', formatPrice(3 * seen.price! + toNanos(shipping), '$'));
      });
    });

    journey.step('6. /cart - place the order', () => {
      getElementByField(CypressFields.CheckoutPlaceOrder).click();
      cy.wait('@placeOrder').its('response.statusCode').should('eq', 200);
      cy.location('pathname').should('match', /^\/cart\/checkout\/.+/);
    });

    const assertConfirmation = () =>
      cy.get('@placeOrder').then(intercept => {
        const order = (
          intercept as unknown as {
            response: { body: { orderId: string; shippingCost: IMoney; items: { cost: IMoney }[] } };
          }
        ).response.body;
        const lineTotal = 3 * toNanos(order.items[0].cost);
        cy.location('pathname').should('eq', `/cart/checkout/${order.orderId}`);
        cy.contains('h1', 'Your order is complete!').should('be.visible');
        cy.contains(order.orderId).should('be.visible');
        cy.contains('p', '1600 Amphitheatre Parkway').should('be.visible');
        cy.contains('p', 'Mountain View, CA 94043').should('be.visible');
        getOrderItem(PRODUCT, 3, formatPrice(lineTotal, '$')).should('exist');
        getOrderSummaryRow('Shipping:').should('contain', formatPrice(toNanos(order.shippingCost), '$'));
        getOrderSummaryRow('Total:').should('contain', formatPrice(lineTotal + toNanos(order.shippingCost), '$'));
        assertFooterShowsSession();
      });

    journey.step('7. /cart/checkout/:orderId - confirmation', assertConfirmation);

    journey.step('outcome - after a reload the confirmation stays and the cart is empty', () => {
      cy.reload();
      assertConfirmation();
      getElementByField(CypressFields.CartItemCount).should('not.exist');
      getElementByField(CypressFields.CartIcon).click({ force: true });
      getElementByField(CypressFields.CartDropdown).should('contain', 'Your shopping cart is empty');
      getElementByField(CypressFields.CartDropdownItem).should('not.exist');
    });

    journey.assertNoFailedChecks();
  });
});

export {};
