// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { getElementByField } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';
import { addShownProductToCart, interceptStorefrontApi, placeOrder, StepChecks } from '../helpers/storefront';

describe('Card expiry', () => {
  it('pays with a card that expires this month', () => {
    const checks = new StepChecks();
    const today = new Date();
    cy.on('uncaught:exception', () => false);
    interceptStorefrontApi();

    checks.step('Step 1: add the first product to the cart');
    cy.visit('/');
    getElementByField(CypressFields.ProductCard).first().click();
    addShownProductToCart();

    checks.step('Step 2: pay with a card expiring this month');
    cy.get('select[name="creditCardExpirationMonth"]').select(String(today.getMonth() + 1));
    cy.get('select[name="creditCardExpirationYear"]').select(String(today.getFullYear()));
    placeOrder().then(({ response }) => {
      checks.check('Step 2 order answer', () => expect(response?.statusCode).to.eq(200));
    });
    cy.contains('h1', 'Your order is complete!').should('be.visible');
    cy.location('pathname').should('match', /^\/cart\/checkout\/[^/]+$/);

    checks.assertAll();
  });
});

export {};
