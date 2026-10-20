# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""The product-catalog's PostgreSQL connection pool under a burst of requests."""

import threading
import time
from concurrent.futures import ThreadPoolExecutor

import requests

from conftest import FRONTEND_PROXY_URL
from docker_stack import container_ip, psql, requires_docker

pytestmark = requires_docker

BURST = 100
MAX_CONNECTIONS = 10


def catalog_connections(ip):
    """pid|backend_start of every product-catalog connection to the demo database."""
    rows = psql(
        "SELECT pid || '|' || backend_start FROM pg_stat_activity"
        f" WHERE client_addr = '{ip}' AND datname = 'astronomy_db' ORDER BY pid"
    )
    return rows.splitlines()


def get_product():
    return requests.get(f"{FRONTEND_PROXY_URL}/api/products/OLJCESPC7Z", timeout=30).status_code


def test_burst_opens_bounded_connections():
    ip = container_ip("product-catalog")
    peak = 0
    done = threading.Event()

    def sample():
        nonlocal peak
        while not done.is_set():
            peak = max(peak, len(catalog_connections(ip)))
            time.sleep(0.2)

    sampler = threading.Thread(target=sample)
    sampler.start()
    try:
        with ThreadPoolExecutor(max_workers=BURST) as pool:
            statuses = list(pool.map(lambda _: get_product(), range(BURST)))
    finally:
        done.set()
        sampler.join()
    assert statuses == [200] * BURST
    assert 0 < peak <= MAX_CONNECTIONS, peak


def test_idle_connections_are_reused():
    ip = container_ip("product-catalog")
    assert get_product() == 200
    before = catalog_connections(ip)
    assert before
    for _ in range(5):
        assert get_product() == 200
    assert catalog_connections(ip) == before
