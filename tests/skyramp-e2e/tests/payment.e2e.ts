import { test, expect } from '@playwright/test';
import { clients, rpc, rpcError, status } from '../support/grpcClients';

const payment = clients.payment();

const charge = (card: Record<string, unknown>) => ({
  amount: { currency_code: 'USD', units: 10, nanos: 0 },
  credit_card: {
    credit_card_number: '4432-8015-6152-0454',
    credit_card_cvv: 672,
    credit_card_expiration_year: 2030,
    credit_card_expiration_month: 1,
    ...card,
  },
});

test.describe('PaymentService Charge', () => {
  test('Charge with the test number ending 0002 fails with the decline message (AC10)', async () => {
    const error = await rpcError(payment, 'Charge', charge({ credit_card_number: '4000-0000-0000-0002' }));
    expect(error?.details).toContain('Your card was declined.');
  });

  test('Charge with the default Visa succeeds (AC10)', async () => {
    const response = await rpc(payment, 'Charge', charge({}));
    expect(response.transaction_id).not.toBe('');
  });

  test('Charge with a Luhn-failing number (AC15)', async () => {
    const error = await rpcError(payment, 'Charge', charge({ credit_card_number: '1234-5678-9012-3456' }));
    expect(error?.code).toBe(status.INVALID_ARGUMENT);
  });

  test('Charge with no number (AC15)', async () => {
    const error = await rpcError(payment, 'Charge', charge({ credit_card_number: '' }));
    expect(error?.code).toBe(status.INVALID_ARGUMENT);
  });

  test('Charge with CVV zero (AC34)', async () => {
    const error = await rpcError(payment, 'Charge', charge({ credit_card_cvv: 0 }));
    expect(error?.details).toContain('Invalid CVV');
  });

  test('Charge with a 2020 expiry (AC35)', async () => {
    const error = await rpcError(payment, 'Charge', charge({ credit_card_expiration_year: 2020 }));
    expect(error?.code).toBe(status.FAILED_PRECONDITION);
  });
});
