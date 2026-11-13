# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

import contextlib
import json
import time
import uuid

import requests

from conftest import FRONTEND_PROXY_URL, PROBE_PERSON

ADDRESS = {
    "streetAddress": "1600 Amphitheatre Parkway",
    "city": "Mountain View",
    "state": "CA",
    "country": "USA",
    "zipCode": "94043",
}
FLAG_RELOAD_SECONDS = 3


@contextlib.contextmanager
def flag(update):
    """Edit the flagd config through the frontend proxy, restoring it afterwards."""
    original = requests.get(f"{FRONTEND_PROXY_URL}/feature/api/read", timeout=10).json()
    changed = json.loads(json.dumps(original))
    update(changed["flags"])
    requests.post(f"{FRONTEND_PROXY_URL}/feature/api/write", json={"data": changed}, timeout=10).raise_for_status()
    time.sleep(FLAG_RELOAD_SECONDS)
    try:
        yield
    finally:
        requests.post(f"{FRONTEND_PROXY_URL}/feature/api/write", json={"data": original}, timeout=10).raise_for_status()
        time.sleep(FLAG_RELOAD_SECONDS)


def add_to_cart(user_id, product_id):
    resp = requests.post(
        f"{FRONTEND_PROXY_URL}/api/cart",
        json={"userId": user_id, "item": {"productId": product_id, "quantity": 1}},
        timeout=10,
    )
    resp.raise_for_status()


def empty_cart(user_id):
    requests.delete(f"{FRONTEND_PROXY_URL}/api/cart", json={"userId": user_id}, timeout=10)


def place_order(user_id):
    order = dict(PROBE_PERSON, userId=user_id, address=ADDRESS)
    return requests.post(f"{FRONTEND_PROXY_URL}/api/checkout", params={"currencyCode": "USD"}, json=order, timeout=30)


def assert_json_error(resp):
    assert resp.headers.get("content-type", "").startswith("application/json"), resp.text
    body = resp.json()
    assert isinstance(body.get("error"), str) and body["error"], body
    return body


def test_shipping_quote_is_returned_in_the_requested_currency():
    item_list = json.dumps([{"productId": "OLJCESPC7Z", "quantity": 1}])
    quotes = {}
    for currency in ("USD", "EUR"):
        resp = requests.get(
            f"{FRONTEND_PROXY_URL}/api/shipping",
            params={"itemList": item_list, "currencyCode": currency, "address": json.dumps(ADDRESS)},
            timeout=15,
        )
        assert resp.status_code == 200, resp.text
        quotes[currency] = resp.json()

    for currency, quote in quotes.items():
        assert quote["currencyCode"] == currency
        assert isinstance(quote["units"], int) and quote["units"] >= 0
        assert isinstance(quote["nanos"], int) and quote["nanos"] >= 0
    assert quotes["USD"]["units"] + quotes["USD"]["nanos"] > 0


def test_checkout_failing_for_a_non_payment_reason_answers_500_json_error_without_code():
    user_id = f"api-catalog-failure-{uuid.uuid4()}"

    def on(flags):
        flags["productCatalogFailure"]["targeting"]["if"][1] = "on"

    with flag(on):
        add_to_cart(user_id, "OLJCESPC7Z")
        try:
            resp = place_order(user_id)
        finally:
            empty_cart(user_id)

    assert resp.status_code == 500, resp.text
    body = assert_json_error(resp)
    assert "code" not in body


def payment_failure(flags):
    flags["paymentFailure"]["defaultVariant"] = "100%"


def test_checkout_with_declined_payment_answers_json_error():
    user_id = f"api-payment-failure-{uuid.uuid4()}"
    with flag(payment_failure):
        add_to_cart(user_id, "0PUK6V6EV0")
        try:
            resp = place_order(user_id)
        finally:
            empty_cart(user_id)

    assert 400 <= resp.status_code < 600, resp.text
    assert_json_error(resp)


def test_failed_checkout_leaves_the_cart_as_it_was():
    user_id = f"api-payment-failure-cart-{uuid.uuid4()}"
    try:
        with flag(payment_failure):
            add_to_cart(user_id, "0PUK6V6EV0")
            resp = place_order(user_id)
        assert resp.status_code != 200, resp.text

        cart = requests.get(
            f"{FRONTEND_PROXY_URL}/api/cart",
            params={"sessionId": user_id, "currencyCode": "USD"},
            timeout=10,
        )
        assert cart.status_code == 200, cart.text
        items = [(i["productId"], i["quantity"]) for i in cart.json()["items"]]
        assert items == [("0PUK6V6EV0", 1)]
    finally:
        empty_cart(user_id)
