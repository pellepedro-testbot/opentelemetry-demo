# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""
Put the running demo back the way the telemetry tests found it, for when a test
that disturbs it (flags, paused or stopped containers, probe containers, a
KAFKA_TOPIC override) stops before its own teardown. Safe to run at any time.

    python3 test/telemetry/restore_demo_state.py
"""

import json
import os
import subprocess

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
COMPOSE = [
    "docker", "compose", "--env-file", ".env", "--env-file", ".env.override",
    "-f", "compose.yaml", "-f", "compose.full.yaml", "-f", "compose.observability.yaml", "-f", "compose.extras.yaml",
]
DISTURBED = ["email", "quote", "checkout", "currency", "accounting", "product-catalog", "fraud-detection"]
PROBES = ["currency-ipv6-probe", "currency-noversion-probe"]


def run(*args):
    return subprocess.run(list(args), capture_output=True, text=True, cwd=ROOT)


def state(container):
    result = run("docker", "inspect", "-f", "{{json .State}}", container)
    return json.loads(result.stdout) if result.returncode == 0 else None


def main():
    run("git", "checkout", "--", "src/flagd/demo.flagd.json")
    for probe in PROBES:
        run("docker", "rm", "-f", probe)
    checkout_env = run("docker", "inspect", "-f", "{{json .Config.Env}}", "checkout").stdout
    if "KAFKA_TOPIC=orders-alt" in checkout_env or "OTEL_EXPORTER_OTLP_ENDPOINT=http://otel-collector" not in checkout_env:
        keep = ("PATH", "HOME", "DOCKER_HOST", "DOCKER_CONFIG", "DOCKER_CONTEXT", "XDG_RUNTIME_DIR")
        env = {k: v for k, v in os.environ.items() if k in keep}
        subprocess.run(
            COMPOSE + ["up", "-d", "--no-deps", "--no-build", "checkout", "fraud-detection", "accounting"],
            cwd=ROOT, env=env, capture_output=True, text=True,
        )
    for container in DISTURBED:
        current = state(container)
        if current is None:
            continue
        if current.get("Paused"):
            run("docker", "unpause", container)
        elif not current.get("Running"):
            run("docker", "start", container)


if __name__ == "__main__":
    main()
