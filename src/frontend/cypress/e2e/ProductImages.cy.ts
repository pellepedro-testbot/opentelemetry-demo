// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { createStepChecks, getElementByField } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

const LENS_KIT = { id: 'L9ECAV7KIM', name: 'Lens Cleaning Kit' };

// A product image URL with no file name, or "undefined" / "null" in its place.
const MISSING_PICTURE_URL = /\/images\/products\/(undefined|null)?(\?.*)?$/;

type CartProduct = { product?: { id?: string; picture?: string } };

describe('Product images', () => {
  it('does not fetch the images of product cards below the fold before scrolling', () => {
    const requested = new Set<string>();
    cy.viewport(800, 600);
    cy.intercept('GET', '/images/products/*', req => {
      requested.add(req.url);
    });

    cy.visit('/');
    getElementByField(CypressFields.ProductCard).should('have.length.at.least', 1);
    cy.wait(3000);

    getElementByField(CypressFields.ProductCard).then($cards => {
      const belowTheFold = $cards.toArray().filter(card => card.getBoundingClientRect().top > 600).length;
      expect(belowTheFold, 'product cards below the fold').to.be.greaterThan(0);
      expect(requested.size, 'product images requested before scrolling').to.be.at.most($cards.length - belowTheFold);
    });
  });

  it('shows a product without a picture on the product page, cart dropdown and cart without a broken image', () => {
    const missingPictureRequests: string[] = [];
    cy.intercept('GET', '/images/products/**', req => {
      if (MISSING_PICTURE_URL.test(req.url)) missingPictureRequests.push(req.url);
    });
    cy.intercept('GET', `/api/products/${LENS_KIT.id}*`, req => {
      req.continue(res => {
        delete res.body.picture;
      });
    }).as('getProduct');
    cy.intercept('GET', '/api/cart*', req => {
      req.continue(res => {
        (res.body.items || []).forEach(({ product }: CartProduct) => {
          if (product?.id === LENS_KIT.id) delete product.picture;
        });
      });
    }).as('getCart');
    cy.intercept('POST', '/api/cart*').as('addToCart');

    const pages = createStepChecks();
    const noMissingPictureImage = (where: string) =>
      cy.get('img').then($imgs => {
        const broken = $imgs.toArray().filter(img => MISSING_PICTURE_URL.test(img.getAttribute('src') || ''));
        pages.check(broken.length === 0, `${where}: ${broken.length} image(s) point at a missing product picture`);
      });

    cy.visit(`/product/${LENS_KIT.id}`);
    cy.wait('@getProduct');
    getElementByField(CypressFields.ProductName).should('contain', LENS_KIT.name);
    cy.wait(1000);
    cy.get('body').then($body => {
      const pictures = $body.find(`[data-cy="${CypressFields.ProductPicture}"]`).length;
      pages.check(pictures === 0, `product page: ${pictures} product picture element(s) shown`);
    });
    noMissingPictureImage('product page');

    getElementByField(CypressFields.ProductAddToCart).click();
    cy.wait('@addToCart');
    cy.location('pathname').should('eq', '/cart');
    cy.wait('@getCart');
    cy.contains('a', LENS_KIT.name).should('be.visible');
    noMissingPictureImage('cart line');

    getElementByField(CypressFields.CartIcon).click({ force: true });
    getElementByField(CypressFields.CartDropdownItem).should('contain', LENS_KIT.name);
    noMissingPictureImage('cart dropdown');

    cy.then(() =>
      pages.check(
        missingPictureRequests.length === 0,
        `requests for a missing picture: ${missingPictureRequests.join(', ')}`
      )
    );
    pages.assertAll();
  });
});

export {};
