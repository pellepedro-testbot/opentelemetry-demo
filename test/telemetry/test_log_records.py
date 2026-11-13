# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Content of individual log records: the frontend's API request logs and the email
service's order confirmation event."""

import requests

from conftest import FRONTEND_PROXY_URL, poll_until
from storefront import order_with_items


def _latest_logs(opensearch_url, service, body, size=50):
    query = {
        "size": size,
        "query": {
            "bool": {
                "must": [
                    {"term": {"resource.service.name.keyword": service}},
                    {"match_phrase": {"body": body}},
                ]
            }
        },
        "sort": [{"@timestamp": "desc"}],
    }
    resp = requests.post(f"{opensearch_url}/otel-logs-*/_search", json=query, timeout=10)
    resp.raise_for_status()
    return [hit["_source"] for hit in resp.json()["hits"]["hits"]]


def test_frontend_api_request_log_reaches_opensearch(opensearch_url):
    """The frontend logs each API request with its method, path and status."""
    resp = requests.get(
        f"{FRONTEND_PROXY_URL}/api/products", params={"currencyCode": "USD"}, timeout=15
    )
    assert resp.status_code == 200

    def check():
        for record in _latest_logs(opensearch_url, "frontend", "API request completed"):
            attributes = record.get("attributes", {})
            if attributes.get("url.path") == "/api/products":
                return (
                    attributes.get("http.request.method") == "GET"
                    and int(attributes.get("http.response.status_code")) == 200
                )
        return False

    poll_until(check, "frontend 'API request completed' log for GET /api/products in OpenSearch")


def test_order_confirmation_log_has_event_name(opensearch_url):
    """The email service names its order confirmation log record."""
    _, resp = order_with_items([("0PUK6V6EV0", 1)])
    assert resp.status_code == 200, resp.text
    order_id = resp.json()["orderId"]

    def check():
        for record in _latest_logs(opensearch_url, "email", "Order confirmation email sent"):
            if record.get("attributes", {}).get("demo.order.id") == order_id:
                return record.get("eventName") == "email.confirmation_sent"
        return False

    poll_until(check, f"email log for order {order_id} with event name 'email.confirmation_sent'")
