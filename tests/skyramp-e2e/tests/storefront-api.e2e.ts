// Contract checks against the storefront's Next.js API routes (/api/*).
import { APIRequestContext, expect, test } from '@playwright/test';
import {
  CARD_DECLINED_MESSAGE,
  DECLINED_CARD_NUMBER,
  INVALID_ZIP_MESSAGE,
  PRODUCT_IDS,
  PRODUCT_NAMES_A_TO_Z,
  storefrontOrder,
  uniqueUserId,
  usAddress,
} from '../support/checkout-data';

const addToCart = async (request: APIRequestContext, userId: string, productId: string, quantity = 1) => {
  const res = await request.post('/api/cart?currencyCode=USD', { data: { userId, item: { productId, quantity } } });
  expect(res.status(), `POST /api/cart ${productId}`).toBe(200);
};

const getCart = async (request: APIRequestContext, userId: string) => {
  const res = await request.get(`/api/cart?sessionId=${userId}&currencyCode=USD`);
  expect(res.status()).toBe(200);
  return (await res.json()) as { items: { productId: string; quantity: number }[] };
};

const shippingUrl = (itemList: object[], currencyCode: string, address: object) =>
  `/api/shipping?itemList=${encodeURIComponent(JSON.stringify(itemList))}&currencyCode=${currencyCode}&address=${encodeURIComponent(JSON.stringify(address))}`;

const checkout = (request: APIRequestContext, body: object) => request.post('/api/checkout?currencyCode=USD', { data: body });

test.describe('GET /api/shipping', () => {
  test('AC4: passes the carrier through alongside the converted cost', async ({ request }) => {
    const items = [{ productId: PRODUCT_IDS.explorascope, quantity: 1 }];

    const us = await request.get(shippingUrl(items, 'USD', usAddress()));
    expect(us.status()).toBe(200);
    const usBody = await us.json();
    expect(usBody).toMatchObject({ carrier: 'USPS', currencyCode: 'USD' });
    expect(usBody).toHaveProperty('units');
    expect(usBody).toHaveProperty('nanos');

    const de = await request.get(shippingUrl(items, 'EUR', { ...usAddress(), country: 'Germany' }));
    expect(de.status()).toBe(200);
    expect(await de.json()).toMatchObject({ carrier: 'DHL', currencyCode: 'EUR' });
  });

  test('R14: an empty item list is answered with a client error, not a server error', async ({ request }) => {
    const res = await request.get(shippingUrl([], 'USD', usAddress()));
    expect(res.status()).toBeGreaterThanOrEqual(400);
    expect(res.status()).toBeLessThan(500);
  });
});

test.describe('GET /api/products', () => {
  test('AC5: lists all products sorted by name', async ({ request }) => {
    const res = await request.get('/api/products?currencyCode=USD');
    expect(res.status()).toBe(200);
    const names = ((await res.json()) as { name: string }[]).map(p => p.name);
    expect(names).toEqual(PRODUCT_NAMES_A_TO_Z);
  });
});

test.describe('POST /api/cart', () => {
  test('R11: an empty userId is answered with a client error, not a server error', async ({ request }) => {
    const res = await request.post('/api/cart?currencyCode=USD', {
      data: { userId: '', item: { productId: PRODUCT_IDS.explorascope, quantity: 1 } },
    });
    expect(res.status()).toBeGreaterThanOrEqual(400);
    expect(res.status()).toBeLessThan(500);
  });
});

test.describe('POST /api/checkout', () => {
  test('R12: a valid US order is placed with shipping cost and both items, and the cart is emptied', async ({ request }) => {
    const userId = uniqueUserId('order');
    await addToCart(request, userId, PRODUCT_IDS.explorascope);
    await addToCart(request, userId, PRODUCT_IDS.cometBook);

    const res = await checkout(request, storefrontOrder(userId));
    expect(res.status()).toBe(200);
    const order = await res.json();
    expect(order.orderId).toBeTruthy();
    expect(order.shippingTrackingId).toBeTruthy();
    expect(order.items).toHaveLength(2);
    for (const item of order.items) expect(item.item.product).toBeTruthy();
    expect((await getCart(request, userId)).items).toEqual([]);
  });

  test('AC7: a US zip that is not 5 digits is answered with 400 Invalid zip code', async ({ request }) => {
    const userId = uniqueUserId('zip');
    await addToCart(request, userId, PRODUCT_IDS.explorascope);

    const res = await checkout(request, storefrontOrder(userId, { zipCode: '1234' }));
    expect(res.status()).toBe(400);
    expect(await res.json()).toEqual({ error: INVALID_ZIP_MESSAGE });
  });

  test('AC10: the decline card is answered with 422 and the decline message, and the cart is kept', async ({ request }) => {
    const userId = uniqueUserId('decline');
    await addToCart(request, userId, PRODUCT_IDS.explorascope);

    const res = await checkout(request, storefrontOrder(userId, { cardNumber: DECLINED_CARD_NUMBER }));
    expect(res.status()).toBe(422);
    expect(await res.json()).toEqual({ error: CARD_DECLINED_MESSAGE, code: 'PAYMENT_FAILED' });
    expect((await getCart(request, userId)).items.map(i => i.productId)).toEqual([PRODUCT_IDS.explorascope]);
  });

  test('R12: an empty userId is answered with a client error, not a server error', async ({ request }) => {
    const res = await checkout(request, storefrontOrder(''));
    expect(res.status()).toBeGreaterThanOrEqual(400);
    expect(res.status()).toBeLessThan(500);
    expect((await res.json()).orderId).toBeUndefined();
  });

  test('R13: a user with an empty cart gets a client error and no order', async ({ request }) => {
    const res = await checkout(request, storefrontOrder(uniqueUserId('empty-cart')));
    expect(res.status()).toBeGreaterThanOrEqual(400);
    expect(res.status()).toBeLessThan(500);
    expect((await res.json()).orderId).toBeUndefined();

    expect((await request.get('/api/products?currencyCode=USD')).status()).toBe(200);
  });
});
