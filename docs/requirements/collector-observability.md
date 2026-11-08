# Release 3.1.0 update: collector, Grafana, Jaeger, OpenSearch and telemetry schema (58 requirements)

Brings the shop up to release 3.1.0 and adds the storefront, checkout, cart, shipping, payment, currency, recommendation and order-processing changes planned for this release.

The storefront is at http://localhost:8080. Flags are read and written through /feature/api/read and /feature/api/write. Texts in quotes are exact. "Frontend log line" means a line on the frontend container's stdout.

## Requirements

### Collector redaction

- **R320.** A span sent to the collector with a "password" attribute is exported with the value "****".
- **R321.** A span attribute whose key contains "secret", such as db.secret.key, is exported with the value "****".
- **R322.** A numeric-looking demo.order.id such as 1234567812345678 passes through the collector unchanged.
- **R323.** A card-like value under an unrelated key, such as note = "4111 1111 1111 1111", passes through unchanged, because redaction matches keys and not values.
- **R324.** A user.email sent directly to the collector is not exported; user.hash holds its SHA-256 hex instead.
- **R325.** A span with demo.payment.card_number carries redaction.ignored.count 1.
- **R326.** A span with no sensitive attributes has no redaction.masked.count attribute.
- **R327.** A span sent to the collector with a demo.payment.card_pin attribute is exported with the value "****".
- **R328.** A span attribute whose key contains "password", such as user_password, is exported with the value "****".
- **R329.** An unrelated attribute such as demo.keep passes through the collector unchanged.
- **R330.** A demo.payment.card_number of 4432-8015-6152-0454 sent directly to the collector is exported as ****-****-****-0454.
- **R331.** A span with masked attributes carries redaction.masked.count equal to the number of attributes masked.
- **R332.** The redaction summary is counts only: the span has no redaction.masked.keys or redaction.ignored.keys attribute.

### Grafana dashboards

- **R333.** The Self-Observability dashboard has a stat panel titled "Spans processed successfully".
- **R334.** The "Spans processed successfully" panel queries otel_sdk_processor_span_processed_total with error_type="".
- **R335.** The "Spans processed successfully" and "LogRecords processed successfully" panels state in their description that they measure processor throughput, not successful export.
- **R336.** The Events by Name dashboard panel's description reads "Events grouped by service and EventName, ordered by volume."
- **R337.** The Events by Name table shows a "Service" column first, followed by "Event Name" and "Events".
- **R338.** The Self-Observability dashboard has a stat panel titled "LogRecords processed successfully".
- **R339.** The "LogRecords processed successfully" panel queries otel_sdk_processor_log_processed_total with error_type="".
- **R340.** Under load, the query behind "Spans processed successfully" returns data in Prometheus.
- **R341.** The Events by Name query groups by resource.service.name and eventName.

### Collector receivers and processors

- **R342.** A CORS preflight OPTIONS /otlp-http/v1/traces with an Origin header and Access-Control-Request-Headers: traceparent is answered with an Access-Control-Allow-Headers header that includes traceparent.
- **R343.** Spans in Jaeger carry the resource attributes host.arch and os.description, added by the collector's resource_detection processor.
- **R344.** In Prometheus, target_info{service_name="otelcol-contrib"} has host_arch and os_description labels.
- **R345.** Prometheus has container_uptime_seconds and container_memory_rss_bytes series for the demo containers, for example with container_name="checkout".
- **R346.** No collector log record in OpenSearch carries a flat otelcol.signal scope attribute; the collector renames it to otelcol_signal before export.

### Collector OpAMP status

- **R347.** The OpAMP page at /opamp/ lists an agent with instance id 00000000-0000-7000-8000-000000000001, which is the OTel Collector.
- **R348.** The OpAMP agent page for instance 00000000-0000-7000-8000-000000000001 shows the non-identifying attributes deployment.environment.name "demo" and demo.collector.role "gateway".
- **R349.** The OpAMP agent page for the collector shows its effective configuration, which contains the otlp_grpc/jaeger exporter and the redaction processor.
- **R350.** When the collector connects, the opamp-server log shows capabilities for instance 00000000-0000-7000-8000-000000000001 that include ReportsEffectiveConfig, ReportsHealth and ReportsAvailableComponents.

### Jaeger UI

- **R351.** The page served at /jaeger/ui/ sets JAEGER_CONFIG to an object with "useOpenTelemetryTerms": true.

### Grafana demo dashboard

- **R352.** The Demo Dashboard (uid W2gX2zHVk) has a textbox variable traceId labelled "Trace ID", empty by default.
- **R353.** The Demo Dashboard's Service variable allows several values and offers an "All" option.
- **R354.** The Demo Dashboard's span-metrics panels (Requests Rate, Error Rate and Average Duration by Span Name) match the service with service_name=~"(${service:regex})" instead of an exact service_name match.
- **R355.** The Demo Dashboard's log panels ("Log Records by Severity" and "Log Records (100 recent entries)") filter on resource.service.name in (${service:singlequote}) and on traceId="${traceId}" when a Trace ID is set.
- **R356.** The Demo Dashboard's "Recommendations Rate" panel queries demo_recommendation_requests_total{recommendation_type="catalog"}, not app_recommendations_counter_total.

### Grafana exemplars

- **R357.** The Prometheus datasource (uid webstore-metrics) has an exemplar trace_id link labelled "View in Logs (OpenSearch)" that opens the Demo Dashboard with var-service=All and var-traceId set to the exemplar's trace id.
- **R358.** The Cart Service Exemplars dashboard queries demo_cart_get_cart_latency_seconds_bucket and demo_cart_add_item_latency_seconds_bucket, not the app_cart_* names.

### Grafana Linux dashboard

- **R359.** The Linux dashboard (uid otel-demo-hostmetrics) has a "Host Metadata" table panel over target_info{service_name="otelcol-contrib"} with the columns Hostname, Architecture, OS Type and OS Description.
- **R360.** The Linux dashboard has a "CPU Metadata" table panel with the columns CPU Vendor, CPU Family, Model ID, Model Name, L2 Cache and Stepping.

### Grafana Events by Name dashboard

- **R361.** The Events by Name dashboard (uid otel-demo-events-by-name) has multi-value variables Service, Event Name and Severity, each defaulting to All and filled from the OpenSearch log fields resource.service.name, eventName and severity.text.
- **R362.** The Events by Name table is titled "Top Event Names by Volume", filters by the Service, Event Name and Severity variables, and shows at most 20 rows.
- **R363.** The Events by Name dashboard has a timeseries panel "Event Volume Over Time (Top Event Names)" that splits event counts by the top 5 eventName values.

### Grafana Self-Observability dashboard

- **R364.** The Self-Observability dashboard (uid self-observability) has the rows Overview, Span pipeline, Log pipeline and Metric pipeline, and a multi-value Service variable filled from label_values({__name__=~"otel_sdk_.+"}, service_name).
- **R365.** The Self-Observability "Spans exported" stat queries otel_sdk_exporter_span_exported_total with error_type="".
- **R366.** The Self-Observability "Export errors" stat sums the error_type!="" rates of otel_sdk_exporter_span_exported_total, otel_sdk_exporter_log_exported_total and otel_sdk_exporter_metric_data_point_exported_total.
- **R367.** The Self-Observability "Services reporting" stat counts the distinct service_name values that emit otel_sdk_* metrics.
- **R368.** The Self-Observability "SDK components reporting" table lists service_name, otel_component_type and otel_component_name for every otel_sdk_* series with a component type.

### Telemetry schema docs (/telemetry/)

- **R369.** The telemetry docs page /telemetry/services/checkout.html lists demo.order.id, demo.payment.transaction.id and demo.shipping.tracking.id, and no app.* attribute.
- **R370.** The checkout docs page also lists user.email, user.hash, demo.payment.card_number, demo.payment.card_cvv and user_agent.synthetic.type.
- **R371.** The telemetry docs page /telemetry/services/payment.html lists demo.user_context.loyalty_level (not app.loyalty.level) and the metric demo.payment.transactions with attribute demo.payment.currency.
- **R372.** The telemetry docs page /telemetry/services/currency.html lists demo.exchange.from and demo.exchange.to, and the metric demo.exchange.conversions, not app.currency.
- **R373.** The telemetry docs page /telemetry/services/recommendation.html lists the metric demo.recommendation.requests and the attributes demo.feature_flag.recommendation_cache and demo.recommendation.cache_hit.
- **R374.** The telemetry docs page /telemetry/services/email.html lists the metric demo.notification.confirmations and no app.email.recipient attribute.
- **R375.** The telemetry docs page /telemetry/services/frontend.html lists demo.synthetic_request and enduser.id and has no Metrics section, since app.frontend.requests is gone from the schema.
- **R376.** The telemetry docs page /telemetry/services/cart.html lists the metrics demo.cart.add_item.latency and demo.cart.get_cart.latency.
- **R377.** /telemetry/services/product_reviews.html answers 404: the docs no longer have a Product Reviews page.
