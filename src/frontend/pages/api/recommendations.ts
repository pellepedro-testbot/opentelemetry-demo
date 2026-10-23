// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import type { NextApiRequest, NextApiResponse } from 'next';
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
      const { productIds = [], sessionId = '', currencyCode = '', maxResults = '' } = query;
      if (maxResults !== '' && !/^\d+$/.test(maxResults as string)) {
        return res.status(400).json({ error: 'maxResults must be a non-negative integer' });
      }
      const max = Number(maxResults);
      if (max > MAX_RESULTS_LIMIT) {
        return res.status(400).json({ error: `maxResults must not exceed ${MAX_RESULTS_LIMIT}` });
      }
      const { productIds: productList } = await RecommendationsGateway.listRecommendations(
        sessionId as string,
        productIds as string[],
        max
      );
      const recommendedProductList = await Promise.all(
        productList.slice(0, max || 4).map(id => ProductCatalogService.getProduct(id, currencyCode as string))
      );

      return res.status(200).json(recommendedProductList);
    }

    default: {
      return res.status(405).send('');
    }
  }
};

export default InstrumentationMiddleware(handler);
