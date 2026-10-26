// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { useMemo } from 'react';
import getSymbolFromCurrency from 'currency-symbol-map';
import { Money } from '../../protos/demo';
import { useCurrency } from '../../providers/Currency.provider';
import { CypressFields } from '../../utils/enums/CypressFields';

interface IProps {
  price: Money;
}

const ProductPrice = ({ price: { units, currencyCode, nanos } }: IProps) => {
  const { selectedCurrency } = useCurrency();

  const currencySymbol = useMemo(
    () => getSymbolFromCurrency(currencyCode) || selectedCurrency,
    [currencyCode, selectedCurrency]
  );

  const total = units + nanos / 1000000000;

  return (
    <span data-cy={CypressFields.ProductPrice}>
      {currencySymbol} {total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
    </span>
  );
};

export default ProductPrice;
