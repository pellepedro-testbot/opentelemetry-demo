// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { countGetRequests, getElementByField, getImageByName } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

const TELESCOPE = 'Starsense Explorer Refractor Telescope';

const imageShown = ($img: JQuery<HTMLElement>) =>
  expect(($img[0] as HTMLImageElement).naturalWidth, `${$img.attr('src')} loaded`).to.be.greaterThan(0);

describe('Product images', () => {
  it('requests no undefined image while a product page loads', () => {
    const undefinedImage = countGetRequests('/images/products/undefined');
    cy.intercept('GET', '/api/products/*').as('getProduct');
    cy.visit('/');

    cy.contains('[data-cy="product-card"]', TELESCOPE).click();
    cy.wait('@getProduct');
    getElementByField(CypressFields.ProductName).should('have.text', TELESCOPE);

    cy.then(() => expect(undefinedImage.count).to.equal(0));
  });

  it('renders no broken image in the cart for a product without a picture', () => {
    const undefinedImage = countGetRequests('/images/products/undefined');
    cy.intercept('GET', '/api/cart*', req => {
      delete req.headers['if-none-match'];
      req.continue(res => {
        (res.body?.items || []).forEach((item: { product?: { picture?: string } }) => delete item.product?.picture);
      });
    }).as('getCart');
    cy.visit('/');
    cy.contains('[data-cy="product-card"]', TELESCOPE).click();
    cy.contains('button', 'Add To Cart').click();
    cy.location('pathname').should('eq', '/cart');
    cy.contains('main', TELESCOPE).should('exist');

    getElementByField(CypressFields.CartIcon).click({ force: true });
    getElementByField(CypressFields.CartDropdownItem).should('have.length', 1);

    cy.then(() => expect(undefinedImage.count).to.equal(0));
    getImageByName(TELESCOPE).should('not.exist');
  });

  it('shows the product image wherever the product is shown', () => {
    cy.visit('/');
    getElementByField(CypressFields.ProductCard, getElementByField(CypressFields.ProductList)).should(
      'have.length',
      10
    );
    getElementByField(CypressFields.ProductCard).each($card => {
      cy.wrap($card).should($el => {
        const backgrounds = Cypress.$.makeArray($el.find('*')).map(el => getComputedStyle(el).backgroundImage);
        expect(
          backgrounds.some(bg => bg.includes('blob:')),
          'card image shown'
        ).to.equal(true);
      });
    });

    cy.contains('[data-cy="product-card"]', TELESCOPE).click();
    getElementByField(CypressFields.ProductPicture)
      .should('be.visible')
      .and('have.css', 'background-image')
      .and('contain', '/images/products/StarsenseExplorer.jpg');

    cy.contains('button', 'Add To Cart').click();
    cy.location('pathname').should('eq', '/cart');
    getImageByName(TELESCOPE).should(imageShown);

    getElementByField(CypressFields.CartIcon).click({ force: true });
    getElementByField(CypressFields.CartDropdown).should('be.visible');
    getImageByName(TELESCOPE)
      .should($imgs => expect($imgs).to.have.length(2))
      .each(imageShown);

    cy.contains('button', 'Place Order').click({ force: true });
    cy.location('pathname', { timeout: 15000 }).should('match', /^\/cart\/checkout\/[\w-]+$/);
    getImageByName(TELESCOPE).should(imageShown);
  });
});

export {};
