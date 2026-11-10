// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Ad from '../../../components/Ad';
import Layout from '../../../components/Layout';
import ProductPrice from '../../../components/ProductPrice';
import Recommendations from '../../../components/Recommendations';
import Select from '../../../components/Select';
import { CypressFields } from '../../../utils/enums/CypressFields';
import ApiGateway from '../../../gateways/Api.gateway';
import { Product } from '../../../protos/demo';
import AdProvider from '../../../providers/Ad.provider';
import { useCart } from '../../../providers/Cart.provider';
import * as S from '../../../styles/ProductDetail.styled';
import { useCurrency } from '../../../providers/Currency.provider';

const MAX_QUANTITY = 10;

const ProductDetail: NextPage = () => {
  const { push, query } = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');
  const {
    addItem,
    cart: { items },
  } = useCart();
  const { selectedCurrency } = useCurrency();
  const productId = query.productId as string;
  const fromAd = ([] as string[]).concat(query.utm_source ?? []).includes('ad');

  useEffect(() => {
    setQuantity(1);
    setError('');
  }, [productId]);

  const {
    data: {
      name,
      picture,
      description,
      priceUsd = { units: 0, currencyCode: 'USD', nanos: 0 },
      categories,
      maxQuantity,
    } = {} as Product,
  } = useQuery({
      queryKey: ['product', productId, 'selectedCurrency', selectedCurrency],
      queryFn: () => ApiGateway.getProduct(productId, selectedCurrency),
      enabled: !!productId,
    }
  ) as { data: Product };

  const selectableMax =
    Number.isInteger(maxQuantity) && maxQuantity > 0 ? Math.min(maxQuantity, MAX_QUANTITY) : MAX_QUANTITY;
  const quantityOptions = Array.from({ length: selectableMax }, (_, i) => i + 1);

  useEffect(() => {
    setQuantity(q => Math.min(q, selectableMax));
  }, [selectableMax]);

  // Units of this product already in the cart, from the cart the provider already loads
  const inCartQuantity = items
    .filter(item => item.productId === productId)
    .reduce((acc, item) => acc + (item.quantity || 0), 0);

  const lineTotalNanos = Number(priceUsd.nanos) * quantity;
  const lineTotal = {
    units: Number(priceUsd.units) * quantity + Math.floor(lineTotalNanos / 1_000_000_000),
    nanos: lineTotalNanos % 1_000_000_000,
    currencyCode: priceUsd.currencyCode,
  };

  const onAddItem = useCallback(async () => {
    setError('');
    try {
      await addItem({
        productId,
        quantity,
      });
    } catch (e) {
      setError((e as Error).message);
      return;
    }
    push('/cart');
  }, [addItem, productId, quantity, push]);

  return (
    <AdProvider
      productIds={[productId, ...items.map(({ productId }) => productId)]}
      contextKeys={[...new Set(categories)]}
    >
      <Head>
        <title>{name ? `${name} - Otel Demo` : 'Otel Demo - Product'}</title>
      </Head>
      <Layout>
        <S.ProductDetail data-cy={CypressFields.ProductDetail}>
          <S.Container>
            {picture ? (
              <S.Image
                $src={`/images/products/${picture}`}
                data-cy={CypressFields.ProductPicture}
              />
            ) : null}
            <S.Details $fullWidth={!picture}>
              <Link href="/">Back to products</Link>
              <S.Name data-cy={CypressFields.ProductName}>{name}</S.Name>
              {fromAd && <S.Text>You came from an ad</S.Text>}
              <S.Description data-cy={CypressFields.ProductDescription}>{description}</S.Description>
              <S.Categories>
                {categories?.map(category => (
                  <S.Category key={category}>{category}</S.Category>
                ))}
              </S.Categories>
              <S.ProductPrice>
                <ProductPrice price={priceUsd} />
              </S.ProductPrice>
              {inCartQuantity > 0 && <S.Text>In your cart: {inCartQuantity}</S.Text>}
              <S.Text>Quantity</S.Text>
              <S.QuantityRow>
                <Select
                  data-cy={CypressFields.ProductQuantity}
                  onChange={event => setQuantity(+event.target.value)}
                  value={quantity}
                >
                  {quantityOptions.map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
                <S.Text>
                  Line total: <ProductPrice price={lineTotal} />
                </S.Text>
              </S.QuantityRow>
              <S.AddToCart data-cy={CypressFields.ProductAddToCart} onClick={onAddItem}>
                <Image src="/icons/Cart.svg" height="15" width="15" alt="cart" /> Add To Cart
              </S.AddToCart>
              {error && <S.ErrorMessage role="alert">{error}</S.ErrorMessage>}
            </S.Details>
          </S.Container>
          <Recommendations title="Cheaper alternatives" />
        </S.ProductDetail>
        <Ad />
      </Layout>
    </AdProvider>
  );
};

export default ProductDetail;
