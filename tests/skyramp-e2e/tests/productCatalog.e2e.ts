import { test, expect } from '@playwright/test';
import { clients, rpc, rpcError, status } from '../support/grpcClients';

const catalog = clients.productCatalog();

type Product = { id: string; name: string; badge: string; categories: string[] };
const search = async (query: string) =>
  (await rpc<{ results: Product[] }>(catalog, 'SearchProducts', { query })).results;

test.describe('ProductCatalogService', () => {
  test('ListProducts order (AC5)', async () => {
    const { products } = await rpc<{ products: Product[] }>(catalog, 'ListProducts', {});
    const names = products.map(p => p.name);
    expect(names).toHaveLength(10);
    expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)));
    expect(names[0]).toBe('Eclipsmart Travel Refractor Telescope');
    expect(names[names.length - 1]).toBe('The Comet Book');
  });

  test('GetProduct 66VCHSJNUP label field (AC14)', async () => {
    const product = await rpc<Product>(catalog, 'GetProduct', { id: '66VCHSJNUP' });
    expect(product.badge).toBe('Bestseller');
  });

  test('ListProducts label field on the other nine (AC14)', async () => {
    const { products } = await rpc<{ products: Product[] }>(catalog, 'ListProducts', {});
    const badges = Object.fromEntries(products.map(p => [p.id, p.badge]));
    expect(badges['66VCHSJNUP']).toBe('Bestseller');
    const others = Object.entries(badges).filter(([id]) => id !== '66VCHSJNUP');
    expect(others).toHaveLength(9);
    expect(others.filter(([, badge]) => badge !== '')).toEqual([]);
  });

  test('SearchProducts with an empty string (AC25)', async () => {
    const error = await rpcError(catalog, 'SearchProducts', { query: '' });
    expect(error?.code).toBe(status.INVALID_ARGUMENT);
  });

  test('SearchProducts with three spaces (AC25)', async () => {
    const error = await rpcError(catalog, 'SearchProducts', { query: '   ' });
    expect(error?.code).toBe(status.INVALID_ARGUMENT);
  });

  test('SearchProducts with a tab (AC25)', async () => {
    const error = await rpcError(catalog, 'SearchProducts', { query: '\t' });
    expect(error?.code).toBe(status.INVALID_ARGUMENT);
  });

  test('SearchProducts with telescope (AC25)', async () => {
    expect((await search('telescope')).length).toBeGreaterThan(0);
  });

  test('SearchProducts category prefix with books (AC37)', async () => {
    expect((await search('category:books')).map(p => p.id)).toEqual(['HQTGWGPNH4']);
  });

  test('SearchProducts category prefix with accessories (AC37)', async () => {
    expect((await search('category:accessories')).map(p => p.id).sort()).toEqual(
      ['0PUK6V6EV0', '6E92ZMYYFZ', '9SIQT8TOJO', 'L9ECAV7KIM', 'LS4PSXUNUM'].sort()
    );
  });

  test('SearchProducts category prefix with an unknown value (AC37)', async () => {
    expect(await search('category:nope')).toEqual([]);
  });

  test('SearchProducts by a category word finds LS4PSXUNUM (AC45)', async () => {
    expect((await search('flashlights')).map(p => p.id)).toContain('LS4PSXUNUM');
  });
});
