# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""The order confirmation email: order date and layout."""

import json
import re
from datetime import datetime, timezone
from html.parser import HTMLParser

from containers import docker

ORDER_REQUEST = {
    "email": "functional-test@example.com",
    "order": {
        "order_id": "order-functional-1",
        "shipping_tracking_id": "track-functional-1",
        "shipping_cost": {"currency_code": "USD", "units": 8, "nanos": 990000000},
        "shipping_address": {
            "street_address_1": "1600 Amphitheatre Parkway",
            "street_address_2": "Building 40",
            "city": "Mountain View",
            "state": "CA",
            "country": "United States",
            "zip_code": "94043",
        },
        "items": [
            {"item": {"product_id": "OLJCESPC7Z", "quantity": 2}, "cost": {"currency_code": "USD", "units": 101, "nanos": 960000000}},
            {"item": {"product_id": "L9ECAV7KIM", "quantity": 1}, "cost": {"currency_code": "USD", "units": 21, "nanos": 950000000}},
        ],
    },
}

SEND = (
    'require "net/http"; '
    'res = Net::HTTP.post(URI("http://127.0.0.1:6060/send_order_confirmation"), STDIN.read, '
    '"Content-Type" => "application/json"); print res.code'
)
RENDER = (
    'order = JSON.parse(STDIN.read, object_class: OpenStruct).order; '
    'puts ERB.new(File.read("views/confirmation.erb")).result(binding)'
)


class Sections(HTMLParser):
    """Collects the text of every element with a class, and the rows of every table."""

    def __init__(self):
        super().__init__()
        self.text = {}
        self.rows = {}
        self._open = []
        self._table = None
        self._row = None

    def handle_starttag(self, tag, attrs):
        cls = dict(attrs).get("class")
        if tag in ("br", "meta", "link"):
            return
        self._open.append(cls)
        if tag == "table":
            self._table = cls
            self.rows.setdefault(cls, [])
        elif tag == "tr":
            self._row = []
        elif tag in ("td", "th") and self._row is not None:
            self._row.append("")

    def handle_endtag(self, tag):
        if tag in ("br", "meta", "link"):
            return
        if self._open:
            self._open.pop()
        if tag == "tr" and self._row is not None:
            self.rows[self._table].append([" ".join(c.split()) for c in self._row])
            self._row = None

    def handle_data(self, data):
        for cls in self._open:
            if cls:
                self.text[cls] = self.text.get(cls, "") + data
        if self._row:
            self._row[-1] += data


def render():
    html = docker(
        "exec", "-i", "email", "ruby", "-rjson", "-rostruct", "-rerb", "-e", RENDER,
        input=json.dumps(ORDER_REQUEST),
    ).stdout
    sections = Sections()
    sections.feed(html)
    return html, sections


def test_r13_confirmation_endpoint_accepts_the_order():
    status = docker("exec", "-i", "email", "ruby", "-e", SEND, input=json.dumps(ORDER_REQUEST)).stdout
    assert status == "200"


def test_r13a_email_shows_the_order_date_in_utc():
    _, sections = render()
    today = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    assert ["Order date", today] in sections.rows["details"]


def test_r13b_email_keeps_order_details_in_the_new_layout():
    html, sections = render()
    order = ORDER_REQUEST["order"]
    assert "Your Order Confirmation" in sections.text["header"]
    assert "OpenTelemetry Astronomy Shop" in sections.text["footer"]

    details = {row[0]: row[1] for row in sections.rows["details"]}
    assert details["Order ID"] == order["order_id"]
    assert order["shipping_tracking_id"] in details["Shipping"]
    assert "8.990000000 USD" in details["Shipping"]
    for part in ("1600 Amphitheatre Parkway", "Building 40", "Mountain View", "United States", "94043"):
        assert part in details["Shipping"]

    items = sections.rows["items"][1:]
    assert len(items) == len(order["items"])
    for row, line in zip(items, order["items"]):
        assert row[0] == line["item"]["product_id"]
        assert row[1] == str(line["item"]["quantity"])
        assert row[2] == f'{line["cost"]["units"]}.{line["cost"]["nanos"]} USD'
    assert re.search(r"<style>.*\.items\s+th,\s*\.items\s+td\s*\{", html, re.S)
