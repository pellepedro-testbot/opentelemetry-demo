// Skyramp Testbot test package: Testbot owns and maintains everything in this folder.
import { expect, test } from '@playwright/test';
import { cart, status, uniqueUser } from '../../demo-grpc';

const P = 'OLJCESPC7Z';
const Q = '66VCHSJNUP';

const addItem = (user_id: string, product_id: string, quantity: number) =>
  cart('AddItem', { user_id, item: { product_id, quantity } });

const items = async (user_id: string) => {
  const { response, error } = await cart('GetCart', { user_id });
  expect(error).toBeUndefined();
  return response.items as { product_id: string; quantity: number }[];
};

test.describe('CartService.AddItem input validation', () => {
  test('AddItem with an empty user_id is rejected as INVALID_ARGUMENT and creates no cart', async () => {
    const { error } = await addItem('', P, 1);
    expect(error?.code).toBe(status.INVALID_ARGUMENT);
    expect(await items('')).toEqual([]);
  });

  test('AddItem with user_id absent is rejected as INVALID_ARGUMENT', async () => {
    const { error } = await cart('AddItem', { item: { product_id: P, quantity: 1 } });
    expect(error?.code).toBe(status.INVALID_ARGUMENT);
  });

  test('AddItem with an empty item.product_id is rejected and leaves the cart unchanged', async () => {
    const user = uniqueUser('empty-product');
    const { error } = await addItem(user, '', 1);
    expect(error?.code).toBe(status.INVALID_ARGUMENT);
    expect(await items(user)).toEqual([]);
  });

  test('AddItem with no item at all is rejected as INVALID_ARGUMENT', async () => {
    const { error } = await cart('AddItem', { user_id: uniqueUser('no-item') });
    expect(error?.code).toBe(status.INVALID_ARGUMENT);
  });
});

test.describe('CartService.AddItem removes products whose quantity drops to zero or below', () => {
  test('a product brought to exactly 0 is removed and the other product stays', async () => {
    const user = uniqueUser('drop-to-zero');
    await addItem(user, P, 2);
    await addItem(user, Q, 1);
    await addItem(user, P, -2);
    expect(await items(user)).toEqual([{ product_id: Q, quantity: 1 }]);
  });

  test('a product brought below 0 is removed with no negative row left', async () => {
    const user = uniqueUser('drop-below-zero');
    await addItem(user, P, 2);
    await addItem(user, P, -5);
    expect((await items(user)).find(i => i.product_id === P)).toBeUndefined();
  });

  test('adding quantity 0 or a negative quantity for a new product does not put it in the cart', async () => {
    const user = uniqueUser('new-non-positive');
    await addItem(user, P, 0);
    expect((await items(user)).find(i => i.product_id === P)).toBeUndefined();
    await addItem(user, P, -1);
    expect((await items(user)).find(i => i.product_id === P)).toBeUndefined();
  });

  test('a product that stays positive keeps its reduced quantity', async () => {
    const user = uniqueUser('stays-positive');
    await addItem(user, P, 3);
    await addItem(user, P, -1);
    expect(await items(user)).toEqual([{ product_id: P, quantity: 2 }]);
  });

  test('a removed product can be added again without a stale zero row', async () => {
    const user = uniqueUser('remove-readd');
    await addItem(user, P, 2);
    await addItem(user, P, -2);
    await addItem(user, P, 1);
    expect(await items(user)).toEqual([{ product_id: P, quantity: 1 }]);
  });
});
