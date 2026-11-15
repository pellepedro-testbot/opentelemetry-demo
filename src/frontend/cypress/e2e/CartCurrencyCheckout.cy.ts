// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { getElementByField, journeySteps } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

const PRODUCT_NAME = 'Solar System Color Imager';
const PRODUCT_CARD = `[data-cy="product-card"]:contains("${PRODUCT_NAME}")`;

// Keeps only the digits and decimal point of a price such as '$ 234.18'.
const priceValue = (text: string) => Number(text.replace(/[^0-9.]/g, ''));

const money = (value: number) => value.toFixed(2);

// On the cart page: unit price and line total of the single line, then shipping and grand total.
// On the confirmation page: the item total, then shipping and order total.
const priceSpans = () =>
  getElementByField(CypressFields.ProductPrice).not('[data-cy="recommendation-list"] [data-cy="product-price"]');

const pagePrices = () => priceSpans().then($spans => [...$spans].map(span => priceValue(span.textContent || '')));

const cartPrices = () => {
  priceSpans().should($spans =>
    expect(priceValue($spans.eq(2).text()), 'shipping estimate loaded').to.be.greaterThan(0)
  );
  return pagePrices();
};

const expectImageLoaded = (img: HTMLImageElement) => {
  expect(img.complete, `${img.src} complete`).to.equal(true);
  expect(img.naturalWidth, `${img.src} naturalWidth`).to.be.greaterThan(0);
};

const productImage = () => cy.get(`img[alt="${PRODUCT_NAME}"]`);

const cartLineQuantity = () => cy.get('select:not([name]):not([data-cy])');

const pageText = () => cy.document().then(doc => doc.body.innerText);

const openProduct = () => {
  getElementByField(CypressFields.ProductList).find(PRODUCT_CARD).click();
  getElementByField(CypressFields.ProductDetail).should('exist');
  getElementByField(CypressFields.ProductName).should('have.text', PRODUCT_NAME);
};

const addToCart = (quantity: number) => {
  getElementByField(CypressFields.ProductQuantity).select(String(quantity));
  getElementByField(CypressFields.ProductAddToCart).click();
  cy.wait('@addToCart');
  cy.wait('@getCart');
  cy.location('pathname').should('eq', '/cart');
  getElementByField(CypressFields.CartItemCount).should('have.text', '1');
};

describe('Buying in Canadian dollars', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/cart*').as('addToCart');
    cy.intercept('GET', '/api/cart*').as('getCart');
    cy.intercept('POST', '/api/checkout*').as('placeOrder');
  });

  afterEach(() => {
    cy.window().then(win => {
      const { userId } = JSON.parse(win.localStorage.getItem('session') || '{}');
      if (userId) cy.request({ method: 'DELETE', url: '/api/cart', body: { userId }, failOnStatusCode: false });
    });
  });

  it('buys a telescope in Canadian dollars, adjusting the quantity in the cart', () => {
    const steps = journeySteps();
    let productImageRequests = 0;
    let requestsBeforeScroll = 0;
    let productPagePrice = 0;
    let cartShipping = 0;
    let orderId = '';

    cy.intercept('GET', '/images/products/**', () => {
      productImageRequests += 1;
    });
    cy.intercept('/api/product-reviews*').as('reviews');
    cy.intercept('/api/product-ask-ai-assistant*').as('askAi');
    cy.intercept('GET', '/api/recommendations*').as('getRecommendations');
    cy.viewport(1280, 500);

    cy.log('Step 1: open the shop');
    cy.visit('/');
    getElementByField(CypressFields.ProductCard, getElementByField(CypressFields.ProductList)).should(
      'have.length',
      10
    );
    cy.wait(1000);
    cy.then(() => {
      requestsBeforeScroll = productImageRequests;
    });
    getElementByField(CypressFields.CurrencySwitcher)
      .find('option')
      .then($options => {
        const codes = [...$options].map(option => (option as HTMLOptionElement).value);
        steps.check('1. currency options in alphabetical order', () => expect(codes).to.deep.equal([...codes].sort()));
        steps.check('1. currency options include EUR', () => expect(codes).to.include('EUR'));
      });
    cy.document().then(doc => {
      const badges = [...doc.querySelectorAll('footer *')].filter(
        el => el.children.length === 0 && el.textContent?.trim() === 'local'
      );
      steps.check('1. platform badge shows local', () => expect(badges.length).to.eq(1));
    });
    cy.scrollTo('bottom');
    cy.wait(1000);
    cy.then(() =>
      steps.check('1. product images below the fold not requested before scrolling', () =>
        expect(requestsBeforeScroll, 'product image requests before scrolling').to.be.lessThan(productImageRequests)
      )
    );
    getElementByField(CypressFields.ProductCard).each($card => {
      const images = $card.find('*').filter((_, el) => getComputedStyle(el).backgroundImage.startsWith('url('));
      steps.check(`1. card ${$card.text()} shows its image`, () => expect(images.length).to.eq(1));
    });
    cy.scrollTo('top');

    cy.log('Step 2: choose Canadian dollars');
    getElementByField(CypressFields.CurrencySwitcher).select('CAD');
    getElementByField(CypressFields.CurrencySwitcher).should('have.value', 'CAD');
    getElementByField(CypressFields.ProductList)
      .find(`${PRODUCT_CARD} [data-cy="product-price"]`)
      .should('not.have.text', '$ 175.00')
      .then($price => steps.check('2. first card repriced in CAD', () => expect($price.text()).to.eq('$ 234.18')));

    cy.log('Step 3: open the product');
    openProduct();
    cy.wait('@getRecommendations');
    getElementByField(CypressFields.ProductPicture)
      .should('have.css', 'background-image')
      .and('contain', `/images/products/`);
    getElementByField(CypressFields.ProductPicture).then($picture => {
      // Strips the url("...") wrapper from the CSS background-image value.
      const url = getComputedStyle($picture[0]).backgroundImage.replace(/^url\("?|"?\)$/g, '');
      cy.request(url).then(({ status, headers }) =>
        steps.check('3. product picture loads', () => {
          expect(status).to.eq(200);
          expect(String(headers['content-type'])).to.match(/^image\//);
        })
      );
    });
    getElementByField(CypressFields.ProductDetail)
      .find('[data-cy="product-price"]')
      .not('[data-cy="recommendation-list"] [data-cy="product-price"]')
      .then($price => {
        productPagePrice = priceValue($price.text());
      });
    getElementByField(CypressFields.RecommendationList).then($list =>
      steps.check('3. recommendations leave out the product being viewed', () =>
        expect($list.find(PRODUCT_CARD).length).to.eq(0)
      )
    );
    cy.document().then(doc =>
      steps.check('3. no reviews or AI assistant section', () => {
        expect(doc.querySelectorAll('[data-cy="product-reviews"], [data-cy="AskAISection"]').length).to.eq(0);
        expect(doc.body.innerText).not.to.contain('Ask AI About This Product');
      })
    );
    cy.get('@reviews.all').then(calls =>
      steps.check('3. no product-reviews requests', () => expect(calls).to.have.length(0))
    );
    cy.get('@askAi.all').then(calls =>
      steps.check('3. no product-ask-ai-assistant requests', () => expect(calls).to.have.length(0))
    );

    cy.log('Step 4: add three to the cart');
    addToCart(3);
    cartPrices().then(([unit, lineTotal]) => {
      steps.check('4. Price shows the product page price', () => expect(money(unit)).to.eq(money(productPagePrice)));
      steps.check('4. Total shows 3 x the unit price', () => expect(money(lineTotal)).to.eq(money(unit * 3)));
    });

    cy.log('Step 5: open and close the cart dropdown');
    getElementByField(CypressFields.CartIcon).click({ force: true });
    getElementByField(CypressFields.CartDropdownItem)
      .should('have.length', 1)
      .then($item => {
        steps.check('5. dropdown shows Quantity: 3', () => expect($item.text()).to.contain('Quantity: 3'));
      });
    getElementByField(CypressFields.CartDropdownItem)
      .find(`img[alt="${PRODUCT_NAME}"]`)
      .should('have.prop', 'complete', true)
      .then($img =>
        steps.check('5. dropdown shows the product image', () => expectImageLoaded($img[0] as HTMLImageElement))
      );
    getElementByField(CypressFields.SessionId).click();
    getElementByField(CypressFields.CartDropdown).should('not.exist');

    cy.log('Step 6: change the line quantity to 2');
    cartLineQuantity().select('2');
    cy.wait('@getCart');
    cartLineQuantity().should('have.value', '2');
    cartPrices().then(([unit, lineTotal, shipping, grandTotal]) => {
      cartShipping = shipping;
      steps.check('6. Total shows 2 x the unit price', () => expect(money(lineTotal)).to.eq(money(unit * 2)));
      steps.check('6. cart total is items plus shipping', () =>
        expect(money(grandTotal)).to.eq(money(unit * 2 + shipping))
      );
    });
    productImage()
      .should('have.prop', 'complete', true)
      .then($img =>
        steps.check('6. cart line shows the product image', () => expectImageLoaded($img[0] as HTMLImageElement))
      );
    cy.reload();
    cartLineQuantity().should('have.value', '2');
    cartPrices().then(([unit, lineTotal]) =>
      steps.check('6. quantity 2 total holds after reload', () => expect(money(lineTotal)).to.eq(money(unit * 2)))
    );

    cy.log('Step 7: place the order');
    getElementByField(CypressFields.CheckoutPlaceOrder).should('have.text', 'Place Order').click();
    cy.wait('@placeOrder').then(({ response }) => {
      orderId = response?.body.orderId;
    });
    cy.location('pathname').should('match', /^\/cart\/checkout\//);
    cy.contains('Your order is complete!');
    pageText().then(text => {
      steps.check('7. order id shown', () => {
        expect(orderId).to.be.a('string').and.have.length.above(0);
        expect(text).to.contain(orderId);
      });
      steps.check('7. shipping address shown', () => {
        expect(text).to.contain('1600 Amphitheatre Parkway');
        expect(text).to.contain('Mountain View, CA 94043');
      });
      steps.check('7. item shown with quantity 2', () => {
        expect(text).to.contain(PRODUCT_NAME);
        expect(text).to.contain('Quantity: 2');
      });
    });
    productImage()
      .should('have.prop', 'complete', true)
      .then($img => steps.check('7. item image shown', () => expectImageLoaded($img[0] as HTMLImageElement)));
    pagePrices().then(([itemTotal, shipping, total]) => {
      steps.check('7. confirmation shipping equals the cart shipping', () =>
        expect(money(shipping)).to.eq(money(cartShipping))
      );
      steps.check('7. confirmation total is items plus shipping', () =>
        expect(money(total)).to.eq(money(itemTotal + shipping))
      );
    });

    cy.log('Step 8: reload the confirmation');
    cy.reload();
    cy.contains('Your order is complete!');
    pageText().then(text =>
      steps.check('8. order id, item and shipping still shown', () => {
        expect(text).to.contain(orderId);
        expect(text).to.contain('Quantity: 2');
        expect(text).to.contain('Shipping:');
      })
    );

    cy.then(() => steps.assertAll());
  });

  it('shows unit price times quantity in the cart line total', () => {
    cy.visit('/');
    openProduct();
    addToCart(3);

    cartPrices().then(([unit, lineTotal, shipping, grandTotal]) => {
      expect(money(lineTotal), 'line Total').to.eq(money(unit * 3));
      expect(money(grandTotal), 'cart total').to.eq(money(lineTotal + shipping));
    });
  });

  it('charges the shipping shown in the cart when ordering in Canadian dollars', () => {
    let cartShipping = 0;

    cy.visit('/');
    getElementByField(CypressFields.CurrencySwitcher).select('CAD');
    getElementByField(CypressFields.CurrencySwitcher).should('have.value', 'CAD');
    openProduct();
    addToCart(1);
    cartPrices().then(([, , shipping]) => {
      cartShipping = shipping;
    });

    getElementByField(CypressFields.CheckoutPlaceOrder).click();
    cy.wait('@placeOrder');
    cy.contains('Your order is complete!');

    pagePrices().then(([, shipping]) => {
      expect(money(shipping), 'confirmation Shipping').to.eq(money(cartShipping));
    });
  });
});

export {};
