// Checkout: the order total built with SumAll and Multiply, and publishing the
// order to Kafka off the request path.
import { expect, test } from '@playwright/test';
import { promQuery } from '../prometheus';
import { placeOrder, toNanos } from '../shop';
import { docker, logsSince, pollUntil, psql, sleep } from '../stack';

async function storedInAccounting(orderId: string, timeoutMs = 60_000): Promise<boolean> {
  const found = await pollUntil(() => (psql(`SELECT order_id FROM accounting."order" WHERE order_id = '${orderId}'`).length ? true : undefined), timeoutMs, 2000);
  return found === true;
}

test.describe('order total', () => {
  test('the charged amount is shipping plus each item price times its quantity', async () => {
    const since = new Date(Date.now() - 1000);
    const order = await placeOrder([
      { productId: 'OLJCESPC7Z', quantity: 2 },
      { productId: '66VCHSJNUP', quantity: 3 },
    ]);
    expect(order.status).toBe(200);
    const expected =
      toNanos(order.shippingCost!) + order.items!.reduce((sum, { cost, item }) => sum + toNanos(cost) * BigInt(item.quantity), 0n);

    const charged = await pollUntil(() => {
      for (const line of logsSince('payment', since).split('\n')) {
        if (!line.includes(order.traceId) || !line.includes('Transaction complete.')) continue;
        const { amount } = JSON.parse(line);
        const units = typeof amount.units === 'object' ? amount.units.low + amount.units.high * 2 ** 32 : Number(amount.units);
        return { amount: toNanos({ units, nanos: amount.nanos }), currency: amount.currencyCode };
      }
      return undefined;
    }, 15_000, 500);
    expect(charged?.currency).toBe('USD');
    expect(charged?.amount).toBe(expected);
  });
});

test.describe('publishing the order to Kafka', () => {
  test('checkout does not wait for Kafka', async () => {
    test.setTimeout(120_000);
    const baseline = [];
    for (let i = 0; i < 2; i++) {
      const o = await placeOrder([{ productId: 'OLJCESPC7Z', quantity: 1 }]);
      expect(o.status).toBe(200);
      baseline.push(o.elapsedMs);
    }
    docker(['pause', 'kafka']);
    try {
      const paused = await placeOrder([{ productId: 'OLJCESPC7Z', quantity: 1 }]);
      expect(paused.status).toBe(200);
      expect(paused.orderId).toBeTruthy();
      expect(paused.elapsedMs).toBeLessThan(Math.max(...baseline) + 2000);
    } finally {
      docker(['unpause', 'kafka']);
    }
  });

  test('the order event is still published and stored by accounting', async () => {
    test.setTimeout(240_000);
    const up = await placeOrder([{ productId: 'OLJCESPC7Z', quantity: 1 }]);
    expect(up.status).toBe(200);
    expect(await storedInAccounting(up.orderId!)).toBe(true);

    docker(['pause', 'kafka']);
    let duringPause;
    try {
      duringPause = await placeOrder([{ productId: '66VCHSJNUP', quantity: 1 }]);
      expect(duringPause.status).toBe(200);
      await sleep(5000);
    } finally {
      docker(['unpause', 'kafka']);
    }
    expect(await storedInAccounting(duringPause.orderId!, 90_000)).toBe(true);
  });

  test('background publishing leaves no goroutine behind per order', async () => {
    test.setTimeout(400_000);
    const query = 'max(go_goroutine_count{service_name="checkout"})';
    const baseline = await promQuery(query);
    expect(baseline).toBeDefined();
    for (let i = 0; i < 50; i += 5) {
      const batch = await Promise.all(Array.from({ length: 5 }, () => placeOrder([{ productId: 'OLJCESPC7Z', quantity: 1 }])));
      expect(batch.map(o => o.status)).toEqual([200, 200, 200, 200, 200]);
    }
    // Let the publishes finish, then wait for the next metric export (every 60s).
    await sleep(45_000 + 75_000);
    const after = await promQuery(query);
    expect(after! - baseline!).toBeLessThanOrEqual(10);
  });
});
