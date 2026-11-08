# Release 3.1.0 update: flags, flag scheduler and load generator (71 requirements)

Brings the shop up to release 3.1.0 and adds the storefront, checkout, cart, shipping, payment, currency, recommendation and order-processing changes planned for this release.

The storefront is at http://localhost:8080. Flags are read and written through /feature/api/read and /feature/api/write. Texts in quotes are exact. "Frontend log line" means a line on the frontend container's stdout.

## Requirements

### New feature flags

- **R249.** GET /feature/api/read lists the flag aiRunawayAgent, state ENABLED, default variant "off".
- **R250.** GET /feature/api/read lists the flag emitRawPii, state ENABLED, default variant "off".
- **R251.** aiRunawayAgent has the variants off = 0 and on = 20.
- **R252.** emitRawPii has the variants off = false and on = true.
- **R253.** Resolving emitRawPii through /flagservice returns false, variant "off", by default.
- **R254.** GET /feature/api/read lists the flag aiSlowResponse, state ENABLED, default variant "off".
- **R255.** GET /feature/api/read lists the flag productCatalogLockContention, state ENABLED, default variant "off".
- **R256.** aiSlowResponse has the variants off = 0, 5sec = 5000 and 10sec = 10000.
- **R257.** productCatalogLockContention has the variants off = false and on = true.
- **R258.** Resolving productCatalogLockContention through /flagservice returns false, variant "off", by default.

### Flag dashboard and scheduler

- **R259.** The flag dashboard at /feature/ lists aiRunawayAgent.
- **R260.** The flag dashboard at /feature/ lists emitRawPii.
- **R261.** The scheduler page at /feature/scheduler does not offer emitRawPii.
- **R262.** The scheduler page offers aiSlowResponse.
- **R263.** Setting metadata.schedulable to false on another flag, adFailure, through /feature/api/write removes it from the scheduler page.
- **R264.** The flag dashboard at /feature/ lists aiSlowResponse.
- **R265.** The flag dashboard at /feature/ lists productCatalogLockContention.
- **R266.** The scheduler page offers aiRunawayAgent.
- **R267.** The scheduler page offers productCatalogLockContention.
- **R268.** A flag with no metadata, adFailure by default, is on the scheduler page.

### Load generator

- **R269.** The user_ask_agent span has gen_ai.input.messages holding a JSON list with one message of role "user".
- **R270.** The user_ask_agent span has a child POST to http://agent:8010/prompt.
- **R271.** While generating load, the load generator emits spans named user_ask_agent.
- **R272.** The message text in gen_ai.input.messages is one of the three prompts: "Show all available products in the store.", "What currencies are supported by the Astronomy Shop?", "What current promotions are available on binoculars?".
- **R273.** The load generator logs "User asking agent: <prompt>", and the record reaches OpenSearch.

### Flag definitions

- **R274.** GET /feature/api/read lists cartFailure with the numeric variants off = 0, 10% = 0.1, 25% = 0.25, 50% = 0.5, 75% = 0.75, 90% = 0.9 and 100% = 1, default variant "off".
- **R275.** Resolving cartFailure through /flagservice as a number returns 0, variant "off", by default.
- **R276.** GET /feature/api/read lists the flag intlShippingSlowdown, state ENABLED, default variant "off", with the variants off = 0, 5sec = 5 and 10sec = 10.
- **R277.** GET /feature/api/read no longer lists the flags llmInaccurateResponse and llmRateLimitError.
- **R278.** Resolving llmRateLimitError (or llmInaccurateResponse) through /flagservice answers a flag-not-found error instead of a value.
- **R279.** GET /feature/api/read shows productCatalogFailure with a targeting rule {"if": [{"==": [{"var": "product_id"}, "OLJCESPC7Z"]}, "off", "off"]}.
- **R280.** Resolving productCatalogFailure through /flagservice with context product_id "OLJCESPC7Z" returns false, variant "off", with reason TARGETING_MATCH by default.

### Flag dashboard: targeted flags

- **R281.** On the flag dashboard at /feature/, the productCatalogFailure card shows "This flag has targeting rules."; no card for a flag without targeting shows it.
- **R282.** Switching productCatalogFailure to "on" on the dashboard writes "on" into the second element of its targeting.if list (seen in GET /feature/api/read) and leaves its defaultVariant "off".
- **R283.** After productCatalogFailure is switched to "on" on the dashboard, /flagservice resolves it to true for context product_id "OLJCESPC7Z" and to false for any other product_id.
- **R284.** The productCatalogFailure dropdown on the dashboard shows the variant in its targeting rule's match branch, so it reads "on" after that branch is set to "on" even though defaultVariant stays "off".

### Flag dashboard

- **R285.** Each flag description on the dashboard at /feature/ is rendered in a <p class="mb-4 text-sm"> element.
- **R286.** With the dashboard open, a flag changed elsewhere (through /feature/api/write or the scheduler) updates its dropdown on the page without a reload.

### Flag UI navigation

- **R287.** The navigation bar of /feature/, /feature/advanced and /feature/scheduler has a third tab "Scheduler" linking to /feature/scheduler.
- **R288.** The Basic and Advanced tabs are LiveView navigation links (data-phx-link="redirect"), so switching between them does not reload the page.
- **R289.** GET /feature/scheduler answers 200 with the flagd-ui scheduler page.

### Flag scheduler page

- **R290.** On a fresh stack the scheduler page shows "Scheduler stopped", the badge "Idle" and a "Start" button.
- **R291.** The scheduler form is pre-filled with Interval (seconds) 900, Minimum duration (seconds) 60, Maximum duration (seconds) 180 and Flags at once (per interval) 1.
- **R292.** The scheduler page offers the presets "Presentation (60s / 10-20s)", "Frequent (15m / 1-3m)" and "Hourly (1h / 5-15m)"; clicking Presentation sets the timing fields to 60, 10 and 20 seconds.
- **R293.** A flag with several non-default variants, such as cartFailure, appears on the scheduler page with a "toggle all" button and one checkbox per variant: 10%, 100%, 25%, 50%, 75% and 90% (not off).
- **R294.** A flag with one non-default variant, such as adFailure, appears on the scheduler page as a single checkbox named variants[adFailure][] with value "on".
- **R295.** Starting the scheduler with the Presentation preset switches the page to "Scheduler running" with the badge "Active", an "Interval" counter, the "Seed" used, "Currently active (0 of 1)" or the active flag, a "Restart" button, a "Stop" button and the flash "Scheduler started".
- **R296.** Starting with a Maximum duration larger than the Interval shows the error "Maximum duration must fit within the interval" and the scheduler stays stopped.
- **R297.** Starting with a Maximum duration below the Minimum duration shows the error "Maximum duration must be greater than or equal to the minimum duration".
- **R298.** Clicking "None" in the Flags panel and then Start shows the error "Select at least one flag variant to schedule".
- **R299.** The scheduler state is shared by all viewers: after it is started in one browser, a fresh GET /feature/scheduler shows "Scheduler running".

### Flag scheduler activity

- **R300.** With only adFailure selected and the Presentation preset started, within 60 s flagd-ui logs "Flag scheduler set adFailure to on for <n>ms" with n between 10000 and 20000, and GET /feature/api/read shows adFailure with defaultVariant "on" while the hold lasts.
- **R301.** While the scheduler holds adFailure on, resolving adFailure through /flagservice returns true.
- **R302.** When a scheduled hold ends, flagd-ui logs "Flag scheduler reverted adFailure to off", GET /feature/api/read shows adFailure back at "off", and the scheduler page lists "adFailure = on" under "Recent activations" with its start time in UTC and duration.
- **R303.** Clicking Stop while a flag is held reverts it to its default variant at once, logs "Flag scheduler stopped", and the page shows the flash "Scheduler stopped" and "Scheduler stopped".
- **R304.** Starting the scheduler with Seed 42 logs "Flag scheduler started with seed 42" and the page shows Seed 42.
- **R305.** Starting with Flags at once set to 2 while only adFailure is selected logs the warning "Flag scheduler was asked for 2 concurrent flags but only 1 are selected".

### Flag scheduler rules

- **R306.** FlagdUi.Scheduler.schedulable_flags/1 leaves out a flag with only its default variant and a flag whose defaultVariant is not one of its variants, and returns the other flags with their non-default variants sorted.
- **R307.** FlagdUi.Scheduler.start_schedule/2 returns {:error, "Interval must be at least 1 second"} for interval_ms below 1000, {:error, "Minimum duration must be at least 1 second"} for min_duration_ms below 1000, and {:error, "At least one flag has to be activated per interval"} for concurrency 0, and the scheduler stays stopped.
- **R308.** Two scheduler runs started with the same seed and flag selection activate the same flag with the same variant first.
- **R309.** With concurrency 2, one scheduler interval activates two distinct flags, never the same flag twice.

### Load generator spans

- **R310.** The load generator's user_browse_product and user_get_recommendations spans carry demo.product.id, not product.id.
- **R311.** The load generator's user_add_to_cart span carries demo.product.id and demo.product.quantity, not product.id and quantity.
- **R312.** The load generator's user_get_ads span carries demo.ad.category, not category.
- **R313.** The load generator's user_checkout_multi span carries demo.cart.items.count (2, 3 or 4), not item.count.
- **R314.** With loadGeneratorFloodHomepage on, the load generator's user_flood_home span carries demo.request.flood.count = 100, not flood.count.
- **R315.** Each load generator user session starts with a user_session_start span that has a child user_index span with a GET / below it.
- **R316.** The load generator sends no requests to /api/product-reviews/ or /api/product-ask-ai-assistant/ and emits no user_get_product_reviews or user_ask_product_ai_assistant spans (none appear in the Locust statistics at /loadgen/ or in Jaeger).

### Load generator baggage

- **R317.** In traces started by the load generator's user_get_ads span, the ad service's GetAds span carries session.id with the session's UUID.
- **R318.** In traces started by the load generator's user_checkout_single span, the checkout PlaceOrder span carries user_agent.synthetic.type = "test".
- **R319.** In traces started by the load generator's user_checkout_single span, the payment charge span carries demo.payment.charged = false and user_agent.synthetic.type = "test".
