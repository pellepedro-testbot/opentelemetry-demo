// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

// Reads the frontend container's stdout, so this spec needs a docker CLI that reaches the running demo.
describe('Storefront API request logging', () => {
  it('logs each API request with its method, path and status', () => {
    const since = new Date(Date.now() - 1000).toISOString();
    cy.request({ url: '/api/products', qs: { currencyCode: 'USD' } }).its('status').should('eq', 200);
    cy.wait(2000);
    cy.task<{ stdout: string; stderr: string }>('docker', ['logs', '--since', since, 'frontend']).then(({ stdout, stderr }) => {
      const entries = `${stdout}\n${stderr}`
        .split('\n')
        .filter(line => line.startsWith('{'))
        .map(line => JSON.parse(line))
        .filter(entry => entry.msg === 'API request completed' && entry['url.path'] === '/api/products');
      expect(entries, 'API request completed entries for /api/products').to.have.length.greaterThan(0);
      expect(entries[0]).to.include({
        'http.request.method': 'GET',
        'url.path': '/api/products',
        'http.response.status_code': 200,
      });
    });
  });
});

export {};
