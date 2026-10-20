# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

import os
import sys
from pathlib import Path

import pytest
import requests

# The Jaeger query and polling helpers are shared with the telemetry tests.
sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "telemetry"))

from storefront import FRONTEND_PROXY_URL  # noqa: E402

ENVOY_ADMIN_URL = os.environ.get("ENVOY_ADMIN_URL", "http://localhost:10000")
PROMETHEUS_URL = os.environ.get("PROMETHEUS_URL", "http://localhost:9090")


@pytest.fixture(scope="session", autouse=True)
def app_is_up():
    resp = requests.get(f"{FRONTEND_PROXY_URL}/api/products", timeout=15)
    assert resp.status_code == 200, (
        f"the demo is not answering on {FRONTEND_PROXY_URL}; start it with .skyramp/sut/setup.sh"
    )


@pytest.fixture(scope="session")
def jaeger_url():
    """Jaeger's UI and API, served through the frontend proxy."""
    return os.environ.get("JAEGER_URL", FRONTEND_PROXY_URL)


@pytest.fixture(scope="session")
def prometheus_url():
    return PROMETHEUS_URL


@pytest.fixture(scope="session")
def envoy_admin_url():
    return ENVOY_ADMIN_URL


@pytest.fixture(scope="session")
def opensearch_url():
    if os.environ.get("OPENSEARCH_URL"):
        return os.environ["OPENSEARCH_URL"]
    from containers import docker

    published = docker("port", "opensearch", "9200/tcp").stdout.splitlines()[0]
    return "http://localhost:" + published.rsplit(":", 1)[1]
