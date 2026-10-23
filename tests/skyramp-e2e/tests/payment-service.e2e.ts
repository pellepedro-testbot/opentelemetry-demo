import { expect, test } from '@playwright/test';
import { Status, VALID_CARD, expectGrpcError, grpcError, payment, usd } from '../support/grpc-clients';

const charge = (overrides: { amount?: unknown; creditCard?: Record<string, unknown> } = {}) =>
  payment.charge({
    amount: 'amount' in overrides ? overrides.amount : usd(10),
    creditCard: { ...VALID_CARD, ...overrides.creditCard },
  });

test.describe('PaymentService/Charge', () => {
  test('Pasted text AC10', async () => {
    const error = await grpcError(charge({ creditCard: { creditCardNumber: '4000-0000-0000-0002' } }));
    expect(error.details).toBe('Your card was declined.');
  });

  test('Pasted text AC10 (separated digits)', async () => {
    for (const creditCardNumber of ['4000 0000 0000 0002', '4000000000000002', '4000-0000-0000-0002']) {
      const result = await charge({ creditCard: { creditCardNumber } }).then(
        response => ({ transactionId: response.transactionId as string, details: undefined }),
        error => ({ transactionId: undefined, details: error.details as string })
      );
      expect.soft(result, `card "${creditCardNumber}"`).toEqual({
        transactionId: undefined,
        details: 'Your card was declined.',
      });
    }
  });

  test('Pasted text AC15', async () => {
    await expectGrpcError(charge({ creditCard: { creditCardNumber: '1234-5678' } }), Status.INVALID_ARGUMENT);
    await expectGrpcError(charge({ creditCard: { creditCardNumber: '' } }), Status.INVALID_ARGUMENT);
  });

  test('Pasted text AC34', async () => {
    await expectGrpcError(charge({ creditCard: { creditCardCvv: 0 } }), Status.INVALID_ARGUMENT, 'Invalid CVV');
  });

  test('Pasted text AC35', async () => {
    await expectGrpcError(
      charge({ creditCard: { creditCardExpirationMonth: 1, creditCardExpirationYear: 2020 } }),
      Status.FAILED_PRECONDITION
    );
  });

  test('Pasted text AC55', async () => {
    await expectGrpcError(charge({ amount: usd(0, 0) }), Status.INVALID_ARGUMENT);
    await expectGrpcError(charge({ amount: undefined }), Status.INVALID_ARGUMENT);
  });

  test('Pasted text AC55 (2)', async () => {
    await expectGrpcError(charge({ amount: usd(-5, 0) }), Status.INVALID_ARGUMENT);
    await expectGrpcError(charge({ amount: usd(0, -1) }), Status.INVALID_ARGUMENT);
  });

  test('Pasted text AC55 (3)', async () => {
    const response = await charge({ amount: usd(0, 1) });
    expect(response.transactionId).not.toBe('');
  });

  test('Pasted text AC57', async () => {
    const now = new Date();
    await expectGrpcError(
      charge({
        creditCard: { creditCardExpirationMonth: now.getMonth() + 1, creditCardExpirationYear: now.getFullYear() },
      }),
      Status.FAILED_PRECONDITION,
      'Card expires this month'
    );
  });

  test('Pasted text AC75', async () => {
    for (const creditCardNumber of ['378282246310005', '3782-822463-10005', '371449635398431']) {
      const response = await charge({ creditCard: { creditCardNumber, creditCardCvv: 1234 } }).catch(e => e);
      expect.soft(response.transactionId, `${creditCardNumber}: ${response.details ?? ''}`).toBeTruthy();
    }
  });

  test('Pasted text AC80', async () => {
    for (const creditCardNumber of ['4111-1111-1111-1111', '4111111111111111', '4111 1111 1111 1111']) {
      const error = await grpcError(charge({ creditCard: { creditCardNumber } }));
      expect.soft(error.details, creditCardNumber).toBe('Test cards are not accepted');
    }
  });

  test('Pasted text AC95', async () => {
    for (const creditCardExpirationMonth of [0, 13, -1]) {
      const error = await grpcError(charge({ creditCard: { creditCardExpirationMonth } }));
      expect.soft(Status[error.code], `month ${creditCardExpirationMonth}: ${error.details}`).toBe('INVALID_ARGUMENT');
    }
  });

  test('Pasted text AC95 (2)', async () => {
    for (const creditCardExpirationMonth of [1, 12]) {
      const response = await charge({
        creditCard: { creditCardExpirationMonth, creditCardExpirationYear: 2030 },
      }).catch(e => e);
      expect.soft(response.transactionId, `month ${creditCardExpirationMonth}: ${response.details ?? ''}`).toBeTruthy();
    }
  });

  test('Pasted text AC97', async () => {
    for (const currencyCode of ['USD', 'EUR', 'GBP']) {
      const response = await charge({ amount: { currencyCode, units: 10, nanos: 0 } }).catch(e => e);
      expect.soft(response.transactionId, `${currencyCode}: ${response.details ?? ''}`).toBeTruthy();
    }
  });

  test('Pasted text AC97 (2)', async () => {
    for (const currencyCode of ['JPY', 'CAD', 'usd']) {
      const error = await grpcError(charge({ amount: { currencyCode, units: 10, nanos: 0 } }));
      expect.soft(error.details, currencyCode).toBe('Currency not supported for payment');
    }
  });
});
