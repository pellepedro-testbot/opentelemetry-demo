// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { createStepChecks, getElementByField } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

const EXPLORASCOPE = 'National Park Foundation Explorascope';

const setProductCatalogFailure = (variant: 'on' | 'off') => {
  cy.request('GET', '/feature/api/read').then(({ body }) => {
    body.flags.productCatalogFailure.targeting.if[1] = variant;
    cy.request('POST', '/feature/api/write', { data: body });
  });
  cy.wait(3000);
};

const addExplorascopeThenFailCatalog = () => {
  cy.visit('/');
  cy.contains('[data-cy="product-card"]', EXPLORASCOPE).click();
  getElementByField(CypressFields.ProductName).should('have.text', EXPLORASCOPE);
  cy.contains('button', 'Add To Cart').click();
  cy.location('pathname').should('eq', '/cart');
  cy.contains('main', EXPLORASCOPE).should('exist');
  setProductCatalogFailure('on');
};

const captureRejections = (rejections: string[]) => {
  cy.on('window:before:load', win => {
    win.addEventListener('unhandledrejection', event => rejections.push(event.reason?.message));
  });
  cy.on('uncaught:exception', (_error, _runnable, promise) => {
    if (promise) return false;
  });
};

describe('Placing an order the shop cannot complete', () => {
  afterEach(() => setProductCatalogFailure('off'));

  it('tries to order when the shop cannot complete it', () => {
    const steps = createStepChecks();
    const rejections: string[] = [];
    captureRejections(rejections);
    cy.intercept('POST', '/api/checkout*').as('placeOrder');

    // Step 1: add the Explorascope, then the catalog starts failing
    addExplorascopeThenFailCatalog();

    // Step 2: place the order
    cy.contains('button', 'Place Order').click();
    cy.wait('@placeOrder').then(({ response }) =>
      steps.check('step 2 checkout answer', () => {
        expect(response?.statusCode).to.equal(500);
        expect(response?.body).to.deep.equal({ error: 'Failed to place order.' });
      })
    );
    cy.wait(2000);
    cy.location('pathname').then(pathname =>
      steps.check('step 2 stays on the cart page', () => expect(pathname).to.equal('/cart'))
    );
    cy.then(() =>
      steps.check('step 2 failure surfaces the server message', () =>
        expect(rejections).to.deep.equal(['Failed to place order.'])
      )
    );

    steps.assertAllPassed();
  });

  it('rejects the order with the server error message and stays on the cart', () => {
    const rejections: string[] = [];
    captureRejections(rejections);
    cy.intercept('POST', '/api/checkout*').as('placeOrder');
    addExplorascopeThenFailCatalog();

    cy.contains('button', 'Place Order').click();
    cy.wait('@placeOrder').its('response.statusCode').should('equal', 500);

    cy.wrap(rejections).should('have.length', 1);
    cy.wrap(rejections).its(0).should('equal', 'Failed to place order.');
    cy.location('pathname').should('equal', '/cart');
  });
});

export {};
