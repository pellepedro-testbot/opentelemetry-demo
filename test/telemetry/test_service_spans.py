# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""
Span attributes the load generator, ad and currency services emit under the
demo's normal traffic, read from Jaeger.
"""

import json

import pytest
import requests

from conftest import FRONTEND_PROXY_URL, poll_until
from demo_stack import docker, search_spans, wait_for_logs, wait_healthy

AGENT_PROMPTS = {
    "Show all available products in the store.",
    "What currencies are supported by the Astronomy Shop?",
    "What current promotions are available on binoculars?",
}


def _load_generator_spans(operation, lookback="30m"):
    def check():
        spans = search_spans("load-generator", operation, lookback=lookback, limit=10)
        return [s for s in spans if s["name"] == operation] and spans

    spans = poll_until(check, f"load-generator {operation} spans in Jaeger", timeout=240)
    return [s for s in spans if s["name"] == operation], spans


def _input_messages(span):
    return json.loads(span["tags"]["gen_ai.input.messages"])


@pytest.fixture(scope="module")
def ask_agent_spans():
    return _load_generator_spans("user_ask_agent")


def test_load_generator_emits_ask_agent_spans(ask_agent_spans):
    spans, _ = ask_agent_spans
    assert spans


def test_ask_agent_input_is_one_user_message(ask_agent_spans):
    for span in ask_agent_spans[0]:
        messages = _input_messages(span)
        assert isinstance(messages, list)
        assert len(messages) == 1
        assert messages[0]["role"] == "user"


def test_ask_agent_prompt_is_a_known_prompt(ask_agent_spans):
    for span in ask_agent_spans[0]:
        parts = _input_messages(span)[0]["parts"]
        assert [p["content"] for p in parts if p.get("type") == "text"][0] in AGENT_PROMPTS


def test_ask_agent_span_has_prompt_post_child(ask_agent_spans):
    spans, all_spans = ask_agent_spans
    for span in spans:
        children = [s for s in all_spans if s["parent"] == span["span_id"] and s["name"] == "POST"]
        urls = [c["tags"].get("url.full") or c["tags"].get("http.url") for c in children]
        assert "http://agent:8010/prompt" in urls, urls


def test_ask_agent_log_reaches_opensearch():
    records = wait_for_logs("User asking agent:", service="load-generator", timeout=240)
    prompt = records[0]["body"].removeprefix("User asking agent: ")
    assert records[0]["body"].startswith("User asking agent: ")
    assert prompt in AGENT_PROMPTS


def test_user_session_starts_with_index_child():
    # Sessions start when locust spawns its users; restarting the load generator
    # starts fresh ones within the lookback window.
    docker("restart", "load-generator")
    wait_healthy("load-generator")
    spans, all_spans = _load_generator_spans("user_session_start", lookback="10m")
    for span in spans:
        assert span["parent"] is None
        children = [s["name"] for s in all_spans if s["parent"] == span["span_id"]]
        assert "user_index" in children


def test_ad_server_spans_carry_session_id():
    spans = [
        s for s in search_spans("ad", "oteldemo.AdService/GetAds", limit=20)
        if s["service"] == "ad" and s["name"] == "oteldemo.AdService/GetAds"
    ]
    assert spans
    assert [s for s in spans if not s["tags"].get("session.id")] == []


def test_browse_product_spans_carry_product_id():
    spans, _ = _load_generator_spans("user_browse_product")
    assert all(s["tags"].get("demo.product.id") for s in spans)


def test_get_ads_spans_carry_ad_category():
    spans, _ = _load_generator_spans("user_get_ads")
    assert all(s["tags"].get("demo.ad.category") for s in spans)


def test_add_to_cart_spans_carry_product_and_quantity():
    spans, _ = _load_generator_spans("user_add_to_cart")
    for span in spans:
        assert span["tags"].get("demo.product.id")
        assert span["tags"]["demo.product.quantity"] in (1, 2, 3, 4, 5, 10)


def test_checkout_multi_spans_carry_item_count():
    spans, _ = _load_generator_spans("user_checkout_multi")
    for span in spans:
        assert span["tags"]["demo.cart.items.count"] in (2, 3, 4)


# --- currency ---------------------------------------------------------------


def _currency_span(method):
    operation = f"oteldemo.CurrencyService/{method}"

    def check():
        spans = search_spans("currency", operation, lookback="15m", limit=5)
        return [s for s in spans if s["service"] == "currency" and s["name"] == operation]

    return poll_until(check, f"currency {operation} span")[0]["tags"]


@pytest.fixture(scope="module")
def currency_spans():
    assert requests.get(f"{FRONTEND_PROXY_URL}/api/currency", timeout=30).status_code == 200
    assert requests.get(f"{FRONTEND_PROXY_URL}/api/products", params={"currencyCode": "EUR"}, timeout=30).status_code == 200
    return {method: _currency_span(method) for method in ("GetSupportedCurrencies", "Convert")}


@pytest.mark.parametrize("method", ["GetSupportedCurrencies", "Convert"])
def test_currency_span_rpc_system_name(currency_spans, method):
    assert currency_spans[method]["rpc.system.name"] == "grpc"


@pytest.mark.parametrize("method", ["GetSupportedCurrencies", "Convert"])
def test_currency_span_response_status(currency_spans, method):
    assert currency_spans[method]["rpc.response.status_code"] == "OK"


@pytest.mark.parametrize("method", ["GetSupportedCurrencies", "Convert"])
def test_currency_span_method(currency_spans, method):
    assert currency_spans[method]["rpc.method"] == f"oteldemo.CurrencyService/{method}"


@pytest.mark.parametrize("method", ["GetSupportedCurrencies", "Convert"])
@pytest.mark.parametrize("old_key", ["rpc.service", "rpc.system", "rpc.grpc.status_code"])
def test_currency_span_drops_old_rpc_attribute(currency_spans, method, old_key):
    assert old_key not in currency_spans[method]


def test_currency_started_log_has_event_name():
    # Currency records carry no timestamp, so they are matched by body only.
    records = wait_for_logs("Currency Server started", service="currency")
    assert {r.get("eventName") for r in records} == {"currency.server.started"}

