import { expect, test } from '@playwright/test';
import { Ad, CartPage, Header, HomePage, ProductPage, Recommendations, amount } from '../support/storefront-pages';

test('shopper looks at a product and adds it to the cart', async ({ page }) => {
  const home = new HomePage(page);
  const product = new ProductPage(page);
  const header = new Header(page);
  const recommendations = new Recommendations(page);

  await test.step('1. open the Explorascope from the home page', async () => {
    await home.goto();
    await home.card('National Park Foundation Explorascope').click();
    await expect(page).toHaveURL(/\/product\/OLJCESPC7Z$/);
  });

  await test.step('2. Pasted text AC22, AC56, AC9, AC44, AC84', async () => {
    await expect(product.name).toHaveText('National Park Foundation Explorascope');
    await expect.soft(page).toHaveTitle('National Park Foundation Explorascope - Otel Demo');
    await expect.soft(product.backLink).toHaveAttribute('href', '/');
    await expect.soft(product.categoryTags).toContainText(['telescopes']);
    await expect.soft(product.quantity.locator('option')).toHaveText(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']);
    await expect.soft(recommendations.title).toHaveText('Cheaper alternatives');
    await expect.soft(recommendations.cards.first()).toBeVisible();
    for (const price of await recommendations.cards.locator('[data-cy="product-price"]').allInnerTexts()) {
      expect.soft(amount(price), `recommended price ${price}`).toBeLessThan(101.96);
    }
    expect.soft(amount(await product.lineTotal.innerText()), 'line total for 1 equals the unit price').toBe(101.96);
  });

  await test.step('3. Pasted text AC59', async () => {
    await product.quantity.selectOption('3');
    await expect.soft(product.lineTotal).toHaveText(/^Line total:\s*\$\s*305\.88$/);
  });

  await test.step('4. Pasted text AC6', async () => {
    await product.addToCart.click();
    await expect(page).toHaveURL(/\/cart$/);
    await expect.soft(header.cartItemCount).toHaveText('3');
  });

  await test.step('5. Pasted text AC82, AC79, AC76', async () => {
    await header.openCartDropdown();
    await expect.soft(header.cartDropdownTitle).toHaveText('Shopping Cart (3)');
    const link = header.cartDropdownItems.getByRole('link', { name: 'National Park Foundation Explorascope' });
    await expect.soft(link).toHaveAttribute('href', '/product/OLJCESPC7Z');
    await link.click();
    await expect(page).toHaveURL(/\/product\/OLJCESPC7Z$/);
    await expect.soft(header.cartDropdown).toBeHidden();
    await expect.soft(product.inYourCart).toHaveText('In your cart: 3');
  });

  await test.step('6. Pasted text AC56', async () => {
    await product.backLink.click();
    await expect.soft(page).toHaveURL(/\/$/);
    await expect.soft(home.productCards.first()).toBeVisible();
  });

  await test.step('outcome: the cart and the product page still report 3 after a reload', async () => {
    await product.goto('OLJCESPC7Z');
    await page.reload();
    await expect(product.inYourCart).toHaveText('In your cart: 3');
    await expect(header.cartItemCount).toHaveText('3');
  });
});

test('shopper is held to per-product quantity limits', async ({ page }) => {
  const home = new HomePage(page);
  const product = new ProductPage(page);
  const header = new Header(page);
  const cart = new CartPage(page);

  await test.step('1. open the Roof Binoculars', async () => {
    await home.goto();
    await home.card('Roof Binoculars').click();
    await expect(page).toHaveURL(/\/product\/2ZYFJ3GM2N$/);
  });

  await test.step('2. Pasted text AC84', async () => {
    await expect(product.name).toHaveText('Roof Binoculars');
    await expect.soft(product.quantity.locator('option')).toHaveText(['1', '2', '3']);
  });

  await test.step('3. Pasted text AC40 (fill to 10)', async () => {
    await page.goBack();
    await home.card('National Park Foundation Explorascope').click();
    await expect(product.name).toHaveText('National Park Foundation Explorascope');
    await product.add(10);
    await expect(page).toHaveURL(/\/cart$/);
    await expect.soft(header.cartItemCount).toHaveText('10');
  });

  await test.step('4. Pasted text AC40 (one more)', async () => {
    await cart.itemNames.filter({ hasText: 'National Park Foundation Explorascope' }).click();
    await expect(page).toHaveURL(/\/product\/OLJCESPC7Z$/);
    await expect(product.name).toHaveText('National Park Foundation Explorascope');
    await product.add(1);
    await expect.soft(product.error).toHaveText('Maximum 10 per product');
    await expect.soft(page).toHaveURL(/\/product\/OLJCESPC7Z$/);
    await expect.soft(header.cartItemCount).toHaveText('10');
  });

  await test.step('outcome: the cart still holds 10 after a reload', async () => {
    await page.reload();
    await expect(header.cartItemCount).toHaveText('10');
  });
});

test('shopper follows an ad to a product', async ({ page }) => {
  const home = new HomePage(page);
  const product = new ProductPage(page);
  const ad = new Ad(page);

  await test.step('1. Pasted text AC87, AC24', async () => {
    await home.goto();
    await expect(ad.link).toContainText('Starsense Explorer Refractor Telescope');
    await ad.link.click();
    await expect(page).toHaveURL(/\/product\/66VCHSJNUP\?utm_source=ad$/);
  });

  await test.step('2. Pasted text AC87 (from the ad)', async () => {
    await expect(product.name).toHaveText('Starsense Explorer Refractor Telescope');
    await expect.soft(product.fromAd).toBeVisible();
  });

  await test.step('3. Pasted text AC87 (normal visit)', async () => {
    await product.backLink.click();
    await home.card('Starsense Explorer Refractor Telescope').click();
    await expect(page).toHaveURL(/\/product\/66VCHSJNUP$/);
    await expect(product.name).toHaveText('Starsense Explorer Refractor Telescope');
    await expect.soft(product.fromAd).toBeHidden();
  });
});

test('Pasted text AC9', async ({ page }) => {
  const product = new ProductPage(page);
  await product.goto('0PUK6V6EV0');
  await expect(product.categoryTags).toHaveText(['accessories', 'telescopes']);
});

test('Pasted text AC76', async ({ page }) => {
  const product = new ProductPage(page);
  await product.goto('L9ECAV7KIM');
  await expect(product.price).toBeVisible();
  await expect(product.inYourCart).toBeHidden();
});

test('Pasted text AC96', async ({ page }) => {
  await page.route('**/api/data*', route => route.fulfill({ status: 200, contentType: 'application/json', body: '[]' }));
  const product = new ProductPage(page);
  const ad = new Ad(page);
  const adResponse = page.waitForResponse(r => r.url().includes('/api/data'));
  await product.goto('OLJCESPC7Z');
  await adResponse;
  await expect(ad.block).toHaveCount(0);
  await expect(page.getByText('Advertisement', { exact: true })).toHaveCount(0);

  const cartAdResponse = page.waitForResponse(r => r.url().includes('/api/data'));
  await new CartPage(page).goto();
  await cartAdResponse;
  await expect(ad.block).toHaveCount(0);
  await expect(page.getByText('Advertisement', { exact: true })).toHaveCount(0);
});
