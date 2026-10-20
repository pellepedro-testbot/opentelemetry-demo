# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Currency conversion through euros in the currency service."""

import re
from pathlib import Path

import pytest
import requests

from conftest import FRONTEND_PROXY_URL
from docker_stack import requires_docker
from grpc_client import CURRENCY_ADDR, grpc_call

CONVERT = "oteldemo.CurrencyService/Convert"
SERVER_SOURCE = Path(__file__).resolve().parents[2] / "src" / "currency" / "src" / "server.cpp"
# Matches one {"CODE", rate} entry of the rates table in server.cpp.
RATE_ENTRY = re.compile(r'\{"([A-Z]{3})",\s*([0-9.]+)\}')


def eur_rates():
    return {code: float(rate) for code, rate in RATE_ENTRY.findall(SERVER_SOURCE.read_text())}


def convert(from_code, units, to_code, nanos=0):
    money = {"currencyCode": from_code, "units": units}
    if nanos:
        money["nanos"] = nanos
    return grpc_call(CURRENCY_ADDR, CONVERT, {"from": money, "toCode": to_code})


def amount(result):
    return int(result.body.get("units", 0)) + int(result.body.get("nanos", 0)) / 1e9


@requires_docker
class TestConvert:
    def test_conversion_goes_through_euros(self):
        rates = eur_rates()
        result = convert("USD", 100, "JPY")
        assert result.ok, result.message
        assert result.body["currencyCode"] == "JPY"
        expected = 100 / rates["USD"] * rates["JPY"]
        assert amount(result) == pytest.approx(expected, rel=1e-6)

    @pytest.mark.parametrize("code", ["USD", "EUR"])
    def test_same_currency_returns_amount_unchanged(self, code):
        result = convert(code, 12, code, nanos=345678901)
        assert result.ok, result.message
        assert result.body == {"currencyCode": code, "units": "12", "nanos": 345678901}

    def test_codes_are_trimmed_and_upper_cased(self):
        reference = convert("USD", 100, "JPY")
        to_lower = convert("USD", 100, " jpy ")
        from_lower = convert("usd", 100, "JPY")
        assert to_lower.ok and from_lower.ok
        assert to_lower.body == reference.body
        assert from_lower.body == reference.body
        assert to_lower.body["currencyCode"] == "JPY"

    @pytest.mark.parametrize("from_code,to_code", [("USD", "XYZ"), ("XYZ", "USD")])
    def test_unknown_code_is_invalid_argument(self, from_code, to_code):
        assert convert(from_code, 1, to_code).code == "InvalidArgument"

    def test_cached_rates_give_the_same_result(self):
        results = [convert("USD", 100, "GBP") for _ in range(3)]
        assert all(r.ok for r in results)
        assert results[0].body == results[1].body == results[2].body
        assert convert("USD", 1, "XYZ").code == "InvalidArgument"
        after = convert("USD", 100, "GBP")
        assert after.body == results[0].body
        rates = eur_rates()
        assert amount(after) == pytest.approx(100 / rates["USD"] * rates["GBP"], rel=1e-6)

    @pytest.mark.parametrize("code", ["XYZ", ""])
    def test_unknown_code_to_itself_is_invalid_argument(self, code):
        assert convert(code, 5, code).code == "InvalidArgument"

    def test_unknown_code_to_itself_after_normalising_is_invalid_argument(self):
        assert convert(" xyz", 5, "XYZ ").code == "InvalidArgument"


def products_in(currency):
    resp = requests.get(f"{FRONTEND_PROXY_URL}/api/products", params={"currencyCode": currency}, timeout=10)
    return resp


def test_storefront_matches_lower_case_currency():
    lower = products_in("jpy")
    upper = products_in("JPY")
    assert lower.status_code == 200 and upper.status_code == 200
    assert [p["priceUsd"] for p in lower.json()] == [p["priceUsd"] for p in upper.json()]
    assert {p["priceUsd"]["currencyCode"] for p in lower.json()} == {"JPY"}


def test_storefront_rejects_unknown_currency():
    assert not 200 <= products_in("XYZ").status_code < 300


def test_supported_currencies_are_listed():
    resp = requests.get(f"{FRONTEND_PROXY_URL}/api/currency", timeout=10)
    assert resp.status_code == 200
    assert set(resp.json()) == set(eur_rates())
    assert {"USD", "EUR", "JPY", "GBP"} <= set(resp.json())
