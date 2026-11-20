# Release 3.1.0 update: telemetry tests, React Native app and release notes (4 requirements)

Brings the shop up to release 3.1.0, part 10 of 10: telemetry tests, React Native app and release notes.

The storefront is at http://localhost:8080. Flags are read and written through /feature/api/read and /feature/api/write. Texts in quotes are exact. "Frontend log line" means a line on the frontend container's stdout.

## Requirements

### React Native app

- **R210.** In the React Native app, when the checkout request throws (network failure or a non-JSON response body), the Cart screen shows an error toast "Order failed" / "Something went wrong. Please try again." and stays on the cart.
- **R220.** The React Native checkout form has required City and State fields, and the order it places carries the entered city and state in its address.
- **R230.** The React Native product list shows prices with nanos as billionths: the National Park Foundation Explorascope (units 101, nanos 960000000) shows 101.96, not 110.60.
- **R240.** Spans exported by the React Native app carry resource attribute device.id set to the device's unique id (react-native-device-info getUniqueIdSync), not the device model id.
