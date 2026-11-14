// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { cartRow, emptyStoredCart, getElementByField } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

const PRODUCT_ID = 'OLJCESPC7Z';
const PRODUCT_NAME = 'National Park Foundation Explorascope';

const expectImageLoaded = (selector: string) =>
  cy.get(selector).should($img => expect(($img[0] as HTMLImageElement).naturalWidth).to.be.greaterThan(0));

const interceptBrokenImageRequests = () => {
  cy.intercept({ method: 'GET', pathname: '/images/products/' }).as('emptyPictureImage');
  cy.intercept({ method: 'GET', pathname: '/images/products/undefined' }).as('undefinedPictureImage');
};

const expectNoBrokenImageRequests = () => {
  cy.get('@emptyPictureImage.all').should('have.length', 0);
  cy.get('@undefinedPictureImage.all').should('have.length', 0);
};

const withoutPicture = (product: { id?: string; picture?: string }) =>
  product?.id === PRODUCT_ID ? { ...product, picture: '' } : product;

describe('Product images', () => {
  afterEach(() => emptyStoredCart());

  it('shows product images on the home cards, product page, cart, cart dropdown and order page', () => {
    cy.intercept('GET', '/images/products/*').as('productImage');
    cy.intercept('POST', '/api/cart*').as('addToCart');
    cy.intercept('POST', '/api/checkout*').as('placeOrder');

    cy.visit('/');
    getElementByField(CypressFields.ProductCard).should('have.length.greaterThan', 0);
    getElementByField(CypressFields.ProductCard).each($card => {
      cy.wrap($card)
        .find('div')
        .first()
        .should($image => expect($image.css('background-image')).to.match(/^url\("blob:/));
    });

    cy.contains(`[data-cy="${CypressFields.ProductCard}"]`, PRODUCT_NAME).click();
    getElementByField(CypressFields.ProductPicture)
      .should('have.css', 'background-image')
      .and('match', /\/images\/products\/[^"/]+\.\w+"\)$/);
    getElementByField(CypressFields.ProductPicture)
      .invoke('css', 'background-image')
      .then(background => {
        const url = String(background).replace(/^url\("(.*)"\)$/, '$1');
        cy.request(url).its('status').should('eq', 200);
      });

    getElementByField(CypressFields.ProductAddToCart).click();
    cy.wait('@addToCart');
    cy.location('pathname').should('eq', '/cart');
    cartRow(PRODUCT_NAME)
      .find(`img[alt="${PRODUCT_NAME}"]`)
      .should($img => expect(($img[0] as HTMLImageElement).naturalWidth).to.be.greaterThan(0));

    getElementByField(CypressFields.CartIcon).click({ force: true });
    getElementByField(CypressFields.CartDropdownItem)
      .find(`img[alt="${PRODUCT_NAME}"]`)
      .should($img => expect(($img[0] as HTMLImageElement).naturalWidth).to.be.greaterThan(0));
    cy.get('body').type('{esc}');

    getElementByField(CypressFields.CheckoutPlaceOrder).click({ force: true });
    cy.wait('@placeOrder').its('response.statusCode').should('eq', 200);
    cy.location('pathname').should('match', /^\/cart\/checkout\//);
    expectImageLoaded(`img[alt="${PRODUCT_NAME}"]`);
  });

  it('requests below-the-fold card images only after they are scrolled into view', () => {
    const requested: string[] = [];
    cy.viewport(1280, 600);
    cy.intercept('GET', '/images/products/*', req => {
      requested.push(req.url);
    });

    cy.visit('/');
    getElementByField(CypressFields.ProductCard).should('have.length.greaterThan', 0);
    cy.wait(3000);
    cy.window().then(win => {
      cy.get(`[data-cy="${CypressFields.ProductCard}"]`).then($cards => {
        const belowFold = [...$cards].filter(card => card.getBoundingClientRect().top >= win.innerHeight).length;
        expect(belowFold, 'cards below the fold').to.be.greaterThan(0);
        expect(requested.length, 'card images requested on load').to.be.at.most($cards.length - belowFold);

        cy.scrollTo('bottom');
        cy.wrap(requested).should('have.length', $cards.length);
      });
    });
  });

  it('does not request a broken image for a product without a picture on its page', () => {
    interceptBrokenImageRequests();
    cy.intercept('GET', `/api/products/${PRODUCT_ID}*`, req => {
      delete req.headers['if-none-match'];
      req.continue(res => {
        res.body = withoutPicture(res.body);
      });
    }).as('getProduct');

    cy.visit(`/product/${PRODUCT_ID}`);
    cy.wait('@getProduct');
    getElementByField(CypressFields.ProductName).should('have.text', PRODUCT_NAME);
    getElementByField(CypressFields.ProductPicture).should('not.exist');
    expectNoBrokenImageRequests();
  });

  it('does not request a broken image for a product card without a picture', () => {
    interceptBrokenImageRequests();
    cy.intercept({ method: 'GET', pathname: '/api/products' }, req => {
      delete req.headers['if-none-match'];
      req.continue(res => {
        res.body = res.body.map(withoutPicture);
      });
    }).as('listProducts');

    cy.visit('/');
    cy.wait('@listProducts');
    cy.contains(`[data-cy="${CypressFields.ProductCard}"]`, PRODUCT_NAME).should('be.visible');
    cy.wait(2000);
    expectNoBrokenImageRequests();
  });

  it('does not request a broken image for a cart line without a picture', () => {
    interceptBrokenImageRequests();
    cy.intercept('GET', '/api/cart*', req => {
      delete req.headers['if-none-match'];
      req.continue(res => {
        res.body.items = res.body.items.map((item: { product: { id?: string; picture?: string } }) => ({
          ...item,
          product: withoutPicture(item.product),
        }));
      });
    });
    cy.intercept('POST', '/api/cart*').as('addToCart');

    cy.visit(`/product/${PRODUCT_ID}`);
    getElementByField(CypressFields.ProductAddToCart).click();
    cy.wait('@addToCart');
    cy.location('pathname').should('eq', '/cart');
    cartRow(PRODUCT_NAME).should('have.length', 1);
    cy.wait(2000);
    expectNoBrokenImageRequests();
  });
});

export {};
