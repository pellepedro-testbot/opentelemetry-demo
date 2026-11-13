# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Functional checks of the storefront API and the order pipeline behind it,
driven through the frontend proxy like the warmup probe in conftest.py."""

import datetime
import json
import os
import subprocess
import time
import uuid

import pytest
import requests

from conftest import FRONTEND_PROXY_URL, PROBE_PERSON, poll_until

SHIPPING_URL = os.environ.get("SHIPPING_URL", "http://shipping:50050")
POSTGRES_CONTAINER = os.environ.get("POSTGRES_HOST", "astronomy-db")

FLAGD_READ_URL = f"{FRONTEND_PROXY_URL}/feature/api/read"
FLAGD_WRITE_URL = f"{FRONTEND_PROXY_URL}/feature/api/write"
# flagd reloads its flag file a moment after the flagd-ui writes it.
FLAG_PROPAGATION_SECONDS = 5

PRODUCT_A = "0PUK6V6EV0"
PRODUCT_B = "OLJCESPC7Z"
PRODUCT_C = "66VCHSJNUP"
PRODUCT_D = "1YMWWN1N4O"

SHIPPING_ADDRESS = {
    "street_address": "1600 Amphitheatre Parkway",
    "city": "Mountain View",
    "state": "CA",
    "country": "USA",
    "zip_code": "94043",
}


def _card(month, year):
    return {
        "creditCardNumber": "4432801561520454",
        "creditCardCvv": 672,
        "creditCardExpirationMonth": month,
        "creditCardExpirationYear": year,
    }


def _months_from_now(delta):
    today = datetime.date.today()
    index = today.year * 12 + (today.month - 1) + delta
    return index % 12 + 1, index // 12


def _add_to_cart(user_id, product_id, quantity=1):
    resp = requests.post(
        f"{FRONTEND_PROXY_URL}/api/cart",
        json={"userId": user_id, "item": {"productId": product_id, "quantity": quantity}},
        timeout=30,
    )
    resp.raise_for_status()


def _get_cart(user_id):
    resp = requests.get(
        f"{FRONTEND_PROXY_URL}/api/cart", params={"sessionId": user_id, "currencyCode": "USD"}, timeout=30
    )
    resp.raise_for_status()
    return resp.json()


def _place_order(user_id, currency="USD", card=None):
    body = dict(PROBE_PERSON, userId=user_id, userCurrency=currency)
    if card is not None:
        body["creditCard"] = card
    return requests.post(
        f"{FRONTEND_PROXY_URL}/api/checkout",
        params={"currencyCode": currency},
        json=body,
        timeout=30,
    )


def _new_order(product_id=PRODUCT_A, currency="USD", card=None):
    user_id = str(uuid.uuid4())
    _add_to_cart(user_id, product_id)
    return user_id, _place_order(user_id, currency, card)


def _shipping_quote(items, currency):
    address = PROBE_PERSON["address"]
    resp = requests.get(
        f"{FRONTEND_PROXY_URL}/api/shipping",
        params={
            "itemList": json.dumps([{"productId": p, "quantity": q} for p, q in items]),
            "currencyCode": currency,
            "address": json.dumps(address),
        },
        timeout=30,
    )
    resp.raise_for_status()
    return resp.json()


def _get_quote(items):
    resp = requests.post(
        f"{SHIPPING_URL}/get-quote",
        json={
            "items": [{"product_id": p, "quantity": q} for p, q in items],
            "address": SHIPPING_ADDRESS,
        },
        timeout=30,
    )
    resp.raise_for_status()
    return resp.json()["cost_usd"]


def _write_flags(mutate):
    flags = requests.get(FLAGD_READ_URL, timeout=10).json()
    mutate(flags["flags"])
    requests.post(FLAGD_WRITE_URL, json={"data": flags}, timeout=10).raise_for_status()
    time.sleep(FLAG_PROPAGATION_SECONDS)


def _set_default_variant(name, variant):
    def mutate(flags):
        flags[name]["defaultVariant"] = variant

    _write_flags(mutate)


def _set_product_catalog_failure(variant):
    def mutate(flags):
        flags["productCatalogFailure"]["targeting"]["if"][1] = variant

    _write_flags(mutate)


@pytest.fixture
def payment_failure_flag():
    _set_default_variant("paymentFailure", "100%")
    try:
        yield
    finally:
        _set_default_variant("paymentFailure", "off")


@pytest.fixture
def product_catalog_failure_flag():
    _set_product_catalog_failure("on")
    try:
        yield
    finally:
        _set_product_catalog_failure("off")


def _psql(query):
    out = subprocess.run(
        [
            "docker", "exec", POSTGRES_CONTAINER,
            "psql", "-U", "astronomy_user", "-d", "astronomy_db", "-At", "-F", "|", "-c", query,
        ],
        check=True,
        capture_output=True,
        text=True,
        timeout=30,
    )
    return [line.split("|") for line in out.stdout.splitlines() if line]


def _opensearch_hits(opensearch_url, query):
    resp = requests.post(
        f"{opensearch_url}/otel-logs-*/_search",
        json={"query": query, "size": 20},
        timeout=10,
    )
    resp.raise_for_status()
    return [h["_source"] for h in resp.json()["hits"]["hits"]]


def test_catalog_lists_ten_products():
    resp = requests.get(f"{FRONTEND_PROXY_URL}/api/products", params={"currencyCode": "USD"}, timeout=30)
    assert resp.status_code == 200
    assert len(resp.json()) == 10


def test_payment_decline_answers_422_payment_failed(payment_failure_flag):
    user_id = str(uuid.uuid4())
    _add_to_cart(user_id, PRODUCT_A)
    month, year = _months_from_now(12)
    resp = _place_order(user_id, card=_card(1, year))

    assert resp.status_code == 422, resp.text
    body = resp.json()
    assert body.get("code") == "PAYMENT_FAILED"
    assert isinstance(body.get("error"), str) and body["error"]
    assert [i["productId"] for i in _get_cart(user_id)["items"]] == [PRODUCT_A]


def test_internal_failure_answers_generic_500(product_catalog_failure_flag):
    _, resp = _new_order(PRODUCT_B)

    assert resp.status_code == 500, resp.text
    body = resp.json()
    assert body == {"error": "Failed to place order."}
    assert "code" not in body


def test_expired_card_answers_422_payment_failed():
    year = datetime.date.today().year - 1
    _, resp = _new_order(card=_card(1, year))

    assert resp.status_code == 422, resp.text
    body = resp.json()
    assert body.get("code") == "PAYMENT_FAILED"
    assert isinstance(body.get("error"), str) and body["error"]


def test_usd_order_shipping_equals_shipping_quote():
    quote = _shipping_quote([(PRODUCT_A, 1)], "USD")
    _, resp = _new_order(PRODUCT_A, "USD")

    assert resp.status_code == 200, resp.text
    shipping = resp.json()["shippingCost"]
    assert shipping["currencyCode"] == "USD"
    assert (shipping["units"], shipping["nanos"]) == (quote["units"], quote["nanos"])


@pytest.mark.parametrize("currency,minor_unit_nanos", [("JPY", 10_000_000), ("GBP", 10_000_000)])
def test_non_usd_order_shipping_is_converted_quote(currency, minor_unit_nanos):
    quote = _shipping_quote([(PRODUCT_A, 1)], currency)
    _, resp = _new_order(PRODUCT_A, currency)

    assert resp.status_code == 200, resp.text
    shipping = resp.json()["shippingCost"]
    assert shipping["currencyCode"] == currency
    shipping_nanos = int(shipping["units"]) * 1_000_000_000 + int(shipping["nanos"])
    quote_nanos = int(quote["units"]) * 1_000_000_000 + int(quote["nanos"])
    assert abs(shipping_nanos - quote_nanos) <= minor_unit_nanos, (shipping, quote)


def test_get_quote_charges_quote_price_per_distinct_item():
    assert _get_quote([(PRODUCT_A, 1)]) == {"currency_code": "USD", "units": 8, "nanos": 990000000}
    assert _get_quote([(PRODUCT_A, 1), (PRODUCT_B, 1)]) == {
        "currency_code": "USD", "units": 17, "nanos": 980000000,
    }
    assert _get_quote([(PRODUCT_A, 1), (PRODUCT_B, 1), (PRODUCT_C, 1)]) == {
        "currency_code": "USD", "units": 26, "nanos": 970000000,
    }
    assert _get_quote([(PRODUCT_A, 1), (PRODUCT_B, 1), (PRODUCT_C, 1), (PRODUCT_D, 1)]) == {
        "currency_code": "USD", "units": 35, "nanos": 960000000,
    }


def test_get_quote_counts_a_line_once_whatever_its_quantity():
    assert _get_quote([(PRODUCT_A, 3)]) == _get_quote([(PRODUCT_A, 1)])


def test_get_quote_counts_each_distinct_product():
    one = _get_quote([(PRODUCT_A, 1)])
    two = _get_quote([(PRODUCT_A, 1), (PRODUCT_B, 1)])
    assert two == {"currency_code": "USD", "units": 17, "nanos": 980000000}
    assert (two["units"], two["nanos"]) > (one["units"], one["nanos"])


def test_card_expiring_this_month_is_accepted():
    month, year = _months_from_now(0)
    _, resp = _new_order(card=_card(month, year))

    assert resp.status_code == 200, resp.text
    assert resp.json()["orderId"]


def test_supported_currencies_include_every_rate():
    resp = requests.get(f"{FRONTEND_PROXY_URL}/api/currency", timeout=30)
    assert resp.status_code == 200
    codes = resp.json()
    assert len(codes) == len(set(codes))
    assert {"EUR", "USD", "JPY", "GBP"} <= set(codes)
    assert len(codes) == 33


def _recommendations(product_ids):
    resp = requests.get(
        f"{FRONTEND_PROXY_URL}/api/recommendations",
        params={"productIds": product_ids, "currencyCode": "USD"},
        timeout=30,
    )
    resp.raise_for_status()
    return [p["id"] for p in resp.json()]


@pytest.mark.parametrize(
    "requested", [[PRODUCT_B], [PRODUCT_A, PRODUCT_B, PRODUCT_C]], ids=["one-product", "three-products"]
)
def test_recommendations_exclude_requested_products(requested):
    returned = set()
    for _ in range(20):
        returned.update(_recommendations(requested))
    assert returned, "no recommendations returned"
    assert not returned & set(requested)


@pytest.fixture(scope="module")
def placed_order():
    _, resp = _new_order(PRODUCT_A, "USD")
    resp.raise_for_status()
    return resp.json()


def test_accounting_stores_full_shipping_cost(placed_order):
    order_id = placed_order["orderId"]
    rows = poll_until(
        lambda: _psql(
            "select shipping_cost_units, shipping_cost_nanos from accounting.shipping "
            f"where order_id = '{order_id}'"
        ),
        f"accounting.shipping row for order {order_id}",
        timeout=90,
    )
    shipping = placed_order["shippingCost"]
    assert int(shipping["nanos"]) != 0
    assert rows == [[str(shipping["units"]), str(shipping["nanos"])]]


def test_accounting_stores_order_item_costs(placed_order):
    order_id = placed_order["orderId"]
    rows = poll_until(
        lambda: _psql(
            "select product_id, item_cost_units, item_cost_nanos from accounting.orderitem "
            f"where order_id = '{order_id}'"
        ),
        f"accounting.orderitem rows for order {order_id}",
        timeout=90,
    )
    expected = sorted(
        [i["item"]["productId"], str(i["cost"]["units"]), str(i["cost"]["nanos"])] for i in placed_order["items"]
    )
    assert sorted(rows) == expected


def test_fraud_detection_logs_consumed_order_id(placed_order, opensearch_url):
    order_id = placed_order["orderId"]
    tracking_id = placed_order["shippingTrackingId"]
    hits = poll_until(
        lambda: _opensearch_hits(
            opensearch_url,
            {
                "bool": {
                    "must": [
                        {"match_phrase": {"resource.service.name": "fraud-detection"}},
                        {"match_phrase": {"body": "Consumed record with orderId"}},
                    ],
                    "should": [
                        {"match_phrase": {"body": order_id}},
                        {"match_phrase": {"body": tracking_id}},
                    ],
                    "minimum_should_match": 1,
                }
            },
        ),
        f"fraud-detection log for order {order_id} (tracking id {tracking_id})",
        timeout=120,
    )
    bodies = [h["body"] for h in hits]
    assert any(f"Consumed record with orderId: {order_id}," in b for b in bodies), bodies


def test_order_confirmation_log_carries_order_id(placed_order, opensearch_url):
    order_id = placed_order["orderId"]
    hits = poll_until(
        lambda: _opensearch_hits(
            opensearch_url, {"match_phrase": {"attributes.demo.order.id": order_id}}
        ),
        f"logs carrying demo.order.id {order_id}",
        timeout=120,
    )
    confirmation = [
        h for h in hits
        if h.get("body") == "order confirmation email sent"
        and h.get("instrumentationScope", {}).get("name") == "checkout"
    ]
    assert confirmation, hits
    assert confirmation[0]["attributes"]["demo.order.id"] == order_id
