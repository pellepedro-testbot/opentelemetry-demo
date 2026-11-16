# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""productCatalogLockContention: product-catalog holds an ACCESS EXCLUSIVE lock
on catalog.products while the flag is on, which stalls catalog reads but not
other services, and releases it once the flag is off."""

import os
import time
import uuid

import pytest
import requests

from conftest import FRONTEND_PROXY_URL, poll_until
from observability import docker, service_body_query, wait_for_logs
from storefront import get_cart, set_flag

POSTGRES_CONTAINER = os.environ.get("POSTGRES_CONTAINER", "astronomy-db")
LOCK_MESSAGE = "lock contention scenario active: holding ACCESS EXCLUSIVE lock on catalog.products"
LOCK_QUERY = (
    "select l.granted, coalesce(a.usename, '') from pg_locks l "
    "left join pg_stat_activity a on a.pid = l.pid "
    "where l.relation = 'catalog.products'::regclass and l.mode = 'AccessExclusiveLock'"
)


def psql(sql):
    out = docker("exec", POSTGRES_CONTAINER, "psql", "-U", "postgres", "-d", "astronomy_db", "-tAc", sql)
    assert out.returncode == 0, out.stderr
    return out.stdout.strip()


def exclusive_locks():
    return [tuple(row.split("|")) for row in psql(LOCK_QUERY).splitlines() if row]


def timed_get(path, timeout=40):
    started = time.monotonic()
    try:
        resp = requests.get(f"{FRONTEND_PROXY_URL}{path}", timeout=timeout)
        return resp.status_code, time.monotonic() - started
    except requests.Timeout:
        return None, time.monotonic() - started


@pytest.fixture(scope="module")
def lock_scenario():
    no_lock_with_flag_off = exclusive_locks() == []
    started = time.time()
    set_flag("productCatalogLockContention", "on", wait=0)
    turned_on = time.monotonic()
    result = {"no_lock_with_flag_off": no_lock_with_flag_off, "started": started}
    try:
        locks = poll_until(
            lambda: [lock for lock in exclusive_locks() if lock[0] == "t"],
            "granted ACCESS EXCLUSIVE lock on catalog.products",
            timeout=40,
            interval=1,
        )
        result["granted_after"] = time.monotonic() - turned_on
        result["locks"] = locks
        result["currency"] = timed_get("/api/currency")
        cart_started = time.monotonic()
        cart = get_cart(f"telemetry-test-{uuid.uuid4()}")
        result["cart"] = (cart.status_code, time.monotonic() - cart_started)
        result["product"] = timed_get("/api/products/OLJCESPC7Z?currencyCode=USD")
    finally:
        set_flag("productCatalogLockContention", "off", wait=0)
        turned_off = time.monotonic()
        released = poll_until(
            lambda: not exclusive_locks() and time.monotonic(),
            "ACCESS EXCLUSIVE lock released",
            timeout=90,
            interval=1,
        )
        result["released_after"] = released - turned_off
    result["product_after"] = timed_get("/api/products/OLJCESPC7Z?currencyCode=USD")
    return result


def test_no_exclusive_lock_while_flag_off():
    set_flag("productCatalogLockContention", "off", wait=0)
    poll_until(lambda: not exclusive_locks(), "no lock left from an earlier scenario", timeout=60, interval=2)
    time.sleep(40)
    assert exclusive_locks() == []


def test_lock_granted_within_25s_of_flag_on(lock_scenario):
    assert lock_scenario["granted_after"] <= 25, lock_scenario["granted_after"]


def test_lock_held_by_astronomy_user(lock_scenario):
    assert [user for _, user in lock_scenario["locks"]] == ["astronomy_user"]


def test_currency_answers_while_catalog_locked(lock_scenario):
    status, elapsed = lock_scenario["currency"]
    assert status == 200
    assert elapsed < 1, elapsed


def test_empty_cart_answers_while_catalog_locked(lock_scenario):
    status, elapsed = lock_scenario["cart"]
    assert status == 200
    assert elapsed < 1, elapsed


def test_product_read_stalls_while_catalog_locked(lock_scenario):
    status, elapsed = lock_scenario["product"]
    # Either the proxy gives up (504) or the read waits for the lock to end.
    assert status in (504, None, 200), status
    assert elapsed >= 10, (status, elapsed)


def test_lock_released_within_60s_of_flag_off(lock_scenario):
    assert lock_scenario["released_after"] <= 60, lock_scenario["released_after"]
    status, elapsed = lock_scenario["product_after"]
    assert status == 200
    assert elapsed < 1, elapsed


def test_lock_scenario_logged_and_exported(lock_scenario):
    records = wait_for_logs(
        service_body_query("product-catalog", LOCK_MESSAGE)
        + [{"range": {"@timestamp": {"gte": int(lock_scenario["started"] * 1000), "format": "epoch_millis"}}}],
        "product-catalog lock contention record in OpenSearch",
    )
    assert records[0]["body"] == LOCK_MESSAGE


def test_astronomy_user_can_update_products():
    assert psql("select has_table_privilege('astronomy_user','catalog.products','UPDATE')") == "t"


def test_astronomy_user_cannot_delete_products():
    assert psql("select has_table_privilege('astronomy_user','catalog.products','DELETE')") == "f"
