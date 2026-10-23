#!/usr/bin/env bash
# Skyramp Testbot test package: Testbot owns and maintains everything in this folder.
# The one entrypoint CI calls: installs exactly what package-lock.json pins, then runs the tests.
# Arguments pass through to `playwright test` (e.g. ./run.sh tests/checkout.e2e.ts).
set -euo pipefail
cd "$(dirname "$0")"
npm ci --no-audit --no-fund
if [ "${CI:-}" = "true" ] && [ "$(uname -s)" = "Linux" ]; then
  npx playwright install --with-deps chromium
else
  npx playwright install chromium
fi
npx playwright test "$@"
