// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { getElementByField } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

const productListCards = () =>
  getElementByField(CypressFields.ProductCard, getElementByField(CypressFields.ProductList));

describe('Home page products', () => {
  it('loads every product card image through image-provider', () => {
    const imageRequests: { url: string; delay?: string }[] = [];
    cy.intercept('GET', '/api/products*', req => {
      delete req.headers['if-none-match'];
    }).as('getProducts');
    cy.intercept('GET', '/images/products/*', req => {
      imageRequests.push({ url: req.url, delay: req.headers['x-envoy-fault-delay-request'] as string });
    });
    cy.visit('/');
    cy.wait('@getProducts').then(({ response }) => {
      const pictures: string[] = response!.body.map((p: { picture: string }) => p.picture);
      expect(pictures).to.have.length(10);
      productListCards().each($card => {
        cy.wrap($card)
          .children()
          .first()
          .should($image => expect(getComputedStyle($image[0]).backgroundImage).to.include('blob:'));
      });
      cy.then(() => {
        pictures.forEach(picture => {
          const request = imageRequests.find(r => r.url.endsWith(`/images/products/${picture}`));
          expect(request, `request for ${picture}`).not.to.eq(undefined);
          expect(request!.delay, `x-envoy-fault-delay-request of ${picture}`).to.be.a('string');
        });
      });
    });
  });

  it('shows the platform badge', () => {
    cy.visit('/');
    cy.contains('footer', 'session-id').contains(/^local$/).should('be.visible');
  });

});

export {};
