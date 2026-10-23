import { expect, test } from '@playwright/test';
import { Status, currency, expectGrpcError, usd } from '../support/grpc-clients';

const convert = (from: { currencyCode: string; units: number; nanos: number }, toCode: string) =>
  currency.convert({ from, toCode });

test.describe('CurrencyService', () => {
  test('Pasted text AC18', async () => {
    const { currencyCodes } = await currency.getSupportedCurrencies({});
    expect(currencyCodes.length).toBeGreaterThan(1);
    expect(currencyCodes).toEqual([...currencyCodes].sort());
  });

  test('Pasted text AC38', async () => {
    for (const toCode of ['XXX', '', 'eur']) {
      await expectGrpcError(convert(usd(10), toCode), Status.INVALID_ARGUMENT);
    }
  });

  test('Pasted text AC58', async () => {
    for (const currencyCode of ['XXX', '']) {
      await expectGrpcError(convert({ currencyCode, units: 10, nanos: 0 }, 'EUR'), Status.INVALID_ARGUMENT);
    }
  });

  test('Pasted text AC78', async () => {
    await expectGrpcError(convert(usd(-1, 0), 'EUR'), Status.INVALID_ARGUMENT);
    await expectGrpcError(convert(usd(0, -1), 'EUR'), Status.INVALID_ARGUMENT);
  });

  test('Pasted text AC78 (2)', async () => {
    expect((await convert(usd(0, 0), 'EUR')).currencyCode).toBe('EUR');
    const converted = await convert(usd(10, 0), 'EUR');
    expect(converted.currencyCode).toBe('EUR');
    expect(Number(converted.units) + converted.nanos / 1e9).toBeGreaterThan(0);
  });

  test('Pasted text AC98', async () => {
    await expectGrpcError(convert(usd(1, 1_000_000_000), 'EUR'), Status.INVALID_ARGUMENT);
    await expectGrpcError(convert(usd(1, -1_000_000_000), 'EUR'), Status.INVALID_ARGUMENT);
  });

  test('Pasted text AC98 (2)', async () => {
    expect((await convert(usd(1, 999_999_999), 'EUR')).currencyCode).toBe('EUR');
  });
});
