// Accounting: orders written through OrderRepository in one transaction, and the
// order consumer's lifecycle as a hosted service.
import { expect, test } from '@playwright/test';
import { searchSpans } from '../jaeger';
import { PlacedOrder, SHIPPING_ADDRESS, placeOrder } from '../shop';
import { docker, dockerStatus, logsSince, pollUntil, psql, recreateService, sleep } from '../stack';

const DEFAULT_MARKER = '/tmp/accounting-consuming';

function rowCounts(orderId: string) {
  const count = (table: string) => Number(psql(`SELECT count(*) FROM accounting.${table} WHERE order_id = '${orderId}'`)[0][0]);
  return { orders: count('"order"'), items: count('orderitem'), shipping: count('shipping') };
}

async function waitForLog(text: string, since: Date, timeoutMs = 60_000): Promise<boolean> {
  return (await pollUntil(() => (logsSince('accounting', since).includes(text) ? true : undefined), timeoutMs, 1000)) === true;
}

async function waitForStored(order: PlacedOrder, since: Date, timeoutMs = 60_000): Promise<boolean> {
  return waitForLog(`Order ${order.orderId} stored with`, since, timeoutMs);
}

function consumerGroups(args: string[]): string {
  return docker([
    'exec', '-e', 'KAFKA_OPTS=', 'kafka', '/opt/kafka/bin/kafka-consumer-groups.sh', '--bootstrap-server', 'kafka:9092', '--group', 'accounting', ...args,
  ], 60_000);
}

/**
 * Stops the consumer, points the group at the last order on the topic once the
 * group is empty, and starts the consumer again. Returns when it was started.
 */
async function redeliverLastOrder(): Promise<Date> {
  docker(['stop', 'accounting'], 120_000);
  const empty = await pollUntil(() => (/\bEmpty\b/.test(consumerGroups(['--describe', '--state'])) ? true : undefined), 180_000, 5000);
  expect(empty, 'accounting group empty after stop').toBe(true);
  const row = consumerGroups(['--describe']).split('\n').find(l => /^accounting\s+orders\s+0\s/.test(l))?.trim().split(/\s+/);
  const lastOffset = Number(row?.[4]) - 1;
  const reset = consumerGroups(['--topic', 'orders', '--reset-offsets', '--to-offset', String(lastOffset), '--execute']);
  expect(reset).toMatch(new RegExp(`accounting\\s+orders\\s+0\\s+${lastOffset}`));
  const startedAt = new Date();
  docker(['start', 'accounting']);
  return startedAt;
}

async function startedSince(since: Date): Promise<boolean> {
  return waitForLog('Consuming orders as group accounting', since, 90_000);
}

/** Places an order of two products and waits until accounting has stored it. */
async function placeStoredOrder(): Promise<{ order: PlacedOrder; placedAt: Date }> {
  const placedAt = new Date(Date.now() - 1000);
  const order = await placeOrder([
    { productId: 'OLJCESPC7Z', quantity: 2 },
    { productId: '66VCHSJNUP', quantity: 1 },
  ]);
  expect(order.status).toBe(200);
  expect(await waitForStored(order, placedAt), `order ${order.orderId} stored`).toBe(true);
  return { order, placedAt };
}

test.describe('storing orders', () => {
  test('a placed order is stored with all its items and its shipping', async () => {
    const { order } = await placeStoredOrder();
    expect(rowCounts(order.orderId!)).toEqual({ orders: 1, items: 2, shipping: 1 });

    const items = psql(`SELECT product_id, quantity, item_cost_currency_code, item_cost_units, item_cost_nanos FROM accounting.orderitem WHERE order_id = '${order.orderId}' ORDER BY product_id`);
    const expected = order.items!
      .map(({ item, cost }) => [item.productId, String(item.quantity), cost.currencyCode, String(cost.units), String(cost.nanos)])
      .sort((a, b) => a[0].localeCompare(b[0]));
    expect(items).toEqual(expected);
    const [shipping] = psql(`SELECT shipping_tracking_id, street_address, city, state, country, zip_code FROM accounting.shipping WHERE order_id = '${order.orderId}'`);
    expect(shipping).toEqual([
      order.shippingTrackingId,
      SHIPPING_ADDRESS.streetAddress,
      SHIPPING_ADDRESS.city,
      SHIPPING_ADDRESS.state,
      SHIPPING_ADDRESS.country,
      SHIPPING_ADDRESS.zipCode,
    ]);
  });

  test('received and stored log lines carry the order id and item count, not the order', async () => {
    const { order, placedAt } = await placeStoredOrder();
    const logs = logsSince('accounting', placedAt);
    expect(logs).toContain(`Order ${order.orderId} received with 2 items.`);
    expect(logs).toContain(`Order ${order.orderId} stored with 2 items.`);
    expect(logs).not.toContain(SHIPPING_ADDRESS.streetAddress);
  });

  test('a redelivered order leaves exactly one copy of the order behind', async () => {
    test.setTimeout(300_000);
    const { order } = await placeStoredOrder();
    const restartedAt = await redeliverLastOrder();
    expect(await waitForLog(`Order ${order.orderId} received with`, restartedAt, 90_000)).toBe(true);
    await sleep(5000);
    expect(rowCounts(order.orderId!)).toEqual({ orders: 1, items: 2, shipping: 1 });
  });

  test('a failure while storing is logged once with the order id and recorded on the consume span', async () => {
    test.setTimeout(300_000);
    const { order } = await placeStoredOrder();
    const restartedAt = await redeliverLastOrder();
    expect(await waitForLog(`Order ${order.orderId} received with`, restartedAt, 90_000)).toBe(true);
    await sleep(5000);
    const failures = logsSince('accounting', restartedAt).split('\n').filter(l => l.includes(`Order parsing failed: ${order.orderId}`));
    expect(failures).toHaveLength(1);

    // Status code 2 is ERROR in OTLP.
    const errored = await pollUntil(async () => {
      const spans = await searchSpans('accounting', 'order-consumed', restartedAt);
      return spans.find(s => s.status.code === 2);
    }, 60_000, 3000);
    expect(errored).toBeDefined();
    expect(errored!.events).toContain('exception');
  });
});

test.describe('consumer lifecycle', () => {
  test('start is logged with the topic and group', async () => {
    expect(await startedSince(new Date(0))).toBe(true);
  });

  test('the marker file exists while the consumer runs and holds a timestamp', async () => {
    const content = docker(['exec', 'accounting', 'cat', DEFAULT_MARKER]).trim();
    expect(content).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})$/);
  });

  test('stop logs stopping and stopped with the orders handled and removes the marker', async () => {
    test.setTimeout(360_000);
    const restartedAt = new Date(Date.now() - 1000);
    docker(['restart', 'accounting'], 120_000);
    expect(await startedSince(restartedAt)).toBe(true);
    await sleep(10_000);
    const orders = [await placeOrder([{ productId: 'OLJCESPC7Z', quantity: 1 }]), await placeOrder([{ productId: 'OLJCESPC7Z', quantity: 1 }])];
    for (const o of orders) expect(await waitForStored(o, restartedAt, 150_000)).toBe(true);
    const stoppedAt = new Date();
    docker(['stop', 'accounting'], 120_000);
    try {
      const logs = logsSince('accounting', restartedAt);
      const handled = (logs.match(/Order \S+ received with/g) ?? []).length;
      expect(handled).toBeGreaterThanOrEqual(2);
      expect(logsSince('accounting', stoppedAt)).toContain(`Stopping consumer after ${handled} orders`);
      expect(logsSince('accounting', stoppedAt)).toContain(`Consumer stopped after ${handled} orders`);
      expect(dockerStatus(['cp', `accounting:${DEFAULT_MARKER}`, '-'])).not.toBe(0);
    } finally {
      docker(['start', 'accounting']);
    }
  });

  test('stop waits for the order in flight to finish', async () => {
    test.setTimeout(240_000);
    expect(await startedSince(new Date(Date.now() - 300_000))).toBe(true);
    await sleep(10_000);
    const since = new Date(Date.now() - 1000);
    const order = await placeOrder([{ productId: '66VCHSJNUP', quantity: 1 }]);
    expect(await waitForLog(`Order ${order.orderId} received with`, since, 60_000)).toBe(true);
    docker(['stop', 'accounting'], 120_000);
    try {
      const logs = logsSince('accounting', since);
      const storedAt = logs.indexOf(`Order ${order.orderId} stored with`);
      const stoppedAt = logs.indexOf('Consumer stopped after');
      expect(storedAt).toBeGreaterThanOrEqual(0);
      expect(stoppedAt).toBeGreaterThan(storedAt);
    } finally {
      docker(['start', 'accounting']);
    }
    expect(rowCounts(order.orderId!).orders).toBe(1);
  });

  test('a restart does not process already stored orders again', async () => {
    test.setTimeout(300_000);
    expect(await startedSince(new Date(Date.now() - 300_000))).toBe(true);
    // Let anything redelivered by the previous stop settle first.
    await sleep(20_000);
    const since = new Date(Date.now() - 1000);
    const orders = [];
    for (let i = 0; i < 5; i++) orders.push(await placeOrder([{ productId: 'OLJCESPC7Z', quantity: 1 }]));
    for (const o of orders) expect(await waitForStored(o, since)).toBe(true);
    const restartedAt = new Date();
    docker(['restart', 'accounting'], 120_000);
    expect(await startedSince(restartedAt)).toBe(true);
    // A consumer that did not leave the group is only replaced after the session timeout (45s).
    await sleep(75_000);
    const after = logsSince('accounting', restartedAt);
    const reprocessed = orders.filter(o => after.includes(`Order ${o.orderId} received`) || after.includes(`Order parsing failed: ${o.orderId}`));
    expect(reprocessed.map(o => o.orderId)).toEqual([]);
  });

  test('ACCOUNTING_HEALTH_FILE overrides the marker path', async () => {
    test.setTimeout(300_000);
    try {
      const since = new Date(Date.now() - 1000);
      recreateService('accounting', { ACCOUNTING_HEALTH_FILE: '/tmp/custom-health' });
      expect(await startedSince(since)).toBe(true);
      await sleep(3000);
      expect(dockerStatus(['exec', 'accounting', 'test', '-f', '/tmp/custom-health'])).toBe(0);
      expect(dockerStatus(['exec', 'accounting', 'test', '-f', DEFAULT_MARKER])).not.toBe(0);
    } finally {
      const since = new Date(Date.now() - 1000);
      recreateService('accounting');
      await startedSince(since);
    }
  });
});
