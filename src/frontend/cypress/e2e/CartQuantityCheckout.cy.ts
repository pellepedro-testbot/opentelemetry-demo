// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { expectNoFailedChecks, getElementByField, getElementByFieldAndText, softCheck } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

const FIRST_PRODUCT = { id: '0PUK6V6EV0', name: 'Solar System Color Imager' };
const SECOND_PRODUCT = { id: '2ZYFJ3GM2N', name: 'Roof Binoculars' };

const formatUsd = (amount: number) => `$ ${amount.toFixed(2)}`;

const unitPriceOf = (productId: string) =>
  cy
    .request(`/api/products/${productId}?currencyCode=USD`)
    .then(({ body }) => Number(body.priceUsd.units) + (body.priceUsd.nanos || 0) / 1e9);

// The cart page has one quantity select per line; the tests below hold a single line when they use it.
const lineQuantity = () => cy.get('main select').first();

const priceTexts = ($prices: JQuery<HTMLElement>) => [...$prices].map(p => p.textContent || '');

describe('Cart quantity and checkout', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/cart*').as('addToCart');
    cy.intercept('GET', '/api/shipping*', req => {
      delete req.headers['if-none-match'];
    }).as('getShipping');
    cy.intercept('POST', '/api/checkout*').as('placeOrder');
  });

  it('shows the line total as unit price times quantity', () => {
    unitPriceOf(FIRST_PRODUCT.id).then(unitPrice => {
      cy.visit('/');
      getElementByFieldAndText(CypressFields.ProductCard, FIRST_PRODUCT.name).click();
      getElementByField(CypressFields.ProductAddToCart).click();
      cy.wait('@addToCart');
      cy.location('pathname').should('eq', '/cart');
      cy.contains('Shopping Cart').should('be.visible');

      lineQuantity().select('3');
      cy.wait('@addToCart');
      lineQuantity().should('have.value', '3');
      cy.wait('@getShipping')
        .its('response.body')
        .then(shipping => {
          const shippingCost = Number(shipping.units) + (shipping.nanos || 0) / 1e9;
          getElementByFieldAndText(CypressFields.ProductPrice, formatUsd(unitPrice * 3 + shippingCost)).should('exist');
          getElementByField(CypressFields.ProductPrice).should($prices => {
            expect(priceTexts($prices)).to.include(formatUsd(unitPrice * 3));
          });
        });
    });
  });

  it('shopper changes a quantity in the cart and places the order', () => {
    const failures: string[] = [];

    unitPriceOf(FIRST_PRODUCT.id).then(unitPrice => {
      cy.log('**Step 1: open the storefront**');
      cy.visit('/');
      getElementByField(CypressFields.ProductCard).should('have.length', 10);
      getElementByField(CypressFields.SessionId).should('exist');
      getElementByField(CypressFields.CurrencySwitcher).should($select => {
        expect(($select[0] as HTMLSelectElement).options).to.have.length.at.least(2);
      });
      getElementByField(CypressFields.CurrencySwitcher).then($select => {
        const codes = [...($select[0] as HTMLSelectElement).options].map(o => o.value);
        softCheck(failures, 'Step 1: currency options sorted', () => {
          expect(codes).to.deep.equal([...codes].sort());
        });
      });

      cy.log('**Step 2: open the first product**');
      getElementByFieldAndText(CypressFields.ProductCard, FIRST_PRODUCT.name).click();
      getElementByField(CypressFields.ProductPicture).should('be.visible');
      getElementByField(CypressFields.ProductName).should('contain', FIRST_PRODUCT.name);
      getElementByField(CypressFields.ProductDescription).should('not.be.empty');

      cy.log('**Step 3: add it to the cart**');
      getElementByField(CypressFields.ProductAddToCart).click();
      cy.wait('@addToCart');
      cy.location('pathname').should('eq', '/cart');
      getElementByField(CypressFields.CartItemCount).should('contain', '1');

      cy.log('**Step 4: set the quantity to 3**');
      cy.contains('Shopping Cart').should('be.visible');
      lineQuantity().select('3');
      cy.wait('@addToCart');
      lineQuantity().should('have.value', '3');
      cy.wait('@getShipping')
        .its('response.body')
        .then(shipping => {
          const shippingCost = Number(shipping.units) + (shipping.nanos || 0) / 1e9;
          getElementByFieldAndText(CypressFields.ProductPrice, formatUsd(unitPrice * 3 + shippingCost)).should('exist');
          getElementByField(CypressFields.ProductPrice).then($prices => {
            softCheck(failures, 'Step 4: line Total is 3 x Price', () => {
              expect(priceTexts($prices)).to.include(formatUsd(unitPrice * 3));
            });
          });
        });

      cy.log('**Step 5: add a second product too**');
      cy.visit('/');
      getElementByFieldAndText(CypressFields.ProductCard, SECOND_PRODUCT.name).click();
      getElementByField(CypressFields.ProductAddToCart).click();
      cy.wait('@addToCart');
      cy.location('pathname').should('eq', '/cart');
      getElementByField(CypressFields.CartItemCount).should('contain', '2');

      cy.log('**Step 6: place the order**');
      getElementByField(CypressFields.CheckoutPlaceOrder).click();
      cy.wait('@placeOrder').its('response.statusCode').should('eq', 200);
      cy.location('pathname').should('match', /^\/cart\/checkout\/[^/]+$/);

      cy.log('**Step 7: read the confirmation page**');
      const checkConfirmation = () => {
        cy.contains('Your order is complete!').should('be.visible');
        cy.location('pathname').then(pathname => {
          cy.contains(pathname.split('/').pop() as string).should('be.visible');
        });
        getElementByField(CypressFields.CheckoutItem).should('have.length', 2);
        getElementByFieldAndText(CypressFields.CheckoutItem, FIRST_PRODUCT.name)
          .should('contain', 'Quantity: 3')
          .and('contain', formatUsd(unitPrice * 3));
        getElementByFieldAndText(CypressFields.CheckoutItem, SECOND_PRODUCT.name).should('contain', 'Quantity: 1');
        cy.contains('Shipping:').should('be.visible');
        cy.contains('Total:').should('be.visible');
      };
      checkConfirmation();
      cy.reload();
      checkConfirmation();

      expectNoFailedChecks(failures);
    });
  });
});

export {};
