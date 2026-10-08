// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

// Browses the catalog and places orders through the storefront. Product pages
// read catalog.products in astronomy-db (product-catalog); each placed order goes
// checkout -> Kafka -> accounting, which writes accounting."order" in the same DB.
// Selectors are the data-cy fields the upstream Cypress tests use.

import { expect, test } from '@playwright/test';

const ORDERS = Number(process.env.ORDERS ?? 5);
const field = (name: string) => `[data-cy="${name}"]`;

for (let i = 0; i < ORDERS; i++) {
  test(`place order ${i + 1} of ${ORDERS}`, async ({ page }) => {
    await page.goto('/');
    const cards = page.locator(field('product-card'));
    await expect(cards.first()).toBeVisible();
    await cards.nth(i % (await cards.count())).click();

    await expect(page.locator(field('product-detail'))).toBeVisible();
    await page.locator(field('product-add-to-cart')).click();
    await page.waitForURL(/\/cart$/);
    await expect(page.locator(field('cart-item-count'))).toContainText('1');

    const placed = page.waitForResponse(r => r.url().includes('/api/checkout') && r.request().method() === 'POST');
    await page.locator(field('checkout-place-order')).click();
    expect((await placed).status()).toBe(200);

    await page.waitForURL(/\/checkout/);
    await expect(page.locator(field('checkout-item'))).toHaveCount(1);
  });
}
