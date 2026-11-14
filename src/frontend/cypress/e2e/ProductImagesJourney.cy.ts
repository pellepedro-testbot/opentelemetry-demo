// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { createSoftChecks, getElementByField, NON_EMPTY_CSS_URL, productCardImageUrl } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

const productCards = () => getElementByField(CypressFields.ProductCard, getElementByField(CypressFields.ProductList));

describe('Product images journey', () => {
  it('loads product images as their cards scroll into view', () => {
    const soft = createSoftChecks();
    cy.viewport(1000, 600);
    cy.intercept('GET', '/images/products/**').as('img');

    cy.log('Step 1: open the storefront without scrolling');
    cy.visit('/');
    productCards().should('have.length', 10);
    cy.wait(2000);
    cy.get('@img.all').then(requests =>
      soft.check('Step 1 image requests before scrolling', () => expect(requests).to.have.length.lessThan(10))
    );

    cy.log('Step 2: scroll to the end of the list');
    productCards().each(card => {
      cy.wrap(card).scrollIntoView();
    });
    productCards().last().scrollIntoView();
    productCards().should(cards => {
      cards.each((_, card) => {
        expect(productCardImageUrl(card)).to.match(NON_EMPTY_CSS_URL);
      });
    });

    soft.assertAll();
  });
});

export {};
