# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""
The OpAMP server UI served through the frontend proxy under /opamp/: the
agents that register with it (collector, cart, product-catalog) and what each
agent page shows.
"""

import re
from urllib.parse import urljoin

import pytest
import requests

from conftest import FRONTEND_PROXY_URL
from demo_stack import OPAMP_URL, agent_page, agent_row, agent_rows, attribute, docker, search_spans

COLLECTOR_INSTANCE_ID = "00000000-0000-7000-8000-000000000001"


@pytest.fixture(scope="module")
def collector_page():
    return agent_page(COLLECTOR_INSTANCE_ID)


@pytest.mark.parametrize("name", ["cart", "product-catalog"])
def test_agent_list_names_sdk_agent(name):
    assert agent_row(name)


def test_cart_instance_id_matches_its_spans():
    page = agent_page(agent_row("cart")["instance_id"])
    shown = attribute(page, "service.instance.id")
    assert shown
    span_ids = {s["process_tags"].get("service.instance.id") for s in search_spans("cart", lookback="15m", limit=5)}
    assert shown in span_ids, f"{shown} not in {span_ids}"


def test_agent_list_names_the_collector():
    assert COLLECTOR_INSTANCE_ID in [r["instance_id"] for r in agent_rows()]


def test_collector_role_attribute(collector_page):
    assert attribute(collector_page, "demo.collector.role") == "gateway"


def test_collector_environment_attribute(collector_page):
    assert attribute(collector_page, "deployment.environment.name") == "demo"


def test_collector_effective_config_names_jaeger_exporter(collector_page):
    assert "Effective Configuration" in collector_page
    assert "otlp_grpc/jaeger" in collector_page


def test_collector_health_is_up():
    row = [r for r in agent_rows() if r["instance_id"] == COLLECTOR_INSTANCE_ID]
    assert row and row[0]["health"] == "Up"


def test_product_catalog_health_is_up():
    assert agent_row("product-catalog")["health"] == "Up"


def test_product_catalog_page_shows_service_name():
    page = agent_page(agent_row("product-catalog")["instance_id"])
    assert attribute(page, "service.name") == "product-catalog"


def test_product_catalog_spans_carry_opamp_instance_id():
    expected = agent_row("product-catalog")["instance_id"].replace("-", "")
    span_ids = {
        s["process_tags"].get("service.instance.id")
        for s in search_spans("product-catalog", lookback="15m", limit=5)
    }
    assert expected in span_ids, f"{expected} not in {span_ids}"


def test_product_catalog_reports_health():
    row = agent_row("product-catalog")
    assert row["health"] == "Up"
    assert re.search(r"Up:\s*true", re.sub(r"<[^>]+>", " ", agent_page(row["instance_id"])))


def test_opamp_server_container_is_healthy():
    result = docker("inspect", "-f", "{{.State.Health.Status}}", "opamp-server")
    assert result.stdout.strip() == "healthy"


def test_agent_links_resolve_under_opamp():
    for row in agent_rows():
        url = urljoin(OPAMP_URL, row["href"])
        assert url == f"{FRONTEND_PROXY_URL}/opamp/agent?instanceid={row['instance_id']}"
        assert requests.get(url, timeout=15).status_code == 200


def test_agent_page_links_back_to_list(collector_page):
    assert re.search(r'<a href="/opamp/">Back to Agents List</a>', collector_page)


def test_agent_page_has_no_connection_settings(collector_page):
    assert "OpAMP Connection Settings" not in collector_page


def test_agent_page_has_no_custom_messages(collector_page):
    assert "Custom Messages" not in collector_page


def test_product_catalog_health_checks_are_not_traced():
    assert search_spans("product-catalog", "grpc.health.v1.Health/Check", lookback="1h") == []
