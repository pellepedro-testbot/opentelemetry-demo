# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""POST /api/checkout through the frontend-proxy: a declined payment is a 422
PAYMENT_FAILED, any other failure a generic 500, and a valid order still succeeds."""

import datetime

import pytest

from demo_shop import (
    ADDRESS,
    add_to_cart,
    cart_items,
    empty_cart,
    flag,
    new_user_id,
    place_order,
    set_product_catalog_failure,
)

DECLINE_MESSAGE = "Your payment could not be processed. Please check your card details and try again."


@pytest.fixture
def user_id():
    user = new_user_id("checkout-api")
    yield user
    empty_cart(user)


def assert_declined(resp):
    assert resp.status_code == 422, resp.text
    body = resp.json()
    assert body.get("code") == "PAYMENT_FAILED"
    assert isinstance(body.get("error"), str) and body["error"]


def assert_generic_failure(resp):
    assert resp.status_code == 500, resp.text
    body = resp.json()
    assert "code" not in body
    assert isinstance(body.get("error"), str) and body["error"]


def test_declined_payment_answers_422_payment_failed(user_id):
    with flag("paymentFailure", "100%"):
        add_to_cart(user_id)
        resp = place_order(user_id)
    assert_declined(resp)
    assert resp.json()["error"] == DECLINE_MESSAGE


def test_catalog_failure_answers_generic_500(user_id):
    set_product_catalog_failure("on")
    try:
        add_to_cart(user_id, "OLJCESPC7Z")
        resp = place_order(user_id)
    finally:
        set_product_catalog_failure("off")
    assert_generic_failure(resp)


def test_unreachable_payment_service_is_not_reported_as_decline(user_id):
    with flag("paymentUnreachable", "on"):
        add_to_cart(user_id)
        resp = place_order(user_id)
    assert_generic_failure(resp)


def test_expired_card_answers_422_payment_failed(user_id):
    add_to_cart(user_id)
    resp = place_order(user_id, expiration_year=datetime.date.today().year - 1)
    assert_declined(resp)


def test_invalid_card_number_answers_422_payment_failed(user_id):
    add_to_cart(user_id)
    resp = place_order(user_id, card_number="1234-5678-9012-3456")
    assert_declined(resp)


def test_valid_order_succeeds_and_empties_cart(user_id):
    add_to_cart(user_id, "0PUK6V6EV0", 1)
    add_to_cart(user_id, "66VCHSJNUP", 2)

    resp = place_order(user_id)

    assert resp.status_code == 200, resp.text
    order = resp.json()
    assert set(order) >= {"orderId", "shippingTrackingId", "shippingCost", "shippingAddress", "items"}
    assert order["orderId"] and order["shippingTrackingId"]
    assert order["shippingCost"]["currencyCode"] == "USD"
    assert order["shippingAddress"] == ADDRESS
    ordered = {}
    for line in order["items"]:
        assert line["cost"]["currencyCode"] == "USD"
        product = line["item"]["product"]
        assert product["name"] and product["picture"]
        ordered[line["item"]["productId"]] = line["item"]["quantity"]
    assert ordered == {"0PUK6V6EV0": 1, "66VCHSJNUP": 2}
    assert cart_items(user_id) == []


def test_declined_order_keeps_cart_and_can_be_retried(user_id):
    with flag("paymentFailure", "100%"):
        add_to_cart(user_id, "0PUK6V6EV0", 1)
        before = cart_items(user_id)
        assert before == [("0PUK6V6EV0", 1)]

        declined = place_order(user_id)
        assert_declined(declined)
        assert cart_items(user_id) == before

    retry = place_order(user_id)
    assert retry.status_code == 200, retry.text
    assert [i["item"]["productId"] for i in retry.json()["items"]] == ["0PUK6V6EV0"]
    assert cart_items(user_id) == []
