// Skyramp Testbot test package: Testbot owns and maintains everything in this folder.
import { expect, test } from '@playwright/test';
import { CartPage, CheckoutConfirmationPage, HomePage, ProductPage } from '../../storefront-pages';
import { LENS_KIT, STARSENSE, sortedByName } from '../../storefront-data';

test('browse the storefront, open the bestseller and buy it with a lens cleaning kit', async ({ page }) => {
  const home = new HomePage(page);
  const product = new ProductPage(page);
  const cart = new CartPage(page);
  const year = new Date().getFullYear();

  await test.step('1. home page shows counted heading, sorted cards, bestseller badge, home ad, footer and currencies', async () => {
    const adRequest = page.waitForRequest(r => r.url().includes('/api/data'));
    await page.goto('/');
    await home.waitForProducts();
    const adUrl = new URL((await adRequest).url());
    expect.soft(adUrl.searchParams.getAll('contextKeys')).toEqual(['home']);

    const count = await home.productCards.count();
    expect.soft(count).toBe(10);
    await expect.soft(home.hotProducts).toHaveText(`Hot Products (${count})`);

    const names = await home.productNames.allTextContents();
    expect.soft(names).toEqual(sortedByName(names));

    await expect.soft(home.badges).toHaveCount(1);
    await expect.soft(home.badges).toHaveText('Bestseller');
    await expect.soft(home.card(STARSENSE.name)).toContainText('Bestseller');

    await expect.soft(home.ad).toContainText('Starsense Explorer');
    await expect.soft(home.ad.locator('a')).toHaveAttribute('href', `/product/${STARSENSE.id}`);

    await expect.soft(home.footer).toContainText(`© ${year} OpenTelemetry`);
    await expect.soft(home.footer).not.toContainText(`@ ${year}`);

    const currencies = await home.currencyOptions.allTextContents();
    expect.soft(currencies).toEqual([...currencies].sort());
  });

  await test.step('2. the Starsense Explorer page has its title, one telescopes tag and "You May Also Like"', async () => {
    await home.openProduct(STARSENSE.name);
    await expect(product.name).toHaveText(STARSENSE.name);
    await expect.soft(page).toHaveTitle(`${STARSENSE.name} - Otel Demo`);
    await expect.soft(product.categoryTags).toHaveText(['telescopes']);
    await expect.soft(product.recommendationsTitle).toHaveText('You May Also Like');
  });

  await test.step('3. adding quantity 3 lands on the cart with badge 3', async () => {
    await product.add(3);
    await expect.soft(cart.cartItemCount).toHaveText('3');
  });

  await test.step('4. adding a lens cleaning kit gives badge 4, counted heading, carrier, December and recommendations', async () => {
    await cart.goHome();
    await home.waitForProducts();
    await home.openProduct(LENS_KIT.name);
    await product.add(1);
    await expect(cart.rows).toHaveCount(2);
    await expect.soft(cart.cartItemCount).toHaveText('4');
    await expect.soft(cart.heading).toHaveText('Shopping Cart (4 items)');
    await expect.soft(cart.rowAfterShipping).toContainText('Carrier');
    await expect.soft(cart.rowAfterShipping).toContainText('USPS');
    await expect.soft(cart.monthOptions.nth(11)).toHaveText('December');
    await expect.soft(cart.recommendationsTitle).toHaveText('You May Also Like');
  });

  await test.step('5. placing the order shows a confirmation with both products', async () => {
    await cart.placeOrder.click();
    await page.waitForURL(/\/cart\/checkout\/[^/]+/);
    const confirmation = new CheckoutConfirmationPage(page);
    await expect(confirmation.items).toHaveCount(2);
    await expect.soft(confirmation.items.filter({ hasText: STARSENSE.name })).toContainText('Quantity: 3');
    await expect.soft(confirmation.items.filter({ hasText: LENS_KIT.name })).toContainText('Quantity: 1');
  });
});
