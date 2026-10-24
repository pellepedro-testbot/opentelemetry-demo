import { expect, test } from '@playwright/test';
import { idsInCategory, products, ProductId } from '../support/catalog';
import { callOk, services } from '../support/grpcClients';

const recommend = async (productIds: string[]) =>
  (await callOk<{ product_ids: string[] }>(services.recommendation, 'ListRecommendations', {
    user_id: 'skyramp-test',
    product_ids: productIds,
  })).product_ids;

const price = (id: string) => products[id as ProductId].priceNanos;

test.describe('RecommendationService.ListRecommendations', () => {
  test('returns product ids sorted ascending', async () => {
    for (let i = 0; i < 5; i++) {
      const ids = await recommend(['9SIQT8TOJO']);
      expect(ids.length).toBeGreaterThan(0);
      expect(ids).toEqual([...ids].sort());
    }
  });

  test('returns sorted ids for empty product_ids', async () => {
    const ids = await recommend([]);
    expect(ids).toEqual([...ids].sort());
  });

  test('recommends only accessories when no product ids are given', async () => {
    const accessories = idsInCategory('accessories');
    for (let i = 0; i < 5; i++) {
      const ids = await recommend([]);
      expect(ids.length).toBeGreaterThan(0);
      for (const id of ids) expect(accessories).toContain(id);
    }
  });

  test('prefers products sharing a category with the requested product', async () => {
    for (let i = 0; i < 10; i++) {
      const ids = await recommend(['9SIQT8TOJO']);
      expect(ids).toHaveLength(5);
      expect(ids).not.toContain('2ZYFJ3GM2N');
      expect(ids).not.toContain('HQTGWGPNH4');
    }
  });

  test('recommends only products cheaper than the requested product', async () => {
    const ids = await recommend(['OLJCESPC7Z']);
    expect(ids.length).toBeGreaterThan(0);
    for (const id of ids) expect(price(id)).toBeLessThan(price('OLJCESPC7Z'));
  });

  test('recommends only products cheaper than every requested product', async () => {
    const ids = await recommend(['1YMWWN1N4O', 'LS4PSXUNUM']);
    expect(ids.length).toBeGreaterThan(0);
    for (const id of ids) expect(price(id)).toBeLessThan(price('LS4PSXUNUM'));
  });

  test('returns nothing for the cheapest product', async () => {
    expect(await recommend(['HQTGWGPNH4'])).toEqual([]);
  });
});
