// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import type { NextApiHandler } from 'next';
import type { ServiceError } from '@grpc/grpc-js';
import CartGateway from '../../gateways/rpc/Cart.gateway';
import { AddItemRequest, Empty } from '../../protos/demo';
import ProductCatalogService from '../../services/ProductCatalog.service';
import { IProductCart, IProductCartItem } from '../../types/Cart';
import InstrumentationMiddleware from '../../utils/telemetry/InstrumentationMiddleware';

const MAX_PER_PRODUCT = 'Maximum 10 per product';

type TResponse = IProductCart | Empty | { error: string };

const handler: NextApiHandler<TResponse> = async ({ method, body, query }, res) => {
  switch (method) {
    case 'GET': {
      const { sessionId = '', currencyCode = '' } = query;
      if (!sessionId) {
        return res.status(400).json({ error: 'sessionId is required' });
      }
      const { userId, items } = await CartGateway.getCart(sessionId as string);

      const productList: IProductCartItem[] = await Promise.all(
        items.map(async ({ productId, quantity }) => {
          const product = await ProductCatalogService.getProduct(productId, currencyCode as string);

          return {
            productId,
            quantity,
            product,
          };
        })
      );

      return res.status(200).json({ userId, items: productList });
    }

    case 'POST': {
      const { userId, item } = body as AddItemRequest;

      try {
        await CartGateway.addItem(userId, item!);
      } catch (error) {
        if ((error as ServiceError)?.details === MAX_PER_PRODUCT) {
          return res.status(400).json({ error: MAX_PER_PRODUCT });
        }
        throw error;
      }
      const cart = await CartGateway.getCart(userId);

      return res.status(200).json(cart);
    }

    case 'DELETE': {
      const { userId } = body as AddItemRequest;
      await CartGateway.emptyCart(userId);

      return res.status(204).send('');
    }

    default: {
      res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
      return res.status(405).send('');
    }
  }
};

export default InstrumentationMiddleware(handler);
