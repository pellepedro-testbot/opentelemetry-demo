# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Rows the accounting consumer writes to PostgreSQL for each placed order,
read with psql inside the astronomy-db container (as the stack smoke job does)."""

import shutil
import subprocess

import pytest

from conftest import poll_until
from storefront import place_order

pytestmark = pytest.mark.skipif(
    shutil.which("docker") is None, reason="reads astronomy-db through the docker CLI"
)


def _psql(sql):
    out = subprocess.run(
        ["docker", "exec", "astronomy-db", "psql", "-U", "postgres", "-d", "astronomy_db", "-tAc", sql],
        capture_output=True,
        text=True,
        timeout=30,
        check=True,
    )
    return out.stdout.strip()


@pytest.fixture(scope="module")
def usd_order():
    resp = place_order("OLJCESPC7Z", currency="USD")
    assert resp.status_code == 200, resp.text[:300]
    order = resp.json()
    assert order["shippingCost"] == {"currencyCode": "USD", "units": 8, "nanos": 990000000}
    return order


def _shipping_row(order):
    tracking_id = order["shippingTrackingId"]
    row = poll_until(
        lambda: _psql(
            "select shipping_cost_currency_code, shipping_cost_units, shipping_cost_nanos"
            f" from accounting.shipping where shipping_tracking_id = '{tracking_id}'"
        ),
        f"accounting.shipping row for tracking id {tracking_id}",
        timeout=60,
    )
    return row.split("|")


def test_shipping_row_has_order_currency_and_units(usd_order):
    currency, units, _ = _shipping_row(usd_order)

    assert (currency, units) == ("USD", "8")


def test_shipping_row_keeps_nanos(usd_order):
    _, units, nanos = _shipping_row(usd_order)

    assert (units, nanos) == ("8", "990000000")
