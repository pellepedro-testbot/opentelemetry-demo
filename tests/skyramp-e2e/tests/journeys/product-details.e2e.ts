// Skyramp Testbot test package: Testbot owns and maintains everything in this folder.
import { expect, test } from '@playwright/test';
import { HomePage, ProductPage } from '../../storefront-pages';
import { LENS_KIT } from '../../storefront-data';

test('look at product details for an accessory kit and a cleaning kit', async ({ page }) => {
  const home = new HomePage(page);
  const product = new ProductPage(page);

  await test.step('1. Optical Tube Assembly shows three category tags below the description', async () => {
    await page.goto('/');
    await home.waitForProducts();
    await home.openProduct('Optical Tube Assembly');
    await expect(page).toHaveURL(/\/product\/9SIQT8TOJO$/);
    await expect(product.name).toHaveText('Optical Tube Assembly');
    await expect.soft(product.categoryTags).toHaveText(['accessories', 'telescopes', 'assembly']);
  });

  await test.step('2. Lens Cleaning Kit is titled after the product and has one accessories tag', async () => {
    await product.goHome();
    await home.waitForProducts();
    await home.openProduct(LENS_KIT.name);
    await expect(page).toHaveURL(new RegExp(`/product/${LENS_KIT.id}$`));
    await expect(product.name).toHaveText(LENS_KIT.name);
    await expect.soft(page).toHaveTitle('Lens Cleaning Kit - Otel Demo');
    await expect.soft(product.categoryTags).toHaveText(['accessories']);
  });
});
