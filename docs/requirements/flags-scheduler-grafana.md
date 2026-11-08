# Release 3.1.0 update: feature flags, flag scheduler and Grafana (88 requirements)

Brings the shop up to release 3.1.0 and adds the storefront, checkout, cart, shipping, payment, currency, recommendation and order-processing changes planned for this release.

The storefront is at http://localhost:8080. Flags are read and written through /feature/api/read and /feature/api/write, and resolved through /flagservice. Grafana is at /grafana, Jaeger at /jaeger, the OpAMP server UI at /opamp/, the load generator at /loadgen and the telemetry docs at /telemetry. Texts in quotes are exact. "Frontend log line" means a line on the frontend container's stdout.

## Requirements

### New feature flags

- **R164.** GET /feature/api/read lists the flag aiRunawayAgent, state ENABLED, default variant "off".
- **R165.** GET /feature/api/read lists the flag emitRawPii, state ENABLED, default variant "off".
- **R166.** aiRunawayAgent has the variants off = 0 and on = 20.
- **R167.** emitRawPii has the variants off = false and on = true.
- **R168.** Resolving emitRawPii through /flagservice returns false, variant "off", by default.
- **R169.** GET /feature/api/read lists the flag aiSlowResponse, state ENABLED, default variant "off".
- **R170.** GET /feature/api/read lists the flag productCatalogLockContention, state ENABLED, default variant "off".
- **R171.** aiSlowResponse has the variants off = 0, 5sec = 5000 and 10sec = 10000.
- **R172.** productCatalogLockContention has the variants off = false and on = true.
- **R173.** Resolving productCatalogLockContention through /flagservice returns false, variant "off", by default.
- **R174.** GET /feature/api/read lists cartFailure with default variant "off" and the variants "off" = 0, "10%" = 0.1, "25%" = 0.25, "50%" = 0.5, "75%" = 0.75, "90%" = 0.9 and "100%" = 1.
- **R175.** GET /feature/api/read gives cartFailure the description "Fail cart service n% of the time".
- **R176.** Resolving cartFailure through /flagservice as a float returns 0, variant "off", by default.
- **R177.** The flag dashboard at /feature/ shows a select for cartFailure whose options are "10%", "100%", "25%", "50%", "75%", "90%" and "off".

### Flag dashboard and scheduler

- **R178.** The flag dashboard at /feature/ lists aiRunawayAgent.
- **R179.** The flag dashboard at /feature/ lists emitRawPii.
- **R180.** The scheduler page at /feature/scheduler does not offer emitRawPii.
- **R181.** The scheduler page offers aiSlowResponse.
- **R182.** Setting metadata.schedulable to false on another flag, adFailure, through /feature/api/write removes it from the scheduler page.
- **R183.** The flag dashboard at /feature/ lists aiSlowResponse.
- **R184.** The flag dashboard at /feature/ lists productCatalogLockContention.
- **R185.** The scheduler page offers aiRunawayAgent.
- **R186.** The scheduler page offers productCatalogLockContention.
- **R187.** A flag with no metadata, adFailure by default, is on the scheduler page.
- **R188.** The navbar on /feature/ has a "Scheduler" link that points to /feature/scheduler.
- **R189.** The navbar "Basic" and "Advanced" links on /feature/ are LiveView navigation links (the anchors carry data-phx-link="redirect"), so switching tabs does not reload the page.
- **R190.** With the flag dashboard /feature/ open, a change made elsewhere (POST /feature/api/write, or the scheduler) appears in the open page's flag selects without a reload.
- **R191.** Unit: FlagdUi.Storage ignores a replace with invalid JSON, keeping both its in-memory state and the flag file content unchanged.

### Flag scheduler page

- **R192.** GET /feature/scheduler answers 200 with a page that says "Scheduler stopped" and shows the badge "Idle" when no schedule has been started.
- **R193.** On a fresh stack the scheduler form at /feature/scheduler is pre-filled with Interval (seconds) 900, Minimum duration (seconds) 60, Maximum duration (seconds) 180 and Flags at once 1.
- **R194.** The scheduler page offers the preset buttons "Presentation (60s / 10-20s)", "Frequent (15m / 1-3m)" and "Hourly (1h / 5-15m)".
- **R195.** Clicking the "Presentation" preset on the scheduler page sets Interval to 60, Minimum duration to 10 and Maximum duration to 20 seconds.
- **R196.** The scheduler page lists cartFailure with one checkbox per non-default variant, name "variants[cartFailure][]" and values "10%", "25%", "50%", "75%", "90%" and "100%", and no checkbox for "off".
- **R197.** On a fresh stack every variant checkbox on the scheduler page is checked (all schedulable flags and variants are selected by default).
- **R198.** A flag with several variants, such as cartFailure, has a "toggle all" button on the scheduler page; clicking it unchecks all of that flag's variants and clicking it again checks them all.

### Flag scheduler validation

- **R199.** Clicking "None" on the scheduler page and then "Start" shows the error "Select at least one flag variant to schedule" and the scheduler stays stopped.
- **R200.** Starting the scheduler with Interval 10, Minimum duration 20 and Maximum duration 30 seconds shows the error "Maximum duration must fit within the interval" and the page still says "Scheduler stopped".
- **R201.** Starting the scheduler with Minimum duration 30 and Maximum duration 20 seconds (Interval 60) shows the error "Maximum duration must be greater than or equal to the minimum duration".

### Flag scheduler at work

- **R202.** After starting the scheduler with seed 7, the scheduler page says "Scheduler running", shows the badge "Active" and the flash "Scheduler started", and its Seed field reads 7.
- **R203.** While the scheduler is running, its submit button reads "Restart" and a "Stop" button is shown; clicking "Stop" brings back "Scheduler stopped" with the flash "Scheduler stopped".
- **R204.** Starting the scheduler with an empty Seed still shows a whole-number seed in the Seed field of the running status, and the flagd-ui log has "Flag scheduler started with seed <that number>".
- **R205.** With only adFailure selected and Interval, Minimum and Maximum duration all set to 10 seconds, starting the scheduler makes GET /feature/api/read report adFailure with default variant "on" within a few seconds.
- **R206.** While the scheduler holds adFailure at "on", resolving adFailure through /flagservice returns true, variant "on".
- **R207.** When a scheduled hold ends, the flag returns to its default variant: adFailure activated for 10 seconds reads "off" again in GET /feature/api/read about 10 seconds later.
- **R208.** Each scheduled activation logs "Flag scheduler set <flag> to <variant> for <n>ms" on the flagd-ui container stdout, and its end logs "Flag scheduler reverted <flag> to <resting variant>".
- **R209.** After a hold ends, the scheduler page shows a "Recent activations" section listing the entry "adFailure = on" with its UTC start time and duration.
- **R210.** Clicking "Stop" while a flag is held active reverts it at once: GET /feature/api/read reports its default variant again, and the flagd-ui log has "Flag scheduler stopped".
- **R211.** Selecting only the cartFailure variants "10%" and "25%" and starting the scheduler with Interval, Minimum and Maximum duration 10 seconds sets cartFailure to "10%" or "25%", never another rate.
- **R212.** With Flags at once 3 and Interval, Minimum and Maximum duration all 60 seconds, starting the scheduler activates three different flags at once: the page shows "Currently active (3 of 3)" and GET /feature/api/read shows three flags off their default variant.
- **R213.** Asking for more flags at once than are selected (Flags at once 2 with only adFailure selected) still starts the scheduler and logs the warning "Flag scheduler was asked for 2 concurrent flags but only 1 are selected".
- **R214.** While the scheduler is running with nothing held active, the status reads "Currently active (0 of 1)" and "nothing — next in <time>".
- **R215.** Unit: two scheduler runs started with the same seed (1234) activate the same flag with the same variant first.

### Grafana dashboards

- **R216.** The Self-Observability dashboard has a stat panel titled "Spans processed successfully".
- **R217.** The "Spans processed successfully" panel queries otel_sdk_processor_span_processed_total with error_type="".
- **R218.** The "Spans processed successfully" and "LogRecords processed successfully" panels state in their description that they measure processor throughput, not successful export.
- **R219.** The Events by Name dashboard panel's description reads "Events grouped by service and EventName, ordered by volume."
- **R220.** The Events by Name table shows a "Service" column first, followed by "Event Name" and "Events".
- **R221.** The Self-Observability dashboard has a stat panel titled "LogRecords processed successfully".
- **R222.** The "LogRecords processed successfully" panel queries otel_sdk_processor_log_processed_total with error_type="".
- **R223.** Under load, the query behind "Spans processed successfully" returns data in Prometheus.
- **R224.** The Events by Name query groups by resource.service.name and eventName.

### Self-Observability dashboard

- **R225.** GET /grafana/api/dashboards/uid/self-observability answers 200 with a dashboard titled "Self-Observability".
- **R226.** The Self-Observability dashboard's Service variable (service_name) is filled from label_values({__name__=~"otel_sdk_.+"},service_name) and allows multiple values and All.
- **R227.** The Self-Observability dashboard has rows titled "Overview", "Span pipeline", "Log pipeline" and "Metric pipeline".
- **R228.** The "Services reporting" stat panel counts services with count(group by (service_name) ({__name__=~"otel_sdk_.+",service_name=~"$service_name"})).
- **R229.** The "Spans exported" stat panel queries otel_sdk_exporter_span_exported_total with error_type="".
- **R230.** The "Export errors" stat panel adds the span, LogRecord and metric data point exported rates with error_type!="".
- **R231.** The "Items in-flight" stat panel sums otel_sdk_exporter_span_inflight, otel_sdk_exporter_log_inflight and otel_sdk_exporter_metric_data_point_inflight.
- **R232.** The "Processing errors (spans + LogRecords)" stat panel queries the span and log processor processed totals with error_type!="".
- **R233.** The "Span processor queue utilization" panel divides otel_sdk_processor_span_queue_size by otel_sdk_processor_span_queue_capacity.
- **R234.** The "Live spans" panel plots otel_sdk_span_live per service.
- **R235.** The "Span export operation duration (avg)" panel averages otel_sdk_exporter_operation_duration_seconds for otel_component_type=~".*span_exporter".
- **R236.** The "Metric collect duration (avg)" panel uses otel_sdk_metric_reader_collection_duration_seconds.
- **R237.** The "SDK components reporting" table groups otel_sdk_ metrics by service_name, otel_component_type and otel_component_name.
- **R238.** Under load, the query behind "Services reporting" returns a count of at least 3 in Prometheus.

### Events by Name dashboard

- **R239.** GET /grafana/api/dashboards/uid/otel-demo-events-by-name answers 200 with a dashboard titled "Events by Name".
- **R240.** The Events by Name dashboard has three multi-value filter variables labelled "Service", "Event Name" and "Severity", each defaulting to All.
- **R241.** The Events by Name "Event Name" variable only offers event names of the selected services: its terms query is eventName:* AND resource.service.name.keyword:$service.
- **R242.** The "Top Event Names by Volume" table query applies all three filters and returns at most 20 rows (head 20).
- **R243.** The Events by Name dashboard has a time series panel "Event Volume Over Time (Top Event Names)" that splits counts by the top 5 eventName.keyword terms.
- **R244.** Under load, the "Top Event Names by Volume" query, run through Grafana's /api/ds/query against webstore-logs, returns at least one row with a non-empty event name.

### Demo dashboard

- **R245.** The Demo Dashboard (uid W2gX2zHVk) has a textbox variable named traceId labelled "Trace ID".
- **R246.** The Demo Dashboard's Service variable allows several values and an "All" option (multi and includeAll both true).
- **R247.** The Demo Dashboard's log panels filter by trace id: their PPL query contains where (traceId="${traceId}" or "${traceId}" = "").
- **R248.** The Demo Dashboard's span-metric panels match services by regex: their queries use service_name=~"(${service:regex})".
- **R249.** In the browser, opening /grafana/d/W2gX2zHVk/demo-dashboard?var-service=All&var-traceId=<trace id of a recent checkout> shows only log records with that trace id in the logs table.

### Exemplar to logs

- **R250.** The Prometheus datasource (uid webstore-metrics) has an exemplar trace_id link labelled "View in Logs (OpenSearch)".
- **R251.** The "View in Logs (OpenSearch)" exemplar link opens /grafana/d/W2gX2zHVk/demo-dashboard with var-service=All and var-traceId set to the exemplar's trace id.
