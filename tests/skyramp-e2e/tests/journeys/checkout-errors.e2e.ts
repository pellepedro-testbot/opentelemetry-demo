import { test, expect } from '@playwright/test';
import { CartPage, HomePage, ProductPage } from '../../support/storefrontPages';

test('checkout is refused with a message for bad order details', async ({ page }) => {
  test.setTimeout(90_000);
  const home = new HomePage(page);
  const product = new ProductPage(page);
  const cart = new CartPage(page);

  const placeOrderAndExpect = async (message: string) => {
    await cart.placeOrder.click();
    await expect.soft(cart.error).toHaveText(message);
    await expect.soft(page).toHaveURL(/\/cart$/);
    await expect.soft(cart.placeOrder).toHaveText('Place Order');
    await expect.soft(cart.placeOrder).toBeEnabled();
  };

  await test.step('1. add Red Flashlight to the cart', async () => {
    await page.goto('/');
    await home.productCard('Red Flashlight').click();
    await page.waitForURL(/\/product\/LS4PSXUNUM/);
    await product.add(1);
    await expect.soft(page).toHaveURL(/\/cart$/);
  });

  await test.step('2. zip code 1234 is refused', async () => {
    await cart.zipCode.fill('1234');
    await placeOrderAndExpect('Invalid zip code');
  });

  await test.step('3. country France is refused', async () => {
    await cart.zipCode.fill('94043');
    await cart.country.fill('France');
    await placeOrderAndExpect('We do not ship to France');
  });

  await test.step('4. card 4000-0000-0000-0002 is declined', async () => {
    await cart.country.fill('United States');
    await cart.cardNumber.fill('4000-0000-0000-0002');
    await placeOrderAndExpect('Your card was declined.');
  });

  await test.step('5. CVV 000 is refused', async () => {
    await cart.cardNumber.fill('4432-8015-6152-0454');
    await cart.cvv.fill('000');
    await placeOrderAndExpect('Invalid CVV');
  });

  await test.step('outcome: no order was placed and the cart is still there after a reload', async () => {
    await page.reload();
    await expect.soft(page).toHaveURL(/\/cart$/);
    await expect.soft(cart.heading).toHaveText('Shopping Cart (1 items)');
    await expect.soft(cart.cartRow('Red Flashlight')).toBeVisible();
    await expect.soft(cart.placeOrder).toHaveText('Place Order');
  });
});
