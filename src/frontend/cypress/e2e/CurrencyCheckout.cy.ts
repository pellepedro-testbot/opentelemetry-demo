// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import getSymbolFromCurrency from 'currency-symbol-map';
import { getElementByField } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';
import {
  addShownProductToCart,
  cartLine,
  cartShipping,
  cartTotal,
  interceptStorefrontApi,
  orderShipping,
  orderTotal,
  placeOrder,
  StepChecks,
} from '../helpers/storefront';

const currencyOptions = () =>
  getElementByField(CypressFields.CurrencySwitcher)
    .find('option')
    .then($options => [...$options].map(option => (option as HTMLOptionElement).value));

const openFirstProduct = () => getElementByField(CypressFields.ProductCard).first().click();

describe('Shopping in another currency', () => {
  beforeEach(() => {
    interceptStorefrontApi();
  });

  it('lists the currencies in alphabetical order', () => {
    cy.visit('/');
    currencyOptions().then(values => {
      expect(values).to.have.length.greaterThan(1);
      expect(values).to.deep.equal([...values].sort());
    });
  });

  it('offers EUR and shows euro prices after switching', () => {
    cy.visit('/');
    currencyOptions().should('include', 'EUR');
    getElementByField(CypressFields.CurrencySwitcher).select('EUR');

    getElementByField(CypressFields.CurrencySwitcher).should('have.value', 'EUR');
    getElementByField(CypressFields.ProductCard).should('contain', getSymbolFromCurrency('EUR'));
  });

  it('keeps the chosen currency after a reload', () => {
    cy.visit('/');
    getElementByField(CypressFields.CurrencySwitcher).select('CAD');
    getElementByField(CypressFields.CurrencySwitcher).should('have.value', 'CAD');

    cy.reload();

    getElementByField(CypressFields.CurrencySwitcher).should('have.value', 'CAD');
    getElementByField(CypressFields.ProductCard).first().should('contain', getSymbolFromCurrency('CAD'));
  });

  it('charges the converted shipping shown in the cart for a CAD order', () => {
    const cart = { shipping: 0, total: 0 };
    cy.visit('/');
    getElementByField(CypressFields.CurrencySwitcher).select('CAD');
    getElementByField(CypressFields.CurrencySwitcher).should('have.value', 'CAD');
    openFirstProduct();
    addShownProductToCart();
    cartShipping().then(shipping => {
      cart.shipping = shipping;
    });
    cartTotal().then(total => {
      cart.total = total;
    });

    placeOrder();

    cy.location('pathname').should('match', /^\/cart\/checkout\/[^/]+$/);
    orderShipping().then(shipping => expect(shipping, 'order Shipping').to.be.closeTo(cart.shipping, 0.005));
    orderTotal().then(total => expect(total, 'order Total').to.be.closeTo(cart.total, 0.005));
  });

  it('shops in euros and places an order whose shipping matches the cart', () => {
    const checks = new StepChecks();
    const cart = { shipping: 0, total: 0 };
    let currency = 'EUR';

    checks.step('Step 1: the currency options are sorted and include EUR');
    cy.visit('/');
    currencyOptions().then(values => {
      checks.check('Step 1 sorted options', () => expect(values).to.deep.equal([...values].sort()));
      checks.check('Step 1 EUR offered', () => expect(values).to.include('EUR'));
      if (!values.includes('EUR')) {
        currency = 'CAD';
      }
    });

    checks.step('Step 2: switch to euros');
    cy.then(() => {
      getElementByField(CypressFields.CurrencySwitcher).select(currency);
      getElementByField(CypressFields.ProductCard)
        .first()
        .should('contain', getSymbolFromCurrency(currency))
        .invoke('text')
        .then(text => {
          checks.check('Step 2 euro prices', () => expect(text).to.contain(getSymbolFromCurrency('EUR')));
        });
    });

    checks.step('Step 3: the currency is kept after a reload');
    cy.reload();
    cy.then(() => {
      getElementByField(CypressFields.CurrencySwitcher)
        .should($switcher => expect($switcher.find('option').length).to.be.greaterThan(1))
        .invoke('val')
        .then(value => {
          checks.check('Step 3 currency after reload', () => expect(value).to.eq(currency));
        });
    });

    checks.step('Step 4: add the first product to the cart');
    openFirstProduct();
    addShownProductToCart().then(product => {
      cartLine(product.name)
        .invoke('text')
        .then(text => {
          checks.check('Step 4 cart price currency', () => expect(text).to.contain(getSymbolFromCurrency(currency)));
        });
    });

    checks.step('Step 5: note the shipping and place the order');
    cartShipping().then(shipping => {
      cart.shipping = shipping;
    });
    cartTotal().then(total => {
      cart.total = total;
    });
    placeOrder();
    cy.location('pathname').should('match', /^\/cart\/checkout\/[^/]+$/);

    checks.step('Step 6: the order shipping equals the cart shipping');
    cy.contains('h1', 'Your order is complete!').should('be.visible');
    orderShipping().then(shipping => {
      checks.check('Step 6 order Shipping', () => expect(shipping).to.be.closeTo(cart.shipping, 0.005));
    });
    orderTotal().then(total => {
      checks.check('Step 6 order Total', () => expect(total).to.be.closeTo(cart.total, 0.005));
    });

    checks.assertAll();
  });
});

export {};
