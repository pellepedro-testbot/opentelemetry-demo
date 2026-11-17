# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""
Storefront API routes other than checkout: request logging of every API route,
the cart, shipping quotes and the server-rendered pages served through the
frontend proxy.
"""

import json
import re

import pytest
import requests

from conftest import FRONTEND_PROXY_URL
from demo_stack import (
    ADDRESS,
    add_to_cart,
    empty_cart,
    frontend_lines,
    get_cart,
    money_value,
    new_trace_id,
    new_user_id,
    place_order,
    traceparent,
    utc_now,
)


def _request_lines(method, path, **kwargs):
    trace_id = new_trace_id()
    since = utc_now()
    resp = requests.request(
        method,
        f"{FRONTEND_PROXY_URL}{path}",
        headers={"traceparent": traceparent(trace_id)},
        timeout=30,
        **kwargs,
    )
    return resp, frontend_lines(since, trace_id)


def _with_msg(lines, msg):
    return [line for line in lines if line.get("msg") == msg]


@pytest.fixture(scope="module")
def products_request():
    return _request_lines("GET", "/api/products?currencyCode=USD")


@pytest.fixture(scope="module")
def failing_shipping_request():
    return _request_lines("GET", "/api/shipping")


# --- request logging --------------------------------------------------------


def test_products_request_writes_one_completed_info_line(products_request):
    _, lines = products_request
    completed = _with_msg(lines, "API request completed")
    assert len(completed) == 1, [l.get("msg") for l in lines]
    assert completed[0]["level"] == 30


def test_completed_line_path_leaves_out_query(products_request):
    _, lines = products_request
    assert _with_msg(lines, "API request completed")[0]["url.path"] == "/api/products"


def test_completed_line_has_method_and_status(products_request):
    resp, lines = products_request
    assert resp.status_code == 200
    line = _with_msg(lines, "API request completed")[0]
    assert line["http.request.method"] == "GET"
    assert line["http.response.status_code"] == 200


def test_cart_post_logs_method_and_path():
    resp, lines = _request_lines(
        "POST", "/api/cart", json={"userId": new_user_id(), "item": {"productId": "OLJCESPC7Z", "quantity": 1}}
    )
    assert resp.status_code == 200
    completed = _with_msg(lines, "API request completed")
    assert len(completed) == 1, [l.get("msg") for l in lines]
    assert completed[0]["http.request.method"] == "POST"
    assert completed[0]["url.path"] == "/api/cart"


def test_product_request_logs_its_path():
    resp, lines = _request_lines("GET", "/api/products/OLJCESPC7Z")
    assert resp.status_code == 200
    completed = _with_msg(lines, "API request completed")
    assert [l["url.path"] for l in completed] == ["/api/products/OLJCESPC7Z"]


def test_checkout_get_answers_405_and_logs_it():
    resp, lines = _request_lines("GET", "/api/checkout")
    assert resp.status_code == 405
    completed = _with_msg(lines, "API request completed")
    assert [l["http.response.status_code"] for l in completed] == [405]


def test_throwing_handler_answers_500_and_logs_failure(failing_shipping_request):
    resp, lines = failing_shipping_request
    assert resp.status_code == 500
    failed = _with_msg(lines, "API request failed")
    assert len(failed) == 1, [l.get("msg") for l in lines]
    assert failed[0]["level"] == 50


def test_failed_line_has_method_path_and_status(failing_shipping_request):
    _, lines = failing_shipping_request
    line = _with_msg(lines, "API request failed")[0]
    assert line["http.request.method"] == "GET"
    assert line["url.path"] == "/api/shipping"
    assert line["http.response.status_code"] == 500


def test_failed_line_holds_the_thrown_error(failing_shipping_request):
    _, lines = failing_shipping_request
    err = _with_msg(lines, "API request failed")[0]["err"]
    assert isinstance(err, dict)
    assert err.get("message")


def test_throwing_handler_writes_no_completed_line(failing_shipping_request):
    _, lines = failing_shipping_request
    assert _with_msg(lines, "API request completed") == []


# --- cart -------------------------------------------------------------------


def _items(user_id):
    resp = get_cart(user_id)
    assert resp.status_code == 200, resp.text[:300]
    return resp.json()["items"]


def test_new_user_cart_is_empty():
    user_id = new_user_id()
    resp = get_cart(user_id)
    assert resp.status_code == 200
    assert resp.json()["items"] == []


def test_adding_same_product_adds_quantities():
    user_id = new_user_id()
    try:
        assert add_to_cart(user_id, "OLJCESPC7Z", 2).status_code == 200
        assert add_to_cart(user_id, "OLJCESPC7Z", 3).status_code == 200
        items = _items(user_id)
        assert [(i["productId"], i["quantity"]) for i in items] == [("OLJCESPC7Z", 5)]
    finally:
        empty_cart(user_id)


def test_new_product_is_stored_with_its_quantity():
    user_id = new_user_id()
    try:
        assert add_to_cart(user_id, "OLJCESPC7Z", 1).status_code == 200
        assert add_to_cart(user_id, "HQTGWGPNH4", 4).status_code == 200
        quantities = {i["productId"]: i["quantity"] for i in _items(user_id)}
        assert quantities == {"OLJCESPC7Z": 1, "HQTGWGPNH4": 4}
    finally:
        empty_cart(user_id)


def test_delete_empties_the_cart():
    user_id = new_user_id()
    assert add_to_cart(user_id, "OLJCESPC7Z", 2).status_code == 200
    empty_cart(user_id)
    assert _items(user_id) == []


# --- shipping ---------------------------------------------------------------


def _shipping(quantity):
    resp = requests.get(
        f"{FRONTEND_PROXY_URL}/api/shipping",
        params={
            "itemList": json.dumps([{"productId": "OLJCESPC7Z", "quantity": quantity}]),
            "currencyCode": "USD",
            "address": json.dumps(ADDRESS),
        },
        timeout=30,
    )
    assert resp.status_code == 200, resp.text[:300]
    return resp.json()


@pytest.mark.parametrize(
    "quantity,units,nanos",
    [(1, 8, 990000000), (2, 17, 980000000), (4, 35, 960000000), (5, 44, 950000000), (8, 71, 920000000), (10, 89, 900000000)],
)
def test_shipping_quote_units_and_nanos(quantity, units, nanos):
    cost = _shipping(quantity)
    assert cost["currencyCode"] == "USD"
    assert (cost["units"], cost["nanos"]) == (units, nanos)


@pytest.mark.parametrize("quantity", [3, 6, 7, 9, 11, 12, 33, 100])
def test_shipping_quote_is_899_per_item_to_the_cent(quantity):
    assert round(money_value(_shipping(quantity)), 2) == round(8.99 * quantity, 2)


def test_checkout_shipping_cost_equals_shipping_quote():
    resp, _, _, _ = place_order()
    assert resp.status_code == 200, resp.text[:300]
    shipping = resp.json()["shippingCost"]
    quote = _shipping(1)
    assert (shipping["units"], shipping["nanos"]) == (quote["units"], quote["nanos"]) == (8, 990000000)


# --- pages ------------------------------------------------------------------


def test_product_page_cart_icon_src_is_relative():
    resp = requests.get(f"{FRONTEND_PROXY_URL}/product/OLJCESPC7Z", timeout=30)
    assert resp.status_code == 200
    button = re.search(r'<button[^>]*data-cy="product-add-to-cart"[^>]*>(.*?)</button>', resp.text, re.S)
    assert button, "Add To Cart button not in the server-rendered HTML"
    img = re.search(r'<img alt="cart"[^>]*\ssrc="([^"]+)"', button.group(1))
    assert img, button.group(1)[:300]
    assert img.group(1).startswith("/icons/Cart.svg?w=")


def test_missing_page_answers_404_with_titled_page():
    resp = requests.get(f"{FRONTEND_PROXY_URL}/this-page-does-not-exist", timeout=30)
    assert resp.status_code == 404
    assert re.search(r"<title[^>]*>Otel Demo - Page Not Found</title>", resp.text)


def test_missing_page_shows_404_text_and_home_link():
    html = requests.get(f"{FRONTEND_PROXY_URL}/this-page-does-not-exist", timeout=30).text
    assert re.search(r"<h1[^>]*>404</h1>", html)
    assert "This page could not be found." in html
    assert re.search(r'<a[^>]*href="/"[^>]*>Go to homepage</a>', html)


def test_opamp_redirects_to_trailing_slash():
    resp = requests.get(f"{FRONTEND_PROXY_URL}/opamp", allow_redirects=False, timeout=10)
    assert resp.status_code == 301
    assert resp.headers.get("Location") == "/opamp/"


def test_opamp_redirect_location_is_relative():
    resp = requests.get(f"{FRONTEND_PROXY_URL}/opamp", allow_redirects=False, timeout=10)
    assert resp.headers.get("Location") == "/opamp/"
