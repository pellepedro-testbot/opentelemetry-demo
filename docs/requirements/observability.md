# Release 3.1.0 update: collector, Grafana, Jaeger, OpenSearch, OpAMP server and telemetry schema (68 requirements)

Brings the shop up to release 3.1.0, part 7 of 10: collector, Grafana, Jaeger, OpenSearch, OpAMP server and telemetry schema.

The storefront is at http://localhost:8080. Flags are read and written through /feature/api/read and /feature/api/write. Texts in quotes are exact. "Frontend log line" means a line on the frontend container's stdout.

## Requirements

### Collector redaction

- **R44.** A span sent to the collector with a "password" attribute is exported with the value "****".
- **R45.** A span attribute whose key contains "secret", such as db.secret.key, is exported with the value "****".
- **R46.** A numeric-looking demo.order.id such as 1234567812345678 passes through the collector unchanged.
- **R47.** A card-like value under an unrelated key, such as note = "4111 1111 1111 1111", passes through unchanged, because redaction matches keys and not values.
- **R48.** A user.email sent directly to the collector is not exported; user.hash holds its SHA-256 hex instead.
- **R49.** A span with demo.payment.card_number carries redaction.ignored.count 1.
- **R50.** A span with no sensitive attributes has no redaction.masked.count attribute.
- **R144.** A span sent to the collector with a demo.payment.card_pin attribute is exported with the value "****".
- **R145.** A span attribute whose key contains "password", such as user_password, is exported with the value "****".
- **R146.** An unrelated attribute such as demo.keep passes through the collector unchanged.
- **R147.** A demo.payment.card_number of 4432-8015-6152-0454 sent directly to the collector is exported as ****-****-****-0454.
- **R148.** A span with masked attributes carries redaction.masked.count equal to the number of attributes masked.
- **R149.** The redaction summary is counts only: the span has no redaction.masked.keys or redaction.ignored.keys attribute.

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

### Collector OTLP CORS

- **R207.** A CORS preflight OPTIONS to /otlp-http/v1/traces with an http:// Origin and Access-Control-Request-Headers "traceparent, baggage" is answered with an Access-Control-Allow-Headers header that allows traceparent and baggage, so browser OTLP exports carrying trace context pass preflight.

### Collector docker_stats metrics

- **R217.** Prometheus has a container_uptime_seconds series per container (container_name label), produced by the collector's docker_stats receiver.

### Collector host resource attributes

- **R227.** The Prometheus target_info series for service_name "otelcol-contrib" carries host_arch and os_description labels, added by the collector's resource_detection system detector.

### Collector otelcol.signal fix

- **R237.** The collector's own component log records stored in OpenSearch (otel-logs-*, resource.service.name otelcol-contrib) carry the scope attribute otelcol_signal (e.g. "traces") instead of a flat otelcol.signal attribute.

### Collector OpAMP status

- **R247.** The OpAMP page at /opamp/ lists the collector as an agent with instance id 00000000-0000-7000-8000-000000000001.
- **R256.** The collector's OpAMP agent page Attributes table lists the keys demo.collector.role and deployment.environment.name with values gateway and demo (rendered as protobuf AnyValue text, e.g. string_value:"gateway").
- **R265.** The OpAMP agent list at /opamp/ shows the collector's Health as "Up", and the collector's agent page shows the row "Up:" with value true.
- **R274.** The collector's OpAMP agent page shows its effective configuration, which includes the otlp_grpc/jaeger exporter.

### OpAMP server UI

- **R283.** On the OpAMP page at /opamp/, each agent's link is the relative href agent?instanceid=<id>, which resolves to /opamp/agent?instanceid=<id> so following it stays under the /opamp/ proxy prefix.
- **R292.** The OpAMP agent page's link back to the agent list points to /opamp/ rather than /.
- **R301.** The OpAMP agent page has no "OpAMP Connection Settings" form and no client-certificate rotation form.

### Jaeger OTel semantics

- **R310.** The Jaeger UI page served at /jaeger/ui/ embeds the UI configuration as JAEGER_CONFIG = {"useOpenTelemetryTerms":true}.

### Grafana exemplar-to-logs

- **R319.** The Prometheus datasource (uid webstore-metrics) has an exemplar trace-ID link labelled "View in Logs (OpenSearch)" that opens /grafana/d/W2gX2zHVk/demo-dashboard with var-service=All and var-traceId set to the trace ID.
- **R328.** The Demo Dashboard (uid W2gX2zHVk) has a textbox variable named traceId labelled "Trace ID", empty by default.
- **R337.** The Demo Dashboard's OpenSearch log panels filter by trace ID when one is set: their PPL query contains where (traceId="${traceId}" or "${traceId}" = "").
- **R346.** The Demo Dashboard's Service variable is multi-select with an All option, and its span-metric panels match it with service_name=~"(${service:regex})".

### Grafana demo dashboard

- **R354.** The Demo Dashboard's recommendations panel queries rate(demo_recommendation_requests_total{recommendation_type="catalog"}[$__rate_interval]) instead of app_recommendations_counter_total.

### Grafana cart exemplars

- **R361.** The Cart Service Exemplars dashboard (uid ce6sd46kfkglca) GetCart panels query demo_cart_get_cart_latency_seconds_bucket instead of app_cart_get_cart_latency_seconds_bucket.
- **R368.** The Cart Service Exemplars dashboard AddItem panels query demo_cart_add_item_latency_seconds_bucket instead of app_cart_add_item_latency_seconds_bucket.

### Grafana host metadata

- **R375.** The Linux dashboard (uid otel-demo-hostmetrics) has a table panel "Host Metadata" querying target_info{service_name="otelcol-contrib", host_name=~"$host_name"} and showing columns Hostname, Architecture, OS Type and OS Description.
- **R382.** The Linux dashboard has a table panel "CPU Metadata" querying target_info{service_name="otelcol-contrib", host_name=~"$host_name"} that renames the host_cpu_vendor_id, host_cpu_family, host_cpu_model_id, host_cpu_model_name, host_cpu_cache_l2_size and host_cpu_stepping labels to the columns CPU Vendor, CPU Family, Model ID, Model Name, L2 Cache and Stepping.

### Grafana Events by Name

- **R388.** The Events by Name dashboard (uid otel-demo-events-by-name) has multi-select filter variables labelled "Service", "Event Name" and "Severity", each defaulting to All and populated from OpenSearch terms on resource.service.name.keyword, eventName.keyword and severity.text.keyword.
- **R393.** The Events by Name dashboard has a time-series panel "Event Volume Over Time (Top Event Names)" that counts events per eventName.keyword for the top 5 event names.
- **R398.** The Events by Name table panel is titled "Top Event Names by Volume" and its PPL query returns at most 20 rows (head 20), sorted by count descending.

### Grafana self-observability

- **R403.** The Self-Observability dashboard (uid self-observability) has a multi-select Service variable (default All) populated by label_values({__name__=~"otel_sdk_.+"},service_name).
- **R408.** The Self-Observability dashboard has a stat panel "Services reporting" that counts the distinct service_name values emitting otel_sdk_* metrics.
- **R413.** The Self-Observability stat panel "Spans exported" queries otel_sdk_exporter_span_exported_total with error_type="" in items/sec.
- **R418.** The Self-Observability stat panel "Metric data points exported" queries otel_sdk_exporter_metric_data_point_exported_total with error_type="".
- **R423.** The Self-Observability stat panel "LogRecords exported" queries otel_sdk_exporter_log_exported_total with error_type="".
- **R428.** The Self-Observability stat panel "Export errors" sums the rates of the span, LogRecord and metric data point exported counters with error_type!="".
- **R432.** The Self-Observability stat panel "Items in-flight" sums otel_sdk_exporter_span_inflight, otel_sdk_exporter_log_inflight and otel_sdk_exporter_metric_data_point_inflight.
- **R436.** The Self-Observability stat panel "Processing errors (spans + LogRecords)" sums otel_sdk_processor_span_processed_total and otel_sdk_processor_log_processed_total with error_type!="".
- **R440.** The Self-Observability dashboard has rows titled "Overview", "Span pipeline", "Log pipeline" and "Metric pipeline".
- **R444.** The Self-Observability time-series panel "Spans started rate" plots rate(otel_sdk_span_started_total) per service_name.
- **R448.** The Self-Observability time-series panel "Live spans" plots otel_sdk_span_live per service_name.
- **R452.** The Self-Observability panel "Span processor queue utilization" divides otel_sdk_processor_span_queue_size by otel_sdk_processor_span_queue_capacity and uses the percentunit unit.
- **R456.** The Self-Observability panel "Spans processed error rate (by error type)" plots otel_sdk_processor_span_processed_total with error_type!="" broken down by service_name and error_type.
- **R460.** The Self-Observability panel "Span export operation duration (avg)" computes the average as rate of otel_sdk_exporter_operation_duration_seconds_sum over _count for otel_component_type matching span_exporter, not with histogram_quantile.
- **R464.** The Self-Observability panel "Metric collect duration (avg)" plots the average of otel_sdk_metric_reader_collection_duration_seconds (sum over count) per service_name.
- **R467.** The Self-Observability table "SDK components reporting" lists, for every otel_sdk_* series with a non-empty otel_component_type, the columns Service, Component type and Component name (from service_name, otel_component_type, otel_component_name).

### Telemetry docs site

- **R470.** The telemetry docs site no longer has a Product Reviews service page: GET /telemetry/services/product_reviews.html answers 404 and the Services navigation has no "Product Reviews" entry.
- **R473.** The Frontend page of the telemetry docs (/telemetry/services/frontend.html) has no Metrics section and does not list app.frontend.requests.
- **R476.** The Load Generator page of the telemetry docs (/telemetry/services/load_generator.html) lists the attribute gen_ai.input.messages.
- **R479.** The Load Generator page of the telemetry docs (/telemetry/services/load_generator.html) lists the attribute demo.request.flood.count.
- **R481.** The Checkout page of the telemetry docs (/telemetry/services/checkout.html) lists the attribute user.hash.
- **R483.** The Email page of the telemetry docs (/telemetry/services/email.html) no longer lists an email recipient attribute (app.email.recipient).
