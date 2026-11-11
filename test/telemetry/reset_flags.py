# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Put the fault-injection flags the functional tests turn on back to off.

Run it after an interrupted run: python3 test/telemetry/reset_flags.py
With --stop-scheduler it first restarts the flagd-ui container, which ends a flag
schedule that a browser test left running.
"""

import json
import os
import subprocess
import sys
import time
import urllib.request

FLAGD_UI_URL = os.environ.get("SKYRAMP_TEST_SERVICE_URL_FLAGD_UI", "http://localhost:8080") + "/feature"

DEFAULT_VARIANT_FLAGS = ("paymentFailure", "cartFailure", "productCatalogLockContention")


def read_flags(timeout=60):
    deadline = time.monotonic() + timeout
    while True:
        try:
            with urllib.request.urlopen(f"{FLAGD_UI_URL}/api/read", timeout=10) as resp:
                return json.load(resp)
        except OSError:
            if time.monotonic() > deadline:
                raise
            time.sleep(2)


def main():
    if "--stop-scheduler" in sys.argv[1:]:
        subprocess.run(["docker", "restart", "flagd-ui"], check=True, capture_output=True, timeout=120)
    data = read_flags()
    flags = data["flags"]
    for name in DEFAULT_VARIANT_FLAGS:
        if name in flags:
            flags[name]["defaultVariant"] = "off"
    if "productCatalogFailure" in flags:
        flags["productCatalogFailure"]["targeting"]["if"][1] = "off"
    req = urllib.request.Request(
        f"{FLAGD_UI_URL}/api/write",
        data=json.dumps({"data": data}).encode(),
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    urllib.request.urlopen(req, timeout=30).close()


if __name__ == "__main__":
    main()
