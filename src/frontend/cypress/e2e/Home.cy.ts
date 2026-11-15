// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import getSymbolFromCurrency from 'currency-symbol-map';
import SessionGateway from '../../gateways/Session.gateway';
import { getElementByField } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

describe('Home Page', () => {
  it('should validate the home page', () => {
    cy.visit('/');
    getElementByField(CypressFields.HomePage).should('exist');
    getElementByField(CypressFields.ProductCard, getElementByField(CypressFields.ProductList)).should('have.length', 10);

    getElementByField(CypressFields.SessionId).should('contain', SessionGateway.getSession().userId);
  });

  it('should change currency', () => {
    cy.visit('/');
    getElementByField(CypressFields.CurrencySwitcher).select('EUR');
    getElementByField(CypressFields.ProductCard, getElementByField(CypressFields.ProductList)).should('have.length', 10);

    getElementByField(CypressFields.CurrencySwitcher).should('have.value', 'EUR');

    getElementByField(CypressFields.ProductCard).should('contain', getSymbolFromCurrency('EUR'));
  });

  it('serves image URLs relative to the page origin in the server-rendered HTML and after hydration', () => {
    cy.request('/').then(({ body }) => {
      const html = new DOMParser().parseFromString(body, 'text/html');
      const images = [...html.querySelectorAll('img[data-nimg]')];
      expect(images, 'next/image images').to.not.be.empty;
      images.forEach(image => {
        const src = image.getAttribute('src') || '';
        const srcset = image.getAttribute('srcset') || '';
        // A same-origin path followed by the loader's width and quality: "/icons/CartIcon.svg?w=48&q=75".
        expect(src).to.match(/^\/[^/][^?]*\?w=\d+&q=\d+$/);
        srcset.split(',').forEach(candidate => expect(candidate.trim()).to.match(/^\/[^/]/));
        expect(`${src} ${srcset}`).to.not.contain('localhost:8080').and.not.contain('http://');
      });
    });

    cy.visit('/');
    cy.get('img[data-nimg]').each($image => {
      expect($image.attr('src')).to.match(/^\/[^/][^?]*\?w=\d+&q=\d+$/);
      expect($image.attr('src')).to.not.contain('localhost:8080');
    });
  });

  it('shows the configured platform in the footer badge', () => {
    cy.visit('/');
    cy.get('footer').contains(/^local$/).should('be.visible');
  });

  it('should recover corrupted stored session', () => {
    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.setItem('session', 'not}{valid-json');
      },
    });
    getElementByField(CypressFields.SessionId).should('contain', SessionGateway.getSession().userId);
  });
});
