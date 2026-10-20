// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { getElementByField } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

const quantityOf = (name: string) => cy.get(`select[aria-label="Quantity of ${name}"]`);

const addFromProductPage = (productId: string, quantity: number) => {
  cy.visit(`/product/${productId}`);
  getElementByField(CypressFields.ProductQuantity).select(String(quantity));
  getElementByField(CypressFields.ProductAddToCart).click();
  cy.wait('@addToCart');
  cy.location('pathname').should('eq', '/cart');
};

describe('Cart item quantity menu', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/cart*').as('addToCart');
  });

  it('offers Remove and 1 to 10, with an accessible label', () => {
    addFromProductPage('L9ECAV7KIM', 1);

    quantityOf('Lens Cleaning Kit')
      .find('option')
      .then(options => [...options].map(o => o.textContent))
      .should('deep.equal', ['Remove', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']);
  });

  it('removes the line when Remove is chosen', () => {
    addFromProductPage('L9ECAV7KIM', 3);
    addFromProductPage('OLJCESPC7Z', 1);

    quantityOf('Lens Cleaning Kit').select('Remove');
    cy.wait('@addToCart').its('request.body.item').should('deep.include', { productId: 'L9ECAV7KIM', quantity: -3 });

    cy.reload();
    quantityOf('National Park Foundation Explorascope').should('exist');
    quantityOf('Lens Cleaning Kit').should('not.exist');
  });

  it('shows an empty cart after removing its only line', () => {
    addFromProductPage('L9ECAV7KIM', 2);

    quantityOf('Lens Cleaning Kit').select('Remove');
    cy.wait('@addToCart');

    cy.reload();
    cy.contains('Your shopping cart is empty!').should('be.visible');
    quantityOf('Lens Cleaning Kit').should('not.exist');
  });

  it('still changes the quantity of a line', () => {
    addFromProductPage('L9ECAV7KIM', 1);

    quantityOf('Lens Cleaning Kit').select('4');
    cy.wait('@addToCart').its('request.body.item.quantity').should('eq', 3);
    cy.reload();
    quantityOf('Lens Cleaning Kit').should('have.value', '4');

    quantityOf('Lens Cleaning Kit').select('2');
    cy.wait('@addToCart').its('request.body.item.quantity').should('eq', -2);
    cy.reload();
    quantityOf('Lens Cleaning Kit').should('have.value', '2');
  });
});

export {};
