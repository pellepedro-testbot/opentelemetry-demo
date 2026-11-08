# Release 3.1.0 update: feature flags and load generator (69 requirements)

Brings the shop up to release 3.1.0, part 6 of 10: feature flags and load generator.

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

### Load generator

- **R97.** The user_ask_agent span has gen_ai.input.messages holding a JSON list with one message of role "user".
- **R98.** The user_ask_agent span has a child POST to http://agent:8010/prompt.
- **R196.** While generating load, the load generator emits spans named user_ask_agent.
- **R197.** The message text in gen_ai.input.messages is one of the three prompts: "Show all available products in the store.", "What currencies are supported by the Astronomy Shop?", "What current promotions are available on binoculars?".
- **R198.** The load generator logs "User asking agent: <prompt>", and the record reaches OpenSearch.

### Removed LLM flags

- **R206.** GET /feature/api/read no longer lists the flag llmInaccurateResponse, and flagd no longer serves it.
- **R216.** GET /feature/api/read no longer lists the flag llmRateLimitError, and flagd no longer serves it.

### intlShippingSlowdown flag

- **R226.** GET /feature/api/read lists the flag intlShippingSlowdown, state ENABLED, default variant "off", with the variants off = 0, 5sec = 5 and 10sec = 10.

### cartFailure percentage variants

- **R236.** The cartFailure flag has the numeric variants off = 0, 10% = 0.1, 25% = 0.25, 50% = 0.5, 75% = 0.75, 90% = 0.9 and 100% = 1 (no boolean on variant), default "off", description "Fail cart service n% of the time".

### productCatalogFailure targeting

- **R246.** GET /feature/api/read shows productCatalogFailure with a targeting rule {"if": [{"==": [{"var": "product_id"}, "OLJCESPC7Z"]}, "off", "off"]} while defaultVariant stays "off".

### Scheduler page

- **R255.** GET /feature/scheduler answers 200 with a LiveView page that, before any run, shows "Scheduler stopped" and the badge "Idle".

### Navbar Scheduler tab

- **R264.** The flagd-ui navbar on every page has a third tab "Scheduler" after "Basic" and "Advanced", linking to /feature/scheduler, highlighted when the scheduler page is shown.

### LiveView tab navigation

- **R273.** The Basic and Advanced tabs (and the "Flagd Configurator" title) are LiveView links (data-phx-link="redirect") to /feature and /feature/advanced, so switching tabs keeps the existing LiveView WebSocket instead of doing a full page load.

### Dashboard description class

- **R282.** On the dashboard at /feature/, each flag's description paragraph has class "mb-4 text-sm" (not "-4 text-sm").

### Dashboard targeting notice

- **R291.** On the dashboard at /feature/, the card of a flag that has targeting rules, productCatalogFailure by default, shows "This flag has targeting rules."; flags without targeting do not.

### Basic edit of a targeted flag

- **R300.** Choosing "on" for productCatalogFailure on the dashboard writes "on" into the second element of its targeting.if list and leaves defaultVariant "off", as GET /feature/api/read then shows; the dashboard select shows that targeting value as selected.
- **R309.** After productCatalogFailure is set to "on" on the dashboard, flagd resolves it to true for context product_id "OLJCESPC7Z" and to false for any other product_id.

### Dashboard live refresh

- **R318.** An open dashboard at /feature/ updates a flag's selected variant without a reload when the configuration changes elsewhere (POST /feature/api/write, another browser tab, or the scheduler).

### Scheduler defaults

- **R327.** Before any run the scheduler form is pre-filled with Interval (seconds) 900, Minimum duration (seconds) 60, Maximum duration (seconds) 180, Flags at once (per interval) 1, an empty seed, and every offered variant checked.

### Scheduler presets

- **R336.** The scheduler page has preset buttons "Presentation (60s / 10-20s)", "Frequent (15m / 1-3m)" and "Hourly (1h / 5-15m)"; clicking Presentation fills interval 60, minimum 10 and maximum 20 seconds.

### Scheduler per-variant selection

- **R345.** The scheduler page offers one checkbox per non-default variant, e.g. cartFailure has checkboxes named variants[cartFailure][] for 10%, 25%, 50%, 75%, 90% and 100% plus a "toggle all" button, and has "All" and "None" buttons for the whole selection.

### Scheduler validation

- **R353.** Submitting the scheduler form with a maximum duration longer than the interval (e.g. interval 10, min 20, max 30) shows "Maximum duration must fit within the interval" and the scheduler stays "Scheduler stopped".
- **R360.** Submitting the scheduler form with a maximum duration below the minimum shows "Maximum duration must be greater than or equal to the minimum duration".
- **R367.** Submitting the scheduler form with an empty or zero Interval (seconds) shows "Interval must be a whole number of seconds greater than zero".
- **R374.** Submitting the scheduler form after clicking "None" (no variant selected) shows "Select at least one flag variant to schedule" and does not start the scheduler.

### Scheduler start

- **R381.** Submitting a valid scheduler form with a seed shows "Scheduler running", the badge "Active", the flash "Scheduler started", the Interval count, the given Seed, and "Currently active (n of <flags at once>)"; the submit button then reads "Restart" and a "Stop" button appears.

### Scheduler seed

- **R387.** Starting the scheduler with an empty seed generates a positive integer seed and reports it as the run's Seed, so the run can be repeated with that seed.

### Scheduler activation

- **R392.** While the scheduler runs, it sets a picked flag to one of its selected variants in the flagd configuration (its defaultVariant, or for productCatalogFailure the targeting on-branch targeting.if[1]), visible in GET /feature/api/read, and writes the flag's defaultVariant from run start back when the hold expires.

### Scheduler stop

- **R397.** Clicking "Stop" on a running scheduler shows "Scheduler stopped" and the flash "Scheduler stopped", and any flag it was holding active is reverted to its defaultVariant.

### Scheduler logs

- **R402.** The flagd-ui container logs "Flag scheduler started with seed <n>" when a run starts and "Flag scheduler stopped" when it is stopped.
- **R407.** For every activation the flagd-ui container logs "Flag scheduler set <flag> to <variant> for <ms>ms" and, when the hold ends, "Flag scheduler reverted <flag> to <resting variant>".

### Scheduler history

- **R412.** Once an activation's hold ends (or the run is stopped), the scheduler page lists it under "Recent activations" as "<flag> = <variant>" with "HH:MM:SS UTC for <duration>", keeping at most the last 10.

### Scheduler variant restriction

- **R417.** A run restricted to some variants of a flag (e.g. cartFailure at 10% and 25%) only ever activates those variants and no other flag.

### Scheduler concurrency

- **R422.** With "Flags at once" set to n, each interval activates up to n distinct flags, never the same flag twice in one interval, and settles for all selected flags when n exceeds their number.

### Scheduler reproducibility

- **R427.** Two runs started with the same seed and configuration pick the same flags and variants in the same order.

### Storage invalid replace

- **R431.** The flagd-ui Storage ignores a replace whose payload is not valid JSON, logging "Ignoring replace with invalid JSON" and keeping both its state and the flag file unchanged.

### Load generator span attributes

- **R435.** The load generator's user_browse_product, user_get_recommendations and user_add_to_cart spans carry the product as demo.product.id, not product.id.
- **R439.** The load generator's user_get_ads span carries the ad category as demo.ad.category, not category.
- **R443.** The load generator's user_add_to_cart span carries the quantity as demo.product.quantity (one of 1, 2, 3, 4, 5, 10), not quantity.
- **R447.** The load generator's user_checkout_multi span carries the item count as demo.cart.items.count (2, 3 or 4), not item.count.
- **R451.** With loadGeneratorFloodHomepage on, the load generator's user_flood_home span carries demo.request.flood.count = 100, not flood.count.

### Load generator span nesting

- **R455.** In load-generator checkout traces, user_add_to_cart spans are children of the user_checkout_single or user_checkout_multi span in the same trace, not separate root traces.
- **R459.** Each load-generator user_session_start span has a child user_index span (with its GET / request) in the same trace.

### Load generator baggage

- **R463.** HTTP requests from the load generator's WebsiteUser carry W3C baggage with session.id and synthetic_request=true, so the ad service's GetAds span in traces rooted at the load generator's user_get_ads span has a session.id attribute holding a UUID.

### Product reviews traffic removed

- **R466.** The load generator no longer requests GET /api/product-reviews/<id> and emits no user_get_product_reviews spans.
- **R469.** The load generator no longer posts to /api/product-ask-ai-assistant/<id> and emits no user_ask_product_ai_assistant spans.

### Bounded browser users

- **R472.** WebsiteUser's Locust weight comes from LOCUST_HTTP_USER_WEIGHT (default 9) and WebsiteBrowserUser's from LOCUST_BROWSER_USER_WEIGHT (default 1), so browser users are about one in ten of LOCUST_USERS rather than half.

### Load generator SDK self-metrics

- **R475.** While generating load, the load generator reports otel_sdk_span_started_total to Prometheus with service_name "load-generator".
- **R478.** While generating load, the load generator reports otel_sdk_processor_log_processed_total to Prometheus with service_name "load-generator".
