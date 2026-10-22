// Skyramp Testbot test package: Testbot owns and maintains everything in this folder.
import { expect, test } from '@playwright/test';
import { productCatalog, status } from '../../demo-grpc';
import { sortedByName } from '../../storefront-data';

const listProducts = async () => {
  const { response, error } = await productCatalog('ListProducts', {});
  expect(error).toBeUndefined();
  return response.products as { id: string; name: string; description: string; badge: string }[];
};

test.describe('ProductCatalogService', () => {
  test('Pasted text AC5: ListProducts order', async () => {
    const names = (await listProducts()).map(p => p.name);
    expect(names).toHaveLength(10);
    expect(names).toEqual(sortedByName(names));
    expect(names[0]).toBe('Eclipsmart Travel Refractor Telescope');
    expect(names[names.length - 1]).toBe('The Comet Book');
  });

  test('Pasted text AC14: GetProduct and ListProducts badge for 66VCHSJNUP', async () => {
    const { response, error } = await productCatalog('GetProduct', { id: '66VCHSJNUP' });
    expect(error).toBeUndefined();
    expect(response.badge).toBe('Bestseller');
    expect((await listProducts()).find(p => p.id === '66VCHSJNUP')?.badge).toBe('Bestseller');
  });

  test('Pasted text AC14: badge of the other products in ListProducts', async () => {
    const others = (await listProducts()).filter(p => p.id !== '66VCHSJNUP');
    expect(others).toHaveLength(9);
    for (const p of others) expect(p.badge ?? '', p.id).toBe('');
  });

  test('Pasted text AC25: SearchProducts with query ""', async () => {
    const { error } = await productCatalog('SearchProducts', { query: '' });
    expect(error?.code).toBe(status.INVALID_ARGUMENT);
  });

  for (const query of ['   ', '\t', '\n ']) {
    test(`Pasted text AC25: SearchProducts with query ${JSON.stringify(query)}`, async () => {
      const { error } = await productCatalog('SearchProducts', { query });
      expect(error?.code).toBe(status.INVALID_ARGUMENT);
    });
  }

  test('Pasted text AC25: SearchProducts with query "telescope"', async () => {
    const { response, error } = await productCatalog('SearchProducts', { query: 'telescope' });
    expect(error).toBeUndefined();
    expect(response.results.length).toBeGreaterThan(0);
    for (const p of response.results) expect(`${p.name} ${p.description}`.toLowerCase()).toContain('telescope');

    const padded = await productCatalog('SearchProducts', { query: ' telescope ' });
    expect(padded.error?.code).not.toBe(status.INVALID_ARGUMENT);
  });
});
