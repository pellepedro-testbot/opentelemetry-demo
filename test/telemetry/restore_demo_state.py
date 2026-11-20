# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Put back what the shop tests change if a test stops before its own teardown:
every feature flag at its 'off' variant (productCatalogFailure's targeting
branch too), no scheduler metadata added to adFailure, and every demo
container running and unpaused. Exits 0 when there is nothing to restore.
The storefront address may be given as the first argument."""

import json
import os
import shutil
import subprocess
import sys
import urllib.request

FRONTEND_PROXY_URL = os.environ.get(
    "FRONTEND_PROXY_URL",
    "http://{}:{}".format(
        os.environ.get("FRONTEND_PROXY_HOST", "frontend-proxy"), os.environ.get("ENVOY_PORT", "8080")
    ),
)

CONTAINERS = [
    "email", "checkout", "currency", "product-catalog", "accounting",
    "fraud-detection", "valkey-cart", "cart", "payment", "shipping",
]


def restore_flags(base):
    with urllib.request.urlopen(f"{base}/feature/api/read", timeout=10) as resp:
        doc = json.load(resp)
    changed = False
    for name, spec in doc["flags"].items():
        if "off" in spec.get("variants", {}) and spec.get("defaultVariant") != "off":
            spec["defaultVariant"] = "off"
            changed = True
    targeting = doc["flags"].get("productCatalogFailure", {}).get("targeting", {}).get("if")
    if targeting and targeting[1] != "off":
        targeting[1] = "off"
        changed = True
    ad = doc["flags"].get("adFailure", {})
    if "metadata" in ad:
        del ad["metadata"]
        changed = True
    if changed:
        req = urllib.request.Request(
            f"{base}/feature/api/write",
            data=json.dumps({"data": doc}).encode(),
            headers={"Content-Type": "application/json"},
            method="POST",
        )
        urllib.request.urlopen(req, timeout=10).close()


def restore_containers():
    if shutil.which("docker") is None:
        return
    for name in CONTAINERS:
        state = subprocess.run(
            ["docker", "inspect", name, "--format", "{{.State.Status}}"],
            capture_output=True, text=True,
        ).stdout.strip()
        if state == "paused":
            subprocess.run(["docker", "unpause", name], check=False)
        elif state in ("exited", "created"):
            subprocess.run(["docker", "start", name], check=False)


def main():
    restore_containers()
    restore_flags(sys.argv[1] if len(sys.argv) > 1 else FRONTEND_PROXY_URL)
    return 0


if __name__ == "__main__":
    sys.exit(main())
