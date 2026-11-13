# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

from datetime import date

import pytest
import requests

from conftest import FRONTEND_PROXY_URL
from storefront_api import (
    OTHER_PRODUCT_ID,
    PRODUCT_ID,
    QUOTE_URL,
    add_to_cart,
    empty_cart,
    get_cart,
    money_amount,
    new_user_id,
    place_order,
    shipping_quote,
)

# Every code with a rate in currency_conversion (src/currency/src/server.cpp).
RATED_CURRENCIES = {
    "EUR", "USD", "JPY", "BGN", "CZK", "DKK", "GBP", "HUF", "PLN", "RON", "SEK",
    "CHF", "ISK", "NOK", "HRK", "RUB", "TRY", "AUD", "BRL", "CAD", "CNY", "HKD",
    "IDR", "ILS", "INR", "KRW", "MXN", "MYR", "NZD", "PHP", "SGD", "THB", "ZAR",
}


@pytest.fixture
def user_id():
    uid = new_user_id()
    yield uid
    empty_cart(uid)


def quote_service(number_of_items):
    resp = requests.post(f"{QUOTE_URL}/getquote", json={"numberOfItems": number_of_items}, timeout=10)
    resp.raise_for_status()
    return float(resp.text)


def test_successful_checkout_answers_the_order(user_id):
    add_to_cart(user_id)

    resp = place_order(user_id)

    assert resp.status_code == 200, resp.text
    order = resp.json()
    for field in ("orderId", "shippingTrackingId", "items", "shippingCost", "shippingAddress"):
        assert order.get(field), f"order is missing {field}: {order}"
    assert [i["item"]["productId"] for i in order["items"]] == [PRODUCT_ID]


def test_cart_is_empty_after_an_order(user_id):
    add_to_cart(user_id)
    assert place_order(user_id).status_code == 200

    assert get_cart(user_id)["items"] == []


def test_usd_order_shipping_cost_equals_the_usd_quote(user_id):
    add_to_cart(user_id)
    quoted = shipping_quote([{"productId": PRODUCT_ID, "quantity": 1}], "USD")

    resp = place_order(user_id, "USD")

    assert resp.status_code == 200, resp.text
    shipping = resp.json()["shippingCost"]
    assert shipping["currencyCode"] == "USD"
    assert (int(shipping["units"]), int(shipping.get("nanos", 0))) == (int(quoted["units"]), int(quoted.get("nanos", 0)))


@pytest.mark.parametrize("currency", ["CAD", "JPY"])
def test_non_usd_order_shipping_cost_is_converted(user_id, currency):
    add_to_cart(user_id)
    quoted = shipping_quote([{"productId": PRODUCT_ID, "quantity": 1}], currency)
    usd_quote = shipping_quote([{"productId": PRODUCT_ID, "quantity": 1}], "USD")

    resp = place_order(user_id, currency)

    assert resp.status_code == 200, resp.text
    shipping = resp.json()["shippingCost"]
    assert shipping["currencyCode"] == currency
    assert abs(money_amount(shipping) - money_amount(quoted)) <= 0.01, (
        f"order shipping {money_amount(shipping)} {currency}, cart quote {money_amount(quoted)} {currency}, "
        f"USD quote {money_amount(usd_quote)}"
    )


def test_shipping_cost_is_the_quote_rounded_to_cents():
    for _ in range(10):
        expected_cents = round(quote_service(1) * 100)
        shipping = shipping_quote([{"productId": PRODUCT_ID, "quantity": 1}], "USD")
        units, nanos = int(shipping["units"]), int(shipping.get("nanos", 0))

        assert nanos % 10_000_000 == 0, shipping
        assert units * 100 + nanos // 10_000_000 == expected_cents, shipping


def test_shipping_quote_counts_distinct_items_not_quantity():
    one = shipping_quote([{"productId": PRODUCT_ID, "quantity": 1}], "USD")
    three = shipping_quote([{"productId": PRODUCT_ID, "quantity": 3}], "USD")
    two_products = shipping_quote(
        [{"productId": PRODUCT_ID, "quantity": 1}, {"productId": OTHER_PRODUCT_ID, "quantity": 5}], "USD"
    )

    assert three == one
    assert round(money_amount(one) * 100) == round(quote_service(1) * 100)
    assert round(money_amount(two_products) * 100) == round(quote_service(2) * 100)


def test_card_expiring_this_month_is_accepted(user_id):
    today = date.today()
    add_to_cart(user_id)

    resp = place_order(user_id, expiry=(today.year, today.month))

    assert resp.status_code == 200, resp.text
    assert resp.json().get("orderId")
    assert get_cart(user_id)["items"] == []


def test_currency_list_has_every_rated_currency():
    resp = requests.get(f"{FRONTEND_PROXY_URL}/api/currency", timeout=10)
    resp.raise_for_status()
    codes = resp.json()

    assert "EUR" in codes
    assert set(codes) == RATED_CURRENCIES
    assert len(codes) == len(RATED_CURRENCIES)


def test_products_are_priced_in_eur():
    resp = requests.get(f"{FRONTEND_PROXY_URL}/api/products", params={"currencyCode": "EUR"}, timeout=10)
    resp.raise_for_status()
    products = resp.json()

    assert products
    assert {p["priceUsd"]["currencyCode"] for p in products} == {"EUR"}


def _recommendations():
    resp = requests.get(
        f"{FRONTEND_PROXY_URL}/api/recommendations",
        params={"productIds": PRODUCT_ID, "sessionId": "telemetry-test", "currencyCode": "USD"},
        timeout=10,
    )
    resp.raise_for_status()
    return [p["id"] for p in resp.json()]


def test_recommendations_exclude_the_requested_product():
    responses = [_recommendations() for _ in range(20)]

    assert all(ids for ids in responses)
    assert [ids for ids in responses if PRODUCT_ID in ids] == []
