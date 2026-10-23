import { randomUUID } from 'node:crypto';
import { expect, test } from '@playwright/test';
import { US_ADDRESS, VALID_CARD, productCatalog } from '../support/grpc-clients';

const US_ADDRESS_PARAM = encodeURIComponent(JSON.stringify(US_ADDRESS));

test.describe('storefront API', () => {
  test('Pasted text AC25', async ({ request }) => {
    const response = await request.get('/api/products?currencyCode=USD&q=');
    expect(response.status()).toBe(400);
  });

  test('Pasted text AC36', async ({ request }) => {
    expect((await request.get('/api/cart?currencyCode=USD')).status()).toBe(400);
    expect((await request.get('/api/cart?currencyCode=USD&sessionId=')).status()).toBe(400);
  });

  test('Pasted text AC37', async ({ request }) => {
    const response = await request.get('/api/products?currencyCode=USD&category=flashlights');
    expect(response.status()).toBe(200);
    const products = await response.json();
    expect(products.map((p: { id: string }) => p.id)).toEqual(['LS4PSXUNUM']);
    expect(products[0].priceUsd.currencyCode).toBe('USD');
  });

  test('Pasted text AC39', async ({ request }) => {
    const response = await request.put('/api/cart', { timeout: 5000 });
    expect(response.status()).toBe(405);
    expect(response.headers()['allow']).toBe('GET, POST, DELETE');
  });

  test('Pasted text AC40', async ({ request }) => {
    const response = await request.post('/api/cart?currencyCode=USD', {
      data: { userId: randomUUID(), item: { productId: 'OLJCESPC7Z', quantity: 11 } },
    });
    expect(response.status()).toBe(400);
    expect(await response.json()).toEqual({ error: 'Maximum 10 per product' });
  });

  test('Pasted text AC42', async ({ request }) => {
    expect((await request.post('/api/currency', { timeout: 5000 })).status()).toBe(405);
  });

  test('Pasted text AC46', async ({ request }) => {
    expect((await request.post('/api/shipping', { timeout: 5000 })).status()).toBe(405);
  });

  test('Pasted text AC49', async ({ request }) => {
    const response = await request.get(`/api/shipping?currencyCode=USD&address=${US_ADDRESS_PARAM}`);
    expect(response.status()).toBe(400);
  });

  test('Pasted text AC52', async ({ request }) => {
    expect((await request.get('/api/products/NOPE?currencyCode=USD')).status()).toBe(404);
  });

  test('Pasted text AC60', async ({ request }) => {
    const response = await request.get('/api/products?currencyCode=EUR&q=telescope');
    expect(response.status()).toBe(200);
    const products = await response.json();
    const { results } = await productCatalog.searchProducts({ query: 'telescope' });
    expect(products.map((p: { id: string }) => p.id)).toEqual(results.map((p: { id: string }) => p.id));
    for (const p of products) expect.soft(p.priceUsd.currencyCode, p.id).toBe('EUR');
  });

  test('Pasted text AC64', async ({ request }) => {
    const userId = randomUUID();
    await request.post('/api/cart?currencyCode=USD', { data: { userId, item: { productId: 'OLJCESPC7Z', quantity: 1 } } });
    const body = await (await request.get(`/api/cart?sessionId=${userId}&currencyCode=USD`)).json();
    expect(typeof body.updatedAt).toBe('number');
    expect(Number.isInteger(body.updatedAt) && body.updatedAt > 0).toBe(true);
  });

  test('R1', async ({ request }) => {
    const response = await request.get(`/api/shipping?currencyCode=USD&itemList=%5B%5D&address=${US_ADDRESS_PARAM}`);
    expect(response.status()).toBeGreaterThanOrEqual(400);
    expect(response.status()).toBeLessThan(500);
  });

  test('R2', async ({ request }) => {
    const response = await request.get('/api/recommendations?productIds=NOPE&sessionId=x&currencyCode=USD');
    expect([400, 404]).toContain(response.status());
  });

  test('R3', async ({ request }) => {
    const emptyUser = await request.post('/api/cart?currencyCode=USD', {
      data: { userId: '', item: { productId: 'OLJCESPC7Z', quantity: 1 } },
    });
    expect.soft(emptyUser.status(), 'empty userId').toBeGreaterThanOrEqual(400);
    expect.soft(emptyUser.status(), 'empty userId').toBeLessThan(500);

    const userId = randomUUID();
    const zeroQuantity = await request.post('/api/cart?currencyCode=USD', {
      data: { userId, item: { productId: 'OLJCESPC7Z', quantity: 0 } },
    });
    expect.soft(zeroQuantity.status(), 'quantity 0').toBeGreaterThanOrEqual(400);
    expect.soft(zeroQuantity.status(), 'quantity 0').toBeLessThan(500);

    const cart = await (await request.get(`/api/cart?sessionId=${userId}&currencyCode=USD`)).json();
    expect(cart.items).toEqual([]);
  });

  test('R4', async ({ request }) => {
    const response = await request.post('/api/checkout?currencyCode=USD', {
      data: {
        userId: randomUUID(),
        email: 'a@b.com',
        address: US_ADDRESS,
        userCurrency: 'USD',
        creditCard: VALID_CARD,
      },
    });
    expect(response.status()).toBeGreaterThanOrEqual(400);
    expect(response.status()).toBeLessThan(500);
  });
});
