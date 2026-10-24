import { randomUUID } from 'node:crypto';
import { expect, test } from '@playwright/test';
import { STARSENSE_AD_TEXT } from '../support/catalog';

const usAddress = JSON.stringify({
  streetAddress: '1600 Amphitheatre Parkway',
  city: 'Mountain View',
  state: 'CA',
  country: 'United States',
  zipCode: '94043',
});
const itemList = JSON.stringify([{ productId: 'OLJCESPC7Z', quantity: 1 }]);

test.describe('storefront HTTP API', () => {
  test('Pasted text AC4, storefront route', async ({ request }) => {
    const response = await request.get('/api/shipping', {
      params: { itemList, currencyCode: 'USD', address: usAddress },
    });
    expect(response.status()).toBe(200);
    expect((await response.json()).carrier).toBe('USPS');
  });

  test('Pasted text AC49', async ({ request }) => {
    const response = await request.get('/api/shipping', { params: { currencyCode: 'USD', address: usAddress } });
    expect(response.status()).toBe(400);
  });

  test('Pasted text AC46', async ({ request }) => {
    const response = await request.post('/api/shipping', { timeout: 5_000 });
    expect(response.status()).toBe(405);
  });

  test('Pasted text AC5, storefront route', async ({ request }) => {
    const names = (await (await request.get('/api/products?currencyCode=USD')).json()).map((p: any) => p.name);
    expect(names).toEqual([...names].sort());
  });

  test('Pasted text AC14, storefront route', async ({ request }) => {
    const list = await (await request.get('/api/products?currencyCode=USD')).json();
    for (const product of list) {
      expect.soft(product.badge ?? '', product.id).toBe(product.id === '66VCHSJNUP' ? 'Bestseller' : '');
    }
    const single = await (await request.get('/api/products/66VCHSJNUP?currencyCode=USD')).json();
    expect(single.badge).toBe('Bestseller');
  });

  test('Pasted text AC37, storefront route', async ({ request }) => {
    const response = await request.get('/api/products?currencyCode=USD&category=binoculars');
    expect(response.status()).toBe(200);
    expect((await response.json()).map((p: any) => p.id)).toEqual(['2ZYFJ3GM2N']);
  });

  test('Pasted text AC18, storefront route', async ({ request }) => {
    const codes = await (await request.get('/api/currency')).json();
    expect(codes.length).toBeGreaterThan(0);
    expect(codes).toEqual([...codes].sort());
  });

  test('Pasted text AC42', async ({ request }) => {
    const response = await request.post('/api/currency', { timeout: 5_000 });
    expect(response.status()).toBe(405);
  });

  test('Pasted text AC20, storefront route', async ({ request }) => {
    const response = await request.get(`/api/recommendations?currencyCode=USD&sessionId=${randomUUID()}`);
    expect(response.status()).toBe(200);
    const list = await response.json();
    expect(list.length).toBeGreaterThan(0);
    for (const product of list) expect.soft(product.categories, product.id).toContain('accessories');
  });

  test('Pasted text AC24, storefront route', async ({ request }) => {
    const ads = await (await request.get('/api/data?contextKeys=home')).json();
    expect(ads).toHaveLength(1);
    expect(ads[0].text).toMatch(STARSENSE_AD_TEXT);
    expect(ads[0].redirectUrl).toBe('/product/66VCHSJNUP');
  });

  test('Pasted text AC36, variant 1', async ({ request }) => {
    expect((await request.get('/api/cart?currencyCode=USD')).status()).toBe(400);
  });

  test('Pasted text AC36, variant 2', async ({ request }) => {
    const response = await request.get(`/api/cart?currencyCode=USD&sessionId=${randomUUID()}`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('userId');
    expect(body).toHaveProperty('items');
  });

  test('Pasted text AC39', async ({ request }) => {
    const response = await request.put('/api/cart', { timeout: 5_000 });
    expect(response.status()).toBe(405);
  });

  test('Pasted text AC40, storefront route', async ({ request }) => {
    const userId = randomUUID();
    const first = await request.post('/api/cart', { data: { userId, item: { productId: 'OLJCESPC7Z', quantity: 10 } } });
    expect(first.status()).toBe(200);
    const second = await request.post('/api/cart', { data: { userId, item: { productId: 'OLJCESPC7Z', quantity: 1 } } });
    expect(second.status()).toBe(400);
    expect(await second.json()).toEqual({ error: 'Maximum 10 per product' });
  });

  test('checkout with the stock form values succeeds', async ({ request }) => {
    const userId = randomUUID();
    await request.post('/api/cart', { data: { userId, item: { productId: 'OLJCESPC7Z', quantity: 1 } } });
    const response = await request.post('/api/checkout?currencyCode=USD', {
      data: {
        userId,
        userCurrency: 'USD',
        email: 'someone@example.com',
        address: JSON.parse(usAddress),
        creditCard: {
          creditCardNumber: '4432-8015-6152-0454',
          creditCardCvv: 672,
          creditCardExpirationYear: 2030,
          creditCardExpirationMonth: 1,
        },
      },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.orderId).toBeTruthy();
    expect(body.items.length).toBeGreaterThan(0);
  });
});
