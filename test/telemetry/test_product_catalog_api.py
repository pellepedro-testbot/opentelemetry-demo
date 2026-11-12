# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""GET /api/products under the productCatalogLockContention flag, which holds an
exclusive lock on catalog.products for 30s at a time while it is on."""

import time

import pytest
import requests

from conftest import FRONTEND_PROXY_URL
from demo_shop import set_flag

# product-catalog checks the flag every 10s and then holds the lock for 30s.
LOCK_HOLD_SECONDS = 30
SLOW_SECONDS = 2


def timed_products(require_ok=True):
    """Time one product listing. A read the proxy cuts off while it waits on the
    lock (504) has no listing, unless require_ok."""
    start = time.monotonic()
    resp = requests.get(
        f"{FRONTEND_PROXY_URL}/api/products", params={"currencyCode": "USD"}, timeout=LOCK_HOLD_SECONDS + 15
    )
    elapsed = time.monotonic() - start
    if not require_ok and resp.status_code == 504:
        return elapsed, None
    resp.raise_for_status()
    catalog = sorted((p["id"], p["priceUsd"]["units"], p["priceUsd"]["nanos"]) for p in resp.json())
    return elapsed, catalog


@pytest.fixture
def lock_flag_off_afterwards():
    yield
    set_flag("productCatalogLockContention", "off")
    time.sleep(LOCK_HOLD_SECONDS + 5)


def test_product_reads_block_while_lock_contention_is_on(lock_flag_off_afterwards):
    baseline = [timed_products() for _ in range(5)]
    catalog = baseline[0][1]
    assert catalog

    set_flag("productCatalogLockContention", "on")
    observed = []
    deadline = time.monotonic() + 45
    while time.monotonic() < deadline:
        observed.append(timed_products(require_ok=False))
        if observed[-1][0] > SLOW_SECONDS:
            break
        time.sleep(1)

    latencies = [round(elapsed, 2) for elapsed, _ in observed]
    assert max(latencies) > SLOW_SECONDS, f"baseline {[round(e, 2) for e, _ in baseline]}, with flag on {latencies}"
    assert all(listing == catalog for _, listing in observed if listing is not None)


def test_product_reads_recover_after_lock_contention_is_turned_off(lock_flag_off_afterwards):
    _, catalog = timed_products()

    set_flag("productCatalogLockContention", "on")
    time.sleep(15)
    set_flag("productCatalogLockContention", "off")
    time.sleep(LOCK_HOLD_SECONDS + 5)

    after = [timed_products() for _ in range(5)]
    assert all(elapsed < SLOW_SECONDS for elapsed, _ in after), [round(e, 2) for e, _ in after]
    assert all(listing == catalog for _, listing in after)

