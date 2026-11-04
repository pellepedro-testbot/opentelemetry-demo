// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { Product } from '../../protos/demo';
import { getCartRow, getElementByField, getProductCard, getStoredSession } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';
import { emptyCart } from '../../utils/CypressStoreApi';

const PRODUCT_ID = '0PUK6V6EV0';

const expectImageLoaded = (img: JQuery<HTMLElement>) => {
  expect(img).to.have.length(1);
  expect((img[0] as HTMLImageElement).naturalWidth, 'loaded image width').to.be.greaterThan(0);
};

const requestedPictures = (alias: `@${string}`) =>
  cy.get<{ request: { url: string } }[]>(`${alias}.all` as `@${string}`).then(calls => [
    ...new Set(calls.map(({ request }) => new URL(request.url).pathname.replace('/images/products/', ''))),
  ]);

describe('Product images', () => {
  afterEach(() => {
    getStoredSession().then(session => session && emptyCart(session.userId));
  });

  it('shows the product image on home, product, cart dropdown, cart and confirmation pages', () => {
    cy.request('GET', '/api/products?currencyCode=USD').then(({ body }: { body: Product[] }) => {
      const pictures = body.map(({ picture }) => picture);
      const { name, picture } = body.find(({ id }) => id === PRODUCT_ID)!;

      cy.intercept('GET', '/images/products/*').as('productImage');
      cy.intercept('POST', '/api/cart*').as('addToCart');
      cy.intercept('POST', '/api/checkout*').as('placeOrder');
      cy.visit('/');
      getElementByField(CypressFields.ProductCard).should('have.length', 10);
      cy.scrollTo('bottom');
      cy.wait(2000);
      requestedPictures('@productImage').should('include.members', pictures);
      cy.get<{ request: { url: string }; response?: { statusCode: number } }[]>('@productImage.all').then(calls => {
        calls.forEach(({ request, response }) => expect(response?.statusCode, request.url).to.eq(200));
      });

      getProductCard(PRODUCT_ID).click();
      getElementByField(CypressFields.ProductPicture).should('exist');
      cy.wait('@productImage').its('request.url').should('contain', `/images/products/${picture}`);

      getElementByField(CypressFields.ProductAddToCart).click();
      cy.wait('@addToCart');
      cy.location('pathname').should('eq', '/cart');
      getCartRow(PRODUCT_ID).find(`img[alt="${name}"]`).should(expectImageLoaded);

      getElementByField(CypressFields.CartIcon).click({ force: true });
      getElementByField(CypressFields.CartDropdownItem).find(`img[alt="${name}"]`).should(expectImageLoaded);
      getElementByField(CypressFields.CartIcon).click({ force: true });

      getElementByField(CypressFields.CheckoutPlaceOrder).click();
      cy.wait('@placeOrder');
      cy.location('pathname').should('match', /^\/cart\/checkout\//);
      cy.get(`main img[alt="${name}"]`).should(expectImageLoaded);
    });
  });

  it('renders no image and requests none for a product without a picture', () => {
    const dropPicture = (product?: { picture?: string }) => product && delete product.picture;
    cy.intercept('GET', '/api/products*', req => {
      req.continue(res => {
        (Array.isArray(res.body) ? res.body : [res.body]).forEach(dropPicture);
      });
    });
    cy.intercept('GET', '/api/cart*', req => {
      req.continue(res => {
        res.body.items?.forEach(({ product }: { product?: { picture?: string } }) => dropPicture(product));
      });
    });
    cy.intercept('POST', '/api/checkout*', req => {
      req.continue(res => {
        res.body.items?.forEach(({ item }: { item?: { product?: { picture?: string } } }) => dropPicture(item?.product));
      });
    }).as('placeOrder');
    cy.intercept('GET', '/images/products/undefined').as('undefinedImage');
    cy.intercept('GET', '/images/products/').as('emptyImage');
    cy.intercept('POST', '/api/cart*').as('addToCart');

    cy.visit('/');
    getProductCard(PRODUCT_ID).click();
    getElementByField(CypressFields.ProductName).should('exist');
    getElementByField(CypressFields.ProductDescription).should('exist');
    getElementByField(CypressFields.ProductAddToCart).should('exist');
    getElementByField(CypressFields.ProductPicture).should('not.exist');

    getElementByField(CypressFields.ProductAddToCart).click();
    cy.wait('@addToCart');
    cy.location('pathname').should('eq', '/cart');
    getCartRow(PRODUCT_ID).should('contain', 'Solar System Color Imager');
    getCartRow(PRODUCT_ID).find('img').should('not.exist');

    getElementByField(CypressFields.CartIcon).click({ force: true });
    getElementByField(CypressFields.CartDropdownItem).should('have.length', 1);
    getElementByField(CypressFields.CartDropdownItem).find('img').should('not.exist');
    getElementByField(CypressFields.CartIcon).click({ force: true });

    getElementByField(CypressFields.CheckoutPlaceOrder).click();
    cy.wait('@placeOrder');
    cy.location('pathname').should('match', /^\/cart\/checkout\//);
    cy.contains('main', 'Solar System Color Imager');
    cy.get('main img[alt="Solar System Color Imager"]').should('not.exist');

    cy.get('@undefinedImage.all').should('have.length', 0);
    cy.get('@emptyImage.all').should('have.length', 0);
  });

  it('requests product images below the fold only once they are scrolled into view', () => {
    cy.viewport(1280, 600);
    cy.intercept('GET', '/images/products/*').as('productImage');
    cy.visit('/');
    getElementByField(CypressFields.ProductCard).should('have.length', 10);
    cy.wait(2000);
    requestedPictures('@productImage').should('have.length.lessThan', 10);

    cy.scrollTo('bottom', { duration: 1000 });
    getElementByField(CypressFields.ProductCard).last().scrollIntoView();
    cy.wait(2000);
    requestedPictures('@productImage').should('have.length', 10);
  });
});

export {};
