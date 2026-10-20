# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""The order confirmation email."""

import json
import uuid
from datetime import datetime, timezone

import requests

from conftest import poll_until
from docker_stack import container_logs, docker, host_port, requires_docker

pytestmark = requires_docker

# Renders views/confirmation.erb the way the email service does, for the order in ARGV[0].
RENDER_SCRIPT = (
    'require "erb"; require "json"; require "ostruct"; '
    "order = JSON.parse(ARGV[0], object_class: OpenStruct); "
    'puts ERB.new(File.read("views/confirmation.erb")).result_with_hash(order: order)'
)


def confirmation_order(order_id):
    return {
        "order_id": order_id,
        "shipping_tracking_id": "track-" + order_id[:8],
        "shipping_cost": {"units": 8, "nanos": 990000000, "currency_code": "USD"},
        "shipping_address": {
            "street_address_1": "1600 Amphitheatre Parkway",
            "street_address_2": "",
            "city": "Mountain View",
            "state": "CA",
            "country": "US",
            "zip_code": "94043",
        },
        "items": [
            {"item": {"product_id": "OLJCESPC7Z", "quantity": 2},
             "cost": {"units": 101, "nanos": 960000000, "currency_code": "USD"}},
            {"item": {"product_id": "66VCHSJNUP", "quantity": 1},
             "cost": {"units": 349, "nanos": 950000000, "currency_code": "USD"}},
        ],
    }


def test_confirmation_is_accepted_and_sent():
    order_id = str(uuid.uuid4())
    port = host_port("email", 6060)
    resp = requests.post(
        f"http://localhost:{port}/send_order_confirmation",
        json={"email": "a@b.c", "order": confirmation_order(order_id)},
        timeout=15,
    )
    assert resp.status_code == 200, resp.text
    poll_until(
        lambda: f"Order confirmation email sent for order {order_id}" in container_logs("email"),
        "confirmation email log line",
        timeout=30,
        interval=2,
    )


def test_confirmation_shows_order_date_and_layout():
    order_id = str(uuid.uuid4())
    order = confirmation_order(order_id)
    html = docker("exec", "email", "ruby", "-e", RENDER_SCRIPT, json.dumps(order)).stdout
    today = datetime.now(timezone.utc).strftime("%Y-%m-%d")

    assert "Order date" in html
    after_label = html.split("Order date", 1)[1]
    assert today in after_label[:200]
    assert 'class="header"' in html
    assert 'class="details"' in html
    assert 'class="items"' in html
    assert 'class="footer"' in html
    details = html.split('class="details"', 1)[1].split("</table>", 1)[0]
    assert order_id in details
    items = html.split('class="items"', 1)[1].split("</table>", 1)[0]
    for item in order["items"]:
        assert item["item"]["product_id"] in items
