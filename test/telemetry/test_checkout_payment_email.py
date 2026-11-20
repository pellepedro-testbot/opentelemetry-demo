# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Checkout, payment and email: what an order leaves behind in the HTTP answer,
in Jaeger, in OpenSearch, in Prometheus and in the containers themselves."""

import hashlib
import json
import time

import pytest

import shop
from conftest import poll_until

PLACE_ORDER = "oteldemo.CheckoutService/PlaceOrder"
PAYMENT_CHARGE_SERVER = "oteldemo.PaymentService/Charge"
PII_EMAIL = "pii@example.com"


def _order(headers=None, **kwargs):
    """Place a one-flashlight order and return its answer and its full trace."""
    user_id, resp = shop.place_order(headers=headers, **kwargs)
    assert resp.status_code == 200, resp.text
    body = resp.json()
    trace = shop.wait_for_order_trace(body["orderId"])
    trace = _wait_for_service_spans(trace, [("payment", "charge"), ("email", "send_email")])
    return {"user": user_id, "answer": body, "trace": trace}


def _wait_for_service_spans(trace, wanted, timeout=60):
    def complete():
        current = shop.jaeger_trace(trace["traceID"])
        if current and all(shop.spans(current, svc, name) for svc, name in wanted):
            return current
        return None

    return poll_until(complete, f"spans {wanted} in trace {trace['traceID']}", timeout=timeout)


def _span(order, service, name):
    found = shop.spans(order["trace"], service, name)
    assert found, f"no {service} span {name} in trace {order['trace']['traceID']}"
    return found[0]


def _place_order_tags(order):
    return shop.tags_of(_span(order, "checkout", PLACE_ORDER))


def _charge_tags(order):
    return shop.tags_of(_span(order, "payment", "charge"))


def _failed_order_trace(user_id, wanted_span=("payment", "charge")):
    """A checkout that did not complete has no order id: find its trace by user.id."""
    trace, _ = shop.wait_for_span("checkout", {"user.id": user_id}, *wanted_span,
                                  operation=PLACE_ORDER, lookback="15m", settle=5)
    return trace


def _log_records(query, service, predicate=lambda d: True, timeout=60, description=None):
    return shop.os_wait(
        query,
        lambda d: shop.resource_service(d) == service and predicate(d),
        description or f"{service} log record for {query}",
        timeout=timeout,
        size=100,
    )


# --- one ordinary order, emitRawPii at its default 'off' ------------------------


@pytest.fixture(scope="module")
def order():
    since = shop.utc_now()
    placed = _order()
    placed["since"] = since
    return placed


def test_place_order_span_has_no_user_email_by_default(order):
    assert "user.email" not in _place_order_tags(order)


def test_place_order_span_has_no_card_cvv_by_default(order):
    assert "demo.payment.card_cvv" not in _place_order_tags(order)


def test_place_order_span_keeps_selected_currency_by_default(order):
    assert _place_order_tags(order).get("demo.user_context.selected_currency") == "USD"


def test_place_order_span_has_no_redaction_ignored_count_by_default(order):
    assert "redaction.ignored.count" not in _place_order_tags(order)


def test_place_order_span_has_no_card_number_by_default(order):
    assert "demo.payment.card_number" not in _place_order_tags(order)


def test_place_order_span_keeps_user_id_by_default(order):
    assert _place_order_tags(order).get("user.id") == order["user"]


def test_place_order_span_has_no_user_hash_without_email(order):
    assert "user.hash" not in _place_order_tags(order)


def test_charge_span_has_no_card_cvv_by_default(order):
    assert "demo.payment.card_cvv" not in _charge_tags(order)


def test_charge_span_keeps_card_valid_by_default(order):
    assert _charge_tags(order).get("demo.payment.card_valid") is True


def test_charge_span_has_no_card_number_by_default(order):
    assert "demo.payment.card_number" not in _charge_tags(order)


def test_charge_span_keeps_card_type_by_default(order):
    assert _charge_tags(order).get("demo.payment.card_type") == "visa"


def test_charge_span_keeps_loyalty_level_by_default(order):
    assert _charge_tags(order).get("demo.user_context.loyalty_level") in (
        "platinum", "gold", "silver", "bronze",
    )


def test_payment_exports_charge_server_span(order):
    server = _span(order, "payment", PAYMENT_CHARGE_SERVER)
    assert shop.tags_of(server).get("span.kind") == "server"


def test_place_order_without_synthetic_baggage_has_no_synthetic_type(order):
    assert "user_agent.synthetic.type" not in _place_order_tags(order)


def test_place_order_span_carries_order_and_tracking_ids(order):
    tags = _place_order_tags(order)
    assert tags.get("demo.order.id") == order["answer"]["orderId"]
    assert tags.get("demo.shipping.tracking.id") == order["answer"]["shippingTrackingId"]
    assert "app.order.id" not in tags
    assert "app.shipping.tracking.id" not in tags


def test_place_order_span_has_charged_and_shipped_events(order):
    events = dict(shop.events_of(_span(order, "checkout", PLACE_ORDER)))
    assert "charged" in events and "shipped" in events
    assert events["charged"].get("demo.payment.transaction.id")
    assert "app.payment.transaction.id" not in events["charged"]
    assert events["shipped"].get("demo.shipping.tracking.id") == order["answer"]["shippingTrackingId"]
    assert "app.shipping.tracking.id" not in events["shipped"]


def test_place_order_span_amounts_for_one_red_flashlight(order):
    tags = _place_order_tags(order)
    assert tags.get("demo.shipping.amount") == 8.99
    assert tags.get("demo.order.amount") == 66.07
    assert tags.get("demo.order.items.count") == 1


def test_prepare_order_span_for_one_item(order):
    tags = shop.tags_of(_span(order, "checkout", "prepareOrderItemsAndShippingQuoteFromCart"))
    assert tags.get("demo.shipping.amount") == 8.99
    assert tags.get("demo.cart.items.count") == 1
    assert tags.get("demo.order.items.count") == 1


def test_prepare_order_span_counts_cart_quantity_and_distinct_products():
    user_id = shop.new_user()
    shop.add_to_cart(user_id, shop.TARGETED_PRODUCT, 2)
    shop.add_to_cart(user_id, shop.OTHER_PRODUCT, 1)
    resp = shop.checkout(user_id)
    assert resp.status_code == 200, resp.text
    trace = shop.wait_for_order_trace(resp.json()["orderId"])
    tags = shop.tags_of(shop.spans(trace, "checkout", "prepareOrderItemsAndShippingQuoteFromCart")[0])
    assert tags.get("demo.cart.items.count") == 3
    assert tags.get("demo.order.items.count") == 2


def test_charge_span_without_synthetic_baggage_is_charged(order):
    tags = _charge_tags(order)
    assert tags.get("demo.payment.charged") is True
    assert "app.payment.charged" not in tags
    assert "user_agent.synthetic.type" not in tags


def test_payment_server_span_amount_for_one_red_flashlight(order):
    tags = shop.tags_of(_span(order, "payment", PAYMENT_CHARGE_SERVER))
    assert tags.get("demo.payment.amount") == "66.07"
    assert "app.payment.amount" not in tags


def test_email_spans_carry_order_id(order):
    for name in ("POST /send_order_confirmation", "send_email"):
        tags = shop.tags_of(_span(order, "email", name))
        assert tags.get("demo.order.id") == order["answer"]["orderId"], name
        assert "app.order.id" not in tags, name


def _checkout_email_sent_records(order_id):
    return _log_records(
        shop.match_phrase("body", "order confirmation email sent"),
        "checkout",
        lambda d: d.get("body") == "order confirmation email sent"
        and shop.attr(d, "demo.order.id") == order_id,
        description=f"checkout 'order confirmation email sent' for {order_id}",
    )


def test_checkout_logs_confirmation_email_sent_with_order_id(order):
    records = _checkout_email_sent_records(order["answer"]["orderId"])
    assert shop.attr(records[0], "demo.order.id") == order["answer"]["orderId"]


def test_checkout_confirmation_email_sent_record_is_info(order):
    records = _checkout_email_sent_records(order["answer"]["orderId"])
    assert records[0]["severity"]["text"] == "INFO"


def test_checkout_order_placed_log_record(order):
    order_id = order["answer"]["orderId"]
    record = _log_records(
        shop.match_phrase("body", "order placed"),
        "checkout",
        lambda d: d.get("body") == "order placed" and shop.attr(d, "demo.order.id") == order_id,
        description=f"checkout 'order placed' for {order_id}",
    )[0]
    assert shop.attr(record, "demo.order.id") == order_id
    assert shop.attr(record, "demo.shipping.tracking.id") == order["answer"]["shippingTrackingId"]
    assert shop.attr(record, "demo.shipping.amount") == 8.99
    assert shop.attr(record, "app.order.id") is None


def _email_sent_record(order_id):
    return _log_records(
        shop.match_phrase("body", "Order confirmation email sent"),
        "email",
        lambda d: shop.attr(d, "demo.order.id") == order_id,
        description=f"email 'Order confirmation email sent' for {order_id}",
    )[0]


def test_email_confirmation_log_record_carries_order_id(order):
    record = _email_sent_record(order["answer"]["orderId"])
    assert record["body"] == "Order confirmation email sent"
    assert shop.attr(record, "demo.order.id") == order["answer"]["orderId"]
    assert shop.attr(record, "app.order.id") is None


def test_email_confirmation_log_record_event_name(order):
    record = _email_sent_record(order["answer"]["orderId"])
    assert record.get("eventName") == "email.confirmation_sent"


def _payment_stdout_line(order):
    trace_id = order["trace"]["traceID"]

    def find():
        return [
            line
            for line in shop.container_json_logs("payment", order["since"])
            if line.get("msg") == "Transaction complete." and line.get("trace_id") == trace_id
        ]

    return poll_until(find, f"payment stdout 'Transaction complete.' for trace {trace_id}", timeout=30)[0]


def test_payment_writes_json_transaction_line_to_stdout(order):
    line = _payment_stdout_line(order)
    assert line["service.name"] == "payment"
    assert line["msg"] == "Transaction complete."


def test_payment_transaction_line_has_only_last_four_digits(order):
    line = _payment_stdout_line(order)
    assert line.get("lastFourDigits") == "0454"
    raw = json.dumps(line)
    assert "4432-8015-6152-0454" not in raw and "4432801561520454" not in raw
    assert "creditCardNumber" not in line and "number" not in line


def _transaction_id(order):
    events = dict(shop.events_of(_span(order, "checkout", PLACE_ORDER)))
    return events["charged"]["demo.payment.transaction.id"]


def _payment_transaction_records(order):
    transaction_id = _transaction_id(order)
    return _log_records(
        shop.match_phrase("attributes.transactionId", transaction_id),
        "payment",
        lambda d: d.get("body") == "Transaction complete."
        and shop.attr(d, "transactionId") == transaction_id,
        description=f"payment 'Transaction complete.' for {transaction_id}",
    )


def test_payment_transaction_log_reaches_opensearch(order):
    records = _payment_transaction_records(order)
    assert shop.resource_service(records[0]) == "payment"


def test_payment_transaction_log_is_indexed_once(order):
    _payment_transaction_records(order)
    time.sleep(10)
    assert len(_payment_transaction_records(order)) == 1


def test_payment_log_records_come_from_pino_instrumentation(order):
    record = _payment_transaction_records(order)[0]
    assert record["instrumentationScope"]["name"] == "@opentelemetry/instrumentation-pino"


def test_payment_transactions_metric_renamed(order):
    shop.prom_wait('demo_payment_transactions_total{demo_payment_currency="USD",service_name="payment"}')
    assert shop.prom("app_payment_transactions_total") == []


def test_email_confirmations_metric_renamed(order):
    shop.prom_wait('demo_notification_confirmations_total{service_name="email"}')
    assert shop.prom("app_confirmation_counter_total") == []


# --- the amounts of one Red Flashlight (57.08 USD) ------------------------------


def test_red_flashlight_order_is_costed_at_catalog_price(order):
    item_cost = order["answer"]["items"][0]["cost"]
    assert (item_cost["units"], item_cost["nanos"]) == (57, 80000000)
    assert _place_order_tags(order).get("demo.order.amount") == 66.07
    assert shop.tags_of(_span(order, "payment", PAYMENT_CHARGE_SERVER)).get("demo.payment.amount") == "66.07"


def test_order_amount_matches_charged_amount(order):
    order_amount = _place_order_tags(order)["demo.order.amount"]
    charged = float(shop.tags_of(_span(order, "payment", PAYMENT_CHARGE_SERVER))["demo.payment.amount"])
    assert round(order_amount, 2) == round(charged, 2)


# --- baggage -----------------------------------------------------------------------


@pytest.fixture(scope="module")
def synthetic_order():
    return _order(headers={"baggage": "synthetic_request=true"})


def test_synthetic_baggage_marks_place_order_span(synthetic_order):
    assert _place_order_tags(synthetic_order).get("user_agent.synthetic.type") == "test"


def test_synthetic_baggage_marks_charge_span_and_skips_charge(synthetic_order):
    tags = _charge_tags(synthetic_order)
    assert tags.get("user_agent.synthetic.type") == "test"
    assert tags.get("demo.payment.charged") is False


def test_enduser_baggage_reaches_charge_span():
    placed = _order(headers={"baggage": "enduser.id=probe-enduser-7"})
    assert _charge_tags(placed).get("enduser.id") == "probe-enduser-7"


# --- declined cards ------------------------------------------------------------------


def test_invalid_card_charge_span_records_error():
    user_id = shop.new_user()
    shop.add_to_cart(user_id)
    resp = shop.checkout(user_id, card_number="1234")
    assert resp.status_code == 422, resp.text
    trace = _failed_order_trace(user_id)
    charge = shop.spans(trace, "payment", "charge")[0]
    tags = shop.tags_of(charge)
    assert tags.get("error") is True
    assert tags.get("error.type") == "Error"
    messages = [f.get("exception.message") for name, f in shop.events_of(charge) if name == "exception"]
    assert "Credit card info is invalid." in messages


def test_payment_failure_flag_charge_span_status():
    with shop.flag("paymentFailure", "100%", settle=5):
        user_id = shop.new_user()
        shop.add_to_cart(user_id)
        resp = shop.checkout(user_id)
    assert resp.status_code == 422, resp.text
    trace = _failed_order_trace(user_id)
    tags = shop.tags_of(shop.spans(trace, "payment", "charge")[0])
    assert tags.get("error") is True
    assert tags.get("otel.status_description") == (
        "Payment request failed. Invalid token. demo.user_context.loyalty_level=gold"
    )
    assert tags.get("demo.user_context.loyalty_level") == "gold"


# --- emitRawPii on: the collector redacts what checkout and payment emit -------------


@pytest.fixture(scope="module")
def raw_pii_orders():
    with shop.flag("emitRawPii", "on", settle=8):
        with_pii = _order(email=PII_EMAIL)
    after = _order(email=PII_EMAIL)
    return {"on": with_pii, "off_again": after}


def test_raw_pii_place_order_span_has_no_card_cvv(raw_pii_orders):
    assert "demo.payment.card_cvv" not in _place_order_tags(raw_pii_orders["on"])


def test_raw_pii_place_order_span_has_hashed_email(raw_pii_orders):
    expected = hashlib.sha256(PII_EMAIL.encode()).hexdigest()
    assert _place_order_tags(raw_pii_orders["on"]).get("user.hash") == expected


def test_raw_pii_switched_off_drops_card_number(raw_pii_orders):
    assert "demo.payment.card_number" in _place_order_tags(raw_pii_orders["on"])
    assert "demo.payment.card_number" not in _place_order_tags(raw_pii_orders["off_again"])


def test_raw_pii_place_order_span_card_number_masked(raw_pii_orders):
    assert _place_order_tags(raw_pii_orders["on"]).get("demo.payment.card_number") == "****-****-****-0454"


def test_raw_pii_place_order_span_has_no_user_email(raw_pii_orders):
    assert "user.email" not in _place_order_tags(raw_pii_orders["on"])


def test_raw_pii_place_order_span_redaction_ignored_count(raw_pii_orders):
    assert _place_order_tags(raw_pii_orders["on"]).get("redaction.ignored.count") == 1


def test_raw_pii_charge_span_card_number_masked(raw_pii_orders):
    assert _charge_tags(raw_pii_orders["on"]).get("demo.payment.card_number") == "****-****-****-0454"


def test_raw_pii_charge_span_has_no_card_cvv(raw_pii_orders):
    assert "demo.payment.card_cvv" not in _charge_tags(raw_pii_orders["on"])


# --- the email service hangs ------------------------------------------------------------


@pytest.fixture(scope="module")
def email_hangs():
    shop.docker("pause", "email")
    try:
        user_id = shop.new_user()
        shop.add_to_cart(user_id)
        since = shop.utc_now()
        started = time.monotonic()
        resp = shop.checkout(user_id, timeout=60)
        elapsed = time.monotonic() - started
    finally:
        shop.docker("unpause", "email")
    body = resp.json() if resp.status_code == 200 else {}
    trace_id = None
    if body.get("orderId"):
        trace_id = shop.wait_for_order_trace(body["orderId"])["traceID"]
    return {"resp": resp, "body": body, "elapsed": elapsed, "trace_id": trace_id, "since": since}


def test_checkout_succeeds_while_email_hangs(email_hangs):
    assert email_hangs["resp"].status_code == 200, email_hangs["resp"].text
    assert email_hangs["body"].get("orderId")


def test_checkout_answers_within_five_seconds_while_email_hangs(email_hangs):
    assert email_hangs["elapsed"] < 5, f"checkout took {email_hangs['elapsed']:.1f}s"


def _warn_records(since):
    """The warning is logged without the request context, so it carries no
    traceId: take the ones logged after the order was sent."""
    return _log_records(
        shop.match_phrase("body", "failed to send order confirmation"),
        "checkout",
        lambda d: str(d.get("body", "")).startswith("failed to send order confirmation")
        and d.get("@timestamp", "") >= since,
        description=f"checkout 'failed to send order confirmation' after {since}",
    )


def test_checkout_warns_when_confirmation_email_times_out(email_hangs):
    assert email_hangs["trace_id"], "order did not complete"
    record = _warn_records(email_hangs["since"])[0]
    assert record["severity"]["text"] == "WARN"
    assert "context deadline exceeded" in record["body"]


def test_checkout_logs_no_email_sent_when_email_hangs(email_hangs):
    assert email_hangs["trace_id"], "order did not complete"
    _warn_records(email_hangs["since"])
    order_id = email_hangs["body"]["orderId"]
    sent = [
        d
        for d in shop.os_search(shop.match_phrase("body", "order confirmation email sent"), size=200)
        if shop.resource_service(d) == "checkout" and shop.attr(d, "demo.order.id") == order_id
    ]
    assert sent == []


def test_confirmation_email_sent_again_after_email_recovers(email_hangs):
    shop.wait_healthy("email", timeout=60)
    placed = _order()
    records = _checkout_email_sent_records(placed["answer"]["orderId"])
    assert shop.attr(records[0], "demo.order.id") == placed["answer"]["orderId"]


# --- containers -----------------------------------------------------------------------------


def test_checkout_stops_cleanly_on_sigterm():
    started = time.monotonic()
    try:
        shop.docker("stop", "checkout", timeout=60)
        elapsed = time.monotonic() - started
        exit_code = shop.inspect("checkout", "{{.State.ExitCode}}")
    finally:
        shop.docker("start", "checkout")
        shop.wait_healthy("checkout")
    assert exit_code == "0"
    assert elapsed < 8, f"docker stop checkout took {elapsed:.1f}s"


def test_checkout_container_healthy_via_grpc_health_probe():
    test = shop.inspect("checkout", "{{json .Config.Healthcheck.Test}}")
    assert "/bin/grpc_health_probe" in test and "5050" in test
    shop.wait_healthy("checkout", timeout=120)


def test_payment_container_healthy():
    shop.wait_healthy("payment", timeout=120)


def test_payment_healthcheck_finishes_within_its_timeout():
    healthcheck = json.loads(shop.inspect("payment", "{{json .Config.Healthcheck}}"))
    timeout_s = healthcheck["Timeout"] / 1e9
    command = healthcheck["Test"][1:]
    if healthcheck["Test"][0] == "CMD-SHELL":
        command = ["sh", "-c", command[0]]
    durations = []
    for _ in range(3):
        started = time.monotonic()
        shop.docker("exec", "payment", *command, check=False, timeout=60)
        durations.append(time.monotonic() - started)
    assert max(durations) < timeout_s / 2, f"healthcheck took {durations} against a {timeout_s}s timeout"
    log = json.loads(shop.inspect("payment", "{{json .State.Health}}")).get("Log") or []
    assert not [e for e in log if "exceeded timeout" in e.get("Output", "")]
    shop.wait_healthy("payment", timeout=120)
