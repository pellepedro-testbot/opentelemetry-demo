# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

import ast
from pathlib import Path

import pytest

from rules_02 import bundle_rule_02_2, quote_rule_02_0

SAMPLED_RULES = [(quote_rule_02_0, 312000), (bundle_rule_02_2, 706000)]
RECOMMENDATION_SERVER = Path(__file__).resolve().parent.parent / "recommendation_server.py"


@pytest.mark.parametrize("rule", [r for r, _ in SAMPLED_RULES], ids=lambda r: r.__name__)
@pytest.mark.parametrize("items, units", [(-1, 0), (0, -1)])
def test_rule_refuses_negative_input(rule, items, units):
    with pytest.raises(ValueError):
        rule(items, units)


@pytest.mark.parametrize("rule", [r for r, _ in SAMPLED_RULES], ids=lambda r: r.__name__)
def test_rule_scores_no_items_as_zero(rule):
    assert rule(0, 100) == 0


@pytest.mark.parametrize("rule, cap", SAMPLED_RULES, ids=lambda r: getattr(r, "__name__", str(r)))
def test_rule_caps_its_score(rule, cap):
    assert rule(10000, 10**9) == cap


def test_recommendation_server_does_not_import_rules():
    tree = ast.parse(RECOMMENDATION_SERVER.read_text())
    imported = set()
    for node in ast.walk(tree):
        if isinstance(node, ast.Import):
            imported.update(alias.name for alias in node.names)
        elif isinstance(node, ast.ImportFrom):
            imported.add(node.module or "")
    assert not any(name == "rules" or name.startswith(("rules.", "rules_")) for name in imported)
