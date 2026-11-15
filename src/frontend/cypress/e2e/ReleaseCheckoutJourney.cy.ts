// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { getElementByField, getPagePrices, toAmount, toAmounts } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

const PRODUCT_ID = '0PUK6V6EV0';
const PRODUCT_NAME = 'Solar System Color Imager';
// Matches a lowercase v4-style uuid such as 3f2b1c4d-0a1b-4c2d-8e3f-123456789abc.
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

const near = (actual: number, expected: number) => Math.abs(actual - expected) <= 0.011;

type TStoredSession = { userId?: unknown; currencyCode?: unknown };

const readSession = (): Cypress.Chainable<TStoredSession> =>
  cy.window().then(win => JSON.parse(win.localStorage.getItem('session') || '{}') as TStoredSession);

// On /cart with one product line, getPagePrices() gives the line's Price, the line's Total, the Shipping row
// and the Total row; on the order confirmation, the item's price, Shipping and Total.

describe('Release checkout journey', () => {
  it('buys several units of a product in CAD and keeps the session', () => {
    const failures: string[] = [];
    const check = (step: number, ok: boolean, message: string) => {
      if (!ok) failures.push(`step ${step}: ${message}`);
    };
    let userId = '';
    let usdFirstPrice = 0;
    let unitPrice = 0;
    let cartShipping = 0;

    cy.intercept('POST', '/api/cart*').as('addToCart');
    cy.intercept('GET', '/api/cart*').as('getCart');
    cy.intercept('GET', '/api/shipping*').as('getShipping');
    cy.intercept('POST', '/api/checkout*').as('placeOrder');

    cy.clearLocalStorage();

    cy.log('step 1: open the shop');
    cy.visit('/');
    getElementByField(CypressFields.ProductCard, getElementByField(CypressFields.ProductList)).should(
      'have.length',
      10
    );
    getElementByField(CypressFields.CurrencySwitcher)
      .should($switcher => expect(($switcher[0] as HTMLSelectElement).options.length).to.be.greaterThan(1))
      .then($switcher => {
        const codes = [...($switcher[0] as HTMLSelectElement).options].map(o => o.value);
        check(1, JSON.stringify(codes) === JSON.stringify([...codes].sort()), `currency options not sorted: ${codes}`);
      });
    getElementByField(CypressFields.ProductCard).then($cards => {
      [...$cards].forEach(card => {
        const price = Cypress.$(card).find('[data-cy="product-price"]').text();
        check(1, !!price, 'a product card has no price');
        check(1, !!(card.textContent || '').replace(price, '').trim(), 'a product card has no name');
      });
    });
    cy.contains('[data-cy="product-card"]', PRODUCT_NAME)
      .find('[data-cy="product-price"]')
      .invoke('text')
      .then(text => {
        usdFirstPrice = toAmount(text);
      });
    readSession().then(session => {
      check(1, session.currencyCode === 'USD', `stored session currency is ${session.currencyCode}`);
      check(1, UUID.test(String(session.userId)), `stored session userId is ${session.userId}`);
      userId = String(session.userId);
    });

    cy.log('step 2: choose CAD');
    getElementByField(CypressFields.CurrencySwitcher).select('CAD');
    getElementByField(CypressFields.CurrencySwitcher).should('have.value', 'CAD');
    readSession().then(session => {
      check(2, session.currencyCode === 'CAD', `stored session currency is ${session.currencyCode}`);
    });
    cy.contains('[data-cy="product-card"]', PRODUCT_NAME)
      .find('[data-cy="product-price"]')
      .should($price => expect(toAmount($price.text())).not.to.eq(usdFirstPrice));

    cy.log('step 3: open the product and add 3 to the cart');
    cy.intercept('GET', '/api/recommendations*').as('getRecommendations');
    cy.contains('[data-cy="product-card"]', PRODUCT_NAME).click();
    cy.location('pathname').should('eq', `/product/${PRODUCT_ID}`);
    getElementByField(CypressFields.ProductDetail).should('exist');
    getElementByField(CypressFields.ProductDetail)
      .find('[data-cy="product-price"]')
      .not('[data-cy="recommendation-list"] [data-cy="product-price"]')
      .should('have.length', 1)
      .should($price => expect(toAmount($price.text())).to.be.greaterThan(0))
      .then($price => {
        unitPrice = toAmount($price.text());
      });
    getElementByField(CypressFields.ProductPicture).then($picture => {
      const background = $picture.css('background-image');
      // The regex requires a file name with an extension after /images/products/, so 'undefined' or '' fail.
      check(3, /\/images\/products\/[^/]+\.\w+/.test(background), `product picture background is ${background}`);
    });
    cy.wait('@getRecommendations');
    getElementByField(CypressFields.RecommendationList)
      .find('[data-cy="product-card"]')
      .should('have.length.greaterThan', 0)
      .then($cards => {
        const names = [...$cards].map(card => card.textContent || '');
        check(3, !names.some(n => n.includes(PRODUCT_NAME)), `recommendations include the product itself: ${names}`);
      });
    getElementByField(CypressFields.ProductQuantity).select('3');
    getElementByField(CypressFields.ProductAddToCart).click();
    cy.wait('@addToCart');

    cy.log('step 4: read the cart line');
    cy.location('pathname').should('eq', '/cart');
    cy.contains('Shopping Cart').should('be.visible');
    cy.wait('@getShipping');
    // The cart line's quantity select has no label; it is the one select on the page holding the quantity 3.
    cy.get('main select')
      .filter((_, el) => (el as HTMLSelectElement).value === '3')
      .should('have.length', 1)
      .as('lineQuantity');
    getPagePrices()
      .should($prices => {
        expect($prices).to.have.length(4);
        expect(toAmounts($prices)[2], 'Shipping row').to.be.greaterThan(0);
      })
      .then($prices => {
        const [price, lineTotal, shipping, total] = toAmounts($prices);
        cartShipping = shipping;
        check(4, near(price, unitPrice), `line Price ${price} != product price ${unitPrice}`);
        check(4, near(lineTotal, 3 * unitPrice), `line Total ${lineTotal} != 3 x ${unitPrice}`);
        check(4, near(total, 3 * unitPrice + shipping), `Total row ${total} != 3 x ${unitPrice} + ${shipping}`);
      });

    cy.log('step 5: change the line quantity to 2');
    cy.get('@lineQuantity').select('2');
    cy.wait('@getCart');
    cy.get('@lineQuantity').should('have.value', '2');
    getPagePrices()
      .should($prices => {
        expect(toAmounts($prices)[3], 'Total row').to.be.lessThan(3 * unitPrice);
        expect(toAmounts($prices)[2], 'Shipping row').to.be.greaterThan(0);
      })
      .then($prices => {
        const [, lineTotal, shipping, total] = toAmounts($prices);
        cartShipping = shipping;
        check(5, near(lineTotal, 2 * unitPrice), `line Total ${lineTotal} != 2 x ${unitPrice}`);
        check(5, near(total, 2 * unitPrice + shipping), `Total row ${total} != 2 x ${unitPrice} + ${shipping}`);
      });

    cy.log('step 6: place the order');
    getElementByField(CypressFields.CheckoutPlaceOrder).click();
    cy.wait('@placeOrder').its('response.statusCode').should('eq', 200);
    cy.location('pathname').should('match', /^\/cart\/checkout\/[\w-]+$/);
    cy.contains('Your order is complete!').should('be.visible');

    cy.log('step 7: read the order confirmation');
    cy.contains('Order Items').should('be.visible');
    cy.contains('Quantity:')
      .invoke('text')
      .then(text => check(7, text.trim() === 'Quantity: 2', `order item shows '${text}'`));
    cy.contains('Shipping Address').should('exist');
    cy.document().then(doc => {
      check(7, (doc.body.textContent || '').includes('1600 Amphitheatre Parkway'), 'shipping address not shown');
    });
    getPagePrices()
      .should('have.length', 3)
      .then($prices => {
        const [items, shipping, total] = toAmounts($prices);
        check(7, near(items, 2 * unitPrice), `order items ${items} != 2 x ${unitPrice}`);
        check(7, near(shipping, cartShipping), `order Shipping ${shipping} != cart Shipping ${cartShipping}`);
        check(
          7,
          near(total, 2 * unitPrice + cartShipping),
          `order Total ${total} != 2 x ${unitPrice} + ${cartShipping}`
        );
      });

    cy.log('step 8: back to the shop');
    cy.visit('/');
    getElementByField(CypressFields.ProductCard, getElementByField(CypressFields.ProductList)).should(
      'have.length',
      10
    );
    getElementByField(CypressFields.CurrencySwitcher).then($switcher => {
      check(8, $switcher.val() === 'CAD', `currency switcher shows ${$switcher.val()} after reload`);
    });
    readSession().then(session => {
      check(8, session.userId === userId, `session userId changed from ${userId} to ${session.userId}`);
      check(8, session.currencyCode === 'CAD', `stored session currency is ${session.currencyCode}`);
    });

    cy.then(() => expect(failures.join('\n'), 'failed journey checks').to.equal(''));
  });
});

export {};
