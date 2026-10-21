// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { getElementByField } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';
import { JourneySteps } from '../support/journeySteps';

interface AdResponseItem {
  redirectUrl: string;
  text: string;
}

const TELESCOPE_AD = {
  redirectUrl: '/product/66VCHSJNUP',
  text: 'Starsense Explorer Refractor Telescope for sale. 20% off.',
};

describe('Ads during a visit', () => {
  beforeEach(() => {
    // Ask for a fresh response on every load, so a cached 304 does not hide the ads served.
    cy.intercept('GET', '/api/data*', req => {
      delete req.headers['if-none-match'];
      delete req.headers['if-modified-since'];
    }).as('getAds');
  });

  it('shows the same ad on a product page throughout a visit and ads for every category of a page', () => {
    const steps = new JourneySteps();
    const seen: string[] = [];

    cy.log('Step 1: open a telescope product page');
    cy.visit('/');
    getElementByField(CypressFields.ProductCard).contains('Starsense Explorer Refractor Telescope').click();
    cy.wait('@getAds').then(({ response }) => {
      seen.push(JSON.stringify(response?.body));
      steps.check('Step 1 ads for the telescopes category', () =>
        expect((response?.body as AdResponseItem[]).map(a => a.redirectUrl)).to.deep.eq([TELESCOPE_AD.redirectUrl])
      );
    });
    cy.wait(1000);
    getElementByField(CypressFields.Ad).then($ad => {
      steps.check('Step 1 banner text', () => expect($ad.text()).to.contain(TELESCOPE_AD.text));
      steps.check('Step 1 banner link', () => expect($ad.find('a').attr('href')).to.eq(TELESCOPE_AD.redirectUrl));
    });

    cy.log('Step 2: reload the page three times');
    for (let i = 1; i <= 3; i++) {
      cy.reload();
      cy.wait('@getAds').then(({ response }) => {
        steps.check(`Step 2 reload ${i} ads`, () => expect(JSON.stringify(response?.body)).to.eq(seen[0]));
      });
      cy.wait(1000);
      getElementByField(CypressFields.Ad).then($ad => {
        steps.check(`Step 2 reload ${i} banner text`, () => expect($ad.text()).to.contain(TELESCOPE_AD.text));
        steps.check(`Step 2 reload ${i} banner link`, () =>
          expect($ad.find('a').attr('href')).to.eq(TELESCOPE_AD.redirectUrl)
        );
      });
    }

    cy.log('Step 3: open a product with several categories');
    cy.get('header a[href="/"], nav a[href="/"]').first().click();
    cy.location('pathname').should('eq', '/');
    getElementByField(CypressFields.ProductCard).contains('Optical Tube Assembly').click();
    cy.wait('@getAds').then(({ request, response }) => {
      const url = new URL(request.url);
      const keys = url.searchParams.getAll('contextKeys').flatMap(k => k.split(','));
      const ads = (response?.body as AdResponseItem[]).map(a => a.redirectUrl);
      const expectedByCategory: Record<string, string[]> = {
        accessories: ['/product/0PUK6V6EV0', '/product/6E92ZMYYFZ'],
        telescopes: ['/product/66VCHSJNUP'],
        assembly: ['/product/9SIQT8TOJO'],
      };
      steps.check('Step 3 page asks for its categories', () =>
        expect([...keys].sort()).to.deep.eq(['accessories', 'assembly', 'telescopes'])
      );
      steps.check('Step 3 ads from every category, in order', () =>
        expect(ads).to.deep.eq(keys.flatMap(k => expectedByCategory[k] ?? []))
      );
    });

    steps.assertAllPassed();
  });
});

export {};
