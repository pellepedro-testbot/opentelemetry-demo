import { test, expect } from '@playwright/test';
import { clients, rpc, rpcError, status } from '../support/grpcClients';

const currency = clients.currency();

const supportedCodes = async () =>
  (await rpc<{ currency_codes: string[] }>(currency, 'GetSupportedCurrencies', {})).currency_codes;

test.describe('CurrencyService', () => {
  test('GetSupportedCurrencies order (AC18)', async () => {
    const codes = await supportedCodes();
    expect(codes.length).toBeGreaterThan(0);
    expect(codes).toEqual([...codes].sort());
  });

  test('Convert to XYZ (AC38)', async () => {
    const error = await rpcError(currency, 'Convert', {
      from: { currency_code: 'USD', units: 10, nanos: 0 },
      to_code: 'XYZ',
    });
    expect(error?.code).toBe(status.INVALID_ARGUMENT);
  });

  test('Convert USD to EUR (AC38, R4)', async () => {
    const money = await rpc(currency, 'Convert', {
      from: { currency_code: 'USD', units: 10, nanos: 0 },
      to_code: 'EUR',
    });
    expect(money.currency_code).toBe('EUR');
    expect(money.units + money.nanos / 1e9).toBeGreaterThan(0);
  });

  test('Convert from a made-up code, then to it (AC38)', async () => {
    const code = `QZ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`;
    await rpcError(currency, 'Convert', { from: { currency_code: code, units: 10, nanos: 0 }, to_code: 'EUR' });
    const error = await rpcError(currency, 'Convert', {
      from: { currency_code: 'USD', units: 10, nanos: 0 },
      to_code: code,
    });
    expect(error?.code).toBe(status.INVALID_ARGUMENT);
    expect(await supportedCodes()).not.toContain(code);
  });
});
