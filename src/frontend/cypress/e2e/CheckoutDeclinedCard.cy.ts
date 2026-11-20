// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { addProductToCart, cartLine, serverCart, sessionUserId, setFlag } from '../helpers/demo';
import { getElementByField } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

const DECLINED_MESSAGE = 'Your payment could not be processed. Please check your card details and try again.';
const VALID_CARD = '4432-8015-6152-0454';
// The card field only accepts the 0000-0000-0000-0000 shape, so the declined card is one
// in that shape that fails the payment service's card validation.
const INVALID_CARD = '1234-5678-9012-3456';

// A refused order makes the storefront's request helper reject (Request.ts throws on !response.ok);
// that rejection is the expected outcome here, not a test failure.
const allowRejectedOrder = (messages: string[]) => {
  cy.on('uncaught:exception', err => !messages.some(m => err.message.includes(m)));
};

const placeOrderWithCard = (cardNumber: string) => {
  cy.get('#credit_card_number').clear().type(cardNumber);
  getElementByField(CypressFields.CheckoutPlaceOrder).click();
  return cy.wait('@placeOrder');
};

describe('Checkout with a declined card', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/checkout*').as('placeOrder');
    allowRejectedOrder([DECLINED_MESSAGE, 'Failed to place order.']);
    cy.visit('/');
  });

  it('pays with a declined card, then fixes the card and places the order', () => {
    cy.log('step 1: open the first product');
    cy.intercept('POST', '/api/cart*').as('addToCart');
    getElementByField(CypressFields.ProductCard).first().click();
    cy.location('pathname').should('match', /^\/product\/\w+$/);
    getElementByField(CypressFields.ProductDetail).should('be.visible');

    cy.log('step 2: add it to the cart; the request carries enduser.id = session.id baggage');
    getElementByField(CypressFields.ProductAddToCart).click();
    cy.wait('@addToCart').then(({ request }) => {
      sessionUserId().then(userId => {
        getElementByField(CypressFields.SessionId).should('contain', userId);
        const baggage = String(request.headers.baggage || '');
        expect(baggage, 'baggage header').to.contain(`session.id=${userId}`);
        expect(baggage, 'baggage header').to.contain(`enduser.id=${userId}`);
      });
    });
    cy.location('pathname').should('eq', '/cart');

    cy.log('step 3: a declined card keeps the shopper on /cart with the product');
    placeOrderWithCard(INVALID_CARD).its('response.statusCode').should('eq', 422);
    cy.wait(1000);
    cy.location('pathname').should('eq', '/cart');
    cy.get('main [class*="CartItems-styled__CartItem-"]').should('have.length', 1);
    getElementByField(CypressFields.CartItemCount).should('contain', '1');

    cy.log('step 4: a valid card places the order');
    placeOrderWithCard(VALID_CARD).then(({ response }) => {
      expect(response?.statusCode).to.eq(200);
      const orderId = response?.body.orderId;
      cy.location('pathname').should('eq', `/cart/checkout/${orderId}`);
      cy.contains('h1, h2, h3, p', 'Your order is complete!').should('be.visible');
      cy.contains('Order ID:').should('be.visible');
      cy.contains(orderId).should('be.visible');
    });
    getElementByField(CypressFields.CartItemCount).should('not.exist');
  });

  it('keeps the product in the cart after a declined card', () => {
    addProductToCart().then(productId => {
      placeOrderWithCard(INVALID_CARD).its('response.statusCode').should('eq', 422);
      cartLine(productId).should('have.length', 1);
      sessionUserId().then(userId =>
        serverCart(userId).its('items').should('have.length', 1).its(0).its('productId').should('eq', productId)
      );
    });
  });

  it('stays on /cart and does not open a checkout page when the card is declined', () => {
    addProductToCart();
    placeOrderWithCard(INVALID_CARD)
      .its('response.body')
      .should('deep.equal', { error: DECLINED_MESSAGE, code: 'PAYMENT_FAILED' });
    cy.wait(2000);
    cy.location('pathname').should('eq', '/cart');
    cy.location('pathname').should('not.contain', '/cart/checkout/');
  });

  it('places the order with a valid card after a declined one', () => {
    addProductToCart().then(productId => {
      placeOrderWithCard(INVALID_CARD).its('response.statusCode').should('eq', 422);
      placeOrderWithCard(VALID_CARD).then(({ response }) => {
        expect(response?.statusCode).to.eq(200);
        const orderId = response?.body.orderId;
        expect(response?.body.items.map((i: { item: { productId: string } }) => i.item.productId)).to.deep.equal([
          productId,
        ]);
        cy.location('pathname').should('eq', `/cart/checkout/${orderId}`);
        cy.contains('Your order is complete!').should('be.visible');
        cy.contains(orderId).should('be.visible');
      });
    });
  });

  it('opens /cart/checkout/<orderId> with the order id from the checkout answer', () => {
    addProductToCart();
    getElementByField(CypressFields.CheckoutPlaceOrder).click();
    cy.wait('@placeOrder').then(({ response }) => {
      expect(response?.statusCode).to.eq(200);
      const orderId = response?.body.orderId;
      expect(orderId).to.be.a('string').and.have.length.above(0);
      cy.location('pathname').should('eq', `/cart/checkout/${orderId}`);
      cy.contains('Order ID:').should('be.visible');
      cy.contains(orderId).should('be.visible');
    });
  });

  it('sends enduser.id baggage equal to session.id on storefront API requests', () => {
    cy.intercept('GET', '/api/products*').as('apiGet');
    cy.visit('/');
    cy.wait('@apiGet').then(({ request }) => {
      sessionUserId().then(userId => {
        expect(userId).to.be.a('string').and.have.length.above(0);
        const baggage = String(request.headers.baggage || '');
        expect(baggage, `baggage of ${request.url}`).to.contain(`session.id=${userId}`);
        expect(baggage, `baggage of ${request.url}`).to.contain(`enduser.id=${userId}`);
      });
    });
    addProductToCart();
    cy.get('@addToCart').then(intercepted => {
      const { request } = intercepted as unknown as { request: { headers: Record<string, string> } };
      sessionUserId().then(userId => {
        expect(String(request.headers.baggage || '')).to.contain(`enduser.id=${userId}`);
        expect(String(request.headers.baggage || '')).to.contain(`session.id=${userId}`);
      });
    });
  });
});

describe('Checkout while payment is unreachable', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/checkout*').as('placeOrder');
    allowRejectedOrder(['Failed to place order.']);
    setFlag('paymentUnreachable', 'on');
  });

  afterEach(() => {
    setFlag('paymentUnreachable', 'off');
  });

  it('places an order while payment is unreachable', () => {
    cy.log('step 1: open a product and add it to the cart');
    cy.visit('/');
    addProductToCart().then(productId => {
      cartLine(productId).should('have.length', 1);

      cy.log('step 2: place the order with the prefilled valid card');
      getElementByField(CypressFields.CheckoutPlaceOrder).click();
      cy.wait('@placeOrder').then(({ response }) => {
        expect(response?.statusCode).to.eq(500);
        expect(response?.body).to.deep.equal({ error: 'Failed to place order.' });
      });
      cy.wait(1000);
      cy.location('pathname').should('eq', '/cart');
      cartLine(productId).should('have.length', 1);
      sessionUserId().then(userId => serverCart(userId).its('items').should('have.length', 1));
    });
  });

  it('answers 500 and stays on /cart when payment is unreachable', () => {
    cy.visit('/');
    addProductToCart();
    getElementByField(CypressFields.CheckoutPlaceOrder).click();
    cy.wait('@placeOrder').its('response.statusCode').should('eq', 500);
    cy.wait(2000);
    cy.location('pathname').should('eq', '/cart');
  });
});

export {};
