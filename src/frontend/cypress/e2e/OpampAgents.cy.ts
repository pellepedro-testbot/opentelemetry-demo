// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

const agentRow = (name: string) => cy.contains('tr', new RegExp(`^\\s*${name}\\s`));

const assertHealthyAgent = (name: string) =>
  agentRow(name).within(() => {
    cy.contains('td', new RegExp(`^\\s*${name}\\s*$`)).should('be.visible');
    cy.contains('td', /^Up$/).should('be.visible');
  });

describe('OpAMP server agents', () => {
  beforeEach(() => {
    cy.visit('/opamp/');
    cy.title().should('eq', 'OpAMP Server');
  });

  it('lists cart as a healthy agent', () => {
    assertHealthyAgent('cart');
  });

  it('lists product-catalog as a healthy agent', () => {
    assertHealthyAgent('product-catalog');
  });

  it('lists otelcol-contrib as a healthy agent', () => {
    assertHealthyAgent('otelcol-contrib');
  });
});

export {};
