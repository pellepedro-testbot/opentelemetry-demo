// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { getElementByField } from '../../utils/Cypress';
import { Journey } from '../../utils/CypressJourney';
import { CypressFields } from '../../utils/enums/CypressFields';

const UNKNOWN_PATH = '/this-page-does-not-exist';

describe('Not found page', () => {
  it('follows a broken link to the 404 page and back to the homepage', () => {
    const journey = new Journey();

    journey.step('1. open an unknown URL', () => {
      cy.request({ url: UNKNOWN_PATH, failOnStatusCode: false }).then(({ status }) => {
        if (status !== 404) journey.fail(`status ${status}, expected 404`);
      });
      cy.visit(UNKNOWN_PATH, { failOnStatusCode: false });
      cy.title().then(title => {
        if (title !== 'Otel Demo - Page Not Found') journey.fail(`title "${title}"`);
      });
      journey.expectSoon(
        'page shows 404 and "This page could not be found."',
        $body => $body.text(),
        text => text.includes('404') && text.includes('This page could not be found.')
      );
    });

    journey.step('2. go to the homepage', () => {
      cy.contains('a', 'Go to homepage').should('have.attr', 'href', '/').click();
      cy.location('pathname').should('eq', '/');
      getElementByField(CypressFields.ProductList).should('be.visible');
    });

    journey.finish();
  });
});

export {};
