# Accounting Service

This service consumes new orders from a Kafka topic.

## Consumer lifecycle

The order consumer runs as a hosted service. It starts consuming when the host
starts and stops when the host is asked to stop, after the order in flight has
been handled. While it is consuming, the service keeps a marker file
(`/tmp/accounting-consuming`, or `ACCOUNTING_HEALTH_FILE`) that a container
health check can test for. Start, stop and the number of orders handled are
logged as `accounting.consumer.started`, `accounting.consumer.stopping` and
`accounting.consumer.stopped`.

## Local Build

To build the service binary, navigate to the root directory of the project and run:

```sh
make generate-protobuf
```

Navigate back to `src/accounting` and execute:

```sh
dotnet build
```

## Docker Build

From the root directory, run:

```sh
docker compose build accounting
```

## Bump dependencies

To bump all dependencies run in Package manager:

```sh
Update-Package -ProjectName Accounting
```
