# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Checkout failures driven by feature flags: a paymentFailure decline is a
422 that exposes nothing internal, while an unreachable payment service or a
product catalog failure stays a generic 500 logged as an error."""

import time

import pytest

from observability import (
    attribute,
    checkout_route_span,
    frontend_lines_for_trace,
    service_body_query,
    wait_for_logs,
)
from storefront import (
    cart_product_quantities,
    empty_cart,
    place_order,
    set_flag,
    set_product_catalog_failure,
)

@pytest.fixture(scope="module")
def payment_failure_order():
    set_flag("paymentFailure", "100%")
    try:
        user_id, resp, trace_id = place_order()
    finally:
        set_flag("paymentFailure", "off")
    cart = cart_product_quantities(user_id)
    yield {"user_id": user_id, "resp": resp, "cart": cart}
    empty_cart(user_id)


@pytest.fixture(scope="module")
def payment_unreachable_order():
    set_flag("paymentUnreachable", "on")
    try:
        user_id, resp, _ = place_order()
    finally:
        set_flag("paymentUnreachable", "off")
    yield resp
    empty_cart(user_id)


@pytest.fixture(scope="module")
def catalog_failure_order():
    started = time.time()
    set_product_catalog_failure("on")
    try:
        user_id, resp, trace_id = place_order(product_id="OLJCESPC7Z")
    finally:
        set_product_catalog_failure("off")
    cart = cart_product_quantities(user_id)
    yield {
        "user_id": user_id,
        "resp": resp,
        "trace_id": trace_id,
        "started": started,
        "cart": cart,
    }
    empty_cart(user_id)


def test_payment_failure_decline_hides_internal_text(payment_failure_order):
    resp = payment_failure_order["resp"]
    assert resp.status_code == 422, resp.text
    assert "Invalid token" not in resp.text
    assert "loyalty_level" not in resp.text


def test_payment_failure_decline_keeps_cart(payment_failure_order):
    resp = payment_failure_order["resp"]
    assert resp.status_code == 422, resp.text
    assert resp.json()["code"] == "PAYMENT_FAILED"
    assert payment_failure_order["cart"] == {"OLJCESPC7Z": 1}


def test_payment_unreachable_answers_500(payment_unreachable_order):
    assert payment_unreachable_order.status_code == 500, payment_unreachable_order.text


def test_catalog_failure_answers_generic_500_body(catalog_failure_order):
    resp = catalog_failure_order["resp"]
    assert resp.status_code == 500, resp.text
    assert resp.json() == {"error": "Failed to place order."}


def test_catalog_failure_keeps_cart(catalog_failure_order):
    assert catalog_failure_order["cart"] == {"OLJCESPC7Z": 1}


def test_catalog_failure_logs_no_payment_declined_line(catalog_failure_order):
    lines = frontend_lines_for_trace(
        catalog_failure_order["trace_id"], catalog_failure_order["started"]
    )
    assert [line for line in lines if line.get("msg") == "Checkout payment declined"] == []


def test_catalog_failure_logs_error_with_err_field(catalog_failure_order):
    lines = frontend_lines_for_trace(
        catalog_failure_order["trace_id"], catalog_failure_order["started"]
    )
    failures = [line for line in lines if line.get("msg") == "Checkout failed to place order"]
    assert len(failures) == 1, lines
    assert failures[0]["level"] == 50
    assert failures[0].get("err"), failures[0]


def test_catalog_failure_marks_frontend_span_as_error(catalog_failure_order):
    span = checkout_route_span(catalog_failure_order["trace_id"])
    assert span["tags"].get("otel.status_code") == "ERROR", span["tags"]


def test_catalog_failure_log_reaches_opensearch_with_exception_message(catalog_failure_order):
    records = wait_for_logs(
        service_body_query("frontend", "Checkout failed to place order")
        + [{"term": {"traceId": catalog_failure_order["trace_id"]}}],
        "frontend 'Checkout failed to place order' record in OpenSearch",
    )
    assert attribute(records[0], "exception.message"), records[0]
