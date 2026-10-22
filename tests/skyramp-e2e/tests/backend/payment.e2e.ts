// Skyramp Testbot test package: Testbot owns and maintains everything in this folder.
import { expect, test } from '@playwright/test';
import { addresses, clientFor, payment, status, validCard } from '../../demo-grpc';

const chargeRequest = (credit_card_number: string) => ({
  amount: { currency_code: 'USD', units: 10, nanos: 0 },
  credit_card: { ...validCard, credit_card_number, credit_card_cvv: 123 },
});

const charge = (credit_card_number: string) => payment('Charge', chargeRequest(credit_card_number));

const waitForPaymentRestart = async () => {
  for (let attempt = 0; attempt < 15; attempt++) {
    const fresh = clientFor('PaymentService', addresses.payment, { 'grpc.use_local_subchannel_pool': 1 });
    if (!(await fresh('Charge', chargeRequest('4432-8015-6152-0454'))).error) return;
    await new Promise(r => setTimeout(r, 1_000));
  }
};

test.describe('PaymentService.Charge', () => {
  test('card 4000-0000-0000-0002 is declined with "Your card was declined."', async () => {
    const { response, error } = await charge('4000-0000-0000-0002');
    expect(response?.transaction_id).toBeFalsy();
    expect(error?.details).toContain('Your card was declined.');
  });

  test('another valid Visa card is still charged', async () => {
    const { response, error } = await charge('4432-8015-6152-0454');
    expect(error).toBeUndefined();
    expect(response.transaction_id).not.toBe('');
  });

  for (const number of ['4432-8015-6152-0455', 'abcd']) {
    test(`card number "${number}" failing validation is rejected as INVALID_ARGUMENT`, async () => {
      const { error } = await charge(number);
      expect(error?.code).toBe(status.INVALID_ARGUMENT);
    });
  }

  test('an empty card number is rejected as INVALID_ARGUMENT', async () => {
    const { response, error } = await charge('');
    if (error?.code === status.UNAVAILABLE) await waitForPaymentRestart();
    expect(response?.transaction_id).toBeFalsy();
    expect(error?.code).toBe(status.INVALID_ARGUMENT);
  });
});
