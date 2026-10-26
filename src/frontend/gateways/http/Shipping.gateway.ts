// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { Address, CartItem, GetQuoteResponse } from '../../protos/demo';

const { SHIPPING_ADDR = '' } = process.env;

// Transform address from camelCase to snake_case for HTTP API
const transformAddress = (address: Address) => ({
  street_address: address.streetAddress,
  city: address.city,
  state: address.state,
  country: address.country,
  zip_code: address.zipCode,
});

// Transform cart items from camelCase to snake_case for HTTP API
const transformCartItems = (items: CartItem[]) => 
  items.map(item => ({
    product_id: item.productId,
    quantity: item.quantity,
  }));

const ShippingGateway = () => ({
  async getShippingCost(itemList: CartItem[], address: Address): Promise<GetQuoteResponse & { carrier: string; zone: string; estimatedDeliveryDays: number; packageSize: string; boxes: number; quoteExpiresAt: string; weightKg: number; shipsFrom: string; signatureRequired: boolean }> {
    const requestBody = {
      items: transformCartItems(itemList),
      address: transformAddress(address),
    };

    const response = await fetch(`${SHIPPING_ADDR}/get-quote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw Object.assign(new Error(`HTTP error: ${response.status} ${response.statusText} - ${errorText}`), {
        status: response.status,
        body: errorText,
      });
    }

    const data = await response.json();
    
    const costUsd = data.cost_usd ? {
      currencyCode: data.cost_usd.currency_code,
      units: data.cost_usd.units,
      nanos: data.cost_usd.nanos,
    } : undefined;

    const transformedResponse: GetQuoteResponse & { carrier: string; zone: string; estimatedDeliveryDays: number; packageSize: string; boxes: number; quoteExpiresAt: string; weightKg: number; shipsFrom: string; signatureRequired: boolean } = {
      costUsd,
      carrier: data.carrier,
      zone: data.zone,
      estimatedDeliveryDays: data.estimated_delivery_days,
      packageSize: data.package_size,
      boxes: data.boxes,
      quoteExpiresAt: data.quote_expires_at,
      weightKg: data.weight_kg,
      shipsFrom: data.ships_from,
      signatureRequired: data.signature_required,
    };
    
    return transformedResponse;
  },
});

export default ShippingGateway(); 
