# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Shopping assistant failure flags (aiSlowResponse, aiRunawayAgent) and the
chatbot's OpAMP health. Needs the agentic stack, so runs only with
TEST_SCOPE=agentic."""

import os
import time

import pytest
import requests

from conftest import AGENT_URL, FRONTEND_PROXY_URL, poll_until
from storefront import flag_variant, opamp_agents

TEST_SCOPE = os.environ.get("TEST_SCOPE", "minimal")

pytestmark = pytest.mark.skipif(TEST_SCOPE != "agentic", reason="agentic scope only")

# A prompt the load generator sends (src/load-generator/locustfile.py), so the
# agent replays its recorded LLM answers.
PROMPT = "Show all available products in the store."


def _ask():
    started = time.monotonic()
    resp = requests.post(f"{AGENT_URL}/prompt", json={"message": PROMPT}, timeout=120)
    return resp, time.monotonic() - started


def test_slow_response_flag_delays_the_agent():
    baseline, baseline_seconds = _ask()
    assert baseline.status_code == 200, baseline.text
    with flag_variant("aiSlowResponse", "5sec"):
        slow, slow_seconds = _ask()
    assert slow.status_code == 200, slow.text
    assert slow.json()
    assert slow_seconds >= baseline_seconds + 5, (baseline_seconds, slow_seconds)


def test_runaway_agent_flag_hits_the_recursion_limit():
    with flag_variant("aiRunawayAgent", "on"):
        runaway, _ = _ask()
    assert "GRAPH_RECURSION_LIMIT" in runaway.text, f"{runaway.status_code} {runaway.text[:500]}"
    normal, _ = _ask()
    assert normal.status_code == 200, normal.text
    assert "GRAPH_RECURSION_LIMIT" not in normal.text


def test_chatbot_reports_health_to_opamp():
    poll_until(lambda: opamp_agents().get("chatbot") == "Up", "OpAMP admin UI lists 'chatbot' as Up")
    resp = requests.get(f"{FRONTEND_PROXY_URL}/chatbot/", timeout=15)
    assert resp.status_code == 200
