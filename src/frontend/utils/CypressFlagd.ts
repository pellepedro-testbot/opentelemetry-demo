// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

// Feature-flag helpers for Cypress specs: flags are read and written through
// flagd-ui's API, the same document the /feature UI edits.

export const FLAGD_READ_URL = '/feature/api/read';
export const FLAGD_WRITE_URL = '/feature/api/write';
export const FLAGD_RESOLVE_URL = '/flagservice/flagd.evaluation.v1.Service';

type FlagDocument = { flags: Record<string, { defaultVariant: string; [key: string]: unknown }> };

export const readFlags = () => cy.request<FlagDocument>('GET', FLAGD_READ_URL).its('body');

export const writeFlags = (document: FlagDocument) => cy.request('POST', FLAGD_WRITE_URL, { data: document });

// flagd picks up the written flag file a moment later, so callers get the new variant after a short wait.
export const setFlagVariant = (flagName: string, variant: string) =>
  readFlags().then(document => {
    document.flags[flagName].defaultVariant = variant;
    writeFlags(document);
    cy.wait(2000);
  });

// Re-reads the flag document until `flagName` reports `variant`, for up to `timeoutMs`.
export const waitForFlagVariant = (flagName: string, variant: string, timeoutMs = 5000, startedAt = Date.now()) =>
  readFlags().then((document): unknown => {
    const current = document.flags[flagName].defaultVariant;
    if (current === variant || Date.now() - startedAt > timeoutMs) {
      expect(current, `${flagName} default variant`).to.eq(variant);
      return;
    }
    return cy.wait(500).then(() => waitForFlagVariant(flagName, variant, timeoutMs, startedAt));
  });
