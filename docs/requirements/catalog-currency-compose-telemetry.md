# Release 3.1.0 update: product catalog, currency, OpAMP, compose and telemetry (70 requirements)

Brings the shop up to release 3.1.0 and adds the storefront, checkout, cart, shipping, payment, currency, recommendation and order-processing changes planned for this release.

The storefront is at http://localhost:8080. Flags are read and written through /feature/api/read and /feature/api/write, and resolved through /flagservice. Grafana is at /grafana, Jaeger at /jaeger, the OpAMP server UI at /opamp/, the load generator at /loadgen and the telemetry docs at /telemetry. Texts in quotes are exact. "Frontend log line" means a line on the frontend container's stdout.

## Requirements

### Product catalog lock contention

- **R252.** With productCatalogLockContention off, no ACCESS EXCLUSIVE lock is held on catalog.products.
- **R253.** The ACCESS EXCLUSIVE lock taken while productCatalogLockContention is on is held by the database user astronomy_user.
- **R254.** While productCatalogLockContention holds its lock, GET /api/currency still answers 200 within a second.
- **R255.** Within 60 seconds of turning productCatalogLockContention off, its lock is gone and GET /api/products/OLJCESPC7Z answers 200 within a second.
- **R256.** The database user astronomy_user has UPDATE on catalog.products.
- **R257.** Within 25 seconds of turning productCatalogLockContention on, an ACCESS EXCLUSIVE lock on catalog.products is granted.
- **R258.** While productCatalogLockContention holds its lock, GET /api/products/OLJCESPC7Z does not answer normally: it answers 504 after about 15 seconds or stalls until the lock ends.
- **R259.** While productCatalogLockContention holds its lock, GET /api/cart for a user with an empty cart still answers 200 within a second.
- **R260.** Product-catalog logs "lock contention scenario active: holding ACCESS EXCLUSIVE lock on catalog.products", and the record reaches OpenSearch.
- **R261.** The database user astronomy_user has no DELETE on catalog.products.
- **R262.** While productCatalogLockContention holds its lock, the waiting product-catalog query in pg_stat_activity carries a traceparent SQL comment.

### Product catalog and OpAMP

- **R263.** The product-catalog agent shows health "Up" on the OpAMP page.
- **R264.** The OpAMP agent page for product-catalog shows service.name product-catalog.
- **R265.** On SIGTERM (docker stop) product-catalog exits with code 0 well before Docker's 10-second kill.
- **R266.** The OpAMP page at /opamp/ lists an agent named product-catalog.
- **R267.** product-catalog spans have a service.instance.id resource attribute equal to the OpAMP instance id, without dashes.
- **R268.** Product-catalog reports the ReportsHealth capability to the OpAMP server.
- **R269.** After a restart, product-catalog registers with the OpAMP server again.
- **R270.** Jaeger holds no grpc.health.v1.Health/Check spans from service product-catalog, although compose probes its health every 5 seconds.

### Database init

- **R271.** astronomy_db has no reviews schema: the table reviews.productreviews does not exist.

### OpAMP server container

- **R272.** The stack runs an opamp-server container whose Docker healthcheck reports healthy.

### OpAMP UI under /opamp/

- **R273.** The OpAMP agent list at /opamp/ links each agent as /opamp/agent?instanceid=<id>, so the links work through the frontend proxy.
- **R274.** An OpAMP agent page links back to the agent list with href="/opamp/".
- **R275.** An OpAMP agent page has no "OpAMP Connection Settings" section, so the demo UI cannot push connection settings.
- **R276.** An OpAMP agent page has no "Custom Messages" section.

### Currency span attributes

- **R277.** The currency span for GetSupportedCurrencies has rpc.system.name "grpc".
- **R278.** The currency span for GetSupportedCurrencies has rpc.response.status_code "OK".
- **R279.** The currency span for GetSupportedCurrencies no longer has rpc.service.
- **R280.** The currency span for Convert has rpc.system.name "grpc".
- **R281.** The currency span for Convert has rpc.response.status_code "OK".
- **R282.** The currency span for Convert no longer has rpc.service.
- **R283.** The currency span for GetSupportedCurrencies has rpc.method "oteldemo.CurrencyService/GetSupportedCurrencies".
- **R284.** The currency span for GetSupportedCurrencies no longer has rpc.system.
- **R285.** The currency span for GetSupportedCurrencies no longer has rpc.grpc.status_code.
- **R286.** The currency span for Convert has rpc.method "oteldemo.CurrencyService/Convert".
- **R287.** The currency span for Convert no longer has rpc.system.
- **R288.** The currency span for Convert no longer has rpc.grpc.status_code.

### Currency shutdown

- **R289.** On SIGTERM the currency service prints "Received SIGTERM, shutting down Currency Server".
- **R290.** On SIGTERM the currency container exits with code 0.
- **R291.** docker stop on the currency container finishes within 9 seconds, before Docker's kill.
- **R292.** Currency logs "Currency Server started" with eventName currency.server.started at start-up.
- **R293.** On SIGINT the currency service prints "Received SIGINT, shutting down Currency Server".
- **R294.** On SIGINT the currency container exits with code 0.
- **R295.** The currency shutdown log record reaches OpenSearch before the service exits, with eventName currency.server.stopping.

### Currency environment handling

- **R296.** With IPV6_ENABLED=true, currency logs "Overwriting Localhost IP" with eventName currency.server.ip_overwrite and server.address "[::]", and the record reaches OpenSearch.
- **R297.** With VERSION unset, the currency service still starts and GET /api/currency answers 200.

### Recommendation metric

- **R298.** The metric name carries no "recommendations" unit suffix: demo_recommendation_requests_recommendations_total does not exist.
- **R299.** Recommendation requests are counted in the Prometheus metric demo_recommendation_requests_total.
- **R300.** demo_recommendation_requests_total grows after GET /api/recommendations calls.

### SDK self-metrics

- **R301.** Checkout reports its SDK spans started to Prometheus as otel_sdk_span_started_total.
- **R302.** Checkout reports its SDK spans processed to Prometheus as otel_sdk_processor_span_processed_total.
- **R303.** Checkout reports its SDK spans exported to Prometheus as otel_sdk_exporter_span_exported_total.
- **R304.** Recommendation reports otel_sdk_span_started_total to Prometheus.
- **R305.** While generating load, the load generator reports otel_sdk_processor_span_processed_total to Prometheus.
- **R306.** Product-catalog reports its SDK spans started to Prometheus as otel_sdk_span_started_total.
- **R307.** Product-catalog reports its SDK spans processed to Prometheus as otel_sdk_processor_span_processed_total.
- **R308.** Product-catalog reports its SDK spans exported to Prometheus as otel_sdk_exporter_span_exported_total.
- **R309.** Recommendation reports otel_sdk_processor_span_processed_total to Prometheus.
- **R310.** While generating load, the load generator reports otel_sdk_log_created_total to Prometheus.
- **R311.** Ad reports otel_sdk_span_started_total to Prometheus (service_name="ad").
- **R312.** Fraud-detection reports otel_sdk_span_started_total to Prometheus (service_name="fraud-detection").

### Removed services

- **R313.** The running stack has no product-reviews container: docker compose ps lists no service named product-reviews.
- **R314.** The running stack has no llm container: docker compose ps lists no service named llm.

### Jaeger OpenTelemetry terms

- **R315.** GET /jaeger/ui/ returns the Jaeger UI page with its embedded JAEGER_CONFIG setting useOpenTelemetryTerms to true.

### Telemetry schema docs

- **R316.** The Payment page at /telemetry/services/payment/ lists demo.payment.card_cvv with description "Credit card CVV".
- **R317.** The Payment page at /telemetry/services/payment/ lists demo.payment.card_number with description "Credit card number".
- **R318.** The Checkout page at /telemetry/services/checkout/ lists user.hash.
- **R319.** The Checkout page at /telemetry/services/checkout/ lists user_agent.synthetic.type.
- **R320.** The Load Generator page at /telemetry/services/load_generator/ lists demo.request.flood.count with description "Number of repeated requests sent in a flood".
- **R321.** The telemetry docs have no Product Reviews page: GET /telemetry/services/product_reviews/ answers 404.
