// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import type { NextApiRequest, NextApiResponse } from 'next';
import { ServiceError, status } from '@grpc/grpc-js';
import InstrumentationMiddleware from '../../../utils/telemetry/InstrumentationMiddleware';
import { Empty, Product } from '../../../protos/demo';
import ProductCatalogService from '../../../services/ProductCatalog.service';

type TResponse = Product[] | Empty | { error: string };

const handler = async ({ method, query }: NextApiRequest, res: NextApiResponse<TResponse>) => {
  switch (method) {
    case 'GET': {
      const { currencyCode = '', category = '', q } = query;
      // q runs a text search (ranked by product-catalog) and takes precedence over category
      const search = Array.isArray(q) ? q[0] : q;
      let productList: Product[];
      try {
        productList = await ProductCatalogService.listProducts(currencyCode as string, category as string, search);
      } catch (error) {
        if ((error as ServiceError)?.code === status.INVALID_ARGUMENT) {
          return res.status(400).json({ error: (error as ServiceError).details });
        }
        throw error;
      }

      return res.status(200).json(productList);
    }

    default: {
      return res.status(405).send('');
    }
  }
};

export default InstrumentationMiddleware(handler);
