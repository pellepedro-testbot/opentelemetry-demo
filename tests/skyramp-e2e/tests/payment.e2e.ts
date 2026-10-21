// Payment: accepted card networks, decline messages, charge telemetry and the
// card fingerprint written to the audit log.
import { expect, test } from '@playwright/test';
import { pbkdf2Sync } from 'node:crypto';
import { unary } from '../grpc-clients';
import { eventsInOrder, spanWithTag, waitForServiceSpans, TraceSpan } from '../jaeger';
import { logsSince, newTraceId, pollUntil, recreateService, traceparent } from '../stack';

const NEXT_YEAR = new Date().getFullYear() + 1;

interface ChargeOutcome {
  transactionId?: string;
  error?: string;
  traceId: string;
}

async function charge(number: string, amount = { units: 10, nanos: 0, currency_code: 'USD' }, expirationYear = NEXT_YEAR, expirationMonth = 1): Promise<ChargeOutcome> {
  const traceId = newTraceId();
  const res = await unary<{ transaction_id: string }>(
    'PaymentService',
    'Charge',
    {
      amount,
      credit_card: {
        credit_card_number: number,
        credit_card_cvv: 123,
        credit_card_expiration_year: expirationYear,
        credit_card_expiration_month: expirationMonth,
      },
    },
    { traceparent: traceparent(traceId) }
  );
  return { transactionId: res.response?.transaction_id, error: res.error?.details, traceId };
}

/** The 'Transaction complete.' log record of a transaction. */
async function transactionLog(transactionId: string, since: Date): Promise<Record<string, any> | undefined> { // eslint-disable-line @typescript-eslint/no-explicit-any
  return pollUntil(() => {
    for (const line of logsSince('payment', since).split('\n')) {
      if (!line.includes(transactionId)) continue;
      const record = JSON.parse(line);
      if (record.msg === 'Transaction complete.') return record;
    }
    return undefined;
  }, 10_000, 500);
}

async function cardHashOf(number: string): Promise<string | undefined> {
  const since = new Date(Date.now() - 1000);
  const { transactionId, error } = await charge(number);
  expect(error, `charge with ${number}`).toBeUndefined();
  return (await transactionLog(transactionId!, since))?.cardHash;
}

function luhnComplete(prefix: string, length: number): string {
  const body = prefix.padEnd(length - 1, '0');
  let sum = 0;
  for (let i = 0; i < body.length; i++) {
    let d = Number(body[body.length - 1 - i]);
    if (i % 2 === 0) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
  }
  return body + String((10 - (sum % 10)) % 10);
}

test.describe('accepted card networks', () => {
  const approved: [string, string][] = [
    ['a Visa card', '4111111111111111'],
    ['a Mastercard in the 51-55 range', '5555555555554444'],
    ['a Mastercard in the 2221-2720 range', '2223003122003222'],
    ['an American Express card starting 37', '378282246310005'],
    ['an American Express card starting 37 (second)', '371449635398431'],
    ['a Discover card starting 6011', '6011111111111117'],
    ['a Discover card starting 65', luhnComplete('65', 16)],
    ['a Visa number written with spaces', '4111 1111 1111 1111'],
    ['a Visa number written with dashes', '4111-1111-1111-1111'],
    ['an American Express number written with spaces', '3782 822463 10005'],
  ];
  for (const [label, number] of approved) {
    test(`${label} is charged`, async () => {
      const { transactionId, error } = await charge(number);
      expect(error).toBeUndefined();
      expect(transactionId).toBeTruthy();
    });
  }

  test('a card from another network is declined naming the accepted networks', async () => {
    const { transactionId, error } = await charge('3530111333300000');
    expect(transactionId).toBeUndefined();
    expect(error).toContain('Visa, Mastercard, American Express or Discover');
  });

  test('a number with a bad checksum is declined naming its last four digits', async () => {
    const { transactionId, error } = await charge('4111111111111112');
    expect(transactionId).toBeUndefined();
    expect(error).toContain('1112');
  });

  test('an expired card is declined naming the network, last four digits and expiry', async () => {
    const { transactionId, error } = await charge('4111111111111111', undefined, 2020, 3);
    expect(transactionId).toBeUndefined();
    expect(error).toContain('Visa');
    expect(error).toContain('1111');
    expect(error).toContain('3/2020');
  });
});

test.describe('charge telemetry', () => {
  async function paymentSpans(traceId: string, ready: (spans: TraceSpan[]) => boolean): Promise<TraceSpan[]> {
    return waitForServiceSpans(traceId, 'payment', 30_000, ready);
  }
  const hasOutcome = (spans: TraceSpan[]) => spans.some(s => 'demo.payment.outcome' in s.tags);

  test('the amount is recorded with two decimals', async () => {
    const { traceId, error } = await charge('4111111111111111', { units: 10, nanos: 500000000, currency_code: 'USD' });
    expect(error).toBeUndefined();
    const span = spanWithTag(await paymentSpans(traceId, hasOutcome), 'demo.payment.amount');
    expect(span?.tags['demo.payment.amount']).toBe('10.50');
  });

  test('an amount with few nanos is recorded as its exact two-decimal value', async () => {
    const { traceId, error } = await charge('4111111111111111', { units: 489, nanos: 20000000, currency_code: 'USD' });
    expect(error).toBeUndefined();
    const span = spanWithTag(await paymentSpans(traceId, hasOutcome), 'demo.payment.amount');
    expect(span?.tags['demo.payment.amount']).toBe('489.02');
  });

  test('the request currency is recorded', async () => {
    const { traceId } = await charge('4111111111111111', { units: 20, nanos: 0, currency_code: 'EUR' });
    const span = spanWithTag(await paymentSpans(traceId, hasOutcome), 'demo.payment.currency');
    expect(span?.tags['demo.payment.currency']).toBe('EUR');
  });

  test('the card network is recorded', async () => {
    for (const [number, network] of [
      ['378282246310005', 'amex'],
      ['4111111111111111', 'visa'],
      ['3530111333300000', 'unknown'],
    ]) {
      const { traceId } = await charge(number);
      const span = spanWithTag(await paymentSpans(traceId, hasOutcome), 'demo.payment.card_network');
      expect.soft(span?.tags['demo.payment.card_network'], number).toBe(network);
    }
  });

  test('an approved charge records its outcome and transaction id', async () => {
    const { traceId, transactionId } = await charge('4111111111111111');
    const spans = await paymentSpans(traceId, hasOutcome);
    expect(spanWithTag(spans, 'demo.payment.outcome')?.tags['demo.payment.outcome']).toBe('approved');
    const approved = eventsInOrder(spans).find(e => e.name === 'charge.approved');
    expect(approved?.fields['demo.payment.transaction.id']).toBe(transactionId);
  });

  test('a declined charge records its outcome, the error and an error status', async () => {
    const { traceId, error } = await charge('4111111111111111', undefined, 2020, 1);
    const spans = await paymentSpans(traceId, hasOutcome);
    const span = spanWithTag(spans, 'demo.payment.outcome');
    expect(span?.tags['demo.payment.outcome']).toBe('declined');
    expect(span?.tags['otel.status_code']).toBe('ERROR');
    const declined = eventsInOrder(spans).find(e => e.name === 'charge.declined');
    expect(declined?.fields['exception.message']).toBe(error);
  });

  test('the main steps are recorded as span events in order', async () => {
    const ok = await charge('4111111111111111');
    const okEvents = eventsInOrder(await paymentSpans(ok.traceId, hasOutcome)).map(e => e.name);
    expect(okEvents.filter(n => n.startsWith('charge.') || n.startsWith('card.'))).toEqual([
      'charge.received',
      'card.identified',
      'card.validated',
      'charge.approved',
    ]);

    const declined = await charge('3530111333300000');
    const declinedEvents = eventsInOrder(await paymentSpans(declined.traceId, hasOutcome)).map(e => e.name);
    expect(declinedEvents.filter(n => n.startsWith('charge.') || n.startsWith('card.'))).toEqual([
      'charge.received',
      'card.identified',
      'charge.declined',
    ]);
  });
});

test.describe('card fingerprint for the audit log', () => {
  test('the charge span and the Transaction complete log carry the same fingerprint', async () => {
    const since = new Date(Date.now() - 1000);
    const { traceId, transactionId } = await charge('4111111111111111', { units: 31, nanos: 0, currency_code: 'USD' });
    const log = await transactionLog(transactionId!, since);
    const span = spanWithTag(await waitForServiceSpans(traceId, 'payment', 30_000, s => !!spanWithTag(s, 'demo.payment.card_hash')), 'demo.payment.card_hash');
    expect(log?.cardHash).toMatch(/^[0-9a-f]{64}$/);
    expect(span?.tags['demo.payment.card_hash']).toBe(log?.cardHash);
  });

  test('the same card gives the same fingerprint across transactions', async () => {
    expect(await cardHashOf('4111111111111111')).toBe(await cardHashOf('4111111111111111'));
  });

  test('the same card written with spaces or dashes gives the same fingerprint', async () => {
    const plain = await cardHashOf('4111111111111111');
    expect(await cardHashOf('4111 1111 1111 1111')).toBe(plain);
    expect(await cardHashOf('4111-1111-1111-1111')).toBe(plain);
  });

  test('different cards give different fingerprints', async () => {
    expect(await cardHashOf('4111111111111111')).not.toBe(await cardHashOf('5555555555554444'));
  });

  test('the card number is never written to the log or the span', async () => {
    const since = new Date(Date.now() - 1000);
    const { traceId, transactionId } = await charge('4111111111111111', { units: 32, nanos: 0, currency_code: 'USD' });
    const log = await transactionLog(transactionId!, since);
    expect(log).toBeDefined();
    expect(JSON.stringify(log)).not.toContain('4111111111111111');
    const spans = await waitForServiceSpans(traceId, 'payment', 30_000, s => !!spanWithTag(s, 'demo.payment.card_hash'));
    expect(spans.length).toBeGreaterThan(0);
    expect(JSON.stringify(spans)).not.toContain('4111111111111111');
  });

  test('PAYMENT_CARD_HASH_SALT changes the fingerprint', async () => {
    test.setTimeout(240_000);
    const card = '4111111111111111';
    const defaultHash = await cardHashOf(card);
    try {
      recreateService('payment', { PAYMENT_CARD_HASH_SALT: 'other' });
      await pollUntil(async () => ((await charge(card)).transactionId ? true : undefined), 120_000, 2000);
      const salted = await cardHashOf(card);
      expect(salted).not.toBe(defaultHash);
      expect(salted).toBe(pbkdf2Sync(card, 'other', 100000, 32, 'sha512').toString('hex'));
    } finally {
      recreateService('payment');
      await pollUntil(async () => ((await charge(card)).transactionId ? true : undefined), 120_000, 2000);
    }
  });
});
