# Release 3.1.0 update: shipping, flags, product catalog, currency and observability (97 requirements)

Brings the shop up to release 3.1.0 and adds the storefront, checkout and shipping changes planned for this release.

The storefront is at http://localhost:8080. Flags are read and written through /feature/api/read and /feature/api/write. Texts in quotes are exact. "Frontend log line" means a line on the frontend container's stdout.

## Requirements

### New feature flags

- **R51.** GET /feature/api/read lists the flag aiRunawayAgent, state ENABLED, default variant "off".
- **R52.** GET /feature/api/read lists the flag emitRawPii, state ENABLED, default variant "off".
- **R53.** aiRunawayAgent has the variants off = 0 and on = 20.
- **R54.** emitRawPii has the variants off = false and on = true.
- **R55.** Resolving emitRawPii through /flagservice returns false, variant "off", by default.
- **R150.** GET /feature/api/read lists the flag aiSlowResponse, state ENABLED, default variant "off".
- **R151.** GET /feature/api/read lists the flag productCatalogLockContention, state ENABLED, default variant "off".
- **R152.** aiSlowResponse has the variants off = 0, 5sec = 5000 and 10sec = 10000.
- **R153.** productCatalogLockContention has the variants off = false and on = true.
- **R154.** Resolving productCatalogLockContention through /flagservice returns false, variant "off", by default.

### Flag dashboard and scheduler

- **R56.** The flag dashboard at /feature/ lists aiRunawayAgent.
- **R57.** The flag dashboard at /feature/ lists emitRawPii.
- **R58.** The scheduler page at /feature/scheduler does not offer emitRawPii.
- **R59.** The scheduler page offers aiSlowResponse.
- **R60.** Setting metadata.schedulable to false on another flag, adFailure, through /feature/api/write removes it from the scheduler page.
- **R155.** The flag dashboard at /feature/ lists aiSlowResponse.
- **R156.** The flag dashboard at /feature/ lists productCatalogLockContention.
- **R157.** The scheduler page offers aiRunawayAgent.
- **R158.** The scheduler page offers productCatalogLockContention.
- **R159.** A flag with no metadata, adFailure by default, is on the scheduler page.

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

### Shipping quotes

- **R79.** GET /api/shipping for 1 item in USD answers 8.99: units 8, nanos 990000000.
- **R80.** GET /api/shipping for 4 items in USD answers 35.96: units 35, nanos 960000000.
- **R81.** GET /api/shipping for 10 items in USD answers 89.90: units 89, nanos 900000000.
- **R82.** The shipping cost in a checkout answer for 1 item in USD equals GET /api/shipping for 1 item: 8.99.
- **R83.** create_quote_from_float(71.92) gives 71 dollars and 92 cents.
- **R84.** Quote::total_cents() of a quote of 0 dollars and 5 cents is 5.
- **R85.** A quote of 10 dollars and 5 cents displays as "10.05".
- **R178.** GET /api/shipping for 2 items in USD answers 17.98: units 17, nanos 980000000.
- **R179.** GET /api/shipping for 5 items in USD answers 44.95: units 44, nanos 950000000.
- **R180.** GET /api/shipping for 3 items in USD answers 26.97 once rounded to the cent.
- **R181.** create_quote_from_float(8.99) gives 8 dollars and 99 cents.
- **R182.** Quote::total_cents() of create_quote_from_float(10.5) is 1050.
- **R183.** A quote of 0 dollars and 1 cent displays as "0.01".
- **R184.** A quote of 100 dollars and 0 cents displays as "100.00".

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

### Grafana dashboards

- **R92.** The Self-Observability dashboard has a stat panel titled "Spans processed successfully".
- **R93.** The "Spans processed successfully" panel queries otel_sdk_processor_span_processed_total with error_type="".
- **R94.** The "Spans processed successfully" and "LogRecords processed successfully" panels state in their description that they measure processor throughput, not successful export.
- **R95.** The Events by Name dashboard panel's description reads "Events grouped by service and EventName, ordered by volume."
- **R96.** The Events by Name table shows a "Service" column first, followed by "Event Name" and "Events".
- **R192.** The Self-Observability dashboard has a stat panel titled "LogRecords processed successfully".
- **R193.** The "LogRecords processed successfully" panel queries otel_sdk_processor_log_processed_total with error_type="".
- **R194.** Under load, the query behind "Spans processed successfully" returns data in Prometheus.
- **R195.** The Events by Name query groups by resource.service.name and eventName.

### Load generator

- **R97.** The user_ask_agent span has gen_ai.input.messages holding a JSON list with one message of role "user".
- **R98.** The user_ask_agent span has a child POST to http://agent:8010/prompt.
- **R196.** While generating load, the load generator emits spans named user_ask_agent.
- **R197.** The message text in gen_ai.input.messages is one of the three prompts: "Show all available products in the store.", "What currencies are supported by the Astronomy Shop?", "What current promotions are available on binoculars?".
- **R198.** The load generator logs "User asking agent: <prompt>", and the record reaches OpenSearch.
