// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { getElementByField } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

const PRODUCT_ID = 'OLJCESPC7Z';
const PRODUCT_NAME = 'National Park Foundation Explorascope';
const quantitySelect = () => cy.get(`select[aria-label="Quantity of ${PRODUCT_NAME}"]`);

const sessionId = () =>
  getElementByField(CypressFields.SessionId)
    .invoke('text')
    .then(text => text.replace('session-id:', '').trim());

const cartQuantities = () =>
  sessionId().then(id =>
    cy
      .request(`/api/cart?sessionId=${id}`)
      .then(({ body }) =>
        Object.fromEntries(body.items.map((i: { productId: string; quantity: number }) => [i.productId, i.quantity]))
      )
  );

describe('Cart line quantity', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/cart*').as('addToCart');
    cy.intercept('GET', '/api/cart*').as('getCart');

    cy.visit(`/product/${PRODUCT_ID}`);
    getElementByField(CypressFields.ProductQuantity).select('2');
    getElementByField(CypressFields.ProductAddToCart).click();
    cy.wait('@addToCart');
    cy.location('pathname').should('eq', '/cart');
    quantitySelect().should('have.value', '2');
  });

  it('offers Remove and 1 to 10 in a labelled menu', () => {
    quantitySelect()
      .find('option')
      .then(options => [...options].map(o => o.textContent))
      .should('deep.equal', ['Remove', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']);
  });

  it('removes the line when Remove is chosen', () => {
    quantitySelect().select('Remove');
    cy.wait('@addToCart');
    cy.wait('@getCart');

    quantitySelect().should('not.exist');
    cy.reload();
    getElementByField(CypressFields.SessionId).should('exist');
    quantitySelect().should('not.exist');
    cartQuantities().should('not.have.property', PRODUCT_ID);
  });

  it('sets the line to the chosen quantity', () => {
    quantitySelect().select('4');
    cy.wait('@addToCart');

    cy.reload();
    quantitySelect().should('have.value', '4');
    cartQuantities().should('have.property', PRODUCT_ID, 4);
  });
});

export {};
