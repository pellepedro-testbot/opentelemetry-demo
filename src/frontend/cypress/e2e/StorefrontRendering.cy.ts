// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { getElementByField } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

const CART_ICON_SRC = /^\/icons\/Cart\.svg\?w=\d+&q=75$/;

describe('Storefront rendering', () => {
  it('serves next/image sources as same-origin relative URLs in SSR and in the browser', () => {
    cy.request('/product/OLJCESPC7Z').then(({ body }) => {
      const doc = new DOMParser().parseFromString(body as string, 'text/html');
      const ssrSrc = doc.querySelector('img[alt="cart"]')?.getAttribute('src') ?? '';
      expect(ssrSrc).to.match(CART_ICON_SRC);

      cy.visit('/product/OLJCESPC7Z');
      getElementByField(CypressFields.ProductAddToCart)
        .find('img[alt="cart"]')
        .should('have.attr', 'src', ssrSrc)
        .and($img => {
          expect(($img[0] as HTMLImageElement).naturalWidth).to.be.greaterThan(0);
        });
      cy.request(ssrSrc).its('status').should('eq', 200);
    });
  });

  it('shows the platform from window.ENV in the footer without a hydration error', () => {
    const consoleErrors: string[] = [];
    cy.visit('/', {
      onBeforeLoad(win) {
        const original = win.console.error.bind(win.console);
        win.console.error = (...args: unknown[]) => {
          consoleErrors.push(args.map(String).join(' '));
          original(...args);
        };
      },
    });
    getElementByField(CypressFields.ProductList).should('be.visible');
    cy.window().then(win => {
      const platform = (win as unknown as { ENV: { NEXT_PUBLIC_PLATFORM: string } }).ENV.NEXT_PUBLIC_PLATFORM;
      expect(platform).to.eq('local');
      cy.get('footer')
        .contains(new RegExp(`^${platform}$`))
        .should('be.visible');
    });
    cy.wrap(consoleErrors).should(errors => {
      expect(errors.filter(e => /hydrat|#418|#423|#425/i.test(e))).to.be.empty;
    });
  });
});

export {};
