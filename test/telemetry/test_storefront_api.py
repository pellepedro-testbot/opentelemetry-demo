# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Storefront HTTP API checks for the checkout, shipping, payment, currency,
recommendation and order-processing paths, driven through the frontend proxy."""

import datetime
import json
import subprocess
import uuid

import requests

from conftest import FRONTEND_PROXY_URL, PROBE_PERSON, poll_until


ADDRESS = PROBE_PERSON["address"]
VALID_CARD = PROBE_PERSON["creditCard"]
SUPPORTED_CURRENCIES = [
    "EUR", "USD", "JPY", "BGN", "CZK", "DKK", "GBP", "HUF", "PLN", "RON", "SEK",
    "CHF", "ISK", "NOK", "HRK", "RUB", "TRY", "AUD", "BRL", "CAD", "CNY", "HKD",
    "IDR", "ILS", "INR", "KRW", "MXN", "MYR", "NZD", "PHP", "SGD", "THB", "ZAR",
]


def _amount(money):
    return money.get("units", 0) + money.get("nanos", 0) / 1e9


def _add_to_cart(user_id, product_id="0PUK6V6EV0", quantity=1):
    resp = requests.post(
        f"{FRONTEND_PROXY_URL}/api/cart",
        json={"userId": user_id, "item": {"productId": product_id, "quantity": quantity}},
        timeout=10,
    )
    assert resp.status_code == 200, resp.text


def _empty_cart(user_id):
    requests.delete(f"{FRONTEND_PROXY_URL}/api/cart", json={"userId": user_id}, timeout=10)


def _checkout(user_id, currency="USD", card=None):
    body = dict(PROBE_PERSON, userId=user_id, userCurrency=currency, creditCard=card or VALID_CARD)
    resp = None
    for _ in range(2):
        resp = requests.post(
            f"{FRONTEND_PROXY_URL}/api/checkout",
            params={"currencyCode": currency},
            json=body,
            timeout=30,
        )
        if resp.status_code != 504:
            break
    return resp


def _place_order(currency="USD", product_id="0PUK6V6EV0", quantity=1):
    user_id = f"api-test-{uuid.uuid4()}"
    _add_to_cart(user_id, product_id, quantity)
    resp = _checkout(user_id, currency)
    assert resp.status_code == 200, resp.text
    return resp.json()


def _shipping_quote(items, currency):
    resp = requests.get(
        f"{FRONTEND_PROXY_URL}/api/shipping",
        params={
            "itemList": json.dumps(items),
            "currencyCode": currency,
            "address": json.dumps(ADDRESS),
        },
        timeout=10,
    )
    assert resp.status_code == 200, resp.text
    return resp.json()


def _search_logs(opensearch_url, must):
    resp = requests.post(
        f"{opensearch_url}/otel-logs-*/_search",
        json={"size": 20, "query": {"bool": {"must": must}}},
        headers={"Content-Type": "application/json"},
        timeout=10,
    )
    resp.raise_for_status()
    return [hit["_source"] for hit in resp.json()["hits"]["hits"]]


def test_checkout_returns_order_with_items():
    order = _place_order("USD", "0PUK6V6EV0", 1)

    for field in ("orderId", "shippingTrackingId", "shippingCost", "shippingAddress"):
        assert order.get(field), f"order is missing {field}: {order}"
    assert len(order["items"]) == 1
    item = order["items"][0]["item"]
    assert item["productId"] == "0PUK6V6EV0"
    assert item["quantity"] == 1
    assert item["product"]["id"] == "0PUK6V6EV0"
    assert item["product"]["name"]


def test_checkout_shipping_cost_is_converted_to_shopper_currency():
    items = [{"productId": "0PUK6V6EV0", "quantity": 1}]
    quote_cad = _shipping_quote(items, "CAD")
    quote_usd = _shipping_quote(items, "USD")

    order = _place_order("CAD", "0PUK6V6EV0", 1)

    shipping = order["shippingCost"]
    assert shipping["currencyCode"] == "CAD"
    assert abs(_amount(shipping) - _amount(quote_cad)) <= 0.01, (
        f"order shipping {shipping} != CAD quote {quote_cad} (USD quote {quote_usd})"
    )


def test_checkout_shipping_cost_in_usd_matches_quote():
    quote_usd = _shipping_quote([{"productId": "0PUK6V6EV0", "quantity": 1}], "USD")

    order = _place_order("USD", "0PUK6V6EV0", 1)

    shipping = order["shippingCost"]
    assert shipping["currencyCode"] == "USD"
    assert abs(_amount(shipping) - _amount(quote_usd)) <= 0.01, f"{shipping} != {quote_usd}"


def test_shipping_quote_counts_every_unit():
    one = _shipping_quote([{"productId": "0PUK6V6EV0", "quantity": 1}], "USD")
    three_units = _shipping_quote([{"productId": "0PUK6V6EV0", "quantity": 3}], "USD")
    three_lines = _shipping_quote(
        [
            {"productId": "0PUK6V6EV0", "quantity": 1},
            {"productId": "OLJCESPC7Z", "quantity": 1},
            {"productId": "66VCHSJNUP", "quantity": 1},
        ],
        "USD",
    )

    assert _amount(three_units) > _amount(one), f"3 units {three_units} vs 1 unit {one}"
    assert _amount(three_units) == _amount(three_lines), f"3 units {three_units} vs 3 lines {three_lines}"


def test_card_expiring_this_month_is_accepted():
    today = datetime.date.today()
    user_id = f"api-test-{uuid.uuid4()}"
    _add_to_cart(user_id)
    card = dict(
        VALID_CARD,
        creditCardExpirationMonth=today.month,
        creditCardExpirationYear=today.year,
    )
    try:
        resp = _checkout(user_id, "USD", card)
        assert resp.status_code == 200, resp.text
        assert resp.json()["orderId"]
    finally:
        _empty_cart(user_id)


def test_expired_card_is_rejected_and_cart_kept():
    today = datetime.date.today()
    last_month = (today.replace(day=1) - datetime.timedelta(days=1))
    user_id = f"api-test-{uuid.uuid4()}"
    _add_to_cart(user_id)
    card = dict(
        VALID_CARD,
        creditCardExpirationMonth=last_month.month,
        creditCardExpirationYear=last_month.year,
    )
    try:
        resp = _checkout(user_id, "USD", card)
        assert resp.status_code == 500, resp.text
        assert resp.json() == {"error": "Failed to place order."}

        cart = requests.get(
            f"{FRONTEND_PROXY_URL}/api/cart",
            params={"sessionId": user_id, "currencyCode": "USD"},
            timeout=10,
        ).json()
        assert [i["productId"] for i in cart["items"]] == ["0PUK6V6EV0"]
    finally:
        _empty_cart(user_id)


def test_supported_currencies_include_every_rate():
    resp = requests.get(f"{FRONTEND_PROXY_URL}/api/currency", timeout=10)
    assert resp.status_code == 200
    codes = resp.json()

    missing = [c for c in SUPPORTED_CURRENCIES if c not in codes]
    assert missing == [], f"currencies with a rate missing from the list: {missing}"


def test_recommendations_exclude_requested_product():
    for _ in range(20):
        resp = requests.get(
            f"{FRONTEND_PROXY_URL}/api/recommendations",
            params={"productIds": "OLJCESPC7Z", "sessionId": "s1", "currencyCode": "USD"},
            timeout=10,
        )
        assert resp.status_code == 200
        ids = [p["id"] for p in resp.json()]
        assert "OLJCESPC7Z" not in ids, f"recommendations for OLJCESPC7Z include it: {ids}"


def test_order_confirmation_log_carries_order_id(opensearch_url):
    order_id = _place_order("USD")["orderId"]

    def check():
        hits = _search_logs(opensearch_url, [
            {"match_phrase": {"body": "order confirmation email sent"}},
            {"match_phrase": {"attributes.demo.order.id": order_id}},
        ])
        return [h for h in hits if h["attributes"].get("demo.order.id") == order_id]

    poll_until(check, f"checkout log 'order confirmation email sent' with demo.order.id={order_id}", timeout=60)


def test_cart_add_item_log_has_user_and_product_fields(opensearch_url):
    user_id = f"log-user-{uuid.uuid4()}"
    _add_to_cart(user_id, "OLJCESPC7Z", 1)
    try:
        def check():
            return _search_logs(opensearch_url, [
                {"match_phrase": {"eventName": "cart.add_item"}},
                {"multi_match": {"query": user_id, "type": "phrase", "fields": ["attributes.userId", "attributes.productId"]}},
            ])

        hits = poll_until(check, f"cart.add_item log for {user_id}", timeout=60)
        attrs = hits[0]["attributes"]
        assert attrs.get("userId") == user_id, attrs
        assert attrs.get("productId") == "OLJCESPC7Z", attrs
        assert attrs.get("quantity") == 1, attrs
    finally:
        _empty_cart(user_id)


def test_accounting_stores_shipping_cost_units_and_nanos():
    order = _place_order("USD")
    order_id = order["orderId"]
    shipping = order["shippingCost"]
    assert shipping.get("nanos", 0) != 0, f"pick an order whose shipping has cents: {shipping}"

    def check():
        out = subprocess.run(
            [
                "docker", "exec", "astronomy-db", "psql", "-U", "postgres", "-d", "astronomy_db", "-tAc",
                "SELECT shipping_cost_units, shipping_cost_nanos FROM accounting.shipping "
                f"WHERE order_id = '{order_id}'",
            ],
            capture_output=True, text=True, check=True,
        ).stdout.strip()
        return out

    row = poll_until(check, f"accounting.shipping row for order {order_id}", timeout=60)
    assert row == f"{shipping['units']}|{shipping['nanos']}", f"stored {row}, order shippingCost {shipping}"


def test_fraud_detection_logs_order_id(opensearch_url):
    order = _place_order("USD")
    order_id = order["orderId"]

    def check():
        return _search_logs(opensearch_url, [
            {"match_phrase": {"body": "Consumed record with orderId"}},
            {"match_phrase": {"body": order["shippingTrackingId"]}},
        ]) or _search_logs(opensearch_url, [
            {"match_phrase": {"body": f"Consumed record with orderId: {order_id}"}},
        ])

    hits = poll_until(check, f"fraud-detection log for order {order_id}", timeout=60)
    bodies = [h["body"] for h in hits]
    assert any(b.startswith(f"Consumed record with orderId: {order_id},") for b in bodies), bodies
