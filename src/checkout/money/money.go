// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0
package money

import (
	"errors"

	pb "github.com/open-telemetry/opentelemetry-demo/src/checkout/genproto/oteldemo"
)

const (
	nanosMin = -999999999
	nanosMax = +999999999
	nanosMod = 1000000000
)

var (
	ErrInvalidValue        = errors.New("one of the specified money values is invalid")
	ErrMismatchingCurrency = errors.New("mismatching currency codes")
)

// IsValid checks if specified value has a valid units/nanos signs and ranges.
func IsValid(m *pb.Money) bool {
	return signMatches(m) && validNanos(m.GetNanos())
}

func signMatches(m *pb.Money) bool {
	return m.GetNanos() == 0 || m.GetUnits() == 0 || (m.GetNanos() < 0) == (m.GetUnits() < 0)
}

func validNanos(nanos int32) bool { return nanosMin <= nanos && nanos <= nanosMax }

// IsZero returns true if the specified money value is equal to zero.
func IsZero(m *pb.Money) bool { return m.GetUnits() == 0 && m.GetNanos() == 0 }

// IsPositive returns true if the specified money value is valid and is
// positive.
func IsPositive(m *pb.Money) bool {
	return IsValid(m) && m.GetUnits() > 0 || (m.GetUnits() == 0 && m.GetNanos() > 0)
}

// IsNegative returns true if the specified money value is valid and is
// negative.
func IsNegative(m *pb.Money) bool {
	return IsValid(m) && m.GetUnits() < 0 || (m.GetUnits() == 0 && m.GetNanos() < 0)
}

// AreSameCurrency returns true if values l and r have a currency code and
// they are the same values.
func AreSameCurrency(l, r *pb.Money) bool {
	return l.GetCurrencyCode() == r.GetCurrencyCode() && l.GetCurrencyCode() != ""
}

// AreEquals returns true if values l and r are the equal, including the
// currency. This does not check validity of the provided values.
func AreEquals(l, r *pb.Money) bool {
	return l.GetCurrencyCode() == r.GetCurrencyCode() &&
		l.GetUnits() == r.GetUnits() && l.GetNanos() == r.GetNanos()
}

// Negate returns the same amount with the sign negated.
func Negate(m *pb.Money) *pb.Money {
	return &pb.Money{
		Units:        -m.GetUnits(),
		Nanos:        -m.GetNanos(),
		CurrencyCode: m.GetCurrencyCode()}
}

// Must panics if the given error is not nil. This can be used with other
// functions like: "m := Must(Sum(a,b))".
func Must(v *pb.Money, err error) *pb.Money {
	if err != nil {
		panic(err)
	}
	return v
}

// Sum adds two values. Returns an error if one of the values is invalid or
// both values carry different currency codes. A value with no currency code
// takes the other value's code.
func Sum(l, r *pb.Money) (*pb.Money, error) {
	code := l.GetCurrencyCode()
	if code == "" {
		code = r.GetCurrencyCode()
	}
	if !IsValid(l) || !IsValid(r) {
		return &pb.Money{}, ErrInvalidValue
	} else if l.GetCurrencyCode() != "" && r.GetCurrencyCode() != "" && l.GetCurrencyCode() != r.GetCurrencyCode() {
		return &pb.Money{}, ErrMismatchingCurrency
	}
	units := l.GetUnits() + r.GetUnits()
	nanos := l.GetNanos() + r.GetNanos()

	if (units == 0 && nanos == 0) || (units > 0 && nanos >= 0) || (units < 0 && nanos <= 0) {
		// same sign <units, nanos>
		units += int64(nanos / nanosMod)
		nanos = nanos % nanosMod
	} else {
		// different sign. nanos guaranteed to not to go over the limit
		if units > 0 {
			units--
			nanos += nanosMod
		} else {
			units++
			nanos -= nanosMod
		}
	}

	return &pb.Money{
		Units:        units,
		Nanos:        nanos,
		CurrencyCode: code}, nil
}

// SumAll adds any number of values, starting from zero. The result takes the
// currency of the values that carry one; it fails like Sum if a value is
// invalid or two values carry different currencies.
func SumAll(values ...*pb.Money) (*pb.Money, error) {
	total := &pb.Money{}
	for _, v := range values {
		var err error
		if total, err = Sum(total, v); err != nil {
			return &pb.Money{}, err
		}
	}
	return total, nil
}

// Multiply returns the value times n, computed in one step instead of by
// repeated addition. Nanos that overflow into whole units are carried.
func Multiply(m *pb.Money, n uint32) *pb.Money {
	totalNanos := int64(m.GetNanos()) * int64(n)
	return &pb.Money{
		Units:        m.GetUnits()*int64(n) + totalNanos/nanosMod,
		Nanos:        int32(totalNanos % nanosMod),
		CurrencyCode: m.GetCurrencyCode()}
}

// MultiplySlow is a slow multiplication operation done through adding the value
// to itself n-1 times.
func MultiplySlow(m *pb.Money, n uint32) *pb.Money {
	out := m
	for n > 1 {
		out = Must(Sum(out, m))
		n--
	}
	return out
}
