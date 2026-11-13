# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

import datetime
import json
import os
import time
import uuid

import pytest
import requests

from conftest import FRONTEND_PROXY_URL, PROBE_PERSON, _raise_for_status, poll_until

SHIPPING_URL = os.environ.get("SHIPPING_URL", "http://shipping:50050")
QUOTE_URL = os.environ.get("QUOTE_URL", "http://quote:8090")

TELESCOPE = "66VCHSJNUP"
BINOCULARS = "2ZYFJ3GM2N"
LENS_CLEANING_KIT = "OLJCESPC7Z"

LOG_TIMEOUT = 90


def _money(m):
    return int(m.get("units", 0)) + int(m.get("nanos", 0)) / 1e9


def _add_to_cart(user_id, product_id, quantity=1):
    resp = requests.post(
        f"{FRONTEND_PROXY_URL}/api/cart",
        json={"userId": user_id, "item": {"productId": product_id, "quantity": quantity}},
        timeout=15,
    )
    _raise_for_status(resp, "add to cart")


def _empty_cart(user_id):
    requests.delete(
        f"{FRONTEND_PROXY_URL}/api/cart", json={"userId": user_id}, timeout=15
    )


def _checkout(user_id, currency="USD", card=None):
    person = dict(PROBE_PERSON, userId=user_id, userCurrency=currency)
    if card:
        person["creditCard"] = dict(PROBE_PERSON["creditCard"], **card)
    return requests.post(
        f"{FRONTEND_PROXY_URL}/api/checkout",
        params={"currencyCode": currency},
        json=person,
        timeout=30,
    )


def _shipping_preview(items, currency):
    resp = requests.get(
        f"{FRONTEND_PROXY_URL}/api/shipping",
        params={
            "itemList": json.dumps(items),
            "currencyCode": currency,
            "address": json.dumps(PROBE_PERSON["address"]),
        },
        timeout=15,
    )
    _raise_for_status(resp, "shipping preview")
    return resp.json()


def _place_order(product_ids, currency="USD"):
    user_id = str(uuid.uuid4())
    try:
        for product_id in product_ids:
            _add_to_cart(user_id, product_id)
        resp = _checkout(user_id, currency)
        _raise_for_status(resp, "checkout")
        return resp.json()
    finally:
        _empty_cart(user_id)


def _search_logs(query, size=50):
    resp = requests.post(
        f"{os.environ.get('OPENSEARCH_URL', 'http://opensearch:9200')}/otel-logs-*/_search",
        json={"size": size, "sort": [{"@timestamp": "desc"}], "query": query},
        timeout=15,
    )
    resp.raise_for_status()
    return [h["_source"] for h in resp.json()["hits"]["hits"]]


def test_checkout_success_returns_order():
    order = _place_order([TELESCOPE, BINOCULARS])

    assert order["orderId"]
    assert order["shippingTrackingId"]
    assert len(order["items"]) == 2
    assert {i["item"]["productId"] for i in order["items"]} == {TELESCOPE, BINOCULARS}
    assert all(i["item"]["product"]["name"] for i in order["items"])
    assert order["shippingCost"]["currencyCode"] == "USD"


def test_usd_order_shipping_equals_quote():
    preview = _shipping_preview([{"productId": TELESCOPE, "quantity": 1}], "USD")
    order = _place_order([TELESCOPE], "USD")

    assert order["shippingCost"]["currencyCode"] == "USD"
    assert _money(order["shippingCost"]) == pytest.approx(_money(preview), abs=0.005)
    assert _money(order["shippingCost"]) == pytest.approx(8.99, abs=0.005)


def test_non_usd_order_shipping_is_converted():
    usd = _shipping_preview([{"productId": TELESCOPE, "quantity": 1}], "USD")
    cad = _shipping_preview([{"productId": TELESCOPE, "quantity": 1}], "CAD")
    assert cad["currencyCode"] == "CAD"
    assert _money(cad) != pytest.approx(_money(usd), abs=0.005)

    order = _place_order([TELESCOPE], "CAD")

    assert order["shippingCost"]["currencyCode"] == "CAD"
    assert _money(order["shippingCost"]) == pytest.approx(_money(cad), abs=0.01)


def test_quote_counts_distinct_items():
    one = _shipping_preview([{"productId": TELESCOPE, "quantity": 1}], "USD")
    five = _shipping_preview([{"productId": TELESCOPE, "quantity": 5}], "USD")
    two_lines = _shipping_preview(
        [{"productId": TELESCOPE, "quantity": 1}, {"productId": BINOCULARS, "quantity": 1}],
        "USD",
    )

    assert _money(five) == pytest.approx(_money(one), abs=0.005)
    assert _money(one) == pytest.approx(8.99, abs=0.005)
    assert _money(two_lines) == pytest.approx(17.98, abs=0.005)


@pytest.mark.parametrize("count", [1, 2, 3, 4, 7, 29])
def test_shipping_quote_matches_quote_service_to_the_cent(count):
    quote = requests.post(f"{QUOTE_URL}/getquote", json={"numberOfItems": count}, timeout=10)
    _raise_for_status(quote, "quote service")
    expected_cents = round(float(quote.text) * 100)

    items = [{"product_id": f"item-{i}", "quantity": 1} for i in range(count)]
    resp = requests.post(f"{SHIPPING_URL}/get-quote", json={"items": items, "address": None}, timeout=10)
    _raise_for_status(resp, "shipping get-quote")
    cost = resp.json()["cost_usd"]

    assert cost["units"] * 100 + round(cost["nanos"] / 1e7) == expected_cents


def test_card_expiring_this_month_is_accepted():
    today = datetime.date.today()
    user_id = str(uuid.uuid4())
    try:
        _add_to_cart(user_id, TELESCOPE)
        resp = _checkout(
            user_id,
            card={"creditCardExpirationYear": today.year, "creditCardExpirationMonth": today.month},
        )
    finally:
        _empty_cart(user_id)

    assert resp.status_code == 200, resp.text
    assert resp.json()["orderId"]


def test_supported_currencies_include_every_rate():
    resp = requests.get(f"{FRONTEND_PROXY_URL}/api/currency", timeout=10)
    _raise_for_status(resp, "currency list")
    codes = resp.json()

    assert "USD" in codes
    assert "EUR" in codes
    assert len(codes) == len(set(codes)) == 33


def test_recommendations_exclude_requested_product():
    returned = set()
    for _ in range(20):
        resp = requests.get(
            f"{FRONTEND_PROXY_URL}/api/recommendations",
            params={"productIds": TELESCOPE, "sessionId": str(uuid.uuid4()), "currencyCode": "USD"},
            timeout=10,
        )
        _raise_for_status(resp, "recommendations")
        returned.update(p["id"] for p in resp.json())

    assert returned
    assert TELESCOPE not in returned


def test_email_sent_log_carries_order_id():
    order = _place_order([TELESCOPE])
    order_id = order["orderId"]

    def find():
        return _search_logs(
            {
                "bool": {
                    "must": [
                        {"match": {"resource.service.name": "checkout"}},
                        {"match_phrase": {"body": "order confirmation email sent"}},
                    ]
                }
            },
            size=200,
        )

    records = poll_until(
        lambda: [r for r in find() if r.get("attributes", {}).get("demo.order.id") == order_id],
        f"checkout 'order confirmation email sent' log for order {order_id}",
        timeout=LOG_TIMEOUT,
    )
    assert records[0]["resource"]["service.name"] == "checkout"


def test_cart_add_item_log_has_user_and_product():
    user_id = f"telemetry-cart-log-{uuid.uuid4()}"
    try:
        _add_to_cart(user_id, LENS_CLEANING_KIT)
    finally:
        _empty_cart(user_id)

    def find():
        return _search_logs(
            {
                "bool": {
                    "must": [
                        {"match": {"resource.service.name": "cart"}},
                        {"match_phrase": {"body": "AddItemAsync"}},
                    ],
                    "should": [
                        {"match_phrase": {"attributes.userId": user_id}},
                        {"match_phrase": {"attributes.productId": user_id}},
                    ],
                    "minimum_should_match": 1,
                }
            }
        )

    records = poll_until(find, f"cart AddItemAsync log for {user_id}", timeout=LOG_TIMEOUT)
    attributes = records[0]["attributes"]
    assert attributes["userId"] == user_id
    assert attributes["productId"] == LENS_CLEANING_KIT


def test_fraud_detection_logs_consumed_order_id():
    order = _place_order([TELESCOPE])

    def find():
        records = _search_logs(
            {
                "bool": {
                    "must": [
                        {"match": {"resource.service.name": "fraud-detection"}},
                        {"match_phrase": {"body": "Consumed record with orderId"}},
                    ]
                }
            },
            size=200,
        )
        return [
            r["body"]
            for r in records
            if order["orderId"] in r["body"] or order["shippingTrackingId"] in r["body"]
        ]

    bodies = poll_until(find, f"fraud-detection log for order {order['orderId']}", timeout=LOG_TIMEOUT)
    assert f"Consumed record with orderId: {order['orderId']}," in bodies[0]


def _order_trace_spans(jaeger_url, order_id):
    def find():
        resp = requests.get(
            f"{jaeger_url}/jaeger/ui/api/traces",
            params={
                "service": "checkout",
                "tags": json.dumps({"demo.order.id": order_id}),
                "lookback": "1h",
                "limit": 5,
            },
            timeout=15,
        )
        resp.raise_for_status()
        traces = resp.json().get("data") or []
        spans = [s for t in traces for s in t["spans"]]
        processes = {pid: p["serviceName"] for t in traces for pid, p in t["processes"].items()}
        if any(processes.get(s["processID"]) == "payment" for s in spans):
            return [(processes.get(s["processID"]), s) for s in spans]
        return None

    return poll_until(find, f"checkout trace with payment span for order {order_id}", timeout=LOG_TIMEOUT)


def _tag_keys(span):
    return {t["key"] for t in span.get("tags", [])}


# The collector replaces user.email with user.hash, so either key means the email was emitted.
PII_KEYS = {"user.email", "user.hash", "demo.payment.card_number", "demo.payment.card_cvv"}


def test_pii_not_emitted_by_default(jaeger_url):
    order = _place_order([TELESCOPE])
    spans = _order_trace_spans(jaeger_url, order["orderId"])

    place_order = [s for svc, s in spans if svc == "checkout" and "demo.order.id" in _tag_keys(s)]
    charge = [s for svc, s in spans if svc == "payment" and s["operationName"] == "charge"]
    assert place_order and charge
    assert not (_tag_keys(place_order[0]) & PII_KEYS)
    assert not (_tag_keys(charge[0]) & PII_KEYS)


FLAG_RELOAD_SECONDS = 5


def _set_flag(name, update):
    resp = requests.get(f"{FRONTEND_PROXY_URL}/feature/api/read", timeout=10)
    _raise_for_status(resp, "read flags")
    config = resp.json()
    update(config["flags"][name])
    resp = requests.post(f"{FRONTEND_PROXY_URL}/feature/api/write", json={"data": config}, timeout=10)
    _raise_for_status(resp, "write flags")
    time.sleep(FLAG_RELOAD_SECONDS)


def _default_variant(variant):
    return lambda flag: flag.update(defaultVariant=variant)


def _catalog_failure(variant):
    return lambda flag: flag["targeting"]["if"].__setitem__(1, variant)


@pytest.fixture
def payment_failure():
    _set_flag("paymentFailure", _default_variant("100%"))
    yield
    _set_flag("paymentFailure", _default_variant("off"))


@pytest.fixture
def catalog_failure():
    _set_flag("productCatalogFailure", _catalog_failure("on"))
    yield
    _set_flag("productCatalogFailure", _catalog_failure("off"))


@pytest.fixture
def raw_pii():
    _set_flag("emitRawPii", _default_variant("on"))
    yield
    _set_flag("emitRawPii", _default_variant("off"))


def test_payment_failure_is_answered_with_payment_failed(payment_failure):
    user_id = f"telemetry-payment-failure-{uuid.uuid4()}"
    try:
        _add_to_cart(user_id, "0PUK6V6EV0")
        resp = _checkout(user_id)
    finally:
        _empty_cart(user_id)

    assert resp.status_code == 422, resp.text
    body = resp.json()
    assert body.get("code") == "PAYMENT_FAILED"
    assert isinstance(body.get("error"), str) and body["error"]


def test_internal_failure_is_generic_500_without_code(catalog_failure):
    user_id = f"telemetry-catalog-failure-{uuid.uuid4()}"
    try:
        _add_to_cart(user_id, LENS_CLEANING_KIT)
        resp = _checkout(user_id)
    finally:
        _empty_cart(user_id)

    assert resp.status_code == 500, resp.text
    body = resp.json()
    assert "code" not in body
    assert isinstance(body.get("error"), str) and body["error"]


def test_pii_emitted_when_flag_on(jaeger_url, raw_pii):
    order = _place_order([TELESCOPE])
    spans = _order_trace_spans(jaeger_url, order["orderId"])

    place_order = [s for svc, s in spans if svc == "checkout" and "demo.order.id" in _tag_keys(s)]
    assert place_order
    tags = {t["key"]: t["value"] for t in place_order[0]["tags"]}
    assert "user.hash" in tags or "user.email" in tags
    assert tags["demo.payment.card_number"].endswith("0454")
