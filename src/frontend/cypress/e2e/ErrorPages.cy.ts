// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { getElementByField } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';
import { createJourney } from '../../utils/CypressJourney';

describe('Error pages', () => {
  it('hits a missing page and gets back home', () => {
    const journey = createJourney();

    journey.step('Step 1: open a page that does not exist', () => {
      cy.request({ url: '/no-such-page', failOnStatusCode: false }).then(({ status }) =>
        journey.record('HTTP status', status === 404, `got ${status}`)
      );
      cy.visit('/no-such-page', { failOnStatusCode: false });
      cy.title().then(title =>
        journey.record('page title', title === 'Otel Demo - Page Not Found', `got ${JSON.stringify(title)}`)
      );
      journey.check('404 heading', $b => $b.find('*').filter((_, el) => el.children.length === 0 && el.textContent === '404').length, 1);
      journey.check('message', $b => $b.text().includes('This page could not be found.'), true);
      journey.check('home link', $b => $b.find('a').filter((_, el) => el.textContent === 'Go to homepage').attr('href'), '/');
    });

    journey.step('Step 2: follow the link home', () => {
      cy.contains('a', 'Go to homepage').click();
      cy.location('pathname').should('eq', '/');
      journey.check(
        'product cards on the home page',
        $b => $b.find(`[data-cy="${CypressFields.ProductList}"] [data-cy="${CypressFields.ProductCard}"]`).length,
        10
      );
    });

    journey.finish();
    getElementByField(CypressFields.HomePage).should('exist');
  });
});

export {};
