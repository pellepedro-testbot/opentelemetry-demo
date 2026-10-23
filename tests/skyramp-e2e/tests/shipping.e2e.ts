import { test, expect } from '@playwright/test';
import { shippingUrl } from '../support/serviceAddresses';

const shipping = shippingUrl();

const usAddress = {
  street_address: '1600 Amphitheatre Parkway',
  city: 'Mountain View',
  state: 'CA',
  country: 'United States',
  zip_code: '94043',
};
const oneItem = [{ product_id: 'OLJCESPC7Z', quantity: 1 }];

test.describe('shipping POST /get-quote', () => {
  test('quotes carrier USPS for United States (AC4)', async ({ request }) => {
    const response = await request.post(`${shipping}/get-quote`, { data: { items: oneItem, address: usAddress } });
    expect(response.status()).toBe(200);
    expect((await response.json()).carrier).toBe('USPS');
  });

  for (const country of ['Canada', 'USA']) {
    test(`quotes carrier DHL for "${country}" (AC4)`, async ({ request }) => {
      const response = await request.post(`${shipping}/get-quote`, {
        data: { items: oneItem, address: { ...usAddress, country } },
      });
      expect(response.status()).toBe(200);
      expect((await response.json()).carrier).toBe('DHL');
    });
  }

  test('quotes carrier DHL when no address is given (AC4)', async ({ request }) => {
    const response = await request.post(`${shipping}/get-quote`, { data: { items: oneItem } });
    expect(response.status()).toBe(200);
    expect((await response.json()).carrier).toBe('DHL');
  });

  test('answers 400 for an empty items list (AC8)', async ({ request }) => {
    const response = await request.post(`${shipping}/get-quote`, { data: { items: [], address: usAddress } });
    expect(response.status()).toBe(400);
  });

  test('is free for exactly 10 units (AC27)', async ({ request }) => {
    const response = await request.post(`${shipping}/get-quote`, {
      data: { items: [{ product_id: 'OLJCESPC7Z', quantity: 10 }], address: usAddress },
    });
    expect((await response.json()).cost_usd).toMatchObject({ units: 0, nanos: 0 });
  });

  test('is free for 50 units split across items (AC27)', async ({ request }) => {
    const response = await request.post(`${shipping}/get-quote`, {
      data: {
        items: [
          { product_id: 'OLJCESPC7Z', quantity: 25 },
          { product_id: '66VCHSJNUP', quantity: 25 },
        ],
        address: usAddress,
      },
    });
    expect((await response.json()).cost_usd).toMatchObject({ units: 0, nanos: 0 });
  });

  for (const quantity of [9, 51]) {
    test(`charges for ${quantity} units (AC27)`, async ({ request }) => {
      const response = await request.post(`${shipping}/get-quote`, {
        data: { items: [{ product_id: 'OLJCESPC7Z', quantity }], address: usAddress },
      });
      const { units, nanos } = (await response.json()).cost_usd;
      expect(units > 0 || nanos > 0).toBe(true);
    });
  }

  test('answers 400 when one item has quantity 0 (AC28)', async ({ request }) => {
    const response = await request.post(`${shipping}/get-quote`, {
      data: {
        items: [
          { product_id: 'OLJCESPC7Z', quantity: 1 },
          { product_id: '66VCHSJNUP', quantity: 0 },
        ],
        address: usAddress,
      },
    });
    expect(response.status()).toBe(400);
  });

  test('reports zone domestic for United States (AC50)', async ({ request }) => {
    const response = await request.post(`${shipping}/get-quote`, { data: { items: oneItem, address: usAddress } });
    expect((await response.json()).zone).toBe('domestic');
  });

  for (const country of ['Canada', 'USA', null]) {
    test(`reports zone international for ${country ?? 'a missing address'} (AC50)`, async ({ request }) => {
      const data = country ? { items: oneItem, address: { ...usAddress, country } } : { items: oneItem };
      const response = await request.post(`${shipping}/get-quote`, { data });
      expect((await response.json()).zone).toBe('international');
    });
  }
});

test.describe('shipping POST /ship-order', () => {
  test('answers 400 when the address is missing (AC48)', async ({ request }) => {
    const response = await request.post(`${shipping}/ship-order`, { data: { items: oneItem } });
    expect(response.status()).toBe(400);
  });

  test('still ships an order with an address (AC48)', async ({ request }) => {
    const response = await request.post(`${shipping}/ship-order`, { data: { items: oneItem, address: usAddress } });
    expect(response.status()).toBe(200);
    expect((await response.json()).tracking_id).toBeTruthy();
  });
});
