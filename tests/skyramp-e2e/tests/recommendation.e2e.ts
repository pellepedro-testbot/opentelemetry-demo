// Recommendation: product ids seen from the catalog keep recommendations
// working through a catalog outage.
import { expect, test } from '@playwright/test';
import { unary } from '../grpc-clients';
import { PROXY_URL, docker, pollUntil } from '../stack';

async function recommend(productIds: string[], timeoutMs = 10_000) {
  return unary<{ product_ids: string[] }>('RecommendationService', 'ListRecommendations', { user_id: 'testbot', product_ids: productIds }, {}, timeoutMs);
}

async function waitUntilRecommending(): Promise<void> {
  await pollUntil(async () => ((await recommend([])).response ? true : undefined), 120_000, 2000);
}

test('the remembered product ids do not grow with every request', async () => {
  test.setTimeout(120_000);
  const script = [
    'import os, grpc, demo_pb2_grpc, recommendation_server as rs',
    "rs.product_catalog_stub = demo_pb2_grpc.ProductCatalogServiceStub(grpc.insecure_channel(os.environ['PRODUCT_CATALOG_ADDR']))",
    'ids = [rs.get_catalog_product_ids() for _ in range(100)][-1]',
    'print(len(rs.known_product_ids), len(ids))',
  ].join('\n');
  const [known, returned] = docker(['exec', 'recommendation', '/venv/bin/python', '-c', script], 120_000).trim().split('\n').pop()!.split(' ').map(Number);
  expect(returned).toBe(10);
  expect(known).toBe(10);
});

test('recommendations keep working through a catalog outage after a successful call', async ({ request }) => {
  test.setTimeout(240_000);
  const res = await request.get(`${PROXY_URL}/api/recommendations?productIds=OLJCESPC7Z`);
  expect(res.status()).toBe(200);
  docker(['stop', 'product-catalog'], 120_000);
  try {
    // Connecting to the stopped catalog takes about ten seconds to fail before the fallback is used.
    const during = await recommend(['OLJCESPC7Z'], 30_000);
    expect(during.error).toBeUndefined();
    expect(during.response?.product_ids.length).toBeGreaterThan(0);
    expect(during.response?.product_ids).not.toContain('OLJCESPC7Z');
  } finally {
    docker(['start', 'product-catalog'], 120_000);
    await pollUntil(async () => ((await request.get(`${PROXY_URL}/api/products`)).ok() ? true : undefined), 120_000, 2000);
  }
});

test('without any product ids seen, a catalog failure still fails the request', async ({ request }) => {
  test.setTimeout(300_000);
  docker(['stop', 'product-catalog'], 120_000);
  try {
    docker(['restart', 'recommendation'], 120_000);
    const healthy = await pollUntil(
      () => (docker(['inspect', '-f', '{{.State.Health.Status}}', 'recommendation']).trim() === 'healthy' ? true : undefined),
      90_000,
      2000
    );
    expect(healthy).toBe(true);
    const result = await recommend(['OLJCESPC7Z']);
    expect(result.response).toBeUndefined();
    expect(result.error).toBeDefined();
  } finally {
    docker(['start', 'product-catalog'], 120_000);
    await pollUntil(async () => ((await request.get(`${PROXY_URL}/api/products`)).ok() ? true : undefined), 120_000, 2000);
    await waitUntilRecommending();
  }
});
