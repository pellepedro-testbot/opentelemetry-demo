// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { createStepChecks, getCurrencyCodes, getElementByField, getProductCardByName } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

// A product picture path: /images/products/ followed by one .jpg file name, with an optional
// query string for the image size.
const PRODUCT_PICTURE_PATH = /^\/images\/products\/[^/?]+\.jpg(\?.*)?$/;

const FIRST_PRODUCT = 'Solar System Color Imager';
const LAST_PRODUCT = 'National Park Foundation Explorascope';

// The cart line's quantity select is the only unnamed select in the page; the checkout
// form's selects are named after their fields.
const cartLineQuantitySelect = () => cy.get('main select:not([name])');

const expectLoadedPicture = ($img: JQuery<HTMLElement>) => {
  expect($img.attr('src')).to.match(PRODUCT_PICTURE_PATH);
  expect(($img[0] as HTMLImageElement).naturalWidth).to.be.greaterThan(0);
};

describe('Checkout Flow', () => {
  before(() => {
    cy.intercept('POST', '/api/cart*').as('addToCart');
    cy.intercept('GET', '/api/cart*').as('getCart');
    cy.intercept('POST', '/api/checkout*').as('placeOrder');
  });

  beforeEach(() => {
    cy.visit('/');
  });

  it('should create an order with two items', () => {
    getElementByField(CypressFields.ProductCard).first().click();
    getElementByField(CypressFields.ProductAddToCart).click();

    cy.wait('@addToCart');
    cy.wait('@getCart', { timeout: 10000 });
    cy.wait(2000);

    cy.location('href').should('match', /\/cart$/);
    getElementByField(CypressFields.CartItemCount).should('contain', '1');

    cy.visit('/');

    getElementByField(CypressFields.ProductCard).last().click();
    getElementByField(CypressFields.ProductAddToCart).click();

    cy.wait('@addToCart');
    cy.wait('@getCart', { timeout: 10000 });
    cy.wait(2000);

    cy.location('href').should('match', /\/cart$/);
    getElementByField(CypressFields.CartItemCount).should('contain', '2');

    getElementByField(CypressFields.CartIcon).click({ force: true });
    getElementByField(CypressFields.CartGoToShopping).click();

    cy.location('href').should('match', /\/cart$/);

    getElementByField(CypressFields.CheckoutPlaceOrder).click();

    cy.wait('@placeOrder');

    cy.location('href').should('match', /\/checkout/);
    getElementByField(CypressFields.CheckoutItem).should('have.length', 2);
  });

  it('should buy two products and show them on the order confirmation', () => {
    const checks = createStepChecks();
    const imageRequests: { url: string; status: number }[] = [];
    cy.intercept('GET', '/images/products/*', req => {
      req.continue(res => {
        imageRequests.push({ url: req.url, status: res.statusCode });
      });
    });
    cy.intercept('GET', '/api/products/*', req => {
      delete req.headers['if-none-match'];
    }).as('getProduct');
    cy.intercept('GET', '/api/recommendations*').as('getRecommendations');
    cy.intercept('POST', '/api/cart*').as('updateCart');
    cy.intercept('GET', '/api/cart*').as('getCart');
    cy.intercept('POST', '/api/checkout*').as('placeOrder');

    cy.log('Step 1: open the storefront');
    getElementByField(CypressFields.ProductCard, getElementByField(CypressFields.ProductList)).should(
      'have.length',
      10
    );
    cy.window().then(win => {
      const { userId } = JSON.parse(win.localStorage.getItem('session') as string);
      getElementByField(CypressFields.SessionId).should('have.text', `session-id: ${userId}`);
    });
    getElementByField(CypressFields.CurrencySwitcher)
      .should($select => expect(getCurrencyCodes($select)).to.have.length.greaterThan(1))
      .then($select => {
        const values = getCurrencyCodes($select);
        checks.check('step 1: currencies in alphabetical order', () => expect(values).to.deep.eq([...values].sort()));
      });

    cy.log('Step 2: open the first product and add it to the cart');
    getProductCardByName(FIRST_PRODUCT).click();
    cy.wait('@getProduct').then(({ response }) => {
      const { name, picture } = response?.body;

      getElementByField(CypressFields.ProductPicture)
        .should('be.visible')
        .and($picture => expect($picture.css('background-image')).to.contain(`/images/products/${picture}`));
      getElementByField(CypressFields.ProductName).should('have.text', name);
      cy.wait('@getRecommendations');
      getElementByField(CypressFields.ProductCard, getElementByField(CypressFields.RecommendationList))
        .should('have.length', 4)
        .then($cards => {
          checks.check('step 2: recommendations leave out the viewed product', () =>
            expect($cards.text()).not.to.contain(name)
          );
        });
    });
    getElementByField(CypressFields.ProductAddToCart).click();
    cy.wait('@updateCart');
    cy.location('pathname').should('eq', '/cart');
    getElementByField(CypressFields.CartItemCount).should('contain', '1');

    cy.log('Step 3: set the quantity to 3 on the cart page');
    cartLineQuantitySelect().select('3');
    cy.wait('@updateCart');
    cy.wait('@getCart');
    cartLineQuantitySelect().should('have.value', '3');
    cy.get(`[alt="${FIRST_PRODUCT}"]`)
      .should('have.attr', 'src', '/images/products/SolarSystemColorImager.jpg')
      .and($img => expect(($img[0] as HTMLImageElement).naturalWidth).to.be.greaterThan(0));
    getElementByField(CypressFields.ProductPrice)
      .not(`[data-cy="${CypressFields.RecommendationList}"] [data-cy="${CypressFields.ProductPrice}"]`)
      .should('have.length', 4)
      .and($prices => {
        const [, , , total] = [...$prices].map(price => Number(price.textContent?.replace('$ ', '')));
        expect(total).to.be.greaterThan(525);
      })
      .then($prices => {
        const [unit, lineTotal, shipping, total] = [...$prices].map(price => price.textContent);
        checks.check('step 3: unit price', () => expect(unit).to.eq('$ 175.00'));
        checks.check('step 3: line total', () => expect(lineTotal).to.eq('$ 525.00'));
        checks.check('step 3: cart total', () =>
          expect(total).to.eq(`$ ${(525 + Number(shipping?.replace('$ ', ''))).toFixed(2)}`)
        );
      });

    cy.log('Step 4: add the last product from the home page');
    cy.visit('/');
    getProductCardByName(LAST_PRODUCT).click();
    getElementByField(CypressFields.ProductAddToCart).click();
    cy.wait('@updateCart');
    cy.location('pathname').should('eq', '/cart');
    getElementByField(CypressFields.CartItemCount).should('be.visible');
    cy.wait(2000);
    getElementByField(CypressFields.CartIcon).click({ force: true });
    getElementByField(CypressFields.CartDropdownItem).should('have.length', 2);
    [FIRST_PRODUCT, LAST_PRODUCT].forEach(name => {
      getElementByField(CypressFields.CartDropdown).find(`[alt="${name}"]`).should(expectLoadedPicture);
    });

    cy.log('Step 5: place the order');
    getElementByField(CypressFields.CartGoToShopping).click();
    cy.location('pathname').should('eq', '/cart');
    getElementByField(CypressFields.CheckoutPlaceOrder).click();
    cy.wait('@placeOrder').then(({ response }) => {
      const { orderId } = response?.body;

      cy.location('pathname').should('eq', `/cart/checkout/${orderId}`);

      cy.log('Step 6: read the order confirmation');
      cy.contains('Your order is complete!').should('be.visible');
      cy.contains(orderId).should('be.visible');
    });
    getElementByField(CypressFields.CheckoutItem).should('have.length', 2);
    cy.contains(`[data-cy="${CypressFields.CheckoutItem}"]`, FIRST_PRODUCT)
      .should('contain', 'Quantity: 3')
      .and('contain', '$ 525.00');
    cy.contains(`[data-cy="${CypressFields.CheckoutItem}"]`, LAST_PRODUCT)
      .should('contain', 'Quantity: 1')
      .and('contain', '$ 101.96');
    cy.contains('Shipping:').should('be.visible');
    cy.contains('Total:').should('be.visible');
    [FIRST_PRODUCT, LAST_PRODUCT].forEach(name => {
      cy.contains(`[data-cy="${CypressFields.CheckoutItem}"]`, name)
        .find(`[alt="${name}"]`)
        .should(expectLoadedPicture);
    });
    cy.then(() => {
      checks.check(
        'step 6: product images loaded',
        () =>
          expect(
            imageRequests.filter(({ url, status }) => status >= 400 && !url.endsWith('/images/products/undefined'))
          ).to.be.empty
      );
      checks.check(
        'step 6: no request for /images/products/undefined',
        () =>
          expect(imageRequests.map(({ url }) => url).filter(url => url.endsWith('/images/products/undefined'))).to.be
            .empty
      );
    });

    checks.assertAll();
  });

  it('should not request an undefined product image while buying', () => {
    let undefinedImageRequests = 0;
    cy.intercept('GET', '/images/products/undefined', () => {
      undefinedImageRequests += 1;
    });
    cy.intercept('POST', '/api/cart*').as('updateCart');
    cy.intercept('POST', '/api/checkout*').as('placeOrder');

    getProductCardByName(FIRST_PRODUCT).click();
    getElementByField(CypressFields.ProductName).should('be.visible');
    getElementByField(CypressFields.ProductAddToCart).click();
    cy.wait('@updateCart');
    cy.location('pathname').should('eq', '/cart');
    getElementByField(CypressFields.CartIcon).click({ force: true });
    getElementByField(CypressFields.CartDropdownItem).should('have.length', 1);
    getElementByField(CypressFields.CartGoToShopping).click();
    getElementByField(CypressFields.CheckoutPlaceOrder).click();
    cy.wait('@placeOrder');
    getElementByField(CypressFields.CheckoutItem).should('have.length', 1);

    cy.then(() => expect(undefinedImageRequests).to.eq(0));
  });
});

export {};
