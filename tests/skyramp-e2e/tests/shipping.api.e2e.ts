import { expect, test } from '@playwright/test';

const SHIPPING = process.env.SHIPPING_ADDR || 'http://shipping:50050';

const address = (country: string) => ({
  street_address: '1600 Amphitheatre Parkway',
  city: 'Mountain View',
  state: 'CA',
  country,
  zip_code: '94043',
});

const item = (quantity: number, product_id = 'OLJCESPC7Z') => ({ product_id, quantity });

const isFree = (body: any) => Number(body.cost_usd.units) === 0 && Number(body.cost_usd.nanos) === 0;

test.describe('shipping quote endpoint', () => {
  const quote = async (request: any, data: object) => {
    const response = await request.post(`${SHIPPING}/get-quote`, { data });
    return { status: response.status(), body: response.ok() ? await response.json() : await response.text() };
  };

  test('Pasted text AC4 and AC50, variant 1', async ({ request }) => {
    const { status, body } = await quote(request, { items: [item(1)], address: address('United States') });
    expect(status).toBe(200);
    expect(body.carrier).toBe('USPS');
    expect(body.zone).toBe('domestic');
  });

  const expectInternational = async (request: any, country: string) => {
    const { status, body } = await quote(request, { items: [item(1)], address: address(country) });
    expect(status).toBe(200);
    expect(body.carrier).toBe('DHL');
    expect(body.zone).toBe('international');
  };

  test('Pasted text AC4 and AC50, variant 2', async ({ request }) => {
    await expectInternational(request, 'Canada');
  });

  test('Pasted text AC4 and AC50, variant 3', async ({ request }) => {
    await expectInternational(request, 'Germany');
  });

  test('Pasted text AC4 and AC50, variant 4', async ({ request }) => {
    await expectInternational(request, 'USA');
  });

  test('Pasted text AC4 and AC50, variant 5', async ({ request }) => {
    const { status, body } = await quote(request, { items: [item(1)] });
    expect(status).toBe(200);
    expect(body.carrier).toBe('DHL');
    expect(body.zone).toBe('international');
  });

  test('Pasted text AC8', async ({ request }) => {
    expect((await quote(request, { items: [], address: address('United States') })).status).toBe(400);
  });

  test('Pasted text AC28, variant 1', async ({ request }) => {
    expect((await quote(request, { items: [item(0)], address: address('United States') })).status).toBe(400);
  });

  test('Pasted text AC28, variant 2', async ({ request }) => {
    const data = { items: [item(2), item(0, 'L9ECAV7KIM')], address: address('United States') };
    expect((await quote(request, data)).status).toBe(400);
  });

  test('Pasted text AC27, variant 1', async ({ request }) => {
    const { status, body } = await quote(request, { items: [item(9)], address: address('United States') });
    expect(status).toBe(200);
    expect(isFree(body)).toBe(false);
  });

  test('Pasted text AC27, variant 2', async ({ request }) => {
    const { status, body } = await quote(request, { items: [item(10)], address: address('United States') });
    expect(status).toBe(200);
    expect(isFree(body)).toBe(true);
  });

  test('Pasted text AC27, variant 3', async ({ request }) => {
    const items = ['OLJCESPC7Z', 'L9ECAV7KIM', '66VCHSJNUP', '2ZYFJ3GM2N', 'HQTGWGPNH4'].map(id => item(10, id));
    const { status, body } = await quote(request, { items, address: address('United States') });
    expect(status).toBe(200);
    expect(isFree(body)).toBe(true);
  });

  test('Pasted text AC27, variant 4', async ({ request }) => {
    const items = [item(10), item(10, 'L9ECAV7KIM'), item(10, '66VCHSJNUP'), item(10, '2ZYFJ3GM2N'), item(11, 'HQTGWGPNH4')];
    const { status, body } = await quote(request, { items, address: address('United States') });
    expect(status).toBe(200);
    expect(isFree(body)).toBe(false);
  });
});

test.describe('shipping order endpoint', () => {
  test('Pasted text AC48, variant 1', async ({ request }) => {
    const response = await request.post(`${SHIPPING}/ship-order`, { data: { items: [item(1)] } });
    expect(response.status()).toBe(400);
  });

  test('Pasted text AC48, variant 2', async ({ request }) => {
    const response = await request.post(`${SHIPPING}/ship-order`, {
      data: { items: [item(1)], address: address('United States') },
    });
    expect(response.status()).toBe(200);
    expect((await response.json()).tracking_id).toBeTruthy();
  });
});
