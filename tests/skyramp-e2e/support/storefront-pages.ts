// Page objects for the storefront pages, located through the frontend's own data-cy fields.
import { Page } from '@playwright/test';
import { CypressFields } from '../../../src/frontend/utils/enums/CypressFields';

const byField = (page: Page, field: CypressFields) => page.locator(`[data-cy="${field}"]`);

export class Header {
  constructor(private readonly page: Page) {}

  get cartItemCount() {
    return byField(this.page, CypressFields.CartItemCount);
  }

  async goHome() {
    await this.page.locator('header nav a[href="/"]').first().click();
    await this.page.waitForURL(/\/$/);
  }
}

export class HomePage {
  readonly header: Header;

  constructor(private readonly page: Page) {
    this.header = new Header(page);
  }

  async open() {
    await this.page.goto('/');
    await this.productCards.first().waitFor();
  }

  get productCards() {
    return byField(this.page, CypressFields.ProductList).locator(`[data-cy="${CypressFields.ProductCard}"]`);
  }

  productCard(name: string) {
    return this.productCards.filter({ hasText: name });
  }

  productNames() {
    return this.productCards.evaluateAll(cards => cards.map(card => card.querySelector('p')?.textContent?.trim() ?? ''));
  }
}

export class ProductPage {
  readonly header: Header;

  constructor(private readonly page: Page) {
    this.header = new Header(page);
  }

  async open(productId: string) {
    await this.page.goto(`/product/${productId}`);
    await this.name.waitFor();
  }

  get name() {
    return byField(this.page, CypressFields.ProductName);
  }

  get description() {
    return byField(this.page, CypressFields.ProductDescription);
  }

  get categoryList() {
    return this.page.locator(`[data-cy="${CypressFields.ProductDescription}"] + div`);
  }

  get categoryTags() {
    return this.categoryList.locator('> span');
  }

  get price() {
    return this.description.locator(`xpath=following-sibling::p[.//*[@data-cy="${CypressFields.ProductPrice}"]][1]`);
  }

  async addToCart(quantity = 1) {
    await byField(this.page, CypressFields.ProductQuantity).selectOption(String(quantity));
    await Promise.all([
      this.page.waitForURL(/\/cart$/),
      byField(this.page, CypressFields.ProductAddToCart).click(),
    ]);
  }
}

export class CartPage {
  readonly header: Header;

  constructor(private readonly page: Page) {
    this.header = new Header(page);
  }

  async open() {
    await this.page.goto('/cart');
  }

  get shippingRow() {
    return this.page.locator('div', { has: this.page.locator(':scope > span', { hasText: /^Shipping$/ }) }).last();
  }

  get rowAfterShipping() {
    return this.shippingRow.locator('xpath=following-sibling::div[1]');
  }

  get rowAfterCarrier() {
    return this.shippingRow.locator('xpath=following-sibling::div[2]');
  }

  get expirationMonth() {
    return this.page.locator('select[name="creditCardExpirationMonth"]');
  }

  get zipCode() {
    return this.page.locator('input[name="zipCode"]');
  }

  get country() {
    return this.page.locator('input[name="country"]');
  }

  get cardNumber() {
    return this.page.locator('input[name="creditCardNumber"]');
  }

  get alerts() {
    return this.page.locator('main [role="alert"]');
  }

  async placeOrder() {
    await Promise.all([
      this.page.waitForResponse(r => r.url().includes('/api/checkout') && r.request().method() === 'POST'),
      byField(this.page, CypressFields.CheckoutPlaceOrder).click(),
    ]);
  }
}

export class CheckoutConfirmationPage {
  constructor(private readonly page: Page) {}

  get items() {
    return this.page.getByRole('heading', { name: 'Order Items' }).locator('xpath=following-sibling::div[1]/div');
  }
}
