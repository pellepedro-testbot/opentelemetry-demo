# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Reads from the demo's backends (Jaeger, OpenSearch, Prometheus) and from
container stdout, shared by the behaviour tests."""

import json
import subprocess
import time

import requests

from conftest import JAEGER_URL, OPENSEARCH_URL, PROMETHEUS_URL, poll_until


def docker(*args, timeout=60):
    return subprocess.run(
        ["docker", *args], capture_output=True, text=True, timeout=timeout
    )


def container_json_lines(container, since):
    """Parse the JSON log lines a container wrote to stdout/stderr since a unix time."""
    out = docker("logs", container, "--since", str(int(since) - 1))
    lines = []
    for raw in (out.stdout + "\n" + out.stderr).splitlines():
        raw = raw.strip()
        if not raw.startswith("{"):
            continue
        try:
            lines.append(json.loads(raw))
        except ValueError:
            continue
    return lines


def container_text(container, since):
    out = docker("logs", container, "--since", str(int(since) - 1))
    return out.stdout + out.stderr


def frontend_lines_for_trace(trace_id, since, wait=True):
    """Frontend pino lines that carry the given trace id."""

    def lines():
        return [
            line
            for line in container_json_lines("frontend", since)
            if line.get("trace_id") == trace_id
        ]

    if not wait:
        return lines()
    return poll_until(lines, f"frontend log lines for trace {trace_id}", timeout=30, interval=2)


def jaeger_trace(trace_id, require=None, timeout=90):
    """Spans of a trace as dicts with service, operation, tags, logs and kind.
    Polls until `require(spans)` holds, so late spans have arrived."""

    def fetch():
        resp = requests.get(f"{JAEGER_URL}/jaeger/ui/api/traces/{trace_id}", timeout=10)
        if resp.status_code != 200:
            return None
        spans = []
        for trace in resp.json().get("data") or []:
            processes = trace["processes"]
            for span in trace["spans"]:
                process = processes[span["processID"]]
                spans.append(
                    {
                        "service": process["serviceName"],
                        "process_tags": {t["key"]: t["value"] for t in process.get("tags", [])},
                        "operation": span["operationName"],
                        "span_id": span["spanID"],
                        "references": span.get("references", []),
                        "tags": {t["key"]: t["value"] for t in span.get("tags", [])},
                        "events": [
                            {f["key"]: f["value"] for f in log.get("fields", [])}
                            for log in span.get("logs", [])
                        ],
                    }
                )
        if not spans:
            return None
        if require is not None and not require(spans):
            return None
        return spans

    return poll_until(fetch, f"trace {trace_id} in Jaeger", timeout=timeout, interval=3)


def find_span(spans, service, operation):
    matches = [s for s in spans if s["service"] == service and s["operation"] == operation]
    return matches[0] if matches else None


def has_span(service, operation):
    return lambda spans: find_span(spans, service, operation) is not None


CHECKOUT_ROUTE_SPAN = "executing api route (pages) /api/checkout"


def checkout_route_span(trace_id):
    """The frontend span the /api/checkout handler marks, once Jaeger has it."""
    spans = jaeger_trace(trace_id, require=has_span("frontend", CHECKOUT_ROUTE_SPAN))
    return find_span(spans, "frontend", CHECKOUT_ROUTE_SPAN)


def jaeger_search(service, operation=None, start_us=None, limit=20, tags=None):
    params = {"service": service, "limit": limit}
    if operation:
        params["operation"] = operation
    if start_us:
        params["start"] = int(start_us)
        params["end"] = int(time.time() * 1_000_000) + 60_000_000
    else:
        params["lookback"] = "1h"
    if tags:
        params["tags"] = json.dumps(tags)
    resp = requests.get(f"{JAEGER_URL}/jaeger/ui/api/traces", params=params, timeout=15)
    resp.raise_for_status()
    return resp.json().get("data") or []


def opensearch_logs(must, size=50):
    """Log records in otel-logs-* matching the bool `must` clauses, newest first."""
    resp = requests.post(
        f"{OPENSEARCH_URL}/otel-logs-*/_search",
        json={
            "size": size,
            "query": {"bool": {"must": must}},
            "sort": [{"@timestamp": "desc"}],
        },
        timeout=15,
    )
    resp.raise_for_status()
    return [hit["_source"] for hit in resp.json()["hits"]["hits"]]


def service_body_query(service, body):
    return [
        {"match_phrase": {"resource.service.name": service}},
        {"match_phrase": {"body": body}},
    ]


def wait_for_logs(must, description, timeout=90):
    return poll_until(lambda: opensearch_logs(must), description, timeout=timeout, interval=3)


def attribute(record, key):
    """Attribute of an OpenSearch log record, whether the exporter stored the
    dotted key flat or as nested objects."""
    attrs = record.get("attributes") or {}
    if key in attrs:
        return attrs[key]
    node = attrs
    for part in key.split("."):
        if not isinstance(node, dict) or part not in node:
            return None
        node = node[part]
    return node


def prometheus_query(query):
    resp = requests.get(
        f"{PROMETHEUS_URL}/api/v1/query", params={"query": query}, timeout=15
    )
    resp.raise_for_status()
    return resp.json()["data"]["result"]


def prometheus_sum(query):
    result = prometheus_query(f"sum({query})")
    return float(result[0]["value"][1]) if result else 0.0


def stop_container(name):
    """`docker stop` with Docker's default 10s grace period. Returns how long it
    took and the container's exit code."""
    started = time.monotonic()
    docker("stop", name, timeout=30)
    elapsed = time.monotonic() - started
    exit_code = docker("inspect", "-f", "{{.State.ExitCode}}", name).stdout.strip()
    return elapsed, int(exit_code)


def start_container_and_wait(name, timeout=120):
    docker("start", name)

    def ready():
        status = docker(
            "inspect", "-f", "{{if .State.Health}}{{.State.Health.Status}}{{else}}{{.State.Status}}{{end}}", name
        ).stdout.strip()
        return status in ("healthy", "running") and status

    poll_until(ready, f"container {name} up again", timeout=timeout, interval=2)
