# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Attributes checkout and payment put on the spans of an order, as exported to Jaeger:
amounts with their cents, PII only behind emitRawPii and redacted by the collector,
synthetic requests tagged and not charged, and failed charges typed."""

import hashlib

import pytest

from demo_shop import (
    add_to_cart,
    empty_cart,
    find_order_trace,
    find_trace_by_user,
    flag,
    money_value,
    new_user_id,
    one_span,
    place_order,
)

PLACE_ORDER = "oteldemo.CheckoutService/PlaceOrder"
CHARGE_SERVER = "oteldemo.PaymentService/Charge"
CHARGE = "charge"
RAW_PII_KEYS = ("user.email", "user.hash", "demo.payment.card_number", "demo.payment.card_cvv")


@pytest.fixture
def user_id():
    user = new_user_id("order-spans")
    yield user
    empty_cart(user)


def order_total(order):
    items = sum(money_value(line["cost"]) * line["item"]["quantity"] for line in order["items"])
    return items + money_value(order["shippingCost"])


def checkout(user_id, items, **order_args):
    for product_id, quantity in items:
        add_to_cart(user_id, product_id, quantity)
    resp = place_order(user_id, **order_args)
    assert resp.status_code == 200, resp.text
    return resp.json()


def order_spans(order):
    trace = find_order_trace(order["orderId"])
    return trace, one_span(trace, "checkout", PLACE_ORDER), one_span(trace, "payment", CHARGE)


def test_place_order_span_keeps_cents_of_shipping_and_total(user_id):
    order = checkout(user_id, [("0PUK6V6EV0", 1)])
    _, place, _ = order_spans(order)

    assert place["tagmap"]["demo.shipping.amount"] == round(money_value(order["shippingCost"]), 2)
    assert place["tagmap"]["demo.order.amount"] == round(order_total(order), 2)


def test_place_order_span_rounds_total_carrying_conversion_residue(user_id):
    order = checkout(user_id, [("0PUK6V6EV0", 1), ("66VCHSJNUP", 3)])
    trace, place, _ = order_spans(order)
    charge_server = one_span(trace, "payment", CHARGE_SERVER)

    total = round(order_total(order), 2)
    assert place["tagmap"]["demo.order.amount"] == total
    assert place["tagmap"]["demo.order.amount"] == float(charge_server["tagmap"]["demo.payment.amount"])


def test_payment_amount_attribute_is_charged_total(user_id):
    order = checkout(user_id, [("0PUK6V6EV0", 1)])
    trace, _, _ = order_spans(order)
    charge_server = one_span(trace, "payment", CHARGE_SERVER)

    assert charge_server["tagmap"]["demo.payment.amount"] == f"{order_total(order):.2f}"


def test_failed_charge_spans_carry_error_type(user_id):
    with flag("paymentFailure", "100%"):
        add_to_cart(user_id)
        resp = place_order(user_id)
    assert resp.status_code == 422, resp.text

    trace = find_trace_by_user(user_id)
    for operation in (CHARGE_SERVER, CHARGE):
        span = one_span(trace, "payment", operation)
        assert span["tagmap"].get("otel.status_code") == "ERROR", operation
        assert span["tagmap"].get("error.type") == "Error", operation


def test_no_raw_pii_on_spans_with_emit_raw_pii_off(user_id):
    order = checkout(user_id, [("0PUK6V6EV0", 1)], email="pii-off@example.com")
    trace, _, _ = order_spans(order)

    for span in trace["spans"]:
        keys = {t["key"] for t in span["tags"]}
        assert not keys & set(RAW_PII_KEYS), (span["operationName"], keys & set(RAW_PII_KEYS))


def test_dashed_card_number_is_masked_and_email_hashed_with_emit_raw_pii_on(user_id):
    email = "redact@example.com"
    with flag("emitRawPii", "on"):
        order = checkout(user_id, [("0PUK6V6EV0", 1)], email=email, card_number="4432-8015-6152-0454", cvv=123)
    _, place, charge = order_spans(order)

    assert place["tagmap"]["user.hash"] == hashlib.sha256(email.encode()).hexdigest()
    for span in (place, charge):
        assert span["tagmap"]["demo.payment.card_number"] == "****-****-****-0454", span["operationName"]
        assert "demo.payment.card_cvv" not in span["tagmap"], span["operationName"]
        assert "user.email" not in span["tagmap"], span["operationName"]


@pytest.mark.parametrize("card_number", ["4432801561520454", "4432 8015 6152 0454"])
def test_undashed_card_number_is_not_exported_in_full_with_emit_raw_pii_on(user_id, card_number):
    with flag("emitRawPii", "on"):
        order = checkout(user_id, [("0PUK6V6EV0", 1)], card_number=card_number)
    trace, place, charge = order_spans(order)

    for span in trace["spans"]:
        for tag in span["tags"]:
            assert "4432801561520454" not in str(tag["value"]).replace(" ", ""), (span["operationName"], tag)
    for span in (place, charge):
        number = span["tagmap"].get("demo.payment.card_number")
        if number is not None:
            assert number.endswith("0454")
            assert not any(ch.isdigit() for ch in number[:-4]), (span["operationName"], number)


def test_synthetic_request_is_tagged_and_not_charged(user_id):
    synthetic = checkout(user_id, [("0PUK6V6EV0", 1)], headers={"baggage": "synthetic_request=true"})
    real_user = new_user_id("order-spans")
    try:
        real = checkout(real_user, [("0PUK6V6EV0", 1)])
    finally:
        empty_cart(real_user)

    _, place, charge = order_spans(synthetic)
    assert place["tagmap"].get("user_agent.synthetic.type") == "test"
    assert charge["tagmap"].get("user_agent.synthetic.type") == "test"
    assert charge["tagmap"].get("demo.payment.charged") is False

    _, place, charge = order_spans(real)
    assert "user_agent.synthetic.type" not in place["tagmap"]
    assert "user_agent.synthetic.type" not in charge["tagmap"]
    assert charge["tagmap"].get("demo.payment.charged") is True
