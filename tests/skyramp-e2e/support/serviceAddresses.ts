import { execFileSync } from 'node:child_process';

// Backend services are reached on the port docker publishes for them, unless an env var names the address.
const publishedAddress = (container: string, port: number, envVar: string): string => {
  const fromEnv = process.env[envVar];
  if (fromEnv) return fromEnv;
  const published = execFileSync('docker', ['port', container, String(port)], { encoding: 'utf8' })
    .split('\n')
    .find(line => line.startsWith('0.0.0.0:'));
  if (!published) throw new Error(`No published port for ${container}:${port}; set ${envVar}`);
  return published.replace('0.0.0.0', '127.0.0.1');
};

export const frontendUrl = process.env.BASE_URL ?? 'http://localhost:8080';

export const grpcAddress = {
  cart: () => publishedAddress('cart', 7070, 'CART_ADDR'),
  checkout: () => publishedAddress('checkout', 5050, 'CHECKOUT_ADDR'),
  currency: () => publishedAddress('currency', 7001, 'CURRENCY_ADDR'),
  payment: () => publishedAddress('payment', 50051, 'PAYMENT_ADDR'),
  productCatalog: () => publishedAddress('product-catalog', 3550, 'PRODUCT_CATALOG_ADDR'),
  recommendation: () => publishedAddress('recommendation', 9001, 'RECOMMENDATION_ADDR'),
  ad: () => publishedAddress('ad', 9555, 'AD_ADDR'),
};

export const shippingUrl = () => `http://${publishedAddress('shipping', 50050, 'SHIPPING_ADDR')}`;
