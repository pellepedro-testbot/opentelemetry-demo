// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import {
  addOpenProductToCart,
  getCartRow,
  getElementByField,
  getProductCardByName,
  StepChecks,
} from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

const EXPLORASCOPE = 'National Park Foundation Explorascope';
const ROOF_BINOCULARS = { id: '2ZYFJ3GM2N', name: 'Roof Binoculars' };

// Matches any request path under /images/products/, on any host.
const PRODUCT_IMAGE = /\/images\/products\//;

const stripPictures = () => {
  cy.intercept('GET', '/api/products/*', req => {
    req.continue(res => {
      delete res.body.picture;
    });
  });
  cy.intercept('GET', '/api/cart*', req => {
    req.continue(res => {
      (res.body.items || []).forEach((item: { product?: { picture?: string } }) => {
        delete item.product?.picture;
      });
    });
  });
  const undefinedImageRequests: string[] = [];
  cy.intercept('GET', '/images/products/undefined', req => {
    undefinedImageRequests.push(req.url);
  });
  return undefinedImageRequests;
};

const lazyProductImages = ($list: JQuery<HTMLElement>) => {
  const images = [...$list.find('[alt]')];
  return images.length > 0 && images.every(img => img.getAttribute('loading') === 'lazy');
};

const countImageRequests = () => {
  const requests: string[] = [];
  cy.intercept({ method: 'GET', url: PRODUCT_IMAGE }, req => {
    requests.push(req.url);
  });
  return requests;
};

const recommendedNames = () =>
  getElementByField(CypressFields.ProductCard, getElementByField(CypressFields.RecommendationList))
    .should('have.length', 4)
    .then($cards => [...$cards].map(card => card.innerText));

describe('Browsing the storefront', () => {
  it('only fetches product images near the viewport', () => {
    cy.viewport(1280, 500);
    const requests = countImageRequests();
    cy.visit('/');
    getElementByField(CypressFields.ProductCard).should('have.length', 10);
    cy.wait(2000);
    cy.then(() => requests.length).then(before => {
      cy.scrollTo('bottom');
      cy.wait(2000);
      getElementByField(CypressFields.ProductList).then($list => {
        const allLazy = lazyProductImages($list);
        const deferred = before < 10 && requests.length === 10;
        expect(
          deferred || allLazy,
          `image requests before scrolling: ${before}, after: ${requests.length}, all imgs lazy: ${allLazy}`
        ).to.eq(true);
      });
    });
  });

  it('shows no picture and requests no undefined image for a product without a picture', () => {
    const undefinedImageRequests = stripPictures();
    cy.visit('/');
    getProductCardByName(ROOF_BINOCULARS.name).click();
    getElementByField(CypressFields.ProductName).should('have.text', ROOF_BINOCULARS.name);
    getElementByField(CypressFields.ProductPicture).should('not.exist');

    addOpenProductToCart();
    getCartRow(ROOF_BINOCULARS.id).should('have.length', 1);
    getElementByField(CypressFields.CartIcon).click({ force: true });
    getElementByField(CypressFields.CartDropdownItem).should('have.length', 1);
    cy.wait(1000);

    cy.then(() => expect(undefinedImageRequests).to.have.length(0));
  });

  it('never recommends the product being viewed', () => {
    cy.visit('/');
    getProductCardByName(EXPLORASCOPE).click();
    getElementByField(CypressFields.ProductName).should('have.text', EXPLORASCOPE);
    for (let i = 0; i < 5; i++) {
      if (i > 0) cy.reload();
      recommendedNames().then(names => {
        expect(names.join(' | ')).not.to.contain(EXPLORASCOPE);
      });
    }
  });

  it('shows the 404 page for an unknown route and links back home', () => {
    cy.request({ url: '/no-such-page', failOnStatusCode: false }).its('status').should('eq', 404);
    cy.visit('/no-such-page', { failOnStatusCode: false });
    cy.contains('404').should('be.visible');
    cy.contains('This page could not be found.').should('be.visible');
    cy.contains('Go to homepage').click();
    cy.location('pathname').should('eq', '/');
    getElementByField(CypressFields.ProductCard, getElementByField(CypressFields.ProductList)).should(
      'have.length',
      10
    );
  });

  it('loads product images from the origin the storefront is reached at', () => {
    const origin = String(Cypress.config('baseUrl')).replace('localhost', '127.0.0.1').replace(/\/$/, '');
    const responses: { url: string; status: number }[] = [];
    cy.intercept({ method: 'GET', url: PRODUCT_IMAGE }, req => {
      req.continue(res => {
        responses.push({ url: req.url, status: res.statusCode });
      });
    });
    cy.visit(`${origin}/`);
    getElementByField(CypressFields.ProductCard).should('have.length', 10);
    getProductCardByName(ROOF_BINOCULARS.name).click();
    getElementByField(CypressFields.ProductPicture).should('exist');
    cy.wait(2000);
    cy.then(() => {
      expect(responses.length).to.be.greaterThan(0);
      responses.forEach(({ url }) => {
        expect(url.startsWith(`${origin}/images/products/`), url).to.eq(true);
      });
      // A request for /images/products/undefined is a missing picture, checked by its own test.
      responses
        .filter(({ url }) => !url.endsWith('/undefined'))
        .forEach(({ url, status }) => {
          expect(status, url).to.eq(200);
        });
    });
  });

  it('browses products and recommendations, omits missing pictures and shows the 404 page', () => {
    const checks = new StepChecks();

    cy.log('Step 1: home page at 1280x500, scroll to the bottom');
    cy.viewport(1280, 500);
    const requests = countImageRequests();
    cy.visit('/');
    getElementByField(CypressFields.ProductCard).should('have.length', 10);
    cy.wait(2000);
    cy.then(() => requests.length).then(before => {
      cy.scrollTo('bottom');
      cy.wait(2000);
      getElementByField(CypressFields.ProductList).then($list => {
        const allLazy = lazyProductImages($list);
        checks.check('step 1 images deferred or lazy', (before < 10 && requests.length === 10) || allLazy, true);
      });
    });

    cy.log('Step 2: Explorascope recommendations');
    cy.viewport(1280, 720);
    getProductCardByName(EXPLORASCOPE).click();
    getElementByField(CypressFields.ProductName).should('have.text', EXPLORASCOPE);
    for (let i = 0; i < 3; i++) {
      if (i > 0) cy.reload();
      recommendedNames().then(names =>
        checks.check(`step 2 load ${i + 1} recommends viewed product`, names.join(' | ').includes(EXPLORASCOPE), false)
      );
    }

    cy.log('Step 3: product without a picture');
    const undefinedImageRequests = stripPictures();
    cy.visit('/');
    getProductCardByName(ROOF_BINOCULARS.name).click();
    getElementByField(CypressFields.ProductName).should('have.text', ROOF_BINOCULARS.name);
    getElementByField(CypressFields.ProductDetail).then($detail =>
      checks.check('step 3 picture elements', $detail.find(`[data-cy="${CypressFields.ProductPicture}"]`).length, 0)
    );
    addOpenProductToCart();
    cy.wait(1000);
    getCartRow(ROOF_BINOCULARS.id).should('have.length', 1);
    cy.then(() => checks.check('step 3 undefined image requests', undefinedImageRequests.length, 0));

    cy.log('Step 4: unknown route typed in the address bar');
    cy.window().then(win => win.location.assign('/no-such-page'));
    cy.location('pathname').should('eq', '/no-such-page');
    cy.contains('This page could not be found.').should('be.visible');
    cy.reload();
    cy.contains('404').should('be.visible');
    cy.contains('This page could not be found.').should('be.visible');
    cy.contains('Go to homepage').click();
    cy.location('pathname').should('eq', '/');
    getElementByField(CypressFields.ProductCard, getElementByField(CypressFields.ProductList)).should(
      'have.length',
      10
    );

    checks.assertAll();
  });
});

export {};
