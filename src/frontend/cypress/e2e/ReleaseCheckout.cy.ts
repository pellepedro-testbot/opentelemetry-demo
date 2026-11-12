// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { getElementByField, setFlag } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

const DECLINE_MESSAGE = 'Your payment could not be processed. Please check your card details and try again.';

const step = (title: string) => cy.log(`**${title}**`);

const placeOrderButton = () => cy.contains('button', 'Place Order');

const goHomeThroughHeader = () => {
  cy.get('header a[href="/"]').click();
  cy.location('pathname').should('eq', '/');
};

const addProductFromHome = (productName: string, expectedCount: string, openHome = () => cy.visit('/')) => {
  openHome();
  cy.contains(`[data-cy="${CypressFields.ProductCard}"]`, productName).click();
  getElementByField(CypressFields.ProductDetail).should('be.visible');
  getElementByField(CypressFields.ProductAddToCart).click();
  cy.location('pathname').should('eq', '/cart');
  getElementByField(CypressFields.CartItemCount).should('contain', expectedCount);
};

describe('Release checkout journeys', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/checkout*').as('placeOrder');
  });

  it('buys two products and sees them on the order confirmation', () => {
    const consoleErrors: string[] = [];

    step('1. Open the shop home page');
    cy.visit('/', {
      onBeforeLoad(win) {
        const original = win.console.error.bind(win.console);
        win.console.error = (...args: unknown[]) => {
          consoleErrors.push(args.map(String).join(' '));
          original(...args);
        };
      },
    });
    getElementByField(CypressFields.ProductList).should('be.visible');
    cy.window().then(win => {
      const platform = (win as unknown as { ENV: { NEXT_PUBLIC_PLATFORM: string } }).ENV.NEXT_PUBLIC_PLATFORM;
      expect(platform).to.eq('local');
      cy.get('footer')
        .contains(new RegExp(`^${platform}$`))
        .should('be.visible');
    });
    cy.wrap(consoleErrors).should(errors => {
      expect(errors.filter(e => /hydrat|#418|#423|#425/i.test(e))).to.be.empty;
    });

    step('2. Open Roof Binoculars');
    cy.contains(`[data-cy="${CypressFields.ProductCard}"]`, 'Roof Binoculars').click();
    getElementByField(CypressFields.ProductDetail).should('be.visible');
    getElementByField(CypressFields.ProductAddToCart)
      .find('img[alt="cart"]')
      .should('have.attr', 'src', '/icons/Cart.svg?w=32&q=75')
      .and($img => {
        expect(($img[0] as HTMLImageElement).naturalWidth).to.be.greaterThan(0);
      });

    step('3. Add it to the cart');
    getElementByField(CypressFields.ProductAddToCart).click();
    cy.location('pathname').should('eq', '/cart');
    getElementByField(CypressFields.CartItemCount).should('contain', '1');

    step('4. Add National Park Foundation Explorascope');
    addProductFromHome('National Park Foundation Explorascope', '2', goHomeThroughHeader);
    placeOrderButton().should('be.visible');

    step('5. Place the order');
    placeOrderButton().click();
    cy.wait('@placeOrder').then(({ response }) => {
      expect(response?.statusCode).to.eq(200);
      cy.location('pathname').should('eq', `/cart/checkout/${response?.body.orderId}`);
    });

    step('6. Read the confirmation');
    cy.contains('Your order is complete!').should('be.visible');
    getElementByField(CypressFields.CheckoutItem).should('have.length', 2);
    cy.contains(`[data-cy="${CypressFields.CheckoutItem}"]`, 'Roof Binoculars').should('be.visible');
    cy.contains(`[data-cy="${CypressFields.CheckoutItem}"]`, 'National Park Foundation Explorascope').should(
      'be.visible'
    );

    step('7. Continue shopping, then open the cart');
    cy.contains('button', 'Continue Shopping').click();
    cy.location('pathname').should('eq', '/');
    getElementByField(CypressFields.CartIcon).click();
    getElementByField(CypressFields.CartGoToShopping).click();
    cy.location('pathname').should('eq', '/cart');
    cy.contains('Your shopping cart is empty!').should('be.visible');
    cy.reload();
    cy.contains('Your shopping cart is empty!').should('be.visible');
    getElementByField(CypressFields.CartItemCount).should('not.exist');
  });

  describe('while payments are declined', () => {
    before(() => setFlag('paymentFailure', '100%'));
    after(() => setFlag('paymentFailure', 'off'));

    it('stays on the cart when payment is declined and completes the order on retry', () => {
      cy.on('uncaught:exception', err => !err.message.includes(DECLINE_MESSAGE));

      step('1. Add Roof Binoculars to the cart');
      addProductFromHome('Roof Binoculars', '1');

      step('2. Place the order while payments are declined');
      placeOrderButton().click();
      cy.wait('@placeOrder').then(({ response }) => {
        expect(response?.statusCode).to.eq(422);
        expect(response?.body).to.deep.eq({ code: 'PAYMENT_FAILED', error: DECLINE_MESSAGE });
      });
      cy.wait(2000);
      cy.location('pathname').should('eq', '/cart');
      placeOrderButton().should('be.visible');
      getElementByField(CypressFields.CartItemCount).should('contain', '1');

      step('3. Retry after payments recover');
      setFlag('paymentFailure', 'off');
      cy.wait(3000);
      placeOrderButton().click();
      cy.wait('@placeOrder').its('response.statusCode').should('eq', 200);
      cy.contains('Your order is complete!').should('be.visible');
      getElementByField(CypressFields.CheckoutItem).should('have.length', 1);
      cy.contains(`[data-cy="${CypressFields.CheckoutItem}"]`, 'Roof Binoculars').should('be.visible');
    });
  });

  it('empties the cart', () => {
    step('1. Add Roof Binoculars to the cart');
    addProductFromHome('Roof Binoculars', '1');

    step('2. Empty the cart');
    cy.contains('button', 'Empty Cart').click();
    cy.contains('Your shopping cart is empty!').should('be.visible');
    getElementByField(CypressFields.CartItemCount).should('not.exist');

    step('3. Reload the cart');
    cy.reload();
    cy.contains('Your shopping cart is empty!').should('be.visible');
    getElementByField(CypressFields.CartItemCount).should('not.exist');
  });
});

export {};
