// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { getElementByField, journeySteps } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

describe('Not found page', () => {
  it('follows a broken link and gets back to the shop', () => {
    const steps = journeySteps();

    cy.log('Step 1: open a page that does not exist');
    cy.request({ url: '/no-such-page', failOnStatusCode: false }).then(({ status }) =>
      steps.check('1. answers 404', () => expect(status).to.eq(404))
    );
    cy.visit('/no-such-page', { failOnStatusCode: false });
    cy.contains('This page could not be found.');
    cy.get('body').then($body => {
      steps.check('1. shows 404', () => expect($body.text()).to.contain('404'));
    });
    cy.contains('a', 'Go to homepage').then($link =>
      steps.check('1. homepage link goes to /', () => expect($link.attr('href')).to.eq('/'))
    );

    cy.log('Step 2: follow the homepage link');
    cy.contains('a', 'Go to homepage').click();
    cy.location('pathname').should('eq', '/');
    getElementByField(CypressFields.ProductCard, getElementByField(CypressFields.ProductList)).should(
      'have.length',
      10
    );

    cy.then(() => steps.assertAll());
  });
});

export {};
