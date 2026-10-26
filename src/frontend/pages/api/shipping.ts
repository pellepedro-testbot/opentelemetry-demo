// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import type { NextApiRequest, NextApiResponse } from 'next';
import InstrumentationMiddleware from '../../utils/telemetry/InstrumentationMiddleware';
import ShippingGateway from '../../gateways/http/Shipping.gateway';
import { Address, CartItem, Empty, Money } from '../../protos/demo';
import CurrencyGateway from '../../gateways/rpc/Currency.gateway';

type TResponse = (Money & { carrier: string; zone: string; estimatedDeliveryDays: number; packageSize: string; boxes: number; quoteExpiresAt: string; weightKg: number; shipsFrom: string }) | Empty | { error: string };

const handler = async ({ method, query }: NextApiRequest, res: NextApiResponse<TResponse>) => {
  switch (method) {
    case 'GET': {
      const { itemList = '', currencyCode = 'USD', address = '' } = query;
      if (!itemList) {
        return res.status(400).json({ error: 'itemList is required' });
      }
      if (!/^[A-Z]{3}$/.test(currencyCode as string)) {
        return res.status(400).json({ error: 'currencyCode must be a 3-letter code' });
      }
      let items: CartItem[];
      let shippingAddress: Address;
      try {
        items = JSON.parse(itemList as string) as CartItem[];
        shippingAddress = JSON.parse(address as string) as Address;
      } catch {
        return res.status(400).json({ error: 'itemList and address must be JSON' });
      }
      let quote;
      try {
        quote = await ShippingGateway.getShippingCost(items, shippingAddress);
      } catch (error) {
        // Shipping's 400 (e.g. no items) is the client's error, not the server's
        const { status, body } = error as { status?: number; body?: string };
        if (status === 400) {
          return res.status(400).json({ error: body || 'Bad request' });
        }
        throw error;
      }
      const { costUsd, carrier, zone, estimatedDeliveryDays, packageSize, boxes, quoteExpiresAt, weightKg, shipsFrom } = quote;
      const cost = await CurrencyGateway.convert(costUsd!, currencyCode as string);

      return res.status(200).json({ ...cost!, carrier, zone, estimatedDeliveryDays, packageSize, boxes, quoteExpiresAt, weightKg, shipsFrom });
    }

    default: {
      res.setHeader('Allow', ['GET']);
      return res.status(405).send('');
    }
  }
};

export default InstrumentationMiddleware(handler);
