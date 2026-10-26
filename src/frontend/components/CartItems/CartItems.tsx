// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { useMemo } from 'react';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import ApiGateway from '../../gateways/Api.gateway';
import { Address, Money } from '../../protos/demo';
import { useCurrency } from '../../providers/Currency.provider';
import { useCart } from '../../providers/Cart.provider';
import { IProductCartItem } from '../../types/Cart';
import ProductPrice from '../ProductPrice';
import CartItem from './CartItem';
import * as S from './CartItems.styled';

interface IProps {
  productList: IProductCartItem[];
  shouldShowPrice?: boolean;
  country?: string;
}

const CartItems = ({ productList, shouldShowPrice = true, country = 'United States' }: IProps) => {
  const { updateItemQuantity } = useCart();
  const { selectedCurrency } = useCurrency();
  const address: Address = {
    streetAddress: '1600 Amphitheatre Parkway',
    city: 'Mountain View',
    state: 'CA',
    country,
    zipCode: '94043',
  };

  const queryKey = ['shipping', productList, selectedCurrency, address];
  const queryFn = () => ApiGateway.getShippingCost(productList, selectedCurrency, address);
  const queryOptions: UseQueryOptions<Money & { carrier?: string; zone?: string; estimatedDeliveryDays?: number; packageSize?: string; boxes?: number; quoteExpiresAt?: string; weightKg?: number; shipsFrom?: string; signatureRequired?: boolean }, Error> = {
    queryKey,
    queryFn,
    // An empty cart has nothing to ship; shipping refuses an empty item list
    enabled: productList.length > 0,
    // A refused quote (e.g. too many items) does not succeed on a retry
    retry: false,
  };
  const { data: shippingConst = { units: 0, currencyCode: 'USD', nanos: 0 }, isSuccess, isLoading, isError } = useQuery(queryOptions);
  const totalUnits = productList.reduce((acc, { quantity }) => acc + quantity, 0);

  const subtotal = useMemo<Money>(() => {
    const nanoSum = productList.reduce(
      (acc, { product: { priceUsd: { nanos = 0 } = {} }, quantity }) => acc + Number(nanos) * quantity,
      0
    );

    return {
      units:
        productList.reduce((acc, { product: { priceUsd: { units = 0 } = {} }, quantity }) => acc + Number(units) * quantity, 0) +
        Math.floor(nanoSum / 1000000000),
      currencyCode: selectedCurrency,
      nanos: nanoSum % 1000000000,
    };
  }, [productList, selectedCurrency]);

  const total = useMemo<Money>(() => {
    const nanoSum =
      productList.reduce((acc, { product: { priceUsd: { nanos = 0 } = {} }, quantity }) => acc + Number(nanos) * quantity, 0) +
        shippingConst?.nanos || 0;
    const nanoExceed = Math.floor(nanoSum / 1000000000);

    const unitSum =
      productList.reduce((acc, { product: { priceUsd: { units = 0 } = {} }, quantity }) => acc + Number(units) * quantity, 0) +
        (shippingConst?.units || 0) + nanoExceed;

    return {
      units: unitSum,
      currencyCode: selectedCurrency,
      nanos: nanoSum % 1000000000,
    };
  }, [shippingConst?.units, shippingConst?.nanos, productList, selectedCurrency]);

  return (
    <S.CartItems>
      <S.CardItemsHeader>
        <label>Product</label>
        <label>Quantity</label>
        <label>Price</label>
        <label>Total</label>
      </S.CardItemsHeader>
      {[...productList]
        .sort((a, b) => (a.product?.name ?? '').localeCompare(b.product?.name ?? ''))
        .map(({ productId, product, quantity }) => (
        <CartItem key={productId} product={product} quantity={quantity} onQuantityChange={updateItemQuantity} />
      ))}
      {shouldShowPrice && (
        <>
          <S.DataRow>
            <span>Subtotal</span>
            <ProductPrice price={subtotal} />
          </S.DataRow>
          <S.DataRow>
            <span>Shipping</span>
            {isLoading ? (
              <span>Calculating...</span>
            ) : isError && totalUnits > 50 ? (
              <span>Too many items to ship</span>
            ) : isSuccess && !Number(shippingConst.units) && !shippingConst.nanos ? (
              <span>Free</span>
            ) : (
              <ProductPrice price={shippingConst} />
            )}
          </S.DataRow>
          {shippingConst.boxes !== undefined && (
            <S.DataRow>
              <span>Boxes: {shippingConst.boxes}</span>
            </S.DataRow>
          )}
          {shippingConst.weightKg !== undefined && (
            <S.DataRow>
              <span>Weight: {shippingConst.weightKg} kg</span>
            </S.DataRow>
          )}
          {shippingConst.shipsFrom && (
            <S.DataRow>
              <span>Ships from {shippingConst.shipsFrom}</span>
            </S.DataRow>
          )}
          {shippingConst.signatureRequired && (
            <S.DataRow>
              <span>Signature required</span>
            </S.DataRow>
          )}
          {shippingConst.quoteExpiresAt && (
            <S.DataRow>
              <span>
                Quote valid until{' '}
                {new Date(shippingConst.quoteExpiresAt).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                  hourCycle: 'h23',
                })}
              </span>
            </S.DataRow>
          )}
          <S.DataRow>
            <span>Carrier</span>
            <span>{shippingConst.carrier}</span>
          </S.DataRow>
          <S.DataRow>
            <span>Zone</span>
            <span>{shippingConst.zone}</span>
          </S.DataRow>
          {shippingConst.estimatedDeliveryDays !== undefined && (
            <S.DataRow>
              <span>Delivery</span>
              <span>Arrives in {shippingConst.estimatedDeliveryDays} days</span>
            </S.DataRow>
          )}
          {shippingConst.packageSize && (
            <S.DataRow>
              <span>Package size</span>
              <span>{shippingConst.packageSize}</span>
            </S.DataRow>
          )}
          <S.DataRow>
            <S.TotalText>Total</S.TotalText>
            <S.TotalText>
              <ProductPrice price={total} />
            </S.TotalText>
          </S.DataRow>
        </>
      )}
    </S.CartItems>
  );
};

export default CartItems;
