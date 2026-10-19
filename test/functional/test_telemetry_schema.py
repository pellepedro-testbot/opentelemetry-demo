# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Attributes the services emit are defined in the telemetry-schema registry."""

import re
from pathlib import Path

import pytest

ATTRIBUTES_DIR = Path(__file__).resolve().parents[2] / "telemetry-schema" / "attributes"


def defined_attributes():
    keys = set()
    for path in ATTRIBUTES_DIR.glob("*.yaml"):
        # "  - key: demo.payment.amount" - one attribute definition.
        keys.update(re.findall(r"^\s*-\s*key:\s*([\w.]+)\s*$", path.read_text(), re.M))
    return keys


@pytest.mark.parametrize(
    "key",
    ["demo.payment.card_network", "demo.payment.outcome", "demo.ad.categories.count", "demo.product.search.query"],
)
def test_new_attribute_defined_in_registry(key):
    """R11a, schema-defines-new-attributes"""
    assert key in defined_attributes()
