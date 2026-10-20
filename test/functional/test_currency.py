# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Currency conversion through euros, by the storefront API and CurrencyService/Convert."""

from decimal import Decimal

import grpc
import pytest
import requests

from demo_grpc import money, pb, stub
from storefront import EXPLORASCOPE, FRONTEND_PROXY_URL, HTTP_TIMEOUT, as_decimal

# EUR rates from src/currency/src/server.cpp.
EUR_RATES = {"EUR": Decimal("1.0"), "USD": Decimal("1.1305"), "JPY": Decimal("126.40"), "GBP": Decimal("0.85970")}
TOLERANCE = Decimal("0.01")


def products(currency):
    """{id: price} of every product, in the currency."""
    resp = requests.get(f"{FRONTEND_PROXY_URL}/api/products", params={"currencyCode": currency}, timeout=HTTP_TIMEOUT)
    assert resp.status_code == 200, resp.text[:300]
    return {p["id"]: p["priceUsd"] for p in resp.json()}


def plain_nanos(price):
    """True unless the nanos have leading zeros (e.g. 0.08), which currency's getDouble misreads."""
    nanos = price.get("nanos", 0)
    return nanos == 0 or nanos >= 100_000_000


def through_euros(usd, to_code):
    return usd / EUR_RATES["USD"] * EUR_RATES[to_code]


def convert(from_money, to_code):
    return stub("currency").Convert(pb.CurrencyConversionRequest(**{"from": from_money, "to_code": to_code}), timeout=10)


def test_r11a_usd_to_jpy_goes_through_euros():
    usd, jpy = products("USD"), products("JPY")
    for product_id, price in filter(lambda p: plain_nanos(p[1]), usd.items()):
        assert jpy[product_id]["currencyCode"] == "JPY"
        expected = through_euros(as_decimal(price), "JPY")
        assert abs(as_decimal(jpy[product_id]) - expected) <= TOLERANCE, (product_id, jpy[product_id], expected)


@pytest.mark.parametrize("to_code", ["EUR", "GBP"])
def test_r11b_usd_to_eur_based_currencies(to_code):
    usd, converted = products("USD"), products(to_code)
    for product_id, price in filter(lambda p: plain_nanos(p[1]), usd.items()):
        expected = through_euros(as_decimal(price), to_code)
        assert abs(as_decimal(converted[product_id]) - expected) <= TOLERANCE, (product_id, converted[product_id], expected)


def test_currency_usd_to_jpy():
    def product(currency):
        resp = requests.get(
            f"{FRONTEND_PROXY_URL}/api/products/{EXPLORASCOPE}", params={"currencyCode": currency}, timeout=HTTP_TIMEOUT,
        )
        assert resp.status_code == 200
        return as_decimal(resp.json()["priceUsd"])

    assert abs(product("JPY") - through_euros(product("USD"), "JPY")) <= TOLERANCE


def test_r11c_same_currency_is_unchanged():
    catalog = {p.id: p.price_usd for p in stub("product-catalog").ListProducts(pb.Empty(), timeout=10).products}
    for product_id, price in products("USD").items():
        assert (int(price["units"]), price.get("nanos", 0)) == (catalog[product_id].units, catalog[product_id].nanos)


@pytest.mark.parametrize("units,nanos", [(101, 960000000), (8, 990000000)])
def test_r11c_convert_to_the_same_currency_returns_the_amount(units, nanos):
    result = convert(money("USD", units, nanos), "USD")
    assert (result.currency_code, result.units, result.nanos) == ("USD", units, nanos)


def test_r11d_codes_match_upper_case_without_spaces():
    reference = convert(money("USD", 100), "JPY")
    lowered = convert(money("USD", 100), " jpy ")
    assert lowered.currency_code == "JPY"
    assert (lowered.units, lowered.nanos) == (reference.units, reference.nanos)
    spaced_from = convert(money(" usd", 100), "JPY")
    assert (spaced_from.units, spaced_from.nanos) == (reference.units, reference.nanos)


@pytest.mark.parametrize("from_code,to_code", [("USD", "XYZ"), ("XYZ", "USD")])
def test_r11e_unknown_code_is_invalid_argument(from_code, to_code):
    with pytest.raises(grpc.RpcError) as rejected:
        convert(money(from_code, 100), to_code)
    assert rejected.value.code() == grpc.StatusCode.INVALID_ARGUMENT


def test_currency_unknown_code_api():
    resp = requests.get(f"{FRONTEND_PROXY_URL}/api/products", params={"currencyCode": "XYZ"}, timeout=HTTP_TIMEOUT)
    assert resp.status_code >= 400


def test_r11f_repeated_conversions_agree_and_currencies_are_unchanged():
    results = {(r.currency_code, r.units, r.nanos) for r in (convert(money("USD", 100), "JPY") for _ in range(5))}
    assert len(results) == 1
    resp = requests.get(f"{FRONTEND_PROXY_URL}/api/currency", timeout=HTTP_TIMEOUT)
    assert resp.status_code == 200
    assert {"EUR", "USD", "JPY", "GBP", "CAD"} <= set(resp.json())
    assert len(resp.json()) == 33
