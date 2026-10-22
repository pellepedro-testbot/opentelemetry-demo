// Skyramp Testbot test package: Testbot owns and maintains everything in this folder.
import { expect, test } from '@playwright/test';
import { CartPage, HomePage, ProductPage } from '../../storefront-pages';
import { ACCESSORY_NAMES } from '../../storefront-data';

const BINOCULARS = 'Roof Binoculars';
const FLASHLIGHT = 'Red Flashlight';

test('change quantities and remove everything from the cart', async ({ page }) => {
  const home = new HomePage(page);
  const product = new ProductPage(page);
  const cart = new CartPage(page);

  await test.step('1. two products added from their pages each get a Remove link', async () => {
    await page.goto('/');
    await home.waitForProducts();
    await home.openProduct(BINOCULARS);
    await product.add(3);
    await cart.goHome();
    await home.waitForProducts();
    await home.openProduct(FLASHLIGHT);
    await product.add(1);
    await expect(cart.rows).toHaveCount(2);
    await expect.soft(cart.removeButton(BINOCULARS)).toBeVisible();
    await expect.soft(cart.removeButton(FLASHLIGHT)).toBeVisible();
  });

  await test.step('2. changing the binoculars quantity to 5 updates heading and badge to 6', async () => {
    await cart.setQuantity(BINOCULARS, 5);
    await expect.soft(cart.heading).toHaveText('Shopping Cart (6 items)');
    await expect.soft(cart.cartItemCount).toHaveText('6');
  });

  await test.step('3. removing the binoculars leaves only the flashlight', async () => {
    await cart.removeButton(BINOCULARS).click();
    await expect.soft(cart.rows).toHaveCount(1);
    await expect.soft(cart.row(FLASHLIGHT)).toBeVisible();
    await expect.soft(cart.heading).toHaveText('Shopping Cart (1 items)');
    await expect.soft(cart.cartItemCount).toHaveText('1');
  });

  await test.step('4. removing the last row empties the cart and suggests only accessories', async () => {
    await cart.removeButton(FLASHLIGHT).click();
    await expect.soft(cart.rows).toHaveCount(0);
    await expect.soft(cart.cartItemCount).toHaveCount(0);
    await expect.soft(cart.recommendationsTitle).toHaveText('Popular Accessories');
    await expect(cart.recommendedNames.first()).toBeVisible();
    for (const name of await cart.recommendedNames.allTextContents()) expect.soft(ACCESSORY_NAMES).toContain(name);
  });

  await test.step('outcome persists after reload', async () => {
    await page.reload();
    await expect.soft(cart.recommendationsTitle).toHaveText('Popular Accessories');
    await expect.soft(cart.cartItemCount).toHaveCount(0);
  });
});
