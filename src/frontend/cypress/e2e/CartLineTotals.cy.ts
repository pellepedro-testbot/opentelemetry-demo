// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import {
  cartCell,
  cartRow,
  cartSection,
  createStepChecks,
  emptyStoredCart,
  formatPrice,
  getElementByField,
  parsePrice,
  readStoredSession,
  UUID_PATTERN,
} from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

const PRODUCT_ID = 'OLJCESPC7Z';
const PRODUCT_NAME = 'National Park Foundation Explorascope';

const addProductToCart = (quantity: number) => {
  cy.intercept('POST', '/api/cart*').as('addToCart');
  cy.visit(`/product/${PRODUCT_ID}`);
  getElementByField(CypressFields.ProductName).should('have.text', PRODUCT_NAME);
  getElementByField(CypressFields.ProductQuantity).select(String(quantity));
  getElementByField(CypressFields.ProductAddToCart).click();
  cy.wait('@addToCart');
  cy.location('pathname').should('eq', '/cart');
};

const unitPrice = () => cartCell(PRODUCT_NAME, 'Price').invoke('text').then(parsePrice);

describe('Cart line totals', () => {
  afterEach(() => emptyStoredCart());

  it('shows each line total as unit price times quantity', () => {
    addProductToCart(3);

    unitPrice().then(price => {
      cartCell(PRODUCT_NAME, 'Total').should('have.text', formatPrice('$', price * 3));
    });
  });

  it('updates the cart when a line quantity changes', () => {
    addProductToCart(3);
    unitPrice().as('price');

    cy.intercept('POST', '/api/cart*').as('updateQuantity');
    cy.intercept('GET', '/api/cart*').as('getCart');
    cartRow(PRODUCT_NAME).find('select').select('2');
    cy.wait('@updateQuantity');
    cy.wait('@getCart');

    cy.reload();
    cartRow(PRODUCT_NAME).find('select').should('have.value', '2');
    cy.window().then(win => {
      const { userId } = readStoredSession(win) || {};
      cy.request({ url: '/api/cart', qs: { sessionId: userId, currencyCode: 'USD' } }).then(({ body }) => {
        expect(body.items.map((i: { productId: string; quantity: number }) => [i.productId, i.quantity])).to.deep.eq([
          [PRODUCT_ID, 2],
        ]);
      });
    });
    cy.get<number>('@price').then(price => {
      cartCell(PRODUCT_NAME, 'Total').should('have.text', formatPrice('$', price * 2));
    });
  });

  it('buys a product in a changed quantity and sees the order', () => {
    const checks = createStepChecks();
    let userId: unknown;
    let price = 0;
    let shipping = 0;

    cy.log('Step 1: open the shop home page');
    cy.intercept('POST', '/api/cart*').as('addToCart');
    cy.intercept('GET', '/api/cart*').as('getCart');
    cy.intercept('POST', '/api/checkout*').as('placeOrder');
    cy.visit('/');
    getElementByField(CypressFields.ProductCard).should('have.length.greaterThan', 0);
    getElementByField(CypressFields.ProductCard).each($card => {
      cy.wrap($card)
        .find('div')
        .first()
        .should($image => expect($image.css('background-image')).to.match(/^url\("blob:/));
    });
    cy.window().then(win => {
      const session = readStoredSession(win);
      userId = session?.userId;
      checks.check(1, UUID_PATTERN.test(String(userId)), `stored userId ${String(userId)} is not a uuid`);
      checks.check(1, session?.currencyCode === 'USD', `stored currency is ${String(session?.currencyCode)}`);
    });

    cy.log('Step 2: read the currency switcher');
    getElementByField(CypressFields.CurrencySwitcher)
      .find('option')
      .then($options => {
        const codes = [...$options].map(o => (o as HTMLOptionElement).value);
        checks.check(2, codes.join() === [...codes].sort().join(), `currencies are not sorted: ${codes.join()}`);
        checks.check(2, codes.includes('EUR'), `EUR is not offered: ${codes.join()}`);
      });

    cy.log('Step 3: open the product from its card');
    cy.contains(`[data-cy="${CypressFields.ProductCard}"]`, PRODUCT_NAME).click();
    cy.location('pathname').should('eq', `/product/${PRODUCT_ID}`);
    getElementByField(CypressFields.ProductName).should('have.text', PRODUCT_NAME);
    getElementByField(CypressFields.RecommendationList)
      .find('a')
      .should('have.length.greaterThan', 0)
      .then($links => {
        const hrefs = [...$links].map(a => a.getAttribute('href'));
        checks.check(3, !hrefs.includes(`/product/${PRODUCT_ID}`), `recommendations list the viewed product: ${hrefs}`);
      });
    cy.contains('Customer Reviews').should('not.exist');

    cy.log('Step 4: add three to the cart');
    getElementByField(CypressFields.ProductPrice)
      .first()
      .invoke('text')
      .then(text => {
        price = parsePrice(text);
      });
    getElementByField(CypressFields.ProductQuantity).select('3');
    getElementByField(CypressFields.ProductAddToCart).click();
    cy.wait('@addToCart');
    cy.location('pathname').should('eq', '/cart');
    cartCell(PRODUCT_NAME, 'Price').should($cell => expect(parsePrice($cell.text())).to.eq(price));
    cartCell(PRODUCT_NAME, 'Total')
      .invoke('text')
      .then(text => {
        checks.check(
          4,
          text === formatPrice('$', price * 3),
          `Total shows ${text}, want ${formatPrice('$', price * 3)}`
        );
      });

    cy.log('Step 5: change the line quantity to two');
    cartRow(PRODUCT_NAME).find('select').select('2');
    cy.wait('@addToCart');
    cy.wait('@getCart');
    cartRow(PRODUCT_NAME).find('select').should('have.value', '2');
    cartCell(PRODUCT_NAME, 'Total')
      .invoke('text')
      .then(text => {
        checks.check(
          5,
          text === formatPrice('$', price * 2),
          `Total shows ${text}, want ${formatPrice('$', price * 2)}`
        );
      });

    cy.log('Step 6: reload the cart');
    cy.reload();
    cartRow(PRODUCT_NAME)
      .find('select')
      .then($select => checks.check(6, $select.val() === '2', `quantity shows ${$select.val()} after reload`));
    cy.window().then(win => {
      const session = readStoredSession(win);
      checks.check(6, session?.userId === userId, `userId changed from ${userId} to ${session?.userId}`);
    });
    cartRow(PRODUCT_NAME).should('exist');
    cartSection()
      .children('div')
      .filter(':contains("Shipping")')
      .find(`[data-cy="${CypressFields.ProductPrice}"]`)
      .should($price => expect(parsePrice($price.text()), 'shipping estimate').to.be.greaterThan(0))
      .then($price => {
        shipping = parsePrice($price.text());
      });

    cy.log('Step 7: place the order with the default form');
    getElementByField(CypressFields.CheckoutPlaceOrder).click();
    cy.wait('@placeOrder').its('response.statusCode').should('eq', 200);
    cy.location('pathname').should('match', /^\/cart\/checkout\/[^/]+$/);
    cy.contains('h1', 'Your order is complete!').should('be.visible');
    cy.contains('h5', PRODUCT_NAME).should('be.visible');
    cy.contains('Quantity: 2').should('be.visible');
    cy.get(`img[alt="${PRODUCT_NAME}"]`).should($img =>
      expect(($img[0] as HTMLImageElement).naturalWidth).to.be.greaterThan(0)
    );
    cy.then(() => {
      cy.contains(formatPrice('$', price * 2)).should('be.visible');
      cy.contains(new RegExp(`Shipping:\\s*\\${formatPrice('$', shipping)}`)).should('be.visible');
      cy.contains(new RegExp(`Total:\\s*\\${formatPrice('$', price * 2 + shipping)}`)).should('be.visible');
    });

    checks.assertAll();
  });
});

export {};
