// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { CypressFields } from './enums/CypressFields';

export { CypressFields };

export const getElementByField = (field: CypressFields, context: Cypress.Chainable = cy) =>
  context.get(`[data-cy="${field}"]`);

interface IMoney {
  currencyCode?: string;
  units?: number;
  nanos?: number;
}

const NANOS_PER_UNIT = 1000000000;

export const toNanos = ({ units = 0, nanos = 0 }: IMoney) => Number(units) * NANOS_PER_UNIT + Number(nanos);

// Formats an amount the way the ProductPrice component shows it, e.g. "$ 349.95".
export const formatPrice = (amountInNanos: number, symbol: string) =>
  `${symbol} ${(amountInNanos / NANOS_PER_UNIT).toFixed(2)}`;

export const getStoredSession = () =>
  cy
    .window()
    .then(win => JSON.parse(win.localStorage.getItem('session') || '{}') as { userId: string; currencyCode: string });

export const getCartFromApi = (userId: string, currencyCode = 'USD') =>
  cy.request(`/api/cart?sessionId=${userId}&currencyCode=${currencyCode}`).its('body');

// The cart page asks for a shipping quote to this fixed address.
const CART_PAGE_ADDRESS = {
  streetAddress: '1600 Amphitheatre Parkway',
  city: 'Mountain View',
  state: 'CA',
  country: 'United States',
  zipCode: '94043',
};

export const getShippingQuote = (items: { productId: string; quantity: number }[]) =>
  cy
    .request({
      url: '/api/shipping',
      qs: {
        itemList: JSON.stringify(items.map(({ productId, quantity }) => ({ productId, quantity }))),
        currencyCode: 'USD',
        address: JSON.stringify(CART_PAGE_ADDRESS),
      },
    })
    .its('body');

// From the home page, opens the product card with that name and adds the quantity to the cart.
export const addProductToCartFromHome = (productName: string, quantity = 1) => {
  cy.intercept('POST', '/api/cart*').as('addToCart');
  cy.visit('/');
  cy.contains(`[data-cy="${CypressFields.ProductCard}"]`, productName).click();
  getElementByField(CypressFields.ProductName).should('have.text', productName);
  getElementByField(CypressFields.ProductQuantity).select(String(quantity));
  getElementByField(CypressFields.ProductAddToCart).click();
  cy.wait('@addToCart');
  cy.location('pathname').should('eq', '/cart');
};

const PRICE = `[data-cy="${CypressFields.ProductPrice}"]`;

interface IBlock {
  texts?: string[];
  startsWith?: string;
  prices?: number;
  hasQuantityControl?: boolean;
}

const isBlock =
  ({ texts = [], startsWith, prices = 0, hasQuantityControl }: IBlock) =>
  (el: Element) => {
    const text = (el.textContent || '').trim();
    const $el = Cypress.$(el);
    return (
      texts.every(t => text.includes(t)) &&
      (startsWith === undefined || text.startsWith(startsWith)) &&
      $el.find(PRICE).length === prices &&
      (hasQuantityControl === undefined || $el.find(':input').length > 0 === hasQuantityControl)
    );
  };

// The innermost element of the page whose content matches the block: its text, its prices and its quantity control.
const getBlock = (block: IBlock) =>
  cy
    .document()
    .its('body')
    .find('*')
    .filter((_, el) => isBlock(block)(el) && ![...el.children].some(isBlock(block)));

export const getCartColumnHeaders = () =>
  getBlock({ texts: ['Product', 'Quantity', 'Price', 'Total'], prices: 0, hasQuantityControl: false }).filter(
    (_, el) => (el.textContent || '').trim() === 'ProductQuantityPriceTotal'
  );

export const getCartLine = (productName: string) =>
  getBlock({ texts: [productName], prices: 2, hasQuantityControl: true });

export const getCartSummaryRow = (label: 'Shipping' | 'Total') =>
  getBlock({ startsWith: label, prices: 1, hasQuantityControl: false });

export const assertFooterShowsSession = () => {
  getStoredSession().then(({ userId }) => {
    expect(userId).to.be.a('string').and.not.be.empty;
    getElementByField(CypressFields.SessionId).should('have.length', 1).and('have.text', `session-id: ${userId}`);
  });
  cy.window().then(win => {
    const { NEXT_PUBLIC_PLATFORM = 'local' } =
      (win as unknown as { ENV?: { NEXT_PUBLIC_PLATFORM?: string } }).ENV || {};
    expect(NEXT_PUBLIC_PLATFORM).not.to.eq('');
    cy.contains(new RegExp(`^${NEXT_PUBLIC_PLATFORM}$`)).should('be.visible');
  });
};

// On the order confirmation page, the item block showing the product with its quantity and line total.
export const getOrderItem = (productName: string, quantity: number, lineTotal: string) =>
  getBlock({ texts: [productName, `Quantity: ${quantity}`, lineTotal], prices: 1 });

export const getOrderSummaryRow = (label: 'Shipping:' | 'Total:') => getBlock({ startsWith: label, prices: 1 });

// Names the journey step a failure happened in, and lets a check record a failure without stopping the journey.
export const startJourney = () => {
  const journey = { step: '', failures: [] as string[] };
  cy.on('fail', err => {
    err.message = `${journey.step}: ${err.message}`;
    throw err;
  });
  return {
    step(name: string, actions: () => void) {
      cy.then(() => {
        journey.step = name;
      });
      actions();
    },
    check(description: string, actual: unknown, expected: unknown) {
      if (actual !== expected) {
        journey.failures.push(`${journey.step}: ${description}: expected ${String(expected)}, got ${String(actual)}`);
      }
    },
    assertNoFailedChecks() {
      cy.then(() => {
        journey.step = 'outcome';
        expect(journey.failures, journey.failures.join('\n')).to.be.empty;
      });
    },
  };
};
