import { expect, test } from '@playwright/test';
import { HomePage } from '../support/storefront';

test('browse the home page and filter by category', async ({ page }) => {
  const home = new HomePage(page);
  const adRequests: string[] = [];
  page.on('request', request => {
    if (new URL(request.url()).pathname === '/api/data') adRequests.push(request.url());
  });

  await test.step('1. open the home page', async () => {
    await page.goto('/');
    await expect(home.productCards.first()).toBeVisible();
    await expect.soft(home.hotProducts).toHaveText('Hot Products (10)');
    await expect.soft(home.productCards).toHaveCount(10);
    const names = await home.cardNames();
    expect.soft(names).toEqual([...names].sort());
    await expect.soft(home.card('Starsense Explorer Refractor Telescope')).toContainText('Bestseller');
    await expect.soft(home.productCards.filter({ hasText: 'Bestseller' })).toHaveCount(1);
    const year = new Date().getFullYear();
    await expect.soft(home.footer).toContainText(`© ${year} OpenTelemetry`);
    await expect.soft(home.footer).not.toContainText(`@ ${year}`);
    await expect.soft(home.ad).toContainText(/Starsense Explorer/);
    await expect.soft(home.adLink).toHaveAttribute('href', '/product/66VCHSJNUP');
    expect.soft(adRequests.some(url => new URL(url).searchParams.get('contextKeys') === 'home')).toBe(true);
  });

  await test.step('2. filter by travel', async () => {
    await expect.soft(home.categoryFilter('All')).toBeVisible();
    for (const category of ['accessories', 'assembly', 'binoculars', 'books', 'flashlights', 'telescopes', 'travel']) {
      await expect.soft(home.categoryFilter(category)).toBeVisible();
    }
    await home.categoryFilter('travel').click();
    await expect.soft(home.productCards).toHaveCount(1);
    await expect.soft(home.productCards).toContainText('Eclipsmart Travel Refractor Telescope');
    await expect.soft(home.hotProducts).toHaveText('Hot Products (1)');
  });

  await test.step('3. filter by books', async () => {
    await home.categoryFilter('books').click();
    await expect.soft(home.productCards).toHaveCount(1);
    await expect.soft(home.productCards).toContainText('The Comet Book');
    await expect.soft(home.hotProducts).toHaveText('Hot Products (1)');
  });

  await test.step('4. back to All', async () => {
    await home.categoryFilter('All').click();
    await expect.soft(home.productCards).toHaveCount(10);
    await expect.soft(home.hotProducts).toHaveText('Hot Products (10)');
  });
});
