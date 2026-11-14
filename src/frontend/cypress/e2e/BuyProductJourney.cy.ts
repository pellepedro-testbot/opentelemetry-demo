// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import {
  createSoftChecks,
  emptyStoredCart,
  formatCents,
  getCartLinePrices,
  getCartLineQuantity,
  getElementByField,
  getStoredCart,
  NON_EMPTY_CSS_URL,
  priceToCents,
  productCardImageUrl,
  readStoredSession,
} from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

const productCards = () => getElementByField(CypressFields.ProductCard, getElementByField(CypressFields.ProductList));

describe('Buy a product journey', () => {
  afterEach(() => {
    readStoredSession().then(session => {
      if (session) emptyStoredCart(session.userId);
    });
  });

  it('buys a product, raises its quantity in the cart and sees the order', () => {
    const soft = createSoftChecks();
    cy.intercept('POST', '/api/cart*').as('updateCart');
    cy.intercept('GET', '/api/cart*').as('getCart');
    cy.intercept('GET', '/api/shipping*').as('getShipping');
    cy.intercept('POST', '/api/checkout*').as('placeOrder');

    cy.log('Step 1: open the storefront');
    cy.visit('/');
    productCards().should('have.length.at.least', 1);
    cy.wait(1000);
    productCards().then(cards => {
      soft.check('Step 1 product cards', () => expect(cards).to.have.length(10));
      cards.each((index, card) => {
        soft.check(`Step 1 card ${index}`, () => {
          expect(card.innerText).to.match(/\S/);
          expect(Cypress.$(card).find(`[data-cy="${CypressFields.ProductPrice}"]`).text()).to.match(/^\$ \d+\.\d{2}$/);
          expect(productCardImageUrl(card)).to.match(NON_EMPTY_CSS_URL);
        });
      });
    });

    cy.log('Step 2: open the first product');
    productCards().first().click();
    cy.location('pathname').should('match', /^\/product\/[^/]+$/);
    getElementByField(CypressFields.ProductName).invoke('text').should('not.be.empty').as('productName');
    getElementByField(CypressFields.ProductDescription).invoke('text').should('not.be.empty');
    getElementByField(CypressFields.ProductDetail)
      .find(`[data-cy="${CypressFields.ProductPrice}"]`)
      .invoke('text')
      .then(priceToCents)
      .as('unitPrice');
    readStoredSession().then(({ userId }) => {
      getElementByField(CypressFields.SessionId).then(footer =>
        soft.check('Step 2 footer session id', () => expect(footer.text()).to.eq(`session-id: ${userId}`))
      );
    });

    cy.log('Step 3: add two to the cart');
    getElementByField(CypressFields.ProductQuantity).select('2');
    getElementByField(CypressFields.ProductAddToCart).click();
    cy.wait('@updateCart');
    cy.location('pathname').should('eq', '/cart');
    cy.get<string>('@productName').then(productName => {
      cy.get<number>('@unitPrice').then(unitPrice => {
        getCartLinePrices(productName).should('have.length', 2);
        getCartLinePrices(productName).then(cells => {
          soft.check('Step 3 line Price', () => expect(cells.eq(0).text()).to.eq(`$ ${formatCents(unitPrice)}`));
          soft.check('Step 3 line Total', () => expect(cells.eq(1).text()).to.eq(`$ ${formatCents(2 * unitPrice)}`));
        });
      });
    });

    cy.log('Step 4: open and close the header cart dropdown');
    getElementByField(CypressFields.CartIcon).click();
    getElementByField(CypressFields.CartDropdownItem).should('have.length', 1);
    cy.get<string>('@productName').then(productName => {
      cy.get<number>('@unitPrice').then(unitPrice => {
        getElementByField(CypressFields.CartDropdownItem).then(item =>
          soft.check('Step 4 dropdown item', () => {
            expect(item.text()).to.contain(productName);
            expect(item.text()).to.contain(`$ ${formatCents(unitPrice)}`);
            expect(item.text()).to.contain('Quantity: 2');
          })
        );
      });
    });
    getElementByField(CypressFields.CartDropdown).contains('span', 'Close').should('not.be.visible');
    cy.contains('h1', 'Shipping Address').click();
    getElementByField(CypressFields.CartDropdown).should('not.exist');

    cy.log('Step 5: change the quantity to 3 and reload');
    cy.get<string>('@productName').then(productName => {
      getCartLineQuantity(productName).select('3');
      cy.wait('@updateCart');
      cy.wait('@getCart');
      cy.reload();
      cy.wait('@getShipping');
      getCartLineQuantity(productName).should('have.value', '3');
      cy.get<number>('@unitPrice').then(unitPrice => {
        getCartLinePrices(productName).then(cells =>
          soft.check('Step 5 line Total', () => expect(cells.eq(1).text()).to.eq(`$ ${formatCents(3 * unitPrice)}`))
        );
        cy.contains('section span', 'Shipping')
          .next()
          .invoke('text')
          .then(shippingText => {
            cy.contains('section h3', 'Total')
              .next()
              .invoke('text')
              .then(totalText =>
                soft.check('Step 5 cart Total', () =>
                  expect(totalText).to.eq(`$ ${formatCents(3 * unitPrice + priceToCents(shippingText))}`)
                )
              );
          });
      });
    });

    cy.log('Step 6: place the order');
    getElementByField(CypressFields.CheckoutPlaceOrder).click();
    cy.wait('@placeOrder');
    cy.location('pathname').should('match', /^\/cart\/checkout\/[^/]+$/);
    cy.reload();
    cy.contains('Your order is complete!').should('be.visible');
    cy.contains("We've sent you a confirmation email.").should('be.visible');
    cy.location('pathname').then(pathname => {
      cy.contains('Order ID:')
        .next()
        .should('have.text', pathname.split('/').pop() as string);
    });
    cy.contains('1600 Amphitheatre Parkway').should('be.visible');
    cy.contains('Mountain View, CA 94043').should('be.visible');
    cy.contains('United States').should('be.visible');
    cy.get<string>('@productName').then(productName => {
      cy.get<number>('@unitPrice').then(unitPrice => {
        cy.contains('div', 'Quantity: 3').should('contain', productName);
        cy.contains('div', 'Quantity: 3')
          .next()
          .then(itemPrice =>
            soft.check('Step 6 item line total', () =>
              expect(itemPrice.text()).to.eq(`$ ${formatCents(3 * unitPrice)}`)
            )
          );
      });
    });

    getElementByField(CypressFields.CartIcon).click();
    getElementByField(CypressFields.CartGoToShopping).click();
    cy.location('pathname').should('eq', '/cart');
    cy.contains('Your shopping cart is empty!').should('be.visible');

    soft.assertAll();
  });

  it('empties the cart with Empty Cart and keeps it empty after a reload', () => {
    cy.intercept('POST', '/api/cart*').as('addToCart');

    cy.log('Step 1: add a product to the cart');
    cy.visit('/');
    productCards().first().click();
    getElementByField(CypressFields.ProductName).invoke('text').should('not.be.empty').as('productName');
    getElementByField(CypressFields.ProductAddToCart).click();
    cy.wait('@addToCart');
    cy.location('pathname').should('eq', '/cart');
    cy.get<string>('@productName').then(productName => {
      cy.contains('section a', productName).should('be.visible');
    });

    cy.log('Step 2: empty the cart');
    cy.contains('button', 'Empty Cart').click();
    cy.contains('Your shopping cart is empty!').should('be.visible');
    readStoredSession().then(({ userId }) => {
      getStoredCart(userId).its('items').should('have.length', 0);
    });

    cy.log('Step 3: reload the cart');
    cy.reload();
    cy.contains('Your shopping cart is empty!').should('be.visible');
  });
});

export {};
