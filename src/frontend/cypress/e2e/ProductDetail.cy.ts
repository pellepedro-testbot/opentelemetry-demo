// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { getElementByField } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';
import {
  addShownProductToCart,
  cartLine,
  interceptStorefrontApi,
  ORDER_ITEM,
  placeOrder,
  StepChecks,
} from '../helpers/storefront';

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

  it('shows the product picture from /images/products on the product, cart and order pages', () => {
    interceptStorefrontApi();
    cy.intercept('GET', '/api/products/*', req => {
      delete req.headers['if-none-match'];
    }).as('getProduct');
    getElementByField(CypressFields.ProductCard).first().click();

    cy.wait('@getProduct').then(({ response }) => {
      const { picture, name } = response?.body;
      const pictureUrl = `/images/products/${picture}`;
      expect(picture, 'product picture').to.be.a('string').and.not.be.empty;
      getElementByField(CypressFields.ProductPicture).should('have.css', 'background-image').and('contain', pictureUrl);

      addShownProductToCart();
      cartLine(name).find('img').should('have.attr', 'src').and('include', pictureUrl);
      getElementByField(CypressFields.CartIcon).click({ force: true });
      getElementByField(CypressFields.CartDropdownItem)
        .find('img')
        .should('have.attr', 'src')
        .and('include', pictureUrl);
      getElementByField(CypressFields.CartGoToShopping).click();

      placeOrder();
      cy.contains(ORDER_ITEM, name).find('img').should('have.attr', 'src').and('include', pictureUrl);
    });
  });

  it('does not request an undefined image for a product without a picture in the cart', () => {
    const checks = new StepChecks();
    const dropPicture = (product: { picture?: string }) => {
      delete product.picture;
    };
    interceptStorefrontApi();
    cy.intercept('GET', '/api/products/*', req => {
      delete req.headers['if-none-match'];
      req.continue(res => dropPicture(res.body));
    }).as('getProduct');
    cy.intercept('GET', '/api/cart*', req => {
      delete req.headers['if-none-match'];
      req.continue(res => {
        (res.body.items || []).forEach(({ product }: { product: { picture?: string } }) => dropPicture(product));
      });
    }).as('getCartWithoutPictures');
    cy.intercept('GET', '/images/products/undefined').as('undefinedImage');

    getElementByField(CypressFields.ProductCard).first().click();
    cy.wait('@getProduct');
    getElementByField(CypressFields.ProductName).should('exist');
    cy.get('body').then($body => {
      const pictures = $body.find(`[data-cy="${CypressFields.ProductPicture}"]`);
      checks.check('product page picture', () => expect(pictures.length, 'product pictures').to.eq(0));
    });
    addShownProductToCart().then(({ name }) => {
      cy.wait('@getCartWithoutPictures');
      cartLine(name).should('be.visible');
      cartLine(name).then($line => {
        const broken = $line.find('img[src*="undefined"]');
        checks.check('cart line image', () =>
          expect(broken.length, 'cart images for /images/products/undefined').to.eq(0)
        );
      });
    });
    cy.get('@undefinedImage.all').then(requests => {
      checks.check('undefined image requests', () =>
        expect(requests.length, 'requests to /images/products/undefined').to.eq(0)
      );
    });

    checks.assertAll();
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
});

export {};
