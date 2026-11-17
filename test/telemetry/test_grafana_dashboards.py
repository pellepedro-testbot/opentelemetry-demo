# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""
The Grafana dashboards and datasources provisioned with the demo, read through
the frontend proxy's /grafana route, and the data their queries return.
"""

from urllib.parse import parse_qs, urlparse

import pytest
import requests

from conftest import FRONTEND_PROXY_URL, OPENSEARCH_URL, poll_until
from demo_stack import prom_query

GRAFANA_API = f"{FRONTEND_PROXY_URL}/grafana/api"


def _dashboard(uid):
    resp = requests.get(f"{GRAFANA_API}/dashboards/uid/{uid}", timeout=15)
    assert resp.status_code == 200, f"dashboard {uid} answered {resp.status_code}"
    return resp.json()["dashboard"]


def _panels(dashboard):
    def walk(panels):
        for panel in panels:
            yield panel
            yield from walk(panel.get("panels", []))

    return list(walk(dashboard.get("panels", [])))


def _panel(dashboard, title):
    panels = [p for p in _panels(dashboard) if p.get("title") == title]
    assert panels, f"no panel titled {title!r}"
    return panels[0]


def _variable(dashboard, name):
    variables = [v for v in dashboard["templating"]["list"] if v["name"] == name]
    assert variables, f"no variable {name}"
    return variables[0]


def _exprs(panel):
    return [t.get("expr") or t.get("query") or "" for t in panel.get("targets", [])]


@pytest.fixture(scope="module")
def self_observability():
    return _dashboard("self-observability")


@pytest.fixture(scope="module")
def events_by_name():
    return _dashboard("otel-demo-events-by-name")


@pytest.fixture(scope="module")
def demo_dashboard():
    return _dashboard("W2gX2zHVk")


# --- Self-Observability -----------------------------------------------------


def test_self_observability_dashboard_title(self_observability):
    assert self_observability["title"] == "Self-Observability"


@pytest.mark.parametrize("title", ["Spans processed successfully", "LogRecords processed successfully"])
def test_processed_successfully_stat_panels(self_observability, title):
    assert _panel(self_observability, title)["type"] == "stat"


@pytest.mark.parametrize(
    "title,metric",
    [
        ("Spans processed successfully", "otel_sdk_processor_span_processed_total"),
        ("LogRecords processed successfully", "otel_sdk_processor_log_processed_total"),
        ("Spans exported", "otel_sdk_exporter_span_exported_total"),
    ],
)
def test_success_panels_query_empty_error_type(self_observability, title, metric):
    expr = _exprs(_panel(self_observability, title))[0]
    assert metric in expr
    assert 'error_type=""' in expr


@pytest.mark.parametrize("title", ["Spans processed successfully", "LogRecords processed successfully"])
def test_processed_panels_describe_throughput_not_export(self_observability, title):
    description = _panel(self_observability, title)["description"]
    assert "processor throughput, not successful export" in description


def test_service_variable(self_observability):
    variable = _variable(self_observability, "service_name")
    assert variable["definition"] == 'label_values({__name__=~"otel_sdk_.+"},service_name)'
    assert variable["multi"] is True
    assert variable["includeAll"] is True


def test_pipeline_rows(self_observability):
    rows = [p["title"] for p in _panels(self_observability) if p.get("type") == "row"]
    for title in ("Overview", "Span pipeline", "Log pipeline", "Metric pipeline"):
        assert title in rows


def test_services_reporting_query(self_observability):
    assert _exprs(_panel(self_observability, "Services reporting")) == [
        'count(group by (service_name) ({__name__=~"otel_sdk_.+",service_name=~"$service_name"}))'
    ]


def test_export_errors_adds_three_signals(self_observability):
    expr = _exprs(_panel(self_observability, "Export errors"))[0]
    for metric in (
        "otel_sdk_exporter_span_exported_total",
        "otel_sdk_exporter_log_exported_total",
        "otel_sdk_exporter_metric_data_point_exported_total",
    ):
        assert metric + '{service_name=~"$service_name",error_type!=""}' in expr
    assert expr.count(" + ") == 2


def test_items_in_flight_sums_three_signals(self_observability):
    expr = _exprs(_panel(self_observability, "Items in-flight"))[0]
    for metric in ("otel_sdk_exporter_span_inflight", "otel_sdk_exporter_log_inflight",
                   "otel_sdk_exporter_metric_data_point_inflight"):
        assert metric in expr
    assert expr.count(" + ") == 2


def test_processing_errors_query(self_observability):
    expr = _exprs(_panel(self_observability, "Processing errors (spans + LogRecords)"))[0]
    assert 'otel_sdk_processor_span_processed_total{service_name=~"$service_name",error_type!=""}' in expr
    assert 'otel_sdk_processor_log_processed_total{service_name=~"$service_name",error_type!=""}' in expr


def test_span_queue_utilization_divides_size_by_capacity(self_observability):
    expr = _exprs(_panel(self_observability, "Span processor queue utilization"))[0]
    size, _, capacity = expr.partition(" / ")
    assert "otel_sdk_processor_span_queue_size" in size
    assert "otel_sdk_processor_span_queue_capacity" in capacity


def test_live_spans_per_service(self_observability):
    expr = _exprs(_panel(self_observability, "Live spans"))[0]
    assert "otel_sdk_span_live" in expr
    assert "by (service_name)" in expr


def test_span_export_duration_averages_span_exporters(self_observability):
    expr = _exprs(_panel(self_observability, "Span export operation duration (avg)"))[0]
    assert "otel_sdk_exporter_operation_duration_seconds_sum" in expr
    assert "otel_sdk_exporter_operation_duration_seconds_count" in expr
    assert 'otel_component_type=~".*span_exporter"' in expr


def test_metric_collect_duration(self_observability):
    expr = _exprs(_panel(self_observability, "Metric collect duration (avg)"))[0]
    assert "otel_sdk_metric_reader_collection_duration_seconds" in expr


def test_sdk_components_table_grouping(self_observability):
    panel = _panel(self_observability, "SDK components reporting")
    assert panel["type"] == "table"
    expr = _exprs(panel)[0]
    assert "group by (service_name, otel_component_type, otel_component_name)" in expr
    assert '__name__=~"otel_sdk_.+"' in expr


def test_spans_processed_query_returns_data(self_observability):
    expr = _exprs(_panel(self_observability, "Spans processed successfully"))[0]
    expr = expr.replace("$service_name", ".*").replace("$__rate_interval", "5m")
    assert poll_until(lambda: prom_query(expr), "spans processed successfully in Prometheus")


def test_services_reporting_query_counts_at_least_three(self_observability):
    expr = _exprs(_panel(self_observability, "Services reporting"))[0].replace("$service_name", ".*")
    result = poll_until(lambda: prom_query(expr), "services reporting in Prometheus")
    assert float(result[0]["value"][1]) >= 3


# --- Events by Name ---------------------------------------------------------


TOP_EVENTS = "Top Event Names by Volume"


def test_events_dashboard_title(events_by_name):
    assert events_by_name["title"] == "Events by Name"


def test_events_table_description(events_by_name):
    assert _panel(events_by_name, TOP_EVENTS)["description"] == "Events grouped by service and EventName, ordered by volume."


def test_events_table_column_order(events_by_name):
    organize = [t for t in _panel(events_by_name, TOP_EVENTS)["transformations"] if t["id"] == "organize"][0]
    options = organize["options"]
    assert options["indexByName"] == {"resource.service.name": 0, "eventName": 1, "log_count": 2}
    assert options["renameByName"] == {"resource.service.name": "Service", "eventName": "Event Name", "log_count": "Events"}


def test_events_query_groups_by_service_and_event(events_by_name):
    assert "by resource.service.name, eventName" in _exprs(_panel(events_by_name, TOP_EVENTS))[0]


def test_events_filter_variables(events_by_name):
    labels = {}
    for name in ("service", "event_name", "severity"):
        variable = _variable(events_by_name, name)
        assert variable["multi"] is True
        assert variable["includeAll"] is True
        assert variable["current"]["value"] == ["$__all"]
        labels[name] = variable["label"]
    assert labels == {"service": "Service", "event_name": "Event Name", "severity": "Severity"}


def test_event_name_variable_follows_selected_services(events_by_name):
    assert '"query":"eventName:* AND resource.service.name.keyword:$service"' in _variable(
        events_by_name, "event_name"
    )["definition"]


def test_top_events_query_applies_filters_and_limit(events_by_name):
    query = _exprs(_panel(events_by_name, TOP_EVENTS))[0]
    for clause in ("${service:singlequote}", "${event_name:singlequote}", "${severity:singlequote}"):
        assert clause in query
    assert query.rstrip().endswith("head 20")


def test_event_volume_panel_splits_by_top_five(events_by_name):
    panel = _panel(events_by_name, "Event Volume Over Time (Top Event Names)")
    assert panel["type"] == "timeseries"
    terms = [a for t in panel["targets"] for a in t.get("bucketAggs", []) if a["type"] == "terms"]
    assert terms and terms[0]["field"] == "eventName.keyword"
    assert str(terms[0]["settings"]["size"]) == "5"


def _terms(field, query):
    resp = requests.post(
        f"{OPENSEARCH_URL}/otel-logs-*/_search",
        json={"size": 0, "query": {"query_string": {"query": query}},
              "aggs": {"t": {"terms": {"field": field, "size": 1000}}}},
        timeout=15,
    )
    resp.raise_for_status()
    return [b["key"] for b in resp.json()["aggregations"]["t"]["buckets"]]


def test_top_events_query_returns_rows(events_by_name):
    def quoted(values):
        return ", ".join("'" + v.replace("'", "\\'") + "'" for v in values)

    query = _exprs(_panel(events_by_name, TOP_EVENTS))[0]
    query = query.replace("${service:singlequote}", quoted(_terms("resource.service.name.keyword", "eventName:*")))
    query = query.replace("${event_name:singlequote}", quoted(_terms("eventName.keyword", "eventName:*")))
    query = query.replace("${severity:singlequote}", quoted(_terms("severity.text.keyword", "eventName:*")))
    resp = requests.post(
        f"{GRAFANA_API}/ds/query",
        json={
            "from": "now-1h",
            "to": "now",
            "queries": [
                {
                    "refId": "A",
                    "datasource": {"uid": "webstore-logs", "type": "grafana-opensearch-datasource"},
                    "query": query,
                    "queryType": "PPL",
                    "format": "table",
                }
            ],
        },
        timeout=30,
    )
    assert resp.status_code == 200, resp.text[:500]
    frames = resp.json()["results"]["A"]["frames"]
    fields = frames[0]["schema"]["fields"]
    values = frames[0]["data"]["values"]
    event_names = values[[f["name"] for f in fields].index("eventName")]
    assert [name for name in event_names if name]


# --- Demo Dashboard ---------------------------------------------------------


def test_trace_id_textbox_variable(demo_dashboard):
    variable = _variable(demo_dashboard, "traceId")
    assert variable["type"] == "textbox"
    assert variable["label"] == "Trace ID"


def test_demo_service_variable_allows_all(demo_dashboard):
    variable = _variable(demo_dashboard, "service")
    assert variable["multi"] is True
    assert variable["includeAll"] is True


def test_log_panels_filter_by_trace_id(demo_dashboard):
    log_queries = [q for p in _panels(demo_dashboard) for q in _exprs(p) if "otel-logs-*" in q]
    assert log_queries
    for query in log_queries:
        assert 'where (traceId="${traceId}" or "${traceId}" = "")' in query


def test_span_metric_panels_match_services_by_regex(demo_dashboard):
    queries = [q for p in _panels(demo_dashboard) for q in _exprs(p) if "traces_span_metrics" in q]
    assert queries
    for query in queries:
        assert 'service_name=~"(${service:regex})"' in query


# --- Prometheus datasource exemplars ----------------------------------------


@pytest.fixture(scope="module")
def logs_exemplar_link():
    resp = requests.get(f"{GRAFANA_API}/datasources/uid/webstore-metrics", timeout=15)
    assert resp.status_code == 200
    links = [
        d for d in resp.json()["jsonData"].get("exemplarTraceIdDestinations", [])
        if d.get("urlDisplayLabel") == "View in Logs (OpenSearch)"
    ]
    assert links, "no 'View in Logs (OpenSearch)' exemplar link"
    return links[0]


def test_exemplar_link_to_logs(logs_exemplar_link):
    assert logs_exemplar_link["name"] == "trace_id"


def test_exemplar_link_opens_demo_dashboard_by_trace(logs_exemplar_link):
    url = urlparse(logs_exemplar_link["url"])
    assert url.path == "/grafana/d/W2gX2zHVk/demo-dashboard"
    query = parse_qs(url.query)
    assert query["var-service"] == ["All"]
    assert query["var-traceId"] == ["${__value.raw}"]
