import { execFileSync } from 'node:child_process';
import path from 'node:path';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { expect } from '@playwright/test';

const PROTO_PATH = path.resolve(__dirname, '../../../pb/demo.proto');

const definition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: false,
  longs: Number,
  enums: String,
  defaults: true,
  oneofs: true,
});
const oteldemo = (grpc.loadPackageDefinition(definition) as any).oteldemo;

// Resolves where a demo service answers: <NAME>_ADDR if set, else the host port Docker
// published for its container, else the compose service name on the docker network.
function resolveAddress(service: string, port: number): string {
  const override = process.env[`${service.toUpperCase().replace(/-/g, '_')}_ADDR`];
  if (override) return override;
  try {
    const published = execFileSync('docker', ['port', service, String(port)], { encoding: 'utf8' })
      .split('\n')
      .find(line => line.startsWith('0.0.0.0:'));
    if (published) return `localhost:${published.split(':')[1].trim()}`;
  } catch {
    // docker not reachable: running inside the compose network
  }
  return `${service}:${port}`;
}

const clients = new Map<string, grpc.Client>();

function client(serviceName: string, host: string, port: number): grpc.Client {
  if (!clients.has(serviceName)) {
    clients.set(
      serviceName,
      new oteldemo[serviceName](resolveAddress(host, port), grpc.credentials.createInsecure()) as grpc.Client
    );
  }
  return clients.get(serviceName)!;
}

type Unary = (request: Record<string, unknown>) => Promise<any>;

function unary(serviceName: string, host: string, port: number, method: string): Unary {
  return request =>
    new Promise((resolve, reject) => {
      const c = client(serviceName, host, port) as any;
      c[method](request, { deadline: Date.now() + 15_000 }, (error: grpc.ServiceError | null, response: unknown) =>
        error ? reject(error) : resolve(response)
      );
    });
}

export const cart = {
  addItem: unary('CartService', 'cart', 7070, 'addItem'),
  getCart: unary('CartService', 'cart', 7070, 'getCart'),
  emptyCart: unary('CartService', 'cart', 7070, 'emptyCart'),
};
export const checkout = { placeOrder: unary('CheckoutService', 'checkout', 5050, 'placeOrder') };
export const currency = {
  getSupportedCurrencies: unary('CurrencyService', 'currency', 7001, 'getSupportedCurrencies'),
  convert: unary('CurrencyService', 'currency', 7001, 'convert'),
};
export const payment = { charge: unary('PaymentService', 'payment', 50051, 'charge') };
export const productCatalog = {
  listProducts: unary('ProductCatalogService', 'product-catalog', 3550, 'listProducts'),
  getProduct: unary('ProductCatalogService', 'product-catalog', 3550, 'getProduct'),
  searchProducts: unary('ProductCatalogService', 'product-catalog', 3550, 'searchProducts'),
};
export const recommendation = {
  listRecommendations: unary('RecommendationService', 'recommendation', 9001, 'listRecommendations'),
};
export const ad = { getAds: unary('AdService', 'ad', 9555, 'getAds') };

export const Status = grpc.status;

export async function grpcError(call: Promise<unknown>): Promise<grpc.ServiceError> {
  try {
    const response = await call;
    throw new Error(`expected a gRPC error, got ${JSON.stringify(response)}`);
  } catch (error) {
    if ((error as grpc.ServiceError).code === undefined) throw error;
    return error as grpc.ServiceError;
  }
}

export async function expectGrpcError(call: Promise<unknown>, code: grpc.status, details?: string) {
  const error = await grpcError(call);
  expect(grpc.status[error.code], error.details).toBe(grpc.status[code]);
  if (details !== undefined) expect(error.details).toBe(details);
}

export const VALID_CARD = {
  creditCardNumber: '4432-8015-6152-0454',
  creditCardCvv: 672,
  creditCardExpirationYear: 2030,
  creditCardExpirationMonth: 1,
};

export const US_ADDRESS = {
  streetAddress: '1600 Amphitheatre Parkway',
  city: 'Mountain View',
  state: 'CA',
  country: 'United States',
  zipCode: '94043',
};

export const usd = (units: number, nanos = 0) => ({ currencyCode: 'USD', units, nanos });

export const toNumber = (money: { units: number; nanos: number }) => Number(money.units) + money.nanos / 1e9;
