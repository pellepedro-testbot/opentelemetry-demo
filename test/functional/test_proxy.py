# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""The frontend proxy's routes, their names in the access log and their retry policy."""

import time
import uuid

import pytest
import requests

from backends import poll_until
from containers import start, stop, wait_running
from storefront import FRONTEND_PROXY_URL, HTTP_TIMEOUT


def get(path, **headers):
    return requests.get(f"{FRONTEND_PROXY_URL}{path}", allow_redirects=False, headers=headers, timeout=HTTP_TIMEOUT)


@pytest.mark.parametrize(
    "path,status,location",
    [
        ("/", 200, None),
        ("/images/products/SolarFilter.jpg", 200, None),
        ("/jaeger", 301, "/jaeger/"),
        ("/jaeger/ui/", 200, None),
        ("/grafana", 301, "/grafana/"),
        ("/grafana/", 200, None),
        ("/telemetry", 301, "/telemetry/"),
        ("/telemetry/", 200, None),
        ("/loadgen", 301, "/loadgen/"),
        ("/opamp", 301, "/opamp/"),
        ("/opamp/", 200, None),
        ("/otlp-http/v1/traces", 405, None),
        ("/profiles", 301, "/profiles/"),
        ("/chatbot", 301, "/chatbot/"),
    ],
)
def test_r12a_previously_served_paths_still_work(path, status, location):
    resp = get(path)
    assert resp.status_code == status, resp.text[:200]
    if location:
        assert resp.headers["location"].endswith(location)


@pytest.mark.timeout(240)
def test_r12a_loadgen_ui_is_served():
    start("load-generator")
    try:
        poll_until(lambda: get("/loadgen/").status_code == 200, "load generator UI through /loadgen/", timeout=90, interval=3)
    finally:
        stop("load-generator")


def assert_flagd_ui(resp):
    assert resp.status_code == 200, f"{resp.status_code}: {resp.text[:200]}"
    assert "flagd" in resp.text.lower()
    assert "x-envoy-upstream-service-time" in resp.headers


def test_r12a_feature_flag_ui_is_reachable():
    resp = requests.get(f"{FRONTEND_PROXY_URL}/feature/", timeout=HTTP_TIMEOUT)
    assert_flagd_ui(resp)


def test_proxy_feature_ui_reachable():
    resp = get("/feature")
    if resp.status_code in (301, 302, 307, 308):
        resp = requests.get(f"{FRONTEND_PROXY_URL}/feature", timeout=HTTP_TIMEOUT)
    assert_flagd_ui(resp)


@pytest.mark.parametrize(
    "path,route",
    [("/images/products/SolarFilter.jpg", "images"), ("/api/products", "frontend"), ("/jaeger/ui/", "jaeger")],
)
def test_r12b_access_log_records_the_route_name(opensearch_url, path, route):
    agent = f"functional-test-{uuid.uuid4()}"
    get(path, **{"User-Agent": agent})

    def logged_template():
        resp = requests.post(
            f"{opensearch_url}/otel-logs-*/_search",
            json={"size": 1, "query": {"match_phrase": {"attributes.user_agent.original": agent}}},
            timeout=10,
        )
        resp.raise_for_status()
        hits = resp.json()["hits"]["hits"]
        return hits[0]["_source"]["attributes"].get("url.template") if hits else None

    assert poll_until(logged_template, f"access log of {path}", timeout=90, interval=3) == route


def retries(envoy_admin_url):
    stats = requests.get(f"{envoy_admin_url}/stats", params={"filter": "image-provider.upstream_rq_retry$"}, timeout=10)
    stats.raise_for_status()
    return int(stats.text.strip().rsplit(":", 1)[1])


@pytest.mark.timeout(240)
def test_r12c_image_route_retries_connection_failures(envoy_admin_url):
    stop("image-provider")
    try:
        time.sleep(2)
        before = retries(envoy_admin_url)
        resp = get(f"/images/products/missing-{uuid.uuid4()}.jpg")
        assert resp.status_code == 503
        assert retries(envoy_admin_url) - before == 2
    finally:
        start("image-provider")
        wait_running("image-provider")
