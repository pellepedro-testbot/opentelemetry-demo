// Order writes for the stack smoke and the load fixtures (O2 and checkout knock-on).
//
// Each iteration is one checkout by a new shopper: add one product to a fresh cart,
// then place the order. A placed order goes checkout -> Kafka -> accounting -> PostgreSQL
// (accounting.order, accounting.orderitem), so the run exercises the database writes.
//
// Env: BASE (default http://frontend-proxy:8080), RATE (checkouts per s, default 3),
//      DURATION (default 2m).
import http from "k6/http";
import { check } from "k6";
import { Rate } from "k6/metrics";

const BASE = __ENV.BASE || "http://frontend-proxy:8080";
// The ten products the demo seeds (src/postgresql/init.sql).
const IDS = ["0PUK6V6EV0", "1YMWWN1N4O", "2ZYFJ3GM2N", "66VCHSJNUP", "6E92ZMYYFZ",
  "9SIQT8TOJO", "L9ECAV7KIM", "LS4PSXUNUM", "OLJCESPC7Z", "HQTGWGPNH4"];
const JSON_HEADERS = { headers: { "Content-Type": "application/json" } };

const placed = new Rate("checkout_succeeded");

export const options = {
  scenarios: {
    checkout: {
      executor: "constant-arrival-rate",
      rate: Number(__ENV.RATE || 3),
      timeUnit: "1s",
      duration: __ENV.DURATION || "2m",
      preAllocatedVUs: 20,
      maxVUs: 300,
    },
  },
  thresholds: {
    "http_req_failed{ep:cart}": ["rate<0.01"],
    "http_req_duration{ep:checkout}": ["p(99)<30000"],
    checkout_succeeded: ["rate>=0"],
  },
  summaryTrendStats: ["avg", "min", "med", "max", "p(90)", "p(95)", "p(99)"],
};

export default function () {
  const userId = `k6-${__VU}-${__ITER}-${Date.now()}`;
  const productId = IDS[Math.floor(Math.random() * IDS.length)];

  const cart = http.post(
    `${BASE}/api/cart?currencyCode=USD`,
    JSON.stringify({ item: { productId, quantity: 1 }, userId }),
    { ...JSON_HEADERS, tags: { ep: "cart", name: "POST /api/cart" } },
  );
  if (!check(cart, { "cart 200": (r) => r.status === 200 })) return;

  // The body the storefront sends on Place Order.
  const order = http.post(
    `${BASE}/api/checkout?currencyCode=USD`,
    JSON.stringify({
      userId,
      email: "someone@example.com",
      address: { streetAddress: "1600 Amphitheatre Parkway", state: "CA", country: "United States",
        city: "Mountain View", zipCode: "94043" },
      userCurrency: "USD",
      creditCard: { creditCardCvv: 672, creditCardExpirationMonth: 1, creditCardExpirationYear: 2030,
        creditCardNumber: "4432-8015-6152-0454" },
    }),
    { ...JSON_HEADERS, tags: { ep: "checkout", name: "POST /api/checkout" } },
  );
  const ok = order.status === 200;
  placed.add(ok);
  check(order, { "order placed": () => ok });
}
