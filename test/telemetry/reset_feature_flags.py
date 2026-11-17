# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Turn off the flags test_feature_flag_scenarios.py turns on, through the flagd
UI API, and put back the committed src/flagd/demo.flagd.json the flagd UI
rewrites. Safe to run when nothing is left to undo."""

import os
import pathlib
import subprocess

import requests

FRONTEND_PROXY_URL = os.environ.get("FRONTEND_PROXY_URL", "http://localhost:8080")
REPO_ROOT = pathlib.Path(__file__).resolve().parents[2]
FLAG_FILE = "src/flagd/demo.flagd.json"


def main():
    config = requests.get(f"{FRONTEND_PROXY_URL}/feature/api/read", timeout=10)
    config.raise_for_status()
    data = config.json()
    flags = data["flags"]
    flags["productCatalogFailure"]["targeting"]["if"][1] = "off"
    flags["productCatalogLockContention"]["defaultVariant"] = "off"
    requests.post(f"{FRONTEND_PROXY_URL}/feature/api/write", json={"data": data}, timeout=10).raise_for_status()

    committed = subprocess.run(
        ["git", "show", f"HEAD:{FLAG_FILE}"], cwd=REPO_ROOT, capture_output=True, check=True
    ).stdout
    target = REPO_ROOT / FLAG_FILE
    staging = target.with_name(".demo.flagd.json.reset")
    staging.write_bytes(committed)
    os.replace(staging, target)


if __name__ == "__main__":
    main()
