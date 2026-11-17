# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

import json
import shutil
import subprocess
import uuid

import pytest
import requests

from conftest import add_to_cart, place_order, poll_until

RAW_PII_KEYS = {"user.email", "demo.payment.card_number", "demo.payment.card_cvv"}
CARD_PII_KEYS = {"demo.payment.card_number", "demo.payment.card_cvv"}


@pytest.fixture(scope="module")
def placed_order(frontend_url):
    with requests.Session() as session:
        user_id = f"order-telemetry-{uuid.uuid4()}"
        add_to_cart(session, user_id, "66VCHSJNUP")
        resp = place_order(session, user_id)
    assert resp.status_code == 200, resp.text
    return resp.json()


def _search_logs(opensearch_url, must):
    resp = requests.post(
        f"{opensearch_url}/otel-logs-*/_search",
        json={"size": 20, "query": {"bool": {"must": must}}},
        timeout=10,
    )
    resp.raise_for_status()
    return [hit["_source"] for hit in resp.json()["hits"]["hits"]]


def _docker(*args):
    if shutil.which("docker") is None:
        pytest.skip("needs the docker CLI to reach the container")
    return subprocess.run(["docker", *args], capture_output=True, text=True, timeout=30, check=True)


def _span_tags(span):
    return {tag["key"]: tag["value"] for tag in span["tags"]}


def test_placed_order_spans_carry_no_raw_pii(jaeger_url, placed_order):
    order_id = placed_order["orderId"]

    def find_trace():
        resp = requests.get(
            f"{jaeger_url}/jaeger/ui/api/traces",
            params={
                "service": "checkout",
                "operation": "oteldemo.CheckoutService/PlaceOrder",
                "tags": json.dumps({"demo.order.id": order_id}),
                "lookback": "10m",
                "limit": 1,
            },
            timeout=10,
        )
        resp.raise_for_status()
        traces = resp.json().get("data") or []
        if not traces:
            return None
        trace = traces[0]
        services = {pid: p["serviceName"] for pid, p in trace["processes"].items()}
        charges = [s for s in trace["spans"] if services[s["processID"]] == "payment" and s["operationName"] == "charge"]
        return trace if charges else None

    trace = poll_until(find_trace, f"checkout trace with demo.order.id={order_id} and its payment charge span", timeout=60)
    services = {pid: p["serviceName"] for pid, p in trace["processes"].items()}
    place_order_span = next(
        s for s in trace["spans"]
        if services[s["processID"]] == "checkout"
        and s["operationName"] == "oteldemo.CheckoutService/PlaceOrder"
        and _span_tags(s).get("demo.order.id") == order_id
    )
    charge_span = next(
        s for s in trace["spans"] if services[s["processID"]] == "payment" and s["operationName"] == "charge"
    )

    place_order_tags = _span_tags(place_order_span)
    charge_tags = _span_tags(charge_span)
    assert RAW_PII_KEYS.isdisjoint(place_order_tags), sorted(place_order_tags)
    assert "user.id" in place_order_tags
    assert CARD_PII_KEYS.isdisjoint(charge_tags), sorted(charge_tags)
    assert "demo.payment.card_type" in charge_tags


def test_frontend_api_request_logs_reach_the_logs_backend(frontend_url, opensearch_url):
    with requests.Session() as session:
        for _ in range(5):
            assert session.get(f"{frontend_url}/api/products", timeout=10).status_code == 200

    def find_records():
        return _search_logs(
            opensearch_url,
            [
                {"match": {"resource.service.name": "frontend"}},
                {"match_phrase": {"body": "API request completed"}},
                {"range": {"@timestamp": {"gte": "now-2m"}}},
            ],
        )

    records = poll_until(find_records, "frontend 'API request completed' records in OpenSearch", timeout=60)
    attributes = records[0]["attributes"]
    assert attributes.get("url.path") == "/api/products"
    assert attributes.get("http.request.method") == "GET"
    assert attributes.get("http.response.status_code") == 200


def test_checkout_confirmation_log_carries_order_id(opensearch_url, placed_order):
    order_id = placed_order["orderId"]

    def find_records():
        return _search_logs(
            opensearch_url,
            [
                {"match": {"resource.service.name": "checkout"}},
                {"match_phrase": {"body": "order confirmation email sent"}},
                {"match_phrase": {"attributes.demo.order.id": order_id}},
            ],
        )

    records = poll_until(find_records, f"checkout confirmation log for order {order_id}", timeout=60)
    assert records[0]["attributes"]["demo.order.id"] == order_id


def test_frontend_logs_order_placed_with_order_id(opensearch_url, placed_order):
    order_id = placed_order["orderId"]

    def in_logs_backend():
        return _search_logs(
            opensearch_url,
            [
                {"match": {"resource.service.name": "frontend"}},
                {"match_phrase": {"body": "Order placed successfully"}},
                {"match_phrase": {"attributes.demo.order.id": order_id}},
            ],
        )

    def in_container_output():
        lines = _docker("logs", "--since", "5m", "frontend").stdout.splitlines()
        for line in lines:
            if order_id not in line:
                continue
            try:
                record = json.loads(line)
            except ValueError:
                continue
            if record.get("msg") == "Order placed successfully" and record.get("demo.order.id") == order_id:
                return record
        return None

    def found():
        return in_logs_backend() or in_container_output()

    poll_until(found, f"frontend 'Order placed successfully' log for order {order_id}", timeout=60)


def test_accounting_keeps_full_shipping_cost(placed_order):
    tracking_id = placed_order["shippingTrackingId"]
    assert placed_order["shippingCost"] == {"currencyCode": "USD", "units": 8, "nanos": 990000000}
    query = (
        "select shipping_cost_units, shipping_cost_nanos from accounting.shipping "
        f"where shipping_tracking_id='{tracking_id}'"
    )

    def stored_row():
        out = _docker("exec", "astronomy-db", "psql", "-U", "postgres", "-d", "astronomy_db", "-tAc", query)
        return out.stdout.strip()

    row = poll_until(stored_row, f"accounting.shipping row for {tracking_id}", timeout=60)
    units, nanos = (int(v or 0) for v in row.split("|"))
    assert units + nanos / 1e9 == pytest.approx(8.99), row


def test_fraud_detection_logs_consumed_order_id(opensearch_url, placed_order):
    order_id = placed_order["orderId"]
    tracking_id = placed_order["shippingTrackingId"]

    def consumed(record_id):
        return _search_logs(
            opensearch_url,
            [
                {"match": {"resource.service.name": "fraud-detection"}},
                {"match_phrase": {"body": f"Consumed record with orderId: {record_id}"}},
            ],
        )

    def either():
        return consumed(order_id) or consumed(tracking_id)

    poll_until(either, f"fraud-detection consumed-record log for order {order_id}", timeout=60)
    assert consumed(order_id), f"no 'Consumed record with orderId: {order_id}' log"
    assert not consumed(tracking_id), f"logged the shipping tracking id {tracking_id} as the order id"
