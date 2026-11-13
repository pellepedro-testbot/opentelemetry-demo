// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { getElementByField } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

interface IProduct {
  id: string;
  name: string;
  picture: string;
}

const NO_PICTURE = { id: 'HQTGWGPNH4', name: 'The Comet Book' };

describe('Product images', () => {
  it('does not request images of product cards below the fold until scrolled to', () => {
    const requested: string[] = [];
    cy.viewport(1280, 600);
    cy.intercept('GET', /\/images\/products\//, req => {
      requested.push(decodeURIComponent(req.url.split('/images/products/')[1]));
    });

    cy.request('/api/products?currencyCode=USD').then(({ body }: { body: IProduct[] }) => {
      cy.visit('/');
      getElementByField(CypressFields.ProductCard, getElementByField(CypressFields.ProductList)).should(
        'have.length',
        10
      );
      cy.wait(2000);

      cy.window().then(win => {
        getElementByField(CypressFields.ProductCard, getElementByField(CypressFields.ProductList)).then($cards => {
          const belowFold = Cypress._.filter($cards, card => card.getBoundingClientRect().top > win.innerHeight).map(
            card => body.find(({ name }) => card.textContent?.includes(name))?.picture
          );

          expect(belowFold, 'cards below the fold').to.have.length.greaterThan(0);
          expect(requested.filter(picture => belowFold.includes(picture))).to.be.empty;
        });
      });
    });
  });

  it('shows no image for a product without a picture', () => {
    const requested: string[] = [];
    cy.intercept('GET', /\/images\/products\//, req => {
      requested.push(req.url.split('/images/products/')[1]);
    });
    cy.intercept('GET', `/api/products/${NO_PICTURE.id}*`, req => {
      req.continue(res => {
        res.body.picture = '';
      });
    });
    cy.intercept('GET', '/api/cart*', req => {
      req.continue(res => {
        res.body.items?.forEach(({ product }: { product: IProduct }) => {
          if (product.id === NO_PICTURE.id) product.picture = '';
        });
      });
    }).as('getCart');

    cy.visit(`/product/${NO_PICTURE.id}`);
    getElementByField(CypressFields.ProductName).should('have.text', NO_PICTURE.name);
    getElementByField(CypressFields.ProductPicture).should('not.exist');

    getElementByField(CypressFields.ProductAddToCart).click();
    cy.location('pathname').should('eq', '/cart');
    cy.wait('@getCart');
    cy.contains('main p', NO_PICTURE.name).should('be.visible');
    cy.get(`main img[alt="${NO_PICTURE.name}"]`).should('not.exist');

    getElementByField(CypressFields.CartIcon).click({ force: true });
    getElementByField(CypressFields.CartDropdownItem).should('contain', NO_PICTURE.name);
    getElementByField(CypressFields.CartDropdown).find(`img[alt="${NO_PICTURE.name}"]`).should('not.exist');

    cy.then(() => {
      expect(requested).not.to.include.members(['undefined']);
      expect(requested).not.to.include.members(['null']);
      expect(requested).not.to.include.members(['']);
    });
  });
});

export {};
