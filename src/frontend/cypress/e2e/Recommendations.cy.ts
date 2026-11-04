// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { newUserId } from '../../utils/CypressStoreApi';

const TELESCOPE_ID = '66VCHSJNUP';

describe('Recommendations API', () => {
  it('never recommends a product named in the request', () => {
    const sessionId = newUserId('cypress-recommendations');
    for (let call = 1; call <= 10; call++) {
      cy.request({
        url: '/api/recommendations',
        qs: { productIds: TELESCOPE_ID, sessionId, currencyCode: 'USD' },
      }).then(({ status, body }) => {
        expect(status).to.eq(200);
        expect(body).to.be.an('array').and.have.length.greaterThan(0);
        expect(body.map((p: { id: string }) => p.id), `recommendations of call ${call}`).not.to.include(TELESCOPE_ID);
      });
    }
  });
});

export {};
