# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Provisioned Grafana dashboards, read from the Grafana API."""

import os

import pytest
import requests

from conftest import FRONTEND_PROXY_URL

GRAFANA_URL = os.environ.get("GRAFANA_URL", f"{FRONTEND_PROXY_URL}/grafana")


def dashboard_panels(title):
    found = requests.get(
        f"{GRAFANA_URL}/api/search", params={"query": title}, timeout=10
    )
    found.raise_for_status()
    uid = next(d["uid"] for d in found.json() if d["title"] == title)
    resp = requests.get(f"{GRAFANA_URL}/api/dashboards/uid/{uid}", timeout=10)
    resp.raise_for_status()

    def walk(panels):
        for panel in panels:
            yield panel
            yield from walk(panel.get("panels", []))

    return list(walk(resp.json()["dashboard"]["panels"]))


def panel(panels, title):
    matches = [p for p in panels if p.get("title") == title]
    assert len(matches) == 1, [p.get("title") for p in panels]
    return matches[0]


@pytest.fixture(scope="module")
def self_observability():
    return dashboard_panels("Self-Observability")


@pytest.fixture(scope="module")
def events_table():
    return panel(dashboard_panels("Events by Name"), "Top Event Names by Volume")


@pytest.mark.parametrize(
    "title, metric",
    [
        ("Spans processed successfully", "otel_sdk_processor_span_processed_total"),
        ("LogRecords processed successfully", "otel_sdk_processor_log_processed_total"),
    ],
)
def test_processed_successfully_stat_panel(self_observability, title, metric):
    found = panel(self_observability, title)
    assert found["type"] == "stat"
    expr = found["targets"][0]["expr"]
    assert metric in expr
    assert 'error_type=""' in expr


@pytest.mark.parametrize(
    "title", ["Spans processed successfully", "LogRecords processed successfully"]
)
def test_processed_successfully_description_says_processor_throughput(self_observability, title):
    assert "processor throughput, not successful export" in panel(self_observability, title)["description"]


def test_events_by_name_description(events_table):
    assert events_table["description"] == "Events grouped by service and EventName, ordered by volume."


def test_events_by_name_columns_start_with_service(events_table):
    organize = next(t for t in events_table["transformations"] if t["id"] == "organize")
    assert organize["options"]["indexByName"] == {
        "resource.service.name": 0,
        "eventName": 1,
        "log_count": 2,
    }
    assert organize["options"]["renameByName"] == {
        "resource.service.name": "Service",
        "eventName": "Event Name",
        "log_count": "Events",
    }


def test_events_by_name_groups_by_service_and_event_name(events_table):
    assert "stats count() as log_count by resource.service.name, eventName" in events_table["targets"][0]["query"]
