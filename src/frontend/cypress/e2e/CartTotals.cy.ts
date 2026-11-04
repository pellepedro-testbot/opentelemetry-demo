// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { getElementByField } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';
import {
  cartLinePrices,
  cartLineQuantitySelect,
  cartShipping,
  cartTotal,
  confirmationItem,
  confirmationShipping,
  confirmationTotal,
} from '../../utils/CypressCartPage';
import { createJourney } from '../../utils/CypressJourney';

const TELESCOPE_ID = '66VCHSJNUP';
const TELESCOPE = 'Starsense Explorer Refractor Telescope';

const amountOf = (price: string) => Number(price.replace(/[^0-9.]/g, ''));
const usd = (amount: number) => `$ ${amount.toFixed(2)}`;
const isUuid = (value: unknown) => typeof value === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(value);

const addTelescopeFromItsPage = (quantity: number) => {
  cy.intercept('POST', '/api/cart*').as('addToCart');
  cy.visit(`/product/${TELESCOPE_ID}`);
  getElementByField(CypressFields.ProductName).should('contain', 'Starsense Explorer');
  getElementByField(CypressFields.ProductQuantity).select(String(quantity));
  getElementByField(CypressFields.ProductAddToCart).click();
  cy.wait('@addToCart');
  cy.location('pathname').should('eq', '/cart');
  cy.contains('Shopping Cart').should('be.visible');
};

const linePrices = () => cy.get('body').then($body => cartLinePrices(TELESCOPE)($body));

describe('Cart totals', () => {
  it('shows the unit price in both price columns for a single unit', () => {
    addTelescopeFromItsPage(1);
    cy.contains('a', TELESCOPE).parent().find(`[data-cy="${CypressFields.ProductPrice}"]`).should('have.length', 2);
    linePrices().should('deep.equal', ['$ 349.95', '$ 349.95']);
  });

  it('shows a line total of unit price times quantity', () => {
    addTelescopeFromItsPage(3);
    cartLineQuantitySelect(TELESCOPE).should('have.value', '3');
    cy.contains('a', TELESCOPE)
      .parent()
      .find(`[data-cy="${CypressFields.ProductPrice}"]`)
      .should($prices => {
        expect($prices.eq(0).text().trim(), 'unit price').to.eq('$ 349.95');
        expect($prices.eq(1).text().trim(), 'line total').to.eq('$ 1049.85');
      });
  });

  it('updates the line total when the quantity is changed on the cart page', () => {
    cy.intercept('GET', '/api/cart*').as('getCart');
    addTelescopeFromItsPage(1);

    cartLineQuantitySelect(TELESCOPE).select('2');
    cy.wait('@getCart');
    cartLineQuantitySelect(TELESCOPE).should('have.value', '2');
    cy.contains('a', TELESCOPE)
      .parent()
      .find(`[data-cy="${CypressFields.ProductPrice}"]`)
      .eq(1)
      .should('have.text', '$ 699.90');

    cartLineQuantitySelect(TELESCOPE).select('4');
    cy.wait('@getCart');
    cartLineQuantitySelect(TELESCOPE).should('have.value', '4');
    cy.contains('a', TELESCOPE)
      .parent()
      .find(`[data-cy="${CypressFields.ProductPrice}"]`)
      .eq(1)
      .should('have.text', '$ 1399.80');
  });

  it('buys several units of a product and checks the cart and order totals', () => {
    const journey = createJourney();
    const imageRequests: { url: string; delayHeader?: string }[] = [];
    let cartShippingShown = '';
    let cartTotalShown = '';

    cy.intercept('GET', '/images/products/*', req => {
      imageRequests.push({ url: req.url, delayHeader: req.headers['x-envoy-fault-delay-request'] as string });
    });
    cy.intercept('POST', '/api/cart*').as('addToCart');
    cy.intercept('GET', '/api/cart*').as('getCart');
    cy.intercept('POST', '/api/checkout*').as('placeOrder');

    journey.step('Step 1: open the home page', () => {
      cy.visit('/');
      journey.check(
        'product cards in the product list',
        $b => $b.find(`[data-cy="${CypressFields.ProductList}"] [data-cy="${CypressFields.ProductCard}"]`).length,
        10
      );
      cy.window().then(win => {
        const stored = JSON.parse(win.localStorage.getItem('session') || '{}');
        journey.record('stored session has a uuid userId', isUuid(stored.userId), `got ${JSON.stringify(stored)}`);
        journey.check(
          'footer session id',
          $b => $b.find(`[data-cy="${CypressFields.SessionId}"]`).text(),
          `session-id: ${stored.userId}`
        );
      });
      journey.check(
        'platform badge',
        $b => $b.find('*').filter((_, el) => el.children.length === 0 && el.textContent === 'local').length > 0,
        true
      );
      journey.check(
        'product images fetched with the fault-delay header',
        () => imageRequests.filter(r => r.delayHeader !== undefined && !r.url.endsWith('/undefined')).length >= 10,
        true
      );
    });

    journey.step('Step 2: open the Starsense Explorer product', () => {
      getElementByField(CypressFields.ProductCard).filter(':contains("Starsense Explorer")').first().click();
      cy.location('pathname').should('eq', `/product/${TELESCOPE_ID}`);
      journey.check('product name', $b => $b.find(`[data-cy="${CypressFields.ProductName}"]`).text(), TELESCOPE);
    });

    journey.step('Step 3: read the recommendations', () => {
      journey.check(
        'recommendations exclude the product being viewed',
        $b => {
          const cards = $b.find(`[data-cy="${CypressFields.RecommendationList}"] [data-cy="${CypressFields.ProductCard}"]`);
          return cards.length ? cards.toArray().some(card => card.textContent?.includes(TELESCOPE)) : undefined;
        },
        false
      );
    });

    journey.step('Step 4: add three units to the cart', () => {
      getElementByField(CypressFields.ProductQuantity).select('3');
      getElementByField(CypressFields.ProductAddToCart).click();
      cy.wait('@addToCart');
      cy.location('pathname').should('eq', '/cart');
      cy.contains('Shopping Cart').should('be.visible');
    });

    journey.step('Step 5: read the cart line and total', () => {
      journey.check('cart line [unit, total]', cartLinePrices(TELESCOPE), ['$ 349.95', '$ 1049.85'], actual =>
        Cypress._.isEqual(actual, ['$ 349.95', '$ 1049.85'])
      );
      journey.check(
        'cart total is three units plus shipping',
        $b => ({ total: cartTotal($b), shipping: cartShipping($b) }),
        'total = $ 1049.85 + shipping',
        actual => {
          const { total, shipping } = actual as { total: string; shipping: string };
          return shipping !== '' && total === usd(1049.85 + amountOf(shipping));
        }
      );
    });

    journey.step('Step 6: change the quantity to 2 on the cart page', () => {
      cartLineQuantitySelect(TELESCOPE).select('2');
      cy.wait('@getCart');
      journey.check('line total after the change', $b => cartLinePrices(TELESCOPE)($b)[1], '$ 699.90');
      journey.check(
        'cart total is two units plus shipping',
        $b => ({ total: cartTotal($b), shipping: cartShipping($b) }),
        'total = $ 699.90 + shipping',
        actual => {
          const { total, shipping } = actual as { total: string; shipping: string };
          return shipping !== '' && total === usd(699.9 + amountOf(shipping));
        }
      );
      cy.get('body').then($b => {
        cartShippingShown = cartShipping($b);
        cartTotalShown = cartTotal($b);
      });
    });

    journey.step('Step 7: place the order', () => {
      getElementByField(CypressFields.CheckoutPlaceOrder).click();
      cy.wait('@placeOrder').its('response.statusCode').should('eq', 200);
      cy.location('pathname').should('match', /^\/cart\/checkout\/[^/]+$/);
      journey.check('confirmation title', $b => $b.text().includes('Your order is complete!'), true);
      journey.check('confirmation email notice', $b => $b.text().includes("We've sent you a confirmation email."), true);
    });

    journey.step('Step 8: read the order summary', () => {
      cy.location('pathname').then(path => {
        const orderId = path.split('/').pop();
        journey.check('order id shown', $b => $b.text().includes(`Order ID:${orderId}`), true);
      });
      journey.check('shipping address shown', $b => $b.text().includes('1600 Amphitheatre Parkway'), true);
      journey.check('ordered item', confirmationItem(TELESCOPE), { quantity: 'Quantity: 2', price: '$ 699.90' }, actual =>
        Cypress._.isEqual(actual, { quantity: 'Quantity: 2', price: '$ 699.90' })
      );
      cy.then(() => {
        journey.check('confirmation shipping equals cart shipping', confirmationShipping, cartShippingShown);
        journey.check('confirmation total equals cart total', confirmationTotal, cartTotalShown);
        journey.check(
          'confirmation total is items plus shipping',
          confirmationTotal,
          usd(699.9 + amountOf(cartShippingShown))
        );
      });
    });

    cy.location('pathname').then(path => {
      cy.contains('Order ID:').parent().should('contain', path.split('/').pop());
    });
    cy.get('body').should($b => {
      const text = $b.text();
      expect(text).to.include('Your order is complete!');
      expect(text).to.include("We've sent you a confirmation email.");
      expect(text).to.include('1600 Amphitheatre Parkway');
      expect(confirmationItem(TELESCOPE)($b), 'ordered item').to.deep.equal({ quantity: 'Quantity: 2', price: '$ 699.90' });
      expect(confirmationShipping($b), 'Shipping:').to.eq('$ 8.99');
      expect(confirmationTotal($b), 'Total:').to.eq('$ 708.89');
    });

    journey.finish();
  });
});

export {};
