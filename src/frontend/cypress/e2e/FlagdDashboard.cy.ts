// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { flagSelect, readFlags, setFlag } from '../../utils/Cypress';

describe('Flag dashboard', () => {
  after(() => {
    setFlag('adFailure', 'off');
  });

  it('turns adFailure on and off and the change persists', () => {
    cy.log('Step 1: select on');
    cy.visit('/feature');
    flagSelect('adFailure').select('on');
    flagSelect('adFailure').should('have.value', 'on');

    cy.log('Step 2: reload');
    cy.wait(1000);
    cy.reload();
    flagSelect('adFailure').should('have.value', 'on');
    readFlags().its('adFailure.defaultVariant').should('eq', 'on');

    cy.log('Step 3: select off and reload');
    flagSelect('adFailure').select('off');
    cy.wait(1000);
    cy.reload();
    flagSelect('adFailure').should('have.value', 'off');
    readFlags().its('adFailure.defaultVariant').should('eq', 'off');
  });
});

export {};
