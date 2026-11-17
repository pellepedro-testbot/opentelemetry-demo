# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""
The cartFailure flag as a failure rate: at its "100%" variant EmptyCart fails
while the other cart operations keep working.
"""

import time

import pytest
import requests

from conftest import FRONTEND_PROXY_URL
from demo_stack import (
    add_to_cart,
    find_spans,
    get_cart,
    has_span,
    new_trace_id,
    new_user_id,
    set_flag,
    trace_spans,
    traceparent,
)

EMPTY_CART = "POST /oteldemo.CartService/EmptyCart"


@pytest.fixture(scope="module")
def cart_failure():
    set_flag("cartFailure", "100%")
    try:
        yield
    finally:
        set_flag("cartFailure", "off")


@pytest.fixture(scope="module")
def failing_empty_cart(cart_failure):
    user_id = new_user_id()
    assert add_to_cart(user_id, "OLJCESPC7Z", 1).status_code == 200
    trace_id = new_trace_id()
    start = time.monotonic()
    try:
        resp = requests.delete(
            f"{FRONTEND_PROXY_URL}/api/cart",
            json={"userId": user_id},
            headers={"traceparent": traceparent(trace_id)},
            timeout=30,
        )
        status, body = resp.status_code, resp.text
    except requests.Timeout:
        status, body = None, "no answer within 30 s"
    return {"status": status, "body": body, "elapsed": time.monotonic() - start, "trace_id": trace_id}


def test_other_cart_operations_keep_working(cart_failure):
    user_id = new_user_id()
    assert add_to_cart(user_id, "OLJCESPC7Z", 1).status_code == 200
    assert get_cart(user_id).status_code == 200


def test_empty_cart_answers_500(failing_empty_cart):
    assert failing_empty_cart["status"] == 500, failing_empty_cart["body"][:200]


def test_empty_cart_fails_within_proxy_timeout(failing_empty_cart):
    assert failing_empty_cart["status"] == 500, (
        f"answered {failing_empty_cart['status']} after {failing_empty_cart['elapsed']:.1f}s: "
        f"{failing_empty_cart['body'][:200]}"
    )


def test_empty_cart_span_reports_storage_error(failing_empty_cart):
    spans = trace_spans(failing_empty_cart["trace_id"], until=has_span("cart", EMPTY_CART), timeout=300)
    span = find_spans(spans, "cart", EMPTY_CART)[0]
    assert span["tags"].get("otel.status_code") == "ERROR"
    assert span["tags"].get("otel.status_description", "").startswith("Can't access cart storage.")
