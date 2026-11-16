# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""The load generator's agent task and the agent's fault flags. Needs the
agent layer (compose.agent.yaml). The agent listens only on the demo network,
so prompts are sent from inside the load-generator container."""

import json
import os
import time

import pytest

from conftest import poll_until
from observability import (
    docker,
    jaeger_search,
    jaeger_trace,
    wait_for_logs,
)
from storefront import new_traceparent, set_flag

AGENT_PROMPTS = (
    "Show all available products in the store.",
    "What currencies are supported by the Astronomy Shop?",
    "What current promotions are available on binoculars?",
)
LOAD_GENERATOR_CONTAINER = os.environ.get("LOAD_GENERATOR_CONTAINER", "load-generator")
AGENT_CONTAINER = os.environ.get("AGENT_CONTAINER", "agent")

PROMPT_SCRIPT = """
import json, sys, time, urllib.request, urllib.error
message, traceparent = sys.argv[1], sys.argv[2]
req = urllib.request.Request(
    "http://agent:8010/prompt",
    data=json.dumps({"message": message}).encode(),
    headers={"Content-Type": "application/json", "traceparent": traceparent},
    method="POST",
)
started = time.monotonic()
try:
    with urllib.request.urlopen(req, timeout=120) as resp:
        status, body = resp.status, resp.read().decode()
except urllib.error.HTTPError as err:
    status, body = err.code, err.read().decode()
print(json.dumps({"status": status, "body": body, "elapsed": time.monotonic() - started}))
"""


def ask_agent(message):
    traceparent, trace_id = new_traceparent()
    out = docker(
        "exec", LOAD_GENERATOR_CONTAINER, "python", "-c", PROMPT_SCRIPT, message, traceparent,
        timeout=180,
    )
    assert out.returncode == 0, out.stderr
    result = json.loads(out.stdout.strip().splitlines()[-1])
    result["trace_id"] = trace_id
    return result


def restart_agent():
    docker("restart", AGENT_CONTAINER, timeout=60)

    def answering():
        try:
            return ask_agent(AGENT_PROMPTS[1])["status"] == 200
        except AssertionError:
            return False

    poll_until(
        answering,
        "agent answering prompts after restart",
        timeout=180,
    )


def tool_calls(trace_id, tool):
    spans = jaeger_trace(trace_id, require=lambda s: any(x["service"] == "agent" for x in s))
    time.sleep(10)
    spans = jaeger_trace(trace_id)
    return len([s for s in spans if s["service"] == "agent" and s["operation"] == f"execute_tool {tool}"])


@pytest.fixture(scope="module")
def ask_agent_spans():
    started_us = int(time.time() * 1_000_000)

    def traces():
        return jaeger_search("load-generator", "user_ask_agent", start_us=started_us)

    found = poll_until(traces, "user_ask_agent spans from the load generator", timeout=120)
    spans = []
    for trace in found:
        by_id = {s["spanID"]: s for s in trace["spans"]}
        for span in trace["spans"]:
            if span["operationName"] == "user_ask_agent":
                children = [
                    s for s in trace["spans"]
                    if any(r["spanID"] == span["spanID"] for r in s.get("references", []))
                ]
                spans.append(
                    {
                        "tags": {t["key"]: t["value"] for t in span["tags"]},
                        "children": [{t["key"]: t["value"] for t in c["tags"]} for c in children],
                        "by_id": by_id,
                    }
                )
    return spans


def test_load_generator_emits_user_ask_agent_spans(ask_agent_spans):
    assert len(ask_agent_spans) >= 1


def test_user_ask_agent_input_is_one_user_message(ask_agent_spans):
    messages = json.loads(ask_agent_spans[0]["tags"]["gen_ai.input.messages"])
    assert isinstance(messages, list)
    assert [m["role"] for m in messages] == ["user"]


def test_user_ask_agent_message_is_a_load_generator_prompt(ask_agent_spans):
    for span in ask_agent_spans:
        messages = json.loads(span["tags"]["gen_ai.input.messages"])
        assert messages[0]["parts"][0]["content"] in AGENT_PROMPTS


def test_user_ask_agent_has_child_post_to_agent(ask_agent_spans):
    span = ask_agent_spans[0]
    posts = [
        c for c in span["children"]
        if c.get("http.request.method", c.get("http.method")) == "POST"
        and c.get("url.full", c.get("http.url")) == "http://agent:8010/prompt"
    ]
    assert posts, span["children"]


def test_user_asking_agent_logged_and_exported():
    started = time.time()
    records = wait_for_logs(
        [
            {"match_phrase": {"resource.service.name": "load-generator"}},
            {"match_phrase_prefix": {"body": "User asking agent: "}},
            {"range": {"observedTimestamp": {"gte": int(started * 1000), "format": "epoch_millis"}}},
        ],
        "load-generator 'User asking agent' record in OpenSearch",
    )
    assert records[0]["body"][len("User asking agent: "):] in AGENT_PROMPTS


def test_ai_slow_response_delays_agent_answer():
    baseline = ask_agent(AGENT_PROMPTS[0])
    set_flag("aiSlowResponse", "5sec")
    try:
        slow = ask_agent(AGENT_PROMPTS[0])
    finally:
        set_flag("aiSlowResponse", "off")
    assert baseline["status"] == 200, baseline
    assert slow["status"] == 200, slow
    assert slow["body"]
    assert slow["elapsed"] >= baseline["elapsed"] + 5, (baseline["elapsed"], slow["elapsed"])


@pytest.fixture(scope="module")
def runaway_compared():
    restart_agent()
    off = ask_agent(AGENT_PROMPTS[0])
    set_flag("aiRunawayAgent", "on")
    try:
        on = ask_agent(AGENT_PROMPTS[0])
    finally:
        set_flag("aiRunawayAgent", "off")
    return {
        "off": off,
        "on": on,
        "off_calls": tool_calls(off["trace_id"], "get_recommendations"),
        "on_calls": tool_calls(on["trace_id"], "get_recommendations"),
    }


def test_runaway_agent_keeps_calling_tools_until_limit(runaway_compared):
    assert runaway_compared["off"]["status"] == 200, runaway_compared["off"]
    assert runaway_compared["off_calls"] <= 1
    assert runaway_compared["on_calls"] > runaway_compared["off_calls"] + 1, runaway_compared
    assert runaway_compared["on"]["elapsed"] < 120


def test_agent_answers_normally_with_runaway_off_and_after_switching_it_off():
    restart_agent()
    answers = [ask_agent(prompt) for prompt in AGENT_PROMPTS for _ in range(2)]
    set_flag("aiRunawayAgent", "on")
    try:
        ask_agent(AGENT_PROMPTS[0])
    finally:
        set_flag("aiRunawayAgent", "off", wait=10)
    answers += [ask_agent(AGENT_PROMPTS[0]) for _ in range(3)]
    bad = [
        (a["status"], a["body"][:200]) for a in answers
        if a["status"] != 200 or "GRAPH_RECURSION_LIMIT" in a["body"]
    ]
    assert bad == []
