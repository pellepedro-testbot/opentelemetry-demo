# Release 3.1.0 update: compose, environment, proto, build and tests (30 requirements)

Brings the shop up to release 3.1.0 and adds the storefront, checkout, cart, shipping, payment, currency, recommendation and order-processing changes planned for this release.

The storefront is at http://localhost:8080. Flags are read and written through /feature/api/read and /feature/api/write. Texts in quotes are exact. "Frontend log line" means a line on the frontend container's stdout.

## Requirements

### SDK self-metrics

- **R378.** Checkout reports its SDK spans started to Prometheus as otel_sdk_span_started_total.
- **R379.** Checkout reports its SDK spans processed to Prometheus as otel_sdk_processor_span_processed_total.
- **R380.** Checkout reports its SDK spans exported to Prometheus as otel_sdk_exporter_span_exported_total.
- **R381.** Recommendation reports otel_sdk_span_started_total to Prometheus.
- **R382.** While generating load, the load generator reports otel_sdk_processor_span_processed_total to Prometheus.
- **R383.** Product-catalog reports its SDK spans started to Prometheus as otel_sdk_span_started_total.
- **R384.** Product-catalog reports its SDK spans processed to Prometheus as otel_sdk_processor_span_processed_total.
- **R385.** Product-catalog reports its SDK spans exported to Prometheus as otel_sdk_exporter_span_exported_total.
- **R386.** Recommendation reports otel_sdk_processor_span_processed_total to Prometheus.
- **R387.** While generating load, the load generator reports otel_sdk_log_created_total to Prometheus.

### Container health checks

- **R388.** The ad container has a Docker healthcheck (a bash /dev/tcp connect to port 9555 (AD_PORT)) and docker inspect reports its health status as "healthy" once the stack is up.
- **R389.** The currency container has a Docker healthcheck (nc -z on port 7001 (CURRENCY_PORT)) and docker inspect reports its health status as "healthy" once the stack is up.
- **R390.** The email container has a Docker healthcheck (a Ruby TCPSocket connect to port 6060 (EMAIL_PORT)) and docker inspect reports its health status as "healthy" once the stack is up.
- **R391.** The frontend container has a Docker healthcheck (a node net.connect to port 8080 (FRONTEND_PORT)) and docker inspect reports its health status as "healthy" once the stack is up.
- **R392.** The frontend-proxy container has a Docker healthcheck (a bash /dev/tcp connect to port 8080 (ENVOY_PORT)) and docker inspect reports its health status as "healthy" once the stack is up.
- **R393.** The image-provider container has a Docker healthcheck (wget on http://localhost:8081/status (nginx stub_status)) and docker inspect reports its health status as "healthy" once the stack is up.
- **R394.** The load-generator container has a Docker healthcheck (a python3 socket connect to port 8089 (LOCUST_WEB_PORT)) and docker inspect reports its health status as "healthy" once the stack is up.
- **R395.** The quote container has a Docker healthcheck (php fsockopen on port 8090 (QUOTE_PORT)) and docker inspect reports its health status as "healthy" once the stack is up.
- **R396.** The recommendation container has a Docker healthcheck (nc -z on port 9001 (RECOMMENDATION_PORT)) and docker inspect reports its health status as "healthy" once the stack is up.
- **R397.** The flagd-ui container has a Docker healthcheck (a bash /dev/tcp connect to port 4000 (FLAGD_UI_PORT)) and docker inspect reports its health status as "healthy" once the stack is up.
- **R398.** The telemetry-docs container has a Docker healthcheck (wget on http://localhost:8000/ (TELEMETRY_DOCS_PORT)) and docker inspect reports its health status as "healthy" once the stack is up.
- **R399.** The astronomy-db container has a Docker healthcheck (pg_isready) and docker inspect reports its health status as "healthy" once the stack is up.
- **R400.** The valkey-cart container has a Docker healthcheck (valkey-cli ping) and docker inspect reports its health status as "healthy" once the stack is up.

### Read-only root filesystem

- **R401.** The checkout container runs with a read-only root filesystem (HostConfig.ReadonlyRootfs true) and a writable tmpfs mounted at /tmp, and stays running.
- **R402.** The product-catalog container runs with a read-only root filesystem (HostConfig.ReadonlyRootfs true) and a writable tmpfs mounted at /tmp, and stays running.
- **R403.** The shipping container runs with a read-only root filesystem (HostConfig.ReadonlyRootfs true) and a writable tmpfs mounted at /tmp, and stays running.

### Services present in the stack

- **R404.** The stack runs no product-reviews container.
- **R405.** The stack runs no llm container.

### SDK self-observability metrics

- **R406.** Ad (Java) reports its SDK spans started to Prometheus as otel_sdk_span_started_total.
- **R407.** While orders are placed, fraud-detection (Java) reports its SDK spans started to Prometheus as otel_sdk_span_started_total.
