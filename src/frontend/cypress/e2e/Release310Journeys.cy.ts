// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import getSymbolFromCurrency from 'currency-symbol-map';
import {
  getCartRow,
  getCartSummaryPrice,
  getConfirmationItemPrice,
  getConfirmationPrice,
  getElementByField,
  getProductCard,
  getStoredSession,
  priceAmount,
} from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';
import { emptyCart, getCart, getShippingQuote } from '../../utils/CypressStoreApi';

const PRODUCT_ID = '0PUK6V6EV0';
const PRODUCT_NAME = 'Solar System Color Imager';

/** Matches a version 1 to 5 UUID such as uuid's v4() produces. */
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const amountIn = ($el: JQuery<HTMLElement>) => priceAmount($el.text());
const close = (a: number, b: number, tolerance = 0.005) => Math.abs(a - b) <= tolerance;

/**
 * Runs a journey step by step: a failed check is recorded with its step and the journey goes on where the page
 * still allows, and the test fails at the end with every failed check.
 */
const journey = () => {
  const failures: string[] = [];
  let current = '';

  return {
    failures,
    step(title: string, body: () => void) {
      cy.then(() => {
        current = title;
        Cypress.log({ name: 'step', message: title });
      });
      body();
    },
    check(ok: boolean, message: string) {
      if (!ok) failures.push(`${current}: ${message}`);
    },
    fail(message: string) {
      failures.push(`${current}: ${message}`);
    },
    finish() {
      cy.then(() => expect(failures, 'failed journey checks').to.deep.eq([]));
    },
  };
};

const requestedPictures = (alias: `@${string}`) =>
  cy.get<{ request: { url: string } }[]>(`${alias}.all` as `@${string}`).then(calls => [
    ...new Set(calls.map(({ request }) => new URL(request.url).pathname.replace('/images/products/', ''))),
  ]);

const waitForPrice = (subject: Cypress.Chainable<JQuery<HTMLElement>>) =>
  subject.should($price => expect(amountIn($price)).to.be.greaterThan(0));

describe('Release 3.1.0 shopper journeys', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/cart*').as('addToCart');
    cy.intercept('POST', '/api/checkout*').as('placeOrder');
    cy.intercept('GET', '/images/products/*').as('productImage');
  });

  afterEach(() => {
    getStoredSession().then(session => session?.userId && emptyCart(session.userId));
  });

  it('buys a product, changes its quantity in the cart and places the order', () => {
    const j = journey();
    let unitPrice = 0;
    let userId = '';
    cy.viewport(1280, 600);

    j.step('Step 1: opens the home page and scrolls the product list', () => {
      cy.visit('/');
      getElementByField(CypressFields.ProductCard, getElementByField(CypressFields.ProductList)).should('have.length', 10);
      getElementByField(CypressFields.ProductCard).each($card => {
        j.check($card.find('p').first().text().trim() !== '', 'a product card has no name');
        j.check($card.find(`[data-cy="${CypressFields.ProductPrice}"]`).text().includes('$'), 'a product card has no USD price');
      });
      cy.wait(2000);
      requestedPictures('@productImage').then(before =>
        j.check(before.length < 10, `all ${before.length} product images were requested before scrolling`)
      );
      cy.scrollTo('bottom', { duration: 1000 });
      cy.wait(2000);
      requestedPictures('@productImage').then(after =>
        j.check(after.length === 10, `${after.length} of 10 product images requested after scrolling`)
      );
      getStoredSession().then(session => {
        j.check(UUID.test(session?.userId ?? ''), `stored userId ${session?.userId} is not a UUID`);
        j.check(session?.currencyCode === 'USD', `stored currency is ${session?.currencyCode}`);
        userId = session?.userId ?? '';
      });
    });

    j.step('Step 2: opens the product page', () => {
      cy.intercept('GET', '/api/recommendations*').as('recommendations');
      getProductCard(PRODUCT_ID).click();
      getElementByField(CypressFields.ProductPicture).should('exist');
      getElementByField(CypressFields.ProductName).should('contain', PRODUCT_NAME);
      getElementByField(CypressFields.ProductDescription).should('not.be.empty');
      waitForPrice(getElementByField(CypressFields.ProductName).parent().find(`[data-cy="${CypressFields.ProductPrice}"]`))
        .then(amountIn)
        .then(price => {
          unitPrice = price;
        });
      cy.wait('@recommendations');
      getElementByField(CypressFields.ProductCard, getElementByField(CypressFields.RecommendationList))
        .should('have.length.at.least', 1)
        .then($cards => {
          const shown = [...$cards].map(card => card.closest('a')?.getAttribute('href'));
          j.check(!shown.includes(`/product/${PRODUCT_ID}`), "'You May Also Like' lists the product being viewed");
        });
    });

    j.step('Step 3: adds 3 to the cart', () => {
      getElementByField(CypressFields.ProductQuantity).select('3');
      getElementByField(CypressFields.ProductAddToCart).click();
      cy.wait('@addToCart');
      cy.location('pathname').should('eq', '/cart');
      getElementByField(CypressFields.CartItemCount).should('contain', '1');
      getCartRow(PRODUCT_ID).find('select').should('have.value', '3');
    });

    j.step('Step 4: reads the cart row', () => {
      getCartRow(PRODUCT_ID).should('contain', PRODUCT_NAME);
      getCartRow(PRODUCT_ID)
        .find(`img[alt="${PRODUCT_NAME}"]`)
        .should($img => expect(($img[0] as HTMLImageElement).naturalWidth).to.be.greaterThan(0));
      getCartRow(PRODUCT_ID)
        .find(`[data-cy="${CypressFields.ProductPrice}"]`)
        .should('have.length', 2)
        .then($prices => {
          const [price, total] = [...$prices].map(el => priceAmount(el.textContent ?? ''));
          j.check(close(price, unitPrice), `row price ${price}, product page price ${unitPrice}`);
          j.check(close(total, unitPrice * 3), `row total ${total}, expected 3 x ${unitPrice}`);
        });
    });

    j.step('Step 5: changes the quantity to 2', () => {
      getCartRow(PRODUCT_ID).find('select').select('2');
      cy.wait('@addToCart');
      waitForPrice(getCartSummaryPrice('Shipping'))
        .then(amountIn)
        .then(shipping => {
          j.check(close(shipping, 8.99), `cart shipping ${shipping}`);
          getCartSummaryPrice('Total').should($total => expect(amountIn($total)).to.be.closeTo(unitPrice * 2 + 8.99, 0.005));
        });
      getCartRow(PRODUCT_ID)
        .find(`[data-cy="${CypressFields.ProductPrice}"]`)
        .eq(1)
        .then($total => j.check(close(amountIn($total), unitPrice * 2), `row total ${$total.text()}, expected 2 x ${unitPrice}`));
    });

    j.step('Step 6: reloads the cart page', () => {
      cy.reload();
      getStoredSession().then(session => j.check(session?.userId === userId, `userId changed to ${session?.userId}`));
      getCartRow(PRODUCT_ID).find('select').should('have.value', '2');
      getCartRow(PRODUCT_ID)
        .find(`[data-cy="${CypressFields.ProductPrice}"]`)
        .eq(1)
        .then($total => j.check(close(amountIn($total), unitPrice * 2), `row total after reload ${$total.text()}`));
    });

    j.step('Step 7: places the order with the form defaults', () => {
      getElementByField(CypressFields.CheckoutPlaceOrder).click();
      cy.wait('@placeOrder').then(({ request, response }) => {
        expect(request.body.userId).to.eq(userId);
        expect(request.body.userCurrency).to.eq('USD');
        expect(response?.statusCode).to.eq(200);
        expect(response?.body.shippingCost).to.deep.eq({ currencyCode: 'USD', units: 8, nanos: 990000000 });
      });
      cy.location('pathname').should('match', /^\/cart\/checkout\/[^/]+$/);
    });

    j.step('Step 8: reads the confirmation page', () => {
      cy.contains('Your order is complete!');
      cy.contains("We've sent you a confirmation email.");
      cy.contains('Order ID:');
      cy.location('pathname').then(pathname => cy.contains('main', pathname.split('/').pop()!));
      cy.contains('main', '1600 Amphitheatre Parkway');
      cy.contains('main', 'Mountain View, CA 94043');
      cy.contains('main', 'United States');
      cy.get('main img[alt]').filter(`[alt="${PRODUCT_NAME}"]`).should('have.length', 1);
      cy.contains('main', 'Quantity: 2');
      getConfirmationPrice('Shipping:').should('contain', '$ 8.99');
      getConfirmationPrice('Total:').should($total => expect(amountIn($total)).to.be.closeTo(unitPrice * 2 + 8.99, 0.005));
      getElementByField(CypressFields.CartItemCount).should('not.exist');
      cy.then(() => getCart(userId)).its('body.items').should('have.length', 0);
      cy.reload();
    });

    cy.log('Outcome: the confirmation page after a reload, and an empty cart');
    cy.contains('Your order is complete!');
    cy.contains("We've sent you a confirmation email.");
    cy.location('pathname').then(pathname => cy.contains('main', pathname.split('/').pop()!));
    cy.contains('main', '1600 Amphitheatre Parkway');
    cy.contains('main', 'Mountain View, CA 94043');
    cy.contains('main', 'United States');
    cy.contains('main', PRODUCT_NAME);
    cy.contains('main', 'Quantity: 2');
    getConfirmationPrice('Shipping:').should('contain', '$ 8.99');
    getConfirmationPrice('Total:').should($total => expect(amountIn($total)).to.be.closeTo(unitPrice * 2 + 8.99, 0.005));
    cy.then(() => getCart(userId)).its('body.items').should('have.length', 0);
    cy.wrap(j.failures, { log: false }).should('deep.equal', []);
  });

  it('shops and checks out in euros', () => {
    const j = journey();
    let currency = 'EUR';

    j.step('Step 1: opens the currency switcher', () => {
      cy.visit('/');
      getElementByField(CypressFields.CurrencySwitcher)
        .find('option')
        .should('have.length.greaterThan', 1)
        .then($options => {
          const codes = [...$options].map(o => (o as HTMLOptionElement).value);
          j.check(JSON.stringify(codes) === JSON.stringify([...codes].sort()), 'currency options are not in alphabetical order');
          if (!codes.includes('EUR')) {
            j.fail('EUR is not offered; the journey goes on in CAD');
            currency = 'CAD';
          }
        });
    });

    j.step('Step 2: selects the currency', () => {
      cy.then(() => getElementByField(CypressFields.CurrencySwitcher).select(currency));
      cy.then(() =>
        getElementByField(CypressFields.ProductCard)
          .first()
          .find(`[data-cy="${CypressFields.ProductPrice}"]`)
          .should('contain', getSymbolFromCurrency(currency))
      );
    });

    j.step('Step 3: reloads the page', () => {
      cy.reload();
      cy.then(() => getElementByField(CypressFields.CurrencySwitcher).should('have.value', currency));
      getStoredSession().then(session => j.check(session?.currencyCode === currency, `stored currency ${session?.currencyCode}`));
    });

    j.step('Step 4: adds a product to the cart', () => {
      getProductCard(PRODUCT_ID).click();
      getElementByField(CypressFields.ProductAddToCart).click();
      cy.wait('@addToCart');
      cy.location('pathname').should('eq', '/cart');
      cy.then(() => getCartRow(PRODUCT_ID).should('contain', getSymbolFromCurrency(currency)));
    });

    let cartShipping = 0;
    j.step('Step 5: places the order with the default form', () => {
      waitForPrice(getCartSummaryPrice('Shipping'))
        .then(amountIn)
        .then(shipping => {
          cartShipping = shipping;
        });
      getElementByField(CypressFields.CheckoutPlaceOrder).click();
      cy.wait('@placeOrder').its('response.statusCode').should('eq', 200);
      cy.location('pathname').should('match', /^\/cart\/checkout\/[^/]+$/);
      cy.contains('Your order is complete!');
    });

    j.step('Step 6: reads shipping cost and total', () => {
      getConfirmationPrice('Shipping:').then($shipping => {
        cy.then(() => expect($shipping.text()).to.contain(getSymbolFromCurrency(currency)));
        j.check(close(amountIn($shipping), cartShipping, 0.01), `confirmation shipping ${$shipping.text()}, cart estimate ${cartShipping}`);
        getConfirmationItemPrice(1)
          .then($item => {
            getConfirmationPrice('Total:').then($total =>
              j.check(
                close(amountIn($total), amountIn($item) + cartShipping, 0.01),
                `total ${$total.text()}, expected item ${$item.text()} + shipping ${cartShipping}`
              )
            );
          });
      });
    });

    cy.log('Outcome: the confirmation page in the chosen currency, with converted shipping and a matching total');
    cy.contains('Your order is complete!');
    cy.then(() => getShippingQuote([{ productId: PRODUCT_ID, quantity: 1 }], currency)).then(({ body: quote }) => {
      const converted = Number(quote.units) + Number(quote.nanos) / 1e9;
      getConfirmationPrice('Shipping:').then($shipping => {
        j.check($shipping.text().includes(getSymbolFromCurrency(currency) ?? currency), `confirmation shipping ${$shipping.text()} not in ${currency}`);
        j.check(close(amountIn($shipping), converted, 0.01), `confirmation shipping ${$shipping.text()}, converted quote ${converted.toFixed(2)}`);
        getConfirmationItemPrice(1).then($item =>
          getConfirmationPrice('Total:').then($total =>
            j.check(close(amountIn($total), amountIn($item) + converted, 0.01), `total ${$total.text()}, expected item ${$item.text()} + ${converted.toFixed(2)}`)
          )
        );
      });
    });
    cy.wrap(j.failures, { log: false }).should('deep.equal', []);
  });

  it('comes back to the shop with a damaged saved session', () => {
    const j = journey();
    let pageError = '';
    cy.on('uncaught:exception', error => {
      pageError = error.message;
      return false;
    });

    j.step('Step 1: visits the home page with a damaged session', () => {
      cy.visit('/', {
        onBeforeLoad(win) {
          win.localStorage.setItem('session', 'not-json');
        },
      });
      cy.wait(3000);
      cy.get('body').then($body => {
        const cards = $body.find(`[data-cy="${CypressFields.ProductCard}"]`).length;
        j.check(cards === 10, `${cards} product cards shown${pageError ? `, page error: ${pageError}` : ''}`);
      });
    });

    j.step('Step 2: opens a product and adds it to the cart', () => {
      cy.get('body').then($body => {
        if (!$body.find(`a[href="/product/${PRODUCT_ID}"]`).length) {
          j.fail('not reached: no product card to open');
          return;
        }
        getProductCard(PRODUCT_ID).click();
        getElementByField(CypressFields.ProductAddToCart).click();
        cy.wait('@addToCart');
        cy.location('pathname').should('eq', '/cart');
        getCartRow(PRODUCT_ID).should('contain', PRODUCT_NAME);
        getStoredSession().then(session => {
          j.check(UUID.test(session?.userId ?? ''), `stored session ${JSON.stringify(session)}`);
          getCart(session!.userId).its('body.items').should('have.length', 1);
        });
      });
    });

    j.finish();
  });

  describe('with a product that has no picture', () => {
    const noPictureId = `NOPIC${Date.now()}`;
    const noPictureName = `No Picture Lens ${noPictureId}`;

    before(() => {
      cy.task(
        'catalogQuery',
        `INSERT INTO catalog.products VALUES ('${noPictureId}', '${noPictureName}', 'A product sold without a picture.', '', 'USD', 10, 0, 'accessories')`
      );
    });

    after(() => {
      cy.task('catalogQuery', `DELETE FROM catalog.products WHERE id = '${noPictureId}'`);
    });

    it('views and buys a product that has no picture', () => {
      const j = journey();
      cy.intercept('GET', '/images/products/undefined').as('undefinedImage');
      cy.intercept('GET', '/images/products/').as('emptyImage');
      const brokenImageRequests = () =>
        cy.get('@undefinedImage.all').then(undefinedCalls =>
          cy.get('@emptyImage.all').then(emptyCalls => undefinedCalls.length + emptyCalls.length)
        );

      j.step('Step 1: opens the home page', () => {
        cy.visit('/');
        getProductCard(noPictureId).should('contain', noPictureName);
        cy.scrollTo('bottom');
        cy.wait(1000);
        brokenImageRequests().then(count => j.check(count === 0, `${count} requests to /images/products/ or /images/products/undefined`));
      });

      j.step('Step 2: opens the product and adds it to the cart', () => {
        getProductCard(noPictureId).click();
        getElementByField(CypressFields.ProductName).should('contain', noPictureName);
        getElementByField(CypressFields.ProductDescription).should('contain', 'A product sold without a picture.');
        cy.get('body').then($body =>
          j.check(!$body.find(`[data-cy="${CypressFields.ProductPicture}"]`).length, 'product picture is rendered')
        );
        getElementByField(CypressFields.ProductAddToCart).click();
        cy.wait('@addToCart');
        cy.location('pathname').should('eq', '/cart');
      });

      j.step('Step 3: opens the cart dropdown and cart page', () => {
        getCartRow(noPictureId).should('contain', noPictureName);
        getCartRow(noPictureId).then($row => j.check(!$row.find('img').length, 'cart row renders an image'));
        getElementByField(CypressFields.CartIcon).click({ force: true });
        getElementByField(CypressFields.CartDropdownItem).should('have.length', 1).and('contain', noPictureName);
        getElementByField(CypressFields.CartDropdownItem).then($item => j.check(!$item.find('img').length, 'dropdown item renders an image'));
      });

      cy.log('Outcome: the product is in the cart and no broken image was requested');
      getStoredSession().then(session => getCart(session!.userId)).its('body.items').should($items => {
        expect($items.map(({ productId }: { productId: string }) => productId)).to.deep.eq([noPictureId]);
      });
      brokenImageRequests().then(count => j.check(count === 0, `${count} requests to /images/products/ or /images/products/undefined`));
      cy.wrap(j.failures, { log: false }).should('deep.equal', []);
    });
  });

  it('pays with a card that expires this month', () => {
    const now = new Date();

    cy.log('Step 1: opens a product and adds it to the cart');
    cy.visit('/');
    getProductCard(PRODUCT_ID).click();
    getElementByField(CypressFields.ProductAddToCart).click();
    cy.wait('@addToCart');
    cy.location('pathname').should('eq', '/cart');
    getCartRow(PRODUCT_ID).should('contain', PRODUCT_NAME);

    cy.log('Step 2: pays with a card expiring this month');
    cy.get('#credit_card_expiration_month').select(String(now.getMonth() + 1));
    cy.get('#credit_card_expiration_year').select(String(now.getFullYear()));
    cy.on('uncaught:exception', () => false);
    getElementByField(CypressFields.CheckoutPlaceOrder).click();
    cy.wait('@placeOrder').its('response.statusCode').should('eq', 200);
    cy.location('pathname').should('match', /^\/cart\/checkout\/[^/]+$/);
    cy.contains('Your order is complete!');
    cy.contains('main', PRODUCT_NAME);
  });
});

export {};
