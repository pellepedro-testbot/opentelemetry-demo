# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Storefront HTTP API checks for checkout, shipping, currency and
recommendations, driven through the frontend proxy."""

import datetime

import pytest
import requests

from conftest import FRONTEND_PROXY_URL
from storefront import money_amount, place_order, shipping_quote

PRODUCT_ID = "OLJCESPC7Z"
OTHER_PRODUCT_ID = "66VCHSJNUP"

RATE_TABLE_CURRENCIES = {
    "EUR", "USD", "JPY", "BGN", "CZK", "DKK", "GBP", "HUF", "PLN", "RON", "SEK",
    "CHF", "ISK", "NOK", "HRK", "RUB", "TRY", "AUD", "BRL", "CAD", "CNY", "HKD",
    "IDR", "ILS", "INR", "KRW", "MXN", "MYR", "NZD", "PHP", "SGD", "THB", "ZAR",
}


def test_checkout_failure_answers_json_error():
    expired = {"creditCardExpirationYear": datetime.date.today().year - 1, "creditCardExpirationMonth": 1}
    resp = place_order(PRODUCT_ID, credit_card=expired)

    assert not resp.ok, f"checkout with an expired card succeeded: {resp.text[:300]}"
    assert resp.headers.get("content-type", "").startswith("application/json"), resp.text[:300]
    error = resp.json().get("error")
    assert isinstance(error, str) and error, f"body has no error message: {resp.text[:300]}"


@pytest.mark.parametrize("currency", ["EUR", "CAD", "JPY"])
def test_non_usd_order_shipping_cost_is_converted(currency):
    quoted = shipping_quote([{"productId": PRODUCT_ID, "quantity": 1}], currency)

    resp = place_order(PRODUCT_ID, currency=currency)
    assert resp.status_code == 200, resp.text[:300]
    shipping = resp.json()["shippingCost"]

    assert shipping["currencyCode"] == currency
    assert money_amount(shipping) == pytest.approx(money_amount(quoted), abs=0.01), (
        f"order shipping {shipping} differs from the {currency} quote {quoted}"
    )


def test_usd_order_shipping_cost_is_the_quote():
    resp = place_order(PRODUCT_ID, currency="USD")

    assert resp.status_code == 200, resp.text[:300]
    order = resp.json()
    assert order.get("orderId")
    assert order["shippingCost"] == {"currencyCode": "USD", "units": 8, "nanos": 990000000}


def test_shipping_quote_counts_one_product_with_quantity_as_one_item():
    quote = shipping_quote([{"productId": PRODUCT_ID, "quantity": 5}], "USD")

    assert quote == {"currencyCode": "USD", "units": 8, "nanos": 990000000}


def test_shipping_quote_counts_distinct_products():
    quote = shipping_quote(
        [{"productId": PRODUCT_ID, "quantity": 1}, {"productId": OTHER_PRODUCT_ID, "quantity": 3}],
        "USD",
    )

    assert quote == {"currencyCode": "USD", "units": 17, "nanos": 980000000}


def test_card_expiring_this_month_is_accepted():
    today = datetime.date.today()
    card = {"creditCardExpirationYear": today.year, "creditCardExpirationMonth": today.month}

    resp = place_order(PRODUCT_ID, credit_card=card)

    assert resp.status_code == 200, f"card expiring {today.month}/{today.year} refused: {resp.text[:300]}"
    assert resp.json().get("orderId")


def test_supported_currencies_include_eur():
    resp = requests.get(f"{FRONTEND_PROXY_URL}/api/currency", timeout=10)
    resp.raise_for_status()
    codes = set(resp.json())

    assert "EUR" in codes, f"EUR missing from {sorted(codes)}"
    assert RATE_TABLE_CURRENCIES - {"EUR"} <= codes, f"missing {sorted(RATE_TABLE_CURRENCIES - codes)}"


@pytest.mark.parametrize(
    "product_ids", [[PRODUCT_ID], [PRODUCT_ID, OTHER_PRODUCT_ID]], ids=["one", "two"]
)
def test_recommendations_exclude_requested_products(product_ids):
    for attempt in range(10):
        resp = requests.get(
            f"{FRONTEND_PROXY_URL}/api/recommendations",
            params={"productIds": product_ids, "sessionId": f"rec-{attempt}", "currencyCode": "USD"},
            timeout=10,
        )
        resp.raise_for_status()
        returned = [p["id"] for p in resp.json()]
        assert not set(returned) & set(product_ids), (
            f"call {attempt + 1} recommended requested product(s): {returned}"
        )


@pytest.mark.parametrize("route", ["product-reviews", "product-ask-ai-assistant"])
def test_removed_review_routes_are_gone(route):
    resp = requests.get(f"{FRONTEND_PROXY_URL}/api/{route}/{PRODUCT_ID}", timeout=10)

    assert resp.status_code == 404
