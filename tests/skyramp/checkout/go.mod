module github.com/opentelemetry/opentelemetry-demo/tests/skyramp/checkout

go 1.26.0

replace github.com/opentelemetry/opentelemetry-demo/src/product-catalog => ../../../src/product-catalog

require (
	github.com/lib/pq v1.12.3
	github.com/opentelemetry/opentelemetry-demo/src/product-catalog v0.0.0-00010101000000-000000000000
	google.golang.org/grpc v1.84.0
)

require (
	golang.org/x/net v0.59.0 // indirect
	golang.org/x/sys v0.48.0 // indirect
	golang.org/x/text v0.42.0 // indirect
	google.golang.org/genproto/googleapis/rpc v0.0.0-20260825221802-da73d73af1c5 // indirect
	google.golang.org/protobuf v1.36.12 // indirect
)
