// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { getDetailPrices, getElementByField, priceTextToCents, readStoredSession } from '../../utils/Cypress';
import { setFlag } from '../../utils/CypressRequests';
import { CypressFields } from '../../utils/enums/CypressFields';

// Collects failed checks of a walk so one defect does not hide the steps after it; the walk fails at its end.
const softChecks = () => {
  const failures: string[] = [];
  return {
    check(step: string, label: string, assertion: () => void) {
      try {
        assertion();
      } catch (e) {
        failures.push(`${step} - ${label}: ${(e as Error).message}`);
      }
    },
    step(name: string) {
      cy.log(`**${name}**`);
      return name;
    },
    fail(step: string, message: string) {
      failures.push(`${step}: ${message}`);
    },
    assertAll() {
      cy.then(() => expect(failures, failures.join('\n')).to.be.empty);
    },
  };
};

describe('Release 3.1.0 storefront journeys', () => {
  it('buys two of a product in yen and sees the order confirmation', () => {
    const walk = softChecks();
    cy.intercept('GET', '/api/recommendations*').as('getRecommendations');
    cy.intercept('POST', '/api/cart*').as('addToCart');
    cy.intercept('GET', '/api/shipping*').as('getShipping');
    cy.intercept('POST', '/api/checkout*').as('placeOrder');

    let userId = '';
    let productId = '';
    let unitCents = 0;
    let cartShippingCents = 0;
    let productName = '';

    const step1 = walk.step('Step 1: open the shop home page');
    cy.clearLocalStorage();
    cy.visit('/');
    getElementByField(CypressFields.ProductCard, getElementByField(CypressFields.ProductList)).should(
      'have.length',
      10
    );
    readStoredSession().then(session => {
      walk.check(step1, 'default session stored', () => {
        expect(session?.userId).to.be.a('string').and.not.equal('');
        expect(session?.currencyCode).to.eq('USD');
      });
      userId = session?.userId || '';
    });
    getElementByField(CypressFields.ProductCard)
      .first()
      .find('div')
      .should(divs => {
        expect(Cypress._.some(divs, div => getComputedStyle(div).backgroundImage.includes('blob:'))).to.equal(true);
      });

    const step2 = walk.step('Step 2: open the currency select');
    getElementByField(CypressFields.CurrencySwitcher)
      .find('option')
      .then(options => {
        const values = Cypress._.map(options, 'value');
        walk.check(step2, 'options alphabetical', () => expect(values).to.deep.equal([...values].sort()));
        walk.check(step2, 'EUR offered', () => expect(values).to.include('EUR'));
      });

    walk.step('Step 3: select JPY');
    getElementByField(CypressFields.CurrencySwitcher).select('JPY');
    getElementByField(CypressFields.CurrencySwitcher).should('have.value', 'JPY');
    getElementByField(CypressFields.ProductPrice, getElementByField(CypressFields.ProductList))
      .first()
      .should('contain', '¥');

    const step4 = walk.step('Step 4: open the first product');
    getElementByField(CypressFields.ProductCard).first().click();
    getElementByField(CypressFields.ProductName)
      .should($name => expect($name.text()).to.not.be.empty)
      .invoke('text')
      .then(name => {
        productName = name;
      });
    cy.location('pathname').then(pathname => {
      productId = pathname.split('/').pop() || '';
    });
    getElementByField(CypressFields.ProductPrice, getElementByField(CypressFields.ProductDetail))
      .first()
      .should('contain', '¥')
      .invoke('text')
      .then(text => {
        unitCents = priceTextToCents(text);
      });
    cy.wait('@getRecommendations');
    getElementByField(CypressFields.RecommendationList)
      .find('a')
      .should('have.length.at.least', 1)
      .then(links => {
        const hrefs = Cypress._.map(links, link => link.getAttribute('href'));
        walk.check(step4, 'recommendations leave out this product', () =>
          expect(hrefs).to.not.include(`/product/${productId}`)
        );
      });

    const step5 = walk.step('Step 5: add two to the cart');
    getElementByField(CypressFields.ProductQuantity).select('2');
    getElementByField(CypressFields.ProductAddToCart).click();
    cy.wait('@addToCart')
      .its('request.body.item')
      .should(item => {
        expect(item.productId).to.eq(productId);
        expect(item.quantity).to.eq(2);
      });
    cy.location('pathname', { timeout: 15000 }).should('eq', '/cart');
    cy.contains('Shopping Cart').should('be.visible');
    cy.wait('@getShipping');
    getDetailPrices().should('have.length', 4);
    getDetailPrices()
      .eq(2)
      .should($shipping => expect(priceTextToCents($shipping.text()), 'cart shipping loaded').to.be.greaterThan(0));
    getDetailPrices().then(prices => {
      walk.check(step5, 'Price column is the unit price', () =>
        expect(priceTextToCents(prices.eq(0).text())).to.eq(unitCents)
      );
      walk.check(step5, 'Total column is 2 x unit price', () =>
        expect(priceTextToCents(prices.eq(1).text())).to.be.closeTo(unitCents * 2, 1)
      );
      cartShippingCents = priceTextToCents(prices.eq(2).text());
    });
    cy.then(() =>
      cy.get(`img[alt="${productName}"]`).then(imgs => {
        walk.check(step5, 'cart row image is lazy-loaded', () => {
          expect(imgs).to.have.length(1);
          expect(imgs.attr('loading')).to.eq('lazy');
        });
      })
    );

    const step6 = walk.step('Step 6: reload the cart');
    cy.reload();
    getElementByField(CypressFields.CurrencySwitcher).should('have.value', 'JPY');
    readStoredSession().then(session => {
      walk.check(step6, 'session kept', () => expect(session).to.deep.equal({ userId, currencyCode: 'JPY' }));
    });
    cy.then(() => cy.contains('a', productName).should('be.visible'));
    getDetailPrices().should('have.length', 4);

    walk.step('Step 7: place the order');
    getElementByField(CypressFields.CheckoutPlaceOrder).click();
    cy.wait('@placeOrder').then(({ request, response }) => {
      expect(request.body.userId).to.eq(userId);
      expect(request.body.userCurrency).to.eq('JPY');
      expect(response?.statusCode).to.eq(200);
      cy.location('pathname', { timeout: 15000 }).should('eq', `/cart/checkout/${response?.body.orderId}`);
    });

    const step8 = walk.step('Step 8: read the confirmation');
    cy.contains('Your order is complete!').should('be.visible');
    cy.contains('Order Items').should('be.visible');
    cy.contains('Quantity: 2').should('be.visible');
    cy.contains('Shipping:').should('be.visible');
    cy.contains('Total:').should('be.visible');
    getDetailPrices().then(prices => {
      const [itemCents, shippingCents, totalCents] = [0, 1, 2].map(i => priceTextToCents(prices.eq(i).text()));
      walk.check(step8, 'item line is 2 x unit price in yen', () => {
        expect(prices.eq(0).text()).to.contain('¥');
        expect(itemCents).to.be.closeTo(unitCents * 2, 1);
      });
      walk.check(step8, 'shipping is the yen amount the cart showed', () => {
        expect(prices.eq(1).text()).to.contain('¥');
        expect(shippingCents).to.be.closeTo(cartShippingCents, 100);
      });
      walk.check(step8, 'total is items plus shipping', () => expect(totalCents).to.eq(itemCents + shippingCents));
    });
    walk.assertAll();
  });

  describe('with payments declined', () => {
    before(() => setFlag('paymentFailure', '100%'));
    after(() => setFlag('paymentFailure', 'off'));

    it('tries to pay when the payment is declined and stays on the cart', () => {
      const walk = softChecks();
      cy.on('uncaught:exception', err => !err.message.includes('Failed to place order'));
      cy.intercept('POST', '/api/cart*').as('addToCart');
      cy.intercept('POST', '/api/checkout*').as('placeOrder');
      let productName = '';

      walk.step('Step 1: open the first product');
      cy.visit('/');
      getElementByField(CypressFields.ProductCard).first().click();
      getElementByField(CypressFields.ProductName)
        .should($name => expect($name.text()).to.not.be.empty)
        .invoke('text')
        .then(name => {
          productName = name;
        });

      const step = walk.step('Step 2: add it to the cart');
      getElementByField(CypressFields.ProductAddToCart).click();
      cy.wait('@addToCart').its('request.body.item.quantity').should('eq', 1);
      cy.location('pathname', { timeout: 15000 }).should('eq', '/cart');
      getDetailPrices().should('have.length.at.least', 2);
      getDetailPrices().then(prices => {
        walk.check(step, 'Price and Total equal for one unit', () =>
          expect(priceTextToCents(prices.eq(1).text())).to.eq(priceTextToCents(prices.eq(0).text()))
        );
      });

      walk.step('Step 3: place the order');
      getElementByField(CypressFields.CheckoutPlaceOrder).click();
      cy.wait('@placeOrder').then(({ response }) => {
        expect(response?.statusCode).to.be.within(400, 599);
        expect(response?.body).to.have.property('error').that.is.a('string').and.not.equal('');
      });
      cy.location('pathname').should('eq', '/cart');
      cy.contains('Shopping Cart').should('be.visible');
      cy.then(() => cy.contains('a', productName).should('be.visible'));
      getElementByField(CypressFields.CheckoutPlaceOrder).should('be.visible');
      getElementByField(CypressFields.CartItemCount).should('contain', '1');
      walk.assertAll();
    });
  });

  it('comes back to the shop with a damaged saved session', () => {
    const walk = softChecks();
    const step = walk.step('Step 1: load the home page with a damaged session');
    cy.on('uncaught:exception', err => {
      walk.fail(step, `uncaught page error: ${err.message}`);
      return false;
    });
    cy.visit('/', { onBeforeLoad: win => win.localStorage.setItem('session', 'not-json{') });
    getElementByField(CypressFields.ProductCard, getElementByField(CypressFields.ProductList)).should(
      'have.length',
      10
    );
    readStoredSession().then(session => {
      walk.check(step, 'stored session replaced by a valid one', () => {
        expect(session?.userId).to.be.a('string').and.not.equal('');
        expect(session?.currencyCode).to.be.a('string').and.not.equal('');
      });
      getElementByField(CypressFields.SessionId).should('contain', session?.userId);
    });

    walk.step('Step 2: pick GBP and reload');
    getElementByField(CypressFields.CurrencySwitcher).select('GBP');
    getElementByField(CypressFields.CurrencySwitcher).should('have.value', 'GBP');
    cy.reload();
    getElementByField(CypressFields.ProductCard, getElementByField(CypressFields.ProductList)).should(
      'have.length',
      10
    );
    getElementByField(CypressFields.CurrencySwitcher).should('have.value', 'GBP');
    readStoredSession().its('currencyCode').should('eq', 'GBP');
    walk.assertAll();
  });
});

export {};
