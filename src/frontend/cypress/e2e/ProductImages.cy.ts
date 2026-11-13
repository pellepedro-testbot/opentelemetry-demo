// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { getElementByField } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

const PRODUCT_COUNT = 10;

const assertEveryCardShowsALoadedImage = (timeout = 10000) =>
  getElementByField(CypressFields.ProductCard, getElementByField(CypressFields.ProductList))
    .should('have.length', PRODUCT_COUNT)
    .each(card => {
      cy.wrap(card)
        .find('div', { timeout })
        .should($divs => {
          const backgrounds = [...$divs].map(div => Cypress.$(div).css('background-image'));
          expect(
            backgrounds.some(background => /^url\("blob:/.test(background)),
            backgrounds.join()
          ).to.be.true;
        });
    });

describe('Product images', () => {
  it('shows each home page product card with its name, price and loaded image', () => {
    cy.intercept('GET', '/api/products*').as('getProducts');
    cy.intercept('GET', '/images/products/*').as('productImage');
    cy.visit('/');
    cy.wait('@getProducts').then(({ response }) => {
      const names = (response?.body as { name: string }[]).map(({ name }) => name);
      expect(names).to.have.length(PRODUCT_COUNT);
      getElementByField(CypressFields.ProductCard, getElementByField(CypressFields.ProductList))
        .should('have.length', PRODUCT_COUNT)
        .each((card, index) => {
          expect(card.text()).to.contain(names[index]);
          cy.wrap(card)
            .find(`[data-cy="${CypressFields.ProductPrice}"]`)
            .invoke('text')
            .should('match', /^\$ \d+\.\d{2}$/);
        });
    });

    cy.scrollTo('bottom');
    assertEveryCardShowsALoadedImage();
    cy.get('@productImage.all').then(calls => {
      const images = calls as unknown as {
        request: { url: string };
        response?: { statusCode: number; headers: Record<string, string> };
      }[];
      expect(images.length).to.be.at.least(PRODUCT_COUNT);
      images.forEach(({ request, response }) => {
        expect(response?.statusCode, request.url).to.eq(200);
        expect(response?.headers['content-type'], request.url).to.match(/^image\//);
      });
    });
  });

  it('only requests product card images when the cards come near the viewport', () => {
    cy.viewport(1280, 500);
    cy.intercept('GET', '/images/products/*').as('productImage');
    cy.visit('/');
    getElementByField(CypressFields.ProductCard, getElementByField(CypressFields.ProductList)).should(
      'have.length',
      PRODUCT_COUNT
    );
    cy.wait(2000);

    cy.get('@productImage.all').its('length').should('be.lessThan', PRODUCT_COUNT);

    cy.scrollTo('bottom', { duration: 1000 });
    assertEveryCardShowsALoadedImage();
  });
});

export {};
