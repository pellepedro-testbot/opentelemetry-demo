// Skyramp Testbot test package: Testbot owns and maintains everything in this folder.
import { expect, test } from '@playwright/test';
import { currency } from '../../demo-grpc';

test('GetSupportedCurrencies returns codes in alphabetical order with none lost', async ({ request }) => {
  const { response, error } = await currency('GetSupportedCurrencies', {});
  expect(error).toBeUndefined();
  const codes: string[] = response.currency_codes;
  expect(codes).toEqual([...codes].sort());
  expect(new Set(codes).size).toBe(codes.length);
  expect(codes).toEqual(expect.arrayContaining(['USD', 'EUR']));

  const http = await request.get('/api/currency');
  expect(http.status()).toBe(200);
  expect(await http.json()).toEqual(codes);
});
