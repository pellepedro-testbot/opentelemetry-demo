// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { getProxyUrl } from '../../utils/Cypress';

const productCatalogRow = () => cy.contains('tr', /^\s*product-catalog\s/);

describe('OpAMP agents page', () => {
  it('shows product-catalog as a healthy agent with its service name', () => {
    cy.log('step 1: product-catalog is listed with health Up');
    cy.visit(`${getProxyUrl()}/opamp/`);
    productCatalogRow().within(() => {
      cy.get('td').eq(0).should('have.text', 'product-catalog');
      cy.get('td').eq(2).should('have.text', 'Up');
    });

    cy.log('step 2: its agent page reports Up: true and service.name product-catalog');
    productCatalogRow().find('a[href^="agent?instanceid="]').click();
    cy.location('pathname').should('eq', '/opamp/agent');
    cy.contains('td', 'Up:').next('td').should('have.text', 'true');
    cy.contains('td', 'service.name').next('td').should('contain', '"product-catalog"');
  });
});

export {};
