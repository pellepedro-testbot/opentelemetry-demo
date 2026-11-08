# Release 3.1.0 update: Docker Compose layout, environment and build (31 requirements)

Brings the shop up to release 3.1.0, part 9 of 10: Docker Compose layout, environment and build.

The storefront is at http://localhost:8080. Flags are read and written through /feature/api/read and /feature/api/write. Texts in quotes are exact. "Frontend log line" means a line on the frontend container's stdout.

Requirements marked *(agent stack)* need the agent, mcp and chatbot services of `compose.agent.yaml`, started on top of the default stack.

## Requirements

### SDK self-metrics

- **R87.** Checkout reports its SDK spans started to Prometheus as otel_sdk_span_started_total.
- **R88.** Checkout reports its SDK spans processed to Prometheus as otel_sdk_processor_span_processed_total.
- **R89.** Checkout reports its SDK spans exported to Prometheus as otel_sdk_exporter_span_exported_total.
- **R90.** Recommendation reports otel_sdk_span_started_total to Prometheus.
- **R91.** While generating load, the load generator reports otel_sdk_processor_span_processed_total to Prometheus.
- **R187.** Product-catalog reports its SDK spans started to Prometheus as otel_sdk_span_started_total.
- **R188.** Product-catalog reports its SDK spans processed to Prometheus as otel_sdk_processor_span_processed_total.
- **R189.** Product-catalog reports its SDK spans exported to Prometheus as otel_sdk_exporter_span_exported_total.
- **R190.** Recommendation reports otel_sdk_processor_span_processed_total to Prometheus.
- **R191.** While generating load, the load generator reports otel_sdk_log_created_total to Prometheus.

### Chatbot traces

- **R209.** Chatbot spans in Jaeger carry the resource attribute service.criticality "low". *(agent stack)*

### Checkout container

- **R219.** The checkout container runs with a read-only root filesystem (docker inspect shows HostConfig.ReadonlyRootfs true) and a tmpfs on /tmp, and still places orders.

### Email container

- **R229.** The email container reports Docker health status "healthy".

### Kafka self-observability

- **R239.** With the full stack running, Prometheus has OTel SDK self-observability series (otel_sdk_* metrics) with service_name "kafka".

### Fraud-detection self-observability

- **R249.** With the full stack running, Prometheus has OTel SDK self-observability series (otel_sdk_* metrics) with service_name "fraud-detection".

### ad container health

- **R258.** The ad container reports Docker health status "healthy" (TCP probe against AD_PORT 9555).

### currency container health

- **R267.** The currency container reports Docker health status "healthy" (nc -z probe against port 7001).

### frontend container health

- **R276.** The frontend container reports Docker health status "healthy" (node TCP connect probe against port 8080).

### frontend-proxy container health

- **R285.** The frontend-proxy container reports Docker health status "healthy" (TCP probe against ENVOY_PORT 8080).

### image-provider container health

- **R294.** The image-provider container reports Docker health status "healthy" (wget probe of http://localhost:8081/status).

### load-generator container health

- **R303.** The load-generator container reports Docker health status "healthy" (python socket probe against the Locust web port 8089).

### quote container health

- **R312.** The quote container reports Docker health status "healthy" (php fsockopen probe against port 8090).

### recommendation container health

- **R321.** The recommendation container reports Docker health status "healthy" (nc -z probe against port 9001).

### flagd-ui container health

- **R330.** The flagd-ui container reports Docker health status "healthy" (TCP probe against FLAGD_UI_PORT 4000).

### telemetry-docs container health

- **R339.** The telemetry-docs container reports Docker health status "healthy" (wget probe of http://localhost:8000/).

### astronomy-db container health

- **R348.** The astronomy-db container reports Docker health status "healthy" (pg_isready probe).

### valkey-cart container health

- **R356.** The valkey-cart container reports Docker health status "healthy" (valkey-cli ping probe).

### opamp-server container health

- **R363.** The opamp-server container reports Docker health status "healthy" (wget probe of its UI at http://localhost:4321/).

### Read-only containers

- **R370.** The product-catalog container runs with a read-only root filesystem (docker inspect shows HostConfig.ReadonlyRootfs true) and a tmpfs on /tmp, and still answers product listings (GET /api/products answers 200 with products).
- **R377.** The shipping container runs with a read-only root filesystem (docker inspect shows HostConfig.ReadonlyRootfs true) and a tmpfs on /tmp, and still answers shipping quotes (GET /api/shipping with itemList and address query parameters answers 200 with a cost).

### SDK self-observability

- **R384.** Ad reports its SDK spans started to Prometheus as otel_sdk_span_started_total with service_name "ad".
