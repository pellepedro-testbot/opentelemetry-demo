# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""The order confirmation email: the send endpoint and the deployed template."""

import json
import os
import re
import subprocess
from datetime import datetime, timezone

import requests

EMAIL_URL = os.environ.get("EMAIL_URL", "http://localhost:6060")
EMAIL_CONTAINER = os.environ.get("EMAIL_CONTAINER", "email")
TEMPLATE = "/email_server/views/confirmation.erb"

ORDER = {
    "order_id": "t-1",
    "shipping_tracking_id": "trk",
    "shipping_cost": {"currency_code": "USD", "units": 5, "nanos": 0},
    "shipping_address": {
        "street_address_1": "1 Main",
        "street_address_2": "",
        "city": "X",
        "country": "US",
        "zip_code": "1",
    },
    "items": [
        {
            "item": {"product_id": "OLJCESPC7Z", "quantity": 2},
            "cost": {"currency_code": "USD", "units": 101, "nanos": 960000000},
        }
    ],
}

RENDER = (
    "o = JSON.parse(ARGV[1], object_class: OpenStruct); "
    "puts ERB.new(File.read(ARGV[0])).result_with_hash(order: o)"
)


def render_confirmation():
    return subprocess.run(
        ["docker", "exec", EMAIL_CONTAINER, "ruby", "-rerb", "-rostruct", "-rjson", "-e", RENDER, TEMPLATE, json.dumps(ORDER)],
        check=True,
        capture_output=True,
        text=True,
        timeout=30,
    ).stdout


def test_send_order_confirmation_succeeds():
    """R10a"""
    resp = requests.post(
        f"{EMAIL_URL}/send_order_confirmation", json={"email": "a@b.c", "order": ORDER}, timeout=15
    )
    assert resp.status_code == 200, resp.text


def test_confirmation_shows_order_date_and_layout():
    """R10b"""
    body = render_confirmation()
    today = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    assert re.search(r"Order date</td>\s*<td>" + today + "</td>", body), body
    assert 'class="header"' in body
    assert 'class="footer"' in body

    details = re.search(r'<table class="details">(.*?)</table>', body, re.S)
    assert details, body
    assert "t-1" in details.group(1)
    assert "trk" in details.group(1)
    assert "5.0 USD" in details.group(1)
    assert "1 Main" in details.group(1)

    items = re.search(r'<table class="items">(.*?)</table>', body, re.S)
    assert items, body
    assert re.search(r"<td>OLJCESPC7Z</td>\s*<td>2</td>", items.group(1)), items.group(1)
