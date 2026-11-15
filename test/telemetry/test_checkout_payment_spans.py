# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Span attributes checkout, payment and currency export for a placed order."""

import datetime
import hashlib

import pytest
import requests

from conftest import poll_until
from flags import default_variant
from orders import find_spans, has_spans, order_total, place_order, span_of

PLACE_ORDER = "oteldemo.CheckoutService/PlaceOrder"
PAYMENT_CHARGE = "oteldemo.PaymentService/Charge"
FULL_CARD_DIGITS = "4432801561520454"
RAW_PII_KEYS = ("user.email", "user.hash", "demo.payment.card_number", "demo.payment.card_cvv")

# checkout and payment read emitRawPii per request through their flagd providers,
# which pick up a file change within a few seconds; leave headroom.
EMIT_RAW_PII_SETTLE_SECONDS = 15


def _order_spans(user_id):
    return find_spans(user_id, has_spans(("checkout", PLACE_ORDER), ("payment", "charge")))


@pytest.fixture(scope="module")
def raw_pii_on():
    with default_variant("emitRawPii", "on", settle=EMIT_RAW_PII_SETTLE_SECONDS):
        yield


def test_place_order_shipping_amount_keeps_cents():
    user_id, resp = place_order()
    assert resp.status_code == 200, resp.text
    shipping = resp.json()["shippingCost"]
    expected = round(int(shipping.get("units", 0)) + int(shipping.get("nanos", 0)) / 1e9, 2)

    place_order_span = span_of(_order_spans(user_id), "checkout", PLACE_ORDER)
    assert place_order_span["tags"]["demo.shipping.amount"] == pytest.approx(expected, abs=1e-9)


def test_raw_pii_not_emitted_by_default():
    user_id, resp = place_order(email="pii-default@example.com")
    assert resp.status_code == 200, resp.text
    spans = _order_spans(user_id)
    for service, operation in (("checkout", PLACE_ORDER), ("payment", "charge")):
        tags = span_of(spans, service, operation)["tags"]
        for key in RAW_PII_KEYS:
            assert key not in tags, f"{service} {operation} carries {key}={tags[key]!r}"


def test_raw_pii_dashed_card_masked_and_email_hashed(raw_pii_on):
    email = "pii-test@example.com"
    user_id, resp = place_order(card_number="4432-8015-6152-0454", email=email)
    assert resp.status_code == 200, resp.text
    spans = _order_spans(user_id)

    place_order_tags = span_of(spans, "checkout", PLACE_ORDER)["tags"]
    assert "user.email" not in place_order_tags
    assert place_order_tags.get("user.hash") == hashlib.sha256(email.encode()).hexdigest()

    for service, operation in (("checkout", PLACE_ORDER), ("payment", "charge")):
        tags = span_of(spans, service, operation)["tags"]
        assert "demo.payment.card_cvv" not in tags, f"{service} {operation}"
        assert tags.get("demo.payment.card_number") == "****-****-****-0454", f"{service} {operation}"


@pytest.mark.parametrize(
    "card_number", ["4432801561520454", "4432 8015 6152 0454"], ids=["undashed", "spaced"]
)
def test_raw_pii_undashed_card_number_not_exported_in_full(raw_pii_on, card_number):
    user_id, _ = place_order(card_number=card_number)
    spans = _order_spans(user_id)
    for service, operation in (("checkout", PLACE_ORDER), ("payment", "charge")):
        tags = span_of(spans, service, operation)["tags"]
        exported = str(tags.get("demo.payment.card_number", ""))
        digits = "".join(ch for ch in exported if ch.isdigit())
        assert FULL_CARD_DIGITS not in digits, f"{service} {operation} exported {exported!r}"
        assert digits in ("", "0454"), f"{service} {operation} exported {exported!r}"


def test_synthetic_baggage_marks_spans_and_skips_charge():
    synthetic_user, synthetic = place_order(headers={"baggage": "synthetic_request=true"})
    assert synthetic.status_code == 200, synthetic.text
    spans = _order_spans(synthetic_user)
    assert span_of(spans, "checkout", PLACE_ORDER)["tags"].get("user_agent.synthetic.type") == "test"
    charge = span_of(spans, "payment", "charge")["tags"]
    assert charge.get("user_agent.synthetic.type") == "test"
    assert charge.get("demo.payment.charged") is False

    regular_user, regular = place_order()
    assert regular.status_code == 200, regular.text
    spans = _order_spans(regular_user)
    assert "user_agent.synthetic.type" not in span_of(spans, "checkout", PLACE_ORDER)["tags"]
    charge = span_of(spans, "payment", "charge")["tags"]
    assert "user_agent.synthetic.type" not in charge
    assert charge.get("demo.payment.charged") is True


def test_declined_charge_spans_carry_error_type():
    user_id, resp = place_order(expiration_year=datetime.date.today().year - 1)
    assert resp.status_code == 422, resp.text
    spans = find_spans(user_id, has_spans(("payment", "charge"), ("payment", PAYMENT_CHARGE)))
    for operation in ("charge", PAYMENT_CHARGE):
        tags = span_of(spans, "payment", operation)["tags"]
        assert tags.get("error.type") == "Error", f"payment {operation}: {tags}"
        assert tags.get("otel.status_code") == "ERROR", f"payment {operation}: {tags}"


def test_order_amount_matches_payment_amount():
    # LS4PSXUNUM's converted price ends in .xx9999999, where truncating and
    # rounding the nanos to cents give different totals.
    user_id, resp = place_order(product_id="LS4PSXUNUM")
    assert resp.status_code == 200, resp.text
    expected = round(order_total(resp.json()), 2)

    spans = find_spans(
        user_id, has_spans(("checkout", PLACE_ORDER), ("payment", PAYMENT_CHARGE))
    )
    payment_amount = float(span_of(spans, "payment", PAYMENT_CHARGE)["tags"]["demo.payment.amount"])
    order_amount = span_of(spans, "checkout", PLACE_ORDER)["tags"]["demo.order.amount"]
    assert payment_amount == pytest.approx(expected, abs=1e-9)
    assert order_amount == pytest.approx(payment_amount, abs=1e-9)


def test_currency_rpc_spans_use_current_semconv():
    user_id, resp = place_order()
    assert resp.status_code == 200, resp.text
    spans = find_spans(user_id, has_spans(("currency", "oteldemo.CurrencyService/Convert")))
    tags = span_of(spans, "currency", "oteldemo.CurrencyService/Convert")["tags"]
    assert tags.get("rpc.system.name") == "grpc", tags
    assert tags.get("rpc.method") == "oteldemo.CurrencyService/Convert", tags
    assert tags.get("rpc.response.status_code") == "OK", tags
    assert "rpc.system" not in tags and "rpc.service" not in tags, tags


@pytest.mark.parametrize("service", ["checkout", "product-catalog"])
def test_health_checks_produce_no_server_spans(jaeger_url, service):
    resp = requests.get(f"{jaeger_url}/jaeger/ui/api/services/{service}/operations", timeout=10)
    resp.raise_for_status()
    operations = resp.json().get("data") or []
    assert operations, f"no operations recorded for {service}"
    assert "grpc.health.v1.Health/Check" not in operations, operations


def test_order_confirmation_email_log_has_event_name(opensearch_url):
    _, resp = place_order()
    assert resp.status_code == 200, resp.text
    order_id = resp.json()["orderId"]

    def find_log():
        r = requests.post(
            f"{opensearch_url}/otel-logs*/_search",
            json={
                "size": 1,
                "query": {
                    "bool": {
                        "must": [
                            {"match_phrase": {"resource.service.name": "email"}},
                            {"match_phrase": {"attributes.demo.order.id": order_id}},
                            {"match_phrase": {"body": "Order confirmation email sent"}},
                        ]
                    }
                },
            },
            timeout=15,
        )
        r.raise_for_status()
        hits = r.json()["hits"]["hits"]
        return hits[0]["_source"] if hits else None

    record = poll_until(find_log, f"email confirmation log for order {order_id}", timeout=120)
    assert record.get("eventName") == "email.confirmation_sent", record
