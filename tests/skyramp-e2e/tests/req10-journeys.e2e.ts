// End-to-end shopper journeys through the storefront UI.
import { expect, test } from '@playwright/test';
import { CartPage, CheckoutConfirmationPage, HomePage, ProductPage } from '../support/storefront-pages';
import {
  CARD_DECLINED_MESSAGE,
  DECLINED_CARD_NUMBER,
  INVALID_ZIP_MESSAGE,
  PRODUCT_NAMES_A_TO_Z,
  VALID_CARD_NUMBER,
} from '../support/checkout-data';

test.describe.configure({ timeout: 120_000 });

test('shopper browses sorted products and category tags, fills the cart and checks out', async ({ page }) => {
  const home = new HomePage(page);
  const product = new ProductPage(page);
  const cart = new CartPage(page);

  await test.step('1. home page lists products A to Z with no cart badge', async () => {
    await page.goto('/');
    await home.productCards.first().waitFor();
    expect.soft(await home.productNames()).toEqual(PRODUCT_NAMES_A_TO_Z);
    await expect.soft(home.header.cartItemCount).toHaveCount(0);
  });

  await test.step('2. Optical Tube Assembly shows its category tags', async () => {
    await home.productCard('Optical Tube Assembly').click();
    await expect(product.name).toHaveText('Optical Tube Assembly');
    await expect.soft(product.categoryTags).toHaveText(['accessories', 'telescopes', 'assembly']);
  });

  await test.step('3. adding 3 of it shows a badge of 3', async () => {
    await product.addToCart(3);
    await expect.soft(cart.header.cartItemCount).toHaveText('3');
  });

  await test.step('4. The Comet Book shows one tag; adding 2 shows a badge of 5', async () => {
    await cart.header.goHome();
    await home.productCard('The Comet Book').click();
    await expect(product.name).toHaveText('The Comet Book');
    await expect.soft(product.categoryTags).toHaveText(['books']);
    await product.addToCart(2);
    await expect.soft(cart.header.cartItemCount).toHaveText('5');
  });

  await test.step('5. adding 1 more Optical Tube Assembly shows a badge of 6', async () => {
    await cart.header.goHome();
    await home.productCard('Optical Tube Assembly').click();
    await expect(product.name).toHaveText('Optical Tube Assembly');
    await product.addToCart(1);
    await expect.soft(cart.header.cartItemCount).toHaveText('6');
  });

  await test.step('6. the order summary shows Carrier USPS below Shipping, then Total', async () => {
    await expect.soft(cart.rowAfterShipping).toHaveText(/^Carrier\s*USPS$/);
    await expect.soft(cart.rowAfterCarrier).toContainText('Total');
  });

  await test.step('7. the twelfth expiration month reads December', async () => {
    await expect.soft(cart.expirationMonth.locator('option').nth(11)).toHaveText('December');
  });

  await test.step('8. placing the order with the defaults shows the confirmation with 2 items', async () => {
    await cart.placeOrder();
    await expect(page).toHaveURL(/\/cart\/checkout\/[^/]+/);
    await expect(new CheckoutConfirmationPage(page).items).toHaveCount(2);
  });

  await test.step('outcome persists after a reload', async () => {
    await page.reload();
    await expect(new CheckoutConfirmationPage(page).items).toHaveCount(2);
  });
});

test('shopper fixes a bad zip code and a declined card before checking out', async ({ page }) => {
  const home = new HomePage(page);
  const product = new ProductPage(page);
  const cart = new CartPage(page);

  await test.step('1. the first product card opens its product page', async () => {
    await page.goto('/');
    await home.productCards.first().waitFor();
    await home.productCards.first().click();
    await expect(product.name).toBeVisible();
  });

  await test.step('2. Add To Cart goes to the cart with a badge of 1', async () => {
    await product.addToCart(1);
    await expect.soft(cart.header.cartItemCount).toHaveText('1');
  });

  await test.step('3. zip 1234 shows Invalid zip code and stays on the cart', async () => {
    await expect.soft(cart.country).toHaveValue('United States');
    await cart.zipCode.fill('1234');
    await cart.placeOrder();
    await expect.soft(cart.alerts).toHaveText([INVALID_ZIP_MESSAGE]);
    await expect.soft(page).toHaveURL(/\/cart$/);
  });

  await test.step('4. a valid zip with the decline card shows only Your card was declined.', async () => {
    await cart.zipCode.fill('94043');
    await cart.cardNumber.fill(DECLINED_CARD_NUMBER);
    await cart.placeOrder();
    await expect.soft(cart.alerts).toHaveText([CARD_DECLINED_MESSAGE]);
    await expect.soft(page.getByText(INVALID_ZIP_MESSAGE)).toHaveCount(0);
    await expect.soft(page).toHaveURL(/\/cart$/);
  });

  await test.step('5. the valid card places the order', async () => {
    await cart.cardNumber.fill(VALID_CARD_NUMBER);
    await cart.placeOrder();
    await expect(page).toHaveURL(/\/cart\/checkout\/[^/]+/);
    await expect(new CheckoutConfirmationPage(page).items).toHaveCount(1);
    await expect(page.getByText(CARD_DECLINED_MESSAGE)).toHaveCount(0);
  });
});
