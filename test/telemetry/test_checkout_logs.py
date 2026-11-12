# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""The frontend exports a log record for each checkout outcome to OpenSearch."""

import datetime

import pytest
import requests

from conftest import poll_until
from demo_shop import add_to_cart, empty_cart, flag, new_user_id, place_order


@pytest.fixture
def user_id():
    user = new_user_id("checkout-logs")
    yield user
    empty_cart(user)


def frontend_logs(opensearch_url, body, since, extra=None):
    must = [
        {"term": {"resource.service.name": "frontend"}},
        {"match_phrase": {"body": body}},
        {"range": {"observedTimestamp": {"gte": since}}},
    ]
    if extra:
        must.append(extra)

    def fetch():
        resp = requests.post(
            f"{opensearch_url}/otel-logs-*/_search",
            json={"size": 5, "query": {"bool": {"must": must}}},
            timeout=30,
        )
        resp.raise_for_status()
        return [hit["_source"] for hit in resp.json()["hits"]["hits"]]

    return poll_until(fetch, f"frontend log '{body}' in OpenSearch", timeout=120)


def test_checkout_outcomes_are_logged_by_frontend(opensearch_url, user_id):
    since = datetime.datetime.now(datetime.timezone.utc).isoformat()

    with flag("paymentFailure", "100%"):
        add_to_cart(user_id)
        declined = place_order(user_id)
    assert declined.status_code == 422, declined.text

    placed = place_order(user_id)
    assert placed.status_code == 200, placed.text
    order_id = placed.json()["orderId"]

    assert frontend_logs(opensearch_url, "Checkout payment declined", since)
    records = frontend_logs(
        opensearch_url,
        "Order placed successfully",
        since,
        {"match_phrase": {"attributes.demo.order.id": order_id}},
    )
    assert records[0]["attributes"]["demo.order.id"] == order_id
