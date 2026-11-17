# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""
What the running stack serves besides the shop: its compose services, the
Jaeger UI configuration and the generated telemetry documentation.
"""

import json
import re

import pytest
import requests

from conftest import FRONTEND_PROXY_URL
from demo_stack import compose

TELEMETRY_DOCS = f"{FRONTEND_PROXY_URL}/telemetry/services"


@pytest.fixture(scope="module")
def compose_services():
    return compose("ps", "--services").stdout.split()


@pytest.mark.parametrize("service", ["product-reviews", "llm"])
def test_removed_service_is_not_running(compose_services, service):
    assert compose_services
    assert service not in compose_services


def test_jaeger_ui_uses_opentelemetry_terms():
    resp = requests.get(f"{FRONTEND_PROXY_URL}/jaeger/ui/", timeout=15)
    assert resp.status_code == 200
    match = re.search(r"JAEGER_CONFIG\s*=\s*(\{.*?\})\s*;", resp.text, re.S)
    assert match, "no embedded JAEGER_CONFIG"
    assert json.loads(match.group(1))["useOpenTelemetryTerms"] is True


def _attribute_rows(page):
    resp = requests.get(f"{TELEMETRY_DOCS}/{page}", timeout=15)
    assert resp.status_code == 200, f"{page} answered {resp.status_code}"
    rows = {}
    for row in re.findall(r"<tr>(.*?)</tr>", resp.text, re.S):
        cells = [re.sub(r"<[^>]+>", "", c).strip() for c in re.findall(r"<td>(.*?)</td>", row, re.S)]
        if cells:
            rows[cells[0]] = cells
    return rows


@pytest.mark.parametrize(
    "page,attribute,description",
    [
        ("payment.html", "demo.payment.card_cvv", "Credit card CVV"),
        ("payment.html", "demo.payment.card_number", "Credit card number"),
        ("load_generator.html", "demo.request.flood.count", "Number of repeated requests sent in a flood"),
    ],
)
def test_service_page_describes_attribute(page, attribute, description):
    rows = _attribute_rows(page)
    assert attribute in rows, sorted(rows)
    assert description in rows[attribute]


@pytest.mark.parametrize("attribute", ["user.hash", "user_agent.synthetic.type"])
def test_checkout_page_lists_attribute(attribute):
    assert attribute in _attribute_rows("checkout.html")


def test_product_reviews_page_is_gone():
    assert requests.get(f"{TELEMETRY_DOCS}/payment.html", timeout=15).status_code == 200
    for path in ("product_reviews.html", "product_reviews/"):
        assert requests.get(f"{TELEMETRY_DOCS}/{path}", timeout=15).status_code == 404
