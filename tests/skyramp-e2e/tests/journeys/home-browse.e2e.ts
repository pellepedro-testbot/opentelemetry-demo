import { test, expect } from '@playwright/test';
import { HomePage } from '../../support/storefrontPages';

test('browse the home page and filter the products by category', async ({ page }) => {
  test.setTimeout(90_000);
  const home = new HomePage(page);
  const year = new Date().getFullYear();

  await test.step('1. open the home page: counted heading, badge, home ad, footer', async () => {
    const homeAdRequest = page.waitForRequest(r => /\/api\/data\?.*contextKeys=home/.test(r.url()), {
      timeout: 10_000,
    });
    await page.goto('/');
    await expect.soft(home.hotProductsHeading).toHaveText('Hot Products (10)');
    await expect.soft(home.productCards).toHaveCount(10);
    const badged = home.productCards.filter({ hasText: 'Bestseller' });
    await expect.soft(badged).toHaveCount(1);
    await expect.soft(badged).toContainText('Starsense Explorer Refractor Telescope');
    expect
      .soft(
        await homeAdRequest.then(
          () => true,
          () => false
        )
      )
      .toBe(true);
    await expect.soft(home.ad).toContainText('Starsense Explorer');
    await expect.soft(home.footer).toContainText(`© ${year} OpenTelemetry`);
    await expect.soft(home.footer).not.toContainText(`@ ${year}`);
  });

  await test.step('2. choose the flashlights filter', async () => {
    await home.categoryFilter('flashlights').click();
    await expect.soft(home.productCards).toHaveCount(1);
    await expect.soft(home.productCards).toContainText('Red Flashlight');
    await expect.soft(home.hotProductsHeading).toHaveText('Hot Products (1)');
  });

  await test.step('3. choose books, then All', async () => {
    await expect
      .soft(page.getByRole('button'))
      .toContainText(['All', 'accessories', 'assembly', 'binoculars', 'books', 'flashlights', 'telescopes', 'travel']);
    await home.categoryFilter('books').click();
    await expect.soft(home.productCards).toHaveCount(1);
    await expect.soft(home.productCards).toContainText('The Comet Book');
    await home.categoryFilter('All').click();
    await expect.soft(home.productCards).toHaveCount(10);
    await expect.soft(home.hotProductsHeading).toHaveText('Hot Products (10)');
  });
});
