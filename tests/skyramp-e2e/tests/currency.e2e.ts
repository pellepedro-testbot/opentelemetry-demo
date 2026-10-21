// Currency: conversion through euros, code normalization, unknown codes, and
// when its telemetry is exported.
import { expect, test } from '@playwright/test';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { unary } from '../grpc-clients';
import { waitForServiceSpans } from '../jaeger';
import { PROXY_URL, REPO_ROOT, docker, newTraceId, pollUntil, recreateService, traceparent } from '../stack';

interface Money {
  currency_code: string;
  units: number;
  nanos: number;
}

/** The EUR rates the service is built with (units of the currency per euro). */
function eurRate(code: string): number {
  const source = readFileSync(path.join(REPO_ROOT, 'src/currency/src/server.cpp'), 'utf8');
  const match = source.match(new RegExp(`\\{"${code}",\\s*([0-9.]+)\\}`));
  if (!match) throw new Error(`no rate for ${code}`);
  return Number(match[1]);
}

const amount = (m: Money) => m.units + m.nanos / 1e9;

async function convert(from: Money, toCode: string, metadata: Record<string, string> = {}) {
  return unary<Money>('CurrencyService', 'Convert', { from, to_code: toCode }, metadata);
}

async function converted(from: Money, toCode: string): Promise<Money> {
  const res = await convert(from, toCode);
  expect(res.error, `${from.currency_code} -> ${toCode}`).toBeUndefined();
  return res.response!;
}

test.describe('conversion through euros', () => {
  test('between two non-euro currencies the amount goes through EUR', async () => {
    const usd100 = { currency_code: 'USD', units: 100, nanos: 0 };
    const jpy = await converted(usd100, 'JPY');
    expect(jpy.currency_code).toBe('JPY');
    expect(amount(jpy)).toBeCloseTo((100 / eurRate('USD')) * eurRate('JPY'), 2);
    const cad = await converted(usd100, 'CAD');
    expect(amount(cad)).toBeCloseTo((100 / eurRate('USD')) * eurRate('CAD'), 2);
  });

  test('from EUR the amount is multiplied by the target rate', async () => {
    const usd = await converted({ currency_code: 'EUR', units: 10, nanos: 0 }, 'USD');
    expect(amount(usd)).toBeCloseTo(10 * eurRate('USD'), 2);
  });

  test('EUR to USD and USD to JPY use the EUR-quoted rates', async () => {
    expect(amount(await converted({ currency_code: 'EUR', units: 10, nanos: 0 }, 'USD'))).toBeCloseTo(10 * eurRate('USD'), 2);
    expect(amount(await converted({ currency_code: 'USD', units: 100, nanos: 0 }, 'JPY'))).toBeCloseTo(
      (100 / eurRate('USD')) * eurRate('JPY'),
      2
    );
  });

  test('to EUR the amount is divided by the source rate', async () => {
    const eur = await converted({ currency_code: 'USD', units: 113, nanos: 500000000 }, 'EUR');
    expect(eur.currency_code).toBe('EUR');
    expect(amount(eur)).toBeCloseTo(113.5 / eurRate('USD'), 2);
  });

  test('converting to the same currency returns the amount unchanged', async () => {
    expect(await converted({ currency_code: 'USD', units: 12, nanos: 340000000 }, 'USD')).toEqual({
      currency_code: 'USD',
      units: 12,
      nanos: 340000000,
    });
  });

  test('codes are matched in upper case without surrounding spaces', async () => {
    const reference = await converted({ currency_code: 'USD', units: 50, nanos: 0 }, 'EUR');
    const padded = await converted({ currency_code: ' usd ', units: 50, nanos: 0 }, 'eur');
    expect(padded).toEqual(reference);
    expect(padded.currency_code).toBe('EUR');
  });

  test('an unknown currency code is rejected with INVALID_ARGUMENT', async () => {
    const to = await convert({ currency_code: 'USD', units: 1, nanos: 0 }, 'XYZ');
    expect(to.error?.code).toBe(3);
    const from = await convert({ currency_code: 'XYZ', units: 1, nanos: 0 }, 'USD');
    expect(from.error?.code).toBe(3);
  });

  test('the storefront does not price products in an unknown currency', async ({ request }) => {
    const res = await request.get(`${PROXY_URL}/api/products?currencyCode=XYZ`);
    expect(res.status()).not.toBe(200);
  });

  test('repeated conversions of a pair give the same result', async () => {
    const first = await converted({ currency_code: 'USD', units: 100, nanos: 0 }, 'JPY');
    for (let i = 0; i < 9; i++) {
      expect(await converted({ currency_code: 'USD', units: 100, nanos: 0 }, 'JPY')).toEqual(first);
    }
  });
});

test.describe('currency telemetry export', () => {
  const startupLine = () => docker(['logs', 'currency']).match(/Telemetry export: (\w+)/)?.[1];

  test('by default the service exports immediately and says so at startup', async () => {
    expect(startupLine()).toBe('immediate');
  });

  test('a conversion span is in Jaeger within three seconds', async () => {
    const traceId = newTraceId();
    const res = await convert({ currency_code: 'USD', units: 5, nanos: 0 }, 'EUR', { traceparent: traceparent(traceId) });
    expect(res.error).toBeUndefined();
    const spans = await waitForServiceSpans(traceId, 'currency', 3_000);
    expect(spans.length).toBeGreaterThan(0);
  });

  test('CURRENCY_TELEMETRY_EXPORT=batch, in any case, selects batch export', async () => {
    test.setTimeout(240_000);
    try {
      recreateService('currency', { CURRENCY_TELEMETRY_EXPORT: 'Batch' });
      expect(await pollUntil(() => startupLine(), 60_000)).toBe('batch');
      recreateService('currency', { CURRENCY_TELEMETRY_EXPORT: 'sometimes' });
      expect(await pollUntil(() => startupLine(), 60_000)).toBe('immediate');
    } finally {
      recreateService('currency');
      await pollUntil(async () => ((await convert({ currency_code: 'USD', units: 1, nanos: 0 }, 'EUR')).response ? true : undefined), 60_000);
    }
  });
});
