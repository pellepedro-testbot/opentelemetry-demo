# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Tools the frontend proxy serves: the OpAMP server admin UI, the Locust load
generator UI and the Grafana dashboards."""

import pytest
import requests

from conftest import FRONTEND_PROXY_URL, poll_until
from storefront import opamp_agents


def test_opamp_route_redirects_and_serves_admin_ui():
    resp = requests.get(f"{FRONTEND_PROXY_URL}/opamp", allow_redirects=False, timeout=10)
    assert resp.status_code == 301
    assert resp.headers["location"].endswith("/opamp/")
    page = requests.get(f"{FRONTEND_PROXY_URL}/opamp/", timeout=10)
    assert page.status_code == 200
    assert "text/html" in page.headers["content-type"]
    assert "<title>OpAMP Server</title>" in page.text


@pytest.mark.parametrize("service", ["cart", "product-catalog"])
def test_service_reports_health_to_opamp(service):
    poll_until(
        lambda: opamp_agents().get(service) == "Up",
        f"OpAMP admin UI lists '{service}' as Up",
    )


def test_locust_ui_and_generated_traffic():
    resp = requests.get(f"{FRONTEND_PROXY_URL}/loadgen/", timeout=10)
    assert resp.status_code == 200
    assert "locust" in resp.text.lower()

    def requests_seen():
        stats = requests.get(f"{FRONTEND_PROXY_URL}/loadgen/stats/requests", timeout=10)
        stats.raise_for_status()
        return sum(entry.get("num_requests", 0) for entry in stats.json().get("stats", []))

    poll_until(requests_seen, "Locust stats with requests > 0", timeout=120)


def test_self_observability_and_events_dashboards_are_provisioned():
    resp = requests.get(f"{FRONTEND_PROXY_URL}/grafana/api/search", params={"query": ""}, timeout=10)
    assert resp.status_code == 200
    uids = {dashboard["title"]: dashboard["uid"] for dashboard in resp.json()}
    assert "Self-Observability" in uids
    assert "Events by Name" in uids

    def panels(uid):
        dashboard = requests.get(f"{FRONTEND_PROXY_URL}/grafana/api/dashboards/uid/{uid}", timeout=10)
        assert dashboard.status_code == 200
        found = []
        for panel in dashboard.json()["dashboard"].get("panels", []):
            found.append(panel)
            found.extend(panel.get("panels", []))
        return found

    self_obs = panels(uids["Self-Observability"])
    titles = [panel.get("title", "") for panel in self_obs]
    assert "Spans processed successfully" in titles, titles
    assert "LogRecords processed successfully" in titles, titles
    events = panels(uids["Events by Name"])
    tables = [panel for panel in events if panel.get("type") == "table"]
    assert tables
    assert any("service" in str(panel.get("targets", "")).lower() for panel in tables)
