// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { CypressFields } from './enums/CypressFields';

export { CypressFields };

export const getElementByField = (field: CypressFields, context: Cypress.Chainable = cy) =>
  context.get(`[data-cy="${field}"]`);

const FLAGD_READ_URL = '/feature/api/read';
const FLAGD_WRITE_URL = '/feature/api/write';

// Seconds flagd needs to pick up a flag file written through flagd-ui.
export const FLAG_RELOAD_MS = 4000;

export interface IFlagdFlag {
  defaultVariant: string;
  variants: Record<string, unknown>;
  targeting?: { if: unknown[] };
}

export const readFlags = () => cy.request(FLAGD_READ_URL).then(({ body }) => body.flags as Record<string, IFlagdFlag>);

export const setFlag = (flagName: string, defaultVariant: string) => {
  cy.request('GET', FLAGD_READ_URL).then(({ body }) => {
    body.flags[flagName].defaultVariant = defaultVariant;

    cy.request('POST', FLAGD_WRITE_URL, { data: body });
  });
};

// The variant select the flagd-ui Basic dashboard renders for a flag (it has no label).
export const flagSelect = (flagName: string, options?: Partial<Cypress.Timeoutable>) =>
  cy.get(`select[name="${flagName}"]`, options);
