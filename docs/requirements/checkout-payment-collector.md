# Release 3.1.0 update: checkout service, payment, cart and collector (51 requirements)

Brings the shop up to release 3.1.0 and adds the storefront, checkout and shipping changes planned for this release.

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

### Collector redaction

- **R44.** A span sent to the collector with a "password" attribute is exported with the value "****".
- **R45.** A span attribute whose key contains "secret", such as db.secret.key, is exported with the value "****".
- **R46.** A numeric-looking demo.order.id such as 1234567812345678 passes through the collector unchanged.
- **R47.** A card-like value under an unrelated key, such as note = "4111 1111 1111 1111", passes through unchanged, because redaction matches keys and not values.
- **R48.** A user.email sent directly to the collector is not exported; user.hash holds its SHA-256 hex instead.
- **R49.** A span with demo.payment.card_number carries redaction.ignored.count 1.
- **R50.** A span with no sensitive attributes has no redaction.masked.count attribute.
- **R144.** A span sent to the collector with a demo.payment.card_pin attribute is exported with the value "****".
- **R145.** A span attribute whose key contains "password", such as user_password, is exported with the value "****".
- **R146.** An unrelated attribute such as demo.keep passes through the collector unchanged.
- **R147.** A demo.payment.card_number of 4432-8015-6152-0454 sent directly to the collector is exported as ****-****-****-0454.
- **R148.** A span with masked attributes carries redaction.masked.count equal to the number of attributes masked.
- **R149.** The redaction summary is counts only: the span has no redaction.masked.keys or redaction.ignored.keys attribute.

### Cart

- **R99.** GET /api/cart for a user who has added nothing answers 200 with an empty items list.
- **R100.** Adding the same product again adds to its quantity: 2 then 3 gives one line of 5.
- **R199.** Adding a new product to a cart stores it with the quantity given.
- **R200.** DELETE /api/cart empties the cart: GET /api/cart then answers an empty items list.
