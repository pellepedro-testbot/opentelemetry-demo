# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Storefront HTTP API, error pages and proxy routes, exercised through the frontend proxy."""

import datetime
import html
import json
import os
import re

import pytest
import requests

from conftest import FRONTEND_PROXY_URL
from flags import default_variant, product_catalog_failure_on, read_flags
from orders import (
    GENERIC_FAILURE_MESSAGE,
    PAYMENT_DECLINED_MESSAGE,
    add_to_cart,
    checkout,
    empty_cart,
    get_cart,
    new_user_id,
    place_order,
)

QUOTE_URL = os.environ.get("QUOTE_URL", "http://quote:8090")

SHIPPING_ADDRESS = {
    "streetAddress": "1600 Amphitheatre Parkway",
    "city": "Mountain View",
    "state": "CA",
    "country": "United States",
    "zipCode": "94043",
}


def _assert_payment_declined(resp):
    assert resp.status_code == 422, resp.text
    assert resp.json() == {"error": PAYMENT_DECLINED_MESSAGE, "code": "PAYMENT_FAILED"}


def _assert_generic_failure(resp):
    assert resp.status_code == 500, resp.text
    body = resp.json()
    assert body == {"error": GENERIC_FAILURE_MESSAGE}
    assert "code" not in body


def test_checkout_declined_payment_is_422_payment_failed():
    with default_variant("paymentFailure", "100%"):
        _, resp = place_order(card_number="4432801561520454")
    _assert_payment_declined(resp)


def test_checkout_product_catalog_failure_is_generic_500():
    with product_catalog_failure_on():
        _, resp = place_order(product_id="OLJCESPC7Z")
    _assert_generic_failure(resp)


def test_checkout_payment_unreachable_is_generic_500():
    with default_variant("paymentUnreachable", "on"):
        _, resp = place_order()
    _assert_generic_failure(resp)


def test_checkout_expired_card_is_422_payment_failed():
    user_id, resp = place_order(expiration_year=datetime.date.today().year - 1)
    _assert_payment_declined(resp)
    # No order was placed: checkout empties the cart only after a successful charge.
    assert len(get_cart(user_id)["items"]) == 1


def test_checkout_invalid_card_number_is_422_payment_failed():
    user_id, resp = place_order(card_number="1234-5678-9012-3456")
    _assert_payment_declined(resp)
    assert len(get_cart(user_id)["items"]) == 1


def test_unknown_route_renders_not_found_page():
    resp = requests.get(f"{FRONTEND_PROXY_URL}/this-page-does-not-exist", timeout=15)
    assert resp.status_code == 404
    page = html.unescape(resp.text)
    assert re.search(r"<title[^>]*>Otel Demo - Page Not Found</title>", page)
    assert ">404<" in page
    assert "This page could not be found." in page
    assert re.search(r'<a[^>]*href="/"[^>]*>Go to homepage</a>', page)


def test_server_error_page_renders():
    resp = requests.get(f"{FRONTEND_PROXY_URL}/500", timeout=15)
    assert resp.status_code == 500
    page = html.unescape(resp.text)
    assert re.search(r"<title[^>]*>Otel Demo - Server Error</title>", page)
    assert ">500<" in page
    assert "A server-side error occurred. Please try again." in page
    assert re.search(r'<a[^>]*href="/"[^>]*>Go to homepage</a>', page)


def test_server_rendered_image_urls_are_relative():
    resp = requests.get(f"{FRONTEND_PROXY_URL}/", timeout=15)
    assert resp.status_code == 200
    imgs = re.findall(r"<img\b[^>]*>", resp.text)
    srcs = [html.unescape(m) for img in imgs for m in re.findall(r'\bsrc="([^"]*)"', img)]
    srcsets = [html.unescape(m) for img in imgs for m in re.findall(r'\bsrcSet="([^"]*)"', img, re.I)]
    assert "/icons/CartIcon.svg?w=48&q=75" in srcs, srcs
    for value in srcs + srcsets:
        assert "http://" not in value and "https://" not in value, value
        assert not value.startswith("//"), value


def test_opamp_route_serves_opamp_server_ui():
    resp = requests.get(f"{FRONTEND_PROXY_URL}/opamp", allow_redirects=False, timeout=10)
    assert resp.status_code == 301
    assert resp.headers["Location"].endswith("/opamp/")

    ui = requests.get(f"{FRONTEND_PROXY_URL}/opamp/", timeout=10)
    assert ui.status_code == 200
    assert "<title>OpAMP Server</title>" in ui.text


def _opamp_agents():
    page = requests.get(f"{FRONTEND_PROXY_URL}/opamp/", timeout=10).text
    rows = re.findall(r"<tr>\s*(.*?)</tr>", page, re.S)
    agents = {}
    for row in rows:
        cells = [c.strip() for c in re.findall(r"<td>(.*?)</td>", row, re.S)]
        if len(cells) >= 3:
            agents[cells[0]] = cells[2]
    return agents


def test_opamp_lists_cart_and_product_catalog_healthy():
    agents = _opamp_agents()
    assert agents.get("cart") == "Up", agents
    assert agents.get("product-catalog") == "Up", agents


def test_cart_failure_at_100_percent_always_fails_empty_cart():
    user_id = new_user_id()
    add_to_cart(user_id, "0PUK6V6EV0", 1)
    with default_variant("cartFailure", "100%"):
        statuses = [empty_cart(user_id, timeout=30).status_code for _ in range(5)]
    # The failing cart store never answers, so the proxy may give up first (504).
    assert all(status >= 500 for status in statuses), statuses
    items = get_cart(user_id)["items"]
    assert [(i["productId"], i["quantity"]) for i in items] == [("0PUK6V6EV0", 1)]
    empty_cart(user_id)


def test_cart_empty_with_failure_off_empties_cart():
    user_id = new_user_id()
    add_to_cart(user_id, "0PUK6V6EV0", 1)
    resp = empty_cart(user_id)
    assert resp.status_code == 204
    assert get_cart(user_id)["items"] == []


def test_cart_adding_same_product_twice_sums_quantity():
    user_id = new_user_id()
    add_to_cart(user_id, "66VCHSJNUP", 1)
    add_to_cart(user_id, "66VCHSJNUP", 2)
    items = get_cart(user_id)["items"]
    assert [(i["productId"], i["quantity"]) for i in items] == [("66VCHSJNUP", 3)]
    empty_cart(user_id)


@pytest.mark.parametrize("count", [1, 2, 3, 4, 5])
def test_shipping_cost_keeps_quote_cents(count):
    quote = requests.post(f"{QUOTE_URL}/getquote", json={"numberOfItems": count}, timeout=10)
    quote.raise_for_status()
    expected = round(float(quote.text) * 100) / 100

    resp = requests.get(
        f"{FRONTEND_PROXY_URL}/api/shipping",
        params={
            "itemList": json.dumps([{"productId": "66VCHSJNUP", "quantity": count}]),
            "currencyCode": "USD",
            "address": json.dumps(SHIPPING_ADDRESS),
        },
        timeout=15,
    )
    assert resp.status_code == 200, resp.text
    cost = resp.json()
    assert cost["currencyCode"] == "USD"
    actual = int(cost.get("units", 0)) + int(cost.get("nanos", 0)) / 1e9
    assert round(actual, 2) == expected, (cost, quote.text)
    assert abs(actual - expected) < 1e-6, (cost, quote.text)


def test_load_generator_flags_removed():
    flags = read_flags()["flags"]
    assert "loadGeneratorTraffic" not in flags
    assert "loadGeneratorVUs" not in flags


def test_locust_load_generator_ui_is_served():
    ui = requests.get(f"{FRONTEND_PROXY_URL}/loadgen/", timeout=15)
    assert ui.status_code == 200
    assert "locust" in ui.text.lower()

    stats = requests.get(f"{FRONTEND_PROXY_URL}/loadgen/stats/requests", timeout=15)
    assert stats.status_code == 200
    storefront = {
        s["name"]: s["num_requests"]
        for s in stats.json()["stats"]
        if s["name"].startswith("/api/")
    }
    assert any(n > 0 for n in storefront.values()), storefront


def test_new_grafana_dashboards_are_provisioned():
    resp = requests.get(f"{FRONTEND_PROXY_URL}/grafana/api/search", timeout=15)
    assert resp.status_code == 200
    titles = {d["title"] for d in resp.json()}
    assert "Events by Name" in titles, titles
    assert "Self-Observability" in titles, titles
