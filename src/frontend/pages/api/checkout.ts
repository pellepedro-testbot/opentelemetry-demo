// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import type { NextApiRequest, NextApiResponse } from 'next';
import type { ServiceError } from '@grpc/grpc-js';
import { context, Exception, SpanStatusCode, trace } from '@opentelemetry/api';
import InstrumentationMiddleware from '../../utils/telemetry/InstrumentationMiddleware';
import logger from '../../utils/telemetry/logger';
import CheckoutGateway from '../../gateways/rpc/Checkout.gateway';
import { Empty, PlaceOrderRequest, PlaceOrderResponse } from '../../protos/demo';
import { IProductCheckoutItem, IProductCheckout } from '../../types/Cart';
import ProductCatalogService from '../../services/ProductCatalog.service';

// Prefix checkout's Go service always uses for chargeCard failures (src/checkout/main.go),
// the only signal available to tell a payment decline apart from an unrelated internal error.
const PAYMENT_FAILURE_PREFIX = 'failed to charge card:';
const INVALID_ZIP_CODE = 'Invalid zip code';
const UNSUPPORTED_COUNTRY_PREFIX = 'We do not ship to ';
const CARD_DECLINED = 'Your card was declined.';
const INVALID_CVV = 'Invalid CVV';
const ORDER_LIMIT_EXCEEDED = 'Order exceeds the 5,000 USD limit';

type TResponse = IProductCheckout | Empty | { error: string; code?: string };

const handler = async ({ method, body, query }: NextApiRequest, res: NextApiResponse<TResponse>) => {
  switch (method) {
    case 'POST': {
      const { currencyCode = '' } = query;
      const orderData = body as PlaceOrderRequest;

      let placeOrderResponse: PlaceOrderResponse;
      try {
        placeOrderResponse = await CheckoutGateway.placeOrder(orderData);
      } catch (error) {
        const span = trace.getSpan(context.active());
        span?.recordException(error as Exception);
        span?.setStatus({ code: SpanStatusCode.ERROR });

        const details = (error as ServiceError)?.details || (error as Error)?.message || '';

        if (details === INVALID_ZIP_CODE) {
          return res.status(400).json({ error: INVALID_ZIP_CODE });
        }

        if (details.startsWith(UNSUPPORTED_COUNTRY_PREFIX)) {
          return res.status(400).json({ error: details });
        }

        if (details === ORDER_LIMIT_EXCEEDED) {
          return res.status(400).json({ error: ORDER_LIMIT_EXCEEDED });
        }

        if (details.startsWith(PAYMENT_FAILURE_PREFIX)) {
          if (!details.includes('code = Unavailable') && !details.includes('code = Internal')) {
            if (details.includes(CARD_DECLINED)) {
              logger.info({ details }, 'Checkout card declined');
              return res.status(422).json({ error: CARD_DECLINED, code: 'PAYMENT_FAILED' });
            }

            if (details.includes(INVALID_CVV)) {
              logger.info({ details }, 'Checkout invalid CVV');
              return res.status(422).json({ error: INVALID_CVV, code: 'PAYMENT_FAILED' });
            }

            logger.info({ details }, 'Checkout payment declined');
            return res.status(422).json({
              error: 'Your payment could not be processed. Please check your card details and try again.',
              code: 'PAYMENT_FAILED',
            });
          }
        }

        logger.error({ err: error }, 'Checkout failed to place order');
        return res.status(500).json({ error: 'Failed to place order.' });
      }

      const { order: { items = [], ...order } = {} } = placeOrderResponse;

      const productList: IProductCheckoutItem[] = await Promise.all(
        items.map(async ({ item: { productId = '', quantity = 0 } = {}, cost }) => {
          const product = await ProductCatalogService.getProduct(productId, currencyCode as string);

          return {
            cost,
            item: {
              productId,
              quantity,
              product,
            },
          };
        })
      );

      logger.info({ 'demo.order.id': placeOrderResponse.order?.orderId }, 'Order placed successfully');
      return res.status(200).json({ ...order, items: productList });
    }

    default: {
      return res.status(405).send('');
    }
  }
};

export default InstrumentationMiddleware(handler);
