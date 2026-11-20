# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Collector processing (redaction, resource detection, CORS, OpAMP), the
Grafana dashboards, the Jaeger UI config and the telemetry docs pages."""

import hashlib
import html
import json
import re
import secrets
import time
import uuid

import pytest
import requests

from conftest import poll_until
import shop

COLLECTOR_INSTANCE_ID = "00000000-0000-7000-8000-000000000001"


# --- redaction -------------------------------------------------------------------


def _attr(key, value):
    return {"key": key, "value": {"stringValue": value}}


SENSITIVE_ATTRIBUTES = {
    "password": "hunter2",
    "db.secret.key": "s3cr3t",
    "demo.order.id": "1234567812345678",
    "note": "4111 1111 1111 1111",
    "user.email": "a@b.com",
    "demo.payment.card_number": "4432-8015-6152-0454",
    "demo.payment.card_pin": "1234",
    "user_password": "pw",
    "demo.keep": "keepme",
}


@pytest.fixture(scope="module")
def redacted_spans():
    """Send one span with sensitive attributes and one without straight to the
    collector over OTLP/HTTP and read both back from Jaeger."""
    trace_id = secrets.token_hex(16)
    now = time.time_ns()

    def span(span_id, name, attributes):
        return {
            "traceId": trace_id,
            "spanId": span_id,
            "name": name,
            "kind": 1,
            "startTimeUnixNano": str(now),
            "endTimeUnixNano": str(now + 1_000_000),
            "attributes": attributes,
        }

    body = {
        "resourceSpans": [{
            "resource": {"attributes": [_attr("service.name", f"probe-redaction-{uuid.uuid4().hex[:8]}")]},
            "scopeSpans": [{
                "scope": {"name": "probe"},
                "spans": [
                    span("0102030405060708", "sensitive",
                         [_attr(k, v) for k, v in SENSITIVE_ATTRIBUTES.items()]),
                    span("0102030405060709", "plain", [_attr("demo.keep", "keepme")]),
                ],
            }],
        }],
    }
    resp = requests.post(f"{shop.COLLECTOR_HTTP_URL}/v1/traces", json=body, timeout=10)
    resp.raise_for_status()

    def read():
        trace = shop.jaeger_trace(trace_id)
        if trace and len(trace["spans"]) == 2:
            return trace
        return None

    trace = poll_until(read, f"probe trace {trace_id} in Jaeger", timeout=90)
    by_name = {s["operationName"]: shop.tags_of(s) for s in trace["spans"]}
    return by_name["sensitive"], by_name["plain"]


def test_password_attribute_is_masked(redacted_spans):
    assert redacted_spans[0]["password"] == "****"


def test_attribute_with_secret_in_key_is_masked(redacted_spans):
    assert redacted_spans[0]["db.secret.key"] == "****"


def test_numeric_order_id_passes_unchanged(redacted_spans):
    assert redacted_spans[0]["demo.order.id"] == "1234567812345678"


def test_card_like_value_under_unrelated_key_passes_unchanged(redacted_spans):
    assert redacted_spans[0]["note"] == "4111 1111 1111 1111"


def test_user_email_is_replaced_by_its_sha256(redacted_spans):
    tags = redacted_spans[0]
    assert "user.email" not in tags
    assert tags.get("user.hash") == hashlib.sha256(b"a@b.com").hexdigest()


def test_card_number_counts_as_ignored(redacted_spans):
    assert redacted_spans[0].get("redaction.ignored.count") == 1


def test_span_without_sensitive_attributes_has_no_masked_count(redacted_spans):
    assert "redaction.masked.count" not in redacted_spans[1]


def test_card_pin_is_masked(redacted_spans):
    assert redacted_spans[0]["demo.payment.card_pin"] == "****"


def test_attribute_with_password_in_key_is_masked(redacted_spans):
    assert redacted_spans[0]["user_password"] == "****"


def test_unrelated_attribute_passes_unchanged(redacted_spans):
    assert redacted_spans[0]["demo.keep"] == "keepme"
    assert redacted_spans[1]["demo.keep"] == "keepme"


def test_card_number_keeps_only_last_four_digits(redacted_spans):
    assert redacted_spans[0]["demo.payment.card_number"] == "****-****-****-0454"


def test_masked_count_equals_number_of_masked_attributes(redacted_spans):
    # password, db.secret.key, demo.payment.card_pin and user_password
    assert redacted_spans[0].get("redaction.masked.count") == 4


def test_redaction_summary_holds_counts_only(redacted_spans):
    tags = redacted_spans[0]
    assert "redaction.masked.keys" not in tags
    assert "redaction.ignored.keys" not in tags


# --- Grafana dashboards -------------------------------------------------------------


def _dashboard(uid):
    resp = requests.get(shop.url(f"/grafana/api/dashboards/uid/{uid}"), timeout=15)
    resp.raise_for_status()
    return resp.json()["dashboard"]


def _all_panels(panels):
    for panel in panels:
        yield panel
        yield from _all_panels(panel.get("panels", []))


def _panel(dashboard, title):
    found = [p for p in _all_panels(dashboard["panels"]) if p.get("title") == title]
    assert found, f"no panel titled {title!r} in dashboard {dashboard.get('title')!r}"
    return found[0]


def _queries(panel):
    return [t.get("expr") or t.get("query") or "" for t in panel.get("targets", [])]


def _variable(dashboard, name):
    found = [v for v in dashboard["templating"]["list"] if v["name"] == name]
    assert found, f"no variable {name!r}"
    return found[0]


def _variable_query(var):
    q = var.get("query")
    return q.get("query", "") if isinstance(q, dict) else (q or "")


@pytest.fixture(scope="module")
def self_observability():
    return _dashboard("self-observability")


@pytest.fixture(scope="module")
def events_by_name():
    return _dashboard("otel-demo-events-by-name")


@pytest.fixture(scope="module")
def demo_dashboard():
    return _dashboard("W2gX2zHVk")


@pytest.fixture(scope="module")
def linux_dashboard():
    return _dashboard("otel-demo-hostmetrics")


def test_self_observability_has_spans_processed_stat(self_observability):
    assert _panel(self_observability, "Spans processed successfully")["type"] == "stat"


def test_spans_processed_panel_queries_successful_processor_spans(self_observability):
    queries = _queries(_panel(self_observability, "Spans processed successfully"))
    assert any(
        "otel_sdk_processor_span_processed_total" in q and 'error_type=""' in q for q in queries
    ), queries


def test_processed_panels_describe_processor_throughput(self_observability):
    for title in ("Spans processed successfully", "LogRecords processed successfully"):
        description = _panel(self_observability, title).get("description", "")
        assert "processor throughput, not successful export" in description, (title, description)


def test_events_by_name_panel_description(events_by_name):
    panel = _panel(events_by_name, "Top Event Names by Volume")
    assert panel.get("description") == "Events grouped by service and EventName, ordered by volume."


def test_events_by_name_table_column_order(events_by_name):
    panel = _panel(events_by_name, "Top Event Names by Volume")
    organize = [t for t in panel.get("transformations", []) if t["id"] == "organize"][0]["options"]
    order = sorted(organize["indexByName"], key=organize["indexByName"].get)
    assert [organize["renameByName"][f] for f in order] == ["Service", "Event Name", "Events"]


def test_self_observability_has_log_records_processed_stat(self_observability):
    assert _panel(self_observability, "LogRecords processed successfully")["type"] == "stat"


def test_log_records_processed_panel_queries_successful_processor_logs(self_observability):
    queries = _queries(_panel(self_observability, "LogRecords processed successfully"))
    assert any(
        "otel_sdk_processor_log_processed_total" in q and 'error_type=""' in q for q in queries
    ), queries


def test_spans_processed_query_returns_data():
    shop.prom_wait('otel_sdk_processor_span_processed_total{error_type=""}')


def test_events_by_name_query_groups_by_service_and_event_name(events_by_name):
    queries = _queries(_panel(events_by_name, "Top Event Names by Volume"))
    assert any(re.search(r"by\s+resource\.service\.name,\s*eventName", q) for q in queries), queries


def test_demo_dashboard_has_trace_id_textbox(demo_dashboard):
    var = _variable(demo_dashboard, "traceId")
    assert var["type"] == "textbox"
    assert var["label"] == "Trace ID"
    assert var.get("query", "") == ""
    assert (var.get("current") or {}).get("value", "") == ""


def test_demo_dashboard_service_variable_is_multi_value_with_all(demo_dashboard):
    var = _variable(demo_dashboard, "service")
    assert var.get("multi") is True
    assert var.get("includeAll") is True


@pytest.mark.parametrize(
    "title",
    ["Requests Rate by Span Name", "Error Rate by Span Name", "Average Duration by Span Name"],
)
def test_span_metrics_panels_match_service_by_regex(demo_dashboard, title):
    queries = _queries(_panel(demo_dashboard, title))
    assert queries and all('service_name=~"(${service:regex})"' in q for q in queries), queries
    assert not any(re.search(r'service_name="', q) for q in queries), queries


@pytest.mark.parametrize("title", ["Log Records by Severity", "Log Records (100 recent entries)"])
def test_log_panels_filter_by_service_and_trace_id(demo_dashboard, title):
    queries = _queries(_panel(demo_dashboard, title))
    assert queries
    for q in queries:
        assert "resource.service.name in (${service:singlequote})" in q, q
        assert 'traceId="${traceId}"' in q, q


def test_recommendations_rate_panel_uses_renamed_counter(demo_dashboard):
    queries = _queries(_panel(demo_dashboard, "Recommendations Rate"))
    assert any('demo_recommendation_requests_total{recommendation_type="catalog"}' in q for q in queries), queries
    assert not any("app_recommendations_counter_total" in q for q in queries), queries


def test_prometheus_exemplar_link_opens_demo_dashboard_logs():
    resp = requests.get(shop.url("/grafana/api/datasources/uid/webstore-metrics"), timeout=15)
    resp.raise_for_status()
    links = resp.json()["jsonData"]["exemplarTraceIdDestinations"]
    logs = [d for d in links if d.get("urlDisplayLabel") == "View in Logs (OpenSearch)"]
    assert len(logs) == 1, links
    assert logs[0]["name"] == "trace_id"
    link = logs[0]["url"]
    assert "/d/W2gX2zHVk/" in link, link
    assert "var-service=All" in link, link
    assert "var-traceId=${__value.raw}" in link, link


def test_cart_exemplars_dashboard_uses_renamed_histograms():
    queries = " ".join(q for p in _all_panels(_dashboard("ce6sd46kfkglca")["panels"]) for q in _queries(p))
    assert "demo_cart_get_cart_latency_seconds_bucket" in queries
    assert "demo_cart_add_item_latency_seconds_bucket" in queries
    assert "app_cart_" not in queries


def _renamed_columns(panel):
    organize = [t for t in panel.get("transformations", []) if t["id"] == "organize"][0]["options"]
    return list(organize["renameByName"].values())


def test_linux_dashboard_host_metadata_table(linux_dashboard):
    panel = _panel(linux_dashboard, "Host Metadata")
    assert panel["type"] == "table"
    assert any('target_info{service_name="otelcol-contrib"' in q for q in _queries(panel)), _queries(panel)
    assert sorted(_renamed_columns(panel)) == sorted(
        ["Hostname", "Architecture", "OS Type", "OS Description"]
    )


def test_linux_dashboard_cpu_metadata_table(linux_dashboard):
    panel = _panel(linux_dashboard, "CPU Metadata")
    assert panel["type"] == "table"
    assert sorted(_renamed_columns(panel)) == sorted(
        ["CPU Vendor", "CPU Family", "Model ID", "Model Name", "L2 Cache", "Stepping"]
    )


@pytest.mark.parametrize(
    "name,label,field",
    [
        ("service", "Service", "resource.service.name"),
        ("event_name", "Event Name", "eventName"),
        ("severity", "Severity", "severity.text"),
    ],
)
def test_events_by_name_filter_variables(events_by_name, name, label, field):
    var = _variable(events_by_name, name)
    assert var["label"] == label
    assert var.get("multi") is True
    assert var.get("includeAll") is True
    assert (var.get("current") or {}).get("value") in (["$__all"], "$__all")
    assert json.loads(_variable_query(var))["field"] in (field, f"{field}.keyword")


def test_events_by_name_table_filters_and_limits(events_by_name):
    panel = _panel(events_by_name, "Top Event Names by Volume")
    query = " ".join(_queries(panel))
    assert "${service:singlequote}" in query
    assert "${event_name:singlequote}" in query
    assert "${severity:singlequote}" in query
    assert re.search(r"\|\s*head 20\b", query), query


def test_events_by_name_volume_over_time_splits_by_top_five(events_by_name):
    panel = _panel(events_by_name, "Event Volume Over Time (Top Event Names)")
    assert panel["type"] == "timeseries"
    terms = [
        agg for t in panel["targets"] for agg in t.get("bucketAggs", []) if agg["type"] == "terms"
    ]
    assert terms and terms[0]["field"] in ("eventName", "eventName.keyword")
    assert str(terms[0]["settings"]["size"]) == "5"


def test_self_observability_rows_and_service_variable(self_observability):
    rows = [p["title"] for p in _all_panels(self_observability["panels"]) if p["type"] == "row"]
    assert rows == ["Overview", "Span pipeline", "Log pipeline", "Metric pipeline"]
    services = [
        v for v in self_observability["templating"]["list"] if v.get("label") == "Service"
    ]
    assert services, "no Service variable"
    var = services[0]
    assert var.get("multi") is True
    assert re.sub(r"\s", "", _variable_query(var) or var.get("definition", "")) == (
        'label_values({__name__=~"otel_sdk_.+"},service_name)'
    )


def test_spans_exported_stat_queries_successful_exports(self_observability):
    panel = _panel(self_observability, "Spans exported")
    assert panel["type"] == "stat"
    assert any(
        "otel_sdk_exporter_span_exported_total" in q and 'error_type=""' in q for q in _queries(panel)
    )


def test_export_errors_stat_sums_failed_exports(self_observability):
    query = " ".join(_queries(_panel(self_observability, "Export errors")))
    for metric in (
        "otel_sdk_exporter_span_exported_total",
        "otel_sdk_exporter_log_exported_total",
        "otel_sdk_exporter_metric_data_point_exported_total",
    ):
        assert re.search(metric + r'\{[^}]*error_type!=""', query), metric


def test_services_reporting_counts_distinct_services(self_observability):
    query = " ".join(_queries(_panel(self_observability, "Services reporting")))
    assert re.search(r"count\(\s*group by \(service_name\)", query), query
    assert '__name__=~"otel_sdk_.+"' in query


def test_sdk_components_table_lists_component_labels(self_observability):
    panel = _panel(self_observability, "SDK components reporting")
    assert panel["type"] == "table"
    query = " ".join(_queries(panel))
    assert re.search(r"group by \(service_name, otel_component_type, otel_component_name\)", query), query
    assert '__name__=~"otel_sdk_.+"' in query
    assert 'otel_component_type!=""' in query


# --- CORS, resource detection, collector logs, OpAMP, Jaeger UI -------------------


def test_otlp_http_preflight_allows_traceparent():
    resp = requests.options(
        shop.url("/otlp-http/v1/traces"),
        headers={
            "Origin": "http://example.com",
            "Access-Control-Request-Method": "POST",
            "Access-Control-Request-Headers": "traceparent",
        },
        timeout=10,
    )
    allowed = [h.strip().lower() for h in resp.headers.get("Access-Control-Allow-Headers", "").split(",")]
    assert "traceparent" in allowed, resp.headers


def test_spans_carry_detected_host_resource_attributes():
    traces = poll_until(lambda: shop.jaeger_traces("checkout", lookback="1h", limit=5),
                        "checkout traces in Jaeger")
    trace = traces[0]
    span = shop.spans(trace, "checkout")[0]
    resource = shop.process_tags(trace, span)
    assert resource.get("host.arch"), resource
    assert resource.get("os.description"), resource


def test_collector_target_info_has_host_labels():
    shop.prom_wait('target_info{service_name="otelcol-contrib",host_arch!="",os_description!=""}')


def test_container_stats_series_present_for_demo_containers():
    shop.prom_wait('container_uptime_seconds{container_name="checkout"}')
    shop.prom_wait('container_memory_rss_bytes{container_name="checkout"}')


def test_container_memory_rss_series_present():
    assert shop.prom('container_memory_rss_bytes{container_name="checkout"}'), (
        'no container_memory_rss_bytes{container_name="checkout"} series in Prometheus'
    )


def test_collector_logs_carry_no_flat_otelcol_signal_scope_attribute():
    docs = shop.os_wait(shop.term("resource.service.name.keyword", "otelcol-contrib"),
                        description="collector log records", size=500)
    flat = [d for d in docs if "otelcol.signal" in ((d.get("instrumentationScope") or {}).get("attributes") or {})]
    assert not flat, flat[:1]


def _text_rows(page):
    text = html.unescape(re.sub(r"<[^>]+>", "\n", page))
    return [line.strip() for line in text.splitlines() if line.strip()]


@pytest.fixture(scope="module")
def collector_agent_page():
    resp = requests.get(shop.url("/opamp/agent"), params={"instanceid": COLLECTOR_INSTANCE_ID}, timeout=15)
    resp.raise_for_status()
    return resp.text


def test_opamp_lists_the_collector_agent():
    resp = requests.get(shop.url("/opamp/"), timeout=15)
    resp.raise_for_status()
    assert COLLECTOR_INSTANCE_ID in resp.text


def test_opamp_collector_non_identifying_attributes(collector_agent_page):
    rows = _text_rows(collector_agent_page)
    pairs = dict(zip(rows, rows[1:]))
    assert pairs.get("deployment.environment.name") == 'string_value:"demo"'
    assert pairs.get("demo.collector.role") == 'string_value:"gateway"'


def test_opamp_collector_effective_config_holds_jaeger_exporter_and_redaction(collector_agent_page):
    rows = _text_rows(collector_agent_page)
    config = rows[rows.index("Current Effective Configuration:"):]
    assert "otlp_grpc/jaeger:" in config
    assert "redaction:" in config


def test_opamp_server_logs_collector_capabilities():
    lines = shop.container_log_lines("opamp-server", "0")
    uid = COLLECTOR_INSTANCE_ID.replace("-", "")
    caps = [
        set(re.search(r"Capabilities=\[([^\]]*)\]", line).group(1).split("|"))
        for line in lines
        if f"AgentToServer: InstanceUid={uid}" in line and "Capabilities=[" in line
    ]
    assert caps, "no AgentToServer line with capabilities for the collector"
    assert any({"ReportsEffectiveConfig", "ReportsHealth", "ReportsAvailableComponents"} <= c for c in caps), caps


def test_jaeger_ui_uses_opentelemetry_terms():
    resp = requests.get(shop.url("/jaeger/ui/"), timeout=15)
    resp.raise_for_status()
    match = re.search(r"JAEGER_CONFIG\s*=\s*(\{.*?\})\s*;?\s*(?:</script>|\n)", resp.text, re.S)
    assert match, "JAEGER_CONFIG not set on the page"
    assert json.loads(match.group(1)).get("useOpenTelemetryTerms") is True


# --- telemetry docs ---------------------------------------------------------------


def _doc_page(service):
    resp = requests.get(shop.url(f"/telemetry/services/{service}.html"), timeout=15)
    return resp


def _doc_names(page):
    text = html.unescape(re.sub(r"<[^>]+>", " ", page))
    return set(re.findall(r"\b[a-z_]+(?:\.[a-z0-9_]+)+\b", text))


def _section(page, heading):
    start = re.search(rf"<h2[^>]*>\s*{heading}\b", page)
    assert start, f"no {heading} section"
    end = re.search(r"<h2[^>]*>", page[start.end():])
    return page[start.start(): start.end() + end.start()] if end else page[start.start():]


def test_checkout_docs_list_renamed_attributes():
    resp = _doc_page("checkout")
    assert resp.status_code == 200
    names = _doc_names(resp.text)
    assert {"demo.order.id", "demo.payment.transaction.id", "demo.shipping.tracking.id"} <= names
    assert not [n for n in names if n.startswith("app.")]


def test_checkout_docs_list_pii_and_synthetic_attributes():
    names = _doc_names(_doc_page("checkout").text)
    assert {
        "user.email", "user.hash", "demo.payment.card_number", "demo.payment.card_cvv",
        "user_agent.synthetic.type",
    } <= names


def test_payment_docs_list_loyalty_level_and_transactions_metric():
    page = _doc_page("payment").text
    names = _doc_names(page)
    assert "demo.user_context.loyalty_level" in names
    assert "app.loyalty.level" not in names
    metrics = _doc_names(_section(page, "Metrics"))
    assert "demo.payment.transactions" in metrics
    assert "demo.payment.currency" in metrics


def test_currency_docs_list_exchange_attributes_and_metric():
    page = _doc_page("currency").text
    names = _doc_names(page)
    assert {"demo.exchange.from", "demo.exchange.to"} <= names
    assert "demo.exchange.conversions" in _doc_names(_section(page, "Metrics"))
    assert not [n for n in names if n.startswith("app.currency")]


def test_recommendation_docs_list_requests_metric_and_cache_attributes():
    page = _doc_page("recommendation").text
    names = _doc_names(page)
    assert "demo.recommendation.requests" in _doc_names(_section(page, "Metrics"))
    assert {"demo.feature_flag.recommendation_cache", "demo.recommendation.cache_hit"} <= names


def test_email_docs_list_confirmations_metric_without_recipient():
    page = _doc_page("email").text
    assert "demo.notification.confirmations" in _doc_names(_section(page, "Metrics"))
    assert "app.email.recipient" not in _doc_names(page)


def test_frontend_docs_list_attributes_and_no_metrics():
    page = _doc_page("frontend").text
    names = _doc_names(page)
    assert {"demo.synthetic_request", "enduser.id"} <= names
    assert not re.search(r"<h2[^>]*>\s*Metrics\b", page)


def test_cart_docs_list_latency_metrics():
    page = _doc_page("cart").text
    metrics = _doc_names(_section(page, "Metrics"))
    assert {"demo.cart.add_item.latency", "demo.cart.get_cart.latency"} <= metrics


def test_product_reviews_docs_page_is_gone():
    assert _doc_page("product_reviews").status_code == 404
