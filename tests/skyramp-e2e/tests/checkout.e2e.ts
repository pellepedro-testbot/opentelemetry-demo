import { test, expect } from '@playwright/test';
import { randomUUID } from 'node:crypto';
import { clients, rpc, rpcError, status } from '../support/grpcClients';

const cart = clients.cart();
const checkout = clients.checkout();

const address = {
  street_address: '1600 Amphitheatre Parkway',
  city: 'Mountain View',
  state: 'CA',
  country: 'United States',
  zip_code: '94043',
};
const creditCard = {
  credit_card_number: '4432-8015-6152-0454',
  credit_card_cvv: 672,
  credit_card_expiration_year: 2030,
  credit_card_expiration_month: 1,
};

// Seeds the user's cart with OLJCESPC7Z x1 and returns the PlaceOrderRequest the plan sends, with overrides applied.
const orderFor = async (overrides: Record<string, unknown> = {}) => {
  const userId = randomUUID();
  await rpc(cart, 'AddItem', { user_id: userId, item: { product_id: 'OLJCESPC7Z', quantity: 1 } });
  return {
    userId,
    request: {
      user_id: userId,
      user_currency: 'USD',
      email: 'someone@example.com',
      address,
      credit_card: creditCard,
      ...overrides,
    },
  };
};

test.describe('CheckoutService PlaceOrder validation', () => {
  test('rejects an empty user_id with INVALID_ARGUMENT (AC3)', async () => {
    const { request } = await orderFor({ user_id: '' });
    const error = await rpcError(checkout, 'PlaceOrder', request);
    expect(error?.code).toBe(status.INVALID_ARGUMENT);
  });

  for (const zip of ['1234', '123456', '12a45', '']) {
    test(`rejects United States zip code "${zip}" with "Invalid zip code" (AC7)`, async () => {
      const { request } = await orderFor({ address: { ...address, zip_code: zip } });
      const error = await rpcError(checkout, 'PlaceOrder', request);
      expect(error?.code).toBe(status.INVALID_ARGUMENT);
      expect(error?.details).toBe('Invalid zip code');
    });
  }

  test('places an order for a United States 5-digit zip code (AC7, AC23)', async () => {
    const { request } = await orderFor();
    const response = await rpc(checkout, 'PlaceOrder', request);
    expect(response.order.order_id).not.toBe('');
  });

  test('does not apply the zip rule outside the United States (AC7)', async () => {
    const { request } = await orderFor({ address: { ...address, country: 'Canada', zip_code: 'K1A 0B1' } });
    const response = await rpc(checkout, 'PlaceOrder', request);
    expect(response.order.order_id).not.toBe('');
  });

  for (const email of ['someone.example.com', '']) {
    test(`rejects email "${email}" without "@" with INVALID_ARGUMENT (AC23)`, async () => {
      const { request } = await orderFor({ email });
      const error = await rpcError(checkout, 'PlaceOrder', request);
      expect(error?.code).toBe(status.INVALID_ARGUMENT);
    });
  }

  for (const [country, zip] of [
    ['France', '75001'],
    ['united states', '94043'],
  ]) {
    test(`rejects country "${country}" with "We do not ship to" (AC30)`, async () => {
      const { request } = await orderFor({ address: { ...address, country, zip_code: zip } });
      const error = await rpcError(checkout, 'PlaceOrder', request);
      expect(error?.code).toBe(status.INVALID_ARGUMENT);
      expect(error?.details).toBe(`We do not ship to ${country}`);
    });
  }

  test('rejects an empty country with INVALID_ARGUMENT (AC30)', async () => {
    const { request } = await orderFor({ address: { ...address, country: '' } });
    const error = await rpcError(checkout, 'PlaceOrder', request);
    expect(error?.code).toBe(status.INVALID_ARGUMENT);
  });

  for (const country of ['USA', 'Canada']) {
    test(`places an order for country "${country}" (AC30)`, async () => {
      const { request } = await orderFor({ address: { ...address, country } });
      const response = await rpc(checkout, 'PlaceOrder', request);
      expect(response.order.order_id).not.toBe('');
    });
  }

  test('a refused country leaves the cart untouched (AC30)', async () => {
    const { userId, request } = await orderFor({ address: { ...address, country: 'France', zip_code: '75001' } });
    const error = await rpcError(checkout, 'PlaceOrder', request);
    expect(error?.details).toBe('We do not ship to France');
    const { items } = await rpc(cart, 'GetCart', { user_id: userId });
    expect(items).toEqual([{ product_id: 'OLJCESPC7Z', quantity: 1 }]);
    await rpc(cart, 'EmptyCart', { user_id: userId });
  });

  test('rejects a missing credit_card with INVALID_ARGUMENT (AC43)', async () => {
    const { request } = await orderFor();
    const { credit_card: _omitted, ...withoutCard } = request;
    const error = await rpcError(checkout, 'PlaceOrder', withoutCard);
    expect(error?.code).toBe(status.INVALID_ARGUMENT);
  });
});
