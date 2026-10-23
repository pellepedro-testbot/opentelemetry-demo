import { expect, test } from '@playwright/test';
import { ConfirmationPage } from '../support/storefront-pages';

for (const path of ['/cart/checkout/abc', '/cart/checkout/abc?order=notjson', '/cart/checkout/abc?order=%7B%7D']) {
  test(`Pasted text AC99 (${path})`, async ({ page }) => {
    const pageErrors: Error[] = [];
    page.on('pageerror', error => pageErrors.push(error));
    const response = await page.goto(path);
    const confirmation = new ConfirmationPage(page);
    expect(response?.status()).toBeLessThan(500);
    await expect(confirmation.title).toHaveText('Order not found');
    await expect(confirmation.continueShopping).toBeVisible();
    await expect(page.locator('nextjs-portal')).toHaveCount(0);
    expect(pageErrors).toEqual([]);
  });
}
