// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { createStepChecks, getElementByField } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

const KIT = 'Lens Cleaning Kit';

const addKitAndPayWithCardExpiringThisMonth = () => {
  const now = new Date();
  cy.visit('/');
  cy.contains('[data-cy="product-card"]', KIT).click();
  getElementByField(CypressFields.ProductName).should('have.text', KIT);
  cy.contains('button', 'Add To Cart').click();
  cy.location('pathname').should('eq', '/cart');
  cy.contains('main', KIT).should('exist');
  cy.get('select[name="creditCardExpirationMonth"]').select(String(now.getMonth() + 1));
  cy.get('select[name="creditCardExpirationYear"]').select(String(now.getFullYear()));
  cy.contains('button', 'Place Order').click();
};

describe('Paying with a card that expires this month', () => {
  it('pays with a card that expires this month', () => {
    const steps = createStepChecks();
    cy.on('uncaught:exception', error => {
      steps.check('step 2 page error', () => {
        throw error;
      });
      return false;
    });
    cy.intercept('POST', '/api/checkout*').as('placeOrder');

    // Step 1 and 2: add the kit, pick this month and year, place the order
    addKitAndPayWithCardExpiringThisMonth();
    cy.wait('@placeOrder').then(({ response }) =>
      steps.check('step 2 checkout answer', () => expect(response?.statusCode).to.equal(200))
    );
    cy.wait(3000);
    cy.location('pathname').then(pathname =>
      steps.check('step 2 lands on the confirmation', () => expect(pathname).to.match(/^\/cart\/checkout\/[\w-]+$/))
    );

    // Step 3: read the confirmation
    cy.get('main').then($main => {
      const text = $main.text();
      steps.check('step 3 confirmation', () => {
        expect(text).to.contain('Your order is complete!');
        expect(text).to.match(/Order ID:\s*[0-9a-f-]{36}/);
        expect(text).to.contain(KIT);
        expect(text).to.contain('Quantity: 1');
      });
    });

    steps.assertAllPassed();
  });

  it('places the order with a card expiring in the current month', () => {
    addKitAndPayWithCardExpiringThisMonth();

    cy.location('pathname', { timeout: 15000 }).should('match', /^\/cart\/checkout\/[\w-]+$/);
    cy.contains('main', 'Your order is complete!').should('be.visible');
  });
});

export {};
