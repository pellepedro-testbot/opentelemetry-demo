// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { setFlag } from '../../utils/Cypress';

const step = (title: string) => cy.log(`**${title}**`);

const readFlagVariant = (flagName: string) =>
  cy.request('GET', '/feature/api/read').then(({ body }) => body.flags[flagName].defaultVariant as string);

const field = (label: string) => cy.contains('label', label).find('input');

const stopScheduler = () => {
  cy.visit('/feature/scheduler');
  cy.get('body').then($body => {
    if ($body.find('button:contains("Stop")').length) {
      cy.contains('button', 'Stop').click();
    }
  });
};

const waitForVariant = (flagName: string, variant: string, attemptsLeft = 30): Cypress.Chainable<string> =>
  readFlagVariant(flagName).then(current => {
    if (current === variant || attemptsLeft <= 0) {
      return cy.wrap(current);
    }
    return cy.wait(500).then(() => waitForVariant(flagName, variant, attemptsLeft - 1));
  });

describe('Flag scheduler', () => {
  after(() => {
    stopScheduler();
    setFlag('adFailure', 'off');
  });

  it('activates a scheduled flag on its own and reverts it when stopped', () => {
    step('1. Open the scheduler from the flag UI');
    cy.visit('/feature');
    cy.contains('a', 'Scheduler').click();
    cy.location('pathname').should('eq', '/feature/scheduler');
    cy.contains('Scheduler stopped').should('be.visible');
    cy.contains('span', /^\s*Idle\s*$/).should('be.visible');
    cy.contains('label', 'emitRawPii').should('not.exist');

    step('2. Schedule adFailure and start');
    cy.contains('button', 'None').click();
    cy.contains('label', 'adFailure').find('input[type="checkbox"]').check();
    field('Interval (seconds)').clear().type('4');
    field('Minimum duration (seconds)').clear().type('2');
    field('Maximum duration (seconds)').clear().type('3');
    field('Flags at once (per interval)').clear().type('1');
    cy.contains('button', 'Start').click();
    cy.contains('Scheduler running').should('be.visible');
    cy.contains('dl', 'Currently active', { timeout: 15000 }).should('contain', 'adFailure = on');

    step('3. Watch the Basic dashboard while the schedule runs');
    cy.get('[role="alert"]').should('contain', 'Scheduler started').click();
    cy.get('[role="alert"]').should('not.exist');
    cy.contains('a', 'Basic').click();
    cy.location('pathname').should('eq', '/feature/');
    cy.get('select[name="adFailure"]', { timeout: 20000 }).should('have.value', 'on');
    waitForVariant('adFailure', 'on').should('eq', 'on');

    step('4. Stop the schedule');
    cy.contains('a', 'Scheduler').click();
    cy.contains('button', 'Stop').click();
    cy.get('[role="alert"]').should('contain', 'Scheduler stopped');
    cy.contains('span', /^\s*Idle\s*$/).should('be.visible');
    waitForVariant('adFailure', 'off').should('eq', 'off');
  });
});

export {};
