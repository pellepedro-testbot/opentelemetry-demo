// Browser checks of the storefront pages the change touches.
import { expect, test } from '@playwright/test';
import { CartPage, CheckoutConfirmationPage, HomePage, ProductPage } from '../support/storefront-pages';
import {
  CARD_DECLINED_MESSAGE,
  DECLINED_CARD_NUMBER,
  INVALID_ZIP_MESSAGE,
  PRODUCT_IDS,
  PRODUCT_NAMES_A_TO_Z,
} from '../support/checkout-data';

test.describe('home page', () => {
  test('AC5: home page product card order', async ({ page }) => {
    const home = new HomePage(page);
    await home.open();
    await expect(home.productCards).toHaveCount(10);
    expect(await home.productNames()).toEqual(PRODUCT_NAMES_A_TO_Z);
  });

  test('AC6: header badge with no cart items', async ({ page }) => {
    const home = new HomePage(page);
    await home.open();
    await expect(home.header.cartItemCount).toHaveCount(0);
  });
});

test.describe('cart badge', () => {
  test('AC6: header badge after adding 3, 2 and 1 units', async ({ page }) => {
    const product = new ProductPage(page);

    await product.open(PRODUCT_IDS.opticalTube);
    await product.addToCart(3);
    await expect.soft(product.header.cartItemCount, 'one product, quantity 3').toHaveText('3');

    await product.open(PRODUCT_IDS.cometBook);
    await product.addToCart(2);
    await expect.soft(product.header.cartItemCount, 'second product, quantity 2').toHaveText('5');

    await product.open(PRODUCT_IDS.opticalTube);
    await product.addToCart(1);
    await expect(product.header.cartItemCount, 'one more of the first product').toHaveText('6');
  });
});

test.describe('product page categories', () => {
  test('AC9: Optical Tube Assembly product page tags', async ({ page }) => {
    const product = new ProductPage(page);
    await product.open(PRODUCT_IDS.opticalTube);

    await expect(product.categoryTags).toHaveText(['accessories', 'telescopes', 'assembly']);
    const description = (await product.description.boundingBox())!;
    const tags = (await product.categoryList.boundingBox())!;
    const price = (await product.price.boundingBox())!;
    expect(tags.y).toBeGreaterThanOrEqual(description.y + description.height);
    expect(price.y).toBeGreaterThanOrEqual(tags.y + tags.height);
  });

  test('AC9: The Comet Book product page tags', async ({ page }) => {
    const product = new ProductPage(page);
    await product.open(PRODUCT_IDS.cometBook);
    await expect(product.categoryTags).toHaveText(['books']);
  });

  test('AC9: tags on every product page match the product API', async ({ page, request }) => {
    const product = new ProductPage(page);
    const products = (await (await request.get('/api/products?currencyCode=USD')).json()) as { id: string }[];
    expect(products).toHaveLength(10);

    for (const { id } of products) {
      const { categories } = await (await request.get(`/api/products/${id}?currencyCode=USD`)).json();
      await product.open(id);
      await expect.soft(product.categoryTags, id).toHaveText(categories);
    }
  });
});

test.describe('cart page', () => {
  test.beforeEach(async ({ page }) => {
    const product = new ProductPage(page);
    await product.open(PRODUCT_IDS.explorascope);
    await product.addToCart(1);
  });

  test('AC4: cart summary rows for the default address', async ({ page }) => {
    const cart = new CartPage(page);
    await expect(cart.rowAfterShipping).toHaveText(/^Carrier\s*USPS$/);
    await expect(cart.rowAfterCarrier).toContainText('Total');
  });

  test('AC2: checkout form month options', async ({ page }) => {
    const cart = new CartPage(page);
    const options = cart.expirationMonth.locator('option');
    await expect(options).toHaveCount(12);
    await expect(options.nth(11)).toHaveAttribute('value', '12');
    await expect(options.nth(11)).toHaveText('December');
    await expect(options.filter({ hasText: /^January$/ })).toHaveCount(1);
    await expect(options.first()).toHaveText('January');
  });

  test('AC7: cart page with zip 1234, then 94043', async ({ page }) => {
    const cart = new CartPage(page);
    await expect(cart.country).toHaveValue('United States');
    await cart.zipCode.fill('1234');
    await cart.placeOrder();
    await expect(cart.alerts).toHaveText([INVALID_ZIP_MESSAGE]);
    await expect(page).toHaveURL(/\/cart$/);

    await cart.zipCode.fill('94043');
    await cart.placeOrder();
    await expect(page).toHaveURL(/\/cart\/checkout\/[^/]+/);
    await expect(new CheckoutConfirmationPage(page).items).toHaveCount(1);
    await expect(page.getByText(INVALID_ZIP_MESSAGE)).toHaveCount(0);
  });

  test('AC10: cart page with card 4000-0000-0000-0002', async ({ page }) => {
    const cart = new CartPage(page);
    await cart.cardNumber.fill(DECLINED_CARD_NUMBER);
    await cart.placeOrder();
    await expect(cart.alerts).toHaveText([CARD_DECLINED_MESSAGE]);
    await expect(page).toHaveURL(/\/cart$/);
  });
});
