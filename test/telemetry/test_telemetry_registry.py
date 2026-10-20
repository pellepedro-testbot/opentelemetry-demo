# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Attributes the services emit are documented in the registry served by telemetry-docs."""

import pytest
import requests

from conftest import FRONTEND_PROXY_URL

ATTRIBUTE_PAGES = [
    "ad", "cart", "exchange", "feature_flag", "order", "payment",
    "product", "recommendation", "request", "shipping", "user",
]


@pytest.fixture(scope="module")
def registry_text():
    pages = []
    for page in ["index.html"] + [f"attributes/{name}.html" for name in ATTRIBUTE_PAGES]:
        resp = requests.get(f"{FRONTEND_PROXY_URL}/telemetry/{page}", timeout=10)
        if resp.status_code == 200:
            pages.append(resp.text)
    assert pages, "telemetry-docs served no pages"
    return "\n".join(pages)


@pytest.mark.parametrize(
    "attribute",
    [
        "demo.payment.card_network",
        "demo.payment.outcome",
        "demo.payment.card_hash",
        "demo.cart.count",
        "demo.ad.categories.count",
        "demo.product.search.query",
    ],
)
def test_new_attribute_is_in_the_registry(registry_text, attribute):
    assert attribute in registry_text
