# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

import pytest
import requests

from conftest import FRONTEND_PROXY_URL

CLIENT_TIMEOUT = 5
CART_USER_ID = "telemetry-test-unsupported-method-cart"
CART_PRODUCT_ID = "OLJCESPC7Z"


def _send(method, path, **kwargs):
    try:
        return requests.request(method, f"{FRONTEND_PROXY_URL}{path}", timeout=CLIENT_TIMEOUT, **kwargs)
    except requests.Timeout:
        pytest.fail(f"{method} {path} got no response within {CLIENT_TIMEOUT}s")


def _cart_body(quantity=1):
    return {"userId": CART_USER_ID, "item": {"productId": CART_PRODUCT_ID, "quantity": quantity}}


def _empty_cart():
    requests.delete(f"{FRONTEND_PROXY_URL}/api/cart", json={"userId": CART_USER_ID}, timeout=10)


@pytest.fixture
def cart_user():
    _empty_cart()
    yield CART_USER_ID
    _empty_cart()


def test_currency_put_answers_405_at_once():
    resp = _send("PUT", "/api/currency")
    assert resp.status_code == 405
    assert resp.elapsed.total_seconds() < CLIENT_TIMEOUT


def test_currency_put_405_allows_get():
    resp = _send("PUT", "/api/currency")
    assert resp.headers.get("Allow") == "GET"


def test_currency_put_405_has_empty_body():
    resp = _send("PUT", "/api/currency")
    assert resp.content == b""


@pytest.mark.parametrize("method", ["POST", "DELETE", "PATCH"])
def test_currency_other_unhandled_methods_answer_405(method):
    resp = _send(method, "/api/currency")
    assert resp.status_code == 405
    assert resp.headers.get("Allow") == "GET"
    assert resp.content == b""


def test_cart_put_answers_405_at_once(cart_user):
    resp = _send("PUT", "/api/cart", json=_cart_body())
    assert resp.status_code == 405
    assert resp.elapsed.total_seconds() < CLIENT_TIMEOUT


def test_cart_put_405_allows_get_post_delete(cart_user):
    resp = _send("PUT", "/api/cart", json=_cart_body())
    assert resp.headers.get("Allow") == "GET, POST, DELETE"


def test_cart_put_405_has_empty_body(cart_user):
    resp = _send("PUT", "/api/cart", json=_cart_body())
    assert resp.content == b""


def test_cart_patch_answers_405(cart_user):
    resp = _send("PATCH", "/api/cart", json=_cart_body())
    assert resp.status_code == 405
    assert resp.headers.get("Allow") == "GET, POST, DELETE"
    assert resp.content == b""


def test_cart_refused_put_leaves_cart_unchanged(cart_user):
    resp = _send("POST", "/api/cart", json=_cart_body(quantity=1))
    assert resp.status_code == 200

    resp = _send("PUT", "/api/cart", json=_cart_body(quantity=5))
    assert resp.status_code == 405

    resp = _send("GET", "/api/cart", params={"sessionId": cart_user, "currencyCode": "USD"})
    assert resp.status_code == 200
    items = [(i["productId"], i["quantity"]) for i in resp.json()["items"]]
    assert items == [(CART_PRODUCT_ID, 1)]


def test_shipping_post_answers_405_at_once():
    resp = _send("POST", "/api/shipping")
    assert resp.status_code == 405
    assert resp.elapsed.total_seconds() < CLIENT_TIMEOUT


def test_shipping_post_405_allows_get():
    resp = _send("POST", "/api/shipping")
    assert resp.headers.get("Allow") == "GET"


def test_shipping_post_405_has_empty_body():
    resp = _send("POST", "/api/shipping")
    assert resp.content == b""


@pytest.mark.parametrize("method", ["PUT", "DELETE"])
def test_shipping_other_unhandled_methods_answer_405(method):
    resp = _send(method, "/api/shipping")
    assert resp.status_code == 405
    assert resp.headers.get("Allow") == "GET"
    assert resp.content == b""
