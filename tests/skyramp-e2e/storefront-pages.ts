// Skyramp Testbot test package: Testbot owns and maintains everything in this folder.
// Page objects for the storefront, located through the frontend's own data-cy fields.
import { Locator, Page, expect } from '@playwright/test';
import { CypressFields } from '../../src/frontend/utils/enums/CypressFields';

const field = (scope: Page | Locator, name: CypressFields) => scope.locator(`[data-cy="${name}"]`);

const cardNames = (cards: Locator) => cards.locator('p:not(:has(span))');

export class StorefrontPage {
  constructor(protected readonly page: Page) {}

  get cartItemCount() {
    return field(this.page, CypressFields.CartItemCount);
  }

  get currencyOptions() {
    return field(this.page, CypressFields.CurrencySwitcher).locator('option');
  }

  get footer() {
    return this.page.locator('footer');
  }

  async goHome() {
    await this.page.locator('header a[href="/"]').first().click();
    await this.page.waitForURL(/\/$/);
  }
}

export class HomePage extends StorefrontPage {
  get hotProducts() {
    return field(this.page, CypressFields.HotProducts);
  }

  get productCards() {
    return field(field(this.page, CypressFields.ProductList), CypressFields.ProductCard);
  }

  get productNames() {
    return cardNames(this.productCards);
  }

  get badges() {
    return this.productCards.locator('[class*="__Badge"]');
  }

  get ad() {
    return field(this.page, CypressFields.Ad);
  }

  card(name: string) {
    return this.productCards.filter({ hasText: name });
  }

  async open() {
    await this.page.goto('/');
    await this.waitForProducts();
  }

  async waitForProducts() {
    await expect(this.productCards.first()).toBeVisible();
  }

  async openProduct(name: string) {
    await this.card(name).click();
    await this.page.waitForURL(/\/product\//);
  }
}

export class ProductPage extends StorefrontPage {
  get name() {
    return field(this.page, CypressFields.ProductName);
  }

  get description() {
    return field(this.page, CypressFields.ProductDescription);
  }

  get categoryTags() {
    return this.description.locator('xpath=following-sibling::*[1]').locator('span');
  }

  get recommendationsTitle() {
    return field(this.page, CypressFields.RecommendationList).locator('h3');
  }

  async open(productId: string) {
    await this.page.goto(`/product/${productId}`);
    await expect(this.name).not.toBeEmpty();
  }

  async add(quantity = 1) {
    await expect(this.name).not.toBeEmpty();
    await field(this.page, CypressFields.ProductQuantity).selectOption(String(quantity));
    await field(this.page, CypressFields.ProductAddToCart).click();
    await this.page.waitForURL(/\/cart$/);
  }
}

export class CartPage extends StorefrontPage {
  private get summaryRows() {
    return this.page.locator('main section > div');
  }

  get heading() {
    return this.page.getByRole('heading', { name: /^Shopping Cart/ });
  }

  get rows() {
    return this.summaryRows.filter({ has: this.page.getByRole('button', { name: 'Remove' }) });
  }

  get shippingRow() {
    return this.summaryRows.filter({ hasText: /^Shipping/ });
  }

  get rowAfterShipping() {
    return this.shippingRow.locator('xpath=following-sibling::div[1]');
  }

  get monthOptions() {
    return this.page.locator('#credit_card_expiration_month option');
  }

  get zipCode() {
    return this.page.locator('#zip_code');
  }

  get cardNumber() {
    return this.page.locator('#credit_card_number');
  }

  get placeOrder() {
    return field(this.page, CypressFields.CheckoutPlaceOrder);
  }

  get error() {
    return this.page.locator('main [role="alert"]');
  }

  get recommendationsTitle() {
    return field(this.page, CypressFields.RecommendationList).locator('h3');
  }

  get recommendedNames() {
    return cardNames(field(field(this.page, CypressFields.RecommendationList), CypressFields.ProductCard));
  }

  row(productName: string) {
    return this.rows.filter({ hasText: productName });
  }

  removeButton(productName: string) {
    return this.row(productName).getByRole('button', { name: 'Remove' });
  }

  setQuantity(productName: string, quantity: number) {
    return this.row(productName).locator('select').selectOption(String(quantity));
  }
}

export class CheckoutConfirmationPage extends StorefrontPage {
  get items() {
    return this.page.getByRole('heading', { level: 5 }).locator('xpath=..');
  }
}
