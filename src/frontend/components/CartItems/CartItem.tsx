// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import Link from 'next/link';
import { Product } from '../../protos/demo';
import ProductPrice from '../ProductPrice';
import Select from '../Select';
import * as S from './CartItems.styled';

// The cart service keeps at most this many of one product in a line.
export const MAX_QUANTITY_PER_LINE = 10;

// 0 is the "Remove" choice; 1 to MAX_QUANTITY_PER_LINE set the quantity.
const quantityOptions = Array.from({ length: MAX_QUANTITY_PER_LINE + 1 }, (_, i) => i);

interface IProps {
  product: Product;
  quantity: number;
  onQuantityChange(productId: string, newQuantity: number): void;
  onRemove(productId: string): void;
}

const CartItem = ({
  product: { id, name, picture, priceUsd = { units: 0, nanos: 0, currencyCode: 'USD' } },
  quantity,
  onQuantityChange,
  onRemove,
}: IProps) => {
  const totalNanos = Number(priceUsd.nanos) * quantity;
  const linePrice = {
    units: Number(priceUsd.units) * quantity + Math.floor(totalNanos / 1_000_000_000),
    nanos: totalNanos % 1_000_000_000,
    currencyCode: priceUsd.currencyCode,
  };

  return (
    <S.CartItem>
      <Link href={`/product/${id}`}>
        <S.NameContainer>
          <S.CartItemImage alt={name} src={picture ? "/images/products/" + picture : undefined} />
          <p>{name}</p>
        </S.NameContainer>
      </Link>
      <S.CartItemDetails>
        <Select
          value={quantity}
          aria-label={`Quantity of ${name}`}
          onChange={e => {
            const newQuantity = +e.target.value;
            if (newQuantity === 0) onRemove(id);
            else onQuantityChange(id, newQuantity);
          }}
        >
          {quantityOptions.map(o => (
            <option key={o} value={o}>
              {o === 0 ? 'Remove' : o}
            </option>
          ))}
        </Select>
      </S.CartItemDetails>
      <S.CartItemDetails>
        <S.PriceContainer>
          <p>
            <ProductPrice price={priceUsd} />
          </p>
        </S.PriceContainer>
      </S.CartItemDetails>
      <S.CartItemDetails>
        <S.PriceContainer>
          <p>
            <ProductPrice price={linePrice} />
          </p>
        </S.PriceContainer>
      </S.CartItemDetails>
    </S.CartItem>
  );
};

export default CartItem;
