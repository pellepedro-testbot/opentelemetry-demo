# Release 3.1.0 update: storefront, checkout API and load generator (67 requirements)

Brings the shop up to release 3.1.0 and adds the storefront, checkout, cart, shipping, payment, currency, recommendation and order-processing changes planned for this release.

The storefront is at http://localhost:8080. Flags are read and written through /feature/api/read and /feature/api/write, and resolved through /flagservice. Grafana is at /grafana, Jaeger at /jaeger, the OpAMP server UI at /opamp/, the load generator at /loadgen and the telemetry docs at /telemetry. Texts in quotes are exact. "Frontend log line" means a line on the frontend container's stdout.

## Requirements

### Declined cards at checkout

- **R1.** POST /api/checkout with a card number that fails validation, such as "1234", answers HTTP 422.
- **R2.** The 422 answer to a declined card has "error": "Your payment could not be processed. Please check your card details and try again." in its JSON body, exactly that text.
- **R3.** POST /api/checkout with an expired card (expiration year 2020) answers 422 with code PAYMENT_FAILED.
- **R4.** With the paymentFailure flag at 100%, POST /api/checkout with a valid card answers 422 with code PAYMENT_FAILED.
- **R5.** After a declined card the shopper's cart still holds its items: GET /api/cart for that user returns the product.
- **R6.** The "Checkout payment declined" log line has a "details" field that starts with "failed to charge card:".
- **R7.** The frontend span of a declined POST /api/checkout has error status.
- **R8.** The "Checkout payment declined" log record reaches OpenSearch under service.name frontend, with the "details" attribute.
- **R9.** The 422 answer to a failed card validation has "code": "PAYMENT_FAILED" in its JSON body.
- **R10.** The JSON body of a declined-card answer holds only the keys "error" and "code": no order id and no items.
- **R11.** POST /api/checkout with a card type the payment service does not accept (American Express 378282246310005) answers 422 with code PAYMENT_FAILED.
- **R12.** The answer to a paymentFailure decline does not expose internal text: the body contains neither "Invalid token" nor "loyalty_level".
- **R13.** A declined card writes one frontend log line at info level (pino level 30) with the message "Checkout payment declined".
- **R14.** A declined card writes no "Checkout failed to place order" log line.
- **R15.** The frontend span of a declined POST /api/checkout carries an exception event.
- **R16.** A declined POST /api/checkout also writes an "API request completed" log line with http.response.status_code 422.

### Other checkout failures

- **R17.** When the order fails for a reason other than payment (productCatalogFailure on, ordering product OLJCESPC7Z), POST /api/checkout answers 500.
- **R18.** With the paymentUnreachable flag on, POST /api/checkout answers 500, not 422.
- **R19.** POST /api/checkout with an empty JSON object answers 500 with {"error": "Failed to place order."}.
- **R20.** A non-payment checkout failure writes no "Checkout payment declined" log line.
- **R21.** The frontend span of a non-payment checkout failure has error status.
- **R22.** With productCatalogFailure on, ordering product OLJCESPC7Z answers exactly the JSON body {"error": "Failed to place order."}.
- **R23.** With paymentUnreachable on, the checkout answer has no "code" key.
- **R24.** A non-payment checkout failure writes a frontend log line at error level (pino level 50) with the message "Checkout failed to place order" and an "err" field.
- **R25.** The "Checkout failed to place order" log record reaches OpenSearch under service.name frontend, with an exception.message attribute.
- **R26.** After a non-payment checkout failure the shopper's cart still holds its items.

### Successful checkout

- **R27.** A successful POST /api/checkout answers 200 with orderId, shippingTrackingId, shippingCost, shippingAddress and items.
- **R28.** The "Order placed successfully" log line has a "demo.order.id" field equal to the orderId in the answer.
- **R29.** A successful checkout writes neither "Checkout payment declined" nor "Checkout failed to place order".
- **R30.** POST /api/checkout?currencyCode=EUR answers item costs and the shipping cost in EUR.
- **R31.** A successful checkout writes one frontend log line at info level with the message "Order placed successfully".
- **R32.** The "Order placed successfully" log record reaches OpenSearch under service.name frontend, with the demo.order.id attribute equal to the orderId.
- **R33.** After a successful checkout the shopper's cart is empty.

### API request logs

- **R34.** GET /api/products writes one frontend log line at info level with the message "API request completed".
- **R35.** url.path on the "API request completed" line leaves out the query string: GET /api/products?currencyCode=USD logs /api/products.
- **R36.** POST /api/cart logs "API request completed" with http.request.method POST and url.path /api/cart.
- **R37.** When an API handler throws (GET /api/shipping with no parameters), the answer is 500 and the frontend logs "API request failed" at error level.
- **R38.** The "API request failed" line for GET /api/shipping has http.request.method GET, url.path /api/shipping and http.response.status_code 500.
- **R39.** The "API request completed" line for GET /api/products has http.request.method GET and http.response.status_code 200.
- **R40.** GET /api/products/OLJCESPC7Z logs url.path /api/products/OLJCESPC7Z.
- **R41.** GET /api/checkout answers 405 and logs "API request completed" with http.response.status_code 405.
- **R42.** The "API request failed" line has an "err" field holding the thrown error.
- **R43.** A handler that throws writes no "API request completed" line for that request.

### Storefront in the browser

- **R44.** In the browser, after a declined card the product is still listed on the cart page.
- **R45.** In the browser, a successful order goes to /cart/checkout/<orderId>, with the orderId from the checkout answer.
- **R46.** The currency switcher lists its options in alphabetical order.
- **R47.** On a first visit the currency switcher has USD selected, even though USD is not first in the list.
- **R48.** In the browser, when a card is declined the page stays on /cart and does not go to a /cart/checkout/ page.
- **R49.** In the browser, after a declined card, entering a valid card number and placing the order again succeeds.
- **R50.** In the browser, with paymentUnreachable on, placing an order answers 500 and the page stays on /cart.
- **R51.** The currency switcher offers exactly the codes GET /api/currency returns, each once.
- **R52.** Choosing EUR in the currency switcher keeps EUR selected on the next page and shows product prices with the euro sign.
- **R53.** In the server-rendered HTML of /product/OLJCESPC7Z, the "cart" icon image on the Add To Cart button has a relative src starting with "/icons/Cart.svg?w=", with no scheme or host.
- **R54.** GET /opamp on the frontend proxy answers 301 with Location "/opamp/".

### Storefront error pages

- **R55.** GET /this-page-does-not-exist on the storefront answers 404 with an HTML page titled "Otel Demo - Page Not Found".
- **R56.** The storefront 404 page shows the heading "404", the text "This page could not be found." and a "Go to homepage" link to "/".

### Load generator

- **R57.** The user_ask_agent span has gen_ai.input.messages holding a JSON list with one message of role "user".
- **R58.** The user_ask_agent span has a child POST to http://agent:8010/prompt.
- **R59.** While generating load, the load generator emits spans named user_ask_agent.
- **R60.** The message text in gen_ai.input.messages is one of the three prompts: "Show all available products in the store.", "What currencies are supported by the Astronomy Shop?", "What current promotions are available on binoculars?".
- **R61.** The load generator logs "User asking agent: <prompt>", and the record reaches OpenSearch.
- **R62.** Each load-generator user session starts with a trace whose root span user_session_start has a child span user_index.
- **R63.** Under load-generator traffic, the ad service's GetAds server spans carry a session.id attribute.
- **R64.** The load generator's user_browse_product spans carry the attribute demo.product.id with the browsed product id.
- **R65.** The load generator's user_get_ads spans carry the attribute demo.ad.category.
- **R66.** The load generator's user_add_to_cart spans carry demo.product.id and demo.product.quantity, the quantity being one of 1, 2, 3, 4, 5 or 10.
- **R67.** The load generator's user_checkout_multi spans carry demo.cart.items.count with a value of 2, 3 or 4.
