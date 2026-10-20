# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Products through the storefront API, and product-catalog's PostgreSQL pool under a burst."""

import threading
import time
from concurrent.futures import ThreadPoolExecutor

import requests

from containers import container_ip, psql
from storefront import EXPLORASCOPE, FRONTEND_PROXY_URL, HTTP_TIMEOUT

# product-catalog caps its pool at this many connections.
MAX_CATALOG_CONNECTIONS = 2


def list_products():
    resp = requests.get(f"{FRONTEND_PROXY_URL}/api/products", timeout=HTTP_TIMEOUT)
    assert resp.status_code == 200
    return resp.json()


def burst(requests_count=50):
    """Fire concurrent product list and product page requests; returns (status, body, url) of each."""
    ids = [p["id"] for p in list_products()]
    urls = [
        f"{FRONTEND_PROXY_URL}/api/products" if i % 2 == 0
        else f"{FRONTEND_PROXY_URL}/api/products/{ids[i % len(ids)]}"
        for i in range(requests_count)
    ]

    def fetch(url):
        resp = requests.get(url, timeout=30)
        return resp.status_code, resp.json() if resp.status_code == 200 else resp.text, url

    with ThreadPoolExecutor(max_workers=requests_count) as pool:
        return list(pool.map(fetch, urls)), ids


def test_r2d_products_keep_every_field():
    products = list_products()
    assert products
    for product in products:
        for field in ("id", "name", "description", "picture", "priceUsd", "categories"):
            assert product.get(field), (product.get("id"), field)
        assert product["priceUsd"]["currencyCode"] == "USD"
    resp = requests.get(f"{FRONTEND_PROXY_URL}/api/products/{EXPLORASCOPE}", timeout=HTTP_TIMEOUT)
    assert resp.status_code == 200
    assert resp.json() == next(p for p in products if p["id"] == EXPLORASCOPE)


def test_r3a_concurrent_catalog_requests_all_succeed():
    results, ids = burst()
    for status, body, url in results:
        assert status == 200, (url, body)
        if url.endswith("/api/products"):
            assert sorted(p["id"] for p in body) == sorted(ids)
        else:
            assert body["id"] == url.rsplit("/", 1)[1]


def test_r3b_catalog_connections_stay_bounded_during_a_burst():
    catalog_ip = container_ip("product-catalog")
    samples = []
    done = threading.Event()

    def sample():
        while not done.is_set():
            rows = psql(f"SELECT count(*) FROM pg_stat_activity WHERE client_addr = '{catalog_ip}'")
            samples.append(int(rows[0][0]))
            time.sleep(0.05)

    sampler = threading.Thread(target=sample)
    sampler.start()
    try:
        for _ in range(3):
            results, _ = burst()
            assert all(status == 200 for status, _, _ in results)
    finally:
        done.set()
        sampler.join()
    samples.append(int(psql(f"SELECT count(*) FROM pg_stat_activity WHERE client_addr = '{catalog_ip}'")[0][0]))
    assert samples and max(samples) <= MAX_CATALOG_CONNECTIONS, samples
