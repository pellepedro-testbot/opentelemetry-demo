// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { getProxyUrl, updateFlags } from '../../utils/Cypress';

const FLAG_PROPAGATION_MS = 6000;
const NEW_FLAGS = ['aiRunawayAgent', 'emitRawPii', 'aiSlowResponse', 'productCatalogLockContention'];

const schedulerCheckboxes = (flag: string) => cy.get(`input[type="checkbox"][name="variants[${flag}][]"]`);

const schedulerVariants = (flag: string) =>
  schedulerCheckboxes(flag).then(boxes =>
    Cypress.$.makeArray(boxes)
      .map(box => (box as HTMLInputElement).value)
      .sort()
  );

const setAdFailureMetadata = (metadata?: Record<string, unknown>) =>
  updateFlags(config => {
    if (metadata) {
      config.flags.adFailure.metadata = metadata;
    } else {
      delete config.flags.adFailure.metadata;
    }
  });

describe('Flag dashboard and scheduler', () => {
  after(() => setAdFailureMetadata());

  it('lists the new flags and schedules every flag that has not opted out', () => {
    cy.log('step 1: the flag dashboard lists the new flags');
    cy.visit(`${getProxyUrl()}/feature/`);
    NEW_FLAGS.forEach(flag => cy.contains(flag).should('exist'));

    cy.log('step 2: the scheduler offers the schedulable flags but not emitRawPii');
    cy.contains('a', 'Scheduler').click();
    cy.location('pathname').should('eq', '/feature/scheduler');
    schedulerVariants('adFailure').should('deep.equal', ['on']);
    schedulerVariants('aiRunawayAgent').should('deep.equal', ['on']);
    schedulerVariants('aiSlowResponse').should('deep.equal', ['10sec', '5sec']);
    schedulerVariants('productCatalogLockContention').should('deep.equal', ['on']);
    schedulerVariants('cartFailure').should('deep.equal', ['10%', '100%', '25%', '50%', '75%', '90%']);
    cy.get('body').should('not.contain', 'emitRawPii');
    schedulerCheckboxes('emitRawPii').should('have.length', 0);

    cy.log('step 3: marking adFailure non-schedulable drops it from the scheduler');
    setAdFailureMetadata({ schedulable: false });
    cy.wait(FLAG_PROPAGATION_MS);
    cy.reload();
    schedulerVariants('aiRunawayAgent').should('deep.equal', ['on']);
    schedulerCheckboxes('adFailure').should('have.length', 0);

    cy.log('step 4: removing the metadata offers adFailure again');
    setAdFailureMetadata();
    cy.wait(FLAG_PROPAGATION_MS);
    cy.reload();
    schedulerVariants('adFailure').should('deep.equal', ['on']);
  });

  it('keeps a flag whose metadata says schedulable: true', () => {
    setAdFailureMetadata({ schedulable: true });
    cy.wait(FLAG_PROPAGATION_MS);
    cy.visit(`${getProxyUrl()}/feature/scheduler`);
    schedulerVariants('adFailure').should('deep.equal', ['on']);
  });
});

export {};
