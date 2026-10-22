// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import type { NextApiRequest, NextApiResponse } from 'next';
import InstrumentationMiddleware from '../../utils/telemetry/InstrumentationMiddleware';
import ShippingGateway from '../../gateways/http/Shipping.gateway';
import { Address, CartItem, Empty, Money } from '../../protos/demo';
import CurrencyGateway from '../../gateways/rpc/Currency.gateway';

type TResponse = (Money & { carrier: string }) | Empty | { error: string };

const handler = async ({ method, query }: NextApiRequest, res: NextApiResponse<TResponse>) => {
  switch (method) {
    case 'GET': {
      const { itemList = '', currencyCode = 'USD', address = '' } = query;
      if (!itemList) {
        return res.status(400).json({ error: 'itemList is required' });
      }
      const { costUsd, carrier } = await ShippingGateway.getShippingCost(JSON.parse(itemList as string) as CartItem[],
          JSON.parse(address as string) as Address);
      const cost = await CurrencyGateway.convert(costUsd!, currencyCode as string);

      return res.status(200).json({ ...cost!, carrier });
    }

    default: {
      res.setHeader('Allow', ['GET']);
      return res.status(405).send('');
    }
  }
};

export default InstrumentationMiddleware(handler);
