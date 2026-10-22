// Skyramp Testbot test package: Testbot owns and maintains everything in this folder.
// gRPC clients for the demo services, built from pb/demo.proto. Addresses use the same
// variable names as the repository's .env so they can be pointed at mapped ports.
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { resolve } from 'path';

const definition = protoLoader.loadSync(resolve(__dirname, '../../pb/demo.proto'), {
  keepCase: true,
  longs: Number,
  enums: String,
  defaults: true,
});
const oteldemo = (grpc.loadPackageDefinition(definition) as any).oteldemo;

export const addresses = {
  cart: process.env.CART_ADDR ?? 'cart:7070',
  checkout: process.env.CHECKOUT_ADDR ?? 'checkout:5050',
  payment: process.env.PAYMENT_ADDR ?? 'payment:50051',
  productCatalog: process.env.PRODUCT_CATALOG_ADDR ?? 'product-catalog:3550',
  recommendation: process.env.RECOMMENDATION_ADDR ?? 'recommendation:9001',
  ad: process.env.AD_ADDR ?? 'ad:9555',
  currency: process.env.CURRENCY_ADDR ?? 'currency:7001',
};

export const SHIPPING_URL = process.env.SHIPPING_ADDR ?? 'http://shipping:50050';

export type GrpcResult<T = any> = { response?: T; error?: grpc.ServiceError };

export const clientFor = (service: string, address: string, options: grpc.ChannelOptions = {}) => {
  const client = new oteldemo[service](address, grpc.credentials.createInsecure(), options);
  return (method: string, request: object): Promise<GrpcResult> =>
    new Promise(done => {
      client[method](request, { deadline: Date.now() + 10_000 }, (error: grpc.ServiceError | null, response: any) =>
        done(error ? { error } : { response })
      );
    });
};

export const cart = clientFor('CartService', addresses.cart);
export const checkout = clientFor('CheckoutService', addresses.checkout);
export const payment = clientFor('PaymentService', addresses.payment);
export const productCatalog = clientFor('ProductCatalogService', addresses.productCatalog);
export const recommendation = clientFor('RecommendationService', addresses.recommendation);
export const ad = clientFor('AdService', addresses.ad);
export const currency = clientFor('CurrencyService', addresses.currency);

export const { status } = grpc;

export const nextYear = new Date().getFullYear() + 1;

export const usAddress = {
  street_address: '1600 Amphitheatre Parkway',
  city: 'Mountain View',
  state: 'CA',
  country: 'United States',
  zip_code: '94043',
};

export const validCard = {
  credit_card_number: '4432-8015-6152-0454',
  credit_card_cvv: 672,
  credit_card_expiration_year: nextYear,
  credit_card_expiration_month: 1,
};

export const uniqueUser = (label: string) => `testbot-${label}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
