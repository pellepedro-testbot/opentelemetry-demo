// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { getElementByField } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';
import {
  addShownProductToCart,
  CART_LINE,
  cartLine,
  cartLinePrices,
  cartShipping,
  cartTotal,
  interceptStorefrontApi,
  IShownProduct,
  ORDER_ITEM,
  orderShipping,
  orderTotal,
  placeOrder,
  priceValue,
  StepChecks,
} from '../helpers/storefront';

const SHIPPING_PER_ITEM = 8.99;

const openFirstProduct = () => getElementByField(CypressFields.ProductCard).first().click();
const openLastProduct = () => getElementByField(CypressFields.ProductCard).last().click();

describe('Cart totals', () => {
  beforeEach(() => {
    interceptStorefrontApi();
  });

  it('shows three times the unit price as the Total of a line with quantity 3', () => {
    cy.visit('/');
    openFirstProduct();
    addShownProductToCart(3).then(product => {
      cartLinePrices(product.name).then(({ total }) => {
        expect(total, 'line Total').to.be.closeTo(3 * product.price, 0.005);
      });
    });
  });

  it('shows the unit price in the Price column', () => {
    cy.visit('/');
    openFirstProduct();
    addShownProductToCart(3).then(product => {
      cartLinePrices(product.name).then(({ price }) => {
        expect(price, 'line Price').to.be.closeTo(product.price, 0.005);
      });
    });
  });

  it('adds line totals and shipping up to the cart Total', () => {
    const products: IShownProduct[] = [];
    cy.visit('/');
    openFirstProduct();
    addShownProductToCart(3).then(product => products.push(product));
    cy.visit('/');
    openLastProduct();
    addShownProductToCart(1).then(product => products.push(product));
    cy.get(CART_LINE).should('have.length', 2);

    cy.then(() => {
      const lineTotals: number[] = [];
      products.forEach(({ name }) => cartLinePrices(name).then(({ total }) => lineTotals.push(total)));
      cartShipping().then(shipping => {
        cartTotal().then(total => {
          const sum = lineTotals.reduce((acc, value) => acc + value, 0) + shipping;
          expect(total, 'cart Total').to.be.closeTo(sum, 0.005);
        });
      });
    });
  });

  it('adds a product and empties the cart', () => {
    cy.visit('/');
    openFirstProduct();
    addShownProductToCart().then(product => {
      cartLine(product.name).should('be.visible');
    });

    cy.contains('button', 'Empty Cart').click();

    cy.get(CART_LINE).should('have.length', 0);
    getElementByField(CypressFields.CartItemCount).should('not.exist');
  });

  it('buys three of one product and one other, and the order shows what the cart showed', () => {
    const checks = new StepChecks();
    const products: IShownProduct[] = [];
    const cart = { shipping: 0, total: 0 };

    checks.step('Step 1: the storefront loads');
    cy.visit('/');
    getElementByField(CypressFields.ProductCard, getElementByField(CypressFields.ProductList)).should(
      'have.length',
      10
    );
    cy.get('img[data-nimg]').each($img => {
      // A path on the page's own origin: one leading slash, not a protocol-relative "//host".
      checks.check('Step 1 image URLs', () => expect($img.attr('src')).to.match(/^\/[^/]/));
    });
    cy.get('footer *').then($elements => {
      const badges = $elements.filter((_, el) => el.children.length === 0 && el.textContent?.trim() === 'local');
      checks.check('Step 1 platform badge', () => expect(badges.length, 'badge reading local').to.eq(1));
    });

    checks.step('Step 2: open the first product and add three to the cart');
    openFirstProduct();
    getElementByField(CypressFields.ProductPicture).should('exist');
    getElementByField(CypressFields.ProductDescription).should('exist');
    addShownProductToCart(3).then(product => products.push(product));

    checks.step('Step 3: the cart line shows the unit price and three times it');
    cy.then(() => {
      const [first] = products;
      cartLinePrices(first.name).then(({ price, total }) => {
        checks.check('Step 3 line Price', () => expect(price).to.be.closeTo(first.price, 0.005));
        checks.check('Step 3 line Total', () => expect(total).to.be.closeTo(3 * first.price, 0.005));
      });
      cartLine(first.name)
        .find('img')
        .then($img => {
          // "/images/products/<picture>" with a picture name other than "undefined".
          checks.check('Step 3 line image', () =>
            expect($img.attr('src')).to.match(/^\/images\/products\/(?!undefined$).+/)
          );
        });
      cartShipping().then(shipping => {
        checks.check('Step 3 shipping for three items', () =>
          expect(shipping).to.be.closeTo(3 * SHIPPING_PER_ITEM, 0.005)
        );
      });
    });

    checks.step('Step 4: add the last product');
    cy.visit('/');
    openLastProduct();
    addShownProductToCart(1).then(product => products.push(product));
    cy.get(CART_LINE).should('have.length', 2);

    checks.step('Step 5: the line totals and shipping add up to the cart Total');
    cy.then(() => {
      const lineTotals: number[] = [];
      products.forEach(({ name }) => cartLinePrices(name).then(({ total }) => lineTotals.push(total)));
      cartShipping().then(shipping => {
        cart.shipping = shipping;
      });
      cartTotal().then(total => {
        cart.total = total;
        const sum = lineTotals.reduce((acc, value) => acc + value, 0) + cart.shipping;
        checks.check('Step 5 cart Total', () => expect(total).to.be.closeTo(sum, 0.005));
      });
    });

    checks.step('Step 6: place the order');
    placeOrder().then(({ response }) => {
      checks.check('Step 6 order answer', () => expect(response?.statusCode).to.eq(200));
    });
    cy.location('pathname').should('match', /^\/cart\/checkout\/[^/]+$/);

    checks.step('Step 7: the confirmation shows the items, shipping and total of the cart');
    cy.contains('h1', 'Your order is complete!').should('be.visible');
    cy.contains('Order ID:').should('be.visible');
    cy.then(() => {
      const [first, second] = products;
      cy.contains(ORDER_ITEM, first.name).then($item => {
        checks.check('Step 7 first item quantity', () => expect($item.text()).to.contain('Quantity: 3'));
        checks.check('Step 7 first item price', () =>
          expect(priceValue($item.find(`[data-cy="${CypressFields.ProductPrice}"]`).text())).to.be.closeTo(
            3 * first.price,
            0.005
          )
        );
      });
      cy.contains(ORDER_ITEM, second.name).then($item => {
        checks.check('Step 7 second item quantity', () => expect($item.text()).to.contain('Quantity: 1'));
      });
      orderShipping().then(shipping => {
        checks.check('Step 7 order Shipping', () => expect(shipping).to.be.closeTo(cart.shipping, 0.005));
      });
      orderTotal().then(total => {
        checks.check('Step 7 order Total', () => expect(total).to.be.closeTo(cart.total, 0.005));
      });
    });

    checks.assertAll();
  });
});

export {};
