import { test, expect, APIRequestContext } from '@playwright/test';
import { randomUUID } from 'node:crypto';
import { frontendUrl } from '../support/serviceAddresses';

const api = `${frontendUrl}/api`;
const usAddress = JSON.stringify({
  streetAddress: '1600 Amphitheatre Parkway',
  city: 'Mountain View',
  state: 'CA',
  country: 'United States',
  zipCode: '94043',
});
const shippingQuery = (itemList: object[] | null) => {
  const params = new URLSearchParams({ currencyCode: 'USD', address: usAddress });
  if (itemList) params.set('itemList', JSON.stringify(itemList));
  return `${api}/shipping?${params}`;
};
const checkoutBody = (userId: string, email = 'someone@example.com') => ({
  userId,
  email,
  userCurrency: 'USD',
  address: JSON.parse(usAddress),
  creditCard: {
    creditCardNumber: '4432-8015-6152-0454',
    creditCardCvv: 672,
    creditCardExpirationYear: 2030,
    creditCardExpirationMonth: 1,
  },
});
const addToCart = (request: APIRequestContext, userId: string, productId: string, quantity: number) =>
  request.post(`${api}/cart?currencyCode=USD`, { data: { userId, item: { productId, quantity } } });
const cartItemIds = async (request: APIRequestContext, userId: string) =>
  (
    (await (await request.get(`${api}/cart?sessionId=${userId}&currencyCode=USD`)).json()).items as {
      productId: string;
    }[]
  ).map(i => i.productId);

test.describe('storefront /api/products', () => {
  test('lists the catalog sorted by name (AC5)', async ({ request }) => {
    const response = await request.get(`${api}/products?currencyCode=USD`);
    expect(response.status()).toBe(200);
    const names = (await response.json()).map((p: { name: string }) => p.name);
    expect(names).toEqual([...names].sort((a: string, b: string) => a.localeCompare(b)));
  });

  test('exposes the "Bestseller" badge of 66VCHSJNUP (AC14)', async ({ request }) => {
    const products = await (await request.get(`${api}/products?currencyCode=USD`)).json();
    expect(products.find((p: { id: string }) => p.id === '66VCHSJNUP').badge).toBe('Bestseller');
  });

  test('category=flashlights returns only the Red Flashlight (AC37)', async ({ request }) => {
    const response = await request.get(`${api}/products?category=flashlights&currencyCode=USD`);
    expect(response.status()).toBe(200);
    expect((await response.json()).map((p: { name: string }) => p.name)).toEqual(['Red Flashlight']);
  });

  test('category=telescopes returns the 6 telescopes products (AC37)', async ({ request }) => {
    const products = await (await request.get(`${api}/products?category=telescopes&currencyCode=USD`)).json();
    expect(products.map((p: { id: string }) => p.id).sort()).toEqual(
      ['0PUK6V6EV0', '1YMWWN1N4O', '66VCHSJNUP', '6E92ZMYYFZ', '9SIQT8TOJO', 'OLJCESPC7Z'].sort()
    );
  });
});

test.describe('storefront /api/shipping', () => {
  test('passes the carrier through with the converted cost (AC4)', async ({ request }) => {
    const response = await request.get(shippingQuery([{ productId: 'OLJCESPC7Z', quantity: 1 }]));
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.carrier).toBe('USPS');
    expect(body).toHaveProperty('units');
    expect(body).toHaveProperty('nanos');
  });

  test('answers 400 without itemList (AC49)', async ({ request }) => {
    expect((await request.get(shippingQuery(null))).status()).toBe(400);
  });

  test('answers an empty itemList with a client error, not 500 (R5)', async ({ request }) => {
    const statusCode = (await request.get(shippingQuery([]))).status();
    expect(statusCode).toBeGreaterThanOrEqual(400);
    expect(statusCode).toBeLessThan(500);
  });

  test('answers an item with quantity 0 with a client error, not 500 (R5)', async ({ request }) => {
    const statusCode = (await request.get(shippingQuery([{ productId: 'OLJCESPC7Z', quantity: 0 }]))).status();
    expect(statusCode).toBeGreaterThanOrEqual(400);
    expect(statusCode).toBeLessThan(500);
  });

  test('POST answers 405 promptly (AC46)', async ({ request }) => {
    expect((await request.post(`${api}/shipping`, { data: {}, timeout: 5000 })).status()).toBe(405);
  });
});

test.describe('storefront /api/cart', () => {
  test('GET answers 400 without a sessionId (AC36)', async ({ request }) => {
    expect((await request.get(`${api}/cart?currencyCode=USD`)).status()).toBe(400);
  });

  test('GET answers 400 with an empty sessionId (AC36)', async ({ request }) => {
    expect((await request.get(`${api}/cart?sessionId=&currencyCode=USD`)).status()).toBe(400);
  });

  test('GET returns the cart for a sessionId (AC36)', async ({ request }) => {
    const response = await request.get(`${api}/cart?sessionId=${randomUUID()}&currencyCode=USD`);
    expect(response.status()).toBe(200);
    expect(Array.isArray((await response.json()).items)).toBe(true);
  });

  test('PUT answers 405 promptly (AC39)', async ({ request }) => {
    expect((await request.put(`${api}/cart`, { data: {}, timeout: 5000 })).status()).toBe(405);
  });

  test('POST beyond 10 units answers 400 "Maximum 10 per product" (AC40)', async ({ request }) => {
    const response = await addToCart(request, randomUUID(), 'L9ECAV7KIM', 11);
    expect(response.status()).toBe(400);
    expect(await response.json()).toEqual({ error: 'Maximum 10 per product' });
  });

  test('POST with quantity 0 answers a client error, not 500, and leaves the cart empty (R8)', async ({ request }) => {
    const userId = randomUUID();
    const statusCode = (await addToCart(request, userId, 'L9ECAV7KIM', 0)).status();
    expect(statusCode).toBeGreaterThanOrEqual(400);
    expect(statusCode).toBeLessThan(500);
    expect(await cartItemIds(request, userId)).toEqual([]);
  });
});

test.describe('storefront /api/currency', () => {
  test('GET lists codes sorted alphabetically (AC18)', async ({ request }) => {
    const response = await request.get(`${api}/currency`);
    expect(response.status()).toBe(200);
    const codes = await response.json();
    expect(codes).toEqual([...codes].sort());
  });

  test('POST answers 405 promptly (AC42)', async ({ request }) => {
    expect((await request.post(`${api}/currency`, { data: {}, timeout: 5000 })).status()).toBe(405);
  });
});

test.describe('storefront /api/data and /api/recommendations', () => {
  test('a repeated context key returns no duplicate ads (AC13)', async ({ request }) => {
    const response = await request.get(`${api}/data?contextKeys=telescopes&contextKeys=telescopes`);
    expect(response.status()).toBe(200);
    const texts = (await response.json()).map((a: { text: string }) => a.text);
    expect(new Set(texts).size).toBe(texts.length);
  });

  test('no productIds recommends only accessories (AC20)', async ({ request }) => {
    const response = await request.get(`${api}/recommendations?productIds=&currencyCode=USD`);
    expect(response.status()).toBe(200);
    const products = await response.json();
    expect(products.length).toBeGreaterThan(0);
    expect(products.filter((p: { categories: string[] }) => !p.categories.includes('accessories'))).toEqual([]);
  });

  test('repeated productIds recommend only products cheaper than all of them (AC44)', async ({ request }) => {
    const response = await request.get(
      `${api}/recommendations?productIds=1YMWWN1N4O&productIds=LS4PSXUNUM&currencyCode=USD`
    );
    expect(response.status()).toBe(200);
    const prices = (await response.json()).map(
      (p: { priceUsd: { units: number; nanos: number } }) => p.priceUsd.units + p.priceUsd.nanos / 1e9
    );
    expect(prices.filter((price: number) => !(price < 57.08))).toEqual([]);
  });
});

test.describe('storefront /api/checkout', () => {
  test('answers an email without "@" with a client error, not 500, and keeps the cart (R9)', async ({ request }) => {
    const userId = randomUUID();
    await addToCart(request, userId, 'OLJCESPC7Z', 1);
    const statusCode = (
      await request.post(`${api}/checkout?currencyCode=USD`, { data: checkoutBody(userId, 'nope') })
    ).status();
    expect(statusCode).toBeGreaterThanOrEqual(400);
    expect(statusCode).toBeLessThan(500);
    expect(await cartItemIds(request, userId)).toEqual(['OLJCESPC7Z']);
  });
});
