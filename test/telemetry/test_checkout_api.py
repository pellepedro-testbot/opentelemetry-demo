# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""POST /api/checkout answers: payment declines are 422 PAYMENT_FAILED, other
failures stay 500, and a successful order keeps its full answer."""

import requests

from conftest import FRONTEND_PROXY_URL
from storefront import (
    PAYMENT_DECLINED_MESSAGE,
    VALID_CARD,
    add_to_cart,
    cart_product_quantities,
    checkout,
    checkout_body,
    empty_cart,
    new_user_id,
    place_order,
    shipping_quote,
)


def test_invalid_card_number_answers_422():
    user_id, resp, _ = place_order(card_number="1234")
    try:
        assert resp.status_code == 422, resp.text
    finally:
        empty_cart(user_id)


def test_declined_card_answer_has_user_facing_error_text():
    user_id, resp, _ = place_order(card_number="1234")
    try:
        assert resp.json()["error"] == PAYMENT_DECLINED_MESSAGE
    finally:
        empty_cart(user_id)


def test_declined_card_answer_has_payment_failed_code():
    user_id, resp, _ = place_order(card_number="1234")
    try:
        assert resp.json().get("code") == "PAYMENT_FAILED"
    finally:
        empty_cart(user_id)


def test_expired_card_answers_422_payment_failed():
    user_id, resp, _ = place_order(expiration_year=2020)
    try:
        assert resp.status_code == 422, resp.text
        assert resp.json()["code"] == "PAYMENT_FAILED"
    finally:
        empty_cart(user_id)


def test_declined_card_body_holds_only_error_and_code():
    user_id, resp, _ = place_order(card_number="1234")
    try:
        assert sorted(resp.json().keys()) == ["code", "error"]
    finally:
        empty_cart(user_id)


def test_unaccepted_card_type_answers_422_payment_failed():
    user_id, resp, _ = place_order(card_number="378282246310005")
    try:
        assert resp.status_code == 422, resp.text
        assert resp.json()["code"] == "PAYMENT_FAILED"
    finally:
        empty_cart(user_id)


def test_declined_card_keeps_cart_items():
    user_id, resp, _ = place_order(card_number="1234")
    try:
        assert resp.status_code == 422, resp.text
        assert cart_product_quantities(user_id) == {"OLJCESPC7Z": 1}
    finally:
        empty_cart(user_id)


def test_empty_checkout_body_answers_generic_500():
    resp = requests.post(
        f"{FRONTEND_PROXY_URL}/api/checkout",
        params={"currencyCode": "USD"},
        json={},
        timeout=30,
    )
    assert resp.status_code == 500, resp.text
    assert resp.json() == {"error": "Failed to place order."}


def test_successful_checkout_answers_full_order():
    user_id, resp, _ = place_order(product_id="66VCHSJNUP")
    assert resp.status_code == 200, resp.text
    body = resp.json()
    for key in ("orderId", "shippingTrackingId", "shippingCost", "shippingAddress", "items"):
        assert body.get(key), f"{key} missing from {body}"
    assert [item["item"]["productId"] for item in body["items"]] == ["66VCHSJNUP"]


def test_successful_checkout_empties_cart():
    user_id, resp, _ = place_order(product_id="66VCHSJNUP")
    assert resp.status_code == 200, resp.text
    assert cart_product_quantities(user_id) == {}


def test_checkout_in_eur_prices_items_and_shipping_in_eur():
    user_id, resp, _ = place_order(product_id="66VCHSJNUP", currency="EUR")
    assert resp.status_code == 200, resp.text
    body = resp.json()
    assert body["shippingCost"]["currencyCode"] == "EUR"
    assert body["items"], body
    assert [item["cost"]["currencyCode"] for item in body["items"]] == ["EUR"] * len(body["items"])


def test_checkout_shipping_cost_matches_shipping_quote():
    quote = shipping_quote(1)
    assert quote.status_code == 200, quote.text
    user_id, resp, _ = place_order(product_id="OLJCESPC7Z")
    assert resp.status_code == 200, resp.text
    shipping = resp.json()["shippingCost"]
    assert (shipping["currencyCode"], int(shipping["units"]), shipping["nanos"]) == (
        "USD", 8, 990000000,
    )
    expected = quote.json()
    assert (int(shipping["units"]), shipping["nanos"]) == (int(expected["units"]), expected["nanos"])


def test_retry_with_valid_card_after_decline_places_order():
    user_id = new_user_id()
    add_to_cart(user_id)
    declined = checkout(checkout_body(user_id, card_number="1234"))
    assert declined.status_code == 422, declined.text
    assert declined.json()["code"] == "PAYMENT_FAILED"

    accepted = checkout(checkout_body(user_id, card_number=VALID_CARD))
    assert accepted.status_code == 200, accepted.text
    assert accepted.json()["orderId"]
    assert cart_product_quantities(user_id) == {}
