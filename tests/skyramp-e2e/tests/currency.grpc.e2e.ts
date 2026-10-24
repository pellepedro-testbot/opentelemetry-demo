import { expect, test } from '@playwright/test';
import { call, callOk, expectStatus, grpc, services, toNanos, usd } from '../support/grpcClients';

const supported = async () =>
  (await callOk<{ currency_codes: string[] }>(services.currency, 'GetSupportedCurrencies', {})).currency_codes;

test.describe('currency service contract', () => {
  test('Pasted text AC18', async () => {
    const codes = await supported();
    expect(codes.length).toBeGreaterThan(0);
    expect(codes).toEqual([...codes].sort());
  });

  test('Pasted text AC38, variant 1', async () => {
    expectStatus(await call(services.currency, 'Convert', { from: usd(10), to_code: 'XXX' }), grpc.status.INVALID_ARGUMENT);
    expect(await supported()).not.toContain('XXX');
  });

  test('Pasted text AC38, variant 2', async () => {
    const money = await callOk<{ currency_code: string; units: number; nanos: number }>(services.currency, 'Convert', {
      from: usd(10),
      to_code: 'EUR',
    });
    expect(money.currency_code).toBe('EUR');
    expect(toNanos(money)).toBeGreaterThan(0);
  });
});
