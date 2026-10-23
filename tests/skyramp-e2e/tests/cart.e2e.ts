import { test, expect } from '@playwright/test';
import { randomUUID } from 'node:crypto';
import { clients, rpc, rpcError, status } from '../support/grpcClients';

const cart = clients.cart();

const addItem = (user_id: string, product_id: string, quantity: number) =>
  rpc(cart, 'AddItem', { user_id, item: { product_id, quantity } });
const cartItems = async (user_id: string) =>
  (await rpc<{ items: { product_id: string; quantity: number }[] }>(cart, 'GetCart', { user_id })).items;

test.describe('CartService AddItem', () => {
  let userId: string;
  test.beforeEach(() => {
    userId = randomUUID();
  });
  test.afterEach(async () => {
    await rpc(cart, 'EmptyCart', { user_id: userId });
  });

  test('AddItem with a blank user (AC1)', async () => {
    const error = await rpcError(cart, 'AddItem', { user_id: '', item: { product_id: 'OLJCESPC7Z', quantity: 1 } });
    expect(error?.code).toBe(status.INVALID_ARGUMENT);
  });

  test('AddItem with a user stores the line (AC1)', async () => {
    await addItem(userId, 'OLJCESPC7Z', 1);
    expect(await cartItems(userId)).toEqual([{ product_id: 'OLJCESPC7Z', quantity: 1 }]);
  });

  test('AddItem with a blank product (AC21)', async () => {
    const error = await rpcError(cart, 'AddItem', { user_id: userId, item: { product_id: '', quantity: 1 } });
    expect(error?.code).toBe(status.INVALID_ARGUMENT);
  });

  test('AddItem without an item (AC21)', async () => {
    const error = await rpcError(cart, 'AddItem', { user_id: userId });
    expect(error?.code).toBe(status.INVALID_ARGUMENT);
  });

  test('AddItem with zero units (AC41)', async () => {
    const error = await rpcError(cart, 'AddItem', { user_id: userId, item: { product_id: 'OLJCESPC7Z', quantity: 0 } });
    expect(error?.code).toBe(status.INVALID_ARGUMENT);
    expect(await cartItems(userId)).toEqual([]);
  });

  test('refused AddItem calls keep the stored lines (AC41, AC21)', async () => {
    await addItem(userId, 'OLJCESPC7Z', 2);
    const zeroQuantity = await rpcError(cart, 'AddItem', {
      user_id: userId,
      item: { product_id: 'OLJCESPC7Z', quantity: 0 },
    });
    const emptyProduct = await rpcError(cart, 'AddItem', { user_id: userId, item: { product_id: '', quantity: 1 } });
    expect(zeroQuantity?.code).toBe(status.INVALID_ARGUMENT);
    expect(emptyProduct?.code).toBe(status.INVALID_ARGUMENT);
    expect(await cartItems(userId)).toEqual([{ product_id: 'OLJCESPC7Z', quantity: 2 }]);
  });

  test('negative AddItem reaching zero clears the line (AC17)', async () => {
    await addItem(userId, 'L9ECAV7KIM', 3);
    await addItem(userId, 'L9ECAV7KIM', -3);
    expect((await cartItems(userId)).map(i => i.product_id)).not.toContain('L9ECAV7KIM');
  });

  test('negative AddItem past zero clears only that line (AC17)', async () => {
    await addItem(userId, 'L9ECAV7KIM', 2);
    await addItem(userId, 'LS4PSXUNUM', 1);
    await addItem(userId, 'L9ECAV7KIM', -5);
    expect(await cartItems(userId)).toEqual([{ product_id: 'LS4PSXUNUM', quantity: 1 }]);
  });

  test('AddItem from 8 by 3 is refused and the line stays at 8 (AC40)', async () => {
    await addItem(userId, 'L9ECAV7KIM', 8);
    const error = await rpcError(cart, 'AddItem', { user_id: userId, item: { product_id: 'L9ECAV7KIM', quantity: 3 } });
    expect(error).not.toBeNull();
    expect(await cartItems(userId)).toEqual([{ product_id: 'L9ECAV7KIM', quantity: 8 }]);
  });

  test('AddItem of 11 into an empty cart is refused (AC40)', async () => {
    const error = await rpcError(cart, 'AddItem', {
      user_id: userId,
      item: { product_id: 'L9ECAV7KIM', quantity: 11 },
    });
    expect(error).not.toBeNull();
    expect(await cartItems(userId)).toEqual([]);
  });

  test('AddItem from 8 by 2 lands on 10 (AC40)', async () => {
    await addItem(userId, 'L9ECAV7KIM', 8);
    await addItem(userId, 'L9ECAV7KIM', 2);
    expect(await cartItems(userId)).toEqual([{ product_id: 'L9ECAV7KIM', quantity: 10 }]);
  });

  test('AddItem of int32 max onto a line of 5 is refused and the line kept (AC40)', async () => {
    await addItem(userId, 'L9ECAV7KIM', 5);
    const error = await rpcError(cart, 'AddItem', {
      user_id: userId,
      item: { product_id: 'L9ECAV7KIM', quantity: 2147483647 },
    });
    expect(error?.code).toBe(status.INVALID_ARGUMENT);
    expect(await cartItems(userId)).toEqual([{ product_id: 'L9ECAV7KIM', quantity: 5 }]);
  });
});
