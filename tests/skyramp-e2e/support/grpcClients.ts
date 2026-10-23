import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'node:path';
import { grpcAddress } from './serviceAddresses';

export { status } from '@grpc/grpc-js';

const definition = protoLoader.loadSync(path.resolve(__dirname, '../../../pb/demo.proto'), {
  keepCase: true,
  longs: Number,
  enums: String,
  defaults: true,
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const oteldemo = (grpc.loadPackageDefinition(definition) as any).oteldemo;

type Client = grpc.Client;
type UnaryMethod<T> = (req: object, opts: grpc.CallOptions, cb: (e: grpc.ServiceError | null, r: T) => void) => void;

const client = (service: string, address: string): Client =>
  new oteldemo[service](address, grpc.credentials.createInsecure());

export const clients = {
  cart: () => client('CartService', grpcAddress.cart()),
  checkout: () => client('CheckoutService', grpcAddress.checkout()),
  currency: () => client('CurrencyService', grpcAddress.currency()),
  payment: () => client('PaymentService', grpcAddress.payment()),
  productCatalog: () => client('ProductCatalogService', grpcAddress.productCatalog()),
  recommendation: () => client('RecommendationService', grpcAddress.recommendation()),
  ad: () => client('AdService', grpcAddress.ad()),
};

// Calls a unary method and resolves with its response; a non-OK status rejects with the grpc ServiceError.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const rpc = <T = any>(c: Client, method: string, request: object): Promise<T> =>
  new Promise((resolve, reject) =>
    (c as unknown as Record<string, UnaryMethod<T>>)[method].call(
      c,
      request,
      { deadline: Date.now() + 10_000 },
      (error, response) => (error ? reject(error) : resolve(response))
    )
  );

// Resolves with the ServiceError of a call expected to fail, or null when the call succeeded.
export const rpcError = (c: Client, method: string, request: object): Promise<grpc.ServiceError | null> =>
  rpc(c, method, request).then(
    () => null,
    (error: grpc.ServiceError) => error
  );
