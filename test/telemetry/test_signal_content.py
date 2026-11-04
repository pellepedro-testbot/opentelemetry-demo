# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Checks what checkout, payment, currency, fraud-detection and cart put in
their spans and log records, not only that they emit them."""

import json
import uuid

import requests

from conftest import FRONTEND_PROXY_URL, PROBE_PERSON, poll_until

AMEX = "378282246310005"
TELESCOPE_ID = "66VCHSJNUP"
RAW_PII_KEYS = ("user.email", "demo.payment.card_number", "demo.payment.card_cvv")


def _place_order(product_id=TELESCOPE_ID, card_number=None):
    user_id = str(uuid.uuid4())
    resp = requests.post(
        f"{FRONTEND_PROXY_URL}/api/cart",
        json={"item": {"productId": product_id, "quantity": 1}, "userId": user_id},
        timeout=10,
    )
    resp.raise_for_status()
    person = json.loads(json.dumps(PROBE_PERSON))
    person["userId"] = user_id
    if card_number:
        person["creditCard"]["creditCardNumber"] = card_number
    order = requests.post(
        f"{FRONTEND_PROXY_URL}/api/checkout?currencyCode=USD", json=person, timeout=15
    )
    return user_id, order


def _empty_cart(user_id):
    requests.delete(f"{FRONTEND_PROXY_URL}/api/cart", json={"userId": user_id}, timeout=10)


def _tags(span):
    return {tag["key"]: tag["value"] for tag in span.get("tags", [])}


def _trace_of_user(jaeger_url, user_id, required_service):
    """The PlaceOrder trace of a user, once it holds a span of required_service."""

    def check():
        resp = requests.get(
            f"{jaeger_url}/jaeger/ui/api/traces",
            params={
                "service": "checkout",
                "tags": json.dumps({"user.id": user_id}),
                "lookback": "15m",
                "limit": 5,
            },
            timeout=10,
        )
        resp.raise_for_status()
        for trace in resp.json().get("data") or []:
            spans = [
                (trace["processes"][span["processID"]]["serviceName"], span)
                for span in trace["spans"]
            ]
            if any(service == required_service for service, _ in spans):
                return spans
        return None

    return poll_until(check, f"checkout trace of user {user_id} with {required_service} spans")


def _opensearch_logs(opensearch_url, where, fields):
    ppl = f"source=otel-logs-* | where {where} | fields {', '.join(fields)} | head 20"
    resp = requests.post(
        f"{opensearch_url}/_plugins/_ppl",
        json={"query": ppl},
        headers={"Content-Type": "application/json"},
        timeout=10,
    )
    resp.raise_for_status()
    return resp.json().get("datarows", [])


def test_failed_charge_spans_carry_error_type(jaeger_url):
    user_id, order = _place_order(card_number=AMEX)
    _empty_cart(user_id)
    assert order.status_code != 200, order.text

    spans = _trace_of_user(jaeger_url, user_id, "payment")
    charge = [_tags(s) for svc, s in spans if svc == "payment" and s["operationName"] == "charge"]
    assert charge, "no payment charge span in the trace"
    assert charge[0].get("otel.status_code") == "ERROR", charge[0]
    assert charge[0].get("error.type"), charge[0]

    server = [
        _tags(s)
        for svc, s in spans
        if svc == "payment" and s["operationName"] == "oteldemo.PaymentService/Charge"
    ]
    assert server, "no payment Charge server span in the trace"
    assert server[0].get("otel.status_code") == "ERROR" or server[0].get("error") is True, server[0]


def test_no_raw_pii_while_emit_raw_pii_is_off(jaeger_url):
    flags = requests.get(f"{FRONTEND_PROXY_URL}/feature/api/read", timeout=10).json()["flags"]
    assert flags["emitRawPii"]["defaultVariant"] == "off"

    user_id, order = _place_order()
    assert order.status_code == 200, order.text

    spans = _trace_of_user(jaeger_url, user_id, "payment")
    leaked = [
        (svc, s["operationName"], key)
        for svc, s in spans
        if svc in ("checkout", "payment")
        for key in _tags(s)
        if key in RAW_PII_KEYS
    ]
    assert leaked == []


def test_payment_amount_is_units_plus_nanos(jaeger_url):
    user_id, order = _place_order()
    assert order.status_code == 200, order.text
    body = order.json()
    money = [item["cost"] for item in body["items"]] + [body["shippingCost"]]
    total = sum(int(m.get("units", 0)) + m.get("nanos", 0) / 1e9 for m in money)

    spans = _trace_of_user(jaeger_url, user_id, "payment")
    server = [
        _tags(s)
        for svc, s in spans
        if svc == "payment" and s["operationName"] == "oteldemo.PaymentService/Charge"
    ]
    assert server, "no payment Charge server span in the trace"
    assert abs(float(server[0]["demo.payment.amount"]) - round(total, 2)) < 0.005, (
        server[0]["demo.payment.amount"],
        round(total, 2),
    )


def test_currency_convert_span_uses_current_rpc_conventions(jaeger_url):
    resp = requests.get(
        f"{FRONTEND_PROXY_URL}/api/products", params={"currencyCode": "EUR"}, timeout=10
    )
    assert resp.status_code == 200

    def check():
        traces = requests.get(
            f"{jaeger_url}/jaeger/ui/api/traces",
            params={
                "service": "currency",
                "operation": "oteldemo.CurrencyService/Convert",
                "tags": json.dumps({"demo.exchange.to": "EUR"}),
                "lookback": "5m",
                "limit": 5,
            },
            timeout=10,
        ).json().get("data") or []
        return [
            _tags(span)
            for trace in traces
            for span in trace["spans"]
            if trace["processes"][span["processID"]]["serviceName"] == "currency"
            and span["operationName"] == "oteldemo.CurrencyService/Convert"
        ]

    span = poll_until(check, "currency Convert span to EUR")[0]
    assert span.get("rpc.system.name") == "grpc", span
    assert span.get("rpc.method") == "oteldemo.CurrencyService/Convert", span
    assert span.get("rpc.response.status_code") == "OK", span
    assert not {"rpc.system", "rpc.service", "rpc.grpc.status_code"} & span.keys(), span


def test_fraud_detection_logs_consumed_order_id(opensearch_url):
    _, order = _place_order()
    assert order.status_code == 200, order.text
    body = order.json()

    def check():
        return _opensearch_logs(
            opensearch_url,
            "resource.service.name = 'fraud-detection' and "
            f"(like(body, '%{body['orderId']}%') or like(body, '%{body['shippingTrackingId']}%'))",
            ["body"],
        )

    rows = poll_until(check, f"fraud-detection log for order {body['orderId']}")
    assert any(f"Consumed record with orderId: {body['orderId']}" in row[0] for row in rows), rows


def test_cart_add_item_log_fields(opensearch_url):
    user_id = f"probe-user-{uuid.uuid4()}"
    resp = requests.post(
        f"{FRONTEND_PROXY_URL}/api/cart",
        json={"item": {"productId": TELESCOPE_ID, "quantity": 1}, "userId": user_id},
        timeout=10,
    )
    _empty_cart(user_id)
    resp.raise_for_status()

    def check():
        return _opensearch_logs(
            opensearch_url,
            "resource.service.name = 'cart' and like(body, 'AddItemAsync called%') and "
            f"(attributes.userId = '{user_id}' or attributes.productId = '{user_id}')",
            ["attributes.userId", "attributes.productId"],
        )

    rows = poll_until(check, f"cart AddItem log for {user_id}")
    assert rows[0] == [user_id, TELESCOPE_ID], rows
