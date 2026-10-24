// Seeded product catalog of the demo (src/product-catalog products), by id.
export const products = {
  '1YMWWN1N4O': { name: 'Eclipsmart Travel Refractor Telescope', priceNanos: 129_950_000_000, categories: ['telescopes', 'travel'] },
  L9ECAV7KIM: { name: 'Lens Cleaning Kit', priceNanos: 21_950_000_000, categories: ['accessories'] },
  OLJCESPC7Z: { name: 'National Park Foundation Explorascope', priceNanos: 101_960_000_000, categories: ['telescopes'] },
  '9SIQT8TOJO': { name: 'Optical Tube Assembly', priceNanos: 3_599_000_000_000, categories: ['accessories', 'telescopes', 'assembly'] },
  LS4PSXUNUM: { name: 'Red Flashlight', priceNanos: 57_080_000_000, categories: ['accessories', 'flashlights'] },
  '2ZYFJ3GM2N': { name: 'Roof Binoculars', priceNanos: 209_950_000_000, categories: ['binoculars'] },
  '6E92ZMYYFZ': { name: 'Solar Filter', priceNanos: 69_950_000_000, categories: ['accessories', 'telescopes'] },
  '0PUK6V6EV0': { name: 'Solar System Color Imager', priceNanos: 175_000_000_000, categories: ['accessories', 'telescopes'] },
  '66VCHSJNUP': { name: 'Starsense Explorer Refractor Telescope', priceNanos: 349_950_000_000, categories: ['telescopes'] },
  HQTGWGPNH4: { name: 'The Comet Book', priceNanos: 990_000_000, categories: ['books'] },
} as const;

export type ProductId = keyof typeof products;

export const productIds = Object.keys(products) as ProductId[];

export const idsInCategory = (category: string) =>
  productIds.filter(id => (products[id].categories as readonly string[]).includes(category));

export const STARSENSE_AD_TEXT = /^Starsense Explorer/;
export const FREE_RETURNS_AD_TEXT = 'Free returns within 30 days';
