# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Put the running demo back the way the shop API tests found it, if one stopped
before its own cleanup: every flag they toggle off, email unpaused, checkout and
currency running, and the scratch currency container removed. Run from the host:

    python3 test/telemetry/restore_demo_state.py
"""

import json
import os
import subprocess
import urllib.request

FRONTEND_PROXY_URL = os.environ.get("SKYRAMP_TEST_SERVICE_URL_FRONTEND_PROXY", "http://localhost:8080")

FLAGS_OFF = [
    "cartFailure",
    "emitRawPii",
    "paymentFailure",
    "paymentUnreachable",
    "productCatalogLockContention",
    "adFailure",
]


def reset_flags():
    with urllib.request.urlopen(f"{FRONTEND_PROXY_URL}/feature/api/read", timeout=15) as resp:
        data = json.load(resp)
    for name in FLAGS_OFF:
        data["flags"][name]["defaultVariant"] = "off"
    data["flags"]["productCatalogFailure"]["targeting"]["if"][1] = "off"
    req = urllib.request.Request(
        f"{FRONTEND_PROXY_URL}/feature/api/write",
        data=json.dumps({"data": data}).encode(),
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    urllib.request.urlopen(req, timeout=15).close()


def docker(*args):
    return subprocess.run(["docker", *args], capture_output=True, text=True, check=False)


def restore_containers():
    if docker("inspect", "-f", "{{.State.Paused}}", "email").stdout.strip() == "true":
        docker("unpause", "email")
    for name in ("checkout", "currency"):
        if docker("inspect", "-f", "{{.State.Running}}", name).stdout.strip() == "false":
            docker("start", name)
    docker("rm", "-f", "currency-without-version-test")


if __name__ == "__main__":
    reset_flags()
    restore_containers()
