import { expect, test } from '@playwright/test';
import { Status, expectGrpcError, productCatalog, recommendation, toNumber } from '../support/grpc-clients';

const ALL_IDS = [
  'OLJCESPC7Z',
  '66VCHSJNUP',
  '1YMWWN1N4O',
  'L9ECAV7KIM',
  '2ZYFJ3GM2N',
  '0PUK6V6EV0',
  'LS4PSXUNUM',
  '9SIQT8TOJO',
  '6E92ZMYYFZ',
  'HQTGWGPNH4',
];

const recommend = async (productIds: string[], maxResults = 0): Promise<string[]> =>
  (await recommendation.listRecommendations({ userId: 'recs-test', productIds, maxResults })).productIds;

type Product = { id: string; categories: string[]; priceUsd: { units: number; nanos: number } };

let catalog: Map<string, Product>;

test.beforeAll(async () => {
  const { products } = await productCatalog.listProducts({});
  catalog = new Map((products as Product[]).map(p => [p.id, p]));
});

const price = (id: string) => toNumber(catalog.get(id)!.priceUsd);

test.describe('RecommendationService/ListRecommendations', () => {
  test('Pasted text AC11', async () => {
    for (let i = 0; i < 5; i++) {
      for (const ids of [[], ['9SIQT8TOJO']]) {
        const result = await recommend(ids, 10);
        expect(result).toEqual([...result].sort());
      }
    }
  });

  test('Pasted text AC20', async () => {
    const result = await recommend([]);
    expect(result.length).toBeGreaterThan(0);
    for (const id of result) expect(['0PUK6V6EV0', '6E92ZMYYFZ', 'L9ECAV7KIM', 'LS4PSXUNUM']).toContain(id);
  });

  test('Pasted text AC31', async () => {
    for (let i = 0; i < 8; i++) {
      expect(await recommend(['0PUK6V6EV0'])).not.toContain('HQTGWGPNH4');
    }
    const [single] = await recommend(['0PUK6V6EV0'], 1);
    const requested = catalog.get('0PUK6V6EV0')!.categories;
    expect(catalog.get(single)!.categories.some(c => requested.includes(c))).toBe(true);
  });

  test('Pasted text AC44', async () => {
    for (const id of await recommend(['OLJCESPC7Z'])) expect.soft(price(id), id).toBeLessThan(101.96);
    expect(await recommend(['OLJCESPC7Z', 'L9ECAV7KIM'])).toEqual(['HQTGWGPNH4']);
  });

  test('Pasted text AC51', async () => {
    await expectGrpcError(recommend(['NOPE']), Status.INVALID_ARGUMENT);
    await expectGrpcError(recommend(['OLJCESPC7Z', 'NOPE']), Status.INVALID_ARGUMENT);
  });

  test('Pasted text AC51 (2)', async () => {
    await expect(recommend(['', 'OLJCESPC7Z'])).resolves.toBeInstanceOf(Array);
  });

  test('Pasted text AC67', async () => {
    expect(await recommend([], 2)).toHaveLength(2);
    const byDefault = await recommend(['9SIQT8TOJO'], 0);
    expect(byDefault.length).toBeGreaterThan(0);
    expect(byDefault.length).toBeLessThanOrEqual(5);
  });

  test('Pasted text AC71', async () => {
    for (let i = 0; i < 6; i++) expect(await recommend([])).not.toContain('9SIQT8TOJO');
    expect(await recommend(['9SIQT8TOJO'], 10)).not.toContain('9SIQT8TOJO');
  });

  test('Pasted text AC91', async () => {
    await expectGrpcError(recommend([...ALL_IDS, 'NOT-IN-CATALOG']), Status.INVALID_ARGUMENT);
  });

  test('Pasted text AC91 (2)', async () => {
    await expectGrpcError(recommend([...ALL_IDS, 'OLJCESPC7Z']), Status.INVALID_ARGUMENT);
  });

  test('Pasted text AC91 (3)', async () => {
    await expect(recommend(ALL_IDS)).resolves.toBeInstanceOf(Array);
  });
});
