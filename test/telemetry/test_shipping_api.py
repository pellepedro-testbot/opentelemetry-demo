# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

import json
import secrets
import time

import pytest
import requests

from conftest import FRONTEND_PROXY_URL, poll_until


SHIPPING_URL = f"{FRONTEND_PROXY_URL}/api/shipping"
REQUEST_TIMEOUT = 10

ADDRESS = json.dumps({
    "streetAddress": "1600 Amphitheatre Parkway",
    "zipCode": "94043",
    "city": "Mountain View",
    "state": "CA",
    "country": "United States",
})
THREE_ITEMS = json.dumps([{"productId": "OLJCESPC7Z", "quantity": 3}])


def _get(params, headers=None):
    return requests.get(SHIPPING_URL, params=params, headers=headers, timeout=REQUEST_TIMEOUT)


def _amount(money):
    return int(money["units"]) + int(money["nanos"]) / 1e9


def _assert_rejected(resp, wrong_param, other_param):
    assert resp.status_code == 400, resp.text
    body = resp.json()
    assert isinstance(body, dict), body
    error = body.get("error")
    assert isinstance(error, str) and error, body
    assert wrong_param in error, body
    assert other_param not in error, body


def _assert_method_refused(resp, started):
    assert time.monotonic() - started < REQUEST_TIMEOUT
    assert resp.status_code == 405
    assert resp.headers.get("Allow") == "GET"
    assert len(resp.content) == 0


@pytest.mark.parametrize("params", [
    {"currencyCode": "USD", "address": ADDRESS},
    {"itemList": "", "currencyCode": "USD", "address": ADDRESS},
], ids=["missing", "empty-string"])
def test_shipping_rejects_missing_item_list(params):
    _assert_rejected(_get(params), "itemList", "address")


@pytest.mark.parametrize("params", [
    {"currencyCode": "USD", "itemList": THREE_ITEMS},
    {"currencyCode": "USD", "itemList": THREE_ITEMS, "address": ""},
], ids=["missing", "empty-string"])
def test_shipping_rejects_missing_address(params):
    _assert_rejected(_get(params), "address", "itemList")


def test_shipping_rejects_empty_item_list():
    resp = _get({"itemList": "[]", "currencyCode": "USD", "address": ADDRESS})
    _assert_rejected(resp, "itemList", "address")


@pytest.mark.parametrize("item_list", [
    "not-json",
    '[{"productId": "OLJCESPC7Z"',
], ids=["not-json", "truncated-array"])
def test_shipping_rejects_item_list_that_is_not_json(item_list):
    resp = _get({"itemList": item_list, "currencyCode": "USD", "address": ADDRESS})
    _assert_rejected(resp, "itemList", "address")


def test_shipping_rejects_address_that_is_an_array():
    resp = _get({"itemList": THREE_ITEMS, "currencyCode": "USD", "address": "[]"})
    _assert_rejected(resp, "address", "itemList")


@pytest.mark.parametrize("item_list", [
    '{"productId": "OLJCESPC7Z", "quantity": 3}',
    "3",
    '"OLJCESPC7Z"',
    "null",
], ids=["object", "number", "string", "null"])
def test_shipping_rejects_item_list_that_is_not_an_array(item_list):
    resp = _get({"itemList": item_list, "currencyCode": "USD", "address": ADDRESS})
    _assert_rejected(resp, "itemList", "address")


@pytest.mark.parametrize("address", [
    "null",
    "42",
    '"Mountain View"',
    "not-json",
], ids=["null", "number", "string", "not-json"])
def test_shipping_rejects_address_that_is_not_an_object(address):
    resp = _get({"itemList": THREE_ITEMS, "currencyCode": "USD", "address": address})
    _assert_rejected(resp, "address", "itemList")


def test_shipping_rejects_request_missing_both_parameters():
    resp = _get({"currencyCode": "USD"})
    assert resp.status_code == 400, resp.text
    error = resp.json().get("error")
    assert isinstance(error, str), resp.text
    assert "itemList" in error or "address" in error, error


def test_shipping_rejects_repeated_item_list():
    params = [
        ("itemList", THREE_ITEMS),
        ("itemList", THREE_ITEMS),
        ("currencyCode", "USD"),
        ("address", ADDRESS),
    ]
    _assert_rejected(_get(params), "itemList", "address")


def _resource_service_name(resource):
    for attr in resource.get("attributes", []):
        if attr.get("key") == "service.name":
            return attr.get("value", {}).get("stringValue")
    return None


def _trace_service_names(jaeger_url, trace_id):
    resp = requests.get(f"{jaeger_url}/jaeger/ui/api/v3/traces/{trace_id}", timeout=5)
    if resp.status_code != 200:
        return set()
    resource_spans = resp.json().get("result", {}).get("resourceSpans") or []
    return {_resource_service_name(rs.get("resource", {})) for rs in resource_spans}


def _traced_quote(item_list):
    trace_id = secrets.token_hex(16)
    traceparent = f"00-{trace_id}-{secrets.token_hex(8)}-01"
    resp = _get(
        {"itemList": item_list, "currencyCode": "EUR", "address": ADDRESS},
        headers={"traceparent": traceparent},
    )
    return trace_id, resp


def test_rejected_shipping_request_calls_no_backend_service(jaeger_url):
    trace_id, resp = _traced_quote("[]")
    assert resp.status_code == 400

    poll_until(
        lambda: {"frontend", "frontend-proxy"} <= _trace_service_names(jaeger_url, trace_id),
        f"frontend spans of trace {trace_id} in Jaeger",
        timeout=45,
        interval=3,
    )
    time.sleep(5)
    services = _trace_service_names(jaeger_url, trace_id)
    assert "shipping" not in services, services
    assert "currency" not in services, services


def test_accepted_shipping_request_trace_reaches_shipping_and_currency(jaeger_url):
    trace_id, resp = _traced_quote(THREE_ITEMS)
    assert resp.status_code == 200, resp.text

    poll_until(
        lambda: {"frontend", "shipping", "currency"} <= _trace_service_names(jaeger_url, trace_id),
        f"frontend, shipping and currency spans of trace {trace_id} in Jaeger",
        timeout=45,
        interval=3,
    )


@pytest.mark.parametrize("kwargs", [
    {"json": {"itemList": [{"productId": "OLJCESPC7Z", "quantity": 3}]}},
    {},
], ids=["json-body", "no-body"])
def test_shipping_refuses_post(kwargs):
    started = time.monotonic()
    resp = requests.post(SHIPPING_URL, timeout=REQUEST_TIMEOUT, **kwargs)
    _assert_method_refused(resp, started)


@pytest.mark.parametrize("method", ["PUT", "DELETE"])
def test_shipping_refuses_put_and_delete(method):
    started = time.monotonic()
    resp = requests.request(method, SHIPPING_URL, timeout=REQUEST_TIMEOUT)
    _assert_method_refused(resp, started)


def test_shipping_refuses_patch():
    started = time.monotonic()
    resp = requests.patch(SHIPPING_URL, timeout=REQUEST_TIMEOUT)
    _assert_method_refused(resp, started)


def test_shipping_refuses_post_with_valid_quote_parameters():
    started = time.monotonic()
    resp = requests.post(
        SHIPPING_URL,
        params={"itemList": THREE_ITEMS, "currencyCode": "USD", "address": ADDRESS},
        timeout=REQUEST_TIMEOUT,
    )
    _assert_method_refused(resp, started)


@pytest.mark.parametrize("item_list", [
    THREE_ITEMS,
    json.dumps([
        {"productId": "OLJCESPC7Z", "quantity": 1},
        {"productId": "66VCHSJNUP", "quantity": 2},
    ]),
], ids=["one-entry", "two-entries"])
def test_shipping_quotes_three_items_in_usd(item_list):
    resp = _get({"itemList": item_list, "currencyCode": "USD", "address": ADDRESS})
    assert resp.status_code == 200, resp.text
    cost = resp.json()
    assert cost["currencyCode"] == "USD"
    assert int(cost["units"]) == 26
    assert abs(_amount(cost) - 26.97) <= 1e-8, cost


def test_shipping_quote_defaults_to_usd():
    resp = _get({"itemList": json.dumps([{"productId": "OLJCESPC7Z", "quantity": 1}]), "address": ADDRESS})
    assert resp.status_code == 200, resp.text
    cost = resp.json()
    assert cost["currencyCode"] == "USD"
    assert abs(_amount(cost) - 8.99) <= 1e-8, cost
