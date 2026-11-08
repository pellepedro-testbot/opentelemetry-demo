# Release 3.1.0 update: product catalog, currency and OpAMP (55 requirements)

Brings the shop up to release 3.1.0 and adds the storefront, checkout, cart, shipping, payment, currency, recommendation and order-processing changes planned for this release.

The storefront is at http://localhost:8080. Flags are read and written through /feature/api/read and /feature/api/write. Texts in quotes are exact. "Frontend log line" means a line on the frontend container's stdout.

## Requirements

### Product catalog lock contention

- **R194.** With productCatalogLockContention off, no ACCESS EXCLUSIVE lock is held on catalog.products.
- **R195.** The ACCESS EXCLUSIVE lock taken while productCatalogLockContention is on is held by the database user astronomy_user.
- **R196.** While productCatalogLockContention holds its lock, GET /api/currency still answers 200 within a second.
- **R197.** Within 60 seconds of turning productCatalogLockContention off, its lock is gone and GET /api/products/OLJCESPC7Z answers 200 within a second.
- **R198.** The database user astronomy_user has UPDATE on catalog.products.
- **R199.** Within 25 seconds of turning productCatalogLockContention on, an ACCESS EXCLUSIVE lock on catalog.products is granted.
- **R200.** While productCatalogLockContention holds its lock, GET /api/products/OLJCESPC7Z does not answer normally: it answers 504 after about 15 seconds or stalls until the lock ends.
- **R201.** While productCatalogLockContention holds its lock, GET /api/cart for a user with an empty cart still answers 200 within a second.
- **R202.** Product-catalog logs "lock contention scenario active: holding ACCESS EXCLUSIVE lock on catalog.products", and the record reaches OpenSearch.
- **R203.** The database user astronomy_user has no DELETE on catalog.products.

### Product catalog and OpAMP

- **R204.** The product-catalog agent shows health "Up" on the OpAMP page.
- **R205.** The OpAMP agent page for product-catalog shows service.name product-catalog.
- **R206.** On SIGTERM (docker stop) product-catalog exits with code 0 well before Docker's 10-second kill.
- **R207.** The OpAMP page at /opamp/ lists an agent named product-catalog.
- **R208.** product-catalog spans have a service.instance.id resource attribute equal to the OpAMP instance id, without dashes.
- **R209.** Product-catalog reports the ReportsHealth capability to the OpAMP server.
- **R210.** After a restart, product-catalog registers with the OpAMP server again.

### Currency span attributes

- **R211.** The currency span for GetSupportedCurrencies has rpc.system.name "grpc".
- **R212.** The currency span for GetSupportedCurrencies has rpc.response.status_code "OK".
- **R213.** The currency span for GetSupportedCurrencies no longer has rpc.service.
- **R214.** The currency span for Convert has rpc.system.name "grpc".
- **R215.** The currency span for Convert has rpc.response.status_code "OK".
- **R216.** The currency span for Convert no longer has rpc.service.
- **R217.** The currency span for GetSupportedCurrencies has rpc.method "oteldemo.CurrencyService/GetSupportedCurrencies".
- **R218.** The currency span for GetSupportedCurrencies no longer has rpc.system.
- **R219.** The currency span for GetSupportedCurrencies no longer has rpc.grpc.status_code.
- **R220.** The currency span for Convert has rpc.method "oteldemo.CurrencyService/Convert".
- **R221.** The currency span for Convert no longer has rpc.system.
- **R222.** The currency span for Convert no longer has rpc.grpc.status_code.

### Currency shutdown

- **R223.** On SIGTERM the currency service prints "Received SIGTERM, shutting down Currency Server".
- **R224.** On SIGTERM the currency container exits with code 0.
- **R225.** docker stop on the currency container finishes within 9 seconds, before Docker's kill.
- **R226.** Currency logs "Currency Server started" with eventName currency.server.started at start-up.
- **R227.** On SIGINT the currency service prints "Received SIGINT, shutting down Currency Server".
- **R228.** On SIGINT the currency container exits with code 0.
- **R229.** The currency shutdown log record reaches OpenSearch before the service exits, with eventName currency.server.stopping.

### Product catalog telemetry attributes

- **R230.** The product-catalog GetProduct span for GET /api/products/66VCHSJNUP carries demo.product.id "66VCHSJNUP" and demo.product.name with the product's name, and no app.product.id or app.product.name.
- **R231.** The product-catalog ListProducts span behind GET /api/products carries demo.product.count equal to the number of products returned, and no app.products.count.
- **R232.** The product-catalog "Product Found" log record in OpenSearch carries the attributes demo.product.id and demo.product.name, not app.product.id and app.product.name.

### Product catalog feature flags

- **R233.** The product-catalog GetProduct span for a product other than OLJCESPC7Z (e.g. GET /api/products/66VCHSJNUP) has a feature_flag.evaluation event with feature_flag.key "productCatalogFailure" and feature_flag.result.value false.

### Product catalog database (SQLCommenter)

- **R234.** After GET /api/products/66VCHSJNUP, pg_stat_activity for user astronomy_user shows the catalog.products query with an appended SQL comment containing traceparent='00-<trace id>-…', where the trace id is that request's trace in Jaeger.

### Product catalog health check

- **R235.** docker inspect reports the product-catalog container's health as "healthy" (its healthcheck runs /bin/grpc_health_probe against the gRPC port).

### Postgres schema

- **R236.** astronomy_db has no reviews schema: psql shows no reviews.productreviews table, while catalog.products is still present.

### Currency telemetry

- **R237.** The currency Convert span for GET /api/products?currencyCode=EUR carries demo.exchange.from "USD" and demo.exchange.to "EUR", and no app.currency.conversion.from or app.currency.conversion.to.
- **R238.** Prometheus has the currency counter demo_exchange_conversions_counter_total with a demo_exchange_to label (e.g. demo_exchange_to="EUR" after converting to EUR); app_currency_counter_total and its currency_code label no longer appear.

### Currency log events

- **R239.** A currency conversion logs "conversion successful" with eventName currency.conversion and attributes currency.from and currency.to (e.g. USD and EUR), where it used to log "Convert conversion successful" with no attributes.
- **R240.** GET /api/currency produces a currency log record "GetSupportedCurrencies successful" with eventName currency.get_supported_currencies.
- **R241.** The currency "Currency Server started" log record carries server.address "0.0.0.0:7001".

### OpAMP agent attributes

- **R242.** The OpAMP agent page for product-catalog lists telemetry.sdk.language with the value go among its attributes.

### OpAMP server UI

- **R243.** On an OpAMP agent page (/opamp/agent?instanceid=…), the "Back to Agents List" link points to /opamp/ and leads back to the agents list.
- **R244.** The OpAMP agent page has no "Additional Configuration" form and no "Save and Send to Agent" button.
- **R245.** The OpAMP agent page has no "OpAMP Connection Settings" section, no "Rotate Client Certificate" or "Accept and Offer Client Certificate" button, and no "Custom Messages" section.
- **R246.** The OpAMP agent page for product-catalog shows the Client Certificate section with "Client did not supply a certificate."
- **R247.** The OpAMP page at /opamp/ has the heading "OpAMP Server" and an Agents table with the columns Name, Version, Health, Last seen and Instance ID.
- **R248.** docker inspect reports the opamp-server container's health as "healthy".
