import { expect, test } from '@playwright/test';
import { Ad, Header, HomePage } from '../support/storefront-pages';

const byName = (a: string, b: string) => a.toLowerCase().localeCompare(b.toLowerCase());

test('shopper browses, searches and filters the catalog and switches currency', async ({ page }) => {
  const home = new HomePage(page);
  const header = new Header(page);
  const ad = new Ad(page);
  const adRequests: URL[] = [];
  page.on('request', request => {
    if (request.url().includes('/api/data')) adRequests.push(new URL(request.url()));
  });

  await test.step('1. open the home page', async () => {
    await home.goto();
    await expect.soft(home.heading).toHaveText('Hot Products (10)');
    await expect.soft(home.productCards).toHaveCount(10);
    const names = await home.productNames.allInnerTexts();
    expect.soft(names, 'cards in A-Z order').toEqual([...names].sort(byName));
    await expect.soft(home.badges).toHaveCount(1);
    await expect.soft(home.card('Starsense Explorer Refractor Telescope').locator(':scope > div > span')).toHaveText('Bestseller');
    const year = new Date().getFullYear();
    await expect.soft(header.footer).toContainText(`© ${year} OpenTelemetry`);
    await expect.soft(header.footer).not.toContainText(`@ ${year}`);
    await expect.soft(header.footer).toContainText('currency: USD');
    await expect.soft(ad.label).toBeVisible();
    await expect.soft(ad.link).toContainText('Starsense Explorer Refractor Telescope');
    const labelBox = await ad.label.boundingBox();
    const linkBox = await ad.link.boundingBox();
    expect.soft(labelBox && linkBox && labelBox.y < linkBox.y, 'Advertisement label above the ad text').toBe(true);
    expect.soft(adRequests.map(u => u.searchParams.getAll('contextKeys').join(','))).toContain('home');
  });

  await test.step('2. search for "telescope"', async () => {
    await home.search('telescope');
    await expect.soft(home.productCards).toHaveCount(7);
    await expect.soft(home.heading).toHaveText(`Hot Products (${await home.productCards.count()})`);
    const names = (await home.productNames.allInnerTexts()).map(n => n.toLowerCase().includes('telescope'));
    expect.soft(names.slice(0, 2), 'the two telescopes named "Telescope" come first').toEqual([true, true]);
    expect.soft(names.lastIndexOf(true)).toBeLessThan(names.indexOf(false));
  });

  await test.step('3. filter by the flashlights category', async () => {
    await home.categoryButton('flashlights').click();
    await expect.soft(home.productNames).toHaveText(['Red Flashlight']);
    await expect.soft(home.heading).toHaveText('Hot Products (1)');
    await expect.soft(home.searchBox).toHaveValue('');
  });

  await test.step('4. show all categories again', async () => {
    await home.categoryButton('All').click();
    await expect.soft(home.heading).toHaveText('Hot Products (10)');
  });

  await test.step('5. switch the currency to EUR', async () => {
    await expect.soft(header.currencySwitcher.locator('option[value="EUR"]')).toHaveText('EUR (€)');
    await expect.soft(header.currencySwitcher.locator('option[value="USD"]')).toHaveText('USD ($)');
    await header.selectCurrency('EUR');
    await expect.soft(header.currencySwitcher).toHaveValue('EUR');
    await expect.soft(header.footer).toContainText('currency: EUR');
    await expect.soft(home.productCards.first()).toContainText('€');
  });

  await test.step('outcome: currency choice survives a reload', async () => {
    await page.reload();
    await expect(header.footer).toContainText('currency: EUR');
    await expect(home.heading).toHaveText('Hot Products (10)');
  });
});
