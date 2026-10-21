// Product catalog: normalized and capped search and the capped PostgreSQL
// connection pool.
import { expect, test } from '@playwright/test';
import { call } from '../grpc-clients';
import { PROXY_URL, containerIp, psql, sleep } from '../stack';

interface Product {
  id: string;
  name: string;
  description: string;
  picture: string;
  price_usd: { currency_code: string; units: number; nanos: number };
  categories: string[];
}

async function listProducts(): Promise<Product[]> {
  return (await call<{ products: Product[] }>('ProductCatalogService', 'ListProducts', {})).products;
}

async function search(query: string): Promise<Product[]> {
  return (await call<{ results: Product[] }>('ProductCatalogService', 'SearchProducts', { query })).results;
}

/** Ids of the products whose name or description contains the text, case-insensitively. */
function containing(products: Product[], text: string): string[] {
  const t = text.toLowerCase();
  return products
    .filter(p => p.name.toLowerCase().includes(t) || p.description.toLowerCase().includes(t))
    .map(p => p.id)
    .sort();
}

const ids = (products: Product[]) => products.map(p => p.id).sort();

test.describe('product search', () => {
  test('search text is trimmed, lowercased and its spaces collapsed', async () => {
    const normalized = ids(await search('solar filter'));
    expect(normalized).toContain('6E92ZMYYFZ');
    expect(ids(await search('  Solar   FILTER '))).toEqual(normalized);
  });

  test('a single-word search finds every product whose name or description contains it', async () => {
    const catalog = await listProducts();
    const got = ids(await search('telescope'));
    expect(got).toEqual(containing(catalog, 'telescope'));
    expect(got).toContain('66VCHSJNUP');
    expect(got).toContain('1YMWWN1N4O');
  });

  for (const word of ['solar', 'lens']) {
    test(`a single-word search for "${word}" matches names and descriptions as before`, async () => {
      expect(ids(await search(word))).toEqual(containing(await listProducts(), word));
    });
  }

  test('a multi-word search still matches name or description substrings', async () => {
    const got = ids(await search('refractor telescope'));
    expect(got).toEqual(containing(await listProducts(), 'refractor telescope'));
    expect(got).toEqual(expect.arrayContaining(['66VCHSJNUP', '1YMWWN1N4O']));
  });

  test('a search returns at most 50 products', async () => {
    const catalog = await listProducts();
    const blank = await search(' ');
    expect(blank.length).toBeLessThanOrEqual(50);
    expect(ids(blank)).toEqual(ids(catalog));
    expect((await search('e')).length).toBeLessThanOrEqual(50);

    const seeded = Array.from({ length: 60 }, (_, i) => `TESTBOT-SEED-${String(i).padStart(2, '0')}`);
    try {
      psql(
        `INSERT INTO catalog.products (id, name, description, picture, price_currency_code, price_units, price_nanos, categories) VALUES ` +
          seeded.map(id => `('${id}', 'Testbot Seed ${id}', 'seeded search row', 'x.jpg', 'USD', 1, 0, 'testbot')`).join(',')
      );
      expect(await search('testbot seed')).toHaveLength(50);
    } finally {
      psql(`DELETE FROM catalog.products WHERE id LIKE 'TESTBOT-SEED-%'`);
    }
  });
});

test.describe('catalog connection pool', () => {
  const catalogConnections = () =>
    psql(
      `SELECT pid, backend_start, state FROM pg_stat_activity WHERE client_addr = '${containerIp('product-catalog')}' AND datname = 'astronomy_db'`
    );

  async function burst(): Promise<{ statuses: number[]; maxConnections: number }> {
    const paths = Array.from({ length: 200 }, (_, i) => (i % 2 ? '/api/products' : '/api/products/OLJCESPC7Z'));
    const statuses: number[] = [];
    let maxConnections = 0;
    let running = true;
    const sampler = (async () => {
      while (running) {
        maxConnections = Math.max(maxConnections, catalogConnections().length);
        await sleep(200);
      }
    })();
    for (let i = 0; i < paths.length; i += 50) {
      const results = await Promise.all(paths.slice(i, i + 50).map(p => fetch(`${PROXY_URL}${p}`)));
      statuses.push(...results.map(r => r.status));
    }
    running = false;
    await sampler;
    return { statuses, maxConnections };
  }

  test('a burst of concurrent catalog requests all succeed', async () => {
    test.setTimeout(120_000);
    const { statuses } = await burst();
    expect(statuses.filter(s => s !== 200)).toEqual([]);
  });

  test('the catalog never holds more than two database connections', async () => {
    test.setTimeout(120_000);
    const { maxConnections } = await burst();
    expect(maxConnections).toBeGreaterThan(0);
    expect(maxConnections).toBeLessThanOrEqual(2);
  });

  test('idle connections are kept and reused by the next burst', async () => {
    test.setTimeout(120_000);
    await burst();
    const afterFirst = catalogConnections();
    expect(afterFirst.length).toBeGreaterThanOrEqual(1);
    expect(afterFirst.every(([, , state]) => state === 'idle')).toBe(true);
    await burst();
    const afterSecond = catalogConnections().map(([pid, start]) => `${pid}@${start}`);
    for (const [pid, start] of afterFirst) expect(afterSecond).toContain(`${pid}@${start}`);
  });
});
