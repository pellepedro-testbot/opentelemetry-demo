import { expect, test } from '@playwright/test';
import { addItem, call, expectStatus, getCartItems, grpc, newUserId, services } from '../support/grpcClients';

const A = 'OLJCESPC7Z';
const B = 'L9ECAV7KIM';

test.describe('cart service contract', () => {
  test('Pasted text AC1', async () => {
    expectStatus(await addItem('', A, 1), grpc.status.INVALID_ARGUMENT);

    const cart = await call(services.cart, 'GetCart', { user_id: '' });
    expect(cart.ok && cart.response.items).toEqual([]);
  });

  test('Pasted text AC21, variant 1', async () => {
    expectStatus(await addItem(newUserId(), '', 1), grpc.status.INVALID_ARGUMENT);
  });

  test('Pasted text AC21, variant 2', async () => {
    const userId = newUserId();
    expectStatus(await call(services.cart, 'AddItem', { user_id: userId }), grpc.status.INVALID_ARGUMENT);
    expect(await getCartItems(userId)).toEqual([]);
  });

  test('Pasted text AC41', async () => {
    const userId = newUserId();
    await addItem(userId, A, 2);
    expectStatus(await addItem(userId, A, 0), grpc.status.INVALID_ARGUMENT);
    expect(await getCartItems(userId)).toEqual([{ product_id: A, quantity: 2 }]);
  });

  test('Pasted text AC17, variant 1', async () => {
    const userId = newUserId();
    await addItem(userId, A, 3);
    expect((await addItem(userId, A, -3)).ok).toBe(true);
    expect((await getCartItems(userId)).map(i => i.product_id)).not.toContain(A);
  });

  test('Pasted text AC17, variant 2', async () => {
    const userId = newUserId();
    await addItem(userId, A, 2);
    await addItem(userId, B, 1);
    await addItem(userId, A, -5);
    expect(await getCartItems(userId)).toEqual([{ product_id: B, quantity: 1 }]);
  });

  test('Pasted text AC17, variant 3', async () => {
    const userId = newUserId();
    await addItem(userId, B, -1);
    expect((await getCartItems(userId)).map(i => i.product_id)).not.toContain(B);
  });

  test('Pasted text AC17, variant 4', async () => {
    const userId = newUserId();
    await addItem(userId, A, 3);
    await addItem(userId, A, -1);
    expect(await getCartItems(userId)).toEqual([{ product_id: A, quantity: 2 }]);
  });

  test('Pasted text AC40, variant 1', async () => {
    const userId = newUserId();
    expect((await addItem(userId, A, 10)).ok).toBe(true);
    expect(await getCartItems(userId)).toEqual([{ product_id: A, quantity: 10 }]);
  });

  test('Pasted text AC40, variant 2', async () => {
    const userId = newUserId();
    expectStatus(await addItem(userId, A, 11), grpc.status.INVALID_ARGUMENT, 'Maximum 10 per product');
    expect(await getCartItems(userId)).toEqual([]);
  });

  test('Pasted text AC40, variant 3', async () => {
    const userId = newUserId();
    await addItem(userId, A, 10);
    expectStatus(await addItem(userId, A, 1), grpc.status.INVALID_ARGUMENT, 'Maximum 10 per product');
    expect(await getCartItems(userId)).toEqual([{ product_id: A, quantity: 10 }]);
  });
});
