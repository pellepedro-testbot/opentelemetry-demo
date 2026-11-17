// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

const COLLECTOR_INSTANCE_ID = '00000000-0000-7000-8000-000000000001';

const agentRow = (name: string) => cy.contains('td', new RegExp(`^\\s*${name}\\s*$`)).parent('tr');

describe('OpAMP agents through the storefront proxy', () => {
  it('browses the agent list, the collector page and back without leaving /opamp/', () => {
    cy.log('Step 1: open /opamp');
    cy.visit('/opamp');
    cy.location('pathname').should('eq', '/opamp/');
    ['otelcol-contrib', 'cart', 'product-catalog'].forEach(name => agentRow(name).should('contain', 'Up'));

    cy.log("Step 2: open the collector's agent page");
    cy.contains('a', COLLECTOR_INSTANCE_ID).click();
    cy.location('pathname').should('eq', '/opamp/agent');
    cy.location('search').should('eq', `?instanceid=${COLLECTOR_INSTANCE_ID}`);
    cy.contains('td', 'demo.collector.role').next('td').should('contain', 'gateway');
    cy.contains('td', 'deployment.environment.name').next('td').should('contain', 'demo');
    cy.contains('Effective Configuration').should('exist');
    cy.get('body').should('contain', 'otlp_grpc/jaeger');
    cy.get('body').should('not.contain', 'OpAMP Connection Settings');
    cy.get('body').should('not.contain', 'Custom Messages');

    cy.log('Step 3: go back to the agent list');
    cy.contains('a', 'Back to Agents List').click();
    cy.location('pathname').should('eq', '/opamp/');

    cy.log("Step 4: open product-catalog's agent page");
    agentRow('product-catalog').find('a').click();
    cy.location('pathname').should('eq', '/opamp/agent');
    cy.location('search').should('match', /^\?instanceid=[0-9a-f-]+$/);
    cy.contains('td', /^service\.name$/)
      .next('td')
      .should('contain', '"product-catalog"');
  });
});

export {};
