import { test, expect } from '@playwright/test';
import { clients, rpc } from '../support/grpcClients';

const recommendation = clients.recommendation();
const catalog = clients.productCatalog();

const ACCESSORIES = ['0PUK6V6EV0', '6E92ZMYYFZ', '9SIQT8TOJO', 'L9ECAV7KIM', 'LS4PSXUNUM'];

const recommend = async (product_ids: string[]) =>
  (await rpc<{ product_ids: string[] }>(recommendation, 'ListRecommendations', { user_id: 'u', product_ids }))
    .product_ids;

const pricesUsd = async () => {
  const { products } = await rpc<{ products: { id: string; price_usd: { units: number; nanos: number } }[] }>(
    catalog,
    'ListProducts',
    {}
  );
  return Object.fromEntries(products.map(p => [p.id, p.price_usd.units + p.price_usd.nanos / 1e9]));
};

test.describe('RecommendationService ListRecommendations', () => {
  test('returns product ids sorted ascending (AC11)', async () => {
    for (let i = 0; i < 5; i++) {
      const ids = await recommend(['66VCHSJNUP']);
      expect(ids).toEqual([...ids].sort());
    }
  });

  test('recommends only accessories when no product ids are sent (AC20)', async () => {
    for (let i = 0; i < 5; i++) {
      const ids = await recommend([]);
      expect(ids.length).toBeGreaterThan(0);
      expect(ids.filter(id => !ACCESSORIES.includes(id))).toEqual([]);
    }
  });

  test('prefers products sharing a category with the requested product (AC31)', async () => {
    for (let i = 0; i < 5; i++) {
      expect(await recommend(['66VCHSJNUP'])).toEqual(
        expect.arrayContaining(['OLJCESPC7Z', '1YMWWN1N4O', '0PUK6V6EV0', '6E92ZMYYFZ'])
      );
    }
  });

  test('recommends only products cheaper than the requested product (AC44)', async () => {
    const prices = await pricesUsd();
    const ids = await recommend(['1YMWWN1N4O']);
    expect(ids.length).toBeGreaterThan(0);
    expect(ids.filter(id => !(prices[id] < 129.95))).toEqual([]);
  });

  test('recommends nothing when the requested product is the cheapest (AC44)', async () => {
    expect(await recommend(['HQTGWGPNH4'])).toEqual([]);
  });

  test('recommends only products cheaper than every one of several requested products (AC44)', async () => {
    const prices = await pricesUsd();
    for (let i = 0; i < 3; i++) {
      const ids = await recommend(['1YMWWN1N4O', 'LS4PSXUNUM']);
      expect(ids.filter(id => !(prices[id] < 57.08))).toEqual([]);
    }
  });
});
