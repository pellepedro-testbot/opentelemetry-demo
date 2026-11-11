#!/usr/bin/env bash
# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0
#
# Runs the functional test files given as arguments (default: all of them) against a
# running demo from the host, where the docker CLI reaches its containers. The
# telemetry backends are not needed, so the warmup wait is skipped.
#   test/telemetry/run_functional_tests.sh test_storefront_api.py -k checkout
set -euo pipefail

cd "$(dirname "$0")"
venv="${FUNCTIONAL_TESTS_VENV:-${TMPDIR:-/tmp}/otel-demo-functional-tests-venv}"
if [[ ! -x "$venv/bin/pytest" ]]; then
  python3 -m venv "$venv"
  "$venv/bin/pip" install --quiet --require-hashes -r requirements.txt
fi
if [[ $# -eq 0 ]]; then
  set -- test_storefront_api.py test_feature_flags.py test_order_processing.py
fi
WARMUP_PROBE_ENABLED=false WARMUP_SECONDS=0 exec "$venv/bin/pytest" --tb=short -v "$@"
