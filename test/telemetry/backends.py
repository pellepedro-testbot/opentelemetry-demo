# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

import os
import time
from datetime import datetime, timedelta, timezone

import requests


JAEGER_LOOKBACK_SECONDS = 3600

POLL_INTERVAL = 5
POLL_TIMEOUT = int(os.environ.get("POLL_TIMEOUT", "180"))


def _jaeger_time_window():
    now = datetime.now(timezone.utc)
    fmt = "%Y-%m-%dT%H:%M:%SZ"
    start = now - timedelta(seconds=JAEGER_LOOKBACK_SECONDS)
    end = now + timedelta(seconds=60)
    return start.strftime(fmt), end.strftime(fmt)


def jaeger_service_names(jaeger_url):
    resp = requests.get(f"{jaeger_url}/jaeger/ui/api/v3/services", timeout=5)
    resp.raise_for_status()
    return resp.json().get("services") or []


def jaeger_resource_spans(jaeger_url, service, num_traces=1, timeout=10):
    start, end = _jaeger_time_window()
    resp = requests.get(
        f"{jaeger_url}/jaeger/ui/api/v3/traces",
        params={
            "query.service_name": service,
            "query.num_traces": num_traces,
            "query.start_time_min": start,
            "query.start_time_max": end,
        },
        timeout=timeout,
    )
    resp.raise_for_status()
    return resp.json().get("result", {}).get("resourceSpans") or []


def poll_until(fn, description: str, timeout: int = POLL_TIMEOUT, interval: int = POLL_INTERVAL):
    """
    Poll a callable until it returns a truthy value or timeout is reached.
    Returns the result on success, raises AssertionError on timeout.
    """
    deadline = time.time() + timeout
    last_error = None
    while time.time() < deadline:
        try:
            result = fn()
            if result:
                return result
        except (requests.RequestException, KeyError, IndexError) as e:
            last_error = e
        time.sleep(interval)
    msg = f"Timed out after {timeout}s waiting for: {description}"
    if last_error:
        msg += f" (last error: {last_error})"
    raise AssertionError(msg)
