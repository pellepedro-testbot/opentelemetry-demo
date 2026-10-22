// Skyramp Testbot test package: Testbot owns and maintains everything in this folder.
import { expect, test } from '@playwright/test';
import { SHIPPING_URL, usAddress } from '../../demo-grpc';

const item = { product_id: 'OLJCESPC7Z', quantity: 1 };
const quote = (request: import('@playwright/test').APIRequestContext, data: object) =>
  request.post(`${SHIPPING_URL}/get-quote`, { data });

test.describe('shipping POST /get-quote', () => {
  test('a United States address is quoted with carrier USPS', async ({ request }) => {
    const res = await quote(request, { items: [item], address: usAddress });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.carrier).toBe('USPS');
    expect(body.cost_usd).toBeTruthy();
  });

  test('a non-US address is quoted with carrier DHL', async ({ request }) => {
    const res = await quote(request, {
      items: [item],
      address: { ...usAddress, country: 'Canada', zip_code: 'K2P1L4' },
    });
    expect(res.status()).toBe(200);
    expect((await res.json()).carrier).toBe('DHL');
  });

  for (const [label, address] of [
    ['lower-case "united states"', { ...usAddress, country: 'united states' }],
    ['abbreviated "US"', { ...usAddress, country: 'US' }],
    ['no address', undefined],
  ] as const) {
    test(`only the exact country "United States" selects USPS: ${label} gets DHL`, async ({ request }) => {
      const res = await quote(request, address ? { items: [item], address } : { items: [item] });
      expect(res.status()).toBe(200);
      expect((await res.json()).carrier).toBe('DHL');
    });
  }

  test('an empty items list is rejected with 400', async ({ request }) => {
    const res = await quote(request, { items: [], address: usAddress });
    expect(res.status()).toBe(400);
  });

  test('a single item of quantity 1 is quoted', async ({ request }) => {
    const res = await quote(request, { items: [item], address: usAddress });
    expect(res.status()).toBe(200);
    expect((await res.json()).cost_usd).toBeTruthy();
  });
});
