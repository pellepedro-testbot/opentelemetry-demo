// Skyramp Testbot test package: Testbot owns and maintains everything in this folder.
import { Page, expect, test } from '@playwright/test';
import { CartPage, HomePage, ProductPage } from '../../storefront-pages';
import { LENS_KIT } from '../../storefront-data';

const addAnyProduct = async (page: Page) => {
  const home = new HomePage(page);
  await page.goto('/');
  await home.waitForProducts();
  await home.openProduct(LENS_KIT.name);
  await new ProductPage(page).add(1);
  await expect(new CartPage(page).rows).toHaveCount(1);
};

test('check out with a bad US zip code, fix it and succeed', async ({ page }) => {
  const cart = new CartPage(page);

  await test.step('1. a product is added and the cart shows one row', async () => {
    await addAnyProduct(page);
  });

  await test.step('2. zip code 1234 shows "Invalid zip code" and keeps the cart', async () => {
    await cart.zipCode.fill('1234');
    await cart.placeOrder.click();
    await expect.soft(cart.error).toHaveText('Invalid zip code');
    await expect.soft(page).toHaveURL(/\/cart$/);
    await expect.soft(cart.rows).toHaveCount(1);
  });

  await test.step('3. zip code 94043 places the order and opens the confirmation', async () => {
    await cart.zipCode.fill('94043');
    await cart.placeOrder.click();
    await expect(page).toHaveURL(/\/cart\/checkout\/[^/]+/);
    await expect.soft(cart.error).toHaveCount(0);
  });
});

test('check out with a card that gets declined', async ({ page }) => {
  const cart = new CartPage(page);

  await test.step('1. a product is added and the cart shows one row', async () => {
    await addAnyProduct(page);
  });

  await test.step('2. card 4000-0000-0000-0002 shows "Your card was declined." and keeps the cart', async () => {
    await cart.cardNumber.fill('4000-0000-0000-0002');
    await cart.placeOrder.click();
    await expect.soft(cart.error).toHaveText('Your card was declined.');
    await expect.soft(page).toHaveURL(/\/cart$/);
    await expect.soft(cart.rows).toHaveCount(1);
  });
});
