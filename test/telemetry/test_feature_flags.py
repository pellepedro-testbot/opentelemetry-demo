# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""
The feature-flag definitions served by flagd-ui (/feature/api/read), their
resolution through flagd (/flagservice), and the server-rendered flag
dashboard and scheduler pages.
"""

import re

import pytest
import requests

from conftest import FRONTEND_PROXY_URL
from demo_stack import (
    docker,
    flag_document_restored,
    read_flags,
    resolve_flag,
    shipped_flag_document,
    wait_healthy,
    write_flags,
)


def _flag(name):
    return read_flags()["flags"][name]


def _page(path):
    resp = requests.get(f"{FRONTEND_PROXY_URL}{path}", timeout=30)
    assert resp.status_code == 200, f"{path} answered {resp.status_code}"
    return resp.text


def _variant_inputs(html, flag_name):
    return re.findall(
        r'<input[^>]*name="variants\[' + re.escape(flag_name) + r'\]\[\]"[^>]*value="([^"]*)"', html
    )


def _input_value(html, name):
    match = re.search(r'<input[^>]*name="' + re.escape(name) + r'"[^>]*value="([^"]*)"', html)
    assert match, f"no input {name}"
    return match.group(1)


@pytest.fixture(scope="module", autouse=True)
def shipped_flags():
    """A restarted flagd-ui has no scheduler running and a fresh scheduler form; the flag
    document is then reset to the committed one, which a scheduler run may have left changed."""
    docker("restart", "flagd-ui")
    wait_healthy("flagd-ui")
    write_flags(shipped_flag_document())


# --- flag definitions -------------------------------------------------------


@pytest.mark.parametrize("name", ["aiRunawayAgent", "emitRawPii", "aiSlowResponse", "productCatalogLockContention"])
def test_new_flag_is_enabled_and_off(name):
    definition = _flag(name)
    assert definition["state"] == "ENABLED"
    assert definition["defaultVariant"] == "off"


@pytest.mark.parametrize(
    "name,variants",
    [
        ("aiRunawayAgent", {"off": 0, "on": 20}),
        ("emitRawPii", {"off": False, "on": True}),
        ("aiSlowResponse", {"off": 0, "5sec": 5000, "10sec": 10000}),
        ("productCatalogLockContention", {"off": False, "on": True}),
    ],
)
def test_new_flag_variants(name, variants):
    assert _flag(name)["variants"] == variants


@pytest.mark.parametrize("name", ["emitRawPii", "productCatalogLockContention"])
def test_boolean_flag_resolves_off_by_default(name):
    result = resolve_flag("Boolean", name)
    assert result["value"] is False
    assert result["variant"] == "off"


def test_cart_failure_is_a_rate():
    definition = _flag("cartFailure")
    assert definition["defaultVariant"] == "off"
    assert definition["variants"] == {
        "off": 0, "10%": 0.1, "25%": 0.25, "50%": 0.5, "75%": 0.75, "90%": 0.9, "100%": 1,
    }


def test_cart_failure_description():
    assert _flag("cartFailure")["description"] == "Fail cart service n% of the time"


def test_cart_failure_resolves_zero_by_default():
    result = resolve_flag("Float", "cartFailure")
    assert result["value"] == 0
    assert result["variant"] == "off"


# --- flag dashboard ---------------------------------------------------------


def test_dashboard_cart_failure_select_options():
    html = _page("/feature/")
    select = re.search(r'<select[^>]*name="cartFailure".*?</select>', html, re.S)
    assert select, "no cartFailure select"
    assert re.findall(r'<option[^>]*value="([^"]*)"', select.group(0)) == [
        "10%", "100%", "25%", "50%", "75%", "90%", "off",
    ]


@pytest.mark.parametrize("name", ["aiRunawayAgent", "emitRawPii", "aiSlowResponse", "productCatalogLockContention"])
def test_dashboard_lists_new_flag(name):
    assert re.search(r'<select[^>]*name="' + name + '"', _page("/feature/"))


# --- scheduler page ---------------------------------------------------------


def test_scheduler_does_not_offer_emit_raw_pii():
    assert _variant_inputs(_page("/feature/scheduler"), "emitRawPii") == []


@pytest.mark.parametrize("name", ["aiSlowResponse", "aiRunawayAgent", "productCatalogLockContention", "adFailure"])
def test_scheduler_offers_schedulable_flag(name):
    assert _variant_inputs(_page("/feature/scheduler"), name)


def test_unschedulable_metadata_removes_flag_from_scheduler():
    with flag_document_restored() as original:
        document = read_flags()
        document["flags"]["adFailure"]["metadata"] = {"schedulable": False}
        write_flags(document)
        assert _variant_inputs(_page("/feature/scheduler"), "adFailure") == []
    assert "metadata" not in original["flags"]["adFailure"]
    assert _variant_inputs(_page("/feature/scheduler"), "adFailure")


def test_scheduler_page_offers_presets():
    html = _page("/feature/scheduler")
    for label in ("Presentation (60s / 10-20s)", "Frequent (15m / 1-3m)", "Hourly (1h / 5-15m)"):
        assert label in html


def test_scheduler_offers_each_cart_failure_rate_but_off():
    assert sorted(_variant_inputs(_page("/feature/scheduler"), "cartFailure")) == sorted(
        ["10%", "25%", "50%", "75%", "90%", "100%"]
    )


@pytest.fixture(scope="module")
def fresh_scheduler_page():
    return _page("/feature/scheduler")


def test_idle_scheduler_page(fresh_scheduler_page):
    assert "Scheduler stopped" in fresh_scheduler_page
    assert re.search(r">\s*Idle\s*<", fresh_scheduler_page)


def test_fresh_scheduler_form_defaults(fresh_scheduler_page):
    assert _input_value(fresh_scheduler_page, "interval_seconds") == "900"
    assert _input_value(fresh_scheduler_page, "min_duration_seconds") == "60"
    assert _input_value(fresh_scheduler_page, "max_duration_seconds") == "180"
    assert _input_value(fresh_scheduler_page, "concurrency") == "1"


def test_fresh_scheduler_selects_every_variant(fresh_scheduler_page):
    boxes = re.findall(r'<input[^>]*name="variants\[[^>]*>', fresh_scheduler_page)
    assert boxes
    assert [b for b in boxes if " checked" not in b] == []
