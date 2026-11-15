# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

import pytest
import requests

import demo_flags
from conftest import poll_until
from storefront import (
    AMEX_CARD_NUMBER,
    TELESCOPE_ID,
    VISA_CARD_NUMBER,
    add_to_cart,
    credit_card,
    new_user_id,
    place_order,
    trace_headers,
)

PII_KEYS = ("user.email", "user.hash", "demo.payment.card_number", "demo.payment.card_cvv")


@pytest.fixture
def raw_pii_on():
    demo_flags.set_default_variant("emitRawPii", "on")
    yield
    demo_flags.set_default_variant("emitRawPii", "off")


def _span_tags(jaeger_url, trace_id, service, operation):
    """Tags of one span of a trace, waiting until Jaeger has indexed it."""

    def find():
        resp = requests.get(f"{jaeger_url}/jaeger/ui/api/traces/{trace_id}", timeout=10)
        if resp.status_code != 200:
            return None
        for trace in resp.json().get("data") or []:
            processes = trace["processes"]
            for span in trace["spans"]:
                if (
                    processes[span["processID"]]["serviceName"] == service
                    and span["operationName"] == operation
                ):
                    return {tag["key"]: tag["value"] for tag in span["tags"]}
        return None

    return poll_until(find, f"{service} span '{operation}' in trace {trace_id}", timeout=90)


def _place_traced_order(prefix, card=None, **extra_headers):
    user_id = new_user_id(prefix)
    add_to_cart(user_id)
    trace_id, headers = trace_headers(**extra_headers)
    resp = place_order(user_id, card=card, headers=headers, email=f"{prefix}@example.com")
    return trace_id, resp


def _opensearch_log(opensearch_url, service, must):
    def find():
        resp = requests.post(
            f"{opensearch_url}/otel-logs-*/_search",
            json={
                "size": 5,
                "query": {"bool": {"must": [{"match": {"resource.service.name": service}}, *must]}},
            },
            timeout=10,
        )
        if resp.status_code != 200:
            return None
        hits = resp.json()["hits"]["hits"]
        return [hit["_source"] for hit in hits] or None

    return poll_until(find, f"{service} log matching {must}", timeout=120)


def test_pii_attributes_absent_by_default(jaeger_url):
    assert demo_flags.read_flags()["flags"]["emitRawPii"]["defaultVariant"] == "off"
    trace_id, resp = _place_traced_order("pii-default")
    assert resp.status_code == 200, resp.text

    place_order_tags = _span_tags(jaeger_url, trace_id, "checkout", "oteldemo.CheckoutService/PlaceOrder")
    charge_tags = _span_tags(jaeger_url, trace_id, "payment", "charge")

    for key in PII_KEYS:
        assert key not in place_order_tags, f"PlaceOrder span carries {key}"
        assert key not in charge_tags, f"charge span carries {key}"


def test_pii_redacted_before_export_when_emitted(jaeger_url, raw_pii_on):
    trace_id, resp = _place_traced_order("pii-on", card=credit_card(VISA_CARD_NUMBER))
    assert resp.status_code == 200, resp.text

    place_order_tags = _span_tags(jaeger_url, trace_id, "checkout", "oteldemo.CheckoutService/PlaceOrder")
    charge_tags = _span_tags(jaeger_url, trace_id, "payment", "charge")

    assert place_order_tags.get("user.hash")
    assert "user.email" not in place_order_tags
    for tags in (place_order_tags, charge_tags):
        assert "demo.payment.card_cvv" not in tags
        assert tags.get("demo.payment.card_number") == "****-****-****-0454"


def test_synthetic_requests_are_annotated_and_not_charged(jaeger_url):
    trace_id, resp = _place_traced_order("synthetic", baggage="synthetic_request=true")
    assert resp.status_code == 200, resp.text

    place_order_tags = _span_tags(jaeger_url, trace_id, "checkout", "oteldemo.CheckoutService/PlaceOrder")
    charge_tags = _span_tags(jaeger_url, trace_id, "payment", "charge")

    assert place_order_tags.get("user_agent.synthetic.type") == "test"
    assert charge_tags.get("user_agent.synthetic.type") == "test"
    assert charge_tags.get("demo.payment.charged") is False


def test_payment_error_spans_carry_error_type(jaeger_url):
    trace_id, resp = _place_traced_order("payment-error", card=credit_card(AMEX_CARD_NUMBER))
    assert resp.status_code != 200

    charge_tags = _span_tags(jaeger_url, trace_id, "payment", "charge")
    server_tags = _span_tags(jaeger_url, trace_id, "payment", "oteldemo.PaymentService/Charge")

    assert charge_tags.get("error.type") == "Error"
    assert server_tags.get("error.type") == "Error"


def test_fraud_detection_logs_consumed_order_by_order_id(opensearch_url):
    user_id = new_user_id("fraud-log")
    add_to_cart(user_id)
    resp = place_order(user_id)
    assert resp.status_code == 200, resp.text
    order_id = resp.json()["orderId"]

    logs = _opensearch_log(
        opensearch_url, "fraud-detection", [{"match_phrase": {"body": f"Consumed record with orderId: {order_id}"}}]
    )

    assert any(f"orderId: {order_id}," in log["body"] for log in logs)


def test_cart_add_item_log_names_user_and_product(opensearch_url):
    user_id = new_user_id("log-user")
    add_to_cart(user_id, TELESCOPE_ID)

    logs = _opensearch_log(
        opensearch_url,
        "cart",
        [{"match": {"eventName": "cart.add_item"}}, {"multi_match": {"query": user_id, "type": "phrase", "fields": ["attributes.userId", "attributes.productId"]}}],
    )

    record = logs[0]["attributes"]
    assert record.get("userId") == user_id
    assert record.get("productId") == TELESCOPE_ID
