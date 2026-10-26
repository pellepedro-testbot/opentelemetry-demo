// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { CypressFields } from '../../utils/enums/CypressFields';
import Input from '../Input';
import * as S from './CheckoutForm.styled';

const currentYear = new Date().getFullYear();
const yearList = Array.from(new Array(20), (v, i) => i + currentYear);

export const LAST_ORDER_EMAIL_KEY = 'lastOrderEmail';

export interface IFormData {
  email: string;
  streetAddress: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  creditCardNumber: string;
  promoCode: string;
  creditCardCvv: number;
  creditCardExpirationYear: number;
  creditCardExpirationMonth: number;
}

interface IProps {
  onSubmit(formData: IFormData): void;
  isPlacingOrder?: boolean;
  onCountryChange?(country: string): void;
}

const CheckoutForm = ({ onSubmit, isPlacingOrder = false, onCountryChange }: IProps) => {
  const [
    {
      email,
      streetAddress,
      city,
      state,
      country,
      zipCode,
      creditCardCvv,
      creditCardExpirationMonth,
      creditCardExpirationYear,
      creditCardNumber,
      promoCode,
    },
    setFormData,
  ] = useState<IFormData>({
    email: 'someone@example.com',
    streetAddress: '1600 Amphitheatre Parkway',
    city: 'Mountain View',
    state: 'CA',
    country: 'United States',
    zipCode: "94043",
    creditCardNumber: '4432-8015-6152-0454',
    promoCode: '',
    creditCardCvv: 672,
    creditCardExpirationYear: 2030,
    creditCardExpirationMonth: 1,
  });

  useEffect(() => {
    try {
      const lastEmail = localStorage.getItem(LAST_ORDER_EMAIL_KEY);
      if (lastEmail) setFormData(formData => ({ ...formData, email: lastEmail }));
    } catch {
      // storage unavailable; keep the default email
    }
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(formData => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
    if (e.target.name === 'country') onCountryChange?.(e.target.value);
  }, [onCountryChange]);

  const cardBrand = ({ '4': 'Visa', '5': 'Mastercard' } as Record<string, string>)[creditCardNumber.charAt(0)];

  const handleCardNumberChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    // Keep at most 16 digits and join them in groups of four with dashes.
    const digits = e.target.value.replace(/\D/g, '').slice(0, 16);
    const creditCardNumber = digits.match(/.{1,4}/g)?.join('-') ?? '';
    setFormData(formData => ({ ...formData, creditCardNumber }));
  }, []);

  return (
    <S.CheckoutForm
      onSubmit={(event: { preventDefault: () => void; }) => {
        event.preventDefault();
        onSubmit({
          email,
          streetAddress,
          city,
          state,
          country,
          zipCode,
          creditCardCvv,
          creditCardExpirationMonth,
          creditCardExpirationYear,
          creditCardNumber,
          promoCode,
        });
      }}
    >
      <S.Title>Shipping Address</S.Title>

      <Input
        label="E-mail Address"
        type="email"
        id="email"
        name="email"
        value={email}
        required
        onChange={handleChange}
      />
      <Input
        label="Street Address"
        type="text"
        name="streetAddress"
        id="street_address"
        value={streetAddress}
        onChange={handleChange}
        required
      />
      <Input
        label="Zip Code"
        type="text"
        name="zipCode"
        id="zip_code"
        value={zipCode}
        onChange={handleChange}
        required
      />
      <Input label="City" type="text" name="city" id="city" value={city} required onChange={handleChange} />

      <S.StateRow>
        <Input label="State" type="text" name="state" id="state" value={state} required onChange={handleChange} />
        <Input
          label="Country"
          type="text"
          id="country"
          placeholder="Country Name"
          name="country"
          value={country}
          onChange={handleChange}
          required
        />
      </S.StateRow>

      <div>
        <S.Title>Payment Method</S.Title>
      </div>

      <Input
        type="text"
        label="Credit Card Number"
        id="credit_card_number"
        name="creditCardNumber"
        placeholder="0000-0000-0000-0000"
        value={creditCardNumber}
        onChange={handleCardNumberChange}
        required
        pattern="\d{4}-\d{4}-\d{4}-\d{4}"
      />
      {cardBrand && <span data-cy="card-brand">{cardBrand}</span>}

      <S.CardRow>
        <Input
          label="Month"
          name="creditCardExpirationMonth"
          id="credit_card_expiration_month"
          value={creditCardExpirationMonth}
          onChange={handleChange}
          type="select"
        >
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </Input>
        <Input
          label="Year"
          name="creditCardExpirationYear"
          id="credit_card_expiration_year"
          value={creditCardExpirationYear}
          onChange={handleChange}
          type="select"
        >
          {yearList.map(year => (
            <option value={year} key={year}>
              {year}
            </option>
          ))}
        </Input>
        <Input
          label="CVV"
          type="password"
          id="credit_card_cvv"
          name="creditCardCvv"
          placeholder="123"
          value={creditCardCvv}
          required
          pattern="\d{3}"
          onChange={handleChange}
        />
      </S.CardRow>

      <Input
        type="text"
        label="Promo Code"
        id="promo_code"
        name="promoCode"
        value={promoCode}
        onChange={handleChange}
      />

      <S.SubmitContainer>
        <Link href="/">
          <S.CartButton $type="secondary">Continue Shopping</S.CartButton>
        </Link>
        <S.CartButton data-cy={CypressFields.CheckoutPlaceOrder} type="submit" disabled={isPlacingOrder}>
          {isPlacingOrder ? 'Placing order...' : 'Place Order'}
        </S.CartButton>
      </S.SubmitContainer>
    </S.CheckoutForm>
  );
};

export default CheckoutForm;
