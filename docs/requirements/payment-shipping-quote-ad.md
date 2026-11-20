# Release 3.1.0 update: payment, shipping, quote and ads (66 requirements)

Brings the shop up to release 3.1.0, part 4 of 10: payment, shipping, quote and ads.

The storefront is at http://localhost:8080. Flags are read and written through /feature/api/read and /feature/api/write. Texts in quotes are exact. "Frontend log line" means a line on the frontend container's stdout.

## Requirements

### Payment service

- **R38.** With emitRawPii off, the payment "charge" span has no demo.payment.card_cvv attribute.
- **R39.** With emitRawPii off, the payment "charge" span still has demo.payment.card_valid true for a valid card.
- **R40.** With emitRawPii on and card number 4432-8015-6152-0454, the payment "charge" span in Jaeger shows demo.payment.card_number as ****-****-****-0454.
- **R41.** The payment service writes JSON log lines to stdout, with service.name "payment" and msg "Transaction complete." for a completed charge.
- **R42.** "Transaction complete." log records reach OpenSearch under service.name payment.
- **R43.** Each completed charge has exactly one "Transaction complete." record in OpenSearch, by transactionId.
- **R137.** With emitRawPii off, the payment "charge" span has no demo.payment.card_number attribute.
- **R138.** With emitRawPii off, the payment "charge" span still has demo.payment.card_type, "visa" for a Visa card.
- **R139.** With emitRawPii off, the payment "charge" span still has demo.user_context.loyalty_level.
- **R140.** With emitRawPii on, the payment "charge" span in Jaeger has no demo.payment.card_cvv attribute.
- **R141.** The "Transaction complete." line has lastFourDigits and no full card number.
- **R142.** Payment log records in OpenSearch come from the instrumentation scope @opentelemetry/instrumentation-pino.
- **R143.** Payment still exports traces: the checkout trace holds an oteldemo.PaymentService/Charge server span from service payment.

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

### Payment error.type

- **R204.** A checkout with an expired card (expiration year 2020) leaves a payment "charge" span with error status and error.type "Error".
- **R214.** A failed charge also sets error.type "Error" on the payment server span oteldemo.PaymentService/Charge.

### Payment synthetic requests

- **R224.** A checkout carrying W3C baggage synthetic_request=true (as the load generator sends) gives a payment "charge" span with user_agent.synthetic.type "test"; without that baggage the attribute is absent.
- **R234.** The payment "charge" span has demo.payment.charged true for a normal checkout and false for one carrying baggage synthetic_request=true; app.payment.charged is no longer set.

### Payment enduser.id

- **R244.** A checkout whose request carries baggage enduser.id=<id> (as the storefront sends) gives a payment "charge" span with enduser.id equal to <id>.

### Payment amount nanos fix

- **R253.** demo.payment.amount on the payment Charge server span is units + nanos/1e9 rounded to two decimals (e.g. "12.05" for units 12, nanos 50000000, not "12.50"); app.payment.amount is gone.

### Payment transaction counter

- **R262.** After a completed checkout in USD, Prometheus has demo_payment_transactions_total from service payment with label demo_payment_currency="USD", and it grows by one per completed charge.

### Payment paymentFailure message

- **R271.** With paymentFailure at 100%, the payment "charge" span status message is "Payment request failed. Invalid token. demo.user_context.loyalty_level=gold".

### Payment startup and health

- **R280.** The payment container reaches Docker health status "healthy": its gRPC server accepts TCP connections on PAYMENT_PORT.

### Shipping intlShippingSlowdown

- **R289.** With intlShippingSlowdown at "5sec", a checkout to a non-US address (country "Germany") has a shipping POST /ship-order span lasting at least 5 seconds.
- **R298.** With intlShippingSlowdown at "5sec", a checkout to a US address (country "United States") is not delayed: the shipping POST /ship-order span lasts well under a second.
- **R307.** With intlShippingSlowdown on, a non-US checkout makes shipping log "Delaying international shipment due to intlShippingSlowdown feature flag" with delay_secs equal to the variant value (5 for "5sec").
- **R316.** A checkout to a non-US address makes shipping log a record with eventName shipping.feature_flag.evaluated, feature_flag_key "intlShippingSlowdown" and feature_flag_variant "off" by default.

### Shipping event names

- **R325.** A checkout produces a shipping "Tracking ID Created" log record with eventName shipping.tracking_id.created and a tracking_id attribute.
- **R334.** GET /api/shipping (with itemList and address query parameters) produces a shipping "Sending Quote" log record with eventName shipping.quote.sent.
- **R343.** The shipping "Sending Quote" log record has attributes dollars and cents (8 and 99 for one item), not quote.dollars / quote.cents.
- **R351.** GET /api/shipping (with itemList and address query parameters) produces a shipping "Requesting quote" log record with eventName shipping.quote.requested and a quote_service_addr attribute.
- **R358.** At start-up shipping logs "Shipping service is running" with eventName shipping.server.started and an addr attribute.

### Shipping stdout log layer

- **R365.** Shipping writes its log events to stdout: after a checkout, docker logs shipping shows an INFO "Tracking ID Created" line with the tracking_id.

### Shipping quote span

- **R372.** The shipping POST /get-quote server span has a span event "shipping.quote.received" with attribute demo.shipping.cost.total (e.g. "8.99" for one item).
- **R379.** The shipping POST /get-quote server span has attribute demo.shipping.cost.total (e.g. "17.98" for two items); app.shipping.cost.total is no longer set.

### Shipping metric rename

- **R385.** Prometheus has demo_shipping_items_shipped_total from service shipping, growing by the item count of each quote; app_shipping_items_count_total is no longer produced.

### Shipping health

- **R390.** GET /health on the shipping service port (50050) answers 200 with an empty body.
- **R395.** The shipping container reaches Docker health status "healthy" via its /app/healthcheck binary.

### Quote span attributes

- **R400.** The quote "calculate-quote" span has demo.shipping.quote.items_count equal to the number of items (e.g. 2); app.quote.items.count is no longer set.
- **R405.** The quote "calculate-quote" span has demo.shipping.quote.cost.total equal to the quote (17.98 for two items).
- **R410.** The quote POST /getquote server span has an event "Quote processed, response sent back" with attribute demo.shipping.quote.cost.total.

### Ad /metrics endpoint

- **R415.** After a GET /api/data request, the ad service answers GET /metrics on port 9465 (AD_PROMETHEUS_PORT) with 200 and Prometheus text containing demo_ad_served_total.
- **R420.** After GET /api/data?contextKeys=binoculars, the ad service's /metrics endpoint (port 9465) shows demo_ad_served_total with label category="binoculars".
- **R425.** After GET /api/data with no contextKeys, the ad service's /metrics endpoint shows demo_ad_served_total with label category="random".
- **R430.** At start-up the ad service logs "Prometheus metrics endpoint started, listening on 9465/metrics".

### Ad metric rename

- **R434.** After GET /api/data calls, Prometheus has demo_ad_requests_total from service ad with labels demo_ad_request_type and demo_ad_response_type (e.g. TARGETED/TARGETED); app_ads_ad_requests_total is no longer produced.

### Ad span attributes

- **R438.** The ad GetAds server span has demo.ad.request_type "TARGETED" for GET /api/data?contextKeys=binoculars and "NOT_TARGETED" with no contextKeys.
- **R442.** The ad GetAds server span has demo.ad.response_type "TARGETED" for a matching category and "RANDOM" when no contextKeys are given.
- **R446.** The ad GetAds server span has demo.ad.context_keys with the requested keys as a list string (e.g. "[binoculars]").
- **R450.** The ad GetAds server span has demo.ad.context_keys.count equal to the number of context keys (0 with none).
- **R454.** The ad GetAds server span has demo.ad.count equal to the number of ads returned; app.ads.count is no longer set.
- **R458.** The ad "getAdsByCategory" span has demo.ad.category equal to the requested category (e.g. "binoculars").

### Ad enduser.id

- **R462.** An ad request whose call carries baggage enduser.id=<id> (as the storefront sends) gives an ad GetAds span with enduser.id equal to <id>.
