// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

// The card networks the shop accepts. A network is recognised by the leading
// digits of the card number (its IIN ranges) and by the number's length.
const NETWORKS = [
  {
    id: 'visa',
    name: 'Visa',
    prefixes: ['4'],
    lengths: [13, 16, 19],
  },
  {
    id: 'mastercard',
    name: 'Mastercard',
    prefixes: ['51', '52', '53', '54', '55', ...range(2221, 2720)],
    lengths: [16],
  },
  {
    id: 'amex',
    name: 'American Express',
    prefixes: ['34', '37'],
    lengths: [15],
  },
  {
    id: 'discover',
    name: 'Discover',
    prefixes: ['6011', '65', ...range(644, 649)],
    lengths: [16, 19],
  },
];

/** Every whole number from `from` to `to`, inclusive, as strings. */
function range(from, to) {
  return Array.from({ length: to - from + 1 }, (_, i) => String(from + i));
}

/** The card number with spaces and dashes removed. */
function normalizeNumber(number) {
  return String(number ?? '').replace(/[\s-]/g, '');
}

/**
 * The accepted network a card number belongs to, or undefined when no
 * accepted network issues numbers that start this way and have this length.
 */
function identifyNetwork(number) {
  const digits = normalizeNumber(number);
  return NETWORKS.find(
    network =>
      network.lengths.includes(digits.length) &&
      network.prefixes.some(prefix => digits.startsWith(prefix))
  );
}

/** The accepted networks, by display name, for messages to the customer. */
function acceptedNetworkNames() {
  const names = NETWORKS.map(network => network.name);
  return `${names.slice(0, -1).join(', ')} or ${names[names.length - 1]}`;
}

module.exports = { NETWORKS, normalizeNumber, identifyNetwork, acceptedNetworkNames };
