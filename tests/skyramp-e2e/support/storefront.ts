// Page objects for the storefront, locating elements by the frontend's data-cy fields
// (src/frontend/utils/enums/CypressFields.ts) like the repo's Cypress tests do.
import { expect, Locator, Page } from '@playwright/test';

export const byField = (scope: Page | Locator, field: string) => scope.locator(`[data-cy="${field}"]`);

// Next.js renders an empty route announcer with role=alert, so match alerts by their text.
export const alertWithText = (page: Page, text: string) => page.getByRole('alert').filter({ hasText: text });

export class Header {
  constructor(private readonly page: Page) {}
  readonly cartIcon = byField(this.page, 'cart-icon');
  readonly cartItemCount = byField(this.page, 'cart-item-count');
  readonly cartDropdown = byField(this.page, 'cart-dropdown');
  readonly dropdownSubtotal = this.cartDropdown.locator('div').filter({ has: this.page.getByText('Subtotal', { exact: true }) }).last();
}

export class HomePage {
  constructor(private readonly page: Page) {}
  readonly hotProducts = byField(this.page, 'hot-products');
  readonly productCards = byField(byField(this.page, 'product-list'), 'product-card');
  readonly ad = byField(this.page, 'ad');
  readonly adLink = this.ad.locator('a');
  readonly footer = this.page.getByRole('contentinfo');

  async open() {
    await this.page.goto('/');
    await expect(this.productCards.first()).toBeVisible();
  }

  card(name: string) {
    return this.productCards.filter({ hasText: name });
  }

  categoryFilter(name: string) {
    return this.page.getByRole('button', { name, exact: true });
  }

  async openProduct(name: string) {
    await this.page.getByRole('link', { name: new RegExp(`^(Bestseller )?${name} \\$`) }).click();
    await expect(byField(this.page, 'product-name')).toHaveText(name);
  }

  cardNames() {
    return this.productCards.evaluateAll(cards => cards.map(card => card.querySelector('p')?.textContent ?? ''));
  }
}

export class ProductPage {
  constructor(private readonly page: Page) {}
  readonly name = byField(this.page, 'product-name');
  readonly description = byField(this.page, 'product-description');
  readonly quantity = byField(this.page, 'product-quantity');
  readonly addToCart = byField(this.page, 'product-add-to-cart');
  readonly recommendations = byField(this.page, 'recommendation-list');
  readonly recommendationCards = byField(this.recommendations, 'product-card');
  readonly recommendationsTitle = this.recommendations.getByRole('heading');

  category(name: string) {
    return this.page.locator('[data-cy="product-description"] ~ div').getByText(name, { exact: true });
  }

  async add(quantity: number) {
    await this.quantity.selectOption(String(quantity));
    await this.addToCart.click();
  }
}

export class CartPage {
  constructor(private readonly page: Page) {}
  readonly heading = this.page.getByRole('heading', { name: /^Shopping Cart \(/ });
  readonly placeOrder = byField(this.page, 'checkout-place-order');
  readonly recommendations = byField(this.page, 'recommendation-list');
  readonly recommendationCards = byField(this.recommendations, 'product-card');
  readonly recommendationsTitle = this.recommendations.getByRole('heading');

  row(productName: string) {
    return this.page.getByRole('link', { name: `${productName} ${productName}` }).locator('xpath=..');
  }

  removeButton(productName: string) {
    return this.row(productName).getByRole('button', { name: 'Remove' });
  }

  quantitySelect(productName: string) {
    return this.row(productName).locator('select');
  }

  dataRow(label: string) {
    return this.page.locator(`xpath=//main//span[normalize-space()="${label}"]/..`);
  }

  dataRowValue(label: string) {
    return this.dataRow(label).locator('span').nth(1);
  }

  rowAfter(label: string) {
    return this.dataRow(label).locator('xpath=following-sibling::div[1]');
  }

  field(name: string) {
    return this.page.locator(`[name="${name}"]`);
  }
}

export const addFromOpenHome = async (page: Page, productName: string, quantity: number) => {
  const home = new HomePage(page);
  await expect(home.productCards.first()).toBeVisible();
  await home.openProduct(productName);
  await new ProductPage(page).add(quantity);
  await expect(page).toHaveURL(/\/cart$/);
};

export const addFromHome = async (page: Page, productName: string, quantity: number) => {
  const home = new HomePage(page);
  await home.open();
  await home.openProduct(productName);
  await new ProductPage(page).add(quantity);
  await expect(page).toHaveURL(/\/cart$/);
};
