// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { CypressFields } from '../../utils/enums/CypressFields';
import { IProductCartItem } from '../../types/Cart';
import { useCurrency } from '../../providers/Currency.provider';
import ProductPrice from '../ProductPrice';
import * as S from './CartDropdown.styled';

interface IProps {
  isOpen: boolean;
  onClose(): void;
  productList: IProductCartItem[];
}

const CartDropdown = ({ productList, isOpen, onClose }: IProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { selectedCurrency } = useCurrency();
  const subtotalNanos = productList.reduce(
    (acc, { product: { priceUsd: { nanos = 0 } = {} }, quantity }) => acc + Number(nanos) * quantity,
    0
  );
  const subtotal = {
    units:
      productList.reduce(
        (acc, { product: { priceUsd: { units = 0 } = {} }, quantity }) => acc + Number(units) * quantity,
        0
      ) + Math.floor(subtotalNanos / 1_000_000_000),
    nanos: subtotalNanos % 1_000_000_000,
    currencyCode: selectedCurrency,
  };

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, onClose]);

  return isOpen ? (
    <S.CartDropdown ref={ref} data-cy={CypressFields.CartDropdown}>
      <S.ContentWrapper>
        <S.Header>
          <S.Title>Shopping Cart ({productList.reduce((acc, { quantity }) => acc + quantity, 0)})</S.Title>
          <span onClick={onClose}>Close</span>
        </S.Header>
        <S.ItemList>
          {!productList.length && <S.EmptyCart>Your shopping cart is empty</S.EmptyCart>}
          {productList.map(
            ({ quantity, product: { name, picture, id, priceUsd = { nanos: 0, currencyCode: 'USD', units: 0 } } }) => (
              <S.Item key={id} data-cy={CypressFields.CartDropdownItem}>
                {picture && <S.ItemImage src={'/images/products/' + picture} alt={name} />}
                <S.ItemDetails $fullWidth={!picture}>
                  <S.ItemName>
                    <Link href={`/product/${id}`} onClick={onClose}>
                      {name}
                    </Link>
                  </S.ItemName>
                  <ProductPrice price={priceUsd} />
                  <S.ItemQuantity>Quantity: {quantity}</S.ItemQuantity>
                </S.ItemDetails>
              </S.Item>
            )
          )}
        </S.ItemList>
        {!!productList.length && (
          <S.Subtotal>
            <span>Subtotal</span>
            <ProductPrice price={subtotal} />
          </S.Subtotal>
        )}
      </S.ContentWrapper>
      <Link href="/cart">
        <S.CartButton data-cy={CypressFields.CartGoToShopping}>Go to Shopping Cart</S.CartButton>
      </Link>
    </S.CartDropdown>
  ) : null;
};

export default CartDropdown;
