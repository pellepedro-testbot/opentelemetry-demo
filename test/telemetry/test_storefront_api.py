# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Storefront HTTP API checks through the frontend proxy: checkout error
classification, cart, catalog, recommendations, error pages and flags."""

import datetime
import re

import requests

from conftest import FRONTEND_PROXY_URL
from storefront import (
    PAYMENT_DECLINED_MESSAGE,
    add_to_cart,
    checkout_body,
    empty_cart,
    flag_variant,
    get_cart,
    new_user_id,
    order_with_items,
    place_order,
    product_catalog_failure_on,
    read_flags,
)

# EUR and USD rates from the currency service's conversion table (src/currency/src/server.cpp).
EUR_PER_EUR = 1.0
USD_PER_EUR = 1.1305

# A <title> element, whatever attributes Next.js adds to it, holding exactly the given text.
TITLE = r"<title[^>]*>{}</title>"


def _cart_items(user_id):
    resp = get_cart(user_id)
    assert resp.status_code == 200, resp.text
    return {item["productId"]: item["quantity"] for item in resp.json().get("items", [])}


def test_declined_payment_answers_422_and_keeps_the_cart():
    user_id = new_user_id()
    add_to_cart(user_id, "0PUK6V6EV0", 1)
    with flag_variant("paymentFailure", "100%"):
        resp = place_order(checkout_body(user_id))
    assert resp.status_code == 422, resp.text
    assert resp.json() == {"code": "PAYMENT_FAILED", "error": PAYMENT_DECLINED_MESSAGE}
    assert _cart_items(user_id) == {"0PUK6V6EV0": 1}


def test_unrelated_internal_failure_answers_generic_500():
    user_id = new_user_id()
    add_to_cart(user_id, "OLJCESPC7Z", 1)
    with product_catalog_failure_on():
        resp = place_order(checkout_body(user_id))
    assert resp.status_code == 500, resp.text
    body = resp.json()
    assert body.get("error") == "Failed to place order."
    assert "code" not in body


def test_unreachable_payment_service_is_not_reported_as_a_decline():
    user_id = new_user_id()
    add_to_cart(user_id, "0PUK6V6EV0", 1)
    with flag_variant("paymentUnreachable", "on"):
        resp = place_order(checkout_body(user_id))
    assert resp.status_code == 500, resp.text
    body = resp.json()
    assert body.get("error") == "Failed to place order."
    assert "code" not in body


def test_card_rejected_by_payment_answers_422():
    for card_number in ("3782-822463-10005", "1234-5678-9012-3456"):
        _, resp = order_with_items([("0PUK6V6EV0", 1)], card_number=card_number)
        assert resp.status_code == 422, f"{card_number}: {resp.status_code} {resp.text}"
        body = resp.json()
        assert body.get("code") == "PAYMENT_FAILED", card_number
        assert body.get("error") == PAYMENT_DECLINED_MESSAGE, card_number


def test_expired_card_answers_422():
    _, resp = order_with_items(
        [("0PUK6V6EV0", 1)], expiration_year=datetime.date.today().year - 1
    )
    assert resp.status_code == 422, resp.text
    assert resp.json().get("code") == "PAYMENT_FAILED"


def test_successful_order_returns_the_placed_order_and_empties_the_cart():
    user_id, resp = order_with_items([("0PUK6V6EV0", 1), ("66VCHSJNUP", 2)])
    assert resp.status_code == 200, resp.text
    order = resp.json()
    assert order["orderId"]
    assert order["shippingTrackingId"]
    assert order["shippingCost"]["currencyCode"] == "USD"
    assert order["shippingAddress"]["zipCode"] == "94043"
    assert len(order["items"]) == 2
    quantities = {}
    for line in order["items"]:
        assert "cost" in line
        product = line["item"]["product"]
        assert product["id"] and product["name"] and product["picture"]
        quantities[product["id"]] = line["item"]["quantity"]
    assert quantities == {"0PUK6V6EV0": 1, "66VCHSJNUP": 2}
    assert _cart_items(user_id) == {}


def test_placed_order_for_one_item_charges_8_99_shipping():
    _, resp = order_with_items([("0PUK6V6EV0", 1)])
    assert resp.status_code == 200, resp.text
    shipping = resp.json()["shippingCost"]
    assert (shipping["units"], shipping["nanos"]) == (8, 990000000)


def test_missing_page_serves_custom_404():
    resp = requests.get(f"{FRONTEND_PROXY_URL}/this-page-does-not-exist", timeout=15)
    assert resp.status_code == 404
    assert re.search(TITLE.format("Otel Demo - Page Not Found"), resp.text)
    assert "This page could not be found." in resp.text
    assert "Go to homepage" in resp.text


def test_server_error_page_renders_custom_message():
    resp = requests.get(f"{FRONTEND_PROXY_URL}/500", timeout=15)
    assert "A server-side error occurred. Please try again." in resp.text
    assert re.search(TITLE.format("Otel Demo - Server Error"), resp.text)
    assert "Cannot find module" not in resp.text


def test_empty_cart_answers_204_and_clears_items():
    user_id = new_user_id()
    add_to_cart(user_id, "0PUK6V6EV0", 1)
    resp = empty_cart(user_id)
    assert resp.status_code == 204, resp.text
    assert _cart_items(user_id) == {}


def test_cart_failure_100_percent_fails_every_empty_cart():
    user_id = new_user_id()
    add_to_cart(user_id, "0PUK6V6EV0", 1)
    with flag_variant("cartFailure", "100%"):
        statuses = [empty_cart(user_id, timeout=60).status_code for _ in range(5)]
    assert all(status >= 500 for status in statuses), statuses
    assert _cart_items(user_id) == {"0PUK6V6EV0": 1}
    empty_cart(user_id)


def test_same_product_added_twice_sums_quantities():
    user_id = new_user_id()
    add_to_cart(user_id, "0PUK6V6EV0", 1)
    add_to_cart(user_id, "0PUK6V6EV0", 2)
    add_to_cart(user_id, "66VCHSJNUP", 1)
    assert _cart_items(user_id) == {"0PUK6V6EV0": 3, "66VCHSJNUP": 1}
    empty_cart(user_id)


def test_eur_price_matches_the_conversion_table():
    def price(currency):
        resp = requests.get(
            f"{FRONTEND_PROXY_URL}/api/products/0PUK6V6EV0", params={"currencyCode": currency}, timeout=15
        )
        assert resp.status_code == 200, resp.text
        return resp.json()["priceUsd"]

    usd, eur = price("USD"), price("EUR")
    assert eur["currencyCode"] == "EUR"
    usd_value = usd.get("units", 0) + usd.get("nanos", 0) / 1e9
    eur_value = eur.get("units", 0) + eur.get("nanos", 0) / 1e9
    assert abs(eur_value - usd_value * EUR_PER_EUR / USD_PER_EUR) < 0.01


def test_recommendations_are_served():
    resp = requests.get(
        f"{FRONTEND_PROXY_URL}/api/recommendations",
        params={"productIds": "0PUK6V6EV0", "currencyCode": "USD"},
        timeout=15,
    )
    assert resp.status_code == 200, resp.text
    ids = [p["id"] for p in resp.json()]
    assert ids
    assert "0PUK6V6EV0" not in ids


def test_k6_load_generator_flags_are_gone():
    flags = read_flags()["flags"]
    assert "loadGeneratorTraffic" not in flags
    assert "loadGeneratorVUs" not in flags
