// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import {
  createStepChecks,
  getCartLine,
  getCartSummaryRow,
  getElementByField,
  getOrderSummaryRow,
  priceAmount,
} from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

const LENS_KIT = { id: 'L9ECAV7KIM', name: 'Lens Cleaning Kit', price: 21.95 };

const cents = (amount: number) => Math.round(amount * 100);

const readLinePrices = () =>
  getCartLine(LENS_KIT.name)
    .find(`[data-cy="${CypressFields.ProductPrice}"]`)
    .then($prices => ({
      // The line's price cells follow the header order: Price, then Total.
      price: priceAmount($prices.eq(0).text()),
      total: priceAmount($prices.eq(1).text()),
    }));

const readSummary = () =>
  // The shipping quote loads after the cart; read the rows once it is shown.
  getCartSummaryRow('Shipping')
    .find(`[data-cy="${CypressFields.ProductPrice}"]`)
    .should($shipping => expect(priceAmount($shipping.text())).to.be.greaterThan(0))
    .then(() =>
      getCartSummaryRow('Shipping')
        .find(`[data-cy="${CypressFields.ProductPrice}"]`)
        .then($shipping =>
          getCartSummaryRow('Total')
            .find(`[data-cy="${CypressFields.ProductPrice}"]`)
            .then($total => ({
              shipping: priceAmount($shipping.text()),
              total: priceAmount($total.text()),
            }))
        )
    );

const setLineQuantity = (quantity: number) => {
  // The line's quantity <select> has no label; it is the only select in the cart line.
  getCartLine(LENS_KIT.name).find('select').select(String(quantity));
  cy.wait('@getCart');
  getCartLine(LENS_KIT.name).find('select').should('have.value', String(quantity));
};

const addLensKitFromProductPage = () => {
  cy.visit(`/product/${LENS_KIT.id}`);
  getElementByField(CypressFields.ProductName).should('contain', LENS_KIT.name);
  getElementByField(CypressFields.ProductAddToCart).click();
  cy.wait('@addToCart');
  cy.location('pathname').should('eq', '/cart');
  getCartLine(LENS_KIT.name).should('be.visible');
};

const recommendationLinksTo = (productId: string) =>
  getElementByField(CypressFields.RecommendationList)
    .find('a')
    .then($links => $links.toArray().some(link => link.getAttribute('href') === `/product/${productId}`));

describe('Cart line totals', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/cart*').as('addToCart');
    cy.intercept('GET', '/api/cart*').as('getCart');
    cy.intercept('GET', '/api/recommendations*').as('getRecommendations');
    cy.intercept('POST', '/api/checkout*').as('placeOrder');
  });

  it('buys two Lens Cleaning Kits and sees the line totals and order total agree', () => {
    const steps = createStepChecks();
    let cartShipping = 0;
    let cartTotal = 0;

    cy.log('Step 1: home page lists the products with their images');
    cy.visit('/');
    getElementByField(CypressFields.ProductCard).should('have.length.at.least', 1);
    getElementByField(CypressFields.ProductCard)
      .filter(`:contains("${LENS_KIT.name}")`)
      .find('[class*="ProductCard-styled__Image"]')
      .should('have.css', 'background-image')
      .and('include', 'blob:');

    cy.log('Step 2: product page shows the product and does not recommend it');
    getElementByField(CypressFields.ProductCard).filter(`:contains("${LENS_KIT.name}")`).click();
    cy.location('pathname').should('eq', `/product/${LENS_KIT.id}`);
    getElementByField(CypressFields.ProductName).should('contain', LENS_KIT.name);
    getElementByField(CypressFields.ProductPicture)
      .should('be.visible')
      .and('have.css', 'background-image')
      .and('include', '/images/products/');
    cy.wait('@getRecommendations');
    getElementByField(CypressFields.RecommendationList)
      .find(`[data-cy="${CypressFields.ProductCard}"]`)
      .should('have.length.at.least', 1);
    recommendationLinksTo(LENS_KIT.id).then(found =>
      steps.check(!found, 'step 2: the product page recommends the Lens Cleaning Kit being viewed')
    );

    cy.log('Step 3: add to cart');
    getElementByField(CypressFields.ProductAddToCart).click();
    cy.wait('@addToCart');
    cy.location('pathname').should('eq', '/cart');
    getElementByField(CypressFields.CartItemCount).should('contain', '1');

    cy.log('Step 4: cart line Price and Total, then quantity 2');
    getCartLine(LENS_KIT.name)
      .find('img')
      .should('have.attr', 'src')
      .and('match', /^\/images\/products\/.+/);
    getCartLine(LENS_KIT.name)
      .find('img')
      .should($img => expect(($img[0] as HTMLImageElement).naturalWidth).to.be.greaterThan(0));
    readLinePrices().then(({ price, total }) => {
      steps.check(price === LENS_KIT.price, `step 4: Price with quantity 1 is ${price}, want ${LENS_KIT.price}`);
      steps.check(total === price, `step 4: Total with quantity 1 is ${total}, want the Price ${price}`);
    });
    setLineQuantity(2);
    readLinePrices().then(({ price, total }) => {
      steps.check(price === LENS_KIT.price, `step 4: Price with quantity 2 is ${price}, want ${LENS_KIT.price}`);
      steps.check(cents(total) === cents(LENS_KIT.price * 2), `step 4: Total with quantity 2 is ${total}, want 43.90`);
      readSummary().then(summary => {
        cartShipping = summary.shipping;
        cartTotal = summary.total;
        steps.check(
          cents(summary.total) === cents(LENS_KIT.price * 2 + summary.shipping),
          `step 4: Total row ${summary.total}, want 43.90 + shipping ${summary.shipping}`
        );
        steps.check(
          cents(summary.total) === cents(total + summary.shipping),
          `step 4: Total row ${summary.total} is not the line Total ${total} + shipping ${summary.shipping}`
        );
      });
    });

    cy.log('Step 5: place the order');
    getElementByField(CypressFields.CheckoutPlaceOrder).click();
    cy.wait('@placeOrder').its('response.statusCode').should('eq', 200);
    cy.location('pathname').should('match', /^\/cart\/checkout\/[^/]+$/);

    cy.log('Step 6: the confirmation shows the order');
    cy.contains('h1', 'Your order is complete!').should('be.visible');
    getOrderSummaryRow('Order ID:')
      .invoke('text')
      .should('match', /Order ID:\s*\S+/);
    cy.contains(LENS_KIT.name).should('be.visible');
    cy.contains('Quantity: 2').should('be.visible');
    cy.contains('$ 43.90').should('be.visible');
    cy.get(`img[alt="${LENS_KIT.name}"]`).should($img =>
      expect(($img[0] as HTMLImageElement).naturalWidth).to.be.greaterThan(0)
    );
    getOrderSummaryRow('Shipping:').then($row => {
      const shipping = priceAmount($row.text());
      steps.check(cents(shipping) === cents(cartShipping), `step 6: Shipping ${shipping}, cart showed ${cartShipping}`);
    });
    getOrderSummaryRow('Total:').then($row => {
      const total = priceAmount($row.text());
      steps.check(cents(total) === cents(cartTotal), `step 6: Total ${total}, cart showed ${cartTotal}`);
      steps.check(cents(total) === cents(43.9 + cartShipping), `step 6: Total ${total}, want 43.90 + ${cartShipping}`);
    });
    cy.wait('@getRecommendations');
    recommendationLinksTo(LENS_KIT.id).then(found =>
      steps.check(!found, 'step 6: the order confirmation recommends the Lens Cleaning Kit just bought')
    );

    steps.assertAll();
  });

  it('shows the line Total as unit price times quantity', () => {
    addLensKitFromProductPage();
    setLineQuantity(2);

    readLinePrices().then(({ price, total }) => {
      expect(price, 'Price').to.eq(LENS_KIT.price);
      expect(cents(total), 'Total in cents').to.eq(cents(LENS_KIT.price * 2));
      readSummary().then(summary => expect(cents(summary.total), 'Total row').to.eq(cents(total + summary.shipping)));
    });
  });
});

export {};
