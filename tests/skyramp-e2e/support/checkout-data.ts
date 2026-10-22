// Order data shared by the checkout tests: the storefront form defaults and the special cards.
export const NEXT_YEAR = new Date().getFullYear() + 1;

export const VALID_CARD_NUMBER = '4432-8015-6152-0454';
export const DECLINED_CARD_NUMBER = '4000-0000-0000-0002';
export const CARD_DECLINED_MESSAGE = 'Your card was declined.';
export const INVALID_ZIP_MESSAGE = 'Invalid zip code';
export const GENERIC_PAYMENT_MESSAGE =
  'Your payment could not be processed. Please check your card details and try again.';

export const PRODUCT_IDS = {
  explorascope: 'OLJCESPC7Z',
  opticalTube: '9SIQT8TOJO',
  cometBook: 'HQTGWGPNH4',
  starsense: '66VCHSJNUP',
};

export const PRODUCT_NAMES_A_TO_Z = [
  'Eclipsmart Travel Refractor Telescope',
  'Lens Cleaning Kit',
  'National Park Foundation Explorascope',
  'Optical Tube Assembly',
  'Red Flashlight',
  'Roof Binoculars',
  'Solar Filter',
  'Solar System Color Imager',
  'Starsense Explorer Refractor Telescope',
  'The Comet Book',
];

export const usAddress = (zipCode = '94043') => ({
  streetAddress: '1600 Amphitheatre Parkway',
  city: 'Mountain View',
  state: 'CA',
  country: 'United States',
  zipCode,
});

export const storefrontOrder = (
  userId: string,
  { zipCode = '94043', country = 'United States', cardNumber = VALID_CARD_NUMBER, expirationYear = NEXT_YEAR } = {}
) => ({
  userId,
  email: 'p@example.com',
  userCurrency: 'USD',
  address: { ...usAddress(zipCode), country },
  creditCard: {
    creditCardNumber: cardNumber,
    creditCardCvv: 672,
    creditCardExpirationYear: expirationYear,
    creditCardExpirationMonth: 1,
  },
});

export const uniqueUserId = (label: string) => `req10-${label}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
