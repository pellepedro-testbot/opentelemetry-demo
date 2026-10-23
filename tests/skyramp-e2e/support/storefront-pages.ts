import { Locator, Page, expect } from '@playwright/test';

// Elements are located by the data-cy attributes the frontend's own Cypress tests use
// (src/frontend/utils/enums/CypressFields.ts), falling back to roles and visible text.
const field = (scope: Page | Locator, name: string) => scope.locator(`[data-cy="${name}"]`);

export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

// "$ 101.96" -> 101.96
export const amount = (text: string | null) => Number((text ?? '').replace(/[^\d.]/g, ''));

export class Header {
  readonly cartIcon: Locator;
  readonly cartItemCount: Locator;
  readonly currencySwitcher: Locator;
  readonly cartDropdown: Locator;
  readonly cartDropdownTitle: Locator;
  readonly cartDropdownItems: Locator;
  readonly cartDropdownSubtotal: Locator;
  readonly footer: Locator;

  constructor(readonly page: Page) {
    this.cartIcon = field(page, 'cart-icon');
    this.cartItemCount = field(page, 'cart-item-count');
    this.currencySwitcher = field(page, 'currency-switcher');
    this.cartDropdown = field(page, 'cart-dropdown');
    this.cartDropdownTitle = this.cartDropdown.getByRole('heading', { name: /^Shopping Cart/ });
    this.cartDropdownItems = field(this.cartDropdown, 'cart-dropdown-item');
    this.cartDropdownSubtotal = this.cartDropdown.locator('div', { has: page.getByText('Subtotal', { exact: true }) }).last();
    this.footer = page.getByRole('contentinfo');
  }

  async openCartDropdown() {
    await this.cartIcon.click();
    await expect(this.cartDropdown).toBeVisible();
  }

  async closeCartDropdown() {
    await this.page.locator('main').click({ position: { x: 5, y: 5 } });
    await expect(this.cartDropdown).toBeHidden();
  }

  async selectCurrency(code: string) {
    await this.currencySwitcher.selectOption(code);
  }
}

export class Ad {
  readonly block: Locator;
  readonly label: Locator;
  readonly link: Locator;

  constructor(readonly page: Page) {
    this.block = field(page, 'ad');
    this.label = this.block.getByText('Advertisement', { exact: true });
    this.link = this.block.getByRole('link');
  }
}

export class Recommendations {
  readonly section: Locator;
  readonly title: Locator;
  readonly cards: Locator;

  constructor(readonly page: Page) {
    this.section = field(page, 'recommendation-list');
    this.title = this.section.getByRole('heading');
    this.cards = field(this.section, 'product-card');
  }
}

export class HomePage {
  readonly heading: Locator;
  readonly searchBox: Locator;
  readonly searchButton: Locator;
  readonly productList: Locator;
  readonly productCards: Locator;
  readonly productNames: Locator;
  readonly badges: Locator;

  constructor(readonly page: Page) {
    this.heading = field(page, 'hot-products');
    this.searchBox = page.getByRole('searchbox', { name: 'Search products' });
    this.searchButton = page.getByRole('search').getByRole('button', { name: 'Search' });
    this.productList = field(page, 'product-list');
    this.productCards = field(this.productList, 'product-card');
    this.productNames = this.productCards.locator(':scope > div > p:first-of-type');
    this.badges = this.productCards.locator(':scope > div > span');
  }

  async goto() {
    await this.page.goto('/');
    await expect(this.productCards.first()).toBeVisible();
  }

  categoryButton(name: string) {
    return this.page.getByRole('button', { name: new RegExp(`^${name}$`, 'i') });
  }

  card(name: string) {
    return this.productCards.filter({ hasText: name });
  }

  async search(query: string) {
    await this.searchBox.fill(query);
    await this.searchButton.click();
  }
}

export class ProductPage {
  readonly name: Locator;
  readonly description: Locator;
  readonly categoryTags: Locator;
  readonly quantity: Locator;
  readonly lineTotal: Locator;
  readonly addToCart: Locator;
  readonly backLink: Locator;
  readonly inYourCart: Locator;
  readonly fromAd: Locator;
  readonly error: Locator;
  readonly price: Locator;

  constructor(readonly page: Page) {
    const detail = field(page, 'product-detail');
    this.name = field(page, 'product-name');
    this.description = field(page, 'product-description');
    this.categoryTags = this.description.locator('xpath=following-sibling::div[1]/span');
    this.quantity = field(page, 'product-quantity');
    this.lineTotal = detail.getByText(/^Line total:/);
    this.addToCart = field(page, 'product-add-to-cart');
    this.backLink = page.getByRole('link', { name: 'Back to products' });
    this.inYourCart = detail.getByText(/^In your cart: \d+$/);
    this.fromAd = detail.getByText('You came from an ad', { exact: true });
    this.error = detail.getByRole('alert');
    this.price = this.description.locator('xpath=following-sibling::p[1]');
  }

  async goto(productId: string) {
    await this.page.goto(`/product/${productId}`);
    await expect(this.name).not.toBeEmpty();
  }

  async add(quantity: number) {
    await this.quantity.selectOption(String(quantity));
    await this.addToCart.click();
  }
}

export class CartPage {
  readonly heading: Locator;
  readonly lastUpdated: Locator;
  readonly emptyCartButton: Locator;
  readonly emptyCartTitle: Locator;
  readonly removeLinks: Locator;
  readonly items: Locator;
  readonly itemNames: Locator;
  readonly placeOrder: Locator;
  readonly error: Locator;
  readonly email: Locator;
  readonly streetAddress: Locator;
  readonly zipCode: Locator;
  readonly country: Locator;
  readonly cardNumber: Locator;
  readonly expirationMonth: Locator;
  readonly expirationYear: Locator;
  readonly cvv: Locator;

  constructor(readonly page: Page) {
    this.heading = page.getByRole('heading', { level: 1, name: /^Shopping Cart/ });
    this.lastUpdated = page.getByText(/^Last updated /);
    this.emptyCartButton = page.getByRole('button', { name: 'Empty Cart' });
    this.emptyCartTitle = page.getByText('Your shopping cart is empty!');
    this.removeLinks = page.getByRole('button', { name: 'Remove' });
    this.items = page.locator('main section').filter({ has: page.getByText('Product', { exact: true }) });
    this.itemNames = this.items.locator('a[href^="/product/"] p');
    this.placeOrder = field(page, 'checkout-place-order');
    this.error = page.locator('main').getByRole('alert');
    this.email = page.locator('#email');
    this.streetAddress = page.locator('#street_address');
    this.zipCode = page.locator('#zip_code');
    this.country = page.locator('#country');
    this.cardNumber = page.locator('#credit_card_number');
    this.expirationMonth = page.locator('#credit_card_expiration_month');
    this.expirationYear = page.locator('#credit_card_expiration_year');
    this.cvv = page.locator('#credit_card_cvv');
  }

  // A price summary row (Subtotal, Shipping, Carrier, ...): its label and value.
  summaryRow(label: string) {
    return this.page
      .locator('main div')
      .filter({ has: this.page.locator(':scope > span:first-child, :scope > h3:first-child', { hasText: new RegExp(`^${label}$`) }) })
      .last();
  }

  summaryValue(label: string) {
    return this.summaryRow(label).locator(':scope > :nth-child(2)');
  }

  // Labels of the price summary rows, top to bottom.
  async summaryLabels(): Promise<string[]> {
    return this.summaryRow('Subtotal').evaluate(row =>
      Array.from(row.parentElement!.children)
        .filter(child => child.children.length === 2 && /^(SPAN|H3)$/.test(child.children[0].tagName))
        .map(child => child.children[0].textContent!.trim())
    );
  }

  async goto() {
    await this.page.goto('/cart');
  }
}

export class ConfirmationPage {
  readonly title: Locator;
  readonly subtitle: Locator;
  readonly totalItems: Locator;
  readonly total: Locator;
  readonly shipping: Locator;
  readonly continueShopping: Locator;

  constructor(readonly page: Page) {
    this.title = page.getByRole('heading', { name: /Your order is complete!|Order not found/ });
    this.subtitle = page.getByText(/^Confirmation sent to |^We've sent you/);
    this.totalItems = page.locator('div', { has: page.getByText('Total items:', { exact: true }) }).last();
    this.shipping = page
      .locator('div', { has: page.getByText('Shipping:', { exact: true }) })
      .last()
      .locator('[data-cy="product-price"]');
    this.total = page
      .locator('div', { has: page.getByText('Total:', { exact: true }) })
      .last()
      .locator('[data-cy="product-price"]');
    this.continueShopping = page.getByRole('link', { name: 'Continue Shopping' });
  }

  itemPrice(productName: string) {
    return this.page
      .locator('div', { has: this.page.getByText(productName, { exact: true }) })
      .filter({ has: this.page.getByText(/^Quantity: \d+$/) })
      .last()
      .locator('xpath=..')
      .locator('[data-cy="product-price"]');
  }
}

// The storefront session id the browser keeps in localStorage.
export async function sessionUserId(page: Page): Promise<string> {
  return page.evaluate(() => JSON.parse(localStorage.getItem('session') || '{}').userId);
}

// Adds a product to the cart the way a shopper does: home page card, quantity, Add To Cart.
export async function addToCartFromHome(page: Page, productName: string, quantity: number) {
  const home = new HomePage(page);
  const product = new ProductPage(page);
  await home.goto();
  await home.card(productName).click();
  await expect(product.name).toHaveText(productName);
  await product.add(quantity);
  await expect(page).toHaveURL(/\/cart$/);
}
