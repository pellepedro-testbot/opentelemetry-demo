// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import getSymbolFromCurrency from 'currency-symbol-map';
import { getElementByField, setFlag } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

const PRODUCT_ID = 'OLJCESPC7Z';
const PRODUCT_NAME = 'National Park Foundation Explorascope';
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

type Failures = string[];

// Records a failed check and lets the journey go on to its next step; the test fails at the end.
const check = (failures: Failures, step: string, fn: () => void) => {
  try {
    fn();
  } catch (e) {
    failures.push(`${step}: ${(e as Error).message}`);
  }
};

const assertNoFailures = (failures: Failures) =>
  cy.then(() => {
    expect(failures, failures.join('\n')).to.have.length(0);
  });

const amount = (text: string) => parseFloat(text.replace(/[^0-9.]/g, ''));

const money = (symbol: string, value: number) => `${symbol} ${(Math.round(value * 100) / 100).toFixed(2)}`;

const times = (value: number, quantity: number) => (Math.round(value * 100) * quantity) / 100;

const PRICE = `[data-cy="${CypressFields.ProductPrice}"]`;
const CARD = `[data-cy="${CypressFields.ProductCard}"]`;

// Each summary row is found by its label text followed by one amount, e.g. "Shipping$ 8.99".
const priceIn = (row: RegExp) => cy.contains('div', row).find(PRICE);
// The cart line starts with the product name followed by its quantity options 1..10.
const cartLineRow = (name: string) => new RegExp(`^${name}12345678910`);
// Price then Total, in the order of the cart columns.
const cartLinePrices = (name: string) => cy.contains('div', cartLineRow(name)).find(PRICE);
const cartShippingPrice = () => priceIn(/^Shipping\D*[\d.]+$/);
const cartTotalPrice = () => priceIn(/^Total\D*[\d.]+$/);
const orderItemPrice = (name: string) => priceIn(new RegExp(`^${name}Quantity: \\d+\\D*[\\d.]+$`));
const orderShippingPrice = () => priceIn(/^Shipping:\D*[\d.]+$/);
const orderTotalPrice = () => priceIn(/^Total:\D*[\d.]+$/);
const cardPrice = (name: string) => cy.contains(CARD, name).find(PRICE);

const readSession = (win: Window) => JSON.parse(win.localStorage.getItem('session') || 'null');

const imageLoaded = (alt: string) =>
  cy
    .get(`img[alt="${alt}"]`)
    .should('be.visible')
    .and($img => {
      expect(($img[0] as HTMLImageElement).naturalWidth, `${alt} image width`).to.be.greaterThan(0);
    });

const openProductFromHome = () => {
  getElementByField(CypressFields.ProductCard).contains('Explorascope').click();
  getElementByField(CypressFields.ProductName).should('contain', 'Explorascope');
};

const addToCart = () => {
  getElementByField(CypressFields.ProductAddToCart).click();
  cy.contains('Shopping Cart').should('be.visible');
  cy.location('pathname').should('eq', '/cart');
};

const placeOrder = () => {
  getElementByField(CypressFields.CheckoutPlaceOrder).click();
  cy.location('pathname', { timeout: 20000 }).should('match', /^\/cart\/checkout\//);
  cy.contains('Your order is complete!').should('be.visible');
};

describe('Release 3.1.0 storefront journeys', () => {
  it('buys a product in quantity 3 and sees the order confirmation', () => {
    const failures: Failures = [];
    cy.intercept('GET', '/api/recommendations*').as('getRecommendations');
    let unitPrice = 0;

    cy.log('Step 1: home page');
    cy.visit('/');
    getElementByField(CypressFields.ProductList).should('be.visible');
    cy.window().then(win => {
      check(failures, 'step 1 stored session', () => {
        const session = readSession(win);
        expect(session.userId).to.match(UUID);
        expect(session.currencyCode).to.eq('USD');
      });
    });
    getElementByField(CypressFields.ProductCard)
      .should('have.length.greaterThan', 0)
      .each($card => {
        cy.wrap($card).should(() => {
          const backgrounds = Array.from($card[0].querySelectorAll('*')).map(el => getComputedStyle(el).backgroundImage);
          expect(backgrounds.some(bg => bg.includes('blob:')), 'product card image').to.eq(true);
        });
      });

    cy.log('Step 2: product page');
    openProductFromHome();
    getElementByField(CypressFields.ProductPicture).should('be.visible');
    getElementByField(CypressFields.ProductDetail)
      .find(`[data-cy="${CypressFields.ProductPrice}"]`)
      .invoke('text')
      .then(text => {
        unitPrice = amount(text);
      });
    cy.wait('@getRecommendations');
    getElementByField(CypressFields.RecommendationList)
      .find('a')
      .should('have.length.greaterThan', 0)
      .then($links => {
        const hrefs = $links.toArray().map(a => a.getAttribute('href'));
        check(failures, 'step 2 recommendations', () =>
          expect(hrefs, 'recommendation links').not.to.include(`/product/${PRODUCT_ID}`)
        );
      });

    cy.log('Step 3: add three to the cart');
    getElementByField(CypressFields.ProductQuantity).select('3');
    addToCart();

    cy.log('Step 4: cart page');
    cartShippingPrice()
      .should('not.contain', ' 0.00')
      .invoke('text')
      .then(shipping => {
        check(failures, 'step 4 shipping', () => expect(shipping).to.eq('$ 8.99'));
      });
    cartLinePrices(PRODUCT_NAME)
      .should('have.length', 2)
      .then($prices => {
        const [price, lineTotal] = $prices.toArray().map(el => el.textContent || '');
        check(failures, 'step 4 price', () => expect(price).to.eq(money('$', unitPrice)));
        check(failures, 'step 4 line total', () => expect(lineTotal).to.eq(money('$', times(unitPrice, 3))));
      });
    cartTotalPrice()
      .invoke('text')
      .then(total => {
        check(failures, 'step 4 cart total', () => expect(total).to.eq(money('$', times(unitPrice, 3) + 8.99)));
      });
    imageLoaded(PRODUCT_NAME);
    getElementByField(CypressFields.CartIcon).click({ force: true });
    getElementByField(CypressFields.CartDropdownItem)
      .find(`img[alt="${PRODUCT_NAME}"]`)
      .should($img => {
        expect(($img[0] as HTMLImageElement).naturalWidth, 'cart dropdown image width').to.be.greaterThan(0);
      });
    getElementByField(CypressFields.CartIcon).click({ force: true });

    cy.log('Step 5: place the order');
    placeOrder();

    cy.log('Step 6: confirmation page');
    const checkConfirmation = (step: string) => {
      cy.contains('Quantity: 3').should('be.visible');
      orderItemPrice(PRODUCT_NAME)
        .invoke('text')
        .then(itemTotal => {
          check(failures, `${step} item total`, () => expect(itemTotal).to.eq(money('$', times(unitPrice, 3))));
        });
      orderShippingPrice()
        .invoke('text')
        .then(shipping => {
          check(failures, `${step} shipping`, () => expect(shipping).to.eq('$ 8.99'));
        });
      orderTotalPrice()
        .invoke('text')
        .then(total => {
          check(failures, `${step} total`, () => expect(total).to.eq(money('$', times(unitPrice, 3) + 8.99)));
        });
      imageLoaded(PRODUCT_NAME);
    };
    checkConfirmation('step 6');
    cy.reload();
    cy.contains('Your order is complete!').should('be.visible');
    checkConfirmation('step 6 after reload');

    assertNoFailures(failures);
  });

  it('shops in another currency and the order matches the cart', () => {
    const failures: Failures = [];
    let currency = 'EUR';
    let userId = '';
    let cartShipping = '';
    let usdFirstPrice = '';

    cy.log('Step 1: currency list');
    cy.visit('/');
    cardPrice('Explorascope')
      .invoke('text')
      .then(text => {
        usdFirstPrice = text;
      });
    cy.request('/api/currency').then(({ body }) => {
      getElementByField(CypressFields.CurrencySwitcher)
        .find('option')
        .then($options => {
          const values = $options.toArray().map(o => (o as HTMLOptionElement).value);
          check(failures, 'step 1 sorted', () => expect(values).to.deep.eq([...values].sort()));
          check(failures, 'step 1 api codes', () => expect(values).to.include.members(body as string[]));
          check(failures, 'step 1 EUR offered', () => expect(values).to.include('EUR'));
          if (!values.includes('EUR')) currency = 'CHF';
        });
    });

    cy.log('Step 2: choose the currency');
    cy.then(() => {
      getElementByField(CypressFields.CurrencySwitcher).select(currency);
      const symbol = getSymbolFromCurrency(currency) || currency;
      cardPrice('Explorascope')
        .should('contain', symbol)
        .invoke('text')
        .then(text => {
          check(failures, 'step 2 converted price', () => expect(amount(text)).not.to.eq(amount(usdFirstPrice)));
        });
    });

    cy.log('Step 3: reload keeps the session');
    cy.window().then(win => {
      userId = readSession(win).userId;
    });
    cy.reload();
    cy.then(() => getElementByField(CypressFields.CurrencySwitcher).should('have.value', currency));
    cy.window().then(win => {
      check(failures, 'step 3 same user', () => expect(readSession(win).userId).to.eq(userId));
    });

    cy.log('Step 4: add the product');
    openProductFromHome();
    addToCart();

    cy.log('Step 5: cart shipping');
    cartShippingPrice()
      .should('not.contain', ' 0.00')
      .invoke('text')
      .then(text => {
        cartShipping = text;
        check(failures, 'step 5 shipping currency', () =>
          expect(text).to.contain(getSymbolFromCurrency(currency) || currency)
        );
      });

    cy.log('Step 6: reload the cart');
    cy.reload();
    cy.contains('div', cartLineRow(PRODUCT_NAME)).should('be.visible');

    cy.log('Step 7: place the order');
    placeOrder();
    orderShippingPrice()
      .invoke('text')
      .then(text => {
        check(failures, 'step 7 confirmation shipping', () => expect(text).to.eq(cartShipping));
      });

    assertNoFailures(failures);
  });

  it('lands on a broken link and gets back to the shop', () => {
    cy.log('Step 1: unknown URL');
    cy.request({ url: '/no-such-page', failOnStatusCode: false }).its('status').should('eq', 404);
    cy.visit('/no-such-page', { failOnStatusCode: false });
    cy.contains('404').should('be.visible');
    cy.contains('This page could not be found.').should('be.visible');

    cy.log('Step 2: back home');
    cy.contains('Go to homepage').click();
    cy.location('pathname').should('eq', '/');
    getElementByField(CypressFields.ProductList).should('be.visible');
  });

  it('comes back with a corrupted saved session', () => {
    const failures: Failures = [];
    cy.on('uncaught:exception', err => {
      failures.push(`page error: ${err.message}`);
      return false;
    });

    const checkFreshSession = (step: string) => {
      cy.wait(5000);
      cy.document().then(doc => {
        const prices = Array.from(doc.querySelectorAll(`${CARD} ${PRICE}`)).map(el => el.textContent || '');
        check(failures, `${step} product cards`, () => expect(prices.length).to.be.greaterThan(0));
        check(failures, `${step} USD prices`, () => {
          prices.forEach(price => {
            expect(price).to.match(/^\$ \d+\.\d\d$/);
            expect(amount(price)).to.be.greaterThan(0);
          });
        });
        const switcher = doc.querySelector<HTMLSelectElement>(`[data-cy="${CypressFields.CurrencySwitcher}"]`);
        check(failures, `${step} switcher`, () => expect(switcher?.value).to.eq('USD'));
      });
      cy.window().then(win => {
        check(failures, `${step} stored session`, () => {
          const session = readSession(win);
          expect(session.userId).to.be.a('string');
          expect(session.currencyCode).to.eq('USD');
        });
      });
    };

    cy.log('Step 1: session that is not JSON');
    cy.visit('/', { onBeforeLoad: win => win.localStorage.setItem('session', 'not-json') });
    checkFreshSession('step 1');

    cy.log('Step 2: session without fields');
    cy.visit('/', { onBeforeLoad: win => win.localStorage.setItem('session', '{}') });
    checkFreshSession('step 2');

    cy.log('Step 3: add a product');
    openProductFromHome();
    addToCart();
    cartLinePrices(PRODUCT_NAME)
      .should('have.length', 2)
      .then($prices => {
        const [price] = $prices.toArray().map(el => el.textContent || '');
        check(failures, 'step 3 cart price', () => expect(amount(price)).to.be.greaterThan(0));
      });
    getElementByField(CypressFields.SessionId)
      .invoke('text')
      .then(text => {
        check(failures, 'step 3 session id', () => expect(text.replace('session-id:', '').trim()).to.match(UUID));
      });

    assertNoFailures(failures);
  });

  describe('while the payment service declines', () => {
    before(() => {
      setFlag('paymentFailure', '100%');
      // flagd picks up the written flag file asynchronously.
      cy.wait(5000);
    });
    after(() => setFlag('paymentFailure', 'off'));

    it('tries to pay while the payment service declines', () => {
      const pageErrors: string[] = [];
      cy.on('uncaught:exception', err => {
        pageErrors.push(err.message);
        return false;
      });
      cy.intercept('POST', '/api/checkout*').as('placeOrder');

      cy.log('Step 2: add the product');
      cy.visit('/');
      openProductFromHome();
      addToCart();

      cy.log('Step 3: place the order');
      getElementByField(CypressFields.CheckoutPlaceOrder).click();
      cy.wait('@placeOrder').then(({ response }) => {
        expect(response?.statusCode).to.eq(500);
        expect(response?.body).to.deep.eq({ error: 'Failed to place order.' });
      });
      cy.wait(1000);
      cy.location('pathname').should('eq', '/cart');
      cy.contains('div', cartLineRow(PRODUCT_NAME)).should('be.visible');
      cy.then(() => {
        expect(pageErrors).to.have.length(1);
        expect(pageErrors[0]).to.contain('> Failed to place order.');
      });
    });
  });
});

describe('Release 3.1.0 storefront checks', () => {
  it('shows the line total as unit price times quantity on the cart page', () => {
    cy.visit(`/product/${PRODUCT_ID}`);
    getElementByField(CypressFields.ProductDetail)
      .find(`[data-cy="${CypressFields.ProductPrice}"]`)
      .should('not.contain', '0.00')
      .invoke('text')
      .then(text => {
        const unitPrice = amount(text);
        cy.log(`unit price text: ${text}`);
        getElementByField(CypressFields.ProductQuantity).select('3');
        addToCart();
        cartShippingPrice().should('not.contain', ' 0.00');
        cartLinePrices(PRODUCT_NAME)
          .should('have.length', 2)
          .then($prices => {
            const [price, lineTotal] = $prices.toArray().map(el => el.textContent || '');
            expect(price).to.eq(money('$', unitPrice));
            expect(lineTotal).to.eq(money('$', times(unitPrice, 3)));
            cartShippingPrice()
              .invoke('text')
              .then(shipping => {
                cartTotalPrice().should('have.text', money('$', amount(lineTotal) + amount(shipping)));
              });
          });
      });
  });

  const expectFreshSessionAfterLoading = (stored: string) => {
    cy.visit('/', { onBeforeLoad: win => win.localStorage.setItem('session', stored) });
    cardPrice('Explorascope')
      .invoke('text')
      .should('match', /^\$ \d+\.\d\d$/)
      .and('not.eq', '$ 0.00');
    cy.window().then(win => {
      const session = readSession(win);
      expect(session.userId).to.be.a('string');
      expect(session.currencyCode).to.eq('USD');
    });
  };

  it('replaces a stored session of not-json with a fresh one', () => {
    expectFreshSessionAfterLoading('not-json');
  });

  it('replaces a stored session of {} with a fresh one', () => {
    expectFreshSessionAfterLoading('{}');
  });

  it('does not fetch product images below the fold before they are scrolled into view', () => {
    cy.viewport(375, 400);
    cy.request('/api/products?currencyCode=USD').then(({ body }) => {
      const products = body as { name: string; picture: string }[];
      const { name: lastName, picture: lastPicture } = products[products.length - 1];
      cy.intercept('GET', `/images/products/${lastPicture}*`).as('lastImage');
      cy.visit('/');
      getElementByField(CypressFields.ProductCard).should('have.length', products.length);
      cy.wait(3000);
      cy.get('@lastImage.all').should('have.length', 0);
      cy.contains(CARD, lastName).scrollIntoView();
      cy.wait('@lastImage');
    });
  });

  it('does not recommend the product being viewed', () => {
    Cypress._.times(10, () => {
      cy.intercept('GET', '/api/recommendations*').as('getRecommendations');
      cy.visit(`/product/${PRODUCT_ID}`);
      cy.wait('@getRecommendations');
      getElementByField(CypressFields.RecommendationList)
        .find('a')
        .should('have.length.greaterThan', 0)
        .then($links => {
          expect($links.toArray().map(a => a.getAttribute('href'))).not.to.include(`/product/${PRODUCT_ID}`);
        });
    });
  });

  it('shows the same EUR shipping on the cart and on the order confirmation', () => {
    cy.visit(`/product/${PRODUCT_ID}`, {
      onBeforeLoad: win =>
        win.localStorage.setItem('session', JSON.stringify({ userId: `cypress-eur-${Date.now()}`, currencyCode: 'EUR' })),
    });
    getElementByField(CypressFields.ProductDetail)
      .find(`[data-cy="${CypressFields.ProductPrice}"]`)
      .should('contain', '€');
    addToCart();
    cartShippingPrice()
      .should('contain', '€')
      .and('not.contain', ' 0.00')
      .invoke('text')
      .then(cartShipping => {
        placeOrder();
        orderShippingPrice().invoke('text').should('eq', cartShipping);
      });
  });
});

export {};
