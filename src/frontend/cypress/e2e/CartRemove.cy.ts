// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { getElementByField } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';
import { JourneySteps, priceAmount } from '../support/journeySteps';

const quantityMenu = (productName: string) => cy.get(`select[aria-label="Quantity of ${productName}"]`);

const sessionId = () =>
  getElementByField(CypressFields.SessionId)
    .invoke('text')
    .then(text => text.replace('session-id:', '').trim());

describe('Cart item quantity and removal', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/cart*').as('addToCart');
    cy.intercept('GET', '/api/cart*').as('getCart');
  });

  it('changes the quantity of a cart item and then removes it for good', () => {
    const steps = new JourneySteps();
    let productName = '';

    cy.log('Step 1: open the first product');
    cy.visit('/');
    getElementByField(CypressFields.ProductCard).first().click();
    getElementByField(CypressFields.ProductDetail).should('exist');
    getElementByField(CypressFields.ProductName)
      .should('not.be.empty')
      .invoke('text')
      .then(name => {
        productName = name.trim();
      });

    cy.log('Step 2: add it to the cart');
    getElementByField(CypressFields.ProductAddToCart).click();
    cy.wait('@addToCart');
    cy.wait('@getCart', { timeout: 10000 });
    cy.location('pathname').should('eq', '/cart');
    cy.then(() => quantityMenu(productName).should('exist'));
    cy.then(() =>
      quantityMenu(productName).then($select =>
        steps.check('Step 2 line quantity', () => expect($select.val()).to.eq('1'))
      )
    );

    cy.log('Step 3: open the quantity menu');
    cy.then(() =>
      quantityMenu(productName)
        .find('option')
        .then($options => {
          const labels = [...$options].map(o => o.textContent?.trim());
          steps.check('Step 3 menu choices', () =>
            expect(labels).to.deep.eq(['Remove', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'])
          );
        })
    );
    cy.then(() =>
      quantityMenu(productName).then($select =>
        steps.check('Step 3 accessible label', () =>
          expect($select.attr('aria-label')).to.eq(`Quantity of ${productName}`)
        )
      )
    );

    cy.log('Step 4: choose 3');
    cy.then(() => quantityMenu(productName).select('3'));
    cy.wait('@addToCart');
    cy.wait('@getCart', { timeout: 10000 });
    cy.wait(1000);
    cy.then(() =>
      quantityMenu(productName).then($select => {
        steps.check('Step 4 line quantity', () => expect($select.val()).to.eq('3'));
        const prices = $select.parent().parent().find(`[data-cy="${CypressFields.ProductPrice}"]`);
        const unit = priceAmount(prices.eq(0).text());
        const lineTotal = priceAmount(prices.eq(1).text());
        steps.check('Step 4 line total', () => expect(lineTotal).to.be.closeTo(3 * unit, 0.01));
      })
    );
    sessionId().then(id =>
      cy
        .request(`/api/cart?sessionId=${id}&currencyCode=USD`)
        .then(({ body }) =>
          steps.check('Step 4 cart service quantity', () =>
            expect(body.items.map((i: { quantity: number }) => i.quantity)).to.deep.eq([3])
          )
        )
    );
    getElementByField(CypressFields.CartItemCount).then($badge =>
      steps.check('Step 4 cart badge', () => expect($badge.text()).to.contain('1'))
    );

    cy.log('Step 5: choose Remove');
    cy.then(() => quantityMenu(productName).select('Remove'));
    cy.wait('@addToCart');
    cy.wait('@getCart', { timeout: 10000 });
    cy.wait(1000);
    cy.then(() =>
      cy.get('body').then($body => {
        steps.check('Step 5 line removed', () =>
          expect($body.find(`select[aria-label="Quantity of ${productName}"]`)).to.have.length(0)
        );
        steps.check('Step 5 empty cart view', () => expect($body.text()).to.contain('Your shopping cart is empty!'));
      })
    );

    cy.log('Step 6: reload the cart page');
    cy.reload();
    cy.wait('@getCart', { timeout: 10000 });
    cy.wait(1000);
    cy.then(() =>
      cy.get('body').then($body => {
        steps.check('Step 6 line still gone', () =>
          expect($body.find(`select[aria-label="Quantity of ${productName}"]`)).to.have.length(0)
        );
        steps.check('Step 6 empty cart view', () => expect($body.text()).to.contain('Your shopping cart is empty!'));
      })
    );
    sessionId().then(id =>
      cy
        .request(`/api/cart?sessionId=${id}&currencyCode=USD`)
        .then(({ body }) => steps.check('Step 6 cart service has no line', () => expect(body.items).to.have.length(0)))
    );

    steps.assertAllPassed();
  });
});

export {};
