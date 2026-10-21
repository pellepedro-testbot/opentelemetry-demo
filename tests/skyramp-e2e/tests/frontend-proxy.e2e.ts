// Frontend proxy (Envoy): regrouped and named routes still reach the same
// backends, log their name, and keep their retry and timeout settings.
import { expect, test } from '@playwright/test';
import { waitForLogs } from '../opensearch';
import { ENVOY_ADMIN_URL, PROXY_URL, uniqueId } from '../stack';

async function viaProxy(pathname: string, init: RequestInit = {}): Promise<{ status: number; requestId: string; body: string }> {
  const requestId = uniqueId('route');
  const res = await fetch(`${PROXY_URL}${pathname}`, {
    ...init,
    headers: { ...(init.headers ?? {}), 'x-request-id': requestId },
  });
  return { status: res.status, requestId, body: await res.text() };
}

/** The access log attributes Envoy recorded for a request. */
async function accessLog(requestId: string): Promise<Record<string, unknown> | undefined> {
  const [record] = await waitForLogs(requestId, 'frontend-proxy', 60_000);
  return record?.attributes;
}

test.describe('routes reach the same backends', () => {
  const routes: [string, string, RequestInit?][] = [
    ['/', 'frontend'],
    ['/api/products', 'frontend'],
    ['/images/products/NationalParkFoundationExplorascope.jpg', 'image-provider'],
    ['/jaeger/', 'jaeger'],
    ['/grafana/', 'grafana'],
    ['/flagservice/', 'flagservice'],
    ['/otlp-http/v1/traces', 'opentelemetry_collector_http', { method: 'POST', headers: { 'content-type': 'application/json' }, body: '{}' }],
    ['/loadgen/', 'loadgen'],
    ['/telemetry/', 'telemetry-docs'],
    ['/opamp/', 'opamp'],
  ];

  test('every path served before is answered by the same backend', async () => {
    test.setTimeout(300_000);
    const sent = [];
    for (const [pathname, cluster, init] of routes) sent.push({ pathname, cluster, ...(await viaProxy(pathname, init)) });
    for (const { pathname, cluster, status, requestId } of sent) {
      expect.soft(status, pathname).toBeLessThan(500);
      expect.soft((await accessLog(requestId))?.['upstream.cluster'], pathname).toBe(cluster);
    }
    expect(sent.find(s => s.pathname === '/')?.status).toBe(200);
    expect(sent.find(s => s.pathname === '/api/products')?.status).toBe(200);
  });

  test('the feature flag UI is still served at /feature', async () => {
    test.setTimeout(120_000);
    const page = await viaProxy('/feature');
    expect(page.status).toBe(200);
    expect((await accessLog(page.requestId))?.['upstream.cluster']).toBe('flagd-ui');
    const flags = await fetch(`${PROXY_URL}/feature/api/read`);
    expect(flags.status).toBe(200);
    expect(Object.keys((await flags.json()).flags ?? {})).toContain('paymentFailure');
  });
});

test.describe('route names and settings', () => {
  test('bare paths redirect to their trailing-slash form', async () => {
    for (const name of ['jaeger', 'grafana', 'loadgen', 'telemetry', 'profiles', 'chatbot', 'opamp']) {
      const res = await fetch(`${PROXY_URL}/${name}`, { redirect: 'manual' });
      expect.soft(res.status, name).toBe(301);
      expect.soft(res.headers.get('location') ?? '', name).toMatch(new RegExp(`/${name}/$`));
    }
  });

  test('the route name is recorded as url.template in the access log', async () => {
    test.setTimeout(180_000);
    for (const [pathname, name] of [
      ['/api/products', 'frontend'],
      ['/images/x', 'images'],
      ['/jaeger/', 'jaeger'],
    ]) {
      const { requestId } = await viaProxy(pathname);
      expect.soft((await accessLog(requestId))?.['url.template'], pathname).toBe(name);
    }
  });

  test('observability and image routes retry on connect failure; streaming routes never time out', async () => {
    const dump = await (await fetch(`${ENVOY_ADMIN_URL}/config_dump`)).json();
    const routeConfigs = dump.configs.find((c: { '@type': string }) => c['@type'].endsWith('.RoutesConfigDump'));
    const routes = new Map<string, any>(); // eslint-disable-line @typescript-eslint/no-explicit-any
    for (const rc of routeConfigs.static_route_configs) {
      for (const vh of rc.route_config.virtual_hosts) for (const r of vh.routes) routes.set(r.name, r);
    }
    for (const name of ['images', 'grafana', 'jaeger', 'profiles', 'telemetry-docs']) {
      expect.soft(routes.get(name)?.route?.retry_policy, name).toEqual({ retry_on: 'connect-failure,refused-stream', num_retries: 2 });
    }
    for (const name of ['flagservice', 'chatbot']) {
      expect.soft(routes.get(name)?.route?.timeout, name).toBe('0s');
    }
  });
});
