// Contract checks against the cart, checkout, payment and product-catalog gRPC services.
import { expect, test } from '@playwright/test';
import { cartService, checkoutService, paymentService, productCatalogService, Status } from '../support/grpc-clients';
import {
  CARD_DECLINED_MESSAGE,
  INVALID_ZIP_MESSAGE,
  NEXT_YEAR,
  PRODUCT_IDS,
  PRODUCT_NAMES_A_TO_Z,
  VALID_CARD_NUMBER,
  uniqueUserId,
} from '../support/checkout-data';

const placeOrderRequest = (userId: string, { country = 'United States', zipCode = '94043' } = {}) => ({
  user_id: userId,
  user_currency: 'USD',
  email: 'a@b.com',
  address: {
    street_address: '1600 Amphitheatre Parkway',
    city: 'Mountain View',
    state: 'CA',
    country,
    zip_code: zipCode,
  },
  credit_card: {
    credit_card_number: VALID_CARD_NUMBER,
    credit_card_cvv: 672,
    credit_card_expiration_year: NEXT_YEAR,
    credit_card_expiration_month: 1,
  },
});

const addOneItem = async (userId: string) => {
  const { error } = await cartService('AddItem', {
    user_id: userId,
    item: { product_id: PRODUCT_IDS.explorascope, quantity: 1 },
  });
  expect(error, 'AddItem for a non-empty user_id').toBeUndefined();
};

const chargeRequest = (cardNumber: string) => ({
  amount: { currency_code: 'USD', units: 10, nanos: 0 },
  credit_card: {
    credit_card_number: cardNumber,
    credit_card_cvv: 123,
    credit_card_expiration_year: NEXT_YEAR,
    credit_card_expiration_month: 12,
  },
});

test.describe('CartService AddItem', () => {
  test('AC1: AddItem with an empty user_id is rejected with INVALID_ARGUMENT and stores nothing', async () => {
    const { error } = await cartService('AddItem', {
      user_id: '',
      item: { product_id: PRODUCT_IDS.explorascope, quantity: 1 },
    });
    expect(error?.code).toBe(Status.INVALID_ARGUMENT);

    const cart = await cartService<{ items: unknown[] }>('GetCart', { user_id: '' });
    expect(cart.error).toBeUndefined();
    expect(cart.response?.items).toEqual([]);
  });
});

test.describe('CheckoutService PlaceOrder', () => {
  test('AC3: PlaceOrder with an empty user_id and an otherwise valid request is rejected with INVALID_ARGUMENT', async () => {
    const { error, response } = await checkoutService('PlaceOrder', placeOrderRequest(''));
    expect(response).toBeUndefined();
    expect(error?.code).toBe(Status.INVALID_ARGUMENT);
  });

  test('AC3: PlaceOrder with an empty user_id and a bad US zip is rejected with INVALID_ARGUMENT', async () => {
    const { error } = await checkoutService('PlaceOrder', placeOrderRequest('', { zipCode: 'abc' }));
    expect(error?.code).toBe(Status.INVALID_ARGUMENT);
  });

  for (const zipCode of ['1234', '123456', 'abcde', '12345-6789', '', '1234 ']) {
    test(`AC7: PlaceOrder rejects US zip code ${JSON.stringify(zipCode)} and keeps the cart`, async () => {
      const userId = uniqueUserId('grpc-zip');
      await addOneItem(userId);

      const { error, response } = await checkoutService('PlaceOrder', placeOrderRequest(userId, { zipCode }));
      expect(response).toBeUndefined();
      expect(error?.code).toBe(Status.INVALID_ARGUMENT);
      expect(error?.details).toBe(INVALID_ZIP_MESSAGE);

      const cart = await cartService<{ items: { product_id: string }[] }>('GetCart', { user_id: userId });
      expect(cart.response?.items.map(i => i.product_id)).toEqual([PRODUCT_IDS.explorascope]);
    });
  }

  for (const zipCode of ['94043', '01234']) {
    test(`AC7: PlaceOrder accepts the 5-digit US zip code ${zipCode}`, async () => {
      const userId = uniqueUserId('grpc-zip-ok');
      await addOneItem(userId);

      const { error, response } = await checkoutService<{ order: { order_id: string } }>(
        'PlaceOrder',
        placeOrderRequest(userId, { zipCode })
      );
      expect(error).toBeUndefined();
      expect(response?.order.order_id).toBeTruthy();
    });
  }

  test('AC7: PlaceOrder does not apply the 5-digit rule to a non-US address', async () => {
    const userId = uniqueUserId('grpc-zip-de');
    await addOneItem(userId);

    const { error, response } = await checkoutService<{ order: { order_id: string } }>(
      'PlaceOrder',
      placeOrderRequest(userId, { country: 'Germany', zipCode: '1234' })
    );
    expect(error).toBeUndefined();
    expect(response?.order.order_id).toBeTruthy();
  });
});

test.describe('PaymentService Charge', () => {
  for (const cardNumber of ['4000-0000-0000-0002', '4000000000000002']) {
    test(`AC10: Charge declines card ${cardNumber}`, async () => {
      const { error, response } = await paymentService('Charge', chargeRequest(cardNumber));
      expect(response).toBeUndefined();
      expect(error?.details).toBe(CARD_DECLINED_MESSAGE);
    });
  }
});

test.describe('ProductCatalogService ListProducts', () => {
  test('AC5: ListProducts returns the products sorted by name', async () => {
    const { error, response } = await productCatalogService<{ products: { name: string }[] }>('ListProducts', {});
    expect(error).toBeUndefined();
    expect(response?.products.map(p => p.name)).toEqual(PRODUCT_NAMES_A_TO_Z);
  });
});
