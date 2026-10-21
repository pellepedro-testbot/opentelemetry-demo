// Email: the confirmation layout with the order date, and the copy of every
// confirmation kept for support.
import { expect, test } from '@playwright/test';
import { waitForLogsWithAttribute } from '../opensearch';
import { promQuery } from '../prometheus';
import { docker, dockerStatus, hostAddress, pollUntil, recreateService, sleep, uniqueId } from '../stack';

const ARCHIVE_DIR = '/tmp/sent-emails';

function confirmation(orderId: string, email = 'shopper@example.com') {
  return {
    email,
    order: {
      order_id: orderId,
      shipping_tracking_id: 'TRACK-12345',
      shipping_cost: { currency_code: 'USD', units: 8, nanos: 990000000 },
      shipping_address: {
        street_address_1: '1600 Amphitheatre Parkway',
        street_address_2: 'Building 4',
        city: 'Mountain View',
        country: 'USA',
        zip_code: '94043',
      },
      items: [
        { item: { product_id: 'OLJCESPC7Z', quantity: 2 }, cost: { currency_code: 'USD', units: 101, nanos: 960000000 } },
        { item: { product_id: '66VCHSJNUP', quantity: 1 }, cost: { currency_code: 'USD', units: 349, nanos: 950000000 } },
      ],
    },
  };
}

async function sendConfirmation(body: object): Promise<number> {
  const res = await fetch(`http://${hostAddress('email', 6060)}/send_order_confirmation`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });
  return res.status;
}

function archived(fileName: string, dir = ARCHIVE_DIR): string | undefined {
  try {
    return docker(['exec', 'email', 'cat', `${dir}/${fileName}`]);
  } catch {
    return undefined;
  }
}

async function sentEmail(orderId: string): Promise<string> {
  expect(await sendConfirmation(confirmation(orderId))).toBe(200);
  const eml = await pollUntil(() => archived(`${orderId}.eml`), 10_000, 500);
  expect(eml, `archived copy of ${orderId}`).toBeDefined();
  return eml!;
}

async function waitForEmailService(): Promise<void> {
  await pollUntil(async () => ((await sendConfirmation(confirmation(uniqueId('warmup')))) === 200 ? true : undefined), 120_000, 2000);
}

test.describe('confirmation email layout', () => {
  test('the email shows the order date in UTC', async () => {
    const eml = await sentEmail(uniqueId('ORDER'));
    const today = new Date().toISOString().slice(0, 10);
    expect(eml).toMatch(new RegExp(`<td>Order date</td>\\s*<td>${today}</td>`));
  });

  test('the email has a header, a details table, a styled item table and a footer', async () => {
    const eml = await sentEmail(uniqueId('ORDER'));
    expect(eml).toMatch(/<div class="header">\s*<h2>Your Order Confirmation<\/h2>/);
    expect(eml).toContain('<table class="details">');
    expect(eml).toMatch(/<table class="items">\s*<tr>\s*<th>Item No\.<\/th>\s*<th>Quantity<\/th>\s*<th>Price<\/th>/);
    expect(eml).toContain('<div class="footer">');
  });

  test('order id, tracking id, shipping cost, address and one row per item are still shown', async () => {
    const orderId = uniqueId('ORDER');
    const eml = await sentEmail(orderId);
    expect(eml).toContain(orderId);
    expect(eml).toContain('TRACK-12345');
    expect(eml).toContain('8.990000000 USD');
    expect(eml).toContain('1600 Amphitheatre Parkway, Building 4, Mountain View, USA 94043');
    const rows = eml.match(/<table class="items">([\s\S]*?)<\/table>/)?.[1] ?? '';
    expect(rows).toMatch(/<td>OLJCESPC7Z<\/td>\s*<td>2<\/td>\s*<td>101\.960000000 USD<\/td>/);
    expect(rows).toMatch(/<td>66VCHSJNUP<\/td>\s*<td>1<\/td>\s*<td>349\.950000000 USD<\/td>/);
    expect(rows.match(/<td>/g)?.length).toBe(6);
  });
});

test.describe('copies of confirmation emails for support', () => {
  test('a confirmation is archived as <order id>.eml with headers and the HTML body', async () => {
    const orderId = uniqueId('ABC');
    const eml = await sentEmail(orderId);
    const head = eml.slice(0, eml.indexOf('\n\n'));
    const body = eml.slice(eml.indexOf('\n\n') + 2);
    const lines = head.split('\n');
    expect(lines[0]).toBe('To: shopper@example.com');
    expect(lines).toContain('Subject: Your confirmation email');
    expect(lines.find(l => l.startsWith('Date: '))).toMatch(/^Date: \d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/);
    expect(body).toContain('<html>');
    expect(body).toContain('</html>');
    expect(body).toContain(orderId);
  });

  test('an order id with path characters is archived inside the archive folder', async () => {
    const orderId = `../../etc/x y-${Date.now()}`;
    expect(await sendConfirmation(confirmation(orderId))).toBe(200);
    const safe = orderId.replace(/[^A-Za-z0-9._-]/g, '_');
    expect(await pollUntil(() => archived(`${safe}.eml`), 10_000, 500)).toBeDefined();
    expect(dockerStatus(['exec', 'email', 'test', '-e', `/etc/x y-${orderId.split('-').pop()}.eml`])).not.toBe(0);
  });

  test('archived copies are counted and logged', async () => {
    test.setTimeout(400_000);
    const query = 'sum(demo_notification_confirmations_archived_total)';
    // Earlier sends may not be exported yet: take the baseline once the counter holds still for a full export period.
    let before = (await promQuery(query)) ?? 0;
    for (let settled = Date.now(); Date.now() - settled < 70_000; ) {
      await sleep(5000);
      const now = (await promQuery(query)) ?? 0;
      if (now !== before) {
        before = now;
        settled = Date.now();
      }
    }
    const orderId = uniqueId('ARCHIVED');
    await sentEmail(orderId);
    let after = before;
    const deadline = Date.now() + 150_000;
    while (Date.now() < deadline && after < before + 1) {
      await sleep(5000);
      after = (await promQuery(query)) ?? after;
    }
    expect(after - before).toBe(1);
    const logs = await waitForLogsWithAttribute('demo.order.id', orderId, 90_000);
    expect(logs.map(l => l.body)).toContain('Order confirmation email archived');
  });

  test('EMAIL_ARCHIVE_ENABLED=false turns copies off', async () => {
    test.setTimeout(300_000);
    try {
      recreateService('email', { EMAIL_ARCHIVE_ENABLED: 'false' });
      await waitForEmailService();
      const orderId = uniqueId('OFF');
      expect(await sendConfirmation(confirmation(orderId))).toBe(200);
      await sleep(2000);
      expect(archived(`${orderId}.eml`)).toBeUndefined();
    } finally {
      recreateService('email');
      await waitForEmailService();
    }
  });

  test('a copy that cannot be written never fails the email', async () => {
    test.setTimeout(300_000);
    try {
      recreateService('email', { EMAIL_ARCHIVE_DIR: '/proc/nope' });
      await waitForEmailService();
      const orderId = uniqueId('UNWRITABLE');
      expect(await sendConfirmation(confirmation(orderId))).toBe(200);
      const logs = await waitForLogsWithAttribute('demo.order.id', orderId, 90_000);
      expect(logs.map(l => l.body)).toContain('Order confirmation email sent');
    } finally {
      recreateService('email');
      await waitForEmailService();
    }
  });
});
