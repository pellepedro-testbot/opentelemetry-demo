# Release 3.1.0 update: product catalog, currency and SDK telemetry (49 requirements)

Brings the shop up to release 3.1.0 and adds the storefront, checkout and shipping changes planned for this release.

The storefront is at http://localhost:8080. Flags are read and written through /feature/api/read and /feature/api/write. Texts in quotes are exact. "Frontend log line" means a line on the frontend container's stdout.

## Requirements

### Product catalog lock contention

- **R61.** With productCatalogLockContention off, no ACCESS EXCLUSIVE lock is held on catalog.products.
- **R62.** The ACCESS EXCLUSIVE lock taken while productCatalogLockContention is on is held by the database user astronomy_user.
- **R63.** While productCatalogLockContention holds its lock, GET /api/currency still answers 200 within a second.
- **R64.** Within 60 seconds of turning productCatalogLockContention off, its lock is gone and GET /api/products/OLJCESPC7Z answers 200 within a second.
- **R65.** The database user astronomy_user has UPDATE on catalog.products.
- **R160.** Within 25 seconds of turning productCatalogLockContention on, an ACCESS EXCLUSIVE lock on catalog.products is granted.
- **R161.** While productCatalogLockContention holds its lock, GET /api/products/OLJCESPC7Z does not answer normally: it answers 504 after about 15 seconds or stalls until the lock ends.
- **R162.** While productCatalogLockContention holds its lock, GET /api/cart for a user with an empty cart still answers 200 within a second.
- **R163.** Product-catalog logs "lock contention scenario active: holding ACCESS EXCLUSIVE lock on catalog.products", and the record reaches OpenSearch.
- **R164.** The database user astronomy_user has no DELETE on catalog.products.

### Product catalog and OpAMP

- **R66.** The product-catalog agent shows health "Up" on the OpAMP page.
- **R67.** The OpAMP agent page for product-catalog shows service.name product-catalog.
- **R68.** On SIGTERM (docker stop) product-catalog exits with code 0 well before Docker's 10-second kill.
- **R165.** The OpAMP page at /opamp/ lists an agent named product-catalog.
- **R166.** product-catalog spans have a service.instance.id resource attribute equal to the OpAMP instance id, without dashes.
- **R167.** Product-catalog reports the ReportsHealth capability to the OpAMP server.
- **R168.** After a restart, product-catalog registers with the OpAMP server again.

### Currency span attributes

- **R69.** The currency span for GetSupportedCurrencies has rpc.system.name "grpc".
- **R70.** The currency span for GetSupportedCurrencies has rpc.response.status_code "OK".
- **R71.** The currency span for GetSupportedCurrencies no longer has rpc.service.
- **R72.** The currency span for Convert has rpc.system.name "grpc".
- **R73.** The currency span for Convert has rpc.response.status_code "OK".
- **R74.** The currency span for Convert no longer has rpc.service.
- **R169.** The currency span for GetSupportedCurrencies has rpc.method "oteldemo.CurrencyService/GetSupportedCurrencies".
- **R170.** The currency span for GetSupportedCurrencies no longer has rpc.system.
- **R171.** The currency span for GetSupportedCurrencies no longer has rpc.grpc.status_code.
- **R172.** The currency span for Convert has rpc.method "oteldemo.CurrencyService/Convert".
- **R173.** The currency span for Convert no longer has rpc.system.
- **R174.** The currency span for Convert no longer has rpc.grpc.status_code.

### Currency shutdown

- **R75.** On SIGTERM the currency service prints "Received SIGTERM, shutting down Currency Server".
- **R76.** On SIGTERM the currency container exits with code 0.
- **R77.** docker stop on the currency container finishes within 9 seconds, before Docker's kill.
- **R78.** Currency logs "Currency Server started" with eventName currency.server.started at start-up.
- **R175.** On SIGINT the currency service prints "Received SIGINT, shutting down Currency Server".
- **R176.** On SIGINT the currency container exits with code 0.
- **R177.** The currency shutdown log record reaches OpenSearch before the service exits, with eventName currency.server.stopping.

### Recommendation metric

- **R86.** The metric name carries no "recommendations" unit suffix: demo_recommendation_requests_recommendations_total does not exist.
- **R185.** Recommendation requests are counted in the Prometheus metric demo_recommendation_requests_total.
- **R186.** demo_recommendation_requests_total grows after GET /api/recommendations calls.

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
