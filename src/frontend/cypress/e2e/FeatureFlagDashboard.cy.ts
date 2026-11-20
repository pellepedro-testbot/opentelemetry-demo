// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { proxyOrigin, readFlags, resolveFlag, setFlag, setProductCatalogFailure } from '../helpers/demo';

const TARGETING_NOTE = 'This flag has targeting rules.';

const openDashboard = () => {
  cy.visit(`${proxyOrigin()}/feature/`);
  cy.get('[data-phx-main].phx-connected').should('exist');
};

const flagSelect = (name: string) => cy.get(`select[name="${name}"]`);
const flagCard = (name: string) => cy.contains('.bg-gray-800', new RegExp(`^\\s*${name}\\s`));

const markWindow = () => cy.window().then(win => ((win as unknown as { __noReload: boolean }).__noReload = true));
const expectNoReload = () => cy.window().its('__noReload').should('eq', true);

const expectProductCatalogFailureTargetedOn = () =>
  readFlags().then(body => {
    expect(body.flags.productCatalogFailure.targeting.if[1]).to.eq('on');
    expect(body.flags.productCatalogFailure.defaultVariant).to.eq('off');
  });

describe('Flag dashboard', () => {
  afterEach(() => {
    setProductCatalogFailure('off');
    setFlag('adFailure', 'off');
  });

  it('turns on a targeted flag from the flag dashboard', () => {
    cy.log('step 1: the dashboard shows the targeting note and the Scheduler tab');
    openDashboard();
    cy.get('body').then($b => expect($b.text().split(TARGETING_NOTE).length - 1, 'targeting notes').to.eq(1));
    flagCard('productCatalogFailure').should('contain', TARGETING_NOTE);
    cy.contains('nav a', 'Scheduler').should('have.attr', 'href', '/feature/scheduler');

    cy.log('step 2: choose on for productCatalogFailure');
    flagSelect('productCatalogFailure').select('on');
    cy.contains('Saved: productCatalogFailure').should('be.visible');
    cy.wait(3000);
    expectProductCatalogFailureTargetedOn();
    resolveFlag('Boolean', 'productCatalogFailure', { product_id: 'OLJCESPC7Z' }).its('body.value').should('eq', true);
    resolveFlag('Boolean', 'productCatalogFailure', { product_id: '66VCHSJNUP' }).its('body.value').should('eq', false);

    cy.log('step 3: reload keeps the dropdown on');
    openDashboard();
    flagSelect('productCatalogFailure').should('have.value', 'on');

    cy.log('step 4: a flag changed elsewhere updates the open page');
    markWindow();
    setFlag('adFailure', 'on');
    flagSelect('adFailure').should('have.value', 'on');
    expectNoReload();

    cy.log('step 5: Advanced and Basic tabs switch without a reload');
    cy.contains('nav a', 'Advanced').should('have.attr', 'data-phx-link', 'redirect').click();
    cy.location('pathname').should('eq', '/feature/advanced');
    cy.contains('nav a', 'Basic').should('have.attr', 'data-phx-link', 'redirect').click();
    cy.location('pathname').should('eq', '/feature/');
    expectNoReload();

    cy.log('outcome: after a reload productCatalogFailure still reads on');
    openDashboard();
    flagSelect('productCatalogFailure').should('have.value', 'on');
    expectProductCatalogFailureTargetedOn();
  });

  it('writes on into the targeting rule and keeps defaultVariant off', () => {
    openDashboard();
    flagSelect('productCatalogFailure').select('on');
    cy.contains('Saved: productCatalogFailure').should('be.visible');
    cy.wait(2000);
    expectProductCatalogFailureTargetedOn();
  });

  it('shows the targeting rule match branch in the productCatalogFailure dropdown', () => {
    setProductCatalogFailure('on');
    openDashboard();
    flagSelect('productCatalogFailure').should('have.value', 'on');
    readFlags().its('flags.productCatalogFailure.defaultVariant').should('eq', 'off');
  });

  it('updates a dropdown when the flag is changed elsewhere, without a reload', () => {
    openDashboard();
    flagSelect('adFailure').should('have.value', 'off');
    markWindow();
    setFlag('adFailure', 'on');
    flagSelect('adFailure').should('have.value', 'on');
    expectNoReload();
  });

  it('switches between Basic and Advanced with LiveView navigation', () => {
    openDashboard();
    markWindow();
    cy.contains('nav a', 'Basic').should('have.attr', 'data-phx-link', 'redirect');
    cy.contains('nav a', 'Advanced').should('have.attr', 'data-phx-link', 'redirect').click();
    cy.location('pathname').should('eq', '/feature/advanced');
    cy.contains('nav a', 'Basic').click();
    cy.location('pathname').should('eq', '/feature/');
    expectNoReload();
  });
});

export {};
