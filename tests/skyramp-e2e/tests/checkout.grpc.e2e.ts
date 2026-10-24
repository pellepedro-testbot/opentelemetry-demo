import { expect, test } from '@playwright/test';
import {
  addItem,
  call,
  expectStatus,
  getCartItems,
  grpc,
  newUserId,
  placeOrderRequest,
  services,
  usAddress,
} from '../support/grpcClients';

const PRODUCT = 'OLJCESPC7Z';

const userWithItem = async () => {
  const userId = newUserId();
  await addItem(userId, PRODUCT, 1);
  return userId;
};

const placeOrder = (request: object) => call(services.checkout, 'PlaceOrder', request);

const expectOrderPlaced = (result: Awaited<ReturnType<typeof placeOrder>>) => {
  expect(result.ok ? '' : `${grpc.status[result.error.code]} ${result.error.details}`).toBe('');
  expect(result.ok && result.response.order.order_id).toBeTruthy();
};

test.describe('CheckoutService.PlaceOrder', () => {
  test('rejects an empty user_id with INVALID_ARGUMENT', async () => {
    expectStatus(await placeOrder(placeOrderRequest('')), grpc.status.INVALID_ARGUMENT);
  });

  test('rejects a 4-digit US zip code', async () => {
    const userId = await userWithItem();
    expectStatus(
      await placeOrder(placeOrderRequest(userId, { address: usAddress({ zip_code: '1234' }) })),
      grpc.status.INVALID_ARGUMENT,
      'Invalid zip code'
    );
  });

  for (const zip of ['123456', '9404a']) {
    test(`rejects the US zip code ${zip}`, async () => {
      const userId = await userWithItem();
      expectStatus(
        await placeOrder(placeOrderRequest(userId, { address: usAddress({ zip_code: zip }) })),
        grpc.status.INVALID_ARGUMENT,
        'Invalid zip code'
      );
    });
  }

  test('places an order for a 5-digit US zip code', async () => {
    expectOrderPlaced(await placeOrder(placeOrderRequest(await userWithItem())));
  });

  test('does not apply the US zip rule to Canada', async () => {
    const userId = await userWithItem();
    expectOrderPlaced(
      await placeOrder(placeOrderRequest(userId, { address: usAddress({ country: 'Canada', zip_code: 'K1A 0B1' }) }))
    );
  });

  test('rejects an email without @', async () => {
    const userId = await userWithItem();
    expectStatus(
      await placeOrder(placeOrderRequest(userId, { email: 'someone.example.com' })),
      grpc.status.INVALID_ARGUMENT
    );
  });

  test('rejects an empty email', async () => {
    const userId = await userWithItem();
    expectStatus(await placeOrder(placeOrderRequest(userId, { email: '' })), grpc.status.INVALID_ARGUMENT);
  });

  test('rejects shipping to Germany', async () => {
    const userId = await userWithItem();
    expectStatus(
      await placeOrder(placeOrderRequest(userId, { address: usAddress({ country: 'Germany' }) })),
      grpc.status.INVALID_ARGUMENT,
      'We do not ship to Germany'
    );
  });

  for (const country of ['USA', 'Canada']) {
    test(`places an order for country ${country}`, async () => {
      const userId = await userWithItem();
      expectOrderPlaced(await placeOrder(placeOrderRequest(userId, { address: usAddress({ country }) })));
    });
  }

  test('matches the country exactly: lowercase united states is rejected', async () => {
    const userId = await userWithItem();
    expectStatus(
      await placeOrder(placeOrderRequest(userId, { address: usAddress({ country: 'united states' }) })),
      grpc.status.INVALID_ARGUMENT,
      'We do not ship to united states'
    );
  });

  test('rejects an empty country', async () => {
    const userId = await userWithItem();
    expectStatus(
      await placeOrder(placeOrderRequest(userId, { address: usAddress({ country: '' }) })),
      grpc.status.INVALID_ARGUMENT
    );
  });

  test('rejects a request without credit_card and keeps the cart', async () => {
    const userId = await userWithItem();
    expectStatus(
      await placeOrder(placeOrderRequest(userId, { credit_card: undefined })),
      grpc.status.INVALID_ARGUMENT
    );
    expect(await getCartItems(userId)).toEqual([{ product_id: PRODUCT, quantity: 1 }]);
  });
});
