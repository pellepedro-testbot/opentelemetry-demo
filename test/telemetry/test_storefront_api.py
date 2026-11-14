# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

import datetime
import json
import time
import uuid

import pytest
import requests

from conftest import FRONTEND_PROXY_URL

FLAG_PROPAGATION_SECONDS = 10

ADDRESS = {
    "streetAddress": "1600 Amphitheatre Parkway",
    "city": "Mountain View",
    "state": "CA",
    "country": "USA",
    "zipCode": "94043",
}

CREDIT_CARD = {
    "creditCardNumber": "4432801561520454",
    "creditCardCvv": 123,
    "creditCardExpirationYear": datetime.date.today().year + 1,
    "creditCardExpirationMonth": 1,
}


def _checkout_body(user_id, **overrides):
    body = {
        "userId": user_id,
        "userCurrency": "USD",
        "address": ADDRESS,
        "email": "cypress-test@example.com",
        "creditCard": CREDIT_CARD,
    }
    body.update(overrides)
    return body


def _add_to_cart(user_id, product_id, quantity):
    resp = requests.post(
        f"{FRONTEND_PROXY_URL}/api/cart",
        json={"userId": user_id, "item": {"productId": product_id, "quantity": quantity}},
        timeout=10,
    )
    resp.raise_for_status()


def _checkout(body):
    return requests.post(
        f"{FRONTEND_PROXY_URL}/api/checkout",
        params={"currencyCode": "USD"},
        json=body,
        timeout=30,
    )


def _assert_error_shape(resp):
    assert resp.headers["content-type"].startswith("application/json")
    body = resp.json()
    assert isinstance(body, dict)
    assert isinstance(body.get("error"), str) and body["error"]
    if "code" in body:
        assert isinstance(body["code"], str)


def _write_flags(change):
    flags = requests.get(f"{FRONTEND_PROXY_URL}/feature/api/read", timeout=10)
    flags.raise_for_status()
    data = flags.json()
    change(data["flags"])
    requests.post(
        f"{FRONTEND_PROXY_URL}/feature/api/write", json={"data": data}, timeout=10
    ).raise_for_status()
    time.sleep(FLAG_PROPAGATION_SECONDS)


@pytest.fixture
def user_id():
    uid = f"api-test-{uuid.uuid4()}"
    yield uid
    requests.delete(f"{FRONTEND_PROXY_URL}/api/cart", json={"userId": uid}, timeout=10)


@pytest.fixture
def payment_failure_flag():
    _write_flags(lambda flags: flags["paymentFailure"].update(defaultVariant="100%"))
    yield
    _write_flags(lambda flags: flags["paymentFailure"].update(defaultVariant="off"))


@pytest.fixture
def product_catalog_failure_flag():
    def set_variant(variant):
        def change(flags):
            flags["productCatalogFailure"]["targeting"]["if"][1] = variant

        return change

    _write_flags(set_variant("on"))
    yield
    _write_flags(set_variant("off"))


@pytest.mark.parametrize("currency_code", ["USD", "EUR"])
def test_shipping_quote_in_requested_currency(currency_code):
    resp = requests.get(
        f"{FRONTEND_PROXY_URL}/api/shipping",
        params={
            "itemList": json.dumps([{"productId": "OLJCESPC7Z", "quantity": 1}]),
            "currencyCode": currency_code,
            "address": json.dumps(ADDRESS),
        },
        timeout=10,
    )
    assert resp.status_code == 200
    money = resp.json()
    assert money["currencyCode"] == currency_code
    assert isinstance(money["units"], int)
    assert isinstance(money["nanos"], int)
    assert money["units"] + money["nanos"] / 1e9 > 0


def test_checkout_answers_order_with_product_details(user_id):
    _add_to_cart(user_id, "OLJCESPC7Z", 2)

    resp = _checkout(_checkout_body(user_id))

    assert resp.status_code == 200
    order = resp.json()
    assert isinstance(order["orderId"], str) and order["orderId"]
    assert isinstance(order["shippingTrackingId"], str) and order["shippingTrackingId"]
    assert order["shippingAddress"] == ADDRESS
    assert {"currencyCode", "units", "nanos"} <= order["shippingCost"].keys()
    assert len(order["items"]) == 1
    item = order["items"][0]
    assert item["item"]["productId"] == "OLJCESPC7Z"
    assert item["item"]["quantity"] == 2
    assert item["item"]["product"]["name"] == "National Park Foundation Explorascope"
    assert {"currencyCode", "units", "nanos"} <= item["cost"].keys()


def test_payment_failure_answers_422_payment_failed(user_id, payment_failure_flag):
    _add_to_cart(user_id, "OLJCESPC7Z", 1)

    resp = _checkout(_checkout_body(user_id))

    assert resp.status_code == 422
    body = resp.json()
    assert body.get("code") == "PAYMENT_FAILED"
    assert isinstance(body.get("error"), str) and body["error"]


def test_expired_card_answers_422_payment_failed_and_keeps_cart(user_id):
    _add_to_cart(user_id, "OLJCESPC7Z", 1)

    resp = _checkout(
        _checkout_body(user_id, creditCard={**CREDIT_CARD, "creditCardExpirationYear": 2001})
    )

    assert resp.status_code == 422
    body = resp.json()
    assert body.get("code") == "PAYMENT_FAILED"
    assert isinstance(body.get("error"), str) and body["error"]
    cart = requests.get(
        f"{FRONTEND_PROXY_URL}/api/cart",
        params={"sessionId": user_id, "currencyCode": "USD"},
        timeout=10,
    ).json()
    assert [i["productId"] for i in cart["items"]] == ["OLJCESPC7Z"]


def test_catalog_failure_answers_generic_500_without_code(user_id, product_catalog_failure_flag):
    _add_to_cart(user_id, "OLJCESPC7Z", 1)

    resp = _checkout(_checkout_body(user_id))

    assert resp.status_code == 500
    body = resp.json()
    assert "code" not in body
    assert isinstance(body.get("error"), str) and body["error"]
    _assert_error_shape(resp)


def test_rejected_checkout_bodies_share_json_error_shape(user_id):
    empty_cart = _checkout(_checkout_body(f"{user_id}-empty"))
    assert empty_cart.status_code >= 400
    _assert_error_shape(empty_cart)

    _add_to_cart(user_id, "OLJCESPC7Z", 1)
    no_card = _checkout(
        {"userId": user_id, "userCurrency": "USD", "address": ADDRESS, "email": "cypress-test@example.com"}
    )
    assert no_card.status_code >= 400
    _assert_error_shape(no_card)
