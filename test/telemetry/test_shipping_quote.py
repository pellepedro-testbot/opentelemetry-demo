# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Shipping quote amounts, read from the shipping service's own REST API and
from the span attribute it records."""

import json
import os

import pytest
import requests

from conftest import FRONTEND_PROXY_URL, poll_until
from storefront import ADDRESS, jaeger_traces, span_tags

# Built from host + port: SHIPPING_ADDR in .env holds an unexpanded ${SHIPPING_PORT}.
SHIPPING_HOST = os.environ.get("SHIPPING_HOST", "shipping")
SHIPPING_PORT = os.environ.get("SHIPPING_PORT", "50050")
SHIPPING_URL = f"http://{SHIPPING_HOST}:{SHIPPING_PORT}"

SHIPPING_ADDRESS = {
    "street_address": ADDRESS["streetAddress"],
    "city": ADDRESS["city"],
    "state": ADDRESS["state"],
    "country": ADDRESS["country"],
    "zip_code": ADDRESS["zipCode"],
}


def _quote(quantity):
    resp = requests.post(
        f"{SHIPPING_URL}/get-quote",
        json={
            "items": [{"product_id": "0PUK6V6EV0", "quantity": quantity}],
            "address": SHIPPING_ADDRESS,
        },
        timeout=15,
    )
    assert resp.status_code == 200, resp.text
    return resp.json()["cost_usd"]


def test_quote_for_one_item_is_8_99():
    assert _quote(1) == {"currency_code": "USD", "units": 8, "nanos": 990000000}


@pytest.mark.parametrize(
    "quantity,units,nanos",
    [
        (3, 26, 970000000),
        (4, 35, 960000000),
        (7, 62, 930000000),
        (8, 71, 920000000),
        (10, 89, 900000000),
        (100, 899, 0),
    ],
)
def test_quote_keeps_every_cent(quantity, units, nanos):
    cost = _quote(quantity)
    assert (cost["units"], cost["nanos"]) == (units, nanos)


def test_quote_total_attribute_has_two_cent_digits(jaeger_url):
    item_list = json.dumps([{"productId": "0PUK6V6EV0", "quantity": 100}])
    resp = requests.get(
        f"{FRONTEND_PROXY_URL}/api/shipping",
        params={"currencyCode": "USD", "itemList": item_list, "address": json.dumps(ADDRESS)},
        timeout=15,
    )
    assert resp.status_code == 200, resp.text

    def totals():
        values = set()
        for trace in jaeger_traces("shipping", lookback="5m"):
            for span in trace["spans"]:
                value = span_tags(span).get("demo.shipping.cost.total")
                if value is not None:
                    values.add(str(value))
        return "899.00" in values and values

    poll_until(totals, "shipping span with demo.shipping.cost.total == '899.00'")
