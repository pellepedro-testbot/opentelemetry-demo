// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { CypressFields } from './enums/CypressFields';

export { CypressFields };

export const getElementByField = (field: CypressFields, context: Cypress.Chainable = cy) =>
  context.get(`[data-cy="${field}"]`);

// The flag editor (/feature), OpAMP (/opamp) and flagd are routed by the frontend proxy, not the
// frontend itself, so they are reached through the exposed FRONTEND_PROXY_URL when baseUrl is the frontend.
export const getProxyUrl = (): string =>
  (Cypress.expose('FRONTEND_PROXY_URL') as string | undefined) || Cypress.config('baseUrl') || '';

type FlagConfig = { flags: Record<string, Record<string, unknown>> };

export const updateFlags = (change: (config: FlagConfig) => void) =>
  cy.request<FlagConfig>('GET', `${getProxyUrl()}/feature/api/read`).then(({ body }) => {
    change(body);
    cy.request('POST', `${getProxyUrl()}/feature/api/write`, { data: body });
  });

export const setFlagVariant = (flagName: string, defaultVariant: string) =>
  updateFlags(config => {
    config.flags[flagName].defaultVariant = defaultVariant;
  });
