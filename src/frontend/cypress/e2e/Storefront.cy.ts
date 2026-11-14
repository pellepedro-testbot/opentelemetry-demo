// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import getSymbolFromCurrency from 'currency-symbol-map';
import { getElementByField, NON_EMPTY_CSS_URL, productCardImageUrl } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

const productCards = () => getElementByField(CypressFields.ProductCard, getElementByField(CypressFields.ProductList));

describe('Storefront home page', () => {
  it('lists the catalog products as cards with image, name and price', () => {
    cy.intercept('GET', '/api/products*').as('getProducts');
    cy.visit('/');
    cy.wait('@getProducts').then(({ response }) => {
      const names: string[] = response?.body.map(({ name }: { name: string }) => name);
      expect(names).to.have.length(10);
      productCards().should('have.length', 10);
      names.forEach(name => {
        productCards().filter(`:contains("${name}")`).should('have.length', 1);
      });
    });
    productCards().each(card => {
      cy.wrap(card)
        .find(`[data-cy="${CypressFields.ProductPrice}"]`)
        .invoke('text')
        .should('match', /^\$ \d+\.\d{2}$/);
    });
    productCards().should(cards => {
      cards.each((_, card) => {
        expect(productCardImageUrl(card)).to.match(NON_EMPTY_CSS_URL);
      });
    });
  });

  it('defers product images outside the viewport until they are scrolled into view', () => {
    cy.viewport(1000, 600);
    cy.intercept('GET', '/images/products/**').as('img');
    cy.visit('/');
    productCards().should('have.length', 10);
    cy.wait(2000);
    cy.get('@img.all').should('have.length.lessThan', 10);

    cy.scrollTo('bottom', { duration: 1000 });
    productCards().last().scrollIntoView();
    cy.wait(2000);
    cy.get('@img.all').then(requests => {
      const urls = new Set((requests as unknown as { request: { url: string } }[]).map(({ request }) => request.url));
      expect(urls.size).to.eq(10);
    });
  });

  it('shows every product image once its card is visible', () => {
    cy.viewport(1000, 600);
    cy.intercept('GET', '/images/products/**').as('img');
    cy.visit('/');
    productCards().should('have.length', 10);
    productCards().each(card => {
      cy.wrap(card).scrollIntoView();
    });
    productCards().should(cards => {
      cards.each((_, card) => {
        expect(productCardImageUrl(card)).to.match(NON_EMPTY_CSS_URL);
      });
    });
    cy.get('@img.all').then(requests => {
      const statuses = (requests as unknown as { response?: { statusCode: number } }[]).map(
        ({ response }) => response?.statusCode
      );
      expect(statuses).to.have.length.at.least(10);
      statuses.forEach(status => expect(status).to.eq(200));
    });
  });

  it('lists the supported currencies once each in alphabetical order', () => {
    cy.request('/api/currency').then(({ body }) => {
      const sorted = [...(body as string[])].sort();
      cy.visit('/');
      getElementByField(CypressFields.CurrencySwitcher)
        .find('option')
        .should('have.length', sorted.length)
        .then(options => {
          const values = Array.from(options, option => (option as HTMLOptionElement).value);
          expect(values).to.deep.eq(sorted);
          expect(new Set(values).size).to.eq(values.length);
        });
    });
  });

  it('selects the currency chosen from the list', () => {
    cy.visit('/');
    productCards().should('have.length', 10);
    ['EUR', 'JPY'].forEach(currencyCode => {
      getElementByField(CypressFields.CurrencySwitcher).select(currencyCode);
      getElementByField(CypressFields.CurrencySwitcher).should('have.value', currencyCode);
      productCards().each(card => {
        cy.wrap(card).should('contain', getSymbolFromCurrency(currencyCode));
      });
    });
  });
});

describe('Not found page', () => {
  it('shows the 404 page with a link back to the product list', () => {
    cy.request({ url: '/no-such-page', failOnStatusCode: false }).its('status').should('eq', 404);
    cy.visit('/no-such-page', { failOnStatusCode: false });
    cy.contains('404').should('be.visible');
    cy.contains('This page could not be found.').should('be.visible');

    cy.contains('a', 'Go to homepage').click();
    cy.location('pathname').should('eq', '/');
    getElementByField(CypressFields.HomePage).should('exist');
    productCards().should('have.length', 10);
  });
});

export {};
