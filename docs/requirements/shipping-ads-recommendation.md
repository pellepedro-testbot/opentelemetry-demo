# Release 3.1.0 update: shipping, quote, ads and recommendation (44 requirements)

Brings the shop up to release 3.1.0 and adds the storefront, checkout, cart, shipping, payment, currency, recommendation and order-processing changes planned for this release.

The storefront is at http://localhost:8080. Flags are read and written through /feature/api/read and /feature/api/write. Texts in quotes are exact. "Frontend log line" means a line on the frontend container's stdout.

## Requirements

### Shipping quotes

- **R150.** GET /api/shipping for 1 item in USD answers 8.99: units 8, nanos 990000000.
- **R151.** GET /api/shipping for 4 items in USD answers 35.96: units 35, nanos 960000000.
- **R152.** GET /api/shipping for 10 items in USD answers 89.90: units 89, nanos 900000000.
- **R153.** The shipping cost in a checkout answer for 1 item in USD equals GET /api/shipping for 1 item: 8.99.
- **R154.** create_quote_from_float(71.92) gives 71 dollars and 92 cents.
- **R155.** Quote::total_cents() of a quote of 0 dollars and 5 cents is 5.
- **R156.** A quote of 10 dollars and 5 cents displays as "10.05".
- **R157.** GET /api/shipping for 2 items in USD answers 17.98: units 17, nanos 980000000.
- **R158.** GET /api/shipping for 5 items in USD answers 44.95: units 44, nanos 950000000.
- **R159.** GET /api/shipping for 3 items in USD answers 26.97 once rounded to the cent.
- **R160.** create_quote_from_float(8.99) gives 8 dollars and 99 cents.
- **R161.** Quote::total_cents() of create_quote_from_float(10.5) is 1050.
- **R162.** A quote of 0 dollars and 1 cent displays as "0.01".
- **R163.** A quote of 100 dollars and 0 cents displays as "100.00".

### Recommendation metric

- **R164.** The metric name carries no "recommendations" unit suffix: demo_recommendation_requests_recommendations_total does not exist.
- **R165.** Recommendation requests are counted in the Prometheus metric demo_recommendation_requests_total.
- **R166.** demo_recommendation_requests_total grows after GET /api/recommendations calls.

### Shipping: international slowdown flag

- **R167.** With intlShippingSlowdown set to "5sec", POST /api/checkout with a shipping address in country "FR" takes at least 5 seconds, and shipping's POST /ship-order server span lasts at least 5 seconds.
- **R168.** With intlShippingSlowdown set to "5sec", POST /api/checkout with a shipping address whose country is "US" or "United States" is not delayed: it answers in well under 5 seconds.
- **R169.** With intlShippingSlowdown set to "5sec" and a non-US address, shipping logs "Delaying international shipment due to intlShippingSlowdown feature flag" with eventName shipping.international.slowdown and delay_secs 5, and the record reaches OpenSearch.
- **R170.** A checkout with a non-US address makes shipping log an event shipping.feature_flag.evaluated with feature_flag_key "intlShippingSlowdown", feature_flag_provider_name "flagd" and feature_flag_variant "off" while the flag is at its default.

### Shipping: logs

- **R171.** GET /api/shipping makes the shipping container print "Sending Quote" and "Requesting quote" lines on stdout (docker logs shipping).
- **R172.** GET /api/shipping for 1 item produces a shipping log record "Sending Quote" in OpenSearch with eventName shipping.quote.sent and attributes dollars 8 and cents 99 (not quote.dollars / quote.cents, and no name attribute).
- **R173.** GET /api/shipping produces a shipping log record "Requesting quote" in OpenSearch with eventName shipping.quote.requested and a quote_service_addr attribute.
- **R174.** A successful checkout produces a shipping log record "Tracking ID Created" in OpenSearch with eventName shipping.tracking_id.created and tracking_id equal to the shippingTrackingId in the checkout answer.
- **R175.** At start-up shipping logs "Shipping service is running" with eventName shipping.server.started and an addr attribute ending in ":50050".

### Shipping: quote telemetry

- **R176.** GET /api/shipping for 1 item gives shipping's /get-quote server span the attribute demo.shipping.cost.total "8.99" and an event named shipping.quote.received carrying the same attribute; app.shipping.cost.total and the event "Received Quote" are gone.
- **R177.** For 10 items the demo.shipping.cost.total span attribute reads "89.90", with two cent digits.
- **R178.** Shipping counts shipped items in the Prometheus metric demo_shipping_items_shipped_total, which grows by the item count of each quote; app_shipping_items_count_total no longer appears.

### Shipping: container health

- **R179.** docker inspect shows the shipping container's health status "healthy", checked by the /app/healthcheck binary.

### Quote service telemetry

- **R180.** GET /api/shipping for 3 items gives quote's calculate-quote span the attributes demo.shipping.quote.items_count 3 and demo.shipping.quote.cost.total 26.97, and no app.quote.* attributes.
- **R181.** The quote server span's event "Quote processed, response sent back" carries demo.shipping.quote.cost.total (8.99 for 1 item), not app.quote.cost.total.

### Ad service telemetry

- **R182.** GET /api/data?contextKeys=accessories gives the ad service's oteldemo.AdService/GetAds span demo.ad.context_keys "[accessories]", demo.ad.context_keys.count 1, demo.ad.count 3, demo.ad.request_type "TARGETED" and demo.ad.response_type "TARGETED", with no app.ads.* attributes.
- **R183.** GET /api/data with no contextKeys gives the GetAds span demo.ad.request_type "NOT_TARGETED" and demo.ad.response_type "RANDOM", and its child span getRandomAds carries demo.ad.count 2.
- **R184.** GET /api/data?contextKeys=accessories produces a getAdsByCategory span with demo.ad.category "accessories" and demo.ad.count 3 (not app.ads.category).
- **R185.** An ad request sent with baggage "session.id=s1,enduser.id=u1" gives the GetAds span the attribute enduser.id "u1".

### Ad service metrics

- **R186.** Ad requests are counted in the Prometheus metric demo_ad_requests_total with labels demo_ad_request_type and demo_ad_response_type (e.g. TARGETED/TARGETED after GET /api/data?contextKeys=accessories); app_ads_ad_requests_total no longer appears.
- **R187.** The ad container serves Prometheus text at /metrics on its port 9465, including demo_ad_served_total; after GET /api/data?contextKeys=accessories the series demo_ad_served_total{category="accessories"} has grown by 3.
- **R188.** After GET /api/data with no contextKeys, the ad /metrics series demo_ad_served_total{category="random"} has grown by 2.
- **R189.** At start-up the ad service logs "Prometheus metrics endpoint started, listening on 9465/metrics" (docker logs ad).

### Recommendation telemetry

- **R190.** GET /api/recommendations gives recommendation's ListRecommendations server span demo.product.recommended.count 5, not app.products_recommended.count.
- **R191.** With recommendationCacheFailure off, the get_product_list span carries demo.feature_flag.recommendation_cache false, demo.product.count and demo.product.filtered.count, and no app.* attributes.
- **R192.** The get_product_list span's demo.product.filtered.list holds the product ids returned to the caller (not app.filtered_products.list).
- **R193.** With recommendationCacheFailure on, the get_product_list span carries demo.feature_flag.recommendation_cache true and a boolean demo.recommendation.cache_hit (no app.cache_hit).
