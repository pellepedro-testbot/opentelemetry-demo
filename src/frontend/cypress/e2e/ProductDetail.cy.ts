// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { getElementByField } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

describe('Product Detail Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should validate the product detail page', () => {
    cy.intercept('GET', '/api/products/*').as('getProduct');
    cy.intercept('GET', '/api/data*').as('getAd');
    cy.intercept('GET', '/api/recommendations*').as('getRecommendations');
    cy.intercept('GET', '/api/product-reviews/*').as('getProductReviews');

    getElementByField(CypressFields.ProductCard).first().click();

    cy.wait('@getProduct');
    cy.wait('@getAd');
    cy.wait('@getRecommendations');
    cy.wait('@getProductReviews');

    getElementByField(CypressFields.ProductDetail).should('exist');
    getElementByField(CypressFields.ProductPicture).should('exist');
    getElementByField(CypressFields.ProductName).should('exist');
    getElementByField(CypressFields.ProductDescription).should('exist');
    getElementByField(CypressFields.ProductAddToCart).should('exist');

    getElementByField(CypressFields.ProductCard, getElementByField(CypressFields.RecommendationList)).should(
      'have.length',
      4
    );
    getElementByField(CypressFields.Ad).should('exist');
    getElementByField(CypressFields.ProductReviews).should('exist');
  });

  it('should not render product picture or request undefined image when picture is missing', () => {
    cy.intercept('GET', '/api/products/*', req => {
      req.continue(res => {
        delete res.body.picture;
      });
    }).as('getProduct');

    cy.intercept('GET', '/images/products/undefined').as('undefinedImage');

    getElementByField(CypressFields.ProductCard).first().click();
    cy.wait('@getProduct');

    getElementByField(CypressFields.ProductDetail).should('exist');
    getElementByField(CypressFields.ProductPicture).should('not.exist');
    getElementByField(CypressFields.ProductName).should('exist');
    getElementByField(CypressFields.ProductDescription).should('exist');
    getElementByField(CypressFields.ProductAddToCart).should('exist');

    cy.get('@undefinedImage.all').should('have.length', 0);
  });

  it('should add item to cart', () => {
    cy.intercept('POST', '/api/cart*').as('addToCart');
    cy.intercept('GET', '/api/cart*').as('getCart');
    getElementByField(CypressFields.ProductCard).first().click();
    getElementByField(CypressFields.ProductAddToCart).click();

    cy.wait('@addToCart');
    cy.wait('@getCart', { timeout: 10000 });
    cy.wait(2000);
    cy.location('href').should('match', /\/cart$/);

    getElementByField(CypressFields.CartItemCount).should('contain', '1');
    getElementByField(CypressFields.CartIcon).click({ force: true });

    getElementByField(CypressFields.CartDropdownItem).should('have.length', 1);
  });
  it('opens a product page without reviews and adds the product to the cart', () => {
    const reviewRequests: string[] = [];
    cy.intercept('GET', '/api/product-reviews*', req => {
      reviewRequests.push(req.url);
    });
    cy.intercept('POST', '/api/cart*').as('addToCart');

    cy.log('step 1: open the National Park Foundation Explorascope');
    getElementByField(CypressFields.ProductList).contains('National Park Foundation Explorascope').click();
    cy.location('pathname').should('eq', '/product/OLJCESPC7Z');
    getElementByField(CypressFields.ProductName).should('contain', 'National Park Foundation Explorascope');
    getElementByField(CypressFields.ProductPrice, getElementByField(CypressFields.ProductDetail)).should('contain', '$');
    getElementByField(CypressFields.ProductAddToCart).should('be.visible');

    cy.log('step 2: no reviews section and no review requests, then add to cart');
    cy.wait(3000);
    cy.get('[data-cy="product-reviews"]').should('not.exist');
    cy.contains('Ask AI About This Product').should('not.exist');
    cy.then(() => expect(reviewRequests, 'review requests').to.deep.equal([]));
    getElementByField(CypressFields.ProductAddToCart).click();
    cy.wait('@addToCart');
    cy.location('pathname').should('eq', '/cart');
    cy.contains('National Park Foundation Explorascope').should('be.visible');
  });

  it('has no reviews or Ask AI section and requests no reviews', () => {
    const reviewRequests: string[] = [];
    cy.intercept('GET', '/api/product-reviews*', req => {
      reviewRequests.push(req.url);
    });
    getElementByField(CypressFields.ProductList).contains('National Park Foundation Explorascope').click();
    getElementByField(CypressFields.ProductDetail).should('be.visible');
    cy.wait(3000);
    cy.get('[data-cy="product-reviews"]').should('not.exist');
    cy.contains('Ask AI About This Product').should('not.exist');
    cy.then(() => expect(reviewRequests, 'review requests').to.deep.equal([]));
  });
});

export {};
