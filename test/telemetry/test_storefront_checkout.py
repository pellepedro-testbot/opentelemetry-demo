# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""
Checkout answers of the storefront API (POST /api/checkout): payment declines
answer 422 PAYMENT_FAILED, other failures a generic 500, and each outcome
writes its own frontend log line, span status and OpenSearch record.
"""

import pytest

from demo_stack import (
    add_to_cart,
    checkout_body,
    find_spans,
    flag,
    frontend_lines,
    get_cart,
    new_user_id,
    place_order,
    post_checkout,
    product_catalog_failure,
    trace_spans,
    utc_now,
    wait_for_logs,
)

DECLINE_MESSAGE = "Your payment could not be processed. Please check your card details and try again."
GENERIC_FAILURE = {"error": "Failed to place order."}


def _messages(lines):
    return [line.get("msg") for line in lines]


def _checkout_route_spans(spans):
    return [
        s for s in find_spans(spans, service="frontend")
        if "/api/checkout" in s["name"]
    ]


def _cart_product_ids(user_id):
    resp = get_cart(user_id)
    assert resp.status_code == 200, resp.text[:300]
    return [item["productId"] for item in resp.json().get("items", [])]


def _declined(**body_overrides):
    since = utc_now()
    resp, trace_id, user_id, body = place_order(**body_overrides)
    lines = frontend_lines(since, trace_id)
    return {"resp": resp, "trace_id": trace_id, "user_id": user_id, "lines": lines, "since": since}


@pytest.fixture(scope="module")
def invalid_card_order():
    return _declined(card_number="1234")


@pytest.fixture(scope="module")
def successful_order():
    since = utc_now()
    resp, trace_id, user_id, body = place_order()
    lines = frontend_lines(since, trace_id)
    return {"resp": resp, "trace_id": trace_id, "user_id": user_id, "lines": lines}


@pytest.fixture(scope="module")
def catalog_failure_order():
    user_id = new_user_id()
    assert add_to_cart(user_id, "OLJCESPC7Z", 1).status_code == 200
    since = utc_now()
    with product_catalog_failure():
        resp, trace_id = post_checkout(checkout_body(user_id))
    lines = frontend_lines(since, trace_id)
    return {"resp": resp, "trace_id": trace_id, "user_id": user_id, "lines": lines}


@pytest.fixture(scope="module")
def payment_unreachable_order():
    user_id = new_user_id()
    assert add_to_cart(user_id, "OLJCESPC7Z", 1).status_code == 200
    since = utc_now()
    with flag("paymentUnreachable", "on"):
        resp, trace_id = post_checkout(checkout_body(user_id))
    lines = frontend_lines(since, trace_id)
    return {"resp": resp, "trace_id": trace_id, "user_id": user_id, "lines": lines}


# --- payment declines -------------------------------------------------------


def test_invalid_card_answers_422(invalid_card_order):
    assert invalid_card_order["resp"].status_code == 422


def test_decline_error_text_is_exact(invalid_card_order):
    assert invalid_card_order["resp"].json()["error"] == DECLINE_MESSAGE


def test_decline_code_is_payment_failed(invalid_card_order):
    assert invalid_card_order["resp"].json()["code"] == "PAYMENT_FAILED"


def test_decline_body_holds_only_error_and_code(invalid_card_order):
    assert set(invalid_card_order["resp"].json().keys()) == {"error", "code"}


def test_expired_card_answers_422_payment_failed():
    order = _declined(expiration_year=2020)
    assert order["resp"].status_code == 422
    assert order["resp"].json()["code"] == "PAYMENT_FAILED"


def test_unaccepted_card_type_answers_422_payment_failed():
    order = _declined(card_number="378282246310005")
    assert order["resp"].status_code == 422
    assert order["resp"].json()["code"] == "PAYMENT_FAILED"


@pytest.mark.parametrize("card_number", [None, ""], ids=["missing-card", "empty-card-number"])
def test_other_card_declines_answer_the_same_body_and_keep_the_cart(card_number):
    user_id = new_user_id()
    assert add_to_cart(user_id, "OLJCESPC7Z", 1).status_code == 200
    body = checkout_body(user_id)
    if card_number is None:
        del body["creditCard"]
    else:
        body["creditCard"]["creditCardNumber"] = card_number
    resp, _ = post_checkout(body)
    assert resp.status_code == 422, resp.text[:300]
    assert resp.json() == {"error": DECLINE_MESSAGE, "code": "PAYMENT_FAILED"}
    assert "OLJCESPC7Z" in _cart_product_ids(user_id)


@pytest.fixture(scope="module")
def payment_failure_flag_order():
    with flag("paymentFailure", "100%"):
        return _declined()


def test_payment_failure_flag_answers_422_payment_failed(payment_failure_flag_order):
    resp = payment_failure_flag_order["resp"]
    assert resp.status_code == 422
    assert resp.json()["code"] == "PAYMENT_FAILED"


def test_payment_failure_flag_answer_hides_internal_text(payment_failure_flag_order):
    text = payment_failure_flag_order["resp"].text
    assert "Invalid token" not in text
    assert "loyalty_level" not in text


def test_cart_is_kept_after_decline(invalid_card_order):
    assert "OLJCESPC7Z" in _cart_product_ids(invalid_card_order["user_id"])


def test_decline_log_details_name_the_card_charge(invalid_card_order):
    declined = [l for l in invalid_card_order["lines"] if l.get("msg") == "Checkout payment declined"]
    assert declined, _messages(invalid_card_order["lines"])
    assert declined[0]["details"].startswith("failed to charge card:")


def test_decline_writes_one_info_line(invalid_card_order):
    declined = [l for l in invalid_card_order["lines"] if l.get("msg") == "Checkout payment declined"]
    assert len(declined) == 1, _messages(invalid_card_order["lines"])
    assert declined[0]["level"] == 30


def test_decline_writes_no_failed_to_place_order_line(invalid_card_order):
    assert "Checkout failed to place order" not in _messages(invalid_card_order["lines"])


def test_decline_completion_line_has_status_422(invalid_card_order):
    completed = [l for l in invalid_card_order["lines"] if l.get("msg") == "API request completed"]
    assert [l.get("http.response.status_code") for l in completed] == [422]


def test_decline_frontend_span_has_error_status(invalid_card_order):
    spans = trace_spans(invalid_card_order["trace_id"], until=lambda s: _checkout_route_spans(s))
    route_spans = _checkout_route_spans(spans)
    assert any(s["tags"].get("otel.status_code") == "ERROR" for s in route_spans), [
        (s["name"], s["tags"].get("otel.status_code")) for s in route_spans
    ]


def test_decline_frontend_span_records_exception(invalid_card_order):
    spans = trace_spans(invalid_card_order["trace_id"], until=lambda s: _checkout_route_spans(s))
    events = [e.get("event") for s in _checkout_route_spans(spans) for e in s["events"]]
    assert "exception" in events


def test_decline_log_reaches_opensearch(invalid_card_order):
    records = wait_for_logs("Checkout payment declined", trace_id=invalid_card_order["trace_id"])
    assert records[0]["resource"]["service.name"] == "frontend"
    assert records[0]["attributes"]["details"].startswith("failed to charge card:")


# --- other checkout failures ------------------------------------------------


def test_catalog_failure_answers_500(catalog_failure_order):
    assert catalog_failure_order["resp"].status_code == 500


def test_catalog_failure_body_is_exactly_the_generic_error(catalog_failure_order):
    assert catalog_failure_order["resp"].json() == GENERIC_FAILURE


def test_catalog_failure_writes_no_decline_line(catalog_failure_order):
    assert "Checkout payment declined" not in _messages(catalog_failure_order["lines"])


def test_catalog_failure_writes_error_line_with_err(catalog_failure_order):
    failed = [l for l in catalog_failure_order["lines"] if l.get("msg") == "Checkout failed to place order"]
    assert len(failed) == 1, _messages(catalog_failure_order["lines"])
    assert failed[0]["level"] == 50
    assert failed[0].get("err")


def test_catalog_failure_frontend_span_has_error_status(catalog_failure_order):
    spans = trace_spans(catalog_failure_order["trace_id"], until=lambda s: _checkout_route_spans(s))
    assert any(s["tags"].get("otel.status_code") == "ERROR" for s in _checkout_route_spans(spans))


def test_catalog_failure_log_reaches_opensearch_with_exception_message(catalog_failure_order):
    records = wait_for_logs(
        "Checkout failed to place order",
        trace_id=catalog_failure_order["trace_id"],
        match=lambda r: r["attributes"].get("exception.message"),
    )
    assert records[0]["resource"]["service.name"] == "frontend"


def test_cart_is_kept_after_catalog_failure(catalog_failure_order):
    assert "OLJCESPC7Z" in _cart_product_ids(catalog_failure_order["user_id"])


def test_payment_unreachable_answers_500(payment_unreachable_order):
    assert payment_unreachable_order["resp"].status_code == 500


def test_payment_unreachable_answer_has_no_code(payment_unreachable_order):
    assert "code" not in payment_unreachable_order["resp"].json()


def test_empty_body_answers_500_generic_error():
    resp, _ = post_checkout({})
    assert resp.status_code == 500
    assert resp.json() == GENERIC_FAILURE


# --- successful checkout ----------------------------------------------------


def test_successful_order_answers_order_fields(successful_order):
    resp = successful_order["resp"]
    assert resp.status_code == 200, resp.text[:300]
    body = resp.json()
    for key in ("orderId", "shippingTrackingId", "shippingCost", "shippingAddress", "items"):
        assert body.get(key), f"{key} missing from {sorted(body)}"


def test_order_placed_line_carries_the_order_id(successful_order):
    placed = [l for l in successful_order["lines"] if l.get("msg") == "Order placed successfully"]
    assert placed, _messages(successful_order["lines"])
    assert placed[0]["demo.order.id"] == successful_order["resp"].json()["orderId"]


def test_successful_order_writes_one_info_line(successful_order):
    placed = [l for l in successful_order["lines"] if l.get("msg") == "Order placed successfully"]
    assert len(placed) == 1
    assert placed[0]["level"] == 30


def test_successful_order_writes_no_failure_lines(successful_order):
    messages = _messages(successful_order["lines"])
    assert "Checkout payment declined" not in messages
    assert "Checkout failed to place order" not in messages


def test_order_placed_log_reaches_opensearch(successful_order):
    order_id = successful_order["resp"].json()["orderId"]
    records = wait_for_logs("Order placed successfully", trace_id=successful_order["trace_id"])
    assert records[0]["resource"]["service.name"] == "frontend"
    assert records[0]["attributes"]["demo.order.id"] == order_id


def test_cart_is_empty_after_successful_order(successful_order):
    assert _cart_product_ids(successful_order["user_id"]) == []


def test_eur_order_answers_costs_in_eur():
    resp, _, _, _ = place_order(currency="EUR")
    assert resp.status_code == 200, resp.text[:300]
    body = resp.json()
    assert body["shippingCost"]["currencyCode"] == "EUR"
    assert body["items"]
    assert all(item["cost"]["currencyCode"] == "EUR" for item in body["items"])

