# Release 3.1.0 update: checkout service and email (38 requirements)

Brings the shop up to release 3.1.0, part 2 of 10: checkout service and email.

The storefront is at http://localhost:8080. Flags are read and written through /feature/api/read and /feature/api/write. Texts in quotes are exact. "Frontend log line" means a line on the frontend container's stdout.

## Requirements

### Raw PII on the checkout span

- **R27.** With the emitRawPii flag off, the checkout PlaceOrder span has no user.email attribute.
- **R28.** With emitRawPii off, the checkout PlaceOrder span has no demo.payment.card_cvv attribute.
- **R29.** With emitRawPii off, the checkout PlaceOrder span still has demo.user_context.selected_currency.
- **R30.** With emitRawPii off, the checkout PlaceOrder span has no redaction.ignored.count attribute.
- **R31.** With emitRawPii on, the checkout PlaceOrder span in Jaeger has no demo.payment.card_cvv attribute: the collector removes it.
- **R32.** With emitRawPii on, the checkout PlaceOrder span in Jaeger has user.hash equal to the SHA-256 hex of the order's email.
- **R33.** Turning emitRawPii off again removes demo.payment.card_number from the PlaceOrder span of the next order.
- **R127.** With emitRawPii off, the checkout PlaceOrder span has no demo.payment.card_number attribute.
- **R128.** With emitRawPii off, the checkout PlaceOrder span still has user.id, equal to the order's userId.
- **R129.** With emitRawPii off, the checkout PlaceOrder span has no user.hash attribute, because no email was sent to the collector.
- **R130.** With emitRawPii on and card number 4432-8015-6152-0454, the checkout PlaceOrder span in Jaeger shows demo.payment.card_number as ****-****-****-0454.
- **R131.** With emitRawPii on, the checkout PlaceOrder span in Jaeger has no user.email attribute: the collector removes it.
- **R132.** With emitRawPii on, the checkout PlaceOrder span in Jaeger has redaction.ignored.count 1.

### Checkout service

- **R34.** After a confirmation email is sent, the checkout service logs "order confirmation email sent" with demo.order.id equal to the orderId.
- **R35.** When the email service hangs, POST /api/checkout still answers 200 with an orderId.
- **R36.** When the email service hangs, checkout logs at WARN level a message starting "failed to send order confirmation" that contains "context deadline exceeded".
- **R37.** When the email service answers again, the next order logs "order confirmation email sent" with its orderId.
- **R133.** The "order confirmation email sent" log record has severity INFO.
- **R134.** When the email service hangs, POST /api/checkout answers within 5 seconds: the email call gives up after 3 seconds.
- **R135.** When the email service hangs, checkout does not log "order confirmation email sent" for that order.
- **R136.** On SIGTERM (docker stop) the checkout container exits with code 0 well before Docker's 10-second kill.

### Checkout synthetic requests

- **R202.** A POST /api/checkout sent with the header "baggage: synthetic_request=true" produces a checkout PlaceOrder span with user_agent.synthetic.type "test"; orders placed by the load generator carry it too.

### Checkout span attributes

- **R212.** The checkout PlaceOrder span has demo.order.id equal to the orderId in the checkout answer.
- **R222.** The checkout PlaceOrder span has demo.shipping.tracking.id equal to the answer's shippingTrackingId, and its "shipped" event carries the same demo.shipping.tracking.id.
- **R232.** The "charged" event on the checkout PlaceOrder span has a demo.payment.transaction.id attribute (the payment transaction id).
- **R242.** The checkout PlaceOrder span has demo.order.items.count equal to the number of items in the checkout answer.
- **R269.** The checkout PlaceOrder span carries no app.* attributes: app.user.id, app.user.currency, app.order.id, app.order.amount, app.shipping.amount, app.order.items.count and app.shipping.tracking.id are absent.
- **R278.** The checkout prepareOrderItemsAndShippingQuoteFromCart span has demo.cart.items.count equal to the total quantity in the cart, plus demo.order.items.count and demo.shipping.amount.

### Checkout order amounts

- **R251.** For an order of 1 item in USD, the checkout PlaceOrder span has demo.shipping.amount 8.99, cents included (not truncated to 8).
- **R260.** The checkout PlaceOrder span has demo.order.amount equal to the order total (item costs times quantities plus shipping) truncated, not rounded, to the cent, with the cents kept (e.g. 110.94 for one OLJCESPC7Z in USD, whose converted cost in the answer is 101 units 959999999 nanos), not truncated to whole units.

### Checkout order log

- **R287.** The checkout "order placed" log record carries demo.order.id, demo.shipping.tracking.id, demo.order.amount, demo.shipping.amount and demo.order.items.count attributes matching the order.

### Checkout error messages

- **R296.** With the quote container stopped (shipping answers 500), a checkout fails and the checkout PlaceOrder span's error status message contains "failed POST to shipping service: expected 200, got 500" (not "email service").

### Checkout container

- **R305.** The checkout container reports Docker health status "healthy" (gRPC health probe against its port).

### Kafka topic

- **R314.** With KAFKA_TOPIC set to another name (e.g. orders-test) and the stack restarted, checkout's Kafka producer span (kind producer) has messaging.destination.name orders-test.

### Email metric

- **R323.** Email reports its confirmation counter to Prometheus as demo_notification_confirmations_total, which grows by one per order; app_confirmation_counter_total no longer exists.

### Email spans

- **R332.** The email POST /send_order_confirmation server span and its send_email child span carry demo.order.id equal to the order's id, and no app.order.id.

### Email log record

- **R341.** The email "Order confirmation email sent" log record has attribute demo.order.id equal to the order's id.
- **R349.** The email "Order confirmation email sent" log record has event name "email.confirmation_sent".
