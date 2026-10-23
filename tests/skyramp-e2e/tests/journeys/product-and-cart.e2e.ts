import { test, expect } from '@playwright/test';
import { CartPage, Header, HomePage, ProductPage, priceOf } from '../../support/storefrontPages';

const ACCESSORIES = [
  'Solar System Color Imager',
  'Solar Filter',
  'Optical Tube Assembly',
  'Lens Cleaning Kit',
  'Red Flashlight',
];
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
];

test('look at products and fill, adjust and empty the cart', async ({ page }) => {
  test.setTimeout(150_000);
  const home = new HomePage(page);
  const product = new ProductPage(page);
  const cart = new CartPage(page);
  const header = new Header(page);

  await test.step('1. open Starsense Explorer: title and cheaper alternatives', async () => {
    await page.goto('/');
    await home.productCard('Starsense Explorer Refractor Telescope').click();
    await page.waitForURL(/\/product\/66VCHSJNUP/);
    await expect.soft(page).toHaveTitle('Starsense Explorer Refractor Telescope - Otel Demo');
    await expect.soft(product.recommendationsHeading).toHaveText('Cheaper alternatives');
    await expect.soft(product.recommendationCards.first()).toBeVisible();
    const prices = await product.recommendationCards.locator('p:last-child').allTextContents();
    expect.soft(prices.map(priceOf).filter(p => !(p < 349.95))).toEqual([]);
  });

  await test.step('2. open Optical Tube Assembly: category tags below the description', async () => {
    await page.goBack();
    await home.productCard('Optical Tube Assembly').click();
    await page.waitForURL(/\/product\/9SIQT8TOJO/);
    await expect.soft(product.categoryTags).toHaveText(['accessories', 'telescopes', 'assembly']);
  });

  await test.step('3. add Lens Cleaning Kit x2', async () => {
    await home.openProduct('Lens Cleaning Kit');
    await product.add(2);
    await expect.soft(page).toHaveURL(/\/cart$/);
  });

  await test.step('4. add Red Flashlight x3: badge and heading count quantities', async () => {
    await home.openProduct('Red Flashlight');
    await product.add(3);
    await page.waitForURL(/\/cart$/);
    await expect.soft(header.cartItemCount).toHaveText('5');
    await expect.soft(cart.heading).toHaveText('Shopping Cart (5 items)');
  });

  await test.step('5. open the cart dropdown: subtotal', async () => {
    await header.cartIcon.click();
    await expect.soft(header.dropdownSubtotal).toContainText('Subtotal');
    await expect.soft(header.dropdownSubtotal).toContainText('215.14');
    await cart.heading.click();
  });

  await test.step('6. read the totals block and the expiration months', async () => {
    await expect.soft(cart.totalsRow('Shipping')).not.toContainText('Free');
    await expect.soft(cart.totalsRow('Shipping')).toContainText(/\d+\.\d\d/);
    await expect.soft(cart.rowAfter('Shipping')).toHaveText(/^Carrier\s*USPS$/);
    await expect.soft(cart.totalsRow('Zone')).toHaveText(/^Zone\s*domestic$/);
    const options = cart.expirationMonth.locator('option');
    await expect.soft(options).toHaveText([...MONTHS, 'December']);
    await expect.soft(options.nth(11)).toHaveAttribute('value', '12');
    expect
      .soft(await options.evaluateAll(os => os.map(o => (o as HTMLOptionElement).value)))
      .toEqual(MONTHS.map((_, i) => String(i + 1)).concat('12'));
  });

  await test.step('7. lower Red Flashlight from 3 to 1', async () => {
    await cart.cartRow('Red Flashlight').getByRole('combobox').selectOption('1');
    await expect.soft(cart.heading).toHaveText('Shopping Cart (3 items)');
    await expect.soft(cart.cartRow('Red Flashlight').getByRole('combobox')).toHaveValue('1');
  });

  await test.step('8. remove Red Flashlight', async () => {
    await expect.soft(cart.removeLinks).toHaveCount(2);
    await cart.cartRow('Red Flashlight').getByRole('button', { name: 'Remove' }).click();
    await expect.soft(cart.removeLinks).toHaveCount(1);
    await expect.soft(page.getByRole('link', { name: 'Red Flashlight Red Flashlight' })).toHaveCount(0);
    await expect.soft(cart.cartRow('Lens Cleaning Kit')).toBeVisible();
    await expect.soft(cart.heading).toHaveText('Shopping Cart (2 items)');
  });

  await test.step('9. add Lens Cleaning Kit x8 to reach 10 units: free shipping', async () => {
    await home.openProduct('Lens Cleaning Kit');
    await product.add(8);
    await page.waitForURL(/\/cart$/);
    await expect.soft(cart.heading).toHaveText('Shopping Cart (10 items)');
    await expect.soft(cart.totalsRow('Shipping')).toHaveText(/^Shipping\s*Free$/);
  });

  await test.step('10. add one more Lens Cleaning Kit: refused above 10', async () => {
    await home.openProduct('Lens Cleaning Kit');
    await product.add(1);
    await expect.soft(product.error).toHaveText('Maximum 10 per product');
    await expect.soft(page).toHaveURL(/\/product\/L9ECAV7KIM$/);
  });

  await test.step('11. empty the cart: popular accessories', async () => {
    await header.cartIcon.click();
    await header.goToShoppingCart.click();
    await page.waitForURL(/\/cart$/);
    await cart.emptyCart.click();
    await expect.soft(cart.recommendationsHeading).toHaveText('Popular Accessories');
    await expect.soft(cart.recommendationCards.first()).toBeVisible();
    const names = await cart.recommendationCards.locator('p:first-of-type').allTextContents();
    expect.soft(names.length).toBeGreaterThan(0);
    expect.soft(names.filter(n => !ACCESSORIES.includes(n))).toEqual([]);
  });
});
