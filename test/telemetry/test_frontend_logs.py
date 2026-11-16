# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Frontend structured logs (pino on stdout, exported to OpenSearch) and the
checkout route span. Each request carries its own traceparent, so the lines
are matched by trace id rather than by time window."""

import time

import pytest
import requests

from conftest import FRONTEND_PROXY_URL
from observability import (
    attribute,
    checkout_route_span,
    frontend_lines_for_trace,
    service_body_query,
    wait_for_logs,
)
from storefront import add_to_cart, empty_cart, new_traceparent, new_user_id, place_order

def messages(lines, msg):
    return [line for line in lines if line.get("msg") == msg]


@pytest.fixture(scope="module")
def declined_order():
    started = time.time()
    user_id, resp, trace_id = place_order(card_number="1234")
    assert resp.status_code == 422, resp.text
    yield {"trace_id": trace_id, "started": started}
    empty_cart(user_id)


@pytest.fixture(scope="module")
def successful_order():
    started = time.time()
    _, resp, trace_id = place_order(product_id="66VCHSJNUP")
    assert resp.status_code == 200, resp.text
    return {"trace_id": trace_id, "started": started, "order_id": resp.json()["orderId"]}


def traced_request(method, path, **kwargs):
    started = time.time()
    traceparent, trace_id = new_traceparent()
    resp = requests.request(
        method,
        f"{FRONTEND_PROXY_URL}{path}",
        headers={"traceparent": traceparent},
        timeout=20,
        **kwargs,
    )
    return resp, frontend_lines_for_trace(trace_id, started)


@pytest.fixture(scope="module")
def products_request():
    return traced_request("GET", "/api/products?currencyCode=USD")


@pytest.fixture(scope="module")
def shipping_without_parameters():
    started = time.time()
    resp, lines = traced_request("GET", "/api/shipping")
    # Read again after a moment so a stray completed line written late is seen too.
    time.sleep(2)
    return resp, frontend_lines_for_trace(lines[0]["trace_id"], started)


def test_declined_card_log_details_start_with_charge_failure(declined_order):
    lines = frontend_lines_for_trace(declined_order["trace_id"], declined_order["started"])
    declined = messages(lines, "Checkout payment declined")
    assert declined, lines
    assert declined[0]["details"].startswith("failed to charge card:"), declined[0]


def test_declined_card_logs_one_info_line(declined_order):
    lines = frontend_lines_for_trace(declined_order["trace_id"], declined_order["started"])
    declined = messages(lines, "Checkout payment declined")
    assert len(declined) == 1, lines
    assert declined[0]["level"] == 30


def test_declined_card_logs_no_failed_to_place_order_line(declined_order):
    lines = frontend_lines_for_trace(declined_order["trace_id"], declined_order["started"])
    assert messages(lines, "Checkout failed to place order") == []


def test_declined_card_logs_completed_request_with_422(declined_order):
    lines = frontend_lines_for_trace(declined_order["trace_id"], declined_order["started"])
    completed = messages(lines, "API request completed")
    assert [
        (line["http.request.method"], line["url.path"], line["http.response.status_code"])
        for line in completed
    ] == [("POST", "/api/checkout", 422)]


def test_declined_card_marks_checkout_route_span_as_error(declined_order):
    span = checkout_route_span(declined_order["trace_id"])
    assert span["tags"].get("otel.status_code") == "ERROR", span["tags"]


def test_declined_card_records_exception_event_on_checkout_route_span(declined_order):
    span = checkout_route_span(declined_order["trace_id"])
    assert any(event.get("event") == "exception" for event in span["events"]), span["events"]


def test_declined_card_log_reaches_opensearch_with_details(declined_order):
    records = wait_for_logs(
        service_body_query("frontend", "Checkout payment declined")
        + [{"term": {"traceId": declined_order["trace_id"]}}],
        "frontend 'Checkout payment declined' record in OpenSearch",
    )
    assert str(attribute(records[0], "details")).startswith("failed to charge card:"), records[0]


def test_successful_order_log_carries_order_id(successful_order):
    lines = frontend_lines_for_trace(successful_order["trace_id"], successful_order["started"])
    placed = messages(lines, "Order placed successfully")
    assert placed, lines
    assert placed[0]["demo.order.id"] == successful_order["order_id"]


def test_successful_order_logs_one_info_line(successful_order):
    lines = frontend_lines_for_trace(successful_order["trace_id"], successful_order["started"])
    placed = messages(lines, "Order placed successfully")
    assert len(placed) == 1, lines
    assert placed[0]["level"] == 30


def test_successful_order_logs_no_failure_lines(successful_order):
    lines = frontend_lines_for_trace(successful_order["trace_id"], successful_order["started"])
    assert messages(lines, "Checkout payment declined") == []
    assert messages(lines, "Checkout failed to place order") == []


def test_successful_order_log_reaches_opensearch_with_order_id(successful_order):
    records = wait_for_logs(
        service_body_query("frontend", "Order placed successfully")
        + [{"term": {"traceId": successful_order["trace_id"]}}],
        "frontend 'Order placed successfully' record in OpenSearch",
    )
    assert attribute(records[0], "demo.order.id") == successful_order["order_id"], records[0]


def test_products_request_logs_one_completed_info_line(products_request):
    _, lines = products_request
    completed = messages(lines, "API request completed")
    assert len(completed) == 1, lines
    assert completed[0]["level"] == 30
    assert completed[0]["url.path"] == "/api/products"


def test_completed_request_log_reaches_opensearch():
    resp, lines = traced_request("GET", "/api/products?currencyCode=USD")
    assert resp.status_code == 200
    trace_id = lines[0]["trace_id"]
    records = wait_for_logs(
        service_body_query("frontend", "API request completed") + [{"term": {"traceId": trace_id}}],
        "frontend 'API request completed' record in OpenSearch",
    )
    assert attribute(records[0], "url.path") == "/api/products"


def test_completed_line_url_path_leaves_out_query_string(products_request):
    _, lines = products_request
    completed = messages(lines, "API request completed")
    assert [line["url.path"] for line in completed] == ["/api/products"]


def test_products_completed_line_has_method_and_status(products_request):
    resp, lines = products_request
    assert resp.status_code == 200
    completed = messages(lines, "API request completed")
    assert [(line["http.request.method"], line["http.response.status_code"]) for line in completed] == [
        ("GET", 200)
    ]


def test_add_to_cart_logs_completed_post():
    user_id = new_user_id()
    started = time.time()
    traceparent, trace_id = new_traceparent()
    try:
        add_to_cart(user_id, headers={"traceparent": traceparent})
        lines = frontend_lines_for_trace(trace_id, started)
        completed = messages(lines, "API request completed")
        assert [(line["http.request.method"], line["url.path"]) for line in completed] == [
            ("POST", "/api/cart")
        ]
    finally:
        empty_cart(user_id)


def test_product_detail_logs_its_path():
    _, lines = traced_request("GET", "/api/products/OLJCESPC7Z?currencyCode=USD")
    completed = messages(lines, "API request completed")
    assert [line["url.path"] for line in completed] == ["/api/products/OLJCESPC7Z"]


def test_get_checkout_answers_405_and_logs_it():
    resp, lines = traced_request("GET", "/api/checkout")
    assert resp.status_code == 405
    completed = messages(lines, "API request completed")
    assert [(line["url.path"], line["http.response.status_code"]) for line in completed] == [
        ("/api/checkout", 405)
    ]


def test_throwing_handler_answers_500_and_logs_error(shipping_without_parameters):
    resp, lines = shipping_without_parameters
    assert resp.status_code == 500
    failed = messages(lines, "API request failed")
    assert len(failed) == 1, lines
    assert failed[0]["level"] == 50


def test_failed_line_has_method_path_and_status(shipping_without_parameters):
    _, lines = shipping_without_parameters
    failed = messages(lines, "API request failed")
    assert [
        (line["http.request.method"], line["url.path"], line["http.response.status_code"])
        for line in failed
    ] == [("GET", "/api/shipping", 500)]


def test_failed_line_has_err_with_thrown_error(shipping_without_parameters):
    _, lines = shipping_without_parameters
    failed = messages(lines, "API request failed")
    assert failed, lines
    err = failed[0].get("err") or {}
    assert err.get("type") and err.get("message") and err.get("stack"), failed[0]


def test_throwing_handler_writes_no_completed_line(shipping_without_parameters):
    _, lines = shipping_without_parameters
    assert messages(lines, "API request failed"), lines
    assert messages(lines, "API request completed") == []
