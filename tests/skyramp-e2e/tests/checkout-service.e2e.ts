import { randomUUID } from 'node:crypto';
import { expect, test } from '@playwright/test';
import { Status, US_ADDRESS, VALID_CARD, cart, checkout, expectGrpcError, grpcError, toNumber } from '../support/grpc-clients';

const placeOrder = (userId: string, overrides: Record<string, unknown> = {}) =>
  checkout.placeOrder({
    userId,
    userCurrency: 'USD',
    email: 'a@b.com',
    address: US_ADDRESS,
    creditCard: VALID_CARD,
    ...overrides,
  });

const userWith = async (productId: string, quantity: number) => {
  const userId = randomUUID();
  await cart.addItem({ userId, item: { productId, quantity } });
  return userId;
};

const cartQuantities = async (userId: string) =>
  ((await cart.getCart({ userId })).items as { productId: string; quantity: number }[]).map(
    i => `${i.productId}x${i.quantity}`
  );

test.describe('CheckoutService/PlaceOrder against the running services', () => {
  test('Pasted text AC30', async () => {
    for (const [country, zipCode] of [
      ['United States', '94043'],
      ['USA', '94043'],
      ['Canada', 'K1A 0B1'],
    ]) {
      const userId = await userWith('L9ECAV7KIM', 1);
      const response = await placeOrder(userId, { address: { ...US_ADDRESS, country, zipCode } }).catch(e => e);
      expect.soft(response.order?.orderId, `${country}: ${response.details ?? ''}`).toBeTruthy();
    }
  });

  test('Pasted text AC54', async () => {
    const userId = await userWith('9SIQT8TOJO', 2);
    await expectGrpcError(placeOrder(userId), Status.INVALID_ARGUMENT, 'Order exceeds the 5,000 USD limit');
    expect(await cartQuantities(userId)).toEqual(['9SIQT8TOJOx2']);
  });

  test('Pasted text AC54 (2)', async () => {
    const userId = await userWith('9SIQT8TOJO', 2);
    await expectGrpcError(
      placeOrder(userId, { userCurrency: 'EUR' }),
      Status.INVALID_ARGUMENT,
      'Order exceeds the 5,000 USD limit'
    );
  });

  test('Pasted text AC54 (3)', async () => {
    const userId = await userWith('9SIQT8TOJO', 1);
    const { order } = await placeOrder(userId);
    expect(order.orderId).toBeTruthy();
  });

  test('Pasted text AC83', async () => {
    await expectGrpcError(placeOrder(randomUUID()), Status.FAILED_PRECONDITION);
  });

  test('Pasted text AC94', async () => {
    const userId = await userWith('OLJCESPC7Z', 3);
    const { order } = await placeOrder(userId);
    expect(order.items).toHaveLength(1);
    expect(Math.abs(toNumber(order.items[0].cost) - 305.88)).toBeLessThanOrEqual(0.000001);
  });



  test('Pasted text AC7, AC10, AC30 (cart kept after rejections)', async () => {
    const userId = await userWith('L9ECAV7KIM', 1);
    const attempts: [string, Record<string, unknown>, string][] = [
      ['zip 1234', { address: { ...US_ADDRESS, zipCode: '1234' } }, 'Invalid zip code'],
      ['country Mexico', { address: { ...US_ADDRESS, country: 'Mexico' } }, 'We do not ship to Mexico'],
      ['declined card', { creditCard: { ...VALID_CARD, creditCardNumber: '4000-0000-0000-0002' } }, 'Your card was declined.'],
    ];
    for (const [label, overrides, message] of attempts) {
      const error = await grpcError(placeOrder(userId, overrides));
      expect.soft(error.details, label).toContain(message);
      expect.soft(await cartQuantities(userId), label).toEqual(['L9ECAV7KIMx1']);
    }
  });
});
