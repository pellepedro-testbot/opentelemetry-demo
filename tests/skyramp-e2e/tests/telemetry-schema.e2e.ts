// Project convention (AGENTS.md): every new demo attribute or metric is defined
// in the telemetry-schema Weaver registry before code uses it.
import { expect, test } from '@playwright/test';
import { spawnSync } from 'node:child_process';
import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { REPO_ROOT } from '../stack';

const REGISTRY = path.join(REPO_ROOT, 'telemetry-schema');

function registryText(dir: string): string {
  return readdirSync(path.join(REGISTRY, dir))
    .filter(f => f.endsWith('.yaml'))
    .map(f => readFileSync(path.join(REGISTRY, dir, f), 'utf8'))
    .join('\n');
}

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const NEW_ATTRIBUTES = [
  'demo.payment.card_network',
  'demo.payment.outcome',
  'demo.payment.card_hash',
  'demo.cart.count',
  'demo.ad.session_ads.hit',
  'demo.ad.categories.count',
  'demo.product.search.query',
  'demo.email.archive_path',
];
const NEW_METRICS = ['demo.ad.session_ads.entries', 'demo.ad.session_ads.lookups', 'demo.notification.confirmations.archived'];

test('every new attribute is defined in the registry and declared by its service', () => {
  const attributes = registryText('attributes');
  const services = registryText('services');
  for (const name of NEW_ATTRIBUTES) {
    expect.soft(attributes, `definition of ${name}`).toMatch(new RegExp(`key:\\s*${escape(name)}\\s*$`, 'm'));
    expect.soft(services, `service reference to ${name}`).toMatch(new RegExp(`ref:\\s*${escape(name)}\\s*$`, 'm'));
  }
});

test('every new metric is defined in the registry', () => {
  const metrics = registryText('metrics');
  for (const name of NEW_METRICS) {
    expect.soft(metrics, `definition of ${name}`).toMatch(new RegExp(`name:\\s*${escape(name)}\\s*$`, 'm'));
  }
});

test('weaver registry check passes', () => {
  test.setTimeout(300_000);
  const run = spawnSync('docker', ['run', '--rm', '-v', `${REGISTRY}:/home/weaver/registry:ro`, 'otel/weaver:latest', 'registry', 'check', '-r', '/home/weaver/registry'], {
    encoding: 'utf8',
    timeout: 280_000,
  });
  const out = run.stdout + run.stderr;
  expect(run.status, out).toBe(0);
  expect(out).toContain('Weaver Registry Check');
  expect(out).not.toContain('×');
});
