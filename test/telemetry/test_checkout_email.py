# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Checkout's order confirmation email: logged with the order id when sent,
bounded by a timeout when the email service hangs, and a clean SIGTERM exit.
Checkout's slog records go only to OTLP, so they are read from OpenSearch."""

import time

import pytest

from conftest import poll_until
from observability import (
    attribute,
    docker,
    opensearch_logs,
    service_body_query,
    start_container_and_wait,
    stop_container,
    wait_for_logs,
)
from storefront import place_order


def email_sent_records(order_id):
    return opensearch_logs(
        service_body_query("checkout", "order confirmation email sent")
        + [{"match_phrase": {"attributes.demo.order.id": order_id}}]
    )


def wait_for_email_sent(order_id):
    return wait_for_logs(
        service_body_query("checkout", "order confirmation email sent")
        + [{"match_phrase": {"attributes.demo.order.id": order_id}}],
        f"'order confirmation email sent' for order {order_id}",
    )


@pytest.fixture(scope="module")
def order_with_email():
    _, resp, _ = place_order(product_id="66VCHSJNUP")
    assert resp.status_code == 200, resp.text
    order_id = resp.json()["orderId"]
    return order_id, wait_for_email_sent(order_id)


@pytest.fixture(scope="module")
def order_while_email_hangs():
    docker("pause", "email")
    try:
        started_ns = time.time_ns()
        clock = time.monotonic()
        _, resp, _ = place_order(product_id="66VCHSJNUP")
        elapsed = time.monotonic() - clock
    finally:
        docker("unpause", "email")
    return {"resp": resp, "elapsed": elapsed, "started_ns": started_ns}


def test_email_sent_log_carries_order_id(order_with_email):
    order_id, records = order_with_email
    assert attribute(records[0], "demo.order.id") == order_id


def test_email_sent_log_is_info(order_with_email):
    _, records = order_with_email
    assert records[0]["severity"]["text"] == "INFO"


def test_checkout_succeeds_while_email_hangs(order_while_email_hangs):
    resp = order_while_email_hangs["resp"]
    assert resp.status_code == 200, resp.text
    assert resp.json()["orderId"]


def test_checkout_answers_within_5s_while_email_hangs(order_while_email_hangs):
    assert order_while_email_hangs["resp"].status_code == 200
    assert order_while_email_hangs["elapsed"] < 5, order_while_email_hangs["elapsed"]


def test_email_timeout_logged_as_warning(order_while_email_hangs):
    since = order_while_email_hangs["started_ns"] // 1_000_000

    def warnings():
        records = opensearch_logs(
            [
                {"match_phrase": {"resource.service.name": "checkout"}},
                {"match_phrase_prefix": {"body": "failed to send order confirmation"}},
                {"range": {"@timestamp": {"gte": since, "format": "epoch_millis"}}},
            ]
        )
        return [r for r in records if "context deadline exceeded" in r["body"]]

    records = poll_until(warnings, "checkout WARN 'failed to send order confirmation'", timeout=90)
    assert records[0]["body"].startswith("failed to send order confirmation")
    assert records[0]["severity"]["text"] == "WARN"


def test_no_email_sent_log_for_order_while_email_hangs(order_while_email_hangs):
    order_id = order_while_email_hangs["resp"].json()["orderId"]
    time.sleep(20)
    assert email_sent_records(order_id) == []


def test_email_sent_logged_again_after_email_recovers(order_while_email_hangs):
    assert order_while_email_hangs["resp"].status_code == 200
    _, resp, _ = place_order(product_id="66VCHSJNUP")
    assert resp.status_code == 200, resp.text
    order_id = resp.json()["orderId"]
    records = wait_for_email_sent(order_id)
    assert attribute(records[0], "demo.order.id") == order_id


def test_checkout_exits_cleanly_on_sigterm():
    try:
        elapsed, exit_code = stop_container("checkout")
    finally:
        start_container_and_wait("checkout")
        # The frontend reconnects to the restarted service with a backoff.
        poll_until(
            lambda: place_order(product_id="66VCHSJNUP")[1].status_code == 200,
            "checkout taking orders again after restart",
            timeout=120,
        )
    assert exit_code == 0
    assert elapsed < 9, elapsed
