# Release 3.1.0 update: checkout service, payment, cart, shipping, orders and collector (96 requirements)

Brings the shop up to release 3.1.0 and adds the storefront, checkout, cart, shipping, payment, currency, recommendation and order-processing changes planned for this release.

The storefront is at http://localhost:8080. Flags are read and written through /feature/api/read and /feature/api/write, and resolved through /flagservice. Grafana is at /grafana, Jaeger at /jaeger, the OpAMP server UI at /opamp/, the load generator at /loadgen and the telemetry docs at /telemetry. Texts in quotes are exact. "Frontend log line" means a line on the frontend container's stdout.

## Requirements

### Checkout service

- **R68.** After a confirmation email is sent, the checkout service logs "order confirmation email sent" with demo.order.id equal to the orderId.
- **R69.** When the email service hangs, POST /api/checkout still answers 200 with an orderId.
- **R70.** When the email service hangs, checkout logs at WARN level a message starting "failed to send order confirmation" that contains "context deadline exceeded".
- **R71.** When the email service answers again, the next order logs "order confirmation email sent" with its orderId.
- **R72.** The "order confirmation email sent" log record has severity INFO.
- **R73.** When the email service hangs, POST /api/checkout answers within 5 seconds: the email call gives up after 3 seconds.
- **R74.** When the email service hangs, checkout does not log "order confirmation email sent" for that order.
- **R75.** On SIGTERM (docker stop) the checkout container exits with code 0 well before Docker's 10-second kill.
- **R76.** For an order of one item in USD, the checkout PlaceOrder span has demo.shipping.amount 8.99, not 8.
- **R77.** For an order of one The Comet Book (HQTGWGPNH4) in USD, the checkout PlaceOrder span has demo.order.amount 9.98.
- **R78.** For an order of one item in USD, the checkout prepareOrderItemsAndShippingQuoteFromCart span has demo.shipping.amount 8.99.
- **R79.** The checkout "order placed" log record in OpenSearch for one The Comet Book in USD has demo.order.amount 9.98 and demo.shipping.amount 8.99.
- **R80.** With the quote container stopped, POST /api/checkout fails and the checkout PlaceOrder span records an exception whose message contains "failed POST to shipping service: expected 200, got 500".
- **R81.** Jaeger holds no grpc.health.v1.Health/Check spans from service checkout, although compose probes checkout's health every 5 seconds.

### Raw PII on the checkout span

- **R82.** With the emitRawPii flag off, the checkout PlaceOrder span has no user.email attribute.
- **R83.** With emitRawPii off, the checkout PlaceOrder span has no demo.payment.card_cvv attribute.
- **R84.** With emitRawPii off, the checkout PlaceOrder span still has demo.user_context.selected_currency.
- **R85.** With emitRawPii off, the checkout PlaceOrder span has no redaction.ignored.count attribute.
- **R86.** With emitRawPii on, the checkout PlaceOrder span in Jaeger has no demo.payment.card_cvv attribute: the collector removes it.
- **R87.** With emitRawPii on, the checkout PlaceOrder span in Jaeger has user.hash equal to the SHA-256 hex of the order's email.
- **R88.** Turning emitRawPii off again removes demo.payment.card_number from the PlaceOrder span of the next order.
- **R89.** With emitRawPii off, the checkout PlaceOrder span has no demo.payment.card_number attribute.
- **R90.** With emitRawPii off, the checkout PlaceOrder span still has user.id, equal to the order's userId.
- **R91.** With emitRawPii off, the checkout PlaceOrder span has no user.hash attribute, because no email was sent to the collector.
- **R92.** With emitRawPii on and card number 4432-8015-6152-0454, the checkout PlaceOrder span in Jaeger shows demo.payment.card_number as ****-****-****-0454.
- **R93.** With emitRawPii on, the checkout PlaceOrder span in Jaeger has no user.email attribute: the collector removes it.
- **R94.** With emitRawPii on, the checkout PlaceOrder span in Jaeger has redaction.ignored.count 1.

### Synthetic request annotation

- **R95.** A POST /api/checkout sent with the header baggage: synthetic_request=true produces a checkout PlaceOrder span with user_agent.synthetic.type "test".
- **R96.** A POST /api/checkout without synthetic_request baggage produces a checkout PlaceOrder span with no user_agent.synthetic.type attribute.
- **R97.** A POST /api/checkout sent with the header baggage: synthetic_request=true produces a payment "charge" span with user_agent.synthetic.type "test".

### Payment service

- **R98.** With emitRawPii off, the payment "charge" span has no demo.payment.card_cvv attribute.
- **R99.** With emitRawPii off, the payment "charge" span still has demo.payment.card_valid true for a valid card.
- **R100.** With emitRawPii on and card number 4432-8015-6152-0454, the payment "charge" span in Jaeger shows demo.payment.card_number as ****-****-****-0454.
- **R101.** The payment service writes JSON log lines to stdout, with service.name "payment" and msg "Transaction complete." for a completed charge.
- **R102.** "Transaction complete." log records reach OpenSearch under service.name payment.
- **R103.** Each completed charge has exactly one "Transaction complete." record in OpenSearch, by transactionId.
- **R104.** With emitRawPii off, the payment "charge" span has no demo.payment.card_number attribute.
- **R105.** With emitRawPii off, the payment "charge" span still has demo.payment.card_type, "visa" for a Visa card.
- **R106.** With emitRawPii off, the payment "charge" span still has demo.user_context.loyalty_level.
- **R107.** With emitRawPii on, the payment "charge" span in Jaeger has no demo.payment.card_cvv attribute.
- **R108.** The "Transaction complete." line has lastFourDigits and no full card number.
- **R109.** Payment log records in OpenSearch come from the instrumentation scope @opentelemetry/instrumentation-pino.
- **R110.** Payment still exports traces: the checkout trace holds an oteldemo.PaymentService/Charge server span from service payment.
- **R111.** POST /api/checkout with an invalid card number such as "1234" produces a payment "charge" span with error.type "Error".
- **R112.** POST /api/checkout with an invalid card number produces a payment oteldemo.PaymentService/Charge server span with error status and error.type "Error".
- **R113.** The payment oteldemo.PaymentService/Charge span's demo.payment.amount equals the charged total, units + nanos / 10^9, to two decimals, also when the nanos are below 100000000.

### Cart

- **R114.** GET /api/cart for a user who has added nothing answers 200 with an empty items list.
- **R115.** Adding the same product again adds to its quantity: 2 then 3 gives one line of 5.
- **R116.** Adding a new product to a cart stores it with the quantity given.
- **R117.** DELETE /api/cart empties the cart: GET /api/cart then answers an empty items list.
- **R118.** The OpAMP page at /opamp/ lists an agent named cart.
- **R119.** The OpAMP agent page for cart shows a service.instance.id equal to the service.instance.id resource attribute on cart spans in Jaeger.
- **R120.** With the cartFailure flag set to its "100%" variant, DELETE /api/cart answers 500.
- **R121.** With cartFailure at "100%", the cart EmptyCart span in Jaeger has error status with a message starting "Can't access cart storage."

### Shipping quotes

- **R122.** GET /api/shipping for 1 item in USD answers 8.99: units 8, nanos 990000000.
- **R123.** GET /api/shipping for 4 items in USD answers 35.96: units 35, nanos 960000000.
- **R124.** GET /api/shipping for 10 items in USD answers 89.90: units 89, nanos 900000000.
- **R125.** The shipping cost in a checkout answer for 1 item in USD equals GET /api/shipping for 1 item: 8.99.
- **R126.** create_quote_from_float(71.92) gives 71 dollars and 92 cents.
- **R127.** Quote::total_cents() of a quote of 0 dollars and 5 cents is 5.
- **R128.** A quote of 10 dollars and 5 cents displays as "10.05".
- **R129.** GET /api/shipping for 2 items in USD answers 17.98: units 17, nanos 980000000.
- **R130.** GET /api/shipping for 5 items in USD answers 44.95: units 44, nanos 950000000.
- **R131.** GET /api/shipping for 3 items in USD answers 26.97 once rounded to the cent.
- **R132.** create_quote_from_float(8.99) gives 8 dollars and 99 cents.
- **R133.** Quote::total_cents() of create_quote_from_float(10.5) is 1050.
- **R134.** A quote of 0 dollars and 1 cent displays as "0.01".
- **R135.** A quote of 100 dollars and 0 cents displays as "100.00".

### Orders: accounting, fraud detection and email

- **R136.** With KAFKA_TOPIC=orders-alt set on checkout, the checkout producer span for a new order is named "orders-alt publish" with messaging.destination.name "orders-alt".
- **R137.** With KAFKA_TOPIC=orders-alt set on both checkout and fraud-detection, fraud-detection logs "Consumed record with orderId: <orderId>" for a new order.
- **R138.** With KAFKA_TOPIC=orders-alt set on both checkout and accounting, accounting logs "Order details:" for a new order.
- **R139.** On docker stop, the accounting container logs "Closing consumer" before it exits.
- **R140.** The email "Order confirmation email sent" log record in OpenSearch has eventName email.confirmation_sent.

### Collector redaction

- **R141.** A span sent to the collector with a "password" attribute is exported with the value "****".
- **R142.** A span attribute whose key contains "secret", such as db.secret.key, is exported with the value "****".
- **R143.** A numeric-looking demo.order.id such as 1234567812345678 passes through the collector unchanged.
- **R144.** A card-like value under an unrelated key, such as note = "4111 1111 1111 1111", passes through unchanged, because redaction matches keys and not values.
- **R145.** A user.email sent directly to the collector is not exported; user.hash holds its SHA-256 hex instead.
- **R146.** A span with demo.payment.card_number carries redaction.ignored.count 1.
- **R147.** A span with no sensitive attributes has no redaction.masked.count attribute.
- **R148.** A span sent to the collector with a demo.payment.card_pin attribute is exported with the value "****".
- **R149.** A span attribute whose key contains "password", such as user_password, is exported with the value "****".
- **R150.** An unrelated attribute such as demo.keep passes through the collector unchanged.
- **R151.** A demo.payment.card_number of 4432-8015-6152-0454 sent directly to the collector is exported as ****-****-****-0454.
- **R152.** A span with masked attributes carries redaction.masked.count equal to the number of attributes masked.
- **R153.** The redaction summary is counts only: the span has no redaction.masked.keys or redaction.ignored.keys attribute.

### Collector OTLP/HTTP CORS

- **R154.** A CORS preflight OPTIONS to http://localhost:8080/otlp-http/v1/traces with Origin http://localhost:8080 and Access-Control-Request-Headers traceparent is allowed: the answer's Access-Control-Allow-Headers includes traceparent.
- **R155.** A CORS preflight to /otlp-http/v1/traces asking for the baggage header gets Access-Control-Allow-Headers including baggage.

### Collector metrics

- **R156.** Prometheus has a container uptime series (metric name starting container_uptime) for the checkout container.
- **R157.** Prometheus has a container RSS memory series (metric name starting container_memory_rss) for the checkout container.
- **R158.** Prometheus has the host paging utilization metric (metric name starting system_paging_utilization).

### Collector OpAMP reporting

- **R159.** The OpAMP page at /opamp/ lists the collector's agent, instance id 00000000-0000-7000-8000-000000000001.
- **R160.** The collector's OpAMP agent page shows the non-identifying attribute demo.collector.role with value "gateway".
- **R161.** The collector's OpAMP agent page shows the non-identifying attribute deployment.environment.name with value "demo".
- **R162.** The collector's OpAMP agent page shows its effective configuration, which contains the exporter name otlp_grpc/jaeger.
- **R163.** The collector's agent shows health "Up" on the OpAMP page.
