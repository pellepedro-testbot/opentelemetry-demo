import { expect, test } from '@playwright/test';
import { idsInCategory, products } from '../support/catalog';
import { addFromHome, addFromOpenHome, CartPage, Header } from '../support/storefront';

const accessoryNames = idsInCategory('accessories').map(id => products[id].name);

test('manage the cart', async ({ page }) => {
  const cart = new CartPage(page);
  const header = new Header(page);

  await test.step('1. add 2 Lens Cleaning Kits', async () => {
    await page.goto('/');
    await addFromOpenHome(page, 'Lens Cleaning Kit', 2);
  });

  await test.step('2. add 1 Red Flashlight', async () => {
    await addFromHome(page, 'Red Flashlight', 1);
    await expect.soft(header.cartItemCount).toHaveText('3');
  });

  await test.step('3. open the cart dropdown', async () => {
    await header.cartIcon.click();
    await expect.soft(header.dropdownSubtotal).toBeVisible();
    await expect.soft(header.dropdownSubtotal).toHaveText(/^Subtotal\s*\$\s*100\.98$/);
    await cart.heading.click();
  });

  await test.step('4. read the cart page', async () => {
    await expect.soft(cart.heading).toHaveText('Shopping Cart (3 items)');
    await expect.soft(cart.rowAfter('Shipping')).toHaveText(/^Carrier\s*USPS$/);
    await expect.soft(cart.dataRowValue('Zone')).toHaveText('domestic');
    await expect.soft(cart.field('creditCardExpirationMonth').locator('option[value="12"]')).toHaveText('December');
    await expect.soft(cart.field('creditCardExpirationMonth').locator('option', { hasText: 'January' })).toHaveCount(1);
    await expect.soft(cart.recommendationsTitle).toHaveText('You May Also Like');
  });

  await test.step('5. change the Lens Cleaning Kit quantity to 1', async () => {
    await cart.quantitySelect('Lens Cleaning Kit').selectOption('1');
    await expect.soft(cart.heading).toHaveText('Shopping Cart (2 items)');
    await page.reload();
    await expect.soft(cart.quantitySelect('Lens Cleaning Kit')).toHaveValue('1');
    await expect.soft(cart.heading).toHaveText('Shopping Cart (2 items)');
    await expect.soft(header.cartItemCount).toHaveText('2');
  });

  await test.step('6. remove the Red Flashlight', async () => {
    await expect.soft(cart.removeButton('Lens Cleaning Kit')).toBeVisible();
    await cart.removeButton('Red Flashlight').click();
    await expect.soft(cart.row('Red Flashlight')).toHaveCount(0);
    await page.reload();
    await expect.soft(cart.heading).toHaveText('Shopping Cart (1 items)');
    await expect.soft(cart.row('Red Flashlight')).toHaveCount(0);
    await expect.soft(cart.row('Lens Cleaning Kit')).toBeVisible();
  });

  await test.step('7. remove the last row', async () => {
    await cart.removeButton('Lens Cleaning Kit').click();
    await expect.soft(page.getByText('Your shopping cart is empty!')).toBeVisible();
    await page.reload();
    await expect.soft(page.getByText('Your shopping cart is empty!')).toBeVisible();
    await expect.soft(cart.recommendationsTitle).toHaveText('Popular Accessories');
    await expect.soft(cart.recommendationCards.first()).toBeVisible();
    for (const card of await cart.recommendationCards.all()) {
      const name = await card.locator('p').first().innerText();
      expect.soft(accessoryNames, name).toContain(name);
    }
  });
});

test('get free shipping on a large order', async ({ page }) => {
  const cart = new CartPage(page);

  await test.step('1. add 10 copies of The Comet Book', async () => {
    await page.goto('/');
    await addFromOpenHome(page, 'The Comet Book', 10);
  });

  await test.step('2. shipping is free', async () => {
    await expect.soft(cart.dataRowValue('Shipping')).toHaveText('Free');
  });

  await test.step('3. with 1 copy shipping has a price', async () => {
    await cart.removeButton('The Comet Book').click();
    await expect(page.getByText('Your shopping cart is empty!')).toBeVisible();
    await addFromHome(page, 'The Comet Book', 1);
    await expect.soft(cart.dataRowValue('Shipping')).toHaveText(/^\$\s*\d+\.\d{2}$/);
  });
});
