# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""Turn off the feature flags test_storefront_api.py switches on, in case a run stopped
before its own fixtures restored them. Safe to run when they are already off."""

import json
import os
import urllib.request

FRONTEND_PROXY_URL = os.environ.get("FRONTEND_PROXY_URL", "http://localhost:8080")


def main():
    with urllib.request.urlopen(f"{FRONTEND_PROXY_URL}/feature/api/read", timeout=10) as resp:
        config = json.load(resp)
    flags = config["flags"]
    flags["paymentFailure"]["defaultVariant"] = "off"
    flags["emitRawPii"]["defaultVariant"] = "off"
    flags["productCatalogFailure"]["targeting"]["if"][1] = "off"
    request = urllib.request.Request(
        f"{FRONTEND_PROXY_URL}/feature/api/write",
        data=json.dumps({"data": config}).encode(),
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(request, timeout=10):
        pass


if __name__ == "__main__":
    main()
