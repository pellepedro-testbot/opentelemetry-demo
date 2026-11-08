# Release 3.1.0 update: product catalog, database, currency and recommendation (69 requirements)

Brings the shop up to release 3.1.0, part 5 of 10: product catalog, database, currency and recommendation.

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
- **R326.** The currency Convert span has demo.exchange.from set to the source currency code, and no app.currency.conversion.from.
- **R335.** The currency Convert span has demo.exchange.to set to the target currency code (e.g. "EUR" after GET /api/products?currencyCode=EUR), and no app.currency.conversion.to.

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

### Product-catalog SQL commenter

- **R205.** Queries product-catalog sends to PostgreSQL carry a SQLCommenter comment with a traceparent: after GET /api/products/OLJCESPC7Z, the query text of the product-catalog connection in pg_stat_activity contains "traceparent=".

### Product-catalog health telemetry

- **R215.** A grpc.health.v1.Health/Check call to product-catalog (its container health probe runs one every 5 seconds) produces no product-catalog span in Jaeger.

### Product-catalog container health

- **R225.** The product-catalog container reports Docker health status "healthy", from a gRPC health probe against its port.

### Product-catalog span attributes

- **R235.** The product-catalog ListProducts span has demo.product.count set to the number of products returned (10), and no app.products.count.
- **R245.** The product-catalog GetProduct span for GET /api/products/OLJCESPC7Z has demo.product.id "OLJCESPC7Z", and no app.product.id.
- **R254.** The product-catalog GetProduct span for a found product has demo.product.name set to the product name ("National Park Foundation Explorascope" for OLJCESPC7Z), and no app.product.name.
- **R263.** A direct gRPC SearchProducts call to product-catalog (port 3550, reflection enabled; nothing in the stack calls it) gives a server span with demo.product.search.count set to the number of results, and no app.products_search.count.

### Product-catalog log attributes

- **R272.** The "Product Found" log record from product-catalog carries demo.product.id and demo.product.name (not app.product.id / app.product.name).

### Product-catalog failure flag

- **R281.** Every product-catalog GetProduct span, for any product id (e.g. 66VCHSJNUP), has a feature_flag.evaluation event with feature_flag.key "productCatalogFailure".

### Product-catalog lock contention

- **R290.** With productCatalogLockContention left on, product-catalog releases its ACCESS EXCLUSIVE lock after about 30 seconds and takes it again within about 10 seconds, logging "lock contention scenario active: holding ACCESS EXCLUSIVE lock on catalog.products" once per cycle.

### Product-catalog OpAMP identity

- **R299.** Without OPAMP_SERVER_ENDPOINT, product-catalog prepares no OpAMP identity and leaves OTEL_RESOURCE_ATTRIBUTES without a service.instance.id.
- **R308.** When OTEL_RESOURCE_ATTRIBUTES already sets service.instance.id, product-catalog keeps that value (e.g. "configured-id") instead of replacing it with the OpAMP instance id.

### Database product reviews removed

- **R317.** The astronomy database has no reviews schema: the table reviews.productreviews does not exist.

### Currency conversion metric

- **R344.** Currency conversions are counted in Prometheus as demo_exchange_conversions_counter_total; app_currency_counter_total no longer exists.
- **R352.** demo_exchange_conversions_counter_total is labelled by target currency as demo_exchange_to (e.g. demo_exchange_to="EUR"), with no currency_code label.

### Currency log events

- **R359.** The "GetSupportedCurrencies successful" log record from currency has eventName currency.get_supported_currencies.
- **R366.** A successful conversion logs a currency record with body exactly "conversion successful" (not "Convert conversion successful") and eventName currency.conversion.
- **R373.** The currency "conversion successful" log record has attribute currency.from set to the source currency code.
- **R380.** The currency "conversion successful" log record has attribute currency.to set to the target currency code.

### Currency start-up

- **R386.** The currency "Currency Server started" log record has server.address "0.0.0.0:7001" as an attribute.

### Currency IPv6

- **R391.** With IPV6_ENABLED=true, currency logs "Overwriting Localhost IP" with eventName currency.server.ip_overwrite and server.address "[::]".

### Currency VERSION guard

- **R396.** With the VERSION environment variable unset, the currency service still starts and answers GetSupportedCurrencies instead of crashing at start-up.

### Recommendation span attributes

- **R401.** The recommendation ListRecommendations span has demo.product.recommended.count set to the number of recommended products, and no app.products_recommended.count.
- **R406.** With recommendationCacheFailure off, the get_product_list span has demo.feature_flag.recommendation_cache false, and no app.recommendation.cache_enabled.
- **R411.** With recommendationCacheFailure on, get_product_list spans have demo.feature_flag.recommendation_cache true and demo.recommendation.cache_hit (false on a miss, true on a hit), and no app.cache_hit.
- **R416.** The get_product_list span has demo.product.count set to the number of catalog products (10 with the flag off), and no app.products.count.
- **R421.** The get_product_list span has demo.product.filtered.count set to the number of candidates left after removing the requested products, and no app.filtered_products.count.
- **R426.** The get_product_list span has demo.product.filtered.list with the returned product ids, and no app.filtered_products.list.
