// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { getElementByField } from '../../utils/Cypress';
import { Journey } from '../../utils/CypressJourney';
import { productCardNamed } from '../../utils/CypressStorefront';
import { CypressFields } from '../../utils/enums/CypressFields';

const storedSession = (win: Cypress.AUTWindow) => {
  try {
    return JSON.parse(win.localStorage.getItem('session') ?? '');
  } catch {
    return null;
  }
};

const visitWithStoredSession = (session: string) =>
  cy.visit('/', {
    onBeforeLoad(win) {
      win.localStorage.setItem('session', session);
    },
  });

describe('Stored session', () => {
  it('replaces a stored session that is not valid JSON', () => {
    const pageErrors: string[] = [];
    cy.on('uncaught:exception', err => {
      pageErrors.push(err.message);
      return false;
    });

    visitWithStoredSession('not-json');

    getElementByField(CypressFields.ProductList).should('be.visible');
    getElementByField(CypressFields.ProductCard).should('have.length', 10);
    cy.window().then(win => {
      const session = storedSession(win);
      expect(session, 'stored session').to.be.an('object');
      expect(session.userId).to.be.a('string').and.have.length.greaterThan(0);
      expect(session.currencyCode).to.eq('USD');
    });
    cy.then(() => expect(pageErrors, 'uncaught page errors').to.deep.eq([]));
  });

  it('replaces a stored session without a currency with a USD session', () => {
    const productRequestCurrencies: string[] = [];
    cy.intercept('GET', '/api/products*', req => {
      productRequestCurrencies.push(String(new URL(req.url).searchParams.get('currencyCode')));
    });

    visitWithStoredSession(JSON.stringify({ userId: `legacy-user-${Date.now()}` }));

    getElementByField(CypressFields.ProductCard).should('have.length', 10).first().should('contain', '$');
    cy.window().then(win => {
      expect(storedSession(win)).to.have.property('currencyCode', 'USD');
    });
    cy.wait(1000).then(() => {
      expect(productRequestCurrencies, 'currencyCode of /api/products requests').to.not.include('undefined');
    });
  });

  it('comes back with a damaged or old session and keeps a working cart', () => {
    const journey = new Journey();
    const pageErrors: string[] = [];
    const productRequestCurrencies: string[] = [];
    cy.on('uncaught:exception', err => {
      pageErrors.push(err.message);
      return false;
    });

    journey.step('1. open the store with a stored session that is not JSON', () => {
      visitWithStoredSession('not-json');
      journey.expectSoon(
        'product list is shown',
        $body => $body.find(`[data-cy="${CypressFields.ProductList}"] [data-cy="${CypressFields.ProductCard}"]`).length,
        count => count === 10
      );
      journey.expectSoon(
        'no uncaught page error',
        () => [...pageErrors],
        errors => errors.length === 0,
        1000
      );
      cy.window().then(win => {
        const session = storedSession(win);
        if (!session || typeof session.userId !== 'string' || session.currencyCode !== 'USD') {
          journey.fail(`stored session is not a valid USD session: ${win.localStorage.getItem('session')}`);
        }
      });
    });

    journey.step('2. open the store with an old session without a currency', () => {
      cy.intercept('GET', '/api/products*', req => {
        productRequestCurrencies.push(String(new URL(req.url).searchParams.get('currencyCode')));
      });
      visitWithStoredSession(JSON.stringify({ userId: `legacy-user-${Date.now()}` }));
      getElementByField(CypressFields.ProductList).should('be.visible');
      journey.expectSoon(
        'prices show in dollars',
        $body => $body.find(`[data-cy="${CypressFields.ProductCard}"]`).first().text(),
        text => text.includes('$')
      );
      journey.expectSoon(
        '/api/products requests never carry currencyCode=undefined',
        () => [...productRequestCurrencies],
        codes => !codes.includes('undefined'),
        1000
      );
    });

    journey.step('3. add the Solar Filter to the cart', () => {
      cy.intercept('GET', '/api/cart*').as('getCart');
      productCardNamed('Solar Filter').click();
      getElementByField(CypressFields.ProductAddToCart).click();
      cy.location('pathname').should('eq', '/cart');
      cy.wait('@getCart');
      cy.contains('main a', 'Solar Filter').should('be.visible');
    });

    journey.step('4. reload the cart', () => {
      cy.reload();
      cy.contains('main a', 'Solar Filter').should('be.visible');
    });

    journey.finish();
  });
});

export {};
