import { Page, expect, test } from '@playwright/test';
import {
  Ad,
  addToCartFromHome,
  CartPage,
  Header,
  Recommendations,
  amount,
  sessionUserId,
} from '../support/storefront-pages';

const ACCESSORIES = ['0PUK6V6EV0', '6E92ZMYYFZ', 'L9ECAV7KIM', 'LS4PSXUNUM', '9SIQT8TOJO'];

async function storedProductIds(page: Page): Promise<string[]> {
  const userId = await sessionUserId(page);
  const response = await page.request.get(`/api/cart?sessionId=${userId}&currencyCode=USD`);
  return (await response.json()).items.map((i: { productId: string }) => i.productId);
}

test('shopper removes a row and empties the cart after confirming', async ({ page }) => {
  const header = new Header(page);
  const cart = new CartPage(page);
  const recommendations = new Recommendations(page);
  const ad = new Ad(page);

  await test.step('1. add two different products', async () => {
    await addToCartFromHome(page, 'Lens Cleaning Kit', 1);
    await addToCartFromHome(page, 'Red Flashlight', 1);
    await expect.soft(header.cartItemCount).toHaveText('2');
  });

  await test.step('2. Pasted text AC17', async () => {
    await expect(cart.itemNames).toHaveCount(2);
    const removed = await cart.itemNames.first().innerText();
    await cart.removeLinks.first().click();
    await expect.soft(cart.itemNames).toHaveCount(1);
    await expect.soft(cart.itemNames.filter({ hasText: removed })).toHaveCount(0);
    await expect.soft(cart.heading).toHaveText('Shopping Cart (1 items)');
    await expect.soft(header.cartItemCount).toHaveText('1');
    expect.soft(await storedProductIds(page)).toHaveLength(1);
  });

  await test.step('3. Pasted text AC62 (cancel)', async () => {
    const before = await storedProductIds(page);
    const dialogs: string[] = [];
    page.once('dialog', dialog => {
      dialogs.push(dialog.type());
      void dialog.dismiss();
    });
    await cart.emptyCartButton.click();
    await expect.poll(() => dialogs).toEqual(['confirm']);
    await expect.soft(cart.itemNames).toHaveCount(1);
    expect.soft(await storedProductIds(page)).toEqual(before);
  });

  await test.step('4. Pasted text AC62, AC20, AC100', async () => {
    const emptyCartAd = page.waitForRequest(r => {
      const url = new URL(r.url());
      return url.pathname === '/api/data' && url.searchParams.getAll('contextKeys').includes('empty-cart');
    });
    page.once('dialog', dialog => void dialog.accept());
    await cart.emptyCartButton.click();
    await expect(cart.emptyCartTitle).toBeVisible();
    await expect.soft(recommendations.title).toHaveText('Popular Accessories');
    await expect.soft(recommendations.cards.first()).toBeVisible();
    const ids = await recommendations.section
      .locator('a[href^="/product/"]')
      .evaluateAll(links => links.map(a => a.getAttribute('href')!.replace('/product/', '')));
    for (const id of ids) expect.soft(ACCESSORIES, `recommended ${id}`).toContain(id);
    await expect.soft(ad.link).toContainText('Solar System Color Imager');
    expect.soft(await emptyCartAd.then(() => true, () => false), 'empty-cart ad requested').toBe(true);
  });

  await test.step('outcome: the cart stays empty after a reload', async () => {
    await page.reload();
    await expect(cart.emptyCartTitle).toBeVisible();
    expect(await storedProductIds(page)).toEqual([]);
  });
});

test('shopper gets free shipping on 10 units', async ({ page }) => {
  const header = new Header(page);
  const cart = new CartPage(page);

  await test.step('1. add 10 Lens Cleaning Kits', async () => {
    await addToCartFromHome(page, 'Lens Cleaning Kit', 10);
    await expect.soft(header.cartItemCount).toHaveText('10');
  });

  await test.step('2. Pasted text AC27, AC90', async () => {
    await expect.soft(cart.summaryValue('Shipping')).toHaveText('Free');
    await expect.soft(cart.summaryValue('Package size')).toHaveText('large');
    const subtotal = amount(await cart.summaryValue('Subtotal').innerText());
    expect.soft(amount(await cart.summaryValue('Total').innerText()), 'Total equals Subtotal').toBe(subtotal);
  });

  await test.step('outcome: price summary after a reload', async () => {
    await page.reload();
    await expect(cart.summaryValue('Shipping')).toHaveText('Free');
  });
});

test('Pasted text AC67', async ({ page }) => {
  const recommendations = new Recommendations(page);
  await addToCartFromHome(page, 'National Park Foundation Explorascope', 1);
  const request = page.waitForRequest(r => new URL(r.url()).pathname === '/api/recommendations');
  await page.reload();
  expect(new URL((await request).url()).searchParams.get('maxResults')).toBe('2');
  await expect(new CartPage(page).heading).toHaveText('Shopping Cart (1 items)');
  await expect(recommendations.cards).toHaveCount(2);
});
