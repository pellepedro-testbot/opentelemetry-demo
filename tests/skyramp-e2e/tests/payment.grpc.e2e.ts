import { expect, test } from '@playwright/test';
import { call, expectStatus, grpc, services, usd, validCard } from '../support/grpcClients';

const charge = (creditCard: object | undefined) =>
  call(services.payment, 'Charge', { amount: usd(10), ...(creditCard ? { credit_card: creditCard } : {}) });

const expectCharged = (result: Awaited<ReturnType<typeof charge>>) => {
  expect(result.ok ? '' : `${grpc.status[result.error.code]} ${result.error.details}`).toBe('');
  expect(result.ok && result.response.transaction_id).toBeTruthy();
};

test.describe('payment service contract', () => {
  const expectDeclined = async (number: string) => {
    const result = await charge(validCard({ credit_card_number: number, credit_card_cvv: 123 }));
    expect(result.ok).toBe(false);
    expect(!result.ok && result.error.details).toContain('Your card was declined.');
  };

  test('Pasted text AC10, variant 1', async () => {
    await expectDeclined('4000-0000-0000-0002');
  });

  test('Pasted text AC10, variant 2', async () => {
    await expectDeclined('4000000000000002');
  });

  test('Pasted text AC10, variant 3', async () => {
    expectCharged(await charge(validCard()));
  });

  test('Pasted text AC15, variant 1', async () => {
    expectStatus(
      await charge(validCard({ credit_card_number: '4432-8015-6152-0455', credit_card_cvv: 123 })),
      grpc.status.INVALID_ARGUMENT
    );
  });

  test('Pasted text AC15, variant 2', async () => {
    expectStatus(await charge(validCard({ credit_card_number: '' })), grpc.status.INVALID_ARGUMENT);
  });

  test('Pasted text AC15, variant 3', async () => {
    expectStatus(await charge(undefined), grpc.status.INVALID_ARGUMENT);
  });

  test('Pasted text AC34, variant 1', async () => {
    const result = await charge(validCard({ credit_card_cvv: 0 }));
    expect(result.ok).toBe(false);
    expect(!result.ok && result.error.details).toBe('Invalid CVV');
  });

  test('Pasted text AC34, variant 2', async () => {
    expectCharged(await charge(validCard({ credit_card_cvv: 1 })));
  });

  test('Pasted text AC35, variant 1', async () => {
    expectStatus(
      await charge(validCard({ credit_card_expiration_year: 2020, credit_card_expiration_month: 1 })),
      grpc.status.FAILED_PRECONDITION
    );
  });

  test('Pasted text AC35, variant 2', async () => {
    const now = new Date();
    expectCharged(
      await charge(
        validCard({ credit_card_expiration_year: now.getFullYear(), credit_card_expiration_month: now.getMonth() + 1 })
      )
    );
  });
});
