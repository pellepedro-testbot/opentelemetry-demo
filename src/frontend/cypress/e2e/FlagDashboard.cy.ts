// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { readFlags, setFlagVariant, waitForFlagVariant, writeFlags } from '../../utils/CypressFlagd';

const NEW_FLAGS = ['aiRunawayAgent', 'emitRawPii', 'aiSlowResponse', 'productCatalogLockContention'];
const cartFailureSelect = () => cy.get('select[name="cartFailure"]');

describe('Flag dashboard', () => {
  after(() => setFlagVariant('cartFailure', 'off'));

  it('lists the new flags, follows changes made elsewhere and keeps the shopper on the page', () => {
    cy.log('Step 1: open the dashboard');
    cy.visit('/feature/');
    cy.get('.phx-connected').should('exist');
    NEW_FLAGS.forEach(name => cy.get(`select[name="${name}"]`).should('exist'));
    cartFailureSelect()
      .find('option')
      .then(options => {
        expect([...options].map(option => option.value)).to.deep.eq(['10%', '100%', '25%', '50%', '75%', '90%', 'off']);
      });
    cartFailureSelect().should('have.value', 'off');

    cy.log('Step 2: switch tabs without reloading');
    cy.window().then(win => {
      (win as Window & { __marker?: string }).__marker = 'kept';
    });
    cy.contains('nav a', 'Advanced').should('have.attr', 'data-phx-link', 'redirect').click();
    cy.location('pathname').should('eq', '/feature/advanced');
    cy.get('.phx-connected').should('exist');
    cy.contains('nav a', 'Basic').should('have.attr', 'data-phx-link', 'redirect').click();
    cy.location('pathname').should('eq', '/feature/');
    cy.window().its('__marker').should('eq', 'kept');

    cy.log('Step 3: another client changes cartFailure');
    readFlags().then(document => {
      document.flags.cartFailure.defaultVariant = '25%';
      writeFlags(document);
    });
    cartFailureSelect().should('have.value', '25%');

    cy.log('Step 4: set cartFailure back to off on the page');
    cartFailureSelect().select('off');
    waitForFlagVariant('cartFailure', 'off');
    cy.visit('/feature/');
    cartFailureSelect().should('have.value', 'off');

    cy.log('Step 5: open the scheduler from the navbar');
    cy.contains('nav a', 'Scheduler').should('have.attr', 'href', '/feature/scheduler').click();
    cy.location('pathname').should('eq', '/feature/scheduler');
    cy.contains('Scheduler stopped').should('be.visible');
  });
});

export {};
