// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

const agentRow = (name: string) => cy.contains('td', new RegExp(`^${name}$`)).parent('tr');

describe('OpAMP server', () => {
  it('lists cart and product-catalog as healthy agents', () => {
    cy.visit('/opamp/');
    cy.contains('h2', 'Agents').should('be.visible');
    ['cart', 'product-catalog'].forEach(name => {
      agentRow(name).find('td').eq(2).should('have.text', 'Up');
    });
  });
});

export {};
