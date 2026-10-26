// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { CypressFields } from '../../utils/enums/CypressFields';
import { Product } from '../../protos/demo';
import ProductPrice from '../ProductPrice';
import * as S from './ProductCard.styled';
import { useState, useEffect } from 'react';
import { useNumberFlagValue } from '@openfeature/react-sdk';
import { useCart } from '../../providers/Cart.provider';

interface IProps {
  product: Product;
  showAddToCart?: boolean;
}

async function getImageWithHeaders(requestInfo: Request) {
  const res = await fetch(requestInfo);
  return await res.blob();
}

const ProductCard = ({
  product: {
    id,
    picture,
    name,
    badge,
    shortDescription,
    categories = [],
    priceUsd = {
      currencyCode: 'USD',
      units: 0,
      nanos: 0,
    },
  },
  showAddToCart = false,
}: IProps) => {
  const { addItem } = useCart();
  const imageSlowLoad = useNumberFlagValue('imageSlowLoad', 0);
  const [imageSrc, setImageSrc] = useState<string>('');

  useEffect(() => {
    if (!picture) {
      setImageSrc('');
      return;
    }
    const controller = new AbortController();
    let objectUrl: string | null = null;
    let cancelled = false;
    const headers = new Headers();
    headers.append('x-envoy-fault-delay-request', imageSlowLoad.toString());
    headers.append('Cache-Control', 'no-cache');
    const requestInit = {
      method: 'GET',
      headers: headers,
      signal: controller.signal,
    };
    const imageUrl = '/images/products/' + picture;
    const requestInfo = new Request(imageUrl, requestInit);
    getImageWithHeaders(requestInfo)
      .then(blob => {
        if (cancelled) return;
        objectUrl = URL.createObjectURL(blob);
        setImageSrc(objectUrl);
      })
      .catch(err => {
        if (!cancelled && err.name !== 'AbortError') {
          setImageSrc('');
        }
      });
    return () => {
      cancelled = true;
      controller.abort();
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [imageSlowLoad, picture]);

  return (
    <S.Link href={`/product/${id}`}>
      <S.ProductCard data-cy={CypressFields.ProductCard}>
        <S.Image $src={imageSrc} />
        <div>
          {badge && <S.Badge>{badge}</S.Badge>}
          <S.ProductName>{name}</S.ProductName>
          {shortDescription && <p data-cy="product-short-description">{shortDescription}</p>}
          <S.ProductPrice>
            <ProductPrice price={priceUsd} />
          </S.ProductPrice>
          {categories[0] && <p data-cy="product-card-category">{categories[0]}</p>}
          {showAddToCart && (
            <button
              type="button"
              data-cy="product-card-add-to-cart"
              onClick={event => {
                event.preventDefault();
                event.stopPropagation();
                addItem({ productId: id, quantity: 1 });
              }}
            >
              Add to cart
            </button>
          )}
        </div>
      </S.ProductCard>
    </S.Link>
  );
};

export default ProductCard;
