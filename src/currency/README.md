# Currency Service

The Currency Service does the conversion from one currency to another.
It is a C++ based service.

## Building docker image

To build the currency service, run the following from root directory
of opentelemetry-demo

```sh
docker compose build currency
```

## Telemetry export

Spans and log records are exported as soon as they end, so a conversion shows
up in Jaeger and in the log backend right away. Set
`CURRENCY_TELEMETRY_EXPORT=batch` to collect them and export in batches
instead. The service prints the mode it uses at startup.

## Run the service

Execute the below command to run the service.

```sh
docker compose up currency
```

## Run the client

currencyclient is a sample client which sends some request to currency
service. To run the client, execute the below command.

```sh
docker exec -it <container_name> currencyclient 7000
```

`7000` is port where currency listens to.
