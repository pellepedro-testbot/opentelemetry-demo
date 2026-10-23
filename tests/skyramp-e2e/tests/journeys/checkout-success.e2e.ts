import { test, expect } from '@playwright/test';
import { CartPage, ConfirmationPage, HomePage, ProductPage } from '../../support/storefrontPages';

test('buy a product and see the order confirmation', async ({ page }) => {
  test.setTimeout(90_000);
  const home = new HomePage(page);
  const product = new ProductPage(page);
  const cart = new CartPage(page);
  const confirmation = new ConfirmationPage(page);

  await test.step('1. add Optical Tube Assembly: default recommendations title', async () => {
    await page.goto('/');
    await home.productCard('Optical Tube Assembly').click();
    await page.waitForURL(/\/product\/9SIQT8TOJO/);
    await product.add(1);
    await page.waitForURL(/\/cart$/);
    await expect.soft(cart.recommendationsHeading).toHaveText('You May Also Like');
  });

  const checkoutAdRequest = page.waitForRequest(r => /\/api\/data\?.*contextKeys=checkout/.test(r.url()), {
    timeout: 30_000,
  });

  await test.step('2. place the order: button disabled while pending', async () => {
    await page.route('**/api/checkout*', async route => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      await route.continue();
    });
    await cart.email.fill('buyer+e2e@example.com');
    await cart.expirationMonth.selectOption({ label: 'December' });
    await cart.placeOrder.click();
    await expect.soft(cart.placeOrder).toBeDisabled();
    await expect.soft(cart.placeOrder).toHaveText('Placing order...');
  });

  await test.step('3. confirmation page: email and free returns ad', async () => {
    await page.waitForURL(/\/cart\/checkout\//);
    await expect.soft(confirmation.confirmationText).toHaveText('Confirmation sent to buyer+e2e@example.com');
    expect
      .soft(
        await checkoutAdRequest.then(
          () => true,
          () => false
        )
      )
      .toBe(true);
    await expect.soft(confirmation.ad).toHaveText('Free returns within 30 days');
  });
});
