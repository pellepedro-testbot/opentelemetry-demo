// Contract checks against the shipping service's POST /get-quote.
// SHIPPING_URL overrides the compose address when running from the host.
import { expect, test } from '@playwright/test';

const GET_QUOTE_URL = `${process.env.SHIPPING_URL ?? 'http://shipping:50050'}/get-quote`;
const ONE_ITEM = [{ product_id: 'OLJCESPC7Z', quantity: 1 }];
const addressIn = (country: string) => ({ street_address: '1 A St', city: 'X', state: 'CA', country, zip_code: '94043' });

test.describe('shipping POST /get-quote', () => {
  test('AC4: a United States address is quoted with carrier USPS and still carries cost_usd', async ({ request }) => {
    const res = await request.post(GET_QUOTE_URL, { data: { items: ONE_ITEM, address: addressIn('United States') } });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.carrier).toBe('USPS');
    expect(body.cost_usd.currency_code).toBe('USD');
    expect(typeof body.cost_usd.units).toBe('number');
    expect(typeof body.cost_usd.nanos).toBe('number');
  });

  for (const country of ['Germany', 'USA', 'US', 'united states']) {
    test(`AC4: country ${JSON.stringify(country)} is quoted with carrier DHL`, async ({ request }) => {
      const res = await request.post(GET_QUOTE_URL, { data: { items: ONE_ITEM, address: addressIn(country) } });
      expect(res.status()).toBe(200);
      expect((await res.json()).carrier).toBe('DHL');
    });
  }

  for (const [label, data] of [
    ['omitted', { items: ONE_ITEM }],
    ['null', { items: ONE_ITEM, address: null }],
  ] as const) {
    test(`AC4: an ${label} address is quoted with carrier DHL`, async ({ request }) => {
      const res = await request.post(GET_QUOTE_URL, { data });
      expect(res.status()).toBe(200);
      expect((await res.json()).carrier).toBe('DHL');
    });
  }

  for (const [label, data] of [
    ['with a US address', { items: [], address: addressIn('United States') }],
    ['without an address', { items: [] }],
  ] as const) {
    test(`AC8: empty items ${label} returns 400`, async ({ request }) => {
      const res = await request.post(GET_QUOTE_URL, { data });
      expect(res.status()).toBe(400);
    });
  }

  test('AC8: exactly one item is still quoted with cost_usd and carrier', async ({ request }) => {
    const res = await request.post(GET_QUOTE_URL, { data: { items: ONE_ITEM } });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(typeof body.cost_usd.units).toBe('number');
    expect(typeof body.cost_usd.nanos).toBe('number');
    expect(body.carrier).toEqual(expect.any(String));
  });
});
