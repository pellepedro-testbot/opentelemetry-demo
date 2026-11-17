# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""
How checkout behaves when one of its downstream services misbehaves: a hung
email service (container paused) and a stopped quote service. Each test
restores the container it disturbed.
"""

import time

import pytest

from demo_stack import (
    confirmation_sent_records,
    docker,
    find_spans,
    has_span,
    place_order,
    search_logs,
    trace_spans,
    utc_now,
    wait_for_logs,
    wait_healthy,
)


@pytest.fixture(scope="module")
def order_while_email_hangs():
    docker("pause", "email")
    try:
        since = utc_now()
        start = time.monotonic()
        resp, trace_id, user_id, _ = place_order()
        elapsed = time.monotonic() - start
        time.sleep(60)
    finally:
        docker("unpause", "email")
    return {"resp": resp, "trace_id": trace_id, "elapsed": elapsed, "since": since}


def test_order_succeeds_while_email_hangs(order_while_email_hangs):
    resp = order_while_email_hangs["resp"]
    assert resp.status_code == 200, resp.text[:300]
    assert resp.json()["orderId"]


def test_order_answers_within_five_seconds_while_email_hangs(order_while_email_hangs):
    assert order_while_email_hangs["elapsed"] < 5


def test_hung_email_is_logged_as_warning(order_while_email_hangs):
    # The warning carries neither the trace id nor the order id: match it by time.
    since = order_while_email_hangs["since"].strftime("%Y-%m-%dT%H:%M:%S.%fZ")
    records = wait_for_logs(
        "failed to send order confirmation",
        service="checkout",
        extra=[{"range": {"observedTimestamp": {"gte": since}}}],
    )
    record = records[0]
    assert record["body"].startswith("failed to send order confirmation")
    assert "context deadline exceeded" in record["body"]
    assert record["severity"]["text"] == "WARN"


def test_hung_email_is_not_logged_as_sent(order_while_email_hangs):
    order_id = order_while_email_hangs["resp"].json()["orderId"]
    assert search_logs(
        "order confirmation email sent",
        service="checkout",
        extra=[{"match_phrase": {"attributes.demo.order.id": order_id}}],
    ) == []


def test_next_order_after_email_recovers_is_logged_as_sent(order_while_email_hangs):
    resp, _, _, _ = place_order()
    assert resp.status_code == 200, resp.text[:300]
    assert confirmation_sent_records(resp.json()["orderId"])


def test_stopped_quote_fails_order_with_shipping_error():
    docker("stop", "quote")
    try:
        resp, trace_id, _, _ = place_order()
    finally:
        docker("start", "quote")
        wait_healthy("quote")
    assert resp.status_code != 200
    spans = trace_spans(trace_id, until=has_span("checkout", "oteldemo.CheckoutService/PlaceOrder"))
    span = find_spans(spans, "checkout", "oteldemo.CheckoutService/PlaceOrder")[0]
    messages = [e.get("exception.message", "") for e in span["events"] if e.get("event") == "exception"]
    assert any("failed POST to shipping service: expected 200, got 500" in m for m in messages), messages
