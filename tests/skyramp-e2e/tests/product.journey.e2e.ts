import { expect, test } from '@playwright/test';
import { products } from '../support/catalog';
import { alertWithText, Header, HomePage, ProductPage } from '../support/storefront';

const priceNanos = (text: string) => Math.round(Number(text.replace(/[^0-9.]/g, '')) * 1e9);

test('look at a product and hit the per-product limit', async ({ page }) => {
  const home = new HomePage(page);
  const product = new ProductPage(page);
  const header = new Header(page);

  await test.step('1. open Roof Binoculars from the home page', async () => {
    await page.goto('/');
    await expect(home.productCards.first()).toBeVisible();
    await home.openProduct('Roof Binoculars');
    await expect(page).toHaveURL(/\/product\/2ZYFJ3GM2N$/);
  });

  await test.step('2. read the product page', async () => {
    await expect.soft(page).toHaveTitle('Roof Binoculars - Otel Demo');
    await expect.soft(product.category('binoculars')).toBeVisible();
    await expect.soft(product.recommendationsTitle).toHaveText('Cheaper alternatives');
    await expect.soft(product.recommendationCards.first()).toBeVisible();
    const prices = await product.recommendationCards.locator('[data-cy="product-price"]').allInnerTexts();
    for (const price of prices) expect.soft(priceNanos(price), price).toBeLessThan(products['2ZYFJ3GM2N'].priceNanos);
  });

  await test.step('3. add 10 units', async () => {
    await product.add(10);
    await expect(page).toHaveURL(/\/cart$/);
    await expect.soft(header.cartItemCount).toHaveText('10');
  });

  await test.step('4. try to add 1 more from the product page', async () => {
    await home.open();
    await home.openProduct('Roof Binoculars');
    await product.add(1);
    await expect.soft(alertWithText(page, 'Maximum 10 per product')).toBeVisible();
    await expect.soft(page).toHaveURL(/\/product\/2ZYFJ3GM2N$/);
    await expect.soft(header.cartItemCount).toHaveText('10');
  });
});

test('product page lists the categories as tags after the description', async ({ page }) => {
  const home = new HomePage(page);
  const product = new ProductPage(page);
  await home.open();
  await home.openProduct('Solar System Color Imager');
  await expect.soft(product.category('accessories')).toBeVisible();
  await expect.soft(product.category('telescopes')).toBeVisible();
});
