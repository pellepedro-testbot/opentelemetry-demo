// Clients for the demo's gRPC services, built from pb/demo.proto.
// Addresses default to the compose service names on the opentelemetry-demo network
// and can be overridden (e.g. CART_ADDR=localhost:32788) when running from the host.
import path from 'path';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';

const PROTO_PATH = path.resolve(__dirname, '../../../pb/demo.proto');

const definition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: Number,
  enums: String,
  defaults: true,
  oneofs: true,
});
const oteldemo = (grpc.loadPackageDefinition(definition) as any).oteldemo;

export const addresses = {
  cart: process.env.CART_ADDR ?? 'cart:7070',
  checkout: process.env.CHECKOUT_ADDR ?? 'checkout:5050',
  payment: process.env.PAYMENT_ADDR ?? 'payment:50051',
  productCatalog: process.env.PRODUCT_CATALOG_ADDR ?? 'product-catalog:3550',
};

export type UnaryResult<T> = { error?: grpc.ServiceError; response?: T };

const client = (service: string, address: string) =>
  new oteldemo[service](address, grpc.credentials.createInsecure());

const unary =
  (service: string, address: string) =>
  <T = any>(method: string, request: object, timeoutMs = 15000): Promise<UnaryResult<T>> => {
    const c = client(service, address);
    return new Promise(resolve => {
      c[method](request, { deadline: Date.now() + timeoutMs }, (error: grpc.ServiceError | null, response: T) => {
        c.close();
        resolve(error ? { error } : { response });
      });
    });
  };

export const cartService = unary('CartService', addresses.cart);
export const checkoutService = unary('CheckoutService', addresses.checkout);
export const paymentService = unary('PaymentService', addresses.payment);
export const productCatalogService = unary('ProductCatalogService', addresses.productCatalog);

export const Status = grpc.status;
