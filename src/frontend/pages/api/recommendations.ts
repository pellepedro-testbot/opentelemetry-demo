// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import type { NextApiRequest, NextApiResponse } from 'next';
import { status, type ServiceError } from '@grpc/grpc-js';
import InstrumentationMiddleware from '../../utils/telemetry/InstrumentationMiddleware';
import RecommendationsGateway from '../../gateways/rpc/Recommendations.gateway';
import { Empty, Product } from '../../protos/demo';
import ProductCatalogService from '../../services/ProductCatalog.service';

type TResponse = Product[] | Empty | { error: string };

// Upper bound for maxResults; recommendation enforces the same limit
const MAX_RESULTS_LIMIT = 100;

const handler = async ({ method, query }: NextApiRequest, res: NextApiResponse<TResponse>) => {
  switch (method) {
    case 'GET': {
      const { productIds = [], sessionId = '', currencyCode = '', maxResults = '', limit = '' } = query;
      if (limit !== '' && !/^[1-4]$/.test(limit as string)) {
        return res.status(400).json({ error: 'limit must be an integer from 1 to 4' });
      }
      if (maxResults !== '' && !/^\d+$/.test(maxResults as string)) {
        return res.status(400).json({ error: 'maxResults must be a non-negative integer' });
      }
      const max = Number(maxResults);
      if (max > MAX_RESULTS_LIMIT) {
        return res.status(400).json({ error: `maxResults must not exceed ${MAX_RESULTS_LIMIT}` });
      }
      let productList: string[];
      try {
        ({ productIds: productList } = await RecommendationsGateway.listRecommendations(
          sessionId as string,
          productIds as string[],
          max
        ));
      } catch (error) {
        // Ids the recommendation service refuses are the client's error, not the server's
        if ((error as ServiceError)?.code === status.INVALID_ARGUMENT) {
          return res.status(400).json({ error: (error as ServiceError).details });
        }
        throw error;
      }
      const recommendedProductList = await Promise.all(
        productList.slice(0, max || 4).map(id => ProductCatalogService.getProduct(id, currencyCode as string))
      );

      return res.status(200).json(limit === '' ? recommendedProductList : recommendedProductList.slice(0, Number(limit)));
    }

    default: {
      return res.status(405).send('');
    }
  }
};

export default InstrumentationMiddleware(handler);
