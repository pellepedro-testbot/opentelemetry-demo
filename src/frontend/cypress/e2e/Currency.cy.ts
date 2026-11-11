// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import getSymbolFromCurrency from 'currency-symbol-map';
import { getElementByField } from '../../utils/Cypress';
import { Journey } from '../../utils/CypressJourney';
import { productCardNamed, readLabelledValue } from '../../utils/CypressStorefront';
import { CypressFields } from '../../utils/enums/CypressFields';

const switcherOptions = ($body: JQuery<HTMLElement>) =>
  $body
    .find(`[data-cy="${CypressFields.CurrencySwitcher}"] option`)
    .map((_, el) => (el as HTMLOptionElement).value)
    .get();

const isSorted = (codes: string[]) => codes.every((code, i) => i === 0 || codes[i - 1].localeCompare(code) <= 0);

describe('Currency', () => {
  it('offers every supported currency, EUR included, in alphabetical order', () => {
    cy.visit('/');
    getElementByField(CypressFields.CurrencySwitcher)
      .find('option')
      .should('have.length.greaterThan', 1)
      .then($options => {
        const codes = $options.map((_, el) => (el as HTMLOptionElement).value).get();
        expect(codes, 'switcher options').to.include('EUR');
        expect(isSorted(codes), `sorted: ${codes.join(',')}`).to.eq(true);
      });
  });

  it('shops and orders in euros', () => {
    const journey = new Journey();
    let currency = 'EUR';
    let cartShipping = '';
    let cartTotal = '';

    journey.step('1. read the currency switcher', () => {
      cy.visit('/');
      getElementByField(CypressFields.ProductList).should('be.visible');
      journey
        .expectSoon('switcher lists EUR, sorted', switcherOptions, codes => codes.includes('EUR') && isSorted(codes))
        .then(codes => {
          // Without EUR the rest of the journey is walked in GBP, so its later checks still run.
          if (!codes.includes('EUR')) currency = 'GBP';
        });
    });

    journey.step('2. switch to EUR', () => {
      cy.then(() => getElementByField(CypressFields.CurrencySwitcher).select(currency));
      journey.expectSoon(
        'product prices show the euro symbol',
        $body => $body.find(`[data-cy="${CypressFields.ProductCard}"]`).first().text(),
        text => text.includes(getSymbolFromCurrency(currency) as string)
      );
    });

    journey.step('3. reload the storefront', () => {
      cy.visit('/');
      journey.expectSoon(
        'switcher still shows the chosen currency',
        $body => String($body.find(`[data-cy="${CypressFields.CurrencySwitcher}"]`).val()),
        value => value === currency
      );
    });

    journey.step('4. add the Solar System Color Imager to the cart', () => {
      cy.intercept('GET', '/api/cart*').as('getCart');
      productCardNamed('Solar System Color Imager').click();
      getElementByField(CypressFields.ProductAddToCart).click();
      cy.location('pathname').should('eq', '/cart');
      cy.wait('@getCart');
      journey
        .expectSoon(
          'cart shipping and total are in the chosen currency',
          $body => ({ shipping: readLabelledValue($body, 'Shipping'), total: readLabelledValue($body, 'Total') }),
          ({ shipping, total }) => {
            const symbol = getSymbolFromCurrency(currency) as string;
            return shipping.startsWith(symbol) && total.startsWith(symbol);
          }
        )
        .then(({ shipping, total }) => {
          cartShipping = shipping;
          cartTotal = total;
        });
    });

    journey.step('5. place the order', () => {
      cy.intercept('POST', '/api/checkout*').as('placeOrder');
      getElementByField(CypressFields.CheckoutPlaceOrder).click();
      cy.wait('@placeOrder');
      cy.contains('h1', 'Your order is complete!').should('be.visible');
    });

    journey.step('6. read shipping and total on the confirmation', () => {
      journey.expectSoon(
        'confirmation shipping and total equal the cart page',
        $body => ({
          shipping: readLabelledValue($body, 'Shipping:'),
          total: readLabelledValue($body, 'Total:'),
          cartShipping,
          cartTotal,
        }),
        v => v.shipping !== '' && v.shipping === v.cartShipping && v.total === v.cartTotal
      );
    });

    journey.finish();
  });
});

export {};
