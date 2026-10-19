# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Currency conversion through CurrencyService/Convert and the storefront's localized prices."""

import grpc
import pytest
import requests

from demo_grpc import RPC_TIMEOUT, as_decimal, money, pb
from storefront_api import FRONTEND_PROXY_URL, HTTP_TIMEOUT, money_value

# EUR rates from src/currency/src/server.cpp.
RATES = {"EUR": 1.0, "USD": 1.1305, "JPY": 126.40, "CAD": 1.5128}


def convert(currency, from_money, to_code):
    return currency.Convert(pb.CurrencyConversionRequest(**{"from": from_money}, to_code=to_code), timeout=RPC_TIMEOUT)


def via_euros(amount, from_code, to_code):
    return amount / RATES[from_code] * RATES[to_code]


@pytest.mark.parametrize(
    "from_money, to_code, expected",
    [(money("USD", 100), "CAD", 133.8169), (money("USD", 113, 50000000), "EUR", 100.40)],
)
def test_convert_through_euros(currency, from_money, to_code, expected):
    """R8a, currency-usd-to-cad-via-eur"""
    result = convert(currency, from_money, to_code)
    assert result.currency_code == to_code
    assert as_decimal(result) == pytest.approx(expected, abs=0.01)


def test_convert_eur_to_usd(currency):
    """R8a, currency-eur-to-usd"""
    assert as_decimal(convert(currency, money("EUR", 1), "USD")) == pytest.approx(1.1305, abs=0.01)


def test_convert_same_currency_unchanged(currency):
    """R8b, currency-same-code-exact"""
    result = convert(currency, money("USD", 12, 340000000), "USD")
    assert (result.currency_code, result.units, result.nanos) == ("USD", 12, 340000000)


def test_codes_matched_upper_case_without_spaces(currency):
    """R8c"""
    loose = convert(currency, money(" usd ", 100), "cad")
    strict = convert(currency, money("USD", 100), "CAD")
    assert loose.currency_code == "CAD"
    assert (loose.units, loose.nanos) == (strict.units, strict.nanos)


def test_same_currency_with_loose_codes_unchanged(currency):
    """R8c"""
    result = convert(currency, money("usd", 5), " USD")
    assert (result.currency_code, result.units, result.nanos) == ("USD", 5, 0)


@pytest.mark.parametrize(
    "from_money, to_code",
    [(money("XYZ", 100), "USD"), (money("USD", 100), "XYZ"), (money("USD", 100), "")],
)
def test_unknown_code_invalid_argument(currency, from_money, to_code):
    """R8d"""
    with pytest.raises(grpc.RpcError) as rejected:
        convert(currency, from_money, to_code)
    assert rejected.value.code() == grpc.StatusCode.INVALID_ARGUMENT


def test_repeat_conversions_identical(currency):
    """R8e"""
    results = {(r.currency_code, r.units, r.nanos) for r in (convert(currency, money("USD", 100), "CAD") for _ in range(3))}
    assert len(results) == 1


def test_unknown_code_does_not_poison_later_conversions(currency):
    """R8e"""
    with pytest.raises(grpc.RpcError):
        convert(currency, money("USD", 100), "XYZ")
    result = convert(currency, money("USD", 100), "JPY")
    assert as_decimal(result) == pytest.approx(via_euros(100, "USD", "JPY"), abs=0.01)


def test_storefront_price_in_cad():
    """R8f"""
    resp = requests.get(
        f"{FRONTEND_PROXY_URL}/api/products/66VCHSJNUP", params={"currencyCode": "CAD"}, timeout=HTTP_TIMEOUT
    )
    assert resp.status_code == 200
    price = resp.json()["priceUsd"]
    assert price["currencyCode"] == "CAD"
    assert money_value(price) == pytest.approx(via_euros(349.95, "USD", "CAD"), abs=0.01)
