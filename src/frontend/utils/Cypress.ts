// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { CypressFields } from './enums/CypressFields';

export { CypressFields };

export const getElementByField = (field: CypressFields, context: Cypress.Chainable = cy) =>
  context.get(`[data-cy="${field}"]`);

export const softCheck = (failures: string[], step: string, check: () => void) => {
  try {
    check();
  } catch (error) {
    failures.push(`${step}: ${(error as Error).message}`);
  }
};

export const expectNoFailedChecks = (failures: string[]) =>
  cy.then(() => {
    expect(failures.join(' | '), 'failed journey checks').to.equal('');
  });

export const getElementByFieldAndText = (field: CypressFields, text: string) =>
  cy.contains(`[data-cy="${field}"]`, text);
