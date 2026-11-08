# Release 3.1.0 update: checkout, payment and email (55 requirements)

Brings the shop up to release 3.1.0 and adds the storefront, checkout, cart, shipping, payment, currency, recommendation and order-processing changes planned for this release.

The storefront is at http://localhost:8080. Flags are read and written through /feature/api/read and /feature/api/write. Texts in quotes are exact. "Frontend log line" means a line on the frontend container's stdout.

## Requirements

### Raw PII on the checkout span

- **R69.** With the emitRawPii flag off, the checkout PlaceOrder span has no user.email attribute.
- **R70.** With emitRawPii off, the checkout PlaceOrder span has no demo.payment.card_cvv attribute.
- **R71.** With emitRawPii off, the checkout PlaceOrder span still has demo.user_context.selected_currency.
- **R72.** With emitRawPii off, the checkout PlaceOrder span has no redaction.ignored.count attribute.
- **R73.** With emitRawPii on, the checkout PlaceOrder span in Jaeger has no demo.payment.card_cvv attribute: the collector removes it.
- **R74.** With emitRawPii on, the checkout PlaceOrder span in Jaeger has user.hash equal to the SHA-256 hex of the order's email.
- **R75.** Turning emitRawPii off again removes demo.payment.card_number from the PlaceOrder span of the next order.
- **R76.** With emitRawPii off, the checkout PlaceOrder span has no demo.payment.card_number attribute.
- **R77.** With emitRawPii off, the checkout PlaceOrder span still has user.id, equal to the order's userId.
- **R78.** With emitRawPii off, the checkout PlaceOrder span has no user.hash attribute, because no email was sent to the collector.
- **R79.** With emitRawPii on and card number 4432-8015-6152-0454, the checkout PlaceOrder span in Jaeger shows demo.payment.card_number as ****-****-****-0454.
- **R80.** With emitRawPii on, the checkout PlaceOrder span in Jaeger has no user.email attribute: the collector removes it.
- **R81.** With emitRawPii on, the checkout PlaceOrder span in Jaeger has redaction.ignored.count 1.

### Checkout service

- **R82.** After a confirmation email is sent, the checkout service logs "order confirmation email sent" with demo.order.id equal to the orderId.
- **R83.** When the email service hangs, POST /api/checkout still answers 200 with an orderId.
- **R84.** When the email service hangs, checkout logs at WARN level a message starting "failed to send order confirmation" that contains "context deadline exceeded".
- **R85.** When the email service answers again, the next order logs "order confirmation email sent" with its orderId.
- **R86.** The "order confirmation email sent" log record has severity INFO.
- **R87.** When the email service hangs, POST /api/checkout answers within 5 seconds: the email call gives up after 3 seconds.
- **R88.** When the email service hangs, checkout does not log "order confirmation email sent" for that order.
- **R89.** On SIGTERM (docker stop) the checkout container exits with code 0 well before Docker's 10-second kill.

### Payment service

- **R90.** With emitRawPii off, the payment "charge" span has no demo.payment.card_cvv attribute.
- **R91.** With emitRawPii off, the payment "charge" span still has demo.payment.card_valid true for a valid card.
- **R92.** With emitRawPii on and card number 4432-8015-6152-0454, the payment "charge" span in Jaeger shows demo.payment.card_number as ****-****-****-0454.
- **R93.** The payment service writes JSON log lines to stdout, with service.name "payment" and msg "Transaction complete." for a completed charge.
- **R94.** "Transaction complete." log records reach OpenSearch under service.name payment.
- **R95.** Each completed charge has exactly one "Transaction complete." record in OpenSearch, by transactionId.
- **R96.** With emitRawPii off, the payment "charge" span has no demo.payment.card_number attribute.
- **R97.** With emitRawPii off, the payment "charge" span still has demo.payment.card_type, "visa" for a Visa card.
- **R98.** With emitRawPii off, the payment "charge" span still has demo.user_context.loyalty_level.
- **R99.** With emitRawPii on, the payment "charge" span in Jaeger has no demo.payment.card_cvv attribute.
- **R100.** The "Transaction complete." line has lastFourDigits and no full card number.
- **R101.** Payment log records in OpenSearch come from the instrumentation scope @opentelemetry/instrumentation-pino.
- **R102.** Payment still exports traces: the checkout trace holds an oteldemo.PaymentService/Charge server span from service payment.

### Checkout synthetic requests

- **R103.** A POST /api/checkout sent with the header "baggage: synthetic_request=true" produces a checkout PlaceOrder span with user_agent.synthetic.type "test".
- **R104.** A POST /api/checkout without synthetic_request baggage produces a PlaceOrder span with no user_agent.synthetic.type attribute.

### Checkout order telemetry

- **R105.** The checkout PlaceOrder span of a successful order carries demo.order.id equal to the orderId and demo.shipping.tracking.id equal to the shippingTrackingId of the checkout answer, and has no app.order.id or app.shipping.tracking.id.
- **R106.** The PlaceOrder span carries a "charged" event with demo.payment.transaction.id and a "shipped" event with demo.shipping.tracking.id (not app.payment.transaction.id / app.shipping.tracking.id).
- **R107.** For an order of one Red Flashlight (LS4PSXUNUM, 57.08 USD) in USD, the PlaceOrder span has demo.shipping.amount 8.99 and demo.order.amount 66.07, and demo.order.items.count 1.
- **R108.** The prepareOrderItemsAndShippingQuoteFromCart span carries demo.shipping.amount 8.99 for a one-item USD order, demo.cart.items.count equal to the total quantity in the cart and demo.order.items.count equal to the number of distinct products.
- **R109.** The checkout "order placed" log record in OpenSearch (service.name checkout) carries demo.order.id equal to the orderId, demo.shipping.tracking.id equal to the shippingTrackingId and demo.shipping.amount 8.99 for a one-item USD order, and no app.order.id.

### Checkout error messages

- **R110.** When the shipping service answers a non-200 status to /get-quote or /ship-order, checkout's error reads "failed POST to shipping service: expected 200, got <code>", not "email service".

### Checkout health

- **R111.** The checkout container reports Docker health status "healthy", from a healthcheck that runs /bin/grpc_health_probe against the checkout gRPC port.

### Payment synthetic requests

- **R112.** A POST /api/checkout sent with the header "baggage: synthetic_request=true" produces a payment "charge" span with user_agent.synthetic.type "test" and demo.payment.charged false.
- **R113.** A checkout without synthetic_request baggage produces a "charge" span with demo.payment.charged true, no app.payment.charged and no user_agent.synthetic.type.

### Payment end user

- **R114.** A POST /api/checkout sent with the header "baggage: enduser.id=<id>" produces a payment "charge" span with enduser.id equal to <id>.

### Payment errors

- **R115.** For a card that fails validation (number "1234"), the payment "charge" span has error status, an exception "Credit card info is invalid." and error.type "Error".
- **R116.** With the paymentFailure flag at 100%, the payment "charge" span has error status with message "Payment request failed. Invalid token. demo.user_context.loyalty_level=gold" and demo.user_context.loyalty_level "gold".

### Payment amount and metrics

- **R117.** For an order of one Red Flashlight in USD (total 66.07), the oteldemo.PaymentService/Charge server span from service payment has demo.payment.amount "66.07" and no app.payment.amount.
- **R118.** After a completed USD order, Prometheus has demo_payment_transactions_total with label demo_payment_currency="USD" from service payment; app_payment_transactions_total is not reported.

### Payment health

- **R119.** The payment container reports Docker health status "healthy": its gRPC server accepts connections on PAYMENT_PORT.

### Email telemetry

- **R120.** The email server span for POST /send_order_confirmation and its child "send_email" span both carry demo.order.id equal to the orderId of the checkout answer, and no app.order.id.
- **R121.** The "Order confirmation email sent" log record in OpenSearch (service.name email) carries demo.order.id equal to the orderId, and no app.order.id.
- **R122.** The "Order confirmation email sent" log record in OpenSearch has the event name "email.confirmation_sent".
- **R123.** After an order, Prometheus has demo_notification_confirmations_total from service email; app_confirmation_counter_total is not reported.
