// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import CartItems from '../CartItems';
import CheckoutForm from '../CheckoutForm';
import { IFormData } from '../CheckoutForm/CheckoutForm';
import SessionGateway from '../../gateways/Session.gateway';
import { useCart } from '../../providers/Cart.provider';
import { useCurrency } from '../../providers/Currency.provider';
import * as S from '../../styles/Cart.styled';

const { userId } = SessionGateway.getSession();

// HH:MM in the browser's local time.
const formatTime = (millis: number) => {
  const date = new Date(millis);
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
};

const CartDetail = () => {
  const {
    cart: { items, updatedAt },
    emptyCart,
    placeOrder,
  } = useCart();
  const { selectedCurrency } = useCurrency();
  const { push } = useRouter();
  const [error, setError] = useState('');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const onPlaceOrder = useCallback(
    async ({
      email,
      state,
      streetAddress,
      country,
      city,
      zipCode,
      creditCardCvv,
      creditCardExpirationMonth,
      creditCardExpirationYear,
      creditCardNumber,
    }: IFormData) => {
      setError('');
      setIsPlacingOrder(true);
      let order;
      try {
        order = await placeOrder({
          userId,
          email,
          address: {
            streetAddress,
            state,
            country,
            city,
            zipCode,
          },
          userCurrency: selectedCurrency,
          creditCard: {
            creditCardCvv,
            creditCardExpirationMonth,
            creditCardExpirationYear,
            creditCardNumber,
          },
        });
      } catch (e) {
        setError((e as Error).message);
        setIsPlacingOrder(false);
        return;
      }

      push({
        pathname: `/cart/checkout/${order.orderId}`,
        query: { order: JSON.stringify(order), email },
      });
    },
    [placeOrder, push, selectedCurrency]
  );

  return (
    <S.Container>
      <div>
        <S.Header>
          <S.CarTitle>Shopping Cart ({items.reduce((acc, { quantity }) => acc + quantity, 0)} items)</S.CarTitle>
          <S.EmptyCartButton onClick={() => window.confirm('Empty your cart?') && emptyCart()} $type="link">
            Empty Cart
          </S.EmptyCartButton>
        </S.Header>
        {updatedAt > 0 && <S.LastUpdated>Last updated {formatTime(updatedAt)}</S.LastUpdated>}
        <CartItems productList={items} />
      </div>
      {error && <S.ErrorMessage role="alert">{error}</S.ErrorMessage>}
      <CheckoutForm onSubmit={onPlaceOrder} isPlacingOrder={isPlacingOrder} />
    </S.Container>
  );
};

export default CartDetail;
