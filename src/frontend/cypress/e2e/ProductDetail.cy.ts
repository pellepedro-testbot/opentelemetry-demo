// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { expectNoFailedChecks, getElementByField, getElementByFieldAndText, softCheck } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

const PRODUCT_NAME = 'Solar System Color Imager';

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

  it('should show the product picture from the image provider', () => {
    cy.intercept('GET', '/api/products/*', req => {
      delete req.headers['if-none-match'];
    });
    getElementByFieldAndText(CypressFields.ProductCard, PRODUCT_NAME).click();

    getElementByField(CypressFields.ProductPicture)
      .should('be.visible')
      .should($picture => {
        expect(getComputedStyle($picture[0]).backgroundImage).to.match(/\/images\/products\/[^"/]+\.(jpg|png|webp)/);
      });
  });

  it('shopper opens a product without a picture and buys it', () => {
    const failures: string[] = [];
    cy.intercept('GET', '/api/products/*', req => {
      delete req.headers['if-none-match'];
      req.continue(res => {
        delete res.body.picture;
      });
    }).as('getProduct');
    cy.intercept('GET', '/api/cart*', req => {
      delete req.headers['if-none-match'];
      req.continue(res => {
        (res.body.items || []).forEach((item: { product: { picture?: string } }) => delete item.product.picture);
      });
    }).as('getCart');
    cy.intercept('POST', '/api/cart*').as('addToCart');
    let undefinedImageRequests = 0;
    cy.intercept('GET', '/images/products/undefined*', () => {
      undefinedImageRequests += 1;
    });

    cy.log('**Step 1: open the storefront**');
    getElementByField(CypressFields.HomePage).should('exist');
    getElementByField(CypressFields.ProductCard).should('have.length', 10);

    cy.log('**Step 2: open a product, which has no picture**');
    getElementByFieldAndText(CypressFields.ProductCard, PRODUCT_NAME).click();
    cy.wait('@getProduct');
    getElementByField(CypressFields.ProductName).should('not.be.empty');
    getElementByField(CypressFields.ProductDescription).should('exist');
    getElementByField(CypressFields.ProductAddToCart).should('exist');
    getElementByField(CypressFields.ProductDetail).then($detail => {
      softCheck(failures, 'Step 2: no product picture rendered', () => {
        expect($detail[0].querySelectorAll(`[data-cy="${CypressFields.ProductPicture}"]`)).to.have.length(0);
      });
      softCheck(failures, 'Step 2: no request for an undefined image', () => {
        expect(undefinedImageRequests).to.eq(0);
      });
    });

    cy.log('**Step 3: add it to the cart and open the cart dropdown**');
    cy.then(() => {
      const requestsBefore = undefinedImageRequests;
      getElementByField(CypressFields.ProductAddToCart).click();
      cy.wait('@addToCart');
      cy.location('pathname').should('eq', '/cart');
      getElementByField(CypressFields.CartItemCount).should('contain', '1');
      getElementByField(CypressFields.CartIcon).click({ force: true });
      getElementByField(CypressFields.CartDropdownItem).should('have.length', 1);
      cy.contains(PRODUCT_NAME).should('exist');
      cy.then(() => {
        softCheck(failures, 'Step 3: no request for an undefined image from the cart', () => {
          expect(undefinedImageRequests - requestsBefore).to.eq(0);
        });
      });
    });

    cy.reload();
    getElementByField(CypressFields.CartItemCount).should('contain', '1');

    expectNoFailedChecks(failures);
  });
});

export {};
