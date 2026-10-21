// Places orders through the storefront API, the way the cart page does.
import { PROXY_URL, newTraceId, traceparent, uniqueId } from './stack';

export interface Money {
  currencyCode: string;
  units: number;
  nanos: number;
}

export interface PlacedOrder {
  status: number;
  elapsedMs: number;
  traceId: string;
  userId: string;
  orderId?: string;
  shippingTrackingId?: string;
  shippingCost?: Money;
  shippingAddress?: Record<string, string>;
  items?: { cost: Money; item: { productId: string; quantity: number } }[];
}

export const SHIPPING_ADDRESS = {
  streetAddress: '1600 Amphitheatre Parkway',
  city: 'Mountain View',
  state: 'CA',
  country: 'USA',
  zipCode: '94043',
};

export async function placeOrder(lines: { productId: string; quantity: number }[], currencyCode = 'USD'): Promise<PlacedOrder> {
  const userId = uniqueId('shopper');
  for (const item of lines) {
    const res = await fetch(`${PROXY_URL}/api/cart`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ userId, item }),
    });
    if (!res.ok) throw new Error(`adding ${item.productId} failed with ${res.status}`);
  }
  const traceId = newTraceId();
  const started = Date.now();
  const res = await fetch(`${PROXY_URL}/api/checkout?currencyCode=${currencyCode}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', traceparent: traceparent(traceId) },
    body: JSON.stringify({
      userId,
      userCurrency: currencyCode,
      address: SHIPPING_ADDRESS,
      email: 'testbot@example.com',
      creditCard: {
        creditCardNumber: '4432-8015-6152-0454',
        creditCardCvv: 672,
        creditCardExpirationYear: new Date().getFullYear() + 1,
        creditCardExpirationMonth: 1,
      },
    }),
  });
  const elapsedMs = Date.now() - started;
  const body = res.ok ? await res.json() : {};
  return { status: res.status, elapsedMs, traceId, userId, ...body };
}

/** Money as a count of nanos, for exact sums. */
export function toNanos(m: { units: number | string; nanos: number }): bigint {
  return BigInt(m.units) * 1_000_000_000n + BigInt(m.nanos);
}
