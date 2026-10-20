// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

using Microsoft.Extensions.Logging;

namespace Accounting
{
    internal static partial class Log
    {
        [LoggerMessage(
            Level = LogLevel.Information,
            EventName = "accounting.order.received",
            Message = "Order {orderId} received with {itemCount} items.")]
        public static partial void OrderReceived(ILogger logger, string orderId, int itemCount);

        [LoggerMessage(
            Level = LogLevel.Information,
            EventName = "accounting.order.stored",
            Message = "Order {orderId} stored with {itemCount} items.")]
        public static partial void OrderStored(ILogger logger, string orderId, int itemCount);

        [LoggerMessage(
            Level = LogLevel.Information,
            EventName = "accounting.kafka.connecting",
            Message = "Connecting to Kafka: {servers}")]
        public static partial void KafkaConnecting(ILogger logger, string servers);

        [LoggerMessage(
            Level = LogLevel.Error,
            EventName = "accounting.kafka.consume_failed",
            Message = "Consume error: {reason}")]
        public static partial void ConsumeError(ILogger logger, Exception exception, string reason);

        [LoggerMessage(
            Level = LogLevel.Information,
            EventName = "accounting.consumer.started",
            Message = "Consuming {topic} as group {groupId}")]
        public static partial void ConsumerStarted(ILogger logger, string topic, string groupId);

        [LoggerMessage(
            Level = LogLevel.Information,
            EventName = "accounting.consumer.stopping",
            Message = "Stopping consumer after {ordersProcessed} orders")]
        public static partial void ConsumerStopping(ILogger logger, long ordersProcessed);

        [LoggerMessage(
            Level = LogLevel.Information,
            EventName = "accounting.consumer.stopped",
            Message = "Consumer stopped after {ordersProcessed} orders")]
        public static partial void ConsumerStopped(ILogger logger, long ordersProcessed);

        [LoggerMessage(
            Level = LogLevel.Information,
            EventName = "accounting.order.duplicate_skipped",
            Message = "Duplicate order {orderId} received, skipping.")]
        public static partial void DuplicateOrderSkipped(ILogger logger, string orderId);

        [LoggerMessage(
            Level = LogLevel.Error,
            EventName = "accounting.order.parsing_failed",
            Message = "Order parsing failed: {orderId}")]
        public static partial void OrderParsingFailed(ILogger logger, Exception exception, string orderId);
    }
}
