// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { getElementByField } from '../../utils/Cypress';
import { Journey } from '../../utils/CypressJourney';
import {
  cartLine,
  formatUsd,
  priceCents,
  productCardNamed,
  readCartLine,
  readLabelledValue,
} from '../../utils/CypressStorefront';
import { CypressFields } from '../../utils/enums/CypressFields';

const PRODUCT_ID = '0PUK6V6EV0';
const PRODUCT_NAME = 'Solar System Color Imager';

const recommendedNames = ($body: JQuery<HTMLElement>) =>
  $body
    .find(`[data-cy="${CypressFields.RecommendationList}"] [data-cy="${CypressFields.ProductCard}"]`)
    .map((_, el) => Cypress.$(el).text())
    .get();

const addToCartWithQuantity = (quantity: string) => {
  cy.intercept('GET', '/api/cart*').as('getCart');
  cy.visit('/');
  productCardNamed(PRODUCT_NAME).click();
  getElementByField(CypressFields.ProductName).should('have.text', PRODUCT_NAME);
  getElementByField(CypressFields.ProductQuantity).select(quantity);
  getElementByField(CypressFields.ProductAddToCart).click();
  cy.location('pathname').should('eq', '/cart');
  cy.wait('@getCart');
};

describe('Cart totals', () => {
  it('shows each cart line total as unit price times quantity', () => {
    addToCartWithQuantity('3');

    cartLine(PRODUCT_ID).find('select').should('have.value', '3');
    cy.document().should(doc => {
      expect(readCartLine(Cypress.$(doc.body), PRODUCT_ID)).to.deep.include({ price: '$ 175.00', total: '$ 525.00' });
    });

    cartLine(PRODUCT_ID).find('select').select('2');
    cy.document().should(doc => {
      expect(readCartLine(Cypress.$(doc.body), PRODUCT_ID)).to.deep.include({ price: '$ 175.00', total: '$ 350.00' });
    });
  });

  it('buys a product and sees the line totals, shipping and the order confirmation', () => {
    const journey = new Journey();
    let cartShipping = '';

    journey.step('1. open the storefront', () => {
      cy.visit('/');
      getElementByField(CypressFields.ProductList).should('be.visible');
      journey.expectSoon(
        'platform badge in the footer reads local',
        $body => $body.find('footer').text(),
        text => text.includes('local')
      );
    });

    journey.step('2. open the Solar System Color Imager', () => {
      cy.intercept('GET', '/api/recommendations*').as('getRecommendations');
      productCardNamed(PRODUCT_NAME).click();
      getElementByField(CypressFields.ProductName).should('have.text', PRODUCT_NAME);
      cy.wait('@getRecommendations');
      journey.expectSoon(
        'recommendations do not list the product being viewed',
        recommendedNames,
        names => names.length > 0 && names.every(name => !name.includes(PRODUCT_NAME))
      );
    });

    journey.step('3. add three to the cart', () => {
      cy.intercept('GET', '/api/cart*').as('getCart');
      getElementByField(CypressFields.ProductQuantity).select('3');
      getElementByField(CypressFields.ProductAddToCart).click();
      cy.location('pathname').should('eq', '/cart');
      cy.contains('h1', 'Shopping Cart').should('be.visible');
      cy.wait('@getCart');
    });

    journey.step('4. read the line price, line total and shipping', () => {
      cartLine(PRODUCT_ID).should('be.visible');
      journey.expectSoon(
        'line price $ 175.00 and line total $ 525.00',
        $body => readCartLine($body, PRODUCT_ID),
        line => line.price === '$ 175.00' && line.total === '$ 525.00'
      );
      journey.expectSoon(
        'shipping for three items is $ 26.97',
        $body => readLabelledValue($body, 'Shipping'),
        shipping => shipping === '$ 26.97'
      );
    });

    journey.step('5. change the quantity to two', () => {
      cartLine(PRODUCT_ID).find('select').select('2');
      journey.expectSoon(
        'line total $ 350.00 after the quantity change',
        $body => readCartLine($body, PRODUCT_ID).total,
        total => total === '$ 350.00'
      );
      journey
        .expectSoon(
          'cart total is the line total plus the shipping shown',
          $body => ({ shipping: readLabelledValue($body, 'Shipping'), total: readLabelledValue($body, 'Total') }),
          ({ shipping, total }) => shipping !== '' && total === formatUsd(35000 + priceCents(shipping))
        )
        .then(({ shipping }) => {
          cartShipping = shipping;
        });
    });

    journey.step('6. place the order', () => {
      cy.intercept('POST', '/api/checkout*').as('placeOrder');
      getElementByField(CypressFields.CheckoutPlaceOrder).click();
      cy.wait('@placeOrder');
      // The confirmation page is /cart/checkout/<order id>.
      cy.location('pathname').should('match', /^\/cart\/checkout\/[^/]+$/);
      cy.contains('h1', 'Your order is complete!').should('be.visible');
    });

    journey.step('7. read the order confirmation', () => {
      journey.expectSoon(
        'confirmation lists the product, quantity 2 and $ 350.00',
        $body => $body.find('main').text(),
        text => text.includes(PRODUCT_NAME) && text.includes('Quantity: 2') && text.includes('$ 350.00')
      );
      journey.expectSoon(
        'confirmation shipping equals the cart page shipping',
        $body => ({ confirmation: readLabelledValue($body, 'Shipping:'), cart: cartShipping }),
        ({ confirmation, cart }) => confirmation !== '' && confirmation === cart
      );
      journey.expectSoon(
        'You May Also Like does not list the ordered product',
        recommendedNames,
        names => names.length > 0 && names.every(name => !name.includes(PRODUCT_NAME))
      );
    });

    journey.step('8. open the cart again', () => {
      getElementByField(CypressFields.CartIcon).click({ force: true });
      getElementByField(CypressFields.CartGoToShopping).click();
      cy.location('pathname').should('eq', '/cart');
      cy.contains('Your shopping cart is empty!').should('be.visible');
      cy.reload();
      cy.contains('Your shopping cart is empty!').should('be.visible');
    });

    journey.finish();
  });
});

export {};
