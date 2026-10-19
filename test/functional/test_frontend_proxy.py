# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Routes of the frontend proxy (Envoy) and their names in the access log."""

import uuid

import pytest
import requests

from collector_spans import CollectorLog
from storefront_api import FRONTEND_PROXY_URL, HTTP_TIMEOUT

ACCESS_LOG_FLUSH_REQUESTS = 40


def get(path, **kwargs):
    return requests.get(f"{FRONTEND_PROXY_URL}{path}", timeout=HTTP_TIMEOUT, allow_redirects=False, **kwargs)


def test_images_served_by_image_provider():
    """R9a"""
    resp = get("/images/products/SolarFilter.jpg")
    assert resp.status_code == 200
    assert resp.headers["content-type"].startswith("image/")


@pytest.mark.parametrize("path", ["/grafana", "/jaeger", "/profiles", "/telemetry", "/loadgen", "/opamp", "/chatbot"])
def test_tool_paths_redirect_to_trailing_slash(path):
    """R9a"""
    resp = get(path)
    assert resp.status_code == 301
    assert resp.headers["location"].endswith(f"{path}/")


def test_loadgen_served_by_locust():
    """R9a"""
    resp = get("/loadgen/")
    assert resp.status_code == 200
    assert "locust" in resp.text.lower()


def test_feature_served_by_flagd_ui():
    """R9a, proxy-feature-routes-to-flagd-ui"""
    resp = requests.get(f"{FRONTEND_PROXY_URL}/feature", timeout=HTTP_TIMEOUT)
    assert resp.status_code == 200
    assert '"page":"/404"' not in resp.text
    assert "Flagd-ui" in resp.text


def test_otlp_http_served_by_collector():
    """R9a"""
    resp = requests.post(f"{FRONTEND_PROXY_URL}/otlp-http/v1/traces", json={}, timeout=HTTP_TIMEOUT)
    assert resp.status_code in (200, 400)
    assert '"page":"/404"' not in resp.text


def test_catch_all_serves_storefront():
    """R9b"""
    home = get("/")
    assert home.status_code == 200
    assert "text/html" in home.headers["content-type"]
    products = get("/api/products")
    assert products.status_code == 200
    assert isinstance(products.json(), list)


@pytest.mark.parametrize(
    "path, route_name",
    [("/api/products", "frontend"), ("/images/products/SolarFilter.jpg", "images"), ("/grafana", "grafana-redirect")],
)
def test_route_name_logged_as_url_template(path, route_name):
    """R9c"""
    user_agent = f"functional-test-{uuid.uuid4()}"
    with CollectorLog() as log:
        get(path, headers={"User-Agent": user_agent})
        # Envoy sends access log records once its buffer fills, so add traffic to flush it.
        for _ in range(ACCESS_LOG_FLUSH_REQUESTS):
            get("/api/products")
        records = log.wait_for_log_records(lambda r: r.attributes.get("user_agent.original") == user_agent)
    assert records, "no access log record for the request was exported"
    assert records[0].attributes.get("event.name") == "proxy.access"
    assert records[0].attributes.get("url.template") == route_name
