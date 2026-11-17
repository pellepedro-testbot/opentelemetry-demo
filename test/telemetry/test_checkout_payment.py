# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""
What the checkout and payment services record for an order placed through the
storefront: span attributes (amounts, PII handling with the emitRawPii flag,
synthetic-request baggage) and their log records on stdout and in OpenSearch.
"""

import hashlib

import pytest

from demo_stack import (
    confirmation_sent_records,
    VALID_CARD,
    container_json_lines,
    find_spans,
    flag,
    has_span,
    place_order,
    search_logs,
    search_spans,
    trace_spans,
    utc_now,
    wait_for_logs,
)

PLACE_ORDER = "oteldemo.CheckoutService/PlaceOrder"
CHARGE_SERVER = "oteldemo.PaymentService/Charge"


def _order_spans(**kwargs):
    since = utc_now()
    resp, trace_id, user_id, body = place_order(**kwargs)

    def complete(spans):
        return find_spans(spans, "checkout", PLACE_ORDER) and find_spans(spans, "payment", "charge")

    spans = trace_spans(trace_id, until=complete)
    return {"resp": resp, "trace_id": trace_id, "user_id": user_id, "body": body, "spans": spans, "since": since}


def _span(order, service, name):
    spans = find_spans(order["spans"], service, name)
    assert spans, f"no {service} span {name} in trace {order['trace_id']}"
    return spans[0]["tags"]


@pytest.fixture(scope="module")
def comet_order():
    """One The Comet Book (0.99 USD) with emitRawPii at its default 'off'."""
    order = _order_spans(product_id="HQTGWGPNH4")
    assert order["resp"].status_code == 200, order["resp"].text[:300]
    return order


@pytest.fixture(scope="module")
def raw_pii_order():
    with flag("emitRawPii", "on"):
        order = _order_spans()
    assert order["resp"].status_code == 200, order["resp"].text[:300]
    return order


@pytest.fixture(scope="module")
def invalid_card_order():
    return _order_spans(card_number="1234")


# --- order amounts ----------------------------------------------------------


def test_place_order_span_shipping_amount_keeps_cents(comet_order):
    assert _span(comet_order, "checkout", PLACE_ORDER)["demo.shipping.amount"] == 8.99


def test_place_order_span_order_amount(comet_order):
    assert _span(comet_order, "checkout", PLACE_ORDER)["demo.order.amount"] == 9.98


def test_prepare_span_shipping_amount_keeps_cents(comet_order):
    assert _span(comet_order, "checkout", "prepareOrderItemsAndShippingQuoteFromCart")["demo.shipping.amount"] == 8.99


def test_order_placed_log_amounts(comet_order):
    records = wait_for_logs("order placed", trace_id=comet_order["trace_id"], service="checkout")
    attributes = records[0]["attributes"]
    assert attributes["demo.order.amount"] == 9.98
    assert attributes["demo.shipping.amount"] == 8.99


def test_charge_amount_has_two_decimals(comet_order):
    assert float(_span(comet_order, "payment", CHARGE_SERVER)["demo.payment.amount"]) == 9.98


def test_charge_amount_keeps_leading_zero_cents():
    # 49 x 0.99 + 49 x 8.99 shipping = 489.02 USD: nanos 20000000, below 10^8.
    order = _order_spans(product_id="HQTGWGPNH4", quantity=49)
    assert order["resp"].status_code == 200, order["resp"].text[:300]
    assert float(_span(order, "payment", CHARGE_SERVER)["demo.payment.amount"]) == 489.02


# --- emitRawPii off ---------------------------------------------------------


def test_place_order_span_has_no_email_by_default(comet_order):
    assert "user.email" not in _span(comet_order, "checkout", PLACE_ORDER)


def test_place_order_span_has_no_cvv_by_default(comet_order):
    assert "demo.payment.card_cvv" not in _span(comet_order, "checkout", PLACE_ORDER)


def test_place_order_span_keeps_selected_currency(comet_order):
    assert _span(comet_order, "checkout", PLACE_ORDER)["demo.user_context.selected_currency"] == "USD"


def test_place_order_span_has_no_redaction_count_by_default(comet_order):
    assert "redaction.ignored.count" not in _span(comet_order, "checkout", PLACE_ORDER)


def test_place_order_span_has_no_card_number_by_default(comet_order):
    assert "demo.payment.card_number" not in _span(comet_order, "checkout", PLACE_ORDER)


def test_place_order_span_keeps_user_id(comet_order):
    assert _span(comet_order, "checkout", PLACE_ORDER)["user.id"] == comet_order["user_id"]


def test_place_order_span_has_no_user_hash_by_default(comet_order):
    assert "user.hash" not in _span(comet_order, "checkout", PLACE_ORDER)


def test_charge_span_has_no_cvv_by_default(comet_order):
    assert "demo.payment.card_cvv" not in _span(comet_order, "payment", "charge")


def test_charge_span_keeps_card_valid(comet_order):
    assert _span(comet_order, "payment", "charge")["demo.payment.card_valid"] is True


def test_charge_span_has_no_card_number_by_default(comet_order):
    assert "demo.payment.card_number" not in _span(comet_order, "payment", "charge")


def test_charge_span_keeps_card_type(comet_order):
    assert _span(comet_order, "payment", "charge")["demo.payment.card_type"] == "visa"


def test_charge_span_keeps_loyalty_level(comet_order):
    assert _span(comet_order, "payment", "charge").get("demo.user_context.loyalty_level")


# --- emitRawPii on ----------------------------------------------------------


def test_raw_pii_place_order_span_has_no_cvv(raw_pii_order):
    assert "demo.payment.card_cvv" not in _span(raw_pii_order, "checkout", PLACE_ORDER)


def test_raw_pii_place_order_span_hashes_email(raw_pii_order):
    expected = hashlib.sha256(raw_pii_order["body"]["email"].encode()).hexdigest()
    assert _span(raw_pii_order, "checkout", PLACE_ORDER)["user.hash"] == expected


def test_raw_pii_place_order_span_masks_card_number(raw_pii_order):
    assert _span(raw_pii_order, "checkout", PLACE_ORDER)["demo.payment.card_number"] == "****-****-****-0454"


def test_raw_pii_place_order_span_has_no_email(raw_pii_order):
    assert "user.email" not in _span(raw_pii_order, "checkout", PLACE_ORDER)


def test_raw_pii_place_order_span_counts_ignored_key(raw_pii_order):
    assert _span(raw_pii_order, "checkout", PLACE_ORDER)["redaction.ignored.count"] == 1


def test_raw_pii_charge_span_masks_card_number(raw_pii_order):
    assert _span(raw_pii_order, "payment", "charge")["demo.payment.card_number"] == "****-****-****-0454"


def test_raw_pii_charge_span_has_no_cvv(raw_pii_order):
    assert "demo.payment.card_cvv" not in _span(raw_pii_order, "payment", "charge")


def test_turning_raw_pii_off_drops_card_number(raw_pii_order):
    order = _order_spans()
    assert "demo.payment.card_number" not in _span(order, "checkout", PLACE_ORDER)


def test_undashed_card_number_is_not_exported_in_full():
    with flag("emitRawPii", "on"):
        order = _order_spans(card_number="4432801561520454")
    assert order["resp"].status_code == 200, order["resp"].text[:300]
    for span in order["spans"]:
        for key, value in span["tags"].items():
            assert "4432801561520454" not in str(value), f"{span['service']} {span['name']} {key}={value}"


# --- synthetic requests -----------------------------------------------------


def test_synthetic_baggage_marks_place_order_span():
    order = _order_spans(baggage="synthetic_request=true")
    assert _span(order, "checkout", PLACE_ORDER)["user_agent.synthetic.type"] == "test"


@pytest.mark.parametrize("baggage", [None, "synthetic_request=false"], ids=["no-baggage", "baggage-false"])
def test_non_synthetic_order_has_no_synthetic_type(baggage):
    order = _order_spans(baggage=baggage)
    assert "user_agent.synthetic.type" not in _span(order, "checkout", PLACE_ORDER)


def test_synthetic_baggage_marks_charge_span():
    order = _order_spans(baggage="synthetic_request=true")
    assert _span(order, "payment", "charge")["user_agent.synthetic.type"] == "test"


# --- payment logs and errors ------------------------------------------------


def _transaction_lines(order):
    return [
        line for line in container_json_lines("payment", order["since"], order["trace_id"])
        if line.get("msg") == "Transaction complete."
    ]


def test_payment_logs_json_transaction_line(comet_order):
    lines = _transaction_lines(comet_order)
    assert len(lines) == 1
    assert lines[0]["service.name"] == "payment"


def test_transaction_log_reaches_opensearch(comet_order):
    records = wait_for_logs("Transaction complete.", trace_id=comet_order["trace_id"])
    assert records[0]["resource"]["service.name"] == "payment"


def test_one_transaction_record_per_charge(comet_order):
    transaction_id = _transaction_lines(comet_order)[0]["transactionId"]
    wait_for_logs("Transaction complete.", trace_id=comet_order["trace_id"])
    records = search_logs("Transaction complete.", service="payment",
                          extra=[{"match_phrase": {"attributes.transactionId": transaction_id}}])
    assert len(records) == 1


def test_transaction_line_has_last_four_only(comet_order):
    line = _transaction_lines(comet_order)[0]
    assert line["lastFourDigits"] == "0454"
    digits = VALID_CARD.replace("-", "")
    assert digits not in str(line) and VALID_CARD not in str(line)


def test_payment_logs_come_from_pino_instrumentation(comet_order):
    records = wait_for_logs("Transaction complete.", trace_id=comet_order["trace_id"])
    assert records[0]["instrumentationScope"]["name"] == "@opentelemetry/instrumentation-pino"


def test_payment_exports_charge_server_span(comet_order):
    assert find_spans(comet_order["spans"], "payment", CHARGE_SERVER)
    assert _span(comet_order, "payment", CHARGE_SERVER)["span.kind"] == "server"


def test_invalid_card_charge_span_has_error_type(invalid_card_order):
    assert _span(invalid_card_order, "payment", "charge")["error.type"] == "Error"


def test_invalid_card_charge_server_span_has_error(invalid_card_order):
    spans = trace_spans(invalid_card_order["trace_id"], until=has_span("payment", CHARGE_SERVER))
    tags = find_spans(spans, "payment", CHARGE_SERVER)[0]["tags"]
    assert tags["otel.status_code"] == "ERROR"
    assert tags["error.type"] == "Error"


# --- email and health checks ------------------------------------------------


def test_checkout_logs_confirmation_sent_with_order_id(comet_order):
    order_id = comet_order["resp"].json()["orderId"]
    records = confirmation_sent_records(order_id)
    assert len(records) == 1


def test_confirmation_sent_log_is_info(comet_order):
    order_id = comet_order["resp"].json()["orderId"]
    records = confirmation_sent_records(order_id)
    assert records[0]["severity"]["text"] == "INFO"


def test_email_confirmation_log_has_event_name(comet_order):
    records = wait_for_logs("Order confirmation email sent", trace_id=comet_order["trace_id"], service="email")
    assert records[0]["eventName"] == "email.confirmation_sent"


def test_checkout_health_checks_are_not_traced():
    assert search_spans("checkout", "grpc.health.v1.Health/Check", lookback="1h") == []
