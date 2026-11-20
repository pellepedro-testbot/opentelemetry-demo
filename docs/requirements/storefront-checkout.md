# Release 3.1.0 update: storefront and checkout API (52 requirements)

Brings the shop up to release 3.1.0 and adds the storefront, checkout and shipping changes planned for this release.

The storefront is at http://localhost:8080. Flags are read and written through /feature/api/read and /feature/api/write. Texts in quotes are exact. "Frontend log line" means a line on the frontend container's stdout.

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
- **R101.** The 422 answer to a failed card validation has "code": "PAYMENT_FAILED" in its JSON body.
- **R102.** The JSON body of a declined-card answer holds only the keys "error" and "code": no order id and no items.
- **R103.** POST /api/checkout with a card type the payment service does not accept (American Express 378282246310005) answers 422 with code PAYMENT_FAILED.
- **R104.** The answer to a paymentFailure decline does not expose internal text: the body contains neither "Invalid token" nor "loyalty_level".
- **R105.** A declined card writes one frontend log line at info level (pino level 30) with the message "Checkout payment declined".
- **R106.** A declined card writes no "Checkout failed to place order" log line.
- **R107.** The frontend span of a declined POST /api/checkout carries an exception event.
- **R108.** A declined POST /api/checkout also writes an "API request completed" log line with http.response.status_code 422.

### Other checkout failures

- **R9.** When the order fails for a reason other than payment (productCatalogFailure on, ordering product OLJCESPC7Z), POST /api/checkout answers 500.
- **R10.** With the paymentUnreachable flag on, POST /api/checkout answers 500, not 422.
- **R11.** POST /api/checkout with an empty JSON object answers 500 with {"error": "Failed to place order."}.
- **R12.** A non-payment checkout failure writes no "Checkout payment declined" log line.
- **R13.** The frontend span of a non-payment checkout failure has error status.
- **R109.** With productCatalogFailure on, ordering product OLJCESPC7Z answers exactly the JSON body {"error": "Failed to place order."}.
- **R110.** With paymentUnreachable on, the checkout answer has no "code" key.
- **R111.** A non-payment checkout failure writes a frontend log line at error level (pino level 50) with the message "Checkout failed to place order" and an "err" field.
- **R112.** The "Checkout failed to place order" log record reaches OpenSearch under service.name frontend, with an exception.message attribute.
- **R113.** After a non-payment checkout failure the shopper's cart still holds its items.

### Successful checkout

- **R14.** A successful POST /api/checkout answers 200 with orderId, shippingTrackingId, shippingCost, shippingAddress and items.
- **R15.** The "Order placed successfully" log line has a "demo.order.id" field equal to the orderId in the answer.
- **R16.** A successful checkout writes neither "Checkout payment declined" nor "Checkout failed to place order".
- **R17.** POST /api/checkout?currencyCode=EUR answers item costs and the shipping cost in EUR.
- **R114.** A successful checkout writes one frontend log line at info level with the message "Order placed successfully".
- **R115.** The "Order placed successfully" log record reaches OpenSearch under service.name frontend, with the demo.order.id attribute equal to the orderId.
- **R116.** After a successful checkout the shopper's cart is empty.

### API request logs

- **R18.** GET /api/products writes one frontend log line at info level with the message "API request completed".
- **R19.** url.path on the "API request completed" line leaves out the query string: GET /api/products?currencyCode=USD logs /api/products.
- **R20.** POST /api/cart logs "API request completed" with http.request.method POST and url.path /api/cart.
- **R21.** When an API handler throws (GET /api/shipping with no parameters), the answer is 500 and the frontend logs "API request failed" at error level.
- **R22.** The "API request failed" line for GET /api/shipping has http.request.method GET, url.path /api/shipping and http.response.status_code 500.
- **R117.** The "API request completed" line for GET /api/products has http.request.method GET and http.response.status_code 200.
- **R118.** GET /api/products/OLJCESPC7Z logs url.path /api/products/OLJCESPC7Z.
- **R119.** GET /api/checkout answers 405 and logs "API request completed" with http.response.status_code 405.
- **R120.** The "API request failed" line has an "err" field holding the thrown error.
- **R121.** A handler that throws writes no "API request completed" line for that request.

### Storefront in the browser

- **R23.** In the browser, after a declined card the product is still listed on the cart page.
- **R24.** In the browser, a successful order goes to /cart/checkout/<orderId>, with the orderId from the checkout answer.
- **R25.** The currency switcher lists its options in alphabetical order.
- **R26.** On a first visit the currency switcher has USD selected, even though USD is not first in the list.
- **R122.** In the browser, when a card is declined the page stays on /cart and does not go to a /cart/checkout/ page.
- **R123.** In the browser, after a declined card, entering a valid card number and placing the order again succeeds.
- **R124.** In the browser, with paymentUnreachable on, placing an order answers 500 and the page stays on /cart.
- **R125.** The currency switcher offers exactly the codes GET /api/currency returns, each once.
- **R126.** Choosing EUR in the currency switcher keeps EUR selected on the next page and shows product prices with the euro sign.
