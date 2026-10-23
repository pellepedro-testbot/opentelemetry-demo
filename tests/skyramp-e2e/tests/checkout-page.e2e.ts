import { expect, test } from '@playwright/test';
import {
  Ad,
  addToCartFromHome,
  CartPage,
  ConfirmationPage,
  MONTH_NAMES,
  Header,
  Recommendations,
  amount,
} from '../support/storefront-pages';

const minutesOfDay = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};

test('shopper reviews the cart and places an order', async ({ page }) => {
  const header = new Header(page);
  const cart = new CartPage(page);
  const confirmation = new ConfirmationPage(page);
  const recommendations = new Recommendations(page);
  const ad = new Ad(page);
  const confirmationAdRequests: URL[] = [];
  page.on('request', request => {
    const url = new URL(request.url());
    if (url.pathname === '/api/data' && (request.headers()['referer'] ?? '').includes('/cart/checkout/')) {
      confirmationAdRequests.push(url);
    }
  });

  await test.step('1. add 3 Explorascopes and 2 Lens Cleaning Kits', async () => {
    await addToCartFromHome(page, 'National Park Foundation Explorascope', 3);
    await addToCartFromHome(page, 'Lens Cleaning Kit', 2);
    await expect.soft(header.cartItemCount).toHaveText('5');
  });

  await test.step('2. open the cart dropdown', async () => {
    await header.openCartDropdown();
    await expect.soft(header.cartDropdownTitle).toHaveText('Shopping Cart (5)');
    await expect.soft(header.cartDropdownSubtotal).toContainText('Subtotal');
    expect.soft(amount(await header.cartDropdownSubtotal.locator('[data-cy="product-price"]').innerText())).toBe(349.78);
    await header.closeCartDropdown();
  });

  await test.step('3. read the cart page', async () => {
    const adRequests: URL[] = [];
    const recommendationRequests: URL[] = [];
    page.on('request', request => {
      const url = new URL(request.url());
      if (url.pathname === '/api/data') adRequests.push(url);
      if (url.pathname === '/api/recommendations') recommendationRequests.push(url);
    });
    await page.reload();
    await expect(cart.heading).toHaveText('Shopping Cart (5 items)');

    const browserTime = await page.evaluate(() => {
      const d = new Date();
      return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
    });
    await expect.soft(cart.lastUpdated).toHaveText(/^Last updated \d{2}:\d{2}$/);
    const shown = ((await cart.lastUpdated.textContent()) ?? '').replace('Last updated ', '');
    expect.soft(Math.abs(minutesOfDay(shown) - minutesOfDay(browserTime)) % 1439, `${shown} vs ${browserTime}`).toBeLessThanOrEqual(1);

    await expect.soft(cart.summaryValue('Carrier')).toHaveText('USPS');
    const labels = await cart.summaryLabels();
    expect.soft(labels.indexOf('Subtotal'), 'Subtotal above Shipping').toBeLessThan(labels.indexOf('Shipping'));
    expect.soft(labels[labels.indexOf('Shipping') + 1], 'Carrier directly after Shipping').toBe('Carrier');
    const subtotal = amount(await cart.summaryValue('Subtotal').innerText());
    const shipping = amount(await cart.summaryValue('Shipping').innerText());
    const total = amount(await cart.summaryValue('Total').innerText());
    expect.soft(subtotal).toBe(349.78);
    expect.soft(Math.round((subtotal + shipping) * 100) / 100, 'Total = Subtotal + Shipping').toBe(total);
    await expect.soft(cart.summaryValue('Zone')).toHaveText('domestic');
    await expect.soft(cart.summaryValue('Delivery')).toHaveText('Arrives in 3 days');
    await expect.soft(cart.summaryValue('Package size')).toHaveText('medium');

    // With the Lens Cleaning Kit in the cart only one product is cheaper than every item,
    // so the two-card count is checked in cart-page.e2e.ts with the Explorascope alone.
    await expect.soft(recommendations.cards.first()).toBeVisible();
    expect.soft(await recommendations.cards.count()).toBeLessThanOrEqual(2);
    expect.soft(recommendationRequests.length).toBeGreaterThan(0);
    for (const url of recommendationRequests) expect.soft(url.searchParams.get('maxResults'), url.search).toBe('2');

    await expect.soft(ad.link).toContainText('Lens Cleaning Kit');
    expect.soft(adRequests.length).toBeGreaterThan(0);
    for (const url of adRequests) {
      expect.soft(url.searchParams.getAll('contextKeys'), `ad request ${url.search}`).toEqual(['cart']);
    }
    await expect.soft(cart.removeLinks).toHaveCount(2);
  });

  await test.step('4. check the checkout form', async () => {
    await expect.soft(cart.expirationMonth.locator('option[value="12"]')).toHaveText('December');
    await expect.soft(cart.expirationMonth.locator('option')).toHaveText(MONTH_NAMES);
    await expect.soft(cart.cvv).toHaveAttribute('placeholder', '123');
  });

  await test.step('5. place the order', async () => {
    await page.route('**/api/checkout*', async route => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      await route.continue();
    });
    await cart.email.fill('shopper@example.com');
    await cart.placeOrder.click();
    await expect.soft(cart.placeOrder).toBeDisabled();
    await expect.soft(cart.placeOrder).toHaveText('Placing order...');
    await expect(page).toHaveURL(/\/cart\/checkout\//, { timeout: 15_000 });
  });

  await test.step('6. read the confirmation page', async () => {
    await expect(confirmation.title).toHaveText('Your order is complete!');
    await expect.soft(confirmation.subtitle).toHaveText('Confirmation sent to shopper@example.com');
    await expect.soft(confirmation.totalItems).toContainText('5');
    expect.soft(amount(await confirmation.itemPrice('National Park Foundation Explorascope').innerText())).toBe(305.88);
    const lens = amount(await confirmation.itemPrice('Lens Cleaning Kit').innerText());
    const explorascope = amount(await confirmation.itemPrice('National Park Foundation Explorascope').innerText());
    const shipping = amount(await confirmation.shipping.innerText());
    expect.soft(amount(await confirmation.total.innerText()), 'total = item costs + shipping').toBeCloseTo(
      explorascope + lens + shipping,
      2
    );
    await expect.soft(ad.link).toHaveText('Free returns within 30 days');
    expect.soft([...new Set(confirmationAdRequests.map(u => u.searchParams.getAll('contextKeys').join(',')))]).toEqual(['checkout']);
  });

  await test.step('outcome: the cart is empty after the order', async () => {
    await expect.soft(header.cartItemCount).toBeHidden();
    await cart.goto();
    await expect(cart.emptyCartTitle).toBeVisible();
  });
});
