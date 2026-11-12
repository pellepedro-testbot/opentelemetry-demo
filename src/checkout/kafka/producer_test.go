// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0
package kafka

import "testing"

func TestTopicDefaultsToOrdersWhenKafkaTopicIsEmpty(t *testing.T) {
	t.Setenv("KAFKA_TOPIC", "")

	if got := getTopic(); got != "orders" {
		t.Fatalf("getTopic() = %q, want %q", got, "orders")
	}
}

func TestTopicIsReadFromKafkaTopic(t *testing.T) {
	for _, topic := range []string{"custom", "orders-test"} {
		t.Setenv("KAFKA_TOPIC", topic)

		if got := getTopic(); got != topic {
			t.Fatalf("getTopic() = %q, want %q", got, topic)
		}
	}
}
