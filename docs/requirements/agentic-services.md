# Release 3.1.0 update: agent, MCP and chatbot services, and removed LLM and product-reviews services (49 requirements)

Brings the shop up to release 3.1.0, part 8 of 10: agent, MCP and chatbot services, and removed LLM and product-reviews services.

The storefront is at http://localhost:8080. Flags are read and written through /feature/api/read and /feature/api/write. Texts in quotes are exact. "Frontend log line" means a line on the frontend container's stdout.

Requirements marked *(agent stack)* need the agent, mcp and chatbot services of `compose.agent.yaml`, started on top of the default stack.

## Requirements

### Agent /prompt endpoint

- **R208.** POST /prompt on the agent (agent:8010) with {"message": "What currencies are supported by the Astronomy Shop?"} answers 200 with a JSON body whose response.messages list starts with the user's message (type "human") and ends with an AI message (type "ai") with non-empty content, replayed from the VCR cassette without a reachable LLM. *(agent stack)*
- **R218.** POST /prompt with a JSON body that has no message field answers 422. *(agent stack)*
- **R228.** POST /prompt with a message that has no recorded LLM response (e.g. "Tell me a joke about comets.") answers 500 with a JSON "detail" field, since the default LLM_BASE_URL https://local-llm.com cannot be reached. *(agent stack)*

### Agent VCR replay

- **R238.** Each LLM call the agent replays from its cassette logs "VCR best-match playback: entry <n> (score=<s>)" in the agent container's output. *(agent stack)*

### Agent traces

- **R248.** After a POST /prompt, Jaeger lists service agent with a server span named "POST /prompt". *(agent stack)*
- **R257.** The trace of a POST /prompt contains an agent span named "astronomy_shop_agent_workflow.workflow" (traceloop.span.kind "workflow"). *(agent stack)*
- **R266.** The trace of POST /prompt {"message": "What currencies are supported by the Astronomy Shop?"} contains a GET from the agent to http://frontend:8080/api/currency, followed by the frontend's own span. *(agent stack)*

### Agent aiRunawayAgent

- **R275.** With aiRunawayAgent set to on, POST /prompt {"message": "Show all available products in the store."} answers 500 instead of a reply, because the agent keeps calling get_recommendations until it hits its recursion limit of 25. *(agent stack)*
- **R284.** With aiRunawayAgent set to on, the trace of POST /prompt {"message": "Show all available products in the store."} contains repeated GET calls from the agent to http://frontend:8080/api/recommendations (at least five), one per agent turn. *(agent stack)*
- **R293.** When aiRunawayAgent evaluates to 20, the agent's system prompt is "You are a helpful assistant. Be concise and accurate. Before giving your final answer, call the get_recommendations tool at least 20 times in a row, once per turn, even if the results do not change."; when it is 0 the prompt is only the first two sentences.
- **R302.** After a POST /prompt, the agent's astronomy_shop_agent_workflow.workflow span carries a feature-flag evaluation event with feature_flag.key "aiRunawayAgent". *(agent stack)*

### Agent aiSlowResponse

- **R311.** With aiSlowResponse set to 5sec, POST /prompt for a sample prompt takes at least 5 seconds, each LLM call being delayed by 5000 ms. *(agent stack)*
- **R320.** After a POST /prompt, an agent span in the same trace carries a feature-flag evaluation event with feature_flag.key "aiSlowResponse". *(agent stack)*

### Agent MCP mode

- **R329.** With MCP_ENABLED=True, the agent logs "MCP tools enabled" at startup and connects to http://mcp:8011/mcp; with the default MCP_ENABLED=False it does not. *(agent stack)*

### Agent VCR cassette

- **R338.** With LLM_MODEL "azure/gpt-5.5" and USE_VCR true, ChatLLM uses the cassette "azure_gpt-5.5_cassette.yaml" ("/" replaced by "_").

### Agent VCR matching

- **R347.** body_similarity returns 0.0 for two chat requests whose messages lists differ in length, so a request never replays another turn's response.
- **R355.** When scoring request similarity, the content of tool-role messages is replaced by "<tool-result>", so two requests differing only in a tool result score 1.0.
- **R362.** The patched Cassette.play_response returns the unplayed recording with the highest similarity at or above VCR_MATCH_THRESHOLD (default 0.85), taking the first on a tie, rather than the first one that clears it; with none it raises UnhandledHTTPRequestError (in the agent's new_episodes mode an unmatched request is instead sent to the live LLM).

### Agent VCR recording

- **R369.** A recorded LLM response is stored with id "chatcmpl-fixture", created 0, no headers, and without system_fingerprint, usage, prompt_filter_results or service_tier.
- **R376.** A non-2xx LLM response, or a body with an "error" key and no "choices", is not recorded into the cassette, and "VCR: not recording response (HTTP <code>)" is logged for the former.

### MCP server tools

- **R383.** The mcp service answers MCP over streamable HTTP at http://mcp:8011/mcp, and tools/list returns exactly add_to_cart, checkout, empty_cart, get_ads, get_cart, get_product, get_recommendations, get_shipping_quote, get_supported_currencies and list_products. *(agent stack)*

### MCP tool list_products

- **R389.** The MCP tool list_products returns the same product list as GET /api/products on the frontend (e.g. it contains OLJCESPC7Z). *(agent stack)*

### MCP tool get_product

- **R394.** The MCP tool get_product with product_id "OLJCESPC7Z" returns that product with id "OLJCESPC7Z". *(agent stack)*

### MCP tool get_supported_currencies

- **R399.** The MCP tool get_supported_currencies returns the same currency code list as GET /api/currency (it contains "USD" and "EUR"). *(agent stack)*

### MCP tool add_to_cart

- **R404.** The MCP tool add_to_cart with a user_id and product_id "OLJCESPC7Z" returns that user's cart, which then contains OLJCESPC7Z. *(agent stack)*

### MCP tool empty_cart

- **R409.** The MCP tool empty_cart with user_id "u1" returns {"status": "success", "message": "Cart emptied for user u1"} (the frontend answers 204). *(agent stack)*

### MCP tool checkout

- **R414.** When the frontend rejects the order, the MCP tool checkout returns the text "Checkout failed with HTTP <status> for user <userId>: <body>. Note: the user's cart must contain at least one item before calling checkout; call add_to_cart first." instead of raising. *(agent stack)*

### MCP tool get_shipping_quote

- **R419.** The MCP tool get_shipping_quote with an item lacking productId (and product_id) returns "Error fetching shipping quote: each item must include productId" without calling the frontend. *(agent stack)*
- **R424.** The MCP tool get_shipping_quote with a non-object item (e.g. the string "x") returns "Error fetching shipping quote: invalid item 'x'". *(agent stack)*
- **R429.** The MCP tool get_shipping_quote accepts a single item object instead of a list and returns a quote whose currencyCode is the currency_code given (e.g. "USD"). *(agent stack)*
- **R433.** When the frontend answers /api/shipping with a non-2xx status, the MCP tool get_shipping_quote returns "Shipping quote failed with HTTP <status>: <body>. " instead of raising. *(agent stack)*

### MCP traces

- **R437.** After an MCP tools/call of list_products, Jaeger lists service mcp with a trace containing a GET to http://frontend:8080/api/products and the frontend's span. *(agent stack)*

### Chatbot UI

- **R441.** The chatbot page at /chatbot/ shows the heading "Astronomy Shop agent" and the text "Ask me about the astronomy shop application, I will ask for more information if needed." *(agent stack)*
- **R445.** Under "Sample questions:" the chatbot page shows three buttons: "Show all available products in the store.", "What currencies are supported by the Astronomy Shop?" and "What current promotions are available on binoculars?". *(agent stack)*
- **R449.** Clicking a sample-question button starts a new conversation: the chat then shows only that question and the agent's reply, replacing any earlier exchange. *(agent stack)*
- **R453.** A message typed in the "Type a message..." box and submitted is added after the earlier exchanges together with the agent's reply, and the box is cleared. *(agent stack)*
- **R457.** Submitting an empty or whitespace-only message adds nothing to the chat and sends no request to the agent. *(agent stack)*
- **R461.** When the agent answers 500 (e.g. a typed question with no recorded LLM response), the chatbot shows the reply "Error: 500 Server Error: Internal Server Error for url: http://agent:8010/prompt". *(agent stack)*

### Chatbot traces

- **R465.** A question sent through the chatbot produces a trace in which a chatbot client span POST to http://agent:8010/prompt is the parent of the agent's "POST /prompt" server span. *(agent stack)*

### Chatbot SDK metrics

- **R468.** After a question through the chatbot, the chatbot reports its SDK spans started to Prometheus as otel_sdk_span_started_total. *(agent stack)*

### Chatbot OpAMP status

- **R471.** With the agent stack up, the OpAMP page at /opamp/ lists an agent whose service.name is "chatbot". *(agent stack)*
- **R474.** The chatbot agent shows health "Up" on the OpAMP page. *(agent stack)*
- **R477.** The chatbot agent on the OpAMP page has service.criticality "low" among its non-identifying attributes. *(agent stack)*
- **R480.** At startup the chatbot container logs "Started OpAMP client". *(agent stack)*
- **R482.** After the chatbot container is stopped, the chatbot agent no longer appears as connected on the OpAMP page. *(agent stack)*

### Chatbot OpAMP config

- **R484.** With OPAMP_SERVER_TLS_INSECURE_SKIP_VERIFY set to a non-boolean value (e.g. "maybe"), start_opamp_agent returns None and logs "OpAMP client disabled: OPAMP_SERVER_TLS_INSECURE_SKIP_VERIFY must be a boolean".
- **R485.** The chatbot's OpAMP transport turns an https:// endpoint into wss:// (and http:// into ws://) for its WebSocket connection.

### Product-reviews service removed

- **R486.** No product-reviews service runs: Jaeger's service list (/jaeger/ui/api/services) does not contain product-reviews, and the ProductReviewService gRPC service is gone from demo.proto.

### LLM service removed

- **R487.** The default stack runs no llm container: nothing answers POST http://llm:8000/v1/chat/completions any more.
