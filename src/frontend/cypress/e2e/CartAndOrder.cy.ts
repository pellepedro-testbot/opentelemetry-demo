// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { createJourney, emptyStoredSessionCart, getElementByField, getStoredSession } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

const telescope = {
  id: 'OLJCESPC7Z',
  name: 'National Park Foundation Explorascope',
  picture: 'NationalParkFoundationExplorascope.jpg',
};
const starsense = { id: '66VCHSJNUP', name: 'Starsense Explorer Refractor Telescope' };
const productNames: Record<string, string> = { [telescope.id]: telescope.name, [starsense.id]: starsense.name };
const productPrice = '[data-cy="product-price"]';

const toCents = (text: string) => Math.round(parseFloat(text.replace(/[^0-9.]/g, '')) * 100);
const formatUsd = (cents: number) => `$ ${(cents / 100).toFixed(2)}`;

const getCartLine = (productId: string) => cy.contains(`a[href="/product/${productId}"]`, productNames[productId]);
const getCartLineQuantity = (productId: string) => getCartLine(productId).siblings().find('select');
const getCartLinePrice = (productId: string) => getCartLine(productId).siblings().find(productPrice).eq(0);
const getCartLineTotal = (productId: string) => getCartLine(productId).siblings().find(productPrice).eq(1);
const getCartShipping = () => cy.contains(/^Shipping$/).siblings(productPrice);
const getCartTotal = () =>
  cy
    .contains('h3', /^Total$/)
    .siblings()
    .find(productPrice);

const addFromProductPage = (productId: string, quantity: number) => {
  cy.intercept('GET', `/api/products/${productId}*`).as('getProduct');
  cy.intercept('POST', '/api/cart*').as('addToCart');
  cy.visit(`/product/${productId}`);
  cy.wait('@getProduct');
  getElementByField(CypressFields.ProductQuantity).select(String(quantity));
  getElementByField(CypressFields.ProductAddToCart).click();
  cy.wait('@addToCart');
  cy.location('pathname').should('eq', '/cart');
};

describe('Cart and order confirmation', () => {
  afterEach(() => {
    emptyStoredSessionCart();
  });

  it('buys a product, adjusts its quantity in the cart and sees the order confirmation', () => {
    const journey = createJourney();
    let userId = '';

    cy.intercept('GET', '/images/products/*').as('cardImage');
    cy.intercept('POST', '/api/cart*').as('addToCart');
    cy.intercept('GET', '/api/cart*').as('getCart');
    cy.intercept('GET', '/api/shipping*').as('getShipping');
    cy.intercept('POST', '/api/checkout*').as('placeOrder');

    journey.step('1. open the storefront', () => {
      cy.visit('/');
      cy.title().should('eq', 'Otel Demo - Home');
      getElementByField(CypressFields.ProductCard, getElementByField(CypressFields.ProductList)).should(
        'have.length',
        10
      );
      getStoredSession().then(session => {
        userId = session.userId || '';
        expect(userId).to.not.be.empty;
        getElementByField(CypressFields.SessionId).should('contain', `session-id: ${userId}`);
      });
      cy.window().then(win => {
        const platform = (win as unknown as { ENV?: { NEXT_PUBLIC_PLATFORM?: string } }).ENV?.NEXT_PUBLIC_PLATFORM;
        cy.get('footer')
          .should('have.length', 1)
          .and('contain', platform || 'local');
      });
      cy.wait(new Array(10).fill('@cardImage')).then(calls => {
        calls.forEach(({ request, response }) => {
          expect(request.headers).to.have.property('x-envoy-fault-delay-request');
          expect(request.headers).to.have.property('cache-control', 'no-cache');
          expect(response?.statusCode).to.be.lessThan(400);
        });
      });
      getElementByField(CypressFields.ProductCard, getElementByField(CypressFields.ProductList)).should($cards => {
        $cards.each((_, card) => {
          const backgrounds = [...card.querySelectorAll('*')].map(el => getComputedStyle(el).backgroundImage);
          expect(
            backgrounds.some(background => background.includes('blob:')),
            'card image is a blob'
          ).to.be.true;
        });
      });
    });

    journey.step('2. open the product', () => {
      cy.contains('[data-cy="product-card"]', telescope.name).click();
      cy.location('pathname').should('eq', `/product/${telescope.id}`);
      getElementByField(CypressFields.ProductName).should('have.text', telescope.name);
      getElementByField(CypressFields.ProductDescription).should('not.be.empty');
      getElementByField(CypressFields.ProductQuantity).should('have.value', '1');
      getElementByField(CypressFields.ProductPicture)
        .should('have.css', 'background-image')
        .and('include', `/images/products/${telescope.picture}`);
    });

    journey.step('3. add three to the cart', () => {
      getElementByField(CypressFields.ProductQuantity).select('3');
      getElementByField(CypressFields.ProductAddToCart).click();
      cy.wait('@addToCart').its('request.body.item').should('deep.equal', { productId: telescope.id, quantity: 3 });
      cy.location('pathname').should('eq', '/cart');
      cy.contains('h1', 'Shopping Cart').should('be.visible');
    });

    journey.step('4. read the cart line', () => {
      getCartLineQuantity(telescope.id).should('have.value', '3');
      getCartLinePrice(telescope.id).should('have.text', '$ 101.96');
      getCartLine(telescope.id)
        .find(`[alt="${telescope.name}"]`)
        .should('have.attr', 'src', `/images/products/${telescope.picture}`)
        .and($img => expect(($img[0] as HTMLImageElement).naturalWidth).to.be.greaterThan(0));
      cy.wait('@getShipping').then(({ request, response }) => {
        const quote = response?.body as { units: number; nanos: number };
        expect(JSON.parse(String(request.query.itemList))).to.deep.equal([{ productId: telescope.id, quantity: 3 }]);
        getCartShipping().should('have.text', formatUsd(quote.units * 100 + Math.round(quote.nanos / 1e7)));
      });
      getCartShipping().should('have.text', '$ 26.97');
      getCartTotal().should('have.text', '$ 332.85');
      getCartLineTotal(telescope.id)
        .invoke('text')
        .then(total => journey.check(() => expect(total, 'line Total of 3 units').to.eq('$ 305.88')));
      getCartLinePrice(telescope.id)
        .invoke('text')
        .then(price => {
          getCartShipping()
            .invoke('text')
            .then(shipping => {
              getCartTotal().should('have.text', formatUsd(toCents(price) * 3 + toCents(shipping)));
            });
        });
    });

    journey.step('5. change the quantity to two', () => {
      getCartLineQuantity(telescope.id).select('2');
      cy.wait('@addToCart').its('request.body.item').should('deep.equal', { productId: telescope.id, quantity: -1 });
      getCartLineQuantity(telescope.id).should('have.value', '2');
      getCartShipping().should('have.text', '$ 17.98');
      getCartTotal().should('have.text', '$ 221.90');
    });

    journey.step('6. reload the cart', () => {
      cy.reload();
      getCartLineQuantity(telescope.id).should('have.value', '2');
      getCartTotal().should('have.text', '$ 221.90');
    });

    journey.step('7. open and close the cart dropdown', () => {
      getElementByField(CypressFields.CartIcon).click({ force: true });
      getElementByField(CypressFields.CartDropdownItem)
        .should('have.length', 1)
        .and('contain', 'Quantity: 2')
        .and('contain', telescope.name)
        .and('contain', '$ 101.96')
        .find(`[alt="${telescope.name}"]`)
        .should($img => expect(($img[0] as HTMLImageElement).naturalWidth).to.be.greaterThan(0));
      cy.contains('h1', 'Shopping Cart').click();
      getElementByField(CypressFields.CartDropdown).should('not.exist');
    });

    journey.step('8. place the order', () => {
      getElementByField(CypressFields.CheckoutPlaceOrder).click();
      cy.wait('@placeOrder').then(({ response }) => {
        expect(response?.statusCode).to.eq(200);
        const { orderId } = response?.body as { orderId: string };
        cy.location('pathname').should('eq', `/cart/checkout/${orderId}`);
        cy.contains(orderId).should('be.visible');
      });
    });

    journey.step('9. read the order confirmation', () => {
      [
        'Your order is complete!',
        "We've sent you a confirmation email.",
        'Order ID:',
        '1600 Amphitheatre Parkway',
        'Mountain View, CA 94043',
      ].forEach(text => cy.contains(text).should('be.visible'));
      getElementByField(CypressFields.CheckoutItem)
        .should('have.length', 1)
        .and('contain', telescope.name)
        .and('contain', 'Quantity: 2')
        .and('contain', '$ 203.92')
        .find(`[alt="${telescope.name}"]`)
        .should('have.attr', 'src', `/images/products/${telescope.picture}`)
        .and($img => expect(($img[0] as HTMLImageElement).naturalWidth).to.be.greaterThan(0));
      cy.contains(/^Shipping:$/)
        .siblings(productPrice)
        .invoke('text')
        .then(shipping => {
          cy.contains(/^Total:$/)
            .siblings()
            .find(productPrice)
            .should('have.text', formatUsd(20392 + toCents(shipping)));
        });
      getElementByField(CypressFields.CartItemCount).should('not.exist');
    });

    journey.verify();
  });

  it('resets the product quantity to 1 when opening a recommended product', () => {
    cy.visit(`/product/${telescope.id}`);
    getElementByField(CypressFields.ProductName).should('have.text', telescope.name);
    getElementByField(CypressFields.ProductQuantity).select('3').should('have.value', '3');
    getElementByField(CypressFields.ProductCard, getElementByField(CypressFields.RecommendationList))
      .should('have.length.at.least', 1)
      .first()
      .click();
    cy.location('pathname').should('not.eq', `/product/${telescope.id}`);
    getElementByField(CypressFields.ProductName).should('not.have.text', telescope.name);
    getElementByField(CypressFields.ProductQuantity).should('have.value', '1');
  });

  it('shows the unit price under Price and unit price times quantity under Total', () => {
    addFromProductPage(telescope.id, 3);
    getCartLineQuantity(telescope.id).should('have.value', '3');
    getCartLinePrice(telescope.id).should('have.text', '$ 101.96');
    getCartLinePrice(telescope.id)
      .invoke('text')
      .then(price => {
        getCartLineTotal(telescope.id).should('have.text', formatUsd(toCents(price) * 3));
      });
  });

  it('keeps the chosen quantity and cart total after a reload', () => {
    addFromProductPage(telescope.id, 3);
    cy.intercept('GET', '/api/cart*').as('getCart');
    getCartLineQuantity(telescope.id).should('have.value', '3').select('2');
    cy.wait('@addToCart').its('request.body.item.quantity').should('eq', -1);
    getStoredSession().then(({ userId }) => {
      cy.request(`/api/cart?sessionId=${userId}&currencyCode=USD`)
        .its('body.items')
        .should(items => {
          expect(items).to.have.length(1);
          expect(items[0]).to.include({ productId: telescope.id, quantity: 2 });
        });
    });
    getCartLineQuantity(telescope.id).should('have.value', '2');
    getCartTotal().should('have.text', '$ 221.90');
    cy.reload();
    getCartLineQuantity(telescope.id).should('have.value', '2');
    getCartTotal().should('have.text', '$ 221.90');

    getCartLineQuantity(telescope.id).select('5');
    cy.wait('@addToCart').its('request.body.item.quantity').should('eq', 3);
    getStoredSession().then(({ userId }) => {
      cy.request(`/api/cart?sessionId=${userId}&currencyCode=USD`).its('body.items.0.quantity').should('eq', 5);
    });
    getCartLineQuantity(telescope.id).should('have.value', '5');
  });

  it('totals the cart as unit price times quantity of every line plus shipping', () => {
    addFromProductPage(telescope.id, 3);
    addFromProductPage(starsense.id, 1);
    getCartLineQuantity(telescope.id).should('have.value', '3');
    getCartLineQuantity(starsense.id).should('have.value', '1');
    getCartLinePrice(telescope.id)
      .invoke('text')
      .then(telescopePrice => {
        getCartLinePrice(starsense.id)
          .invoke('text')
          .then(starsensePrice => {
            getCartShipping()
              .invoke('text')
              .then(shipping => {
                getCartTotal().should(
                  'have.text',
                  formatUsd(toCents(telescopePrice) * 3 + toCents(starsensePrice) + toCents(shipping))
                );
              });
          });
      });
  });

  it('shows the real quantity of a line above ten units', () => {
    addFromProductPage(starsense.id, 10);
    addFromProductPage(starsense.id, 2);
    getStoredSession().then(({ userId }) => {
      cy.request(`/api/cart?sessionId=${userId}&currencyCode=USD`).its('body.items.0.quantity').should('eq', 12);
    });
    getCartLineQuantity(starsense.id).should('have.value', '12');
  });
});

export {};
