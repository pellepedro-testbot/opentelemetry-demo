// Skyramp Testbot test package: Testbot owns and maintains everything in this folder.
import { expect, test } from '@playwright/test';
import { CartPage, HomePage, ProductPage } from '../../storefront-pages';
import { LENS_KIT, STARSENSE } from '../../storefront-data';

test.describe('storefront pages', () => {
  test('Pasted text AC2: checkout form Month options', async ({ page }) => {
    await new ProductPage(page).open(LENS_KIT.id);
    await new ProductPage(page).add(1);
    const cart = new CartPage(page);
    await expect(cart.monthOptions).toHaveCount(12);
    await expect(cart.monthOptions.nth(11)).toHaveText('December');
    await expect(cart.monthOptions.nth(11)).toHaveAttribute('value', '12');
    await expect(cart.monthOptions.filter({ hasText: /^January$/ })).toHaveCount(1);
  });

  test('Pasted text AC4: cart summary row after Shipping', async ({ page }) => {
    const product = new ProductPage(page);
    await product.open(LENS_KIT.id);
    await product.add(1);
    const cart = new CartPage(page);
    await expect(cart.rowAfterShipping).toContainText('Carrier');
    await expect(cart.rowAfterShipping).toContainText('USPS');
  });

  test('Pasted text AC6: cart badge with quantities 3 and 1', async ({ page }) => {
    const product = new ProductPage(page);
    await product.open(STARSENSE.id);
    await product.add(3);
    await product.open(LENS_KIT.id);
    await product.add(1);
    await expect(product.cartItemCount).toHaveText('4');
  });

  test('Pasted text AC6: cart badge for an empty cart and one item', async ({ page }) => {
    const home = new HomePage(page);
    await home.open();
    await expect(home.cartItemCount).toHaveCount(0);
    const product = new ProductPage(page);
    await product.open(LENS_KIT.id);
    await product.add(1);
    await expect(product.cartItemCount).toHaveText('1');
  });

  test('Pasted text AC9: product page tags for 9SIQT8TOJO', async ({ page }) => {
    const product = new ProductPage(page);
    await product.open('9SIQT8TOJO');
    await expect(product.categoryTags).toHaveText(['accessories', 'telescopes', 'assembly']);
  });

  test('Pasted text AC22: product page title for L9ECAV7KIM', async ({ page }) => {
    await new ProductPage(page).open(LENS_KIT.id);
    await expect(page).toHaveTitle('Lens Cleaning Kit - Otel Demo');
  });
});
