// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { addItemToCart, emptyCart, getCart, setFlag, uniqueUserId } from '../../utils/CypressStoreApi';

const FLAG_REFRESH_MS = 3000;

describe('Cart failure flag', () => {
  after(() => setFlag('cartFailure', 'off'));

  it('answers cart calls normally while the flag is off', () => {
    setFlag('cartFailure', 'off');
    cy.wait(FLAG_REFRESH_MS);
    const userId = uniqueUserId('cypress-cart-flag-off');

    addItemToCart(userId, '66VCHSJNUP', 2).its('status').should('eq', 200);
    getCart(userId).then(({ status, body }) => {
      expect(status).to.eq(200);
      expect(body.items.map(({ productId, quantity }: { productId: string; quantity: number }) => [productId, quantity])).to.deep.eq([
        ['66VCHSJNUP', 2],
      ]);
    });
    emptyCart(userId).its('status').should('eq', 204);
    getCart(userId).its('body.items').should('have.length', 0);
  });

  it('reports a failed cart call as an error and keeps the stored cart', () => {
    const userId = uniqueUserId('cypress-cart-flag-on');
    addItemToCart(userId, '66VCHSJNUP', 2);

    setFlag('cartFailure', '100%');
    cy.wait(FLAG_REFRESH_MS);

    getCart(userId).then(getResponse => {
      emptyCart(userId).then(deleteResponse => {
        const failed = [getResponse, deleteResponse].filter(({ status }) => status >= 400);
        expect(failed.length, 'cart calls failing with the flag on').to.be.at.least(1);
        failed.forEach(({ status }) => expect(status).to.be.at.least(500));

        setFlag('cartFailure', 'off');
        cy.wait(FLAG_REFRESH_MS);

        if (deleteResponse.status >= 400) {
          getCart(userId).then(({ status, body }) => {
            expect(status).to.eq(200);
            expect(body.items.map(({ productId }: { productId: string }) => productId)).to.deep.eq(['66VCHSJNUP']);
          });
        }
      });
    });
    emptyCart(userId);
  });
});

export {};
