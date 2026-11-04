// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import type { CyHttpMessages } from 'cypress/types/net-stubbing';
import { getElementByField } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

const PICTURELESS_ID = 'OLJCESPC7Z';

const withoutPicture = (product: { id?: string; picture?: string }) => {
  if (product?.id === PICTURELESS_ID) delete product.picture;
};

/** Passes the API answer through with OLJCESPC7Z's picture removed; edit receives the parsed body. */
const rewriteBody = <T extends object>(edit: (body: T) => void) => (req: CyHttpMessages.IncomingHttpRequest) => {
  delete req.headers['if-none-match'];
  req.continue(res => {
    const body: T = typeof res.body === 'string' ? JSON.parse(res.body) : res.body;
    edit(body);
    res.send(body);
  });
};

const undefinedImagesShown = (page: string, found: string[], scope = 'body') =>
  cy.get(scope).then($scope => {
    $scope
      .find('img')
      .toArray()
      .map(img => img.getAttribute('src') || '')
      .filter(src => src.endsWith('undefined') || decodeURIComponent(src).includes('/images/products/undefined'))
      .forEach(src => found.push(`${page}: <img src="${src}">`));
  });
describe('Product page', () => {
  it('shows no broken image anywhere for a product without a picture', () => {
    const undefinedImageRequests: string[] = [];
    const brokenImages: string[] = [];
    cy.intercept(
      'GET',
      '/api/products?*',
      rewriteBody((body: { id?: string; picture?: string }[]) => body.forEach(withoutPicture))
    ).as('getProducts');
    cy.intercept('GET', `/api/products/${PICTURELESS_ID}*`, rewriteBody(withoutPicture)).as('getProduct');
    cy.intercept(
      'GET',
      '/api/cart*',
      rewriteBody((body: { items?: { product: { id?: string; picture?: string } }[] }) =>
        (body?.items || []).forEach(({ product }) =>
          withoutPicture(product)
        )
      )
    );
    cy.intercept('GET', '/images/products/undefined*', req => {
      undefinedImageRequests.push(req.url);
    });
    cy.intercept('GET', '/_next/image*', req => {
      if (decodeURIComponent(req.url).includes('/images/products/undefined')) undefinedImageRequests.push(req.url);
    });
    cy.intercept('POST', '/api/cart*').as('addToCart');

    cy.visit('/');
    cy.wait('@getProducts');
    getElementByField(CypressFields.ProductCard, getElementByField(CypressFields.ProductList)).should('have.length', 10);
    undefinedImagesShown('home', brokenImages);

    getElementByField(CypressFields.ProductCard).filter(':contains("National Park Foundation Explorascope")').first().click();
    cy.wait('@getProduct');
    getElementByField(CypressFields.ProductName).should('contain', 'National Park Foundation Explorascope');
    undefinedImagesShown('product page', brokenImages);

    getElementByField(CypressFields.ProductAddToCart).click();
    cy.wait('@addToCart');
    cy.location('pathname').should('eq', '/cart');
    cy.contains('a', 'National Park Foundation Explorascope').should('exist');
    undefinedImagesShown('cart page', brokenImages);

    getElementByField(CypressFields.CartIcon).click({ force: true });
    getElementByField(CypressFields.CartDropdownItem).should('have.length', 1);
    undefinedImagesShown('cart dropdown', brokenImages, `[data-cy="${CypressFields.CartDropdown}"]`);

    cy.then(() => {
      expect(
        { images: brokenImages, requests: undefinedImageRequests },
        'images shown and requested for /images/products/undefined'
      ).to.deep.equal({ images: [], requests: [] });
    });
  });

  it('never recommends the product being viewed', () => {
    const viewed = 'Starsense Explorer Refractor Telescope';
    cy.intercept('GET', '/api/recommendations*').as('getRecommendations');
    for (let visit = 0; visit < 8; visit++) {
      cy.visit('/product/66VCHSJNUP');
      cy.wait('@getRecommendations');
      getElementByField(CypressFields.ProductCard, getElementByField(CypressFields.RecommendationList))
        .should('have.length.greaterThan', 0)
        .each($card => {
          expect($card.text(), `recommendation on visit ${visit + 1}`).not.to.contain(viewed);
        });
    }
  });
});

export {};
