// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { CypressFields } from './enums/CypressFields';

export { CypressFields };

export const getElementByField = (field: CypressFields, context: Cypress.Chainable = cy) =>
  context.get(`[data-cy="${field}"]`);

export const getStoredSession = () =>
  cy
    .window()
    .then(win => JSON.parse(win.localStorage.getItem('session') || '{}') as { userId?: string; currencyCode?: string });

export const emptyStoredSessionCart = () => {
  cy.window().then(win => {
    try {
      const { userId } = JSON.parse(win.localStorage.getItem('session') || '{}');
      if (userId) cy.request({ method: 'DELETE', url: '/api/cart', body: { userId }, failOnStatusCode: false });
    } catch {
      // a session that does not parse has no cart to empty
    }
  });
};

export const createJourney = () => {
  let currentStep = '';
  const failedChecks: string[] = [];

  cy.on('fail', error => {
    const earlier = failedChecks.length ? `\nEarlier failed checks:\n${failedChecks.join('\n')}` : '';
    error.message = `${currentStep}: ${error.message}${earlier}`;
    throw error;
  });

  return {
    step(name: string, actions: () => void) {
      cy.then(() => {
        currentStep = name;
      });
      cy.log(name);
      actions();
    },
    check(assertion: () => void) {
      try {
        assertion();
      } catch (error) {
        failedChecks.push(`${currentStep}: ${(error as Error).message}`);
      }
    },
    verify() {
      cy.then(() => {
        const failed = failedChecks.splice(0);
        expect(failed.join('\n'), 'failed checks').to.eq('');
      });
    },
  };
};
