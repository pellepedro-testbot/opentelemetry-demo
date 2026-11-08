# Release 3.1.0 update: AI agent services and the product reviews and LLM removal (0 requirements)

Brings the shop up to release 3.1.0 and adds the storefront, checkout, cart, shipping, payment, currency, recommendation and order-processing changes planned for this release.

The storefront is at http://localhost:8080. Flags are read and written through /feature/api/read and /feature/api/write. Texts in quotes are exact. "Frontend log line" means a line on the frontend container's stdout.

## Requirements

This part lists no requirements. It adds the agent, chatbot and MCP services (they run only with compose.agent.yaml, which the stack these requirements describe does not load) and removes the product-reviews and LLM service sources. The visible effects of the removal on the storefront and on the set of running containers are stated in the files of the parts that hold that code.
