// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { CypressFields } from './enums/CypressFields';

export { CypressFields };

export const getElementByField = (field: CypressFields, context: Cypress.Chainable = cy) =>
  context.get(`[data-cy="${field}"]`);

export const journeySteps = () => {
  const failures: string[] = [];

  return {
    check(step: string, fn: () => void) {
      try {
        fn();
      } catch (error) {
        failures.push(`${step}: ${(error as Error).message}`);
      }
    },
    assertAll() {
      expect(failures, `failed steps:\n${failures.join('\n')}`).to.have.length(0);
    },
  };
};
