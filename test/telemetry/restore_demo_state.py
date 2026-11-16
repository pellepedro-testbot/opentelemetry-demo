# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Put back what the behaviour tests change in a running demo, in case a test
stopped before its own teardown: every flag at its resting variant, no
scheduling metadata on adFailure, the email service unpaused and the
containers the tests stop started again. Safe to run when nothing changed."""

import json
import os
import subprocess
import sys
import urllib.request

FRONTEND_PROXY_URL = os.environ.get(
    "FRONTEND_PROXY_URL",
    f"http://{os.environ.get('FRONTEND_PROXY_HOST', 'frontend-proxy')}:{os.environ.get('ENVOY_PORT', '8080')}",
)
FLAGS_AT_REST = (
    "paymentFailure",
    "paymentUnreachable",
    "emitRawPii",
    "productCatalogLockContention",
    "aiSlowResponse",
    "aiRunawayAgent",
)
STOPPED_BY_TESTS = ("checkout", "currency", "product-catalog")


def restore_flags():
    with urllib.request.urlopen(f"{FRONTEND_PROXY_URL}/feature/api/read", timeout=10) as resp:
        config = json.load(resp)
    flags = config["flags"]
    changed = False
    for name in FLAGS_AT_REST:
        if name in flags and flags[name].get("defaultVariant") != "off":
            flags[name]["defaultVariant"] = "off"
            changed = True
    targeting = flags.get("productCatalogFailure", {}).get("targeting", {}).get("if")
    if targeting and targeting[1] != "off":
        targeting[1] = "off"
        changed = True
    if "metadata" in flags.get("adFailure", {}):
        del flags["adFailure"]["metadata"]
        changed = True
    if changed:
        req = urllib.request.Request(
            f"{FRONTEND_PROXY_URL}/feature/api/write",
            data=json.dumps({"data": config}).encode(),
            headers={"Content-Type": "application/json"},
            method="POST",
        )
        urllib.request.urlopen(req, timeout=10).close()


def restore_containers():
    def state(name):
        out = subprocess.run(
            ["docker", "inspect", "-f", "{{.State.Status}}", name],
            capture_output=True, text=True,
        )
        return out.stdout.strip()

    if state("email") == "paused":
        subprocess.run(["docker", "unpause", "email"], check=True)
    for name in STOPPED_BY_TESTS:
        if state(name) == "exited":
            subprocess.run(["docker", "start", name], check=True)


if __name__ == "__main__":
    restore_flags()
    restore_containers()
    sys.exit(0)
