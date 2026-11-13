// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { getElementByField } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

const srcsetUrls = (srcset = '') =>
  srcset
    .split(',')
    .map(entry => entry.trim().split(' ')[0])
    .filter(Boolean);

// A double slash that is not the one after a URL scheme, e.g. "//images" or "x//images".
const DOUBLE_SLASH_IMAGES = /(^|[^:])\/\/images/;

const PRODUCT_NAME = 'Solar System Color Imager';

// Product pictures rendered through next/image (and so through utils/imageLoader.js) are the
// ones in the cart dropdown and on the order confirmation; the product cards use a fetched blob.
const openCartDropdownWithProduct = () => {
  cy.visit('/product/0PUK6V6EV0');
  getElementByField(CypressFields.ProductAddToCart).click();
  cy.location('pathname').should('eq', '/cart');
  getElementByField(CypressFields.CartIcon).click({ force: true });
  return getElementByField(CypressFields.CartDropdown).find(`img[alt="${PRODUCT_NAME}"]`);
};

describe('Storefront images and platform badge', () => {
  it('server-renders next/image URLs relative to the page origin', () => {
    cy.request('/').then(({ body }: { body: string }) => {
      // Every src/srcset attribute value holding a "?w=" width query, i.e. one next/image built.
      const urls = [...body.matchAll(/(?:src|srcSet|srcset)="([^"]*\?w=[^"]*)"/g)].flatMap(([, value]) =>
        srcsetUrls(value.replace(/&amp;/g, '&'))
      );
      expect(urls).to.have.length.greaterThan(0);
      urls.forEach(url => {
        expect(url).to.match(/^\/[^/]/);
        expect(url).not.to.contain('localhost:8080');
        expect(url).not.to.contain('http://');
      });
    });
  });

  it('renders product images with relative image-provider URLs', () => {
    openCartDropdownWithProduct().should($img => {
      const urls = [$img.attr('src') || '', ...srcsetUrls($img.attr('srcset'))];
      urls.forEach(url => {
        expect(url).to.match(/^\/images\/products\/[^?]+\?w=\d+&q=75$/);
        expect(url).not.to.contain('localhost:8080');
        expect(url).not.to.contain('http://');
        expect(url).not.to.contain('//images');
      });
    });
  });

  it('loads product images from the page origin', () => {
    openCartDropdownWithProduct().should($img => {
      const img = $img[0] as HTMLImageElement;
      expect(img.naturalWidth).to.be.greaterThan(0);
      expect(new URL(img.currentSrc).origin).to.eq(window.location.origin);
    });
  });

  it('never renders a double slash in an image URL', () => {
    openCartDropdownWithProduct().should('have.length', 1);
    cy.get('img').each($img => {
      [$img.attr('src') || '', ...srcsetUrls($img.attr('srcset'))].forEach(url => {
        expect(url).not.to.match(DOUBLE_SLASH_IMAGES);
      });
    });
  });

  it('shows the platform badge after hydration without a hydration error', () => {
    cy.visit('/', {
      onBeforeLoad(win) {
        cy.spy(win.console, 'error').as('consoleError');
      },
    });
    getElementByField(CypressFields.ProductCard).should('have.length', 10);
    cy.contains('footer div', /^local$/).should('be.visible');
    cy.get('@consoleError').should(spy => {
      const messages = (spy as unknown as sinon.SinonSpy).getCalls().map(call => call.args.join(' '));
      messages.forEach(message => {
        expect(message).not.to.contain('Hydration failed');
        expect(message).not.to.contain('did not match');
      });
    });
  });
});

export {};
