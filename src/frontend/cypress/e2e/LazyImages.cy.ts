// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { createStepChecks, getElementByField } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

const cardImageLoaded = ($card: JQuery<HTMLElement>) =>
  Cypress.$.makeArray($card.find('*')).some(el => getComputedStyle(el).backgroundImage.includes('blob:'));

const openShopOnSmallScreen = () => {
  cy.viewport(1280, 400);
  cy.intercept('GET', '/images/products/*').as('productImage');
  cy.visit('/');
  getElementByField(CypressFields.ProductCard, getElementByField(CypressFields.ProductList)).should('have.length', 10);
  cy.wait(3000);
};

const scrollThroughProductList = () => {
  getElementByField(CypressFields.ProductCard).each($card => {
    cy.wrap($card).scrollIntoView();
    cy.wait(300);
  });
  cy.scrollTo('bottom');
};

describe('Lazy-loaded product images', () => {
  it('browses the product list on a small screen', () => {
    const steps = createStepChecks();

    // Step 1: open the shop with a short viewport
    openShopOnSmallScreen();
    cy.get('@productImage.all').then(requests =>
      steps.check('step 1 image requests before scrolling', () => expect(requests.length).to.be.lessThan(10))
    );

    // Step 2: scroll to the bottom of the product list
    scrollThroughProductList();
    cy.get('@productImage.all').should('have.length.at.least', 10);
    getElementByField(CypressFields.ProductCard).each($card => {
      cy.wrap($card).should($el => expect(cardImageLoaded($el), 'card image shown').to.equal(true));
    });

    steps.assertAllPassed();
  });

  it('fetches only the images near the viewport until the user scrolls', () => {
    openShopOnSmallScreen();
    cy.get('@productImage.all').its('length').should('be.lessThan', 10);

    scrollThroughProductList();
    cy.get('@productImage.all').should('have.length.at.least', 10);
    getElementByField(CypressFields.ProductCard).each($card => {
      cy.wrap($card).should($el => expect(cardImageLoaded($el), 'card image shown').to.equal(true));
    });
  });
});

export {};
