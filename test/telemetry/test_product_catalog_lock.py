# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""
The productCatalogLockContention flag: product-catalog holds an ACCESS
EXCLUSIVE lock on catalog.products while it is on, which stalls catalog reads
and nothing else. Locks are read from the astronomy-db container.
"""

import threading
from concurrent.futures import ThreadPoolExecutor
import time

import pytest
import requests

from conftest import FRONTEND_PROXY_URL, poll_until
from demo_stack import docker, new_user_id, set_flag, wait_for_logs

LOCK_QUERY = (
    "SELECT l.granted, a.usename FROM pg_locks l JOIN pg_stat_activity a ON a.pid = l.pid "
    "WHERE l.relation = 'catalog.products'::regclass AND l.mode = 'AccessExclusiveLock'"
)


def psql(sql):
    result = docker("exec", "-i", "astronomy-db", "psql", "-U", "postgres", "-d", "astronomy_db", "-tA", "-c", sql)
    return [line.split("|") for line in result.stdout.strip().splitlines() if line]


def granted_lock():
    rows = [r for r in psql(LOCK_QUERY) if r[0] == "t"]
    return rows[0] if rows else None


def timed_get(path, timeout=40):
    start = time.monotonic()
    try:
        resp = requests.get(f"{FRONTEND_PROXY_URL}{path}", timeout=timeout)
        return resp.status_code, time.monotonic() - start
    except requests.Timeout:
        return None, time.monotonic() - start


def test_no_exclusive_lock_while_flag_off():
    assert psql(LOCK_QUERY) == []


def test_catalog_user_may_update_products():
    assert psql("SELECT has_table_privilege('astronomy_user', 'catalog.products', 'UPDATE')") == [["t"]]


def test_catalog_user_may_not_delete_products():
    assert psql("SELECT has_table_privilege('astronomy_user', 'catalog.products', 'DELETE')") == [["f"]]


def test_reviews_table_is_gone():
    assert psql("SELECT to_regclass('reviews.productreviews') IS NULL") == [["t"]]


def database_restarts():
    return int(docker("inspect", "-f", "{{.RestartCount}}", "astronomy-db").stdout.strip())


@pytest.fixture(scope="module")
def restarts_before_lock():
    return database_restarts()


@pytest.fixture(scope="module")
def lock_contention(restarts_before_lock):
    set_flag("productCatalogLockContention", "on", settle=0)
    try:
        yield poll_until(granted_lock, "granted ACCESS EXCLUSIVE lock on catalog.products", timeout=25, interval=1)
    finally:
        set_flag("productCatalogLockContention", "off", settle=0)


def held_lock():
    return poll_until(granted_lock, "lock held again", timeout=15, interval=1)


def test_lock_is_granted_within_25_seconds(lock_contention):
    assert lock_contention[0] == "t"


def test_lock_is_held_by_catalog_user(lock_contention):
    assert lock_contention[1] == "astronomy_user"


def test_currency_answers_while_lock_held(lock_contention):
    held_lock()
    status, elapsed = timed_get("/api/currency")
    assert status == 200
    assert elapsed < 1


def test_empty_cart_answers_while_lock_held(lock_contention):
    held_lock()
    status, elapsed = timed_get(f"/api/cart?sessionId={new_user_id()}&currencyCode=USD")
    assert status == 200
    assert elapsed < 1


def test_product_read_stalls_while_lock_held(lock_contention):
    held_lock()
    status, elapsed = timed_get("/api/products/OLJCESPC7Z")
    assert status == 504 or elapsed >= 10, f"answered {status} after {elapsed:.1f}s"


def test_waiting_catalog_query_carries_traceparent(lock_contention):
    held_lock()
    reader = threading.Thread(target=timed_get, args=("/api/products/OLJCESPC7Z",), daemon=True)
    reader.start()

    def waiting_query():
        rows = psql(
            "SELECT replace(query, E'\\n', ' ') FROM pg_stat_activity WHERE wait_event_type = 'Lock' "
            "AND usename = 'astronomy_user' AND query ILIKE '%catalog.products%'"
        )
        return rows or None

    rows = poll_until(waiting_query, "product-catalog query waiting on the lock", timeout=15, interval=1)
    assert "traceparent" in rows[0][0]


def test_lock_log_reaches_opensearch(lock_contention):
    records = wait_for_logs(
        "lock contention scenario active: holding ACCESS EXCLUSIVE lock on catalog.products",
        service="product-catalog",
    )
    assert records


def test_database_survives_lock_contention(restarts_before_lock, lock_contention):
    held_lock()
    with ThreadPoolExecutor(max_workers=20) as pool:
        list(pool.map(lambda _: timed_get("/api/products/OLJCESPC7Z"), range(20)))
    assert database_restarts() == restarts_before_lock


def test_lock_released_after_flag_off(lock_contention):
    set_flag("productCatalogLockContention", "off", settle=0)

    def released():
        try:
            return psql(LOCK_QUERY) == []
        except AssertionError:
            return False

    poll_until(released, "lock released", timeout=60, interval=1)
    status, elapsed = timed_get("/api/products/OLJCESPC7Z")
    assert status == 200
    assert elapsed < 1

