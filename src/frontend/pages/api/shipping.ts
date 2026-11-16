// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import type { NextApiRequest, NextApiResponse } from 'next';
import InstrumentationMiddleware from '../../utils/telemetry/InstrumentationMiddleware';
import ShippingGateway from '../../gateways/http/Shipping.gateway';
import { Address, CartItem, Empty, Money } from '../../protos/demo';
import CurrencyGateway from '../../gateways/rpc/Currency.gateway';

type TResponse = Money | Empty | { error: string };

// A query parameter holding JSON, or undefined when it is missing or not valid JSON.
const parseJsonParam = (value: string | string[] | undefined): unknown => {
  if (typeof value !== 'string' || value === '') return undefined;
  try {
    return JSON.parse(value);
  } catch {
    return undefined;
  }
};

const handler = async ({ method, query }: NextApiRequest, res: NextApiResponse<TResponse>) => {
  switch (method) {
    case 'GET': {
      const { currencyCode = 'USD' } = query;
      const itemList = parseJsonParam(query.itemList);
      const address = parseJsonParam(query.address);

      if (!Array.isArray(itemList) || itemList.length === 0) {
        return res.status(400).json({ error: 'itemList must be a non-empty JSON array of cart items.' });
      }
      if (address === null || typeof address !== 'object' || Array.isArray(address)) {
        return res.status(400).json({ error: 'address must be a JSON object.' });
      }

      const { costUsd } = await ShippingGateway.getShippingCost(itemList as CartItem[], address as Address);
      const cost = await CurrencyGateway.convert(costUsd!, currencyCode as string);

      return res.status(200).json(cost!);
    }

    default: {
      res.setHeader('Allow', 'GET');
      return res.status(405).send('');
    }
  }
};

export default InstrumentationMiddleware(handler);
