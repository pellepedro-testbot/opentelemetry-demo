// gRPC clients for the demo services, built from pb/demo.proto and reached on
// the ports docker publishes for each container.
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'node:path';
import { REPO_ROOT, hostAddress } from './stack';

const definition = protoLoader.loadSync(path.join(REPO_ROOT, 'pb/demo.proto'), {
  keepCase: true,
  longs: Number,
  enums: String,
  defaults: true,
  oneofs: true,
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const oteldemo = (grpc.loadPackageDefinition(definition) as any).oteldemo;

const SERVICES = {
  AdService: { container: 'ad', port: 9555 },
  CartService: { container: 'cart', port: 7070 },
  CheckoutService: { container: 'checkout', port: 5050 },
  CurrencyService: { container: 'currency', port: 7001 },
  PaymentService: { container: 'payment', port: 50051 },
  ProductCatalogService: { container: 'product-catalog', port: 3550 },
  RecommendationService: { container: 'recommendation', port: 9001 },
} as const;

export type ServiceName = keyof typeof SERVICES;

export interface UnaryResult<T> {
  response?: T;
  error?: grpc.ServiceError;
  headers: grpc.Metadata;
}

const clients = new Map<string, grpc.Client>();

function client(service: ServiceName): grpc.Client {
  const { container, port } = SERVICES[service];
  const address = hostAddress(container, port);
  const key = `${service}@${address}`;
  if (!clients.has(key)) {
    clients.set(key, new oteldemo[service](address, grpc.credentials.createInsecure()));
  }
  return clients.get(key)!;
}

/**
 * Calls one unary method and resolves with the response or the gRPC error,
 * plus the response headers, without throwing.
 */
export function unary<T = any>( // eslint-disable-line @typescript-eslint/no-explicit-any
  service: ServiceName,
  method: string,
  request: object,
  metadata: Record<string, string> = {},
  timeoutMs = 10_000
): Promise<UnaryResult<T>> {
  const md = new grpc.Metadata();
  for (const [k, v] of Object.entries(metadata)) md.set(k, v);
  const c = client(service) as unknown as Record<string, Function>;
  return new Promise(resolve => {
    let headers = new grpc.Metadata();
    const call = c[method].call(
      c,
      request,
      md,
      { deadline: new Date(Date.now() + timeoutMs) },
      (error: grpc.ServiceError | null, response: T) =>
        resolve(error ? { error, headers } : { response, headers })
    );
    call.on('metadata', (m: grpc.Metadata) => {
      headers = m;
    });
  });
}

/** Like unary, but throws on a gRPC error. */
export async function call<T = any>( // eslint-disable-line @typescript-eslint/no-explicit-any
  service: ServiceName,
  method: string,
  request: object,
  metadata: Record<string, string> = {}
): Promise<T> {
  const result = await unary<T>(service, method, request, metadata);
  if (result.error) throw result.error;
  return result.response!;
}

export function closeClients(): void {
  for (const c of clients.values()) c.close();
  clients.clear();
}

export { grpc };
