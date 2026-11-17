# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

import time
import uuid

import requests

from conftest import add_to_cart, feature_flag, place_order

NORMAL_READ_SECONDS = 2
STALLED_READ_SECONDS = 5


def _set_target_variant(variant):
    def change(flag):
        flag["targeting"]["if"][1] = variant

    return change


def _set_default_variant(variant):
    def change(flag):
        flag["defaultVariant"] = variant

    return change


def _sample_product_reads(session, frontend_url, seconds, interval=2):
    samples = []
    deadline = time.time() + seconds
    while time.time() < deadline:
        start = time.time()
        try:
            status = session.get(f"{frontend_url}/api/products", timeout=45).status_code
        except requests.RequestException:
            status = None
        samples.append((time.time() - start, status))
        time.sleep(interval)
    return samples


def test_failed_order_answers_one_json_error(frontend_url):
    with requests.Session() as session:
        user_id = f"flag-scenario-{uuid.uuid4()}"
        with feature_flag(session, "productCatalogFailure", _set_target_variant("on")):
            time.sleep(3)
            add_to_cart(session, user_id, "OLJCESPC7Z")
            resp = place_order(session, user_id)

    assert resp.status_code == 500
    assert resp.headers["Content-Type"].startswith("application/json")
    assert resp.json() == {"error": "Failed to place order."}


def test_lock_contention_stalls_catalog_reads_only_while_on(frontend_url):
    with requests.Session() as session:
        before = _sample_product_reads(session, frontend_url, 10)
        with feature_flag(session, "productCatalogLockContention", _set_default_variant("on")):
            during = _sample_product_reads(session, frontend_url, 60)
        # The lock is held for 30s after it is taken; let the last hold run out.
        time.sleep(40)
        after = _sample_product_reads(session, frontend_url, 20)

    assert all(status == 200 and took < NORMAL_READ_SECONDS for took, status in before), before
    stalled = [i for i, (took, _) in enumerate(during) if took >= STALLED_READ_SECONDS]
    assert stalled, during
    assert any(status == 200 for _, status in during[stalled[0]:]), during
    assert all(status == 200 and took < NORMAL_READ_SECONDS for took, status in after), after
