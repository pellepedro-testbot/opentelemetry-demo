# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""The new feature flags as the flag editor and flagd serve them."""

import pytest

from storefront import read_flags, resolve_boolean_flag


@pytest.fixture(scope="module")
def flags():
    return read_flags()["flags"]


@pytest.mark.parametrize(
    "name", ["aiRunawayAgent", "emitRawPii", "aiSlowResponse", "productCatalogLockContention"]
)
def test_new_flag_is_enabled_and_off_by_default(flags, name):
    assert name in flags
    assert (flags[name]["state"], flags[name]["defaultVariant"]) == ("ENABLED", "off")


def test_ai_runaway_agent_variants(flags):
    assert flags["aiRunawayAgent"]["variants"] == {"off": 0, "on": 20}


def test_emit_raw_pii_variants(flags):
    assert flags["emitRawPii"]["variants"] == {"off": False, "on": True}


def test_ai_slow_response_variants(flags):
    assert flags["aiSlowResponse"]["variants"] == {"off": 0, "5sec": 5000, "10sec": 10000}


def test_product_catalog_lock_contention_variants(flags):
    assert flags["productCatalogLockContention"]["variants"] == {"off": False, "on": True}


@pytest.mark.parametrize("name", ["emitRawPii", "productCatalogLockContention"])
def test_flagd_resolves_new_boolean_flag_off(name):
    resolved = resolve_boolean_flag(name)
    assert (resolved.get("value"), resolved.get("variant")) == (False, "off")
