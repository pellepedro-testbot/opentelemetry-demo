# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

import json

import pytest
import requests

from conftest import FRONTEND_PROXY_URL, PROBE_PERSON

USER_ID = "frontend-api-checkout-test"
DEFAULT_ADDRESS = {
    "streetAddress": "1600 Amphitheatre Parkway",
    "city": "Mountain View",
    "state": "CA",
    "country": "United States",
    "zipCode": "94043",
}


def _empty_cart(user_id):
    requests.delete(f"{FRONTEND_PROXY_URL}/api/cart", json={"userId": user_id}, timeout=10)


@pytest.fixture
def checkout_user():
    _empty_cart(USER_ID)
    yield USER_ID
    _empty_cart(USER_ID)


def _get_shipping(item_list, currency_code):
    return requests.get(
        f"{FRONTEND_PROXY_URL}/api/shipping",
        params={
            "itemList": json.dumps(item_list),
            "currencyCode": currency_code,
            "address": json.dumps(DEFAULT_ADDRESS),
        },
        timeout=15,
    )


def test_checkout_answers_order_and_empties_cart(checkout_user):
    for product_id in ("OLJCESPC7Z", "66VCHSJNUP"):
        resp = requests.post(
            f"{FRONTEND_PROXY_URL}/api/cart",
            json={"userId": checkout_user, "item": {"productId": product_id, "quantity": 1}},
            timeout=10,
        )
        assert resp.status_code == 200, resp.text

    resp = requests.post(
        f"{FRONTEND_PROXY_URL}/api/checkout",
        params={"currencyCode": "USD"},
        json=dict(PROBE_PERSON, userId=checkout_user),
        timeout=30,
    )

    assert resp.status_code == 200, resp.text
    order = resp.json()
    assert order["orderId"]
    assert order["shippingTrackingId"]
    assert order["shippingCost"]["currencyCode"] == "USD"
    assert order["shippingAddress"]["streetAddress"] == DEFAULT_ADDRESS["streetAddress"]
    assert sorted(item["item"]["productId"] for item in order["items"]) == ["66VCHSJNUP", "OLJCESPC7Z"]
    for item in order["items"]:
        assert item["item"]["product"]["name"]
        assert item["item"]["product"]["picture"]
        assert item["cost"]["currencyCode"] == "USD"

    cart = requests.get(
        f"{FRONTEND_PROXY_URL}/api/cart",
        params={"sessionId": checkout_user, "currencyCode": "USD"},
        timeout=10,
    )
    assert cart.status_code == 200, cart.text
    assert cart.json()["items"] == []


@pytest.mark.parametrize("currency_code", ["USD", "EUR"])
def test_shipping_quote_in_requested_currency(currency_code):
    resp = _get_shipping([{"productId": "OLJCESPC7Z", "quantity": 2}], currency_code)

    assert resp.status_code == 200, resp.text
    quote = resp.json()
    assert quote["currencyCode"] == currency_code
    assert quote.get("units", 0) > 0 or quote.get("nanos", 0) > 0
