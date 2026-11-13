# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Payment and user PII on checkout/payment spans: emitted only with the
emitRawPii flag on, and always redacted by the collector before export."""

import hashlib
import json
import uuid

import pytest

from conftest import poll_until
from storefront import flag_variant, order_with_items, spans_of, trace_with_tag

PII_KEYS = ("user.email", "user.hash", "demo.payment.card_number", "demo.payment.card_cvv")
PLACE_ORDER = "oteldemo.CheckoutService/PlaceOrder"


def _order_trace(card_number, email):
    _, resp = order_with_items([("0PUK6V6EV0", 1)], card_number=card_number, email=email)
    assert resp.status_code == 200, resp.text
    order_id = resp.json()["orderId"]

    def find():
        trace = trace_with_tag("checkout", "demo.order.id", order_id)
        if trace and spans_of(trace, "checkout", PLACE_ORDER) and spans_of(trace, "payment", "charge"):
            return trace
        return None

    return poll_until(find, f"trace of order {order_id} with PlaceOrder and charge spans")


def _unique_email():
    return f"pii-{uuid.uuid4()}@example.com"


@pytest.fixture
def raw_pii_on():
    with flag_variant("emitRawPii", "on"):
        yield


def test_no_pii_attributes_with_flag_off():
    trace = _order_trace("4432-8015-6152-0454", _unique_email())
    for service, operation in (("checkout", PLACE_ORDER), ("payment", "charge")):
        for _, tags in spans_of(trace, service, operation):
            for key in PII_KEYS:
                assert key not in tags, f"{service} {operation} carries {key}"


def test_dashed_card_number_and_email_are_redacted(raw_pii_on):
    email = _unique_email()
    trace = _order_trace("4432-8015-6152-0454", email)
    for span in trace["spans"]:
        keys = {tag["key"] for tag in span["tags"]}
        assert "demo.payment.card_cvv" not in keys
        assert "user.email" not in keys
    [(_, place_order_tags)] = spans_of(trace, "checkout", PLACE_ORDER)
    assert place_order_tags.get("user.hash") == hashlib.sha256(email.encode()).hexdigest()
    card_numbers = [
        tags["demo.payment.card_number"]
        for service, operation in (("checkout", PLACE_ORDER), ("payment", "charge"))
        for _, tags in spans_of(trace, service, operation)
        if "demo.payment.card_number" in tags
    ]
    assert card_numbers, "no span carries demo.payment.card_number with emitRawPii on"
    assert set(card_numbers) == {"****-****-****-0454"}


@pytest.mark.parametrize("card_number", ["4432801561520454", "4432 8015 6152 0454"])
def test_card_number_without_dashes_is_masked(raw_pii_on, card_number):
    trace = _order_trace(card_number, _unique_email())
    exported = json.dumps(trace)
    assert "4432801561520454" not in exported
    assert "4432 8015 6152 0454" not in exported
    card_numbers = [
        str(tags["demo.payment.card_number"])
        for service, operation in (("checkout", PLACE_ORDER), ("payment", "charge"))
        for _, tags in spans_of(trace, service, operation)
        if "demo.payment.card_number" in tags
    ]
    assert card_numbers, "no span carries demo.payment.card_number with emitRawPii on"
    for value in card_numbers:
        assert value.endswith("0454"), value
        assert not any(ch.isdigit() for ch in value[:-4]), value
    for span in trace["spans"]:
        assert "demo.payment.card_cvv" not in {tag["key"] for tag in span["tags"]}
