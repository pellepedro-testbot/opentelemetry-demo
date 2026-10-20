# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Every service the release changes runs, and the storefront answers through the proxy."""

import pytest
import requests

from containers import container_state
from storefront import FRONTEND_PROXY_URL, HTTP_TIMEOUT

CHANGED_SERVICES = [
    "accounting", "ad", "cart", "checkout", "currency", "email", "frontend",
    "frontend-proxy", "payment", "product-catalog", "recommendation",
]


@pytest.mark.parametrize("service", CHANGED_SERVICES)
def test_r0c_changed_service_is_running(service):
    status, health = container_state(service)
    assert status == "running"
    assert health in ("", "healthy")


def test_r0c_storefront_answers_through_the_proxy():
    assert requests.get(f"{FRONTEND_PROXY_URL}/", timeout=HTTP_TIMEOUT).status_code == 200
    resp = requests.get(f"{FRONTEND_PROXY_URL}/api/products", timeout=HTTP_TIMEOUT)
    assert resp.status_code == 200
    assert resp.json()
