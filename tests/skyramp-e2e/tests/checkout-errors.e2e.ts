import { expect, test } from '@playwright/test';
import { CartPage, Header, MONTH_NAMES, addToCartFromHome } from '../support/storefront-pages';

test('shopper sees why an order is refused and keeps the cart', async ({ page }) => {
  const cart = new CartPage(page);
  const header = new Header(page);

  await test.step('1. add one Lens Cleaning Kit', async () => {
    await addToCartFromHome(page, 'Lens Cleaning Kit', 1);
    await expect.soft(cart.heading).toHaveText('Shopping Cart (1 items)');
    await expect.soft(cart.placeOrder).toBeEnabled();
  });

  await test.step('2. Pasted text AC7, AC32', async () => {
    await cart.zipCode.fill('1234');
    await cart.placeOrder.click();
    await expect.soft(cart.error).toHaveText('Invalid zip code');
    await expect.soft(page).toHaveURL(/\/cart$/);
    await expect.soft(cart.placeOrder).toBeEnabled();
    await expect.soft(cart.placeOrder).toHaveText('Place Order');
  });

  await test.step('3. Pasted text AC30', async () => {
    await cart.zipCode.fill('94043');
    await cart.country.fill('France');
    await cart.placeOrder.click();
    await expect.soft(cart.error).toHaveText('We do not ship to France');
    await expect.soft(page).toHaveURL(/\/cart$/);
  });

  await test.step('4. Pasted text AC77', async () => {
    await cart.country.fill('United States');
    await cart.streetAddress.fill('   ');
    await cart.placeOrder.click();
    await expect.soft(cart.error).toHaveText('Street address is required');
    await expect.soft(page).toHaveURL(/\/cart$/);
  });

  await test.step('5. Pasted text AC10', async () => {
    await cart.streetAddress.fill('1600 Amphitheatre Parkway');
    await cart.cardNumber.fill('4000-0000-0000-0002');
    await cart.placeOrder.click();
    await expect.soft(cart.error).toHaveText('Your card was declined.');
    await expect.soft(page).toHaveURL(/\/cart$/);
  });

  await test.step('6. Pasted text AC34', async () => {
    await cart.cardNumber.fill('4432-8015-6152-0454');
    await cart.cvv.fill('000');
    await cart.placeOrder.click();
    await expect.soft(cart.error).toHaveText('Invalid CVV');
    await expect.soft(page).toHaveURL(/\/cart$/);
  });

  await test.step('7. Pasted text AC57', async () => {
    const now = new Date();
    await cart.cvv.fill('672');
    await cart.expirationMonth.selectOption({ label: MONTH_NAMES[now.getMonth()] });
    await cart.expirationYear.selectOption(String(now.getFullYear()));
    await cart.placeOrder.click();
    await expect.soft(cart.error).toHaveText('Card expires this month');
    await expect.soft(page).toHaveURL(/\/cart$/);
  });

  await test.step('8. Pasted text AC80', async () => {
    await cart.expirationYear.selectOption('2030');
    await cart.cardNumber.fill('4111-1111-1111-1111');
    await cart.placeOrder.click();
    await expect.soft(cart.error).toHaveText('Test cards are not accepted');
    await expect.soft(page).toHaveURL(/\/cart$/);
  });

  await test.step('9. Pasted text AC97', async () => {
    await cart.cardNumber.fill('4432-8015-6152-0454');
    await header.selectCurrency('JPY');
    await expect.soft(header.footer).toContainText('currency: JPY');
    await cart.placeOrder.click();
    await expect.soft(cart.error).toHaveText('Currency not supported for payment');
    await expect.soft(page).toHaveURL(/\/cart$/);
  });

  await test.step('10. Pasted text AC54', async () => {
    await header.selectCurrency('USD');
    await addToCartFromHome(page, 'Optical Tube Assembly', 2);
    await cart.placeOrder.click();
    await expect.soft(cart.error).toHaveText('Order exceeds the 5,000 USD limit');
    await expect.soft(page).toHaveURL(/\/cart$/);
    await expect.soft(cart.itemNames).toHaveText(['Lens Cleaning Kit', 'Optical Tube Assembly'].sort());
  });

  await test.step('outcome: the cart is unchanged after a reload', async () => {
    await page.reload();
    await expect(cart.heading).toHaveText('Shopping Cart (3 items)');
    await expect(cart.itemNames).toHaveCount(2);
  });
});
