import { Locator, Page } from '@playwright/test';
import { CypressFields } from '../../../src/frontend/utils/enums/CypressFields';

export const byField = (scope: Page | Locator, field: CypressFields) => scope.locator(`[data-cy="${field}"]`);

// Parses a rendered price such as "$ 215.14" or "€ 1,234.50" into a number.
export const priceOf = (text: string) => Number(text.replace(/[^0-9.]/g, ''));

export class Header {
  constructor(private readonly page: Page) {}
  get cartIcon() {
    return byField(this.page, CypressFields.CartIcon);
  }
  get cartItemCount() {
    return byField(this.page, CypressFields.CartItemCount);
  }
  get cartDropdown() {
    return byField(this.page, CypressFields.CartDropdown);
  }
  get dropdownSubtotal() {
    return this.cartDropdown
      .locator('div')
      .filter({ has: this.page.getByText('Subtotal', { exact: true }) })
      .last();
  }
  get goToShoppingCart() {
    return byField(this.page, CypressFields.CartGoToShopping);
  }
}

export class HomePage {
  constructor(private readonly page: Page) {}
  get hotProductsHeading() {
    return byField(this.page, CypressFields.HotProducts);
  }
  get productCards() {
    return byField(byField(this.page, CypressFields.ProductList), CypressFields.ProductCard);
  }
  get ad() {
    return byField(this.page, CypressFields.Ad);
  }
  get footer() {
    return this.page.locator('footer');
  }
  categoryFilter = (name: string) => this.page.getByRole('button', { name, exact: true });
  productCard = (name: string) => this.productCards.filter({ hasText: name });
  open = () => this.page.goto('/');
  openProduct = async (name: string) => {
    await this.open();
    await this.productCard(name).click();
    await this.page.waitForURL(/\/product\//);
  };
}

export class ProductPage {
  constructor(private readonly page: Page) {}
  get description() {
    return byField(this.page, CypressFields.ProductDescription);
  }
  get categoryTags() {
    return this.page.locator(`[data-cy="${CypressFields.ProductDescription}"] + div > *`);
  }
  get quantity() {
    return byField(this.page, CypressFields.ProductQuantity);
  }
  get addToCart() {
    return byField(this.page, CypressFields.ProductAddToCart);
  }
  get error() {
    return this.page.locator(`[data-cy="${CypressFields.ProductDetail}"] [role="alert"]`);
  }
  get recommendations() {
    return byField(this.page, CypressFields.RecommendationList);
  }
  get recommendationsHeading() {
    return this.recommendations.getByRole('heading');
  }
  get recommendationCards() {
    return byField(this.recommendations, CypressFields.ProductCard);
  }
  add = async (quantity: number) => {
    await this.quantity.selectOption(String(quantity));
    await this.addToCart.click();
  };
}

export class CartPage {
  constructor(private readonly page: Page) {}
  get heading() {
    return this.page.getByRole('heading', { level: 1, name: /^Shopping Cart/ });
  }
  get emptyCart() {
    return this.page.getByRole('button', { name: 'Empty Cart' });
  }
  get removeLinks() {
    return this.page.getByRole('button', { name: 'Remove' });
  }
  get error() {
    return this.page.locator('main [role="alert"]');
  }
  get placeOrder() {
    return byField(this.page, CypressFields.CheckoutPlaceOrder);
  }
  get email() {
    return this.page.locator('#email');
  }
  get zipCode() {
    return this.page.locator('#zip_code');
  }
  get country() {
    return this.page.locator('#country');
  }
  get cardNumber() {
    return this.page.locator('#credit_card_number');
  }
  get expirationMonth() {
    return this.page.locator('#credit_card_expiration_month');
  }
  get cvv() {
    return this.page.locator('#credit_card_cvv');
  }
  get recommendations() {
    return byField(this.page, CypressFields.RecommendationList);
  }
  get recommendationsHeading() {
    return this.recommendations.getByRole('heading');
  }
  get recommendationCards() {
    return byField(this.recommendations, CypressFields.ProductCard);
  }
  // A totals row is the row whose first span is the label, e.g. "Shipping"; its value is the last span.
  totalsRow = (label: string) =>
    this.page.locator('main div').filter({ has: this.page.locator(`> span:text-is("${label}")`) });
  rowAfter = (label: string) => this.totalsRow(label).locator('xpath=following-sibling::*[1]');
  cartRow = (productName: string) =>
    this.page
      .locator('main div')
      .filter({ has: this.page.getByRole('link', { name: productName }) })
      .filter({ has: this.page.getByRole('button', { name: 'Remove' }) })
      .last();
}

export class ConfirmationPage {
  constructor(private readonly page: Page) {}
  get confirmationText() {
    return this.page.getByText(/^Confirmation sent to /);
  }
  get ad() {
    return byField(this.page, CypressFields.Ad);
  }
}
