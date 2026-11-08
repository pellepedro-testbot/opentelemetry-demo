# Release 3.1.0 update: cart, accounting, fraud detection and Kafka (25 requirements)

Brings the shop up to release 3.1.0, part 3 of 10: cart, accounting, fraud detection and Kafka.

The storefront is at http://localhost:8080. Flags are read and written through /feature/api/read and /feature/api/write. Texts in quotes are exact. "Frontend log line" means a line on the frontend container's stdout.

## Requirements

### Cart

- **R99.** GET /api/cart for a user who has added nothing answers 200 with an empty items list.
- **R100.** Adding the same product again adds to its quantity: 2 then 3 gives one line of 5.
- **R199.** Adding a new product to a cart stores it with the quantity given.
- **R200.** DELETE /api/cart empties the cart: GET /api/cart then answers an empty items list.

### Cart OpAMP status

- **R203.** The OpAMP page at /opamp/ lists an agent whose service.name is "cart".
- **R213.** The cart agent on the OpAMP page carries a service.instance.id identifying attribute equal to the service.instance.id resource attribute on cart spans in Jaeger.

### Cart log event names

- **R223.** After a cart restart, the cart log record "Successfully connected to Redis" reaches OpenSearch with eventName cart.redis.connected.
- **R233.** POST /api/cart produces a cart log record "AddItemAsync called with userId=..., productId=..., quantity=..." with eventName cart.add_item in OpenSearch.
- **R243.** GET /api/cart produces a cart log record "GetCartAsync called with userId=..." with eventName cart.get in OpenSearch.
- **R252.** DELETE /api/cart produces a cart log record "EmptyCartAsync called with userId=..." with eventName cart.empty in OpenSearch.

### Cart span attributes

- **R261.** The cart AddItem server span has user.id equal to the shopper's userId, and no app.user.id attribute.
- **R270.** The cart AddItem server span has demo.product.id equal to the added product id (e.g. "OLJCESPC7Z").
- **R279.** The cart AddItem server span has demo.product.quantity equal to the quantity added.
- **R288.** The cart GetCart server span has demo.cart.items.count equal to the sum of item quantities in the cart (e.g. 5 after adding 2 then 3 of one product).
- **R297.** The cart GetCart server span has user.id equal to the requested userId.

### Cart metric renames

- **R306.** After POST /api/cart calls, Prometheus has the histogram demo_cart_add_item_latency_seconds (bucket/count/sum series) from service cart; app_cart_add_item_latency_seconds is no longer produced.
- **R315.** After GET /api/cart calls, Prometheus has the histogram demo_cart_get_cart_latency_seconds from service cart.

### Cart cartFailure rate

- **R324.** cartFailure is a failure rate: with its "50%" variant, out of 20 DELETE /api/cart calls some fail (cart EmptyCart span with error status) and some succeed.

### Kafka topic

- **R333.** With KAFKA_TOPIC set to another name (e.g. orders-test) and the stack restarted, the accounting consumer group consumes from that topic: kafka-consumer-groups --describe --group accounting lists topic orders-test with offsets advancing per order, and each new order still produces an accounting "Order details:" log record.
- **R342.** With KAFKA_TOPIC set to another name (e.g. orders-test) and the stack restarted, the fraud-detection consumer group consumes from that topic: kafka-consumer-groups --describe --group fraud-detection lists topic orders-test, and each new order still produces a "Consumed record with orderId: <id>" log line.

### Fraud-detection offsets

- **R350.** A fraud-detection consumer group with no committed offset reads the orders topic from the start: orders placed while fraud-detection was stopped and its group deleted are logged as "Consumed record with orderId: <id>" once it starts.

### Accounting log events

- **R357.** The accounting "Order details:" log record for a placed order has event name "accounting.order.received".
- **R364.** On startup accounting emits a log record with event name "accounting.kafka.connecting" whose message starts with "Connecting to Kafka:" and that carries the Kafka address kafka:9092 (as the servers value).

### Accounting duplicate orders

- **R371.** When accounting receives an order whose id is already stored (e.g. Kafka redelivery after resetting the accounting group's offsets), it logs "Duplicate order received, skipping." at Information with event name "accounting.order.duplicate_skipped", not an "Order parsing failed:" error.

### Accounting shutdown

- **R378.** On SIGTERM (docker stop accounting) accounting logs "Closing consumer" (event name "accounting.consumer.closing") before exiting.
