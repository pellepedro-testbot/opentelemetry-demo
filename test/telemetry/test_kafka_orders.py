# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""
Orders published by checkout to Kafka and consumed by fraud-detection and
accounting, on the default topic and on a topic set with KAFKA_TOPIC. The
KAFKA_TOPIC test recreates the three services and restores them afterwards.
"""

import time

import pytest

from conftest import poll_until
from demo_stack import compose, container_logs, find_spans, place_order, trace_spans, utc_now, wait_healthy

KAFKA_SERVICES = ("checkout", "fraud-detection", "accounting")


def _order_details_line(order_id, since):
    lines = container_logs("accounting", since).splitlines()
    return any("Order details:" in line and order_id in line for line in lines)


def _fraud_line(order_id, since):
    return f"Consumed record with orderId: {order_id}" in container_logs("fraud-detection", since)


def _eventually(fn, timeout=90):
    try:
        return poll_until(fn, "consumer log line", timeout=timeout, interval=3)
    except AssertionError:
        return False


def _recreate(env=None):
    compose("up", "-d", "--no-deps", "--no-build", *KAFKA_SERVICES, env=env)
    wait_healthy("checkout")
    # Give the Kafka consumers time to join their group before orders arrive.
    time.sleep(30)
    # A recreated checkout can time out on its first orders while it opens its
    # downstream connections; warm it up until an order goes through.
    poll_until(lambda: place_order()[0].status_code == 200, "a first order through the recreated checkout",
               timeout=120, interval=2)


@pytest.fixture(scope="module")
def default_topic_order():
    since = utc_now()
    resp, _, _, _ = place_order()
    assert resp.status_code == 200, resp.text[:300]
    order_id = resp.json()["orderId"]
    return {
        "fraud": _eventually(lambda: _fraud_line(order_id, since)),
        "accounting": _eventually(lambda: _order_details_line(order_id, since)),
    }


def test_default_topic_order_reaches_fraud_detection(default_topic_order):
    assert default_topic_order["fraud"]


def test_default_topic_order_reaches_accounting(default_topic_order):
    assert default_topic_order["accounting"]


@pytest.fixture(scope="module")
def alt_topic_order():
    _recreate({"KAFKA_TOPIC": "orders-alt"})
    try:
        since = utc_now()
        resp, trace_id, _, _ = place_order()
        assert resp.status_code == 200, resp.text[:300]
        order_id = resp.json()["orderId"]
        fraud = _eventually(lambda: _fraud_line(order_id, since))
        accounting = _eventually(lambda: _order_details_line(order_id, since))
        spans = trace_spans(trace_id, until=lambda s: _producers(s))
        return {"fraud": fraud, "accounting": accounting, "spans": spans}
    finally:
        _recreate()


def _producers(spans):
    return [s for s in find_spans(spans, "checkout") if s["tags"].get("span.kind") == "producer"]


def test_alt_topic_producer_span(alt_topic_order):
    producers = _producers(alt_topic_order["spans"])
    assert producers
    tags = producers[0]["tags"]
    assert tags["messaging.destination.name"] == "orders-alt"
    assert "orders-alt publish" in (producers[0]["name"], tags.get("original_span_name"))


def test_alt_topic_order_reaches_fraud_detection(alt_topic_order):
    assert alt_topic_order["fraud"]


def test_alt_topic_order_reaches_accounting(alt_topic_order):
    assert alt_topic_order["accounting"]
