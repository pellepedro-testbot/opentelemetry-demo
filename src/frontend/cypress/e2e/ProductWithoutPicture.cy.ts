// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { getElementByField } from '../../utils/Cypress';
import { productCardNamed } from '../../utils/CypressStorefront';
import { CypressFields } from '../../utils/enums/CypressFields';

const PRODUCT_ID = `CYNOPIC${Date.now()}`;
const PRODUCT_NAME = `Pictureless Star Chart ${PRODUCT_ID}`;

const psql = (sql: string) => cy.task('astronomyDbSql', sql);

describe('Product without a picture', () => {
  before(() => {
    psql(
      'INSERT INTO catalog.products (id, name, description, picture, price_currency_code, price_units, price_nanos, categories) ' +
        `VALUES ('${PRODUCT_ID}', '${PRODUCT_NAME}', 'A product without a picture.', '', 'USD', 10, 0, 'accessories')`
    );
  });

  after(() => {
    psql(`DELETE FROM catalog.products WHERE id = '${PRODUCT_ID}'`);
  });

  it('renders the product, its card and its cart line without a broken image', () => {
    const emptyImageRequests: string[] = [];
    const pageErrors: string[] = [];
    cy.on('uncaught:exception', err => {
      pageErrors.push(err.message);
      return false;
    });
    cy.intercept({ method: 'GET', pathname: '/images/products/' }, req => {
      emptyImageRequests.push(req.url);
    });

    cy.visit('/');
    productCardNamed(PRODUCT_NAME).should('be.visible').click();

    cy.location('pathname').should('eq', `/product/${PRODUCT_ID}`);
    getElementByField(CypressFields.ProductName).should('have.text', PRODUCT_NAME);
    getElementByField(CypressFields.ProductPicture).should('not.exist');

    cy.intercept('GET', '/api/cart*').as('getCart');
    getElementByField(CypressFields.ProductAddToCart).click();
    cy.location('pathname').should('eq', '/cart');
    cy.wait('@getCart');
    cy.contains('main a', PRODUCT_NAME).should('be.visible');
    cy.get('main').then($main => {
      const sources = $main
        .find(`a[href="/product/${PRODUCT_ID}"] img`)
        .map((_, img) => img.getAttribute('src') ?? '')
        .get();
      // An image source that stops at the products folder, without a file name.
      expect(
        sources.filter(src => /\/images\/products\/$/.test(src)),
        'cart line image sources'
      ).to.deep.eq([]);
    });

    cy.wait(1000).then(() => {
      expect(emptyImageRequests, 'requests for /images/products/ without a file name').to.deep.eq([]);
      expect(pageErrors, 'uncaught page errors').to.deep.eq([]);
    });
  });
});

export {};
