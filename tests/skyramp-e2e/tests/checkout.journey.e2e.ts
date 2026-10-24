import { expect, Page, test } from '@playwright/test';
import { FREE_RETURNS_AD_TEXT } from '../support/catalog';
import { addFromOpenHome, alertWithText, byField, CartPage } from '../support/storefront';

const PRODUCT = 'National Park Foundation Explorascope';

const delayCheckout = (page: Page, ms: number) =>
  page.route('**/api/checkout*', async route => {
    await new Promise(resolve => setTimeout(resolve, ms));
    await route.continue();
  });

test('place an order and see the confirmation', async ({ page }) => {
  const cart = new CartPage(page);
  const adRequests: string[] = [];
  page.on('request', request => {
    if (new URL(request.url()).pathname === '/api/data') adRequests.push(request.url());
  });

  await test.step('1. add a product', async () => {
    await page.goto('/');
    await addFromOpenHome(page, PRODUCT, 1);
  });

  await test.step('2. enter the e-mail, pick December and place the order', async () => {
    await cart.field('email').fill('tester+1@example.org');
    await cart.field('creditCardExpirationMonth').selectOption({ label: 'December' });
    await expect.soft(cart.field('creditCardExpirationMonth')).toHaveValue('12');
    await delayCheckout(page, 2_000);
    await cart.placeOrder.click();
    await expect.soft(cart.placeOrder).toBeDisabled();
    await expect.soft(cart.placeOrder).toHaveText('Placing order...');
  });

  await test.step('3. land on the confirmation page', async () => {
    await expect(page).toHaveURL(/\/cart\/checkout\//, { timeout: 15_000 });
    await expect.soft(page.getByText('Confirmation sent to tester+1@example.org')).toBeVisible();
    await expect.soft(byField(page, 'ad')).toContainText(FREE_RETURNS_AD_TEXT);
    expect.soft(adRequests.some(url => new URL(url).searchParams.get('contextKeys') === 'checkout')).toBe(true);
  });
});

test('fix checkout errors', async ({ page }) => {
  const cart = new CartPage(page);

  const placeOrderExpectingError = async (message: string) => {
    await cart.placeOrder.click();
    await expect.soft(alertWithText(page, message)).toBeVisible();
    await expect.soft(page).toHaveURL(/\/cart$/);
  };

  await test.step('1. add a product', async () => {
    await page.goto('/');
    await addFromOpenHome(page, PRODUCT, 1);
  });

  await test.step('2. zip code 1234', async () => {
    await cart.field('zipCode').fill('1234');
    await delayCheckout(page, 1_000);
    await cart.placeOrder.click();
    await expect.soft(cart.placeOrder).toHaveText('Placing order...');
    await expect.soft(alertWithText(page, 'Invalid zip code')).toBeVisible();
    await expect.soft(page).toHaveURL(/\/cart$/);
    await expect.soft(cart.placeOrder).toBeEnabled();
    await expect.soft(cart.placeOrder).toHaveText('Place Order');
    await page.unrouteAll();
  });

  await test.step('3. country France', async () => {
    await cart.field('zipCode').fill('94043');
    await cart.field('country').fill('France');
    await placeOrderExpectingError('We do not ship to France');
  });

  await test.step('4. declined card', async () => {
    await cart.field('country').fill('United States');
    await cart.field('creditCardNumber').fill('4000-0000-0000-0002');
    await placeOrderExpectingError('Your card was declined.');
  });

  await test.step('5. CVV 000', async () => {
    await cart.field('creditCardNumber').fill('4432-8015-6152-0454');
    await cart.field('creditCardCvv').fill('000');
    await placeOrderExpectingError('Invalid CVV');
  });

  await test.step('6. corrected form places the order', async () => {
    await cart.field('creditCardCvv').fill('672');
    await cart.placeOrder.click();
    await expect(page).toHaveURL(/\/cart\/checkout\//, { timeout: 15_000 });
  });
});
