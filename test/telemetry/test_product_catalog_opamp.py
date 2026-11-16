# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""product-catalog as an OpAMP agent: registered with a healthy status, its
instance id shared with its telemetry, and re-registered after a restart."""

import os
import re

import pytest
import requests

from conftest import FRONTEND_PROXY_URL, poll_until
from observability import jaeger_search, start_container_and_wait, stop_container

OPAMP_URL = os.environ.get("OPAMP_URL", f"{FRONTEND_PROXY_URL}/opamp")

# One agents-table row: name cell, version cell, health cell, last-seen cell,
# then the instance id inside the row's agent link.
AGENT_ROW = re.compile(
    r"<tr>\s*<td>([^<]*)</td>\s*<td>[^<]*</td>\s*<td>([^<]*)</td>\s*<td>[^<]*</td>\s*"
    r"<td><a href=\"agent\?instanceid=([0-9a-f-]+)\">",
)


def agents(name):
    resp = requests.get(f"{OPAMP_URL}/", timeout=10)
    resp.raise_for_status()
    return [
        {"health": health.strip(), "instance_id": instance_id}
        for row_name, health, instance_id in AGENT_ROW.findall(resp.text)
        if row_name.strip() == name
    ]


def agent_page(instance_id):
    resp = requests.get(f"{OPAMP_URL}/agent", params={"instanceid": instance_id}, timeout=10)
    resp.raise_for_status()
    return resp.text


@pytest.fixture(scope="module")
def product_catalog_agent():
    rows = poll_until(lambda: agents("product-catalog"), "product-catalog on the OpAMP page", timeout=60)
    return rows[-1]


def test_span_instance_id_matches_opamp_instance_id(product_catalog_agent):
    traces = poll_until(
        lambda: jaeger_search("product-catalog", limit=5), "product-catalog traces in Jaeger", timeout=60
    )
    instance_ids = {
        tag["value"]
        for trace in traces
        for process in trace["processes"].values()
        if process["serviceName"] == "product-catalog"
        for tag in process.get("tags", [])
        if tag["key"] == "service.instance.id"
    }
    assert product_catalog_agent["instance_id"].replace("-", "") in instance_ids


def test_agent_reports_health(product_catalog_agent):
    page = agent_page(product_catalog_agent["instance_id"])
    # The health row: an "Up:" cell followed by a "true" cell.
    assert re.search(r"<td>Up:</td>\s*<td>true</td>", page), page


@pytest.fixture(scope="module")
def restart(product_catalog_agent):
    before = {row["instance_id"] for row in agents("product-catalog")}
    try:
        elapsed, exit_code = stop_container("product-catalog")
    finally:
        start_container_and_wait("product-catalog")
        poll_until(
            lambda: requests.get(
                f"{FRONTEND_PROXY_URL}/api/products/OLJCESPC7Z", params={"currencyCode": "USD"}, timeout=10
            ).status_code == 200,
            "storefront reading products again",
            timeout=120,
        )
    return {"before": before, "elapsed": elapsed, "exit_code": exit_code}


def test_sigterm_exits_cleanly_before_kill(restart):
    assert restart["exit_code"] == 0
    assert restart["elapsed"] < 9, restart["elapsed"]


def test_product_catalog_registers_again_after_restart(restart):
    def new_healthy_agent():
        return [
            row for row in agents("product-catalog")
            if row["instance_id"] not in restart["before"] and row["health"] == "Up"
        ]

    poll_until(new_healthy_agent, "product-catalog registered with a new instance id", timeout=90)
