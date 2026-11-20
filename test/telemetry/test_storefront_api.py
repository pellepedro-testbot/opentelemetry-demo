# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Storefront API through the frontend proxy: checkout outcomes (declined card,
non-payment failure, success), the log lines and spans the frontend writes for
them, the API request log lines, and routes that were added or removed."""

import time

import pytest
import requests

import shop
from conftest import poll_until
from shop import traceparent

DECLINE_MESSAGE = "Your payment could not be processed. Please check your card details and try again."
CHECKOUT_ROUTE_SPAN = "executing api route (pages) /api/checkout"


def frontend_lines(trace_id, since, settle=2):
    time.sleep(settle)
    return [line for line in shop.container_json_logs("frontend", since) if line.get("trace_id") == trace_id]


def lines_with(lines, msg):
    return [line for line in lines if line.get("msg") == msg]


def frontend_span(trace_id, name):
    def find():
        trace = shop.jaeger_trace(trace_id)
        if not trace:
            return None
        found = shop.spans(trace, "frontend", name)
        return found[0] if found else None

    return poll_until(find, f"frontend span {name} in trace {trace_id}", timeout=90)


def has_error_status(span):
    tags = shop.tags_of(span)
    return tags.get("otel.status_code") == "ERROR" or tags.get("error") is True


def frontend_record(trace_id, body, timeout=60):
    docs = shop.os_wait(
        shop.bool_must(shop.term("traceId", trace_id), shop.match_phrase("body", body)),
        predicate=lambda d: shop.resource_service(d) == "frontend" and d.get("body") == body,
        description=f"frontend log record '{body}' for trace {trace_id} in OpenSearch",
        timeout=timeout,
    )
    return docs[0]


def run_checkout(user_id, **kwargs):
    trace_id, headers = traceparent()
    since = shop.utc_now()
    resp = shop.checkout(user_id, headers=headers, **kwargs)
    return {"user": user_id, "resp": resp, "trace_id": trace_id, "since": since}


def fresh_cart(product_id=shop.RED_FLASHLIGHT, quantity=1):
    user_id = shop.new_user()
    shop.add_to_cart(user_id, product_id, quantity)
    return user_id


@pytest.fixture(scope="module")
def declined():
    user_id = fresh_cart()
    result = run_checkout(user_id, card_number="1234")
    result["cart_after"] = shop.get_cart(user_id)
    result["lines"] = frontend_lines(result["trace_id"], result["since"])
    yield result
    shop.empty_cart(user_id)


@pytest.fixture(scope="module")
def succeeded():
    user_id = fresh_cart()
    result = run_checkout(user_id)
    result["cart_after"] = shop.get_cart(user_id)
    result["lines"] = frontend_lines(result["trace_id"], result["since"])
    yield result
    shop.empty_cart(user_id)


@pytest.fixture(scope="module")
def payment_unreachable():
    user_id = fresh_cart()
    with shop.flag("paymentUnreachable", "on"):
        result = run_checkout(user_id)
    result["cart_after"] = shop.get_cart(user_id)
    result["lines"] = frontend_lines(result["trace_id"], result["since"])
    yield result
    shop.empty_cart(user_id)


@pytest.fixture(scope="module")
def catalog_failure():
    user_id = fresh_cart(shop.TARGETED_PRODUCT)
    with shop.product_catalog_failure():
        result = run_checkout(user_id)
    result["lines"] = frontend_lines(result["trace_id"], result["since"])
    yield result
    shop.empty_cart(user_id)


@pytest.fixture(scope="module")
def api_calls():
    """One request of each kind, each under its own trace id."""
    calls = {}
    since = shop.utc_now()
    user_id = shop.new_user()
    requests_to_send = {
        "products": ("GET", "/api/products?currencyCode=USD", None),
        "product": ("GET", f"/api/products/{shop.TARGETED_PRODUCT}", None),
        "cart": ("POST", "/api/cart", {"userId": user_id, "item": {"productId": shop.TARGETED_PRODUCT, "quantity": 1}}),
        "shipping": ("GET", "/api/shipping", None),
        "checkout_get": ("GET", "/api/checkout", None),
    }
    for name, (method, path, body) in requests_to_send.items():
        trace_id, headers = traceparent()
        resp = requests.request(method, shop.url(path), json=body, headers=headers, timeout=15)
        calls[name] = {"trace_id": trace_id, "status": resp.status_code}
    time.sleep(2)
    all_lines = shop.container_json_logs("frontend", since)
    for call in calls.values():
        call["lines"] = [line for line in all_lines if line.get("trace_id") == call["trace_id"]]
    yield calls
    shop.empty_cart(user_id)


# --- declined card -------------------------------------------------------------


def test_declined_card_answers_422(declined):
    assert declined["resp"].status_code == 422, declined["resp"].text


def test_declined_card_answer_has_the_customer_message(declined):
    assert declined["resp"].json()["error"] == DECLINE_MESSAGE


def test_declined_card_answer_has_code_payment_failed(declined):
    assert declined["resp"].json()["code"] == "PAYMENT_FAILED"


def test_declined_card_answer_holds_only_error_and_code(declined):
    assert set(declined["resp"].json().keys()) == {"error", "code"}


def test_expired_card_is_declined_with_payment_failed():
    user_id = fresh_cart()
    try:
        resp = shop.checkout(user_id, year=2020)
        assert resp.status_code == 422, resp.text
        assert resp.json()["code"] == "PAYMENT_FAILED"
    finally:
        shop.empty_cart(user_id)


def test_card_type_payment_does_not_accept_is_declined_with_payment_failed():
    user_id = fresh_cart()
    try:
        resp = shop.checkout(user_id, card_number="378282246310005")
        assert resp.status_code == 422, resp.text
        assert resp.json()["code"] == "PAYMENT_FAILED"
    finally:
        shop.empty_cart(user_id)


def test_cart_keeps_its_items_after_a_declined_card(declined):
    assert [i["productId"] for i in declined["cart_after"]["items"]] == [shop.RED_FLASHLIGHT]


def test_decline_log_details_start_with_charge_failure(declined):
    lines = lines_with(declined["lines"], "Checkout payment declined")
    assert lines, "no 'Checkout payment declined' line for the request"
    assert lines[0]["details"].startswith("failed to charge card:")


def test_decline_writes_one_info_line(declined):
    lines = lines_with(declined["lines"], "Checkout payment declined")
    assert len(lines) == 1
    assert lines[0]["level"] == 30


def test_decline_writes_no_failed_to_place_order_line(declined):
    assert lines_with(declined["lines"], "Checkout failed to place order") == []


def test_decline_also_logs_api_request_completed_with_422(declined):
    lines = lines_with(declined["lines"], "API request completed")
    assert [line["http.response.status_code"] for line in lines] == [422]


def test_declined_checkout_span_has_error_status(declined):
    assert has_error_status(frontend_span(declined["trace_id"], CHECKOUT_ROUTE_SPAN))


def test_declined_checkout_span_carries_an_exception_event(declined):
    span = frontend_span(declined["trace_id"], CHECKOUT_ROUTE_SPAN)
    assert "exception" in [name for name, _ in shop.events_of(span)]


def test_decline_log_record_reaches_opensearch_with_details(declined):
    doc = frontend_record(declined["trace_id"], "Checkout payment declined")
    assert str(shop.attr(doc, "details")).startswith("failed to charge card:")


def test_payment_failure_flag_decline_does_not_expose_internal_text():
    user_id = fresh_cart()
    try:
        with shop.flag("paymentFailure", "100%"):
            resp = shop.checkout(user_id)
        assert resp.status_code == 422, resp.text
        assert resp.json()["code"] == "PAYMENT_FAILED"
        assert "Invalid token" not in resp.text
        assert "loyalty_level" not in resp.text
    finally:
        shop.empty_cart(user_id)


# --- failures that are not a payment decline -------------------------------------


def test_payment_unreachable_answers_500_without_code(payment_unreachable):
    resp = payment_unreachable["resp"]
    assert resp.status_code == 500, resp.text
    assert "code" not in resp.json()


def test_cart_keeps_its_items_after_payment_unreachable(payment_unreachable):
    assert [i["productId"] for i in payment_unreachable["cart_after"]["items"]] == [shop.RED_FLASHLIGHT]


def test_payment_unreachable_checkout_span_has_error_status(payment_unreachable):
    assert has_error_status(frontend_span(payment_unreachable["trace_id"], CHECKOUT_ROUTE_SPAN))


def test_catalog_failure_answers_generic_500_body(catalog_failure):
    resp = catalog_failure["resp"]
    assert resp.status_code == 500, resp.text
    assert resp.json() == {"error": "Failed to place order."}


@pytest.mark.parametrize("scenario", ["payment_unreachable", "catalog_failure"])
def test_non_payment_failure_writes_no_decline_line(request, scenario):
    outcome = request.getfixturevalue(scenario)
    assert lines_with(outcome["lines"], "Checkout payment declined") == []


@pytest.mark.parametrize("scenario", ["payment_unreachable", "catalog_failure"])
def test_non_payment_failure_logs_error_line_with_err(request, scenario):
    outcome = request.getfixturevalue(scenario)
    lines = lines_with(outcome["lines"], "Checkout failed to place order")
    assert len(lines) == 1
    assert lines[0]["level"] == 50
    assert lines[0].get("err")


def test_unreachable_failed_to_place_order_record_reaches_opensearch_with_exception_message(payment_unreachable):
    doc = frontend_record(payment_unreachable["trace_id"], "Checkout failed to place order")
    assert shop.attr(doc, "exception.message")


def test_empty_checkout_body_answers_500_with_generic_error():
    resp = requests.post(shop.url("/api/checkout"), json={}, timeout=15)
    assert resp.status_code == 500
    assert resp.json() == {"error": "Failed to place order."}


def test_shipping_error_names_the_shipping_service():
    user_id = fresh_cart()
    try:
        address = dict(shop.US_ADDRESS, state="")
        outcome = run_checkout(user_id, address=address)
        lines = lines_with(frontend_lines(outcome["trace_id"], outcome["since"]), "Checkout failed to place order")
        assert lines, f"no 'Checkout failed to place order' line; answer {outcome['resp'].status_code}"
        details = str(lines[0]["err"].get("details", lines[0]["err"]))
        assert "failed POST to shipping service: expected 200, got 400" in details
        assert "email service" not in details
    finally:
        shop.empty_cart(user_id)


# --- successful checkout -------------------------------------------------------------


def test_successful_checkout_answers_order_details(succeeded):
    resp = succeeded["resp"]
    assert resp.status_code == 200, resp.text
    body = resp.json()
    for key in ("orderId", "shippingTrackingId", "shippingCost", "shippingAddress", "items"):
        assert body.get(key), f"missing {key}"


def test_cart_is_empty_after_successful_checkout(succeeded):
    assert succeeded["cart_after"]["items"] == []


def test_order_placed_log_carries_the_order_id(succeeded):
    lines = lines_with(succeeded["lines"], "Order placed successfully")
    assert lines and lines[0]["demo.order.id"] == succeeded["resp"].json()["orderId"]


def test_order_placed_is_logged_once_at_info(succeeded):
    lines = lines_with(succeeded["lines"], "Order placed successfully")
    assert len(lines) == 1
    assert lines[0]["level"] == 30


def test_successful_checkout_logs_no_failure_lines(succeeded):
    assert lines_with(succeeded["lines"], "Checkout payment declined") == []
    assert lines_with(succeeded["lines"], "Checkout failed to place order") == []


def test_order_placed_record_reaches_opensearch_with_order_id(succeeded):
    doc = frontend_record(succeeded["trace_id"], "Order placed successfully")
    assert shop.attr(doc, "demo.order.id") == succeeded["resp"].json()["orderId"]


def test_checkout_in_eur_answers_costs_in_eur():
    user_id = fresh_cart(shop.TARGETED_PRODUCT, 2)
    try:
        resp = shop.checkout(user_id, currency="EUR")
        assert resp.status_code == 200, resp.text
        body = resp.json()
        assert [i["cost"]["currencyCode"] for i in body["items"]] == ["EUR"]
        assert body["shippingCost"]["currencyCode"] == "EUR"
    finally:
        shop.empty_cart(user_id)


# --- API request log lines ---------------------------------------------------------------


def test_products_request_logged_once_at_info(api_calls):
    lines = lines_with(api_calls["products"]["lines"], "API request completed")
    assert len(lines) == 1
    assert lines[0]["level"] == 30


def test_logged_url_path_leaves_out_the_query_string(api_calls):
    lines = lines_with(api_calls["products"]["lines"], "API request completed")
    assert [line["url.path"] for line in lines] == ["/api/products"]


def test_products_line_has_method_get_and_status_200(api_calls):
    line = lines_with(api_calls["products"]["lines"], "API request completed")[0]
    assert line["http.request.method"] == "GET"
    assert line["http.response.status_code"] == 200


def test_cart_post_logged_with_method_and_path(api_calls):
    lines = lines_with(api_calls["cart"]["lines"], "API request completed")
    assert [(line["http.request.method"], line["url.path"]) for line in lines] == [("POST", "/api/cart")]


def test_product_detail_logged_with_its_path(api_calls):
    lines = lines_with(api_calls["product"]["lines"], "API request completed")
    assert [line["url.path"] for line in lines] == [f"/api/products/{shop.TARGETED_PRODUCT}"]


def test_get_checkout_answers_405_and_logs_it(api_calls):
    assert api_calls["checkout_get"]["status"] == 405
    lines = lines_with(api_calls["checkout_get"]["lines"], "API request completed")
    assert [line["http.response.status_code"] for line in lines] == [405]


def test_throwing_handler_answers_500_and_logs_request_failed(api_calls):
    assert api_calls["shipping"]["status"] == 500
    lines = lines_with(api_calls["shipping"]["lines"], "API request failed")
    assert len(lines) == 1
    assert lines[0]["level"] == 50


def test_request_failed_line_has_method_path_and_status(api_calls):
    line = lines_with(api_calls["shipping"]["lines"], "API request failed")[0]
    assert line["http.request.method"] == "GET"
    assert line["url.path"] == "/api/shipping"
    assert line["http.response.status_code"] == 500


def test_request_failed_line_holds_the_thrown_error(api_calls):
    line = lines_with(api_calls["shipping"]["lines"], "API request failed")[0]
    assert line.get("err", {}).get("message")


def test_throwing_handler_writes_no_request_completed_line(api_calls):
    assert lines_with(api_calls["shipping"]["lines"], "API request completed") == []


def test_api_request_log_records_reach_opensearch(api_calls):
    doc = frontend_record(api_calls["products"]["trace_id"], "API request completed")
    assert shop.attr(doc, "http.request.method") == "GET"
    assert shop.attr(doc, "url.path") == "/api/products"


def test_frontend_no_longer_exports_its_request_counter(api_calls):
    time.sleep(65)
    assert shop.prom("app_frontend_requests_total") == []


# --- pages and routes ---------------------------------------------------------------------------


def test_unknown_page_answers_404_page():
    resp = requests.get(shop.url("/this-page-does-not-exist"), timeout=15)
    assert resp.status_code == 404
    assert '<title data-next-head="">Otel Demo - Page Not Found</title>' in resp.text
    assert ">404</h1>" in resp.text
    assert "This page could not be found." in resp.text


@pytest.mark.parametrize("path", [
    f"/api/product-reviews/{shop.TARGETED_PRODUCT}",
    f"/api/product-reviews-avg-score/{shop.TARGETED_PRODUCT}",
])
def test_product_review_routes_are_gone(path):
    assert requests.get(shop.url(path), timeout=15).status_code == 404


def test_ask_ai_assistant_route_is_gone():
    resp = requests.post(
        shop.url(f"/api/product-ask-ai-assistant/{shop.TARGETED_PRODUCT}"),
        json={"question": "Is it good?"},
        timeout=15,
    )
    assert resp.status_code == 404


def test_header_cart_icon_src_is_relative():
    html = requests.get(shop.url("/"), timeout=15).text
    start = html.index('alt="Cart icon"')
    tag = html[html.rindex("<img", 0, start):html.index(">", start)]
    src = tag.split(' src="', 1)[1].split('"', 1)[0]
    assert src.startswith("/icons/CartIcon.svg?w=")
    assert "http://localhost:8080" not in tag


@pytest.mark.parametrize("path", ["/opamp", "/profiles", "/chatbot"])
def test_proxy_redirects_to_trailing_slash(path):
    resp = requests.get(shop.url(path), allow_redirects=False, timeout=15)
    assert resp.status_code == 301
    assert resp.headers["Location"].endswith(f"{path}/")
