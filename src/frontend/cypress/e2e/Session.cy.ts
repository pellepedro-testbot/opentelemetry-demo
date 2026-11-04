// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { getCartRow, getElementByField, getProductCard, getStoredSession } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';
import { emptyCart, getCart } from '../../utils/CypressStoreApi';

/** Matches a version 1 to 5 UUID such as uuid's v4() produces. */
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const expectFreshSessionAndProducts = () => {
  getElementByField(CypressFields.ProductCard, getElementByField(CypressFields.ProductList)).should('have.length', 10);
  getStoredSession().should(session => {
    expect(session?.userId).to.be.a('string').and.match(UUID);
    expect(session?.currencyCode).to.eq('USD');
  });
};

describe('Stored session', () => {
  it('writes a new USD session on the first visit', () => {
    cy.clearLocalStorage();
    cy.visit('/');
    expectFreshSessionAndProducts();
    getElementByField(CypressFields.ProductCard).first().find(`[data-cy="${CypressFields.ProductPrice}"]`).should('contain', '$');
  });

  it('reuses a valid stored session after a reload', () => {
    cy.intercept('POST', '/api/cart*').as('addToCart');
    cy.visit('/');
    getStoredSession().then(session => {
      const userId = session!.userId;
      getProductCard('66VCHSJNUP').click();
      getElementByField(CypressFields.ProductAddToCart).click();
      cy.wait('@addToCart');
      cy.location('pathname').should('eq', '/cart');

      cy.reload();
      getStoredSession().its('userId').should('eq', userId);
      getCartRow('66VCHSJNUP').should('have.length', 1);
      getCart(userId).then(({ body }) => {
        expect(body.items.map(({ productId }: { productId: string }) => productId)).to.deep.eq(['66VCHSJNUP']);
      });
      emptyCart(userId);
    });
  });

  ['not-json', '{"foo":1}'].forEach(stored => {
    it(`replaces an unusable stored session (${stored}) and shows the shop`, () => {
      cy.visit('/', {
        onBeforeLoad(win) {
          win.localStorage.setItem('session', stored);
        },
      });
      expectFreshSessionAndProducts();
    });
  });
});

export {};
