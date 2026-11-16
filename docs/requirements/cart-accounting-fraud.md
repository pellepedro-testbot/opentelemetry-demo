# Release 3.1.0 update: cart, accounting, fraud detection and Kafka (26 requirements)

Brings the shop up to release 3.1.0 and adds the storefront, checkout, cart, shipping, payment, currency, recommendation and order-processing changes planned for this release.

The storefront is at http://localhost:8080. Flags are read and written through /feature/api/read and /feature/api/write. Texts in quotes are exact. "Frontend log line" means a line on the frontend container's stdout.

## Requirements

### Cart

- **R124.** GET /api/cart for a user who has added nothing answers 200 with an empty items list.
- **R125.** Adding the same product again adds to its quantity: 2 then 3 gives one line of 5.
- **R126.** Adding a new product to a cart stores it with the quantity given.
- **R127.** DELETE /api/cart empties the cart: GET /api/cart then answers an empty items list.

### Cart spans

- **R128.** The cart AddItem server span (POST /api/cart) carries user.id, demo.product.id and demo.product.quantity, and none of app.user.id, app.product.id or app.product.quantity.
- **R129.** The cart GetCart server span (GET /api/cart) carries user.id and demo.cart.items.count equal to the total quantity in the cart, not app.user.id or app.cart.items.count.
- **R130.** The cart EmptyCart server span (DELETE /api/cart) carries user.id, not app.user.id.

### Cart metrics

- **R131.** After POST /api/cart, Prometheus has the histogram demo_cart_add_item_latency_seconds_bucket for service cart, and no app_cart_add_item_latency_seconds series.
- **R132.** After GET /api/cart, Prometheus has the histogram demo_cart_get_cart_latency_seconds_bucket for service cart, and no app_cart_get_cart_latency_seconds series.

### cartFailure flag

- **R133.** With the cartFailure flag set to its 100% variant, DELETE /api/cart does not answer 204 but an error status, and GET /api/cart afterwards still lists the items.

### Cart log events

- **R134.** POST /api/cart produces a cart log record in OpenSearch with eventName cart.add_item carrying the userId, productId and quantity of the request.
- **R135.** GET /api/cart produces a cart log record in OpenSearch with eventName cart.get carrying the userId.
- **R136.** DELETE /api/cart produces a cart log record in OpenSearch with eventName cart.empty carrying the userId.
- **R137.** At start-up cart logs "Successfully connected to Redis" with eventName cart.redis.connected.
- **R138.** Stopping valkey-cart makes cart log "Connection failed. Disposing the object" with eventName cart.redis.connection_lost, and starting it again logs "Connection to redis was restored successfully." with eventName cart.redis.connection_restored.

### Cart health probe

- **R139.** The cart image ships /bin/grpc_health_probe: docker exec cart /bin/grpc_health_probe -addr=localhost:7070 prints "status: SERVING" and exits 0.
- **R140.** With the failedReadinessProbe flag on, docker exec cart /bin/grpc_health_probe -addr=localhost:7070 reports NOT_SERVING and exits non-zero.
- **R141.** A gRPC health check against cart logs "Received health check request for service: " with eventName cart.health_check.request.

### Cart OpAMP

- **R142.** The OpAMP page at /opamp/ lists an agent named cart.
- **R143.** The OpAMP agent page for cart shows service.name cart and a service.instance.id equal to the service.instance.id resource attribute on cart's spans in Jaeger.
- **R144.** The OpAMP agent page for cart lists service.criticality high among its non-identifying attributes.

### Accounting consumer

- **R145.** After an order is placed, accounting logs "Order details:" to OpenSearch with eventName accounting.order.received.
- **R146.** At start-up accounting logs "Connecting to Kafka: kafka:9092", and its OpenSearch record has eventName accounting.kafka.connecting.
- **R147.** When orders are redelivered (accounting stopped, its consumer group reset to the earliest offset, then started), accounting logs "Duplicate order received, skipping." with eventName accounting.order.duplicate_skipped and logs no "Order parsing failed:" error for them.
- **R148.** On docker stop, accounting logs "Closing consumer" and exits with code 0 before Docker's 10-second kill.

### Fraud detection consumer

- **R149.** After the fraud-detection consumer group is deleted while fraud-detection is stopped, starting fraud-detection again logs "Consumed record with orderId: <id>" for orders placed before it started.
