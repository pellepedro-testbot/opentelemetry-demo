// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { createStepLogger, getElementByField } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

const PRODUCT_NAME = 'Roof Binoculars';

const step = createStepLogger();

const assertLoaderImagesRelativeAndLoaded = (expectedSrc?: string) => {
  cy.get('img[src*="?w="]').should($images => {
    expect($images.length).to.be.greaterThan(0);
    if (expectedSrc) {
      const srcs = $images.toArray().map(image => image.getAttribute('src'));
      expect(srcs, 'loader image sources').to.include(expectedSrc);
    }
    $images.each((_, image) => {
      const img = image as HTMLImageElement;
      const src = img.getAttribute('src') || '';
      const srcset = img.getAttribute('srcset') || '';
      expect(src, 'image src').to.match(/^\/[^/]/);
      expect(src, 'image src').to.contain('&q=75');
      expect(srcset, 'image srcset').not.to.contain('http');
      expect(img.naturalWidth, `${src} loaded`).to.be.greaterThan(0);
    });
  });
};

describe('Release 3.1.0 purchase', () => {
  it('buys a product and shows the order confirmation', () => {
    cy.intercept('POST', '/api/checkout*').as('placeOrder');

    step('Step 1: open the shop home', () => {
      cy.visit('/');
      getElementByField(CypressFields.ProductCard).should('have.length.at.least', 1);
      assertLoaderImagesRelativeAndLoaded('/icons/CartIcon.svg?w=48&q=75');
      cy.contains(/^local$/).should('be.visible');
    });

    step('Step 2: open a product page', () => {
      cy.contains(`[data-cy="${CypressFields.ProductCard}"]`, PRODUCT_NAME).click();
      getElementByField(CypressFields.ProductDetail).should('be.visible');
      getElementByField(CypressFields.ProductName).should('contain', PRODUCT_NAME);
      assertLoaderImagesRelativeAndLoaded('/icons/Cart.svg?w=32&q=75');
    });

    step('Step 3: add the product to the cart', () => {
      getElementByField(CypressFields.ProductAddToCart).click();
      cy.location('pathname', { timeout: 15000 }).should('eq', '/cart');
      getElementByField(CypressFields.CheckoutPlaceOrder).should('be.visible');
    });

    step('Step 4: place the order with the default form values', () => {
      getElementByField(CypressFields.CheckoutPlaceOrder).click();
      cy.wait('@placeOrder').its('response.statusCode').should('eq', 200);
      cy.location('pathname', { timeout: 15000 }).should('match', /^\/cart\/checkout\/[0-9a-f-]{36}$/);
    });

    step('Step 5: view the order confirmation', () => {
      cy.contains('Your order is complete!').should('be.visible');
      cy.contains("We've sent you a confirmation email.").should('be.visible');
      cy.contains('Order ID:').should('be.visible');
      cy.location('pathname').then(pathname => {
        cy.contains(pathname.split('/').pop() as string).should('be.visible');
      });
      cy.contains('Shipping Address').should('be.visible');
      cy.contains('1600 Amphitheatre Parkway').should('be.visible');
      cy.contains('Mountain View, CA 94043').should('be.visible');
      cy.get('h5').should('have.length', 1).and('have.text', PRODUCT_NAME);
      cy.contains('Quantity: 1').should('be.visible');
      cy.contains('Shipping:').should('be.visible');
      cy.contains('Total:').should('be.visible');
      assertLoaderImagesRelativeAndLoaded();
    });
  });
});

export {};
