// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { getShippingQuote, moneyAmount } from '../../utils/CypressStoreApi';

const TELESCOPE_ID = '66VCHSJNUP';
const IMAGER_ID = '0PUK6V6EV0';

describe('Shipping quote API', () => {
  it('quotes more for five units of a product than for one', () => {
    getShippingQuote([{ productId: TELESCOPE_ID, quantity: 1 }]).then(one => {
      getShippingQuote([{ productId: TELESCOPE_ID, quantity: 5 }]).then(five => {
        expect(moneyAmount(five), `quote for 5 units (${JSON.stringify(five)}) vs 1 unit (${JSON.stringify(one)})`).to.be.greaterThan(
          moneyAmount(one)
        );
      });
    });
  });

  it('quotes two lines of one unit like one line of two units', () => {
    getShippingQuote([
      { productId: TELESCOPE_ID, quantity: 1 },
      { productId: IMAGER_ID, quantity: 1 },
    ]).then(twoLines => {
      getShippingQuote([{ productId: TELESCOPE_ID, quantity: 2 }]).then(twoUnits => {
        expect(twoUnits).to.deep.equal(twoLines);
      });
    });
  });
});

export {};
