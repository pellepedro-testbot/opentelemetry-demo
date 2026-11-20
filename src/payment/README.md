# Payment Service

This service is responsible for processing and validating payments through the
application.

## Accepted cards

The service accepts the card networks listed in `card-networks.js`:

| Network          | Number starts with              | Length     |
|------------------|---------------------------------|------------|
| Visa             | 4                               | 13, 16, 19 |
| Mastercard       | 51-55, 2221-2720                | 16         |
| American Express | 34, 37                          | 15         |
| Discover         | 6011, 644-649, 65               | 16, 19     |

Spaces and dashes in the card number are ignored. A card from any other
network is declined with a message that lists the accepted networks.

## Telemetry

Each charge records these attributes on its spans:

| Attribute                   | Example    |
|-----------------------------|------------|
| `demo.payment.amount`       | `489.02`   |
| `demo.payment.currency`     | `USD`      |
| `demo.payment.card_network` | `amex`     |
| `demo.payment.outcome`      | `approved` |

and the span events `charge.received`, `card.identified`, `card.validated`
and `charge.approved` or `charge.declined`.

## Local Build

Copy the `demo.proto` file to this directory and run `npm ci`

## Docker Build

From the root directory, run:

```sh
docker compose build payment
```
