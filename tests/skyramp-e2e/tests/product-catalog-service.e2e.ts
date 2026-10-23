import { expect, test } from '@playwright/test';
import { Status, expectGrpcError, productCatalog } from '../support/grpc-clients';

type Product = {
  id: string;
  name: string;
  description: string;
  categories: string[];
  badge: string;
  maxQuantity: number;
};

const listProducts = async (): Promise<Product[]> => (await productCatalog.listProducts({})).products;
const search = async (query: string): Promise<Product[]> => (await productCatalog.searchProducts({ query })).results;

test.describe('ProductCatalogService', () => {
  test('Pasted text AC5', async () => {
    const names = (await listProducts()).map(p => p.name);
    expect(names).toEqual([...names].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())));
    expect(names[0]).toBe('Eclipsmart Travel Refractor Telescope');
    expect(names[names.length - 1]).toBe('The Comet Book');
  });

  test('Pasted text AC14', async () => {
    for (const product of await listProducts()) {
      expect.soft(product.badge, product.id).toBe(product.id === '66VCHSJNUP' ? 'Bestseller' : '');
    }
    expect((await productCatalog.getProduct({ id: '66VCHSJNUP' })).badge).toBe('Bestseller');
  });

  test('Pasted text AC25', async () => {
    for (const query of ['', '   ', '\t']) {
      await expectGrpcError(productCatalog.searchProducts({ query }), Status.INVALID_ARGUMENT);
    }
  });

  test('Pasted text AC37', async () => {
    const accessories = ['L9ECAV7KIM', '9SIQT8TOJO', 'LS4PSXUNUM', '6E92ZMYYFZ', '0PUK6V6EV0'].sort();
    expect((await search('category:accessories')).map(p => p.id).sort()).toEqual(accessories);
    expect((await search('category:Accessories')).map(p => p.id).sort()).toEqual(accessories);
    expect(await search('category:no-such-category')).toEqual([]);
  });

  test('Pasted text AC45', async () => {
    expect((await search('flashlights')).map(p => p.id)).toContain('LS4PSXUNUM');
  });

  test('Pasted text AC60', async () => {
    const results = await search('Telescope');
    const nameMatches = results.map(p => p.name.toLowerCase().includes('telescope'));
    expect(nameMatches).toContain(true);
    expect(nameMatches).toContain(false);
    expect(nameMatches.lastIndexOf(true)).toBeLessThan(nameMatches.indexOf(false));
  });

  test('Pasted text AC65', async () => {
    const results = await search('telescope solar');
    expect(results.length).toBeGreaterThan(0);
    for (const p of results) {
      const text = [p.name, p.description, ...p.categories].join(' ').toLowerCase();
      expect.soft(text.includes('telescope') && text.includes('solar'), p.id).toBe(true);
    }
  });

  test('Pasted text AC84', async () => {
    for (const product of await listProducts()) {
      expect.soft(product.maxQuantity, product.id).toBe(product.id === '2ZYFJ3GM2N' ? 3 : 10);
    }
  });

  test('Pasted text AC85', async () => {
    for (const id of [' OLJCESPC7Z ', '\tOLJCESPC7Z\n']) {
      expect((await productCatalog.getProduct({ id })).name).toBe('National Park Foundation Explorascope');
    }
  });
});
