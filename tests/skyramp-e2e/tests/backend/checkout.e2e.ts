// Skyramp Testbot test package: Testbot owns and maintains everything in this folder.
import { expect, test } from '@playwright/test';
import { cart, checkout, status, uniqueUser, usAddress, validCard } from '../../demo-grpc';

const PRODUCT = 'OLJCESPC7Z';

const userWithItem = async (label: string) => {
  const user_id = uniqueUser(label);
  const { error } = await cart('AddItem', { user_id, item: { product_id: PRODUCT, quantity: 1 } });
  expect(error).toBeUndefined();
  return user_id;
};

const placeOrder = (overrides: Record<string, unknown>) =>
  checkout('PlaceOrder', {
    user_id: 'unused',
    user_currency: 'USD',
    email: 'someone@example.com',
    address: usAddress,
    credit_card: validCard,
    ...overrides,
  });

const cartItemCount = async (user_id: string) => (await cart('GetCart', { user_id })).response.items.length;

test.describe('CheckoutService.PlaceOrder validation', () => {
  test('an empty user_id is rejected as INVALID_ARGUMENT with no order', async () => {
    const { response, error } = await placeOrder({ user_id: '' });
    expect(error?.code).toBe(status.INVALID_ARGUMENT);
    expect(response?.order?.order_id).toBeFalsy();
  });

  for (const zip of ['1234', '940431', '9404A', '94043-1234', '']) {
    test(`a United States zip code "${zip}" that is not 5 digits is rejected and the cart is kept`, async () => {
      const user_id = await userWithItem('bad-zip');
      const { error } = await placeOrder({ user_id, address: { ...usAddress, zip_code: zip } });
      expect(error?.code).toBe(status.INVALID_ARGUMENT);
      expect(error?.details).toBe('Invalid zip code');
      expect(await cartItemCount(user_id)).toBe(1);
    });
  }

  test('a United States 5 digit zip code places the order', async () => {
    const user_id = await userWithItem('good-zip');
    const { response, error } = await placeOrder({ user_id });
    expect(error).toBeUndefined();
    expect(response.order.order_id).not.toBe('');
  });

  test('a non-US country with a non 5 digit zip is not rejected for the zip', async () => {
    const user_id = await userWithItem('canada-zip');
    const { response, error } = await placeOrder({
      user_id,
      address: { street_address: '150 Elgin St', city: 'Ottawa', state: 'ON', country: 'Canada', zip_code: 'K2P1L4' },
    });
    expect(error).toBeUndefined();
    expect(response.order.order_id).not.toBe('');
  });

  for (const email of ['someone.example.com', '']) {
    test(`an email "${email}" without @ is rejected and the cart is kept`, async () => {
      const user_id = await userWithItem('bad-email');
      const { error } = await placeOrder({ user_id, email });
      expect(error?.code).toBe(status.INVALID_ARGUMENT);
      expect(await cartItemCount(user_id)).toBe(1);
    });
  }

  test('an email containing @ places the order', async () => {
    const user_id = await userWithItem('good-email');
    const { response, error } = await placeOrder({ user_id, email: 'a@b' });
    expect(error).toBeUndefined();
    expect(response.order.order_id).not.toBe('');
  });
});
