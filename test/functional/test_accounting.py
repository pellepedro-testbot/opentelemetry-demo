# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

"""How accounting stores the orders it consumes from Kafka, and how it reports failures."""

import base64
import time

import pytest

from backends import poll_until
from containers import docker, logs_since, psql
from demo_grpc import pb
from storefront import CLEANING_KIT, EXPLORASCOPE, place_order

KAFKA_TOPIC = "orders"

# Publishes ORDER_B64 to the orders topic from a container on the demo network.
PRODUCER = """
import base64, os
from kafka import KafkaProducer
producer = KafkaProducer(bootstrap_servers="kafka:9092")
producer.send("orders", base64.b64decode(os.environ["ORDER_B64"])).get(timeout=30)
producer.flush()
"""


def stored_rows(order_id):
    """(order rows, item rows, shipping rows) accounting holds for an order."""
    return (
        psql(f"SELECT order_id FROM accounting.\"order\" WHERE order_id = '{order_id}'"),
        psql(
            "SELECT product_id, quantity, item_cost_currency_code, item_cost_units, item_cost_nanos"
            f" FROM accounting.orderitem WHERE order_id = '{order_id}' ORDER BY product_id"
        ),
        psql(
            "SELECT shipping_tracking_id, street_address, city, state, country, zip_code"
            f" FROM accounting.shipping WHERE order_id = '{order_id}'"
        ),
    )


def wait_stored(order_id):
    return poll_until(
        lambda: stored_rows(order_id) if stored_rows(order_id)[0] else None,
        f"accounting rows for order {order_id}",
        timeout=30,
        interval=2,
    )


def as_order_result(order):
    """The OrderResult protobuf checkout published for an order response."""
    def money(m):
        return pb.Money(currency_code=m["currencyCode"], units=int(m.get("units", 0)), nanos=m.get("nanos", 0))

    address = order["shippingAddress"]
    return pb.OrderResult(
        order_id=order["orderId"],
        shipping_tracking_id=order["shippingTrackingId"],
        shipping_cost=money(order["shippingCost"]),
        shipping_address=pb.Address(
            street_address=address["streetAddress"], city=address["city"], state=address["state"],
            country=address["country"], zip_code=address["zipCode"],
        ),
        items=[
            pb.OrderItem(
                item=pb.CartItem(product_id=line["item"]["productId"], quantity=line["item"]["quantity"]),
                cost=money(line["cost"]),
            )
            for line in order["items"]
        ],
    )


def produce_raw(value):
    docker(
        "exec", "-i", "kafka", "/opt/kafka/bin/kafka-console-producer.sh",
        "--bootstrap-server", "kafka:9092", "--topic", KAFKA_TOPIC, input=value,
    )


def produce_order(order_result):
    docker(
        "run", "--rm", "--network", "opentelemetry-demo",
        "-e", "ORDER_B64=" + base64.b64encode(order_result.SerializeToString()).decode(),
        "--entrypoint", "sh", "ghcr.io/open-telemetry/demo:3.1.0-recommendation",
        "-c", f"pip install -q kafka-python==2.2.15 >/dev/null 2>&1 && python -c '{PRODUCER}'",
    )


def test_r10a_order_items_and_shipping_are_stored():
    order = place_order({CLEANING_KIT: 2, EXPLORASCOPE: 1})
    orders, items, shipping = wait_stored(order["orderId"])
    assert len(orders) == 1
    expected_items = sorted(
        [
            line["item"]["productId"], str(line["item"]["quantity"]), line["cost"]["currencyCode"],
            str(line["cost"].get("units", 0)), str(line["cost"].get("nanos", 0)),
        ]
        for line in order["items"]
    )
    assert items == expected_items
    address = order["shippingAddress"]
    assert shipping == [[
        order["shippingTrackingId"], address["streetAddress"], address["city"], address["state"],
        address["country"], address["zipCode"],
    ]]


def test_r10b_log_lines_carry_order_id_and_item_count():
    since = time.time()
    order = place_order({CLEANING_KIT: 1, EXPLORASCOPE: 1})
    order_id = order["orderId"]
    wait_stored(order_id)
    poll_until(
        lambda: any(f"Order {order_id} stored with 2 items." in line for line in logs_since("accounting", since)),
        f"stored log line for {order_id}", timeout=30, interval=2,
    )
    lines = logs_since("accounting", since)
    assert any(f"Order {order_id} received with 2 items." in line for line in lines)
    assert not any("Order details:" in line for line in lines)


@pytest.mark.timeout(240)
def test_r10c_failures_are_logged_once_and_the_consumer_keeps_working():
    order = place_order({EXPLORASCOPE: 1})
    order_id = order["orderId"]
    stored = wait_stored(order_id)

    since = time.time()
    produce_raw("not-an-order\n")
    poll_until(
        lambda: any("Order parsing failed: unknown" in line for line in logs_since("accounting", since)),
        "failure log for an unparseable message", timeout=30, interval=2,
    )

    produce_order(as_order_result(order))
    poll_until(
        lambda: any(f"Order parsing failed: {order_id}" in line for line in logs_since("accounting", since)),
        f"failure log for the duplicate of {order_id}", timeout=60, interval=2,
    )
    lines = logs_since("accounting", since)
    assert len([line for line in lines if "Order parsing failed: unknown" in line]) == 1
    assert len([line for line in lines if f"Order parsing failed: {order_id}" in line]) == 1
    assert stored_rows(order_id) == stored

    wait_stored(place_order({CLEANING_KIT: 1})["orderId"])
