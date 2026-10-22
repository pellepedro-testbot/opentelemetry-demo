// Skyramp Testbot test package: Testbot owns and maintains everything in this folder.
import { APIRequestContext, expect, test } from '@playwright/test';
import { uniqueUser } from '../../demo-grpc';
import { STARSENSE, sortedByName, usAddressJson } from '../../storefront-data';

const nextYear = new Date().getFullYear() + 1;

const checkoutBody = (userId: string, overrides: Record<string, unknown> = {}) => ({
  userId,
  email: 'someone@example.com',
  address: usAddressJson,
  userCurrency: 'USD',
  creditCard: {
    creditCardNumber: '4432-8015-6152-0454',
    creditCardCvv: 672,
    creditCardExpirationYear: nextYear,
    creditCardExpirationMonth: 1,
  },
  ...overrides,
});

const addToCart = async (request: APIRequestContext, userId: string, productId = 'OLJCESPC7Z', quantity = 1) => {
  const res = await request.post('/api/cart?currencyCode=USD', { data: { userId, item: { productId, quantity } } });
  expect(res.status()).toBe(200);
};

const cartItems = async (request: APIRequestContext, userId: string) => {
  const res = await request.get(`/api/cart?sessionId=${userId}&currencyCode=USD`);
  expect(res.status()).toBe(200);
  return (await res.json()).items as { productId: string; quantity: number }[];
};

const checkout = (request: APIRequestContext, body: object) =>
  request.post('/api/checkout?currencyCode=USD', { data: body });

const shippingQuery = (itemList: object[], address: object, currencyCode: string) =>
  `/api/shipping?itemList=${encodeURIComponent(JSON.stringify(itemList))}&currencyCode=${currencyCode}&address=${encodeURIComponent(JSON.stringify(address))}`;

test.describe('storefront /api/checkout', () => {
  test('Pasted text AC3: POST /api/checkout with userId ""', async ({ request }) => {
    const res = await checkout(request, checkoutBody(''));
    expect(res.status()).toBeGreaterThanOrEqual(400);
    expect(await res.json()).not.toHaveProperty('orderId');
  });

  test('Pasted text AC7: POST /api/checkout with zipCode "1234"', async ({ request }) => {
    const userId = uniqueUser('api-bad-zip');
    await addToCart(request, userId);
    const res = await checkout(request, checkoutBody(userId, { address: { ...usAddressJson, zipCode: '1234' } }));
    expect(res.status()).toBe(400);
    expect((await res.json()).error).toBe('Invalid zip code');
  });

  test('Pasted text AC7: POST /api/checkout with zipCode "1234" then "94043"', async ({ request }) => {
    const userId = uniqueUser('api-zip-retry');
    await addToCart(request, userId);
    const bad = await checkout(request, checkoutBody(userId, { address: { ...usAddressJson, zipCode: '1234' } }));
    expect(bad.status()).toBe(400);
    expect((await bad.json()).error).toBe('Invalid zip code');
    expect(await cartItems(request, userId)).toHaveLength(1);

    const good = await checkout(request, checkoutBody(userId));
    expect(good.status()).toBe(200);
    expect((await good.json()).orderId).toBeTruthy();
  });

  test('Pasted text AC10: POST /api/checkout with card 4000-0000-0000-0002', async ({ request }) => {
    const userId = uniqueUser('api-declined');
    await addToCart(request, userId);
    const body = checkoutBody(userId);
    const res = await checkout(request, { ...body, creditCard: { ...body.creditCard, creditCardNumber: '4000-0000-0000-0002' } });
    expect(res.status()).toBe(422);
    const json = await res.json();
    expect(json.error).toBe('Your card was declined.');
    expect(json).not.toHaveProperty('orderId');
  });

  test('R27: POST /api/checkout with a two-product cart', async ({ request }) => {
    const userId = uniqueUser('api-order');
    await addToCart(request, userId, 'OLJCESPC7Z');
    await addToCart(request, userId, STARSENSE.id);
    const res = await checkout(request, checkoutBody(userId));
    expect(res.status()).toBe(200);
    const order = await res.json();
    expect(order.orderId).toBeTruthy();
    expect(order.shippingTrackingId).toBeTruthy();
    expect(order.shippingCost).toBeTruthy();
    expect(order.items).toHaveLength(2);
    expect(await cartItems(request, userId)).toEqual([]);
  });
});

test.describe('storefront /api/shipping', () => {
  const itemList = [{ productId: 'OLJCESPC7Z', quantity: 1 }];

  test('Pasted text AC4: GET /api/shipping for United States and Germany', async ({ request }) => {
    const us = await request.get(shippingQuery(itemList, usAddressJson, 'USD'));
    expect(us.status()).toBe(200);
    const usBody = await us.json();
    expect(usBody.carrier).toBe('USPS');
    expect(usBody.currencyCode).toBe('USD');

    const de = await request.get(shippingQuery(itemList, { ...usAddressJson, country: 'Germany', zipCode: '10115' }, 'EUR'));
    expect(de.status()).toBe(200);
    const deBody = await de.json();
    expect(deBody.carrier).toBe('DHL');
    expect(deBody.currencyCode).toBe('EUR');
  });

  test('R30: GET /api/shipping with itemList []', async ({ request }) => {
    const res = await request.get(
      '/api/shipping?itemList=%5B%5D&currencyCode=USD&address=%7B%22streetAddress%22%3A%22a%22%2C%22city%22%3A%22b%22%2C%22state%22%3A%22CA%22%2C%22country%22%3A%22United%20States%22%2C%22zipCode%22%3A%2294043%22%7D'
    );
    expect(res.status()).toBeLessThan(500);
  });
});

test.describe('storefront catalogue, ads and recommendations', () => {
  test('Pasted text AC5: GET /api/products order', async ({ request }) => {
    const res = await request.get('/api/products?currencyCode=USD');
    expect(res.status()).toBe(200);
    const names = (await res.json()).map((p: { name: string }) => p.name);
    expect(names).toEqual(sortedByName(names));
  });

  test('Pasted text AC14: GET /api/products badge', async ({ request }) => {
    const products = await (await request.get('/api/products?currencyCode=USD')).json();
    for (const p of products) {
      expect(p.badge ?? '', p.id).toBe(p.id === STARSENSE.id ? 'Bestseller' : '');
    }
  });

  test('Pasted text AC13: GET /api/data?contextKeys=telescopes,telescopes', async ({ request }) => {
    const res = await request.get('/api/data?contextKeys=telescopes,telescopes');
    expect(res.status()).toBe(200);
    const ads = await res.json();
    expect(ads).toHaveLength(1);
    expect(ads[0].redirectUrl).toBe(`/product/${STARSENSE.id}`);
  });

  test('Pasted text AC24: GET /api/data?contextKeys=home', async ({ request }) => {
    const ads = await (await request.get('/api/data?contextKeys=home')).json();
    expect(ads).toHaveLength(1);
    expect(ads[0].redirectUrl).toBe(`/product/${STARSENSE.id}`);
    expect(ads[0].text).toContain('Starsense Explorer');
  });

  test('Pasted text AC20: GET /api/recommendations with productIds=', async ({ request }) => {
    const res = await request.get('/api/recommendations?productIds=&sessionId=u&currencyCode=USD');
    expect(res.status()).toBe(200);
    const products = await res.json();
    expect(products.length).toBeGreaterThan(0);
    for (const p of products) expect(p.categories, p.id).toContain('accessories');
  });
});
