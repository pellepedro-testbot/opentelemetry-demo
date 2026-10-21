// Shipping: starts without flagd and switches to flagd once it answers.
import { expect, test } from '@playwright/test';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { REPO_ROOT, docker, hostAddress, logsSince, pollUntil, sleep } from '../stack';

const ORDER = {
  address: { street_address: '1 Rue de Rivoli', city: 'Paris', state: '', country: 'France', zip_code: '75001' },
  items: [{ product_id: 'OLJCESPC7Z', quantity: 2 }],
};

async function post(pathname: string): Promise<{ status: number; elapsedMs: number }> {
  const started = Date.now();
  const res = await fetch(`http://${hostAddress('shipping', 50050)}${pathname}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(ORDER),
  });
  await res.text();
  return { status: res.status, elapsedMs: Date.now() - started };
}

// Strips ANSI colour codes from the console log.
const plain = (text: string) => text.replace(/\x1b\[[0-9;]*m/g, '');

async function setIntlSlowdown(variant: string): Promise<void> {
  const flagdUi = `http://${hostAddress('flagd-ui', 4000)}`;
  const { flags } = await (await fetch(`${flagdUi}/api/read`)).json();
  flags.intlShippingSlowdown.defaultVariant = variant;
  const res = await fetch(`${flagdUi}/api/write`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ data: { flags } }),
  });
  expect(res.ok).toBe(true);
}

test('with flagd up at start, flags come from flagd on the first attempt', async () => {
  expect(plain(docker(['logs', 'shipping']))).toMatch(/Connected to flagd attempt=1/);
  const since = new Date(Date.now() - 1000);
  expect((await post('/ship-order')).status).toBe(200);
  const logs = plain(await pollUntil(() => (logsSince('shipping', since).includes('feature_flag_variant') ? logsSince('shipping', since) : undefined), 10_000, 500) ?? '');
  expect(logs).toMatch(/feature_flag_variant="off"/);
  expect(logs).not.toContain('ProviderNotReady');
});

test('with flagd down, shipping starts and serves with default flags', async () => {
  test.setTimeout(180_000);
  docker(['stop', 'flagd'], 60_000);
  const restarts = docker(['inspect', '-f', '{{.RestartCount}}', 'shipping']).trim();
  const restartedAt = new Date(Date.now() - 1000);
  docker(['restart', 'shipping'], 60_000);
  const served = await pollUntil(async () => ((await post('/get-quote')).status === 200 ? true : undefined), 30_000, 1000);
  expect(served).toBe(true);
  expect((await post('/ship-order')).status).toBe(200);
  expect(plain(logsSince('shipping', restartedAt))).toContain('Starting without flagd');
  expect(docker(['inspect', '-f', '{{.State.Running}} {{.RestartCount}}', 'shipping']).trim()).toBe(`true ${restarts}`);
});

test('when flagd comes up later, shipping reads its flags from flagd', async () => {
  test.setTimeout(300_000);
  // flagd-ui rewrites the mounted flag file (as root); it is put back through flagd-ui afterwards.
  const flagFile = path.join(REPO_ROOT, 'src/flagd/demo.flagd.json');
  const originalFlags = readFileSync(flagFile, 'utf8');
  docker(['stop', 'flagd'], 60_000);
  const since = new Date(Date.now() - 1000);
  docker(['restart', 'shipping'], 60_000);
  try {
    expect(await pollUntil(async () => ((await post('/get-quote')).status === 200 ? true : undefined), 30_000, 1000)).toBe(true);
    expect(plain(logsSince('shipping', since))).toContain('Starting without flagd');
    await setIntlSlowdown('5sec');
    docker(['start', 'flagd'], 60_000);
    const connected = await pollUntil(() => (plain(logsSince('shipping', since)).includes('Connected to flagd') ? true : undefined), 90_000, 2000);
    expect(connected).toBe(true);
    await sleep(3000);
    const shipped = await post('/ship-order');
    expect(shipped.status).toBe(200);
    expect(shipped.elapsedMs).toBeGreaterThanOrEqual(5000);
  } finally {
    execFileSync('docker', ['exec', '-i', 'flagd-ui', 'sh', '-c', 'cat > /app/data/demo.flagd.json'], { input: originalFlags });
    docker(['start', 'flagd'], 60_000);
  }
});
