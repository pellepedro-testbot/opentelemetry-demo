# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Routes, redirects, route names and streaming timeouts of the frontend proxy."""

import time
import uuid

import pytest
import requests

from conftest import FRONTEND_PROXY_URL, poll_until


def get(path, **kwargs):
    kwargs.setdefault("timeout", 15)
    return requests.get(f"{FRONTEND_PROXY_URL}{path}", **kwargs)


def first_picture():
    return get("/api/products").json()[0]["picture"]


def test_storefront_home():
    resp = get("/")
    assert resp.status_code == 200
    assert "text/html" in resp.headers["content-type"]


def test_product_images():
    resp = get(f"/images/products/{first_picture()}")
    assert resp.status_code == 200
    assert resp.headers["content-type"].startswith("image/")


def test_jaeger_ui():
    resp = get("/jaeger/ui/")
    assert resp.status_code == 200
    assert "Jaeger" in resp.text


def test_grafana():
    resp = get("/grafana/", allow_redirects=False)
    assert resp.status_code in (200, 302)
    if resp.status_code == 302:
        assert resp.headers["location"].startswith("/grafana/")


def test_feature_flag_ui():
    assert get("/feature").status_code == 200


def test_load_generator_ui():
    resp = get("/loadgen/")
    assert resp.status_code == 200
    assert "Locust" in resp.text


def test_flag_service():
    resp = requests.post(
        f"{FRONTEND_PROXY_URL}/flagservice/flagd.evaluation.v1.Service/ResolveAll",
        json={},
        headers={"Content-Type": "application/json"},
        timeout=15,
    )
    assert resp.status_code == 200
    assert "flags" in resp.json()


def test_otlp_http_intake():
    resp = requests.post(
        f"{FRONTEND_PROXY_URL}/otlp-http/v1/traces",
        json={},
        headers={"Content-Type": "application/json"},
        timeout=15,
    )
    assert resp.status_code == 200


def test_telemetry_docs():
    resp = get("/telemetry/")
    assert resp.status_code == 200
    assert "telemetry schema" in resp.text.lower()


@pytest.mark.parametrize(
    "path", ["/jaeger", "/grafana", "/loadgen", "/telemetry", "/profiles", "/chatbot", "/opamp"]
)
def test_bare_path_redirects_to_trailing_slash(path):
    resp = get(path, allow_redirects=False)
    assert resp.status_code == 301
    assert resp.headers["location"].endswith(f"{path}/")


def test_catch_all_serves_product_page():
    resp = get("/product/OLJCESPC7Z")
    assert resp.status_code == 200
    assert "text/html" in resp.headers["content-type"]


def test_catch_all_serves_storefront_api():
    resp = get("/api/products")
    assert resp.status_code == 200
    assert isinstance(resp.json(), list)


def _access_log_template(opensearch_url, marker):
    resp = requests.post(
        f"{opensearch_url}/otel-logs-*/_search",
        json={
            "size": 1,
            "query": {"bool": {"must": [
                {"match_phrase": {"resource.service.name": "frontend-proxy"}},
                {"match_phrase": {"body": marker}},
            ]}},
        },
        timeout=10,
    )
    resp.raise_for_status()
    hits = resp.json()["hits"]["hits"]
    return hits[0]["_source"]["attributes"]["url.template"] if hits else None


@pytest.mark.parametrize(
    "path,route",
    [("/images/products/{picture}", "images"), ("/api/products", "frontend")],
)
def test_route_name_is_logged_as_url_template(opensearch_url, path, route):
    marker = f"skyramp{uuid.uuid4().hex[:12]}"
    assert get(path.format(picture=first_picture()), params={"m": marker}).status_code == 200
    template = poll_until(
        lambda: _access_log_template(opensearch_url, marker),
        f"access log record for {marker}",
        timeout=90,
    )
    assert template == route


def test_flag_event_stream_outlives_default_route_timeout():
    started = time.monotonic()
    status = None
    try:
        with requests.post(
            f"{FRONTEND_PROXY_URL}/flagservice/flagd.evaluation.v1.Service/EventStream",
            # A Connect streaming request: one uncompressed, enveloped empty message.
            data=b"\x00\x00\x00\x00\x02{}",
            headers={"Content-Type": "application/connect+json"},
            stream=True,
            timeout=(5, 25),
        ) as resp:
            status = resp.status_code
            for _ in resp.iter_content(chunk_size=None):
                if time.monotonic() - started > 20:
                    break
    except requests.exceptions.ReadTimeout:
        pass
    assert status == 200
    assert time.monotonic() - started > 20
