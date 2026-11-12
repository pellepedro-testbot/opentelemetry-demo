# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Functional checks of the shipping service's /get-quote HTTP endpoint against
the quote service it prices with."""

import os

import pytest
import requests

SHIPPING_URL = os.environ.get(
    "SHIPPING_URL",
    f"http://{os.environ.get('SHIPPING_HOST', 'shipping')}:{os.environ.get('SHIPPING_PORT', '50050')}",
)
QUOTE_URL = os.environ.get(
    "QUOTE_URL",
    f"http://{os.environ.get('QUOTE_HOST', 'quote')}:{os.environ.get('QUOTE_PORT', '8090')}",
)


def _quote_service_cents(number_of_items):
    resp = requests.post(f"{QUOTE_URL}/getquote", json={"numberOfItems": number_of_items}, timeout=10)
    assert resp.status_code == 200, resp.text[:300]
    return round(float(resp.text) * 100)


def _shipping_quote_cents(items):
    resp = requests.post(f"{SHIPPING_URL}/get-quote", json={"items": items, "address": None}, timeout=10)
    assert resp.status_code == 200, resp.text[:300]
    cost = resp.json()["cost_usd"]
    assert cost["currency_code"] == "USD"
    assert cost.get("nanos", 0) % 10_000_000 == 0, f"nanos {cost.get('nanos')} is not a whole number of cents"
    return cost["units"] * 100 + cost.get("nanos", 0) // 10_000_000


@pytest.mark.parametrize("count", [1, 2, 7, 29, 35, 57])
def test_get_quote_keeps_every_cent_of_the_quote(count):
    items = [{"product_id": f"PRODUCT{i}", "quantity": 1} for i in range(count)]

    assert _shipping_quote_cents(items) == _quote_service_cents(count)


def test_get_quote_prices_distinct_items_regardless_of_quantity():
    one_item = _quote_service_cents(1)
    two_items = _quote_service_cents(2)

    assert _shipping_quote_cents([{"product_id": "0PUK6V6EV0", "quantity": 5}]) == one_item
    assert _shipping_quote_cents([{"product_id": "0PUK6V6EV0", "quantity": 1}]) == one_item
    assert (
        _shipping_quote_cents(
            [
                {"product_id": "0PUK6V6EV0", "quantity": 1},
                {"product_id": "66VCHSJNUP", "quantity": 1},
            ]
        )
        == two_items
    )
