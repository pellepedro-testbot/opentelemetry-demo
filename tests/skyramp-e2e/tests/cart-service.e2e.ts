import { randomUUID } from 'node:crypto';
import { expect, test } from '@playwright/test';
import { Status, cart, expectGrpcError } from '../support/grpc-clients';

const addItem = (userId: string, productId: string, quantity: number) =>
  cart.addItem({ userId, item: { productId, quantity } });

const quantities = async (userId: string): Promise<Record<string, number>> => {
  const { items } = await cart.getCart({ userId });
  return Object.fromEntries(items.map((i: { productId: string; quantity: number }) => [i.productId, i.quantity]));
};

test.describe('CartService on the Valkey store', () => {
  test('a negative delta that brings a product to exactly 0 removes it', async () => {
    const userId = randomUUID();
    await addItem(userId, 'OLJCESPC7Z', 3);
    await addItem(userId, 'OLJCESPC7Z', -3);
    expect(await quantities(userId)).not.toHaveProperty('OLJCESPC7Z');
  });

  test('a negative delta that brings a product below 0 removes it and keeps the others', async () => {
    const userId = randomUUID();
    await addItem(userId, 'L9ECAV7KIM', 2);
    await addItem(userId, 'HQTGWGPNH4', 1);
    await addItem(userId, 'L9ECAV7KIM', -5);
    expect(await quantities(userId)).toEqual({ HQTGWGPNH4: 1 });
  });

  test('a negative delta for a product not in the cart adds nothing', async () => {
    const userId = randomUUID();
    await addItem(userId, 'HQTGWGPNH4', -2);
    expect(await quantities(userId)).not.toHaveProperty('HQTGWGPNH4');
  });

  test('rejects an AddItem that would bring a product above 10 units', async () => {
    const userId = randomUUID();
    await addItem(userId, 'OLJCESPC7Z', 3);
    await addItem(userId, 'OLJCESPC7Z', 7);
    await expectGrpcError(addItem(userId, 'OLJCESPC7Z', 1), Status.INVALID_ARGUMENT, 'Maximum 10 per product');
    expect(await quantities(userId)).toEqual({ OLJCESPC7Z: 10 });
  });

  test('accepts exactly 10 units of one product', async () => {
    const userId = randomUUID();
    await addItem(userId, '66VCHSJNUP', 10);
    expect(await quantities(userId)).toEqual({ '66VCHSJNUP': 10 });
  });

  test('rejects a single AddItem of 11 or int32 max for a new product and stores nothing', async () => {
    const userId = randomUUID();
    await expectGrpcError(addItem(userId, '66VCHSJNUP', 11), Status.INVALID_ARGUMENT);
    await expectGrpcError(addItem(userId, '66VCHSJNUP', 2147483647), Status.INVALID_ARGUMENT);
    expect(await quantities(userId)).not.toHaveProperty('66VCHSJNUP');
  });

  test('a rejected AddItem leaves the stored quantity unchanged', async () => {
    const userId = randomUUID();
    await addItem(userId, 'OLJCESPC7Z', 10);
    await expectGrpcError(addItem(userId, 'OLJCESPC7Z', 1), Status.INVALID_ARGUMENT);
    expect((await quantities(userId)).OLJCESPC7Z).toBe(10);
    await addItem(userId, 'OLJCESPC7Z', -4);
    expect((await quantities(userId)).OLJCESPC7Z).toBe(6);
    await expectGrpcError(addItem(userId, 'OLJCESPC7Z', 5), Status.INVALID_ARGUMENT);
    expect((await quantities(userId)).OLJCESPC7Z).toBe(6);
  });

  test('GetCart returns updated_at set by AddItem', async () => {
    const userId = randomUUID();
    const now = Date.now();
    await addItem(userId, 'OLJCESPC7Z', 1);
    const { updatedAt } = await cart.getCart({ userId });
    expect(Math.abs(updatedAt - now)).toBeLessThan(60_000);
  });

  test('EmptyCart sets updated_at', async () => {
    const userId = randomUUID();
    await addItem(userId, 'OLJCESPC7Z', 1);
    await new Promise(resolve => setTimeout(resolve, 1100));
    const t1 = Date.now();
    await cart.emptyCart({ userId });
    const { items, updatedAt } = await cart.getCart({ userId });
    expect(items).toEqual([]);
    expect(updatedAt).toBeGreaterThanOrEqual(t1 - 2000);
  });

  test('a cart never written has updated_at 0', async () => {
    expect((await cart.getCart({ userId: randomUUID() })).updatedAt).toBe(0);
  });
});
