import { expect, test } from '@playwright/test';
import { idsInCategory } from '../support/catalog';
import { call, callOk, expectStatus, grpc, services } from '../support/grpcClients';

type Product = { id: string; name: string; badge: string; categories: string[] };

const listProducts = async () =>
  (await callOk<{ products: Product[] }>(services.productCatalog, 'ListProducts', {})).products;

const search = (query: string) => call<{ results: Product[] }>(services.productCatalog, 'SearchProducts', { query });

const searchIds = async (query: string) => {
  const result = await search(query);
  expect(result.ok ? '' : `${grpc.status[result.error.code]} ${result.error.details}`).toBe('');
  return result.ok ? result.response.results.map(p => p.id) : [];
};

test.describe('product catalog service contract', () => {
  test('Pasted text AC5', async () => {
    const names = (await listProducts()).map(p => p.name);
    expect(names).toHaveLength(10);
    expect(names).toEqual([...names].sort());
    expect(names[0]).toBe('Eclipsmart Travel Refractor Telescope');
    expect(names[9]).toBe('The Comet Book');
  });

  test('Pasted text AC14, variant 1', async () => {
    const product = await callOk<Product>(services.productCatalog, 'GetProduct', { id: '66VCHSJNUP' });
    expect(product.badge).toBe('Bestseller');
  });

  test('Pasted text AC14, variant 2', async () => {
    const withBadge = (await listProducts()).filter(p => p.badge).map(p => p.id);
    expect(withBadge).toEqual(['66VCHSJNUP']);
    const other = await callOk<Product>(services.productCatalog, 'GetProduct', { id: 'OLJCESPC7Z' });
    expect(other.badge).toBe('');
  });

  test('Pasted text AC25, variant 1', async () => {
    expectStatus(await search(''), grpc.status.INVALID_ARGUMENT);
  });

  test('Pasted text AC25, variant 2', async () => {
    expectStatus(await search('   '), grpc.status.INVALID_ARGUMENT);
  });

  test('Pasted text AC25, variant 3', async () => {
    expectStatus(await search('\t\n'), grpc.status.INVALID_ARGUMENT);
  });

  test('Pasted text AC37, variant 1', async () => {
    expect((await searchIds('category:telescopes')).sort()).toEqual(idsInCategory('telescopes').sort());
  });

  test('Pasted text AC37, variant 2', async () => {
    expect(await searchIds('category:books')).toEqual(['HQTGWGPNH4']);
  });

  test('Pasted text AC37, variant 3', async () => {
    expect(await searchIds('category:no-such-category')).toEqual([]);
  });

  test('Pasted text AC45, variant 1', async () => {
    expect(await searchIds('flashlights')).toContain('LS4PSXUNUM');
  });

  test('Pasted text AC45, variant 2', async () => {
    expect(await searchIds('BINOCULARS')).toContain('2ZYFJ3GM2N');
  });
});
