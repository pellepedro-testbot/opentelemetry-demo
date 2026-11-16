# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""The emitRawPii flag: checkout and payment add raw PII span attributes only
while it is on, and the collector masks, hashes or drops them before export."""

import hashlib

import pytest

from observability import find_span, has_span, jaeger_trace
from storefront import ORDER_EMAIL, place_order, set_flag

PLACE_ORDER = "oteldemo.CheckoutService/PlaceOrder"


def order_spans(emit_raw_pii):
    if emit_raw_pii:
        set_flag("emitRawPii", "on")
    try:
        user_id, resp, trace_id = place_order(product_id="66VCHSJNUP")
    finally:
        if emit_raw_pii:
            set_flag("emitRawPii", "off")
    assert resp.status_code == 200, resp.text
    spans = jaeger_trace(
        trace_id,
        require=lambda s: has_span("checkout", PLACE_ORDER)(s) and has_span("payment", "charge")(s),
    )
    return {
        "user_id": user_id,
        "place_order": find_span(spans, "checkout", PLACE_ORDER)["tags"],
        "charge": find_span(spans, "payment", "charge")["tags"],
        "spans": spans,
    }


@pytest.fixture(scope="module")
def order_with_pii_off():
    return order_spans(emit_raw_pii=False)


@pytest.fixture(scope="module")
def order_with_pii_on():
    return order_spans(emit_raw_pii=True)


@pytest.fixture(scope="module")
def order_after_pii_switched_off(order_with_pii_on):
    return order_spans(emit_raw_pii=False)


def test_pii_off_place_order_has_no_user_email(order_with_pii_off):
    assert "user.email" not in order_with_pii_off["place_order"]


def test_pii_off_place_order_has_no_card_cvv(order_with_pii_off):
    assert "demo.payment.card_cvv" not in order_with_pii_off["place_order"]


def test_pii_off_place_order_keeps_selected_currency(order_with_pii_off):
    assert order_with_pii_off["place_order"].get("demo.user_context.selected_currency") == "USD"


def test_pii_off_place_order_has_no_redaction_ignored_count(order_with_pii_off):
    assert "redaction.ignored.count" not in order_with_pii_off["place_order"]


def test_pii_off_place_order_has_no_card_number(order_with_pii_off):
    assert "demo.payment.card_number" not in order_with_pii_off["place_order"]


def test_pii_off_place_order_keeps_user_id(order_with_pii_off):
    assert order_with_pii_off["place_order"].get("user.id") == order_with_pii_off["user_id"]


def test_pii_off_place_order_has_no_user_hash(order_with_pii_off):
    assert "user.hash" not in order_with_pii_off["place_order"]


def test_pii_on_place_order_has_no_card_cvv(order_with_pii_on):
    assert "demo.payment.card_cvv" not in order_with_pii_on["place_order"]


def test_pii_on_place_order_user_hash_is_sha256_of_email(order_with_pii_on):
    expected = hashlib.sha256(ORDER_EMAIL.encode()).hexdigest()
    assert order_with_pii_on["place_order"].get("user.hash") == expected


def test_pii_on_place_order_card_number_masked_to_last_four(order_with_pii_on):
    assert order_with_pii_on["place_order"].get("demo.payment.card_number") == "****-****-****-0454"


def test_pii_on_place_order_has_no_user_email(order_with_pii_on):
    assert "user.email" not in order_with_pii_on["place_order"]


def test_pii_on_place_order_has_redaction_ignored_count_one(order_with_pii_on):
    assert order_with_pii_on["place_order"].get("redaction.ignored.count") == 1


def test_pii_switched_off_again_drops_card_number_from_next_order(
    order_with_pii_on, order_after_pii_switched_off
):
    assert order_with_pii_on["place_order"].get("demo.payment.card_number") == "****-****-****-0454"
    after = order_after_pii_switched_off["place_order"]
    assert "demo.payment.card_number" not in after
    assert "user.hash" not in after
    assert "redaction.ignored.count" not in after


def test_pii_off_charge_has_no_card_cvv(order_with_pii_off):
    assert "demo.payment.card_cvv" not in order_with_pii_off["charge"]


def test_pii_off_charge_keeps_card_valid(order_with_pii_off):
    assert order_with_pii_off["charge"].get("demo.payment.card_valid") is True


def test_pii_off_charge_has_no_card_number(order_with_pii_off):
    assert "demo.payment.card_number" not in order_with_pii_off["charge"]


def test_pii_off_charge_keeps_card_type(order_with_pii_off):
    assert order_with_pii_off["charge"].get("demo.payment.card_type") == "visa"


def test_pii_off_charge_keeps_loyalty_level(order_with_pii_off):
    assert order_with_pii_off["charge"].get("demo.user_context.loyalty_level")


def test_pii_on_charge_card_number_masked_to_last_four(order_with_pii_on):
    assert order_with_pii_on["charge"].get("demo.payment.card_number") == "****-****-****-0454"


def test_pii_on_charge_has_no_card_cvv(order_with_pii_on):
    assert "demo.payment.card_cvv" not in order_with_pii_on["charge"]
