// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { CypressFields } from './enums/CypressFields';

export { CypressFields };

export const getElementByField = (field: CypressFields, context: Cypress.Chainable = cy) =>
  context.get(`[data-cy="${field}"]`);

export const getProductCardByName = (name: string) => cy.contains(`[data-cy="${CypressFields.ProductCard}"]`, name);

export const getCurrencyCodes = ($select: JQuery<HTMLElement>) =>
  [...($select[0] as HTMLSelectElement).options].map(option => option.value);

/**
 * Collects the failed checks of a multi-step journey so a failing step does not stop the
 * journey: each check is recorded under its step, and assertAll fails the test at the end.
 */
export const createStepChecks = () => {
  const failures: string[] = [];

  return {
    check(step: string, assertion: () => void) {
      try {
        assertion();
      } catch (error) {
        failures.push(`${step}: ${(error as Error).message}`);
      }
    },
    assertAll() {
      cy.then(() => {
        expect(failures, failures.join('\n')).to.have.length(0);
      });
    },
  };
};
