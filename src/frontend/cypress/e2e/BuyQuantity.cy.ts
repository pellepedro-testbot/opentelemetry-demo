// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import {
  countGetRequests,
  createStepChecks,
  getCartLineQuantity,
  getCartPrices,
  getElementByField,
  getImageByName,
  getPageContent,
  getRecommendationLinks,
} from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

const TELESCOPE = 'Starsense Explorer Refractor Telescope';

const joinedText = ($elements: JQuery<HTMLElement>) =>
  Cypress.$.makeArray($elements)
    .map(el => el.textContent?.trim())
    .join(' | ');

const addTelescopesToCart = (quantity: string) => {
  cy.visit('/');
  cy.contains('[data-cy="product-card"]', TELESCOPE).click();
  getElementByField(CypressFields.ProductName).should('have.text', TELESCOPE);
  getElementByField(CypressFields.ProductQuantity).select(quantity);
  cy.contains('button', 'Add To Cart').click();
  cy.location('pathname').should('eq', '/cart');
  cy.contains('h1', 'Shopping Cart').should('be.visible');
};

describe('Buying a product in quantity', () => {
  it('buys a telescope three at a time', () => {
    const steps = createStepChecks();
    const undefinedImage = countGetRequests('/images/products/undefined');
    cy.intercept('GET', '/api/products/*').as('getProduct');
    cy.intercept('GET', '/api/recommendations*').as('getRecommendations');
    cy.intercept('GET', '/api/shipping*').as('getShipping');

    // Step 1: open the shop
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
          'card image loaded'
        ).to.equal(true);
      });
    });

    // Step 2: open the telescope
    cy.contains('[data-cy="product-card"]', TELESCOPE).click();
    cy.wait('@getProduct');
    cy.wait('@getRecommendations');
    getElementByField(CypressFields.ProductName).should('have.text', TELESCOPE);
    getElementByField(CypressFields.ProductPicture).should('be.visible');
    cy.then(() =>
      steps.check('step 2 no /images/products/undefined request', () => expect(undefinedImage.count).to.equal(0))
    );
    getElementByField(CypressFields.ProductCard, getElementByField(CypressFields.RecommendationList)).should(
      'have.length',
      4
    );
    getRecommendationLinks().then($links => {
      const hrefs = Cypress.$.makeArray($links).map(a => a.getAttribute('href'));
      steps.check('step 2 recommendations leave out the viewed product', () =>
        expect(hrefs.join(', ')).not.to.contain('/product/66VCHSJNUP')
      );
    });

    // Step 3: add three to the cart
    getElementByField(CypressFields.ProductQuantity).select('3');
    cy.contains('button', 'Add To Cart').click();
    cy.location('pathname').should('eq', '/cart');
    cy.contains('h1', 'Shopping Cart').should('be.visible');

    // Step 4: read the cart line
    getImageByName(TELESCOPE)
      .should('have.attr', 'src', '/images/products/StarsenseExplorer.jpg')
      .and($img => expect(($img[0] as HTMLImageElement).naturalWidth).to.be.greaterThan(0));
    cy.wait('@getShipping');
    cy.contains('main', /Shipping\s*\$ 8\.99/).should('exist');
    getCartPrices().then($prices =>
      steps.check('step 4 cart prices (price, line total, shipping, total)', () =>
        expect(joinedText($prices)).to.equal('$ 349.95 | $ 1049.85 | $ 8.99 | $ 1058.84')
      )
    );

    // Step 5: place the order
    cy.contains('button', 'Place Order').click();
    cy.location('pathname', { timeout: 15000 }).should('match', /^\/cart\/checkout\/[\w-]+$/);

    // Step 6: read the confirmation, then again after a reload
    const readConfirmation = (when: string) => {
      cy.contains('main', 'Your order is complete!').should('be.visible');
      cy.contains('main', /Order ID:\s*[0-9a-f-]{36}/).should('exist');
      cy.contains('main', 'Order Items').should('exist');
      getPageContent().then($main => {
        const text = $main.text();
        steps.check(`step 6 ${when} order line`, () => {
          expect(text).to.contain(TELESCOPE);
          expect(text).to.contain('Quantity: 3');
          expect(text).to.contain('$ 1049.85');
        });
        steps.check(`step 6 ${when} shipping`, () => expect(text).to.match(/Shipping:\s*\$ 8\.99/));
        steps.check(`step 6 ${when} total`, () => expect(text).to.match(/Total:\s*\$ 1058\.84/));
      });
      getImageByName(TELESCOPE).should($img => expect(($img[0] as HTMLImageElement).naturalWidth).to.be.greaterThan(0));
    };
    readConfirmation('before reload');
    cy.reload();
    readConfirmation('after reload');

    steps.assertAllPassed();
  });

  it('shows the line total as the unit price times the quantity', () => {
    addTelescopesToCart('3');

    getCartPrices().should($prices =>
      expect(joinedText($prices)).to.equal('$ 349.95 | $ 1049.85 | $ 8.99 | $ 1058.84')
    );
  });

  it('shows the product price in the unit price column', () => {
    addTelescopesToCart('3');

    getCartPrices().should($prices => expect(joinedText($prices)).to.match(/^\$ 349\.95 \|/));
  });

  it('changes the quantity and empties the cart', () => {
    cy.intercept('GET', '/api/cart*').as('getCart');
    addTelescopesToCart('1');
    getElementByField(CypressFields.CartItemCount).should('contain', '1');

    getCartLineQuantity().select('2');
    cy.wait('@getCart');
    getCartLineQuantity().should('have.value', '2');

    cy.contains('button', 'Empty Cart').click();
    cy.wait('@getCart');
    getImageByName(TELESCOPE).should('not.exist');
    cy.contains('main', 'Your shopping cart is empty').should('be.visible');
  });
});

export {};
