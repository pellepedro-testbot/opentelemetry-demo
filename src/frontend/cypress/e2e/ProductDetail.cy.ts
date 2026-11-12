// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { createStepChecks, getElementByField } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

describe('Product Detail Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should validate the product detail page', () => {
    cy.intercept('GET', '/api/products/*').as('getProduct');
    cy.intercept('GET', '/api/data*').as('getAd');
    cy.intercept('GET', '/api/recommendations*').as('getRecommendations');

    getElementByField(CypressFields.ProductCard).first().click();

    cy.wait('@getProduct');
    cy.wait('@getAd');
    cy.wait('@getRecommendations');

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
  });

  it('should not render product picture or request undefined image when picture is missing', () => {
    cy.intercept('GET', '/api/products/*', req => {
      delete req.headers['if-none-match'];
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

  it('should show a product without a picture from the home page to the cart without a broken image', () => {
    const checks = createStepChecks();
    const countUndefinedImageRequests = (step: string) =>
      cy.get('@undefinedImage.all').then(requests => {
        checks.check(`${step}: no request for /images/products/undefined`, () => expect(requests).to.have.length(0));
      });
    cy.intercept('GET', '/api/products/*', req => {
      delete req.headers['if-none-match'];
      req.continue(res => {
        delete res.body.picture;
      });
    }).as('getProduct');
    cy.intercept('GET', '/images/products/undefined').as('undefinedImage');
    cy.intercept('POST', '/api/cart*').as('addToCart');

    cy.log('Step 1: open the storefront');
    cy.visit('/');
    getElementByField(CypressFields.ProductCard, getElementByField(CypressFields.ProductList)).should(
      'have.length',
      10
    );
    countUndefinedImageRequests('step 1');

    cy.log('Step 2: open the first product, whose picture is missing');
    getElementByField(CypressFields.ProductCard).first().click();
    cy.wait('@getProduct');
    getElementByField(CypressFields.ProductName).should('be.visible');
    getElementByField(CypressFields.ProductDescription).should('be.visible');
    getElementByField(CypressFields.ProductDetail).then($detail => {
      checks.check('step 2: no product picture', () =>
        expect($detail.find(`[data-cy="${CypressFields.ProductPicture}"]`)).to.have.length(0)
      );
    });
    countUndefinedImageRequests('step 2');

    cy.log('Step 3: add it to the cart');
    getElementByField(CypressFields.ProductAddToCart).click();
    cy.wait('@addToCart');
    cy.location('pathname').should('eq', '/cart');
    getElementByField(CypressFields.CartItemCount).should('contain', '1');
    countUndefinedImageRequests('step 3');

    checks.assertAll();
  });
});

export {};
