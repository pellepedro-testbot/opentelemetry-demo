// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import Ad from '../../../../components/Ad';
import Button from '../../../../components/Button';
import Layout from '../../../../components/Layout';
import ProductPrice from '../../../../components/ProductPrice';
import Recommendations from '../../../../components/Recommendations';
import AdProvider from '../../../../providers/Ad.provider';
import { Address, Money } from '../../../../protos/demo';
import * as S from '../../../../styles/Checkout.styled';
import { IProductCheckout, IProductCheckoutItem } from '../../../../types/Cart';

const isAbsentOrObject = (value: unknown) => value === undefined || (typeof value === 'object' && value !== null);

const parseOrder = (raw: unknown): IProductCheckout | undefined => {
  if (typeof raw !== 'string') return undefined;
  try {
    const order = JSON.parse(raw);
    const isValid =
      typeof order === 'object' &&
      order !== null &&
      typeof order.orderId === 'string' &&
      order.orderId !== '' &&
      isAbsentOrObject(order.shippingAddress) &&
      isAbsentOrObject(order.shippingCost) &&
      (order.items === undefined ||
        (Array.isArray(order.items) && order.items.every((entry: IProductCheckoutItem) => entry?.item?.product && isAbsentOrObject(entry.cost))));
    return isValid ? order : undefined;
  } catch {
    return undefined;
  }
};

const Checkout: NextPage = () => {
  const { query } = useRouter();
  const email = query.email as string | undefined;
  const order = parseOrder(query.order);
  const { orderId, items = [], shippingAddress = {} as Address, shippingCost = { units: 0, currencyCode: 'USD', nanos: 0 } } = order || ({} as IProductCheckout);

  const orderTotal = useMemo<Money>(() => {
    const itemsTotal = items.reduce((acc, { cost = { units: 0, nanos: 0, currencyCode: 'USD' } }) => {
      return {
        units: acc.units + (cost.units || 0),
        nanos: acc.nanos + (cost.nanos || 0),
        currencyCode: cost.currencyCode || 'USD',
      };
    }, { units: 0, nanos: 0, currencyCode: 'USD' });

    const totalNanos = itemsTotal.nanos + (shippingCost.nanos || 0);
    const nanoExceed = Math.floor(totalNanos / 1000000000);

    return {
      units: itemsTotal.units + (shippingCost.units || 0) + nanoExceed,
      nanos: totalNanos % 1000000000,
      currencyCode: shippingCost.currencyCode || 'USD',
    };
  }, [items, shippingCost]);

  if (!order) {
    return (
      <Layout>
        <Head>
          <title>Otel Demo - Checkout</title>
        </Head>
        <S.Checkout>
          <S.Container>
            <S.LeftColumn>
              <S.Title>Order not found</S.Title>
            </S.LeftColumn>
            <S.ButtonContainer>
              <Link href="/">
                <Button type="submit">Continue Shopping</Button>
              </Link>
            </S.ButtonContainer>
          </S.Container>
        </S.Checkout>
      </Layout>
    );
  }

  return (
    <AdProvider
      productIds={items.map(({ item }) => item?.productId || '')}
      contextKeys={['checkout']}
    >
      <Head>
        <title>Otel Demo - Checkout</title>
      </Head>
      <Layout>
        <S.Checkout>
          <S.Container>
            <S.LeftColumn>
              <S.Title>Your order is complete!</S.Title>
              <S.Subtitle>
                {email ? `Confirmation sent to ${email}` : <>We&apos;ve sent you a confirmation email.</>}
              </S.Subtitle>
              <S.OrderInfo>
                <S.InfoLabel>Order ID:</S.InfoLabel>
                <S.InfoValue>{orderId}</S.InfoValue>
              </S.OrderInfo>
            </S.LeftColumn>

            <S.RightColumn>
              <S.SectionTitle>Shipping Address</S.SectionTitle>
              <S.AddressText>{shippingAddress.streetAddress}</S.AddressText>
              <S.AddressText>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}</S.AddressText>
              <S.AddressText>{shippingAddress.country}</S.AddressText>
            </S.RightColumn>

            <S.ItemsSection>
              <S.SectionTitle>Order Items</S.SectionTitle>
              <S.ItemList>
                {items.map(({ item, cost = { units: 0, currencyCode: 'USD', nanos: 0 } }) => {
                  const itemTotal: Money = {
                    units: cost.units || 0,
                    nanos: cost.nanos || 0,
                    currencyCode: cost.currencyCode || 'USD',
                  };

                  return (
                    <S.OrderItem key={item.productId}>
                      <S.ItemImage src={"/images/products/" + item.product.picture} alt={item.product.name}/>
                      <S.ItemDetails>
                        <S.ItemName>{item.product.name}</S.ItemName>
                        <S.ItemQuantity>Quantity: {item.quantity}</S.ItemQuantity>
                      </S.ItemDetails>
                      <S.ItemPrice>
                        <ProductPrice price={itemTotal} />
                      </S.ItemPrice>
                    </S.OrderItem>
                  );
                })}
              </S.ItemList>

              <S.OrderSummary>
                <S.SummaryRow>
                  <span>Total items:</span>
                  <span>{items.reduce((acc, { item }) => acc + (item?.quantity || 0), 0)}</span>
                </S.SummaryRow>
                <S.SummaryRow>
                  <span>Shipping:</span>
                  <ProductPrice price={shippingCost} />
                </S.SummaryRow>
                <S.TotalRow>
                  <S.TotalLabel>Total:</S.TotalLabel>
                  <S.TotalAmount>
                    <ProductPrice price={orderTotal} />
                  </S.TotalAmount>
                </S.TotalRow>
              </S.OrderSummary>
            </S.ItemsSection>

            <S.ButtonContainer>
              <Link href="/">
                <Button type="submit">Continue Shopping</Button>
              </Link>
            </S.ButtonContainer>
          </S.Container>
          <Recommendations />
        </S.Checkout>
        <Ad />
      </Layout>
    </AdProvider>
  );
};

export default Checkout;
