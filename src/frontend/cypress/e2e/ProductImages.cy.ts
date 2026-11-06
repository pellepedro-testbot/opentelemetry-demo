// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { getElementByField, seedSession } from '../../utils/Cypress';
import { addToCart, emptyCart, uniqueUserId } from '../../utils/CypressRequests';
import { CypressFields } from '../../utils/enums/CypressFields';

const PRODUCT_ID = '66VCHSJNUP';

describe('Product images', () => {
  it('shows the product pictures on the home page, the product page and the cart', () => {
    const userId = uniqueUserId('cypress-images');
    cy.visit('/', { onBeforeLoad: seedSession({ userId, currencyCode: 'USD' }) });
    getElementByField(CypressFields.ProductCard, getElementByField(CypressFields.ProductList))
      .should('have.length', 10)
      .each(card =>
        cy
          .wrap(card)
          .find('div')
          .should(divs => {
            const backgrounds = Cypress._.map(divs, div => getComputedStyle(div).backgroundImage);
            expect(
              backgrounds.some(bg => bg.includes('blob:')),
              'card image loaded'
            ).to.equal(true);
          })
      );

    cy.request(`/api/products/${PRODUCT_ID}?currencyCode=USD`).then(({ body: product }) => {
      cy.visit(`/product/${PRODUCT_ID}`);
      getElementByField(CypressFields.ProductPicture)
        .should('be.visible')
        .and($el => expect(getComputedStyle($el[0]).backgroundImage).to.include(`/images/products/${product.picture}`));

      addToCart(userId, PRODUCT_ID);
      cy.visit('/cart');
      cy.get(`img[alt="${product.name}"]`)
        .should('have.attr', 'src', `/images/products/${product.picture}`)
        .and($img => expect(($img[0] as HTMLImageElement).naturalWidth).to.be.greaterThan(0));
      emptyCart(userId);
    });
  });

  it('requests no undefined image for a product without a picture and keeps its details', () => {
    const userId = uniqueUserId('cypress-no-picture');
    let productName = '';
    cy.intercept('GET', '/images/products/undefined').as('undefinedImage');
    cy.intercept('GET', '/api/products?*', req => {
      delete req.headers['if-none-match'];
      req.continue(res => {
        delete res.body[0].picture;
        productName = res.body[0].name;
      });
    }).as('getProducts');
    cy.intercept('GET', '/api/cart?*', req => {
      delete req.headers['if-none-match'];
      req.continue(res => {
        res.body.items.forEach(({ product }: { product: { picture?: string } }) => delete product.picture);
      });
    }).as('getCart');

    addToCart(userId, PRODUCT_ID);
    cy.visit('/', { onBeforeLoad: seedSession({ userId, currencyCode: 'USD' }) });
    cy.wait('@getProducts');
    cy.then(() => getElementByField(CypressFields.ProductList).contains(productName).should('be.visible'));

    cy.visit('/cart');
    cy.wait('@getCart');
    cy.request(`/api/products/${PRODUCT_ID}?currencyCode=USD`).then(({ body: product }) => {
      cy.contains('a', product.name).should('be.visible');
      getElementByField(CypressFields.CartIcon).click({ force: true });
      getElementByField(CypressFields.CartDropdownItem).should('contain', product.name);
      getElementByField(CypressFields.ProductPrice, getElementByField(CypressFields.CartDropdownItem)).should(
        'be.visible'
      );
    });

    cy.get('img[src$="/undefined"]').should('have.length', 0);
    cy.get('@undefinedImage.all').should('have.length', 0);
    emptyCart(userId);
  });
});

export {};
