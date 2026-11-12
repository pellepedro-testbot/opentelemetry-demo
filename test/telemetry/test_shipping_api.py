# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""GET /api/shipping returns the quote service's price rounded to cents, not truncated."""

import json
import os

import pytest
import requests

from conftest import FRONTEND_PROXY_URL
from demo_shop import ADDRESS, money_value

QUOTE_URL = f"http://{os.environ.get('QUOTE_HOST', 'quote')}:{os.environ.get('QUOTE_PORT', '8090')}"


def quote_price(count):
    resp = requests.post(f"{QUOTE_URL}/getquote", json={"numberOfItems": count}, timeout=10)
    resp.raise_for_status()
    return float(resp.text)


@pytest.mark.parametrize("count", [1, 2, 3, 4, 7, 8, 10])
def test_shipping_cost_equals_quote_rounded_to_cents(count):
    resp = requests.get(
        f"{FRONTEND_PROXY_URL}/api/shipping",
        params={
            "itemList": json.dumps([{"productId": "0PUK6V6EV0", "quantity": count}]),
            "currencyCode": "USD",
            "address": json.dumps(ADDRESS),
        },
        timeout=15,
    )
    assert resp.status_code == 200, resp.text
    cost = resp.json()
    assert cost["currencyCode"] == "USD"
    assert round(money_value(cost), 2) == round(quote_price(count), 2)
