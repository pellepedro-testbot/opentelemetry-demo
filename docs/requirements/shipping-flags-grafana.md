# Release 3.1.0 update: shipping, flags, load generator and Grafana (48 requirements)

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
