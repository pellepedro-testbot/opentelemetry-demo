// Cart: removing a line, the per-line quantity cap, and the cart count returned
// with GetCart.
import { APIRequestContext, expect, test } from '@playwright/test';
import { call, unary } from '../grpc-clients';
import { spanWithTag, waitForServiceSpans } from '../jaeger';
import { PROXY_URL, docker, newTraceId, traceparent, uniqueId } from '../stack';

interface CartLine {
  productId: string;
  quantity: number;
}

async function addToCart(request: APIRequestContext, userId: string, productId: string, quantity: number) {
  const res = await request.post(`${PROXY_URL}/api/cart`, { data: { userId, item: { productId, quantity } } });
  expect(res.status(), `add ${quantity} of ${productId}`).toBe(200);
}

async function cartLines(request: APIRequestContext, userId: string): Promise<CartLine[]> {
  const res = await request.get(`${PROXY_URL}/api/cart?sessionId=${userId}&currencyCode=USD`);
  expect(res.status()).toBe(200);
  return (await res.json()).items.map(({ productId, quantity }: CartLine) => ({ productId, quantity }));
}

test.describe('removing a cart line', () => {
  test('sending minus the line quantity drops the line', async ({ request }) => {
    const user = uniqueId('cart');
    await addToCart(request, user, 'OLJCESPC7Z', 3);
    await addToCart(request, user, 'OLJCESPC7Z', -3);
    expect(await cartLines(request, user)).toEqual([]);
  });
});

test.describe('quantity cap of a cart line', () => {
  test('adding to an existing line never takes it above 10', async ({ request }) => {
    const user = uniqueId('cart');
    await addToCart(request, user, 'OLJCESPC7Z', 6);
    await addToCart(request, user, 'OLJCESPC7Z', 7);
    expect(await cartLines(request, user)).toEqual([{ productId: 'OLJCESPC7Z', quantity: 10 }]);
  });

  test('a new line asked for more than 10 holds 10', async ({ request }) => {
    const user = uniqueId('cart');
    await addToCart(request, user, 'OLJCESPC7Z', 25);
    expect(await cartLines(request, user)).toEqual([{ productId: 'OLJCESPC7Z', quantity: 10 }]);
  });

  test('adding below the cap still accumulates', async ({ request }) => {
    const user = uniqueId('cart');
    await addToCart(request, user, 'OLJCESPC7Z', 2);
    await addToCart(request, user, 'OLJCESPC7Z', 3);
    await addToCart(request, user, '66VCHSJNUP', 1);
    expect(await cartLines(request, user)).toEqual([
      { productId: 'OLJCESPC7Z', quantity: 5 },
      { productId: '66VCHSJNUP', quantity: 1 },
    ]);
  });

  test('a negative quantity for a product not in the cart stores no line', async () => {
    const user = uniqueId('cart');
    const add = await unary('CartService', 'AddItem', { user_id: user, item: { product_id: '66VCHSJNUP', quantity: -3 } });
    const cart = await call<{ items: { product_id: string; quantity: number }[] }>('CartService', 'GetCart', { user_id: user });
    if (!add.error) {
      expect(cart.items.filter(i => i.product_id === '66VCHSJNUP')).toEqual([]);
    }
    expect(cart.items.filter(i => i.quantity <= 0)).toEqual([]);
  });
});

test.describe('cart count for the header badge', () => {
  function cartKeysInStore(): number {
    const keys = docker(['exec', 'valkey-cart', 'valkey-cli', '--scan']).split('\n').filter(k => k.length > 0);
    return keys.filter(k => k !== 'cart').length;
  }

  async function cartCountHeader(user: string, metadata: Record<string, string> = {}): Promise<string | undefined> {
    const res = await unary('CartService', 'GetCart', { user_id: user }, metadata);
    expect(res.error).toBeUndefined();
    return res.headers.get('x-cart-count')[0]?.toString();
  }

  test('GetCart returns the number of carts in the store as x-cart-count', async () => {
    for (let i = 0; i < 3; i++) {
      await call('CartService', 'AddItem', { user_id: uniqueId('count'), item: { product_id: 'OLJCESPC7Z', quantity: 1 } });
    }
    const before = cartKeysInStore();
    expect(await cartCountHeader(uniqueId('reader'))).toBe(String(before));

    await call('CartService', 'AddItem', { user_id: uniqueId('count'), item: { product_id: 'OLJCESPC7Z', quantity: 1 } });
    expect(await cartCountHeader(uniqueId('reader'))).toBe(String(before + 1));
  });

  test('the GetCart span carries demo.cart.count equal to the header', async () => {
    const traceId = newTraceId();
    const header = await cartCountHeader(uniqueId('reader'), { traceparent: traceparent(traceId) });
    const spans = await waitForServiceSpans(traceId, 'cart', 30_000, s => !!spanWithTag(s, 'demo.cart.count'));
    expect(String(spanWithTag(spans, 'demo.cart.count')?.tags['demo.cart.count'])).toBe(header);
  });
});
