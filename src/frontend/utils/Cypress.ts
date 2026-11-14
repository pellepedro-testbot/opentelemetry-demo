// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { CypressFields } from './enums/CypressFields';

export { CypressFields };

export const getElementByField = (field: CypressFields, context: Cypress.Chainable = cy) =>
  context.get(`[data-cy="${field}"]`);

export const setFlag = (flagName: string, defaultVariant: string) => {
  cy.request('GET', '/feature/api/read').then(({ body }) => {
    body.flags[flagName].defaultVariant = defaultVariant;

    cy.request('POST', '/feature/api/write', { data: body });
  });
};
