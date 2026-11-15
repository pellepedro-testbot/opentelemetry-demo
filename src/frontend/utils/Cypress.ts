// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { CypressFields } from './enums/CypressFields';

export { CypressFields };

export const getElementByField = (field: CypressFields, context: Cypress.Chainable = cy) =>
  context.get(`[data-cy="${field}"]`);

const FLAGD_READ_URL = '/feature/api/read';
const FLAGD_WRITE_URL = '/feature/api/write';

export const readFlags = () => cy.request('GET', FLAGD_READ_URL).its('body');

export const setFlagDefaultVariant = (flagName: string, defaultVariant: string) =>
  readFlags().then(config => {
    config.flags[flagName].defaultVariant = defaultVariant;
    cy.request('POST', FLAGD_WRITE_URL, { data: config });
  });

export const createStepLogger = () => {
  let current = '';
  Cypress.on('test:before:run', () => {
    current = 'setup';
  });
  Cypress.on('fail', error => {
    error.message = `[${current}] ${error.message}`;
    throw error;
  });
  return (name: string, body: () => void) => {
    cy.then(() => {
      current = name;
    });
    cy.log(`**${name}**`);
    body();
  };
};
