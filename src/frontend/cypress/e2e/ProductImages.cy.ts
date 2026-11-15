// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { getElementByField } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

// Matches /images/products/undefined and the bare /images/products/, with or without a query string.
const MISSING_PICTURE_IMAGE = /\/images\/products\/(undefined)?(\?.*)?$/;

type TProduct = { picture?: string };

let missingPictureRequests: string[] = [];

const expectNoMissingPictureImgSrc = () => {
  cy.document().then(doc => {
    const sources = [...doc.images].map(img => img.getAttribute('src') || '');
    expect(
      sources.filter(src => MISSING_PICTURE_IMAGE.test(src)),
      'img src'
    ).to.deep.eq([]);
  });
};

const expectNoMissingPictureImage = () => {
  cy.wait(1500);
  cy.then(() => expect(missingPictureRequests, 'missing picture requests').to.deep.eq([]));
  expectNoMissingPictureImgSrc();
};

describe('Product images', () => {
  beforeEach(() => {
    missingPictureRequests = [];
    cy.intercept('GET', MISSING_PICTURE_IMAGE, req => {
      missingPictureRequests.push(req.url);
    });
  });

  it('loads every home page product card image from /images/products', () => {
    cy.intercept('GET', '/images/products/*.*').as('productImage');
    cy.visit('/');
    getElementByField(CypressFields.ProductCard, getElementByField(CypressFields.ProductList)).should(
      'have.length',
      10
    );
    cy.wait('@productImage').its('response.statusCode').should('eq', 200);
    getElementByField(CypressFields.ProductCard).each($card => {
      cy.wrap($card).should(() => {
        const backgrounds = [...$card.find('*')].map(el => getComputedStyle(el).backgroundImage);
        expect(
          backgrounds.some(b => b.startsWith('url("blob:')),
          'card image is a loaded blob'
        ).to.eq(true);
      });
    });
  });

  it('renders home product cards without a picture and requests no missing image', () => {
    cy.intercept('GET', '/api/products?*', req => {
      delete req.headers['if-none-match'];
      req.continue(res => {
        res.body[0].picture = '';
        delete res.body[1].picture;
      });
    }).as('listProducts');
    cy.visit('/');
    cy.wait('@listProducts');
    getElementByField(CypressFields.ProductCard, getElementByField(CypressFields.ProductList)).should(
      'have.length',
      10
    );
    getElementByField(CypressFields.ProductCard).each($card => {
      const price = $card.find('[data-cy="product-price"]').text();
      expect(price, 'product price').not.to.be.empty;
      expect($card.text().replace(price, '').trim(), 'product name').not.to.be.empty;
    });
    expectNoMissingPictureImage();
  });

  it('renders a product page without a picture and requests no missing image', () => {
    cy.intercept('GET', '/api/products/0PUK6V6EV0*', req => {
      delete req.headers['if-none-match'];
      req.continue(res => {
        delete res.body.picture;
      });
    }).as('getProduct');
    cy.visit('/product/0PUK6V6EV0');
    cy.wait('@getProduct');
    getElementByField(CypressFields.ProductName).should('not.be.empty');
    getElementByField(CypressFields.ProductDescription).should('not.be.empty');
    expectNoMissingPictureImage();
  });

  it('renders cart lines and the cart dropdown without a picture and requests no missing image', () => {
    const userId = `cypress-images-${Date.now()}`;
    cy.request('POST', '/api/cart', { userId, item: { productId: '0PUK6V6EV0', quantity: 1 } });
    cy.intercept('GET', '/api/cart*', req => {
      delete req.headers['if-none-match'];
      req.continue(res => {
        res.body.items.forEach(({ product }: { product: TProduct }) => delete product.picture);
      });
    }).as('getCart');

    cy.visit('/cart', {
      onBeforeLoad(win) {
        win.localStorage.setItem('session', JSON.stringify({ userId, currencyCode: 'USD' }));
      },
    });
    cy.wait('@getCart');
    cy.contains('h1', 'Shopping Cart').should('be.visible');
    cy.contains('Solar System Color Imager').should('be.visible');
    getElementByField(CypressFields.CartIcon).click({ force: true });
    getElementByField(CypressFields.CartDropdownItem)
      .should('have.length', 1)
      .and('contain', 'Solar System Color Imager');
    expectNoMissingPictureImage();

    cy.request({ method: 'DELETE', url: '/api/cart', body: { userId } });
  });

  it('renders the order confirmation without a picture and requests no missing image', () => {
    cy.intercept('POST', '/api/cart*').as('addToCart');
    cy.intercept('POST', '/api/checkout*', req => {
      req.continue(res => {
        res.body.items.forEach(({ item }: { item: { product: TProduct } }) => delete item.product.picture);
      });
    }).as('placeOrder');

    cy.visit('/product/0PUK6V6EV0');
    getElementByField(CypressFields.ProductName).should('not.be.empty');
    getElementByField(CypressFields.ProductAddToCart).click();
    cy.wait('@addToCart');
    cy.location('pathname').should('eq', '/cart');
    getElementByField(CypressFields.CheckoutPlaceOrder).click();
    cy.wait('@placeOrder');
    cy.contains('Your order is complete!').should('be.visible');
    cy.contains('Solar System Color Imager').should('be.visible');

    cy.document().its('images.length').should('be.greaterThan', 0);
    expectNoMissingPictureImgSrc();
  });
});

export {};
