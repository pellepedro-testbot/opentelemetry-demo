# Shipping Service

The Shipping service queries `quote` for price quote, provides tracking IDs,
and the impression of order fulfillment & shipping processes.

## Local

This repo assumes you have rust 1.82 installed. You may use docker, or
[install rust](https://www.rust-lang.org/tools/install).

## Build

From `../../`, run:

```sh
docker compose build shipping
```

## Test

```sh
cargo test
```

## Feature Flags

* `intlShippingSlowdown`: integer flag (default 0). When non-zero, non-US
  shipping requests are delayed by the flag's value in seconds to simulate
  overseas shipping latency. US addresses are never affected.

Shipping starts even when flagd is not reachable yet. It tries to connect a
few times at startup; if flagd still does not answer, it starts serving with
every flag at its default value and keeps connecting in the background, with
growing pauses up to 30 seconds. Once flagd answers, flags are read from flagd.

## Environment Variables

| Variable           | Default | Description                   |
|--------------------|---------|-------------------------------|
| `FLAGD_HOST`       | `flagd` | Hostname of the flagd service |
| `FLAGD_OFREP_PORT` | `8016`  | Port for the flagd OFREP API  |
