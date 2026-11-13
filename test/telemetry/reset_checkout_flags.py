# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Turn off the flags test_checkout_api.py and the Cypress checkout specs switch on,
for use after a run that stopped before its own teardown."""

import json
import os
import urllib.request

BASE_URL = os.environ.get("FRONTEND_PROXY_URL", "http://localhost:8080")


def main():
    with urllib.request.urlopen(f"{BASE_URL}/feature/api/read", timeout=10) as resp:
        config = json.load(resp)
    flags = config["flags"]
    flags["paymentFailure"]["defaultVariant"] = "off"
    flags["productCatalogFailure"]["targeting"]["if"][1] = "off"
    request = urllib.request.Request(
        f"{BASE_URL}/feature/api/write",
        data=json.dumps({"data": config}).encode(),
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(request, timeout=10):
        pass


if __name__ == "__main__":
    main()
