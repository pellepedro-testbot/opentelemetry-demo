// gRPC clients for the demo's backend services, built from pb/demo.proto.
// Addresses follow the compose service names (reachable on the `opentelemetry-demo`
// docker network) and can be overridden with the same *_ADDR variables .env defines.
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { expect } from '@playwright/test';

const PROTO_PATH = path.resolve(__dirname, '../../../pb/demo.proto');

const definition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: Number,
  enums: String,
  defaults: true,
  oneofs: true,
});
const oteldemo = (grpc.loadPackageDefinition(definition) as any).oteldemo;

const addr = (envName: string, fallback: string) => process.env[envName] || fallback;

const client = (service: string, address: string) =>
  new oteldemo[service](address, grpc.credentials.createInsecure()) as grpc.Client;

export const services = {
  cart: client('CartService', addr('CART_ADDR', 'cart:7070')),
  checkout: client('CheckoutService', addr('CHECKOUT_ADDR', 'checkout:5050')),
  payment: client('PaymentService', addr('PAYMENT_ADDR', 'payment:50051')),
  productCatalog: client('ProductCatalogService', addr('PRODUCT_CATALOG_ADDR', 'product-catalog:3550')),
  recommendation: client('RecommendationService', addr('RECOMMENDATION_ADDR', 'recommendation:9001')),
  ad: client('AdService', addr('AD_ADDR', 'ad:9555')),
  currency: client('CurrencyService', addr('CURRENCY_ADDR', 'currency:7001')),
};

export type GrpcResult<T = any> = { ok: true; response: T } | { ok: false; error: grpc.ServiceError };

export const call = <T = any>(svc: grpc.Client, method: string, request: object): Promise<GrpcResult<T>> =>
  new Promise(resolve => {
    (svc as any)[method](request, { deadline: Date.now() + 15_000 }, (error: grpc.ServiceError | null, response: T) =>
      resolve(error ? { ok: false, error } : { ok: true, response })
    );
  });

export const callOk = async <T = any>(svc: grpc.Client, method: string, request: object): Promise<T> => {
  const result = await call<T>(svc, method, request);
  if (!result.ok) {
    throw new Error(`${method} failed: ${grpc.status[result.error.code]} ${result.error.details}`);
  }
  return result.response;
};

export const expectStatus = (result: GrpcResult, code: grpc.status, details?: string | RegExp) => {
  expect(result.ok, 'expected the call to fail').toBe(false);
  if (result.ok) return;
  expect(grpc.status[result.error.code]).toBe(grpc.status[code]);
  if (typeof details === 'string') expect(result.error.details).toBe(details);
  else if (details) expect(result.error.details).toMatch(details);
};

export const newUserId = () => randomUUID();

export const getCartItems = async (userId: string) =>
  (await callOk<{ items: { product_id: string; quantity: number }[] }>(services.cart, 'GetCart', { user_id: userId }))
    .items;

export const addItem = (userId: string, productId: string, quantity: number) =>
  call(services.cart, 'AddItem', { user_id: userId, item: { product_id: productId, quantity } });

export const usd = (units: number, nanos = 0) => ({ currency_code: 'USD', units, nanos });

export const toNanos = (money: { units: number; nanos: number }) => Number(money.units) * 1e9 + Number(money.nanos);

export const validCard = (overrides: object = {}) => ({
  credit_card_number: '4432-8015-6152-0454',
  credit_card_cvv: 672,
  credit_card_expiration_year: 2030,
  credit_card_expiration_month: 1,
  ...overrides,
});

export const usAddress = (overrides: object = {}) => ({
  street_address: '1600 Amphitheatre Parkway',
  city: 'Mountain View',
  state: 'CA',
  country: 'United States',
  zip_code: '94043',
  ...overrides,
});

export const placeOrderRequest = (userId: string, overrides: object = {}) => ({
  user_id: userId,
  user_currency: 'USD',
  address: usAddress(),
  email: 'someone@example.com',
  credit_card: validCard(),
  ...overrides,
});

export { grpc };
