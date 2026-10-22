// Skyramp Testbot test package: Testbot owns and maintains everything in this folder.
// Catalogue facts and request bodies shared by the backend, storefront API and browser tests.

export const ACCESSORY_IDS = ['L9ECAV7KIM', '0PUK6V6EV0', 'LS4PSXUNUM', '9SIQT8TOJO', '6E92ZMYYFZ'];

export const ACCESSORY_NAMES = [
  'Lens Cleaning Kit',
  'Solar System Color Imager',
  'Red Flashlight',
  'Optical Tube Assembly',
  'Solar Filter',
];

export const STARSENSE = { id: '66VCHSJNUP', name: 'Starsense Explorer Refractor Telescope' };
export const LENS_KIT = { id: 'L9ECAV7KIM', name: 'Lens Cleaning Kit' };

export const sortedByName = (names: string[]) =>
  [...names].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

export const usAddressJson = {
  streetAddress: '1600 Amphitheatre Parkway',
  city: 'Mountain View',
  state: 'CA',
  country: 'United States',
  zipCode: '94043',
};
