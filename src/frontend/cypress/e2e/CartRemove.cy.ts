// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { getElementByField } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

const EXPLORASCOPE = { id: 'OLJCESPC7Z', name: 'National Park Foundation Explorascope' };
const STARSENSE = { id: '66VCHSJNUP', name: 'Starsense Explorer Refractor Telescope' };

const quantitySelect = (name: string) => cy.get(`select[aria-label="Quantity of ${name}"]`);

const addToCart = (productId: string, quantity: number) => {
  cy.intercept('POST', '/api/cart*').as('addToCart');
  cy.visit(`/product/${productId}`);
  getElementByField(CypressFields.ProductQuantity).select(String(quantity));
  getElementByField(CypressFields.ProductAddToCart).click();
  cy.wait('@addToCart');
  cy.location('pathname').should('eq', '/cart');
};

describe('Cart line quantity menu', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/cart*').as('getCart');
  });

  it('offers Remove and 1 to 10 with the current quantity selected', () => {
    addToCart(EXPLORASCOPE.id, 2);

    quantitySelect(EXPLORASCOPE.name)
      .find('option')
      .then(options => [...options].map(o => o.textContent))
      .should('deep.equal', ['Remove', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']);
    quantitySelect(EXPLORASCOPE.name).should('have.value', '2');
  });

  it('removes only the chosen line', () => {
    addToCart(EXPLORASCOPE.id, 2);
    addToCart(STARSENSE.id, 1);
    quantitySelect(EXPLORASCOPE.name).should('have.value', '2');

    cy.intercept('POST', '/api/cart*').as('removeLine');
    quantitySelect(EXPLORASCOPE.name).select('Remove');
    cy.wait('@removeLine').its('request.body.item').should('deep.include', {
      productId: EXPLORASCOPE.id,
      quantity: -2,
    });
    cy.wait('@getCart');

    quantitySelect(EXPLORASCOPE.name).should('not.exist');
    quantitySelect(STARSENSE.name).should('have.value', '1');

    cy.reload();
    quantitySelect(STARSENSE.name).should('have.value', '1');
    quantitySelect(EXPLORASCOPE.name).should('not.exist');

    getElementByField(CypressFields.SessionId)
      .invoke('text')
      .then(text => {
        const sessionId = text.replace('session-id:', '').trim();
        cy.request(`/api/cart?sessionId=${sessionId}&currencyCode=USD`)
          .its('body.items')
          .then(items => items.map((i: { productId: string }) => i.productId))
          .should('deep.equal', [STARSENSE.id]);
      });
  });

  it('still changes the quantity to another number', () => {
    addToCart(EXPLORASCOPE.id, 2);

    cy.intercept('POST', '/api/cart*').as('changeQuantity');
    quantitySelect(EXPLORASCOPE.name).select('5');
    cy.wait('@changeQuantity');
    cy.wait('@getCart');
    quantitySelect(EXPLORASCOPE.name).should('have.value', '5');

    cy.reload();
    quantitySelect(EXPLORASCOPE.name).should('have.value', '5');
  });
});

export {};
