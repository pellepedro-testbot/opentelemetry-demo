// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

using Confluent.Kafka;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Oteldemo;
using System.Diagnostics;

namespace Accounting;

internal class Consumer : BackgroundService
{
    private static readonly string TopicName = Environment.GetEnvironmentVariable("KAFKA_TOPIC") ?? "orders";

    private readonly ILogger _logger;
    private readonly IConsumer<string, byte[]> _consumer;
    private readonly OrderRepository? _repository;
    private static readonly ActivitySource MyActivitySource = new("Accounting.Consumer");

    public Consumer(ILogger<Consumer> logger)
    {
        _logger = logger;

        var servers = Environment.GetEnvironmentVariable("KAFKA_ADDR")
            ?? throw new InvalidOperationException("The KAFKA_ADDR environment variable is not set.");

        _consumer = BuildConsumer(servers);
        _consumer.Subscribe(TopicName);

        Log.KafkaConnecting(_logger, servers);

        var dbConnectionString = Environment.GetEnvironmentVariable("DB_CONNECTION_STRING");
        _repository = dbConnectionString == null ? null : new OrderRepository(dbConnectionString);
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        await Task.Yield();

        try
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    using var activity = MyActivitySource.StartActivity("order-consumed",  ActivityKind.Internal);
                    var consumeResult = _consumer.Consume(stoppingToken);
                    ProcessMessage(consumeResult.Message);
                }
                catch (ConsumeException e)
                {
                    Log.ConsumeError(_logger, e, e.Error.Reason);
                }
            }
        }
        catch (OperationCanceledException) when (stoppingToken.IsCancellationRequested)
        {
        }
        finally
        {
            Log.ConsumerClosing(_logger);
            _consumer.Close();
        }
    }

    private void ProcessMessage(Message<string, byte[]> message)
    {
        string? orderId = null;
        try
        {
            var order = OrderResult.Parser.ParseFrom(message.Value);
            orderId = order.OrderId;
            Log.OrderReceived(_logger, order.OrderId, order.Items.Count);

            if (_repository == null)
            {
                return;
            }

            _repository.Save(order);
            Log.OrderStored(_logger, order.OrderId, order.Items.Count);
        }
        catch (Exception ex)
        {
            HandleFailure(ex, orderId);
        }
    }

    // Every failure while handling an order message is reported here, the same
    // way: on the consume span and in one error log line with the order id.
    private void HandleFailure(Exception ex, string? orderId)
    {
        Activity.Current?.AddException(ex);
        Activity.Current?.SetStatus(ActivityStatusCode.Error, ex.Message);
        Log.OrderParsingFailed(_logger, ex, orderId ?? "unknown");
    }

    private static IConsumer<string, byte[]> BuildConsumer(string servers)
    {
        var conf = new ConsumerConfig
        {
            GroupId = "accounting",
            BootstrapServers = servers,
            // https://github.com/confluentinc/confluent-kafka-dotnet/tree/07de95ed647af80a0db39ce6a8891a630423b952#basic-consumer-example
            AutoOffsetReset = AutoOffsetReset.Earliest,
            EnableAutoCommit = true
        };

        return new ConsumerBuilder<string, byte[]>(conf)
            .Build();
    }

    public override void Dispose()
    {
        _consumer?.Dispose();
        base.Dispose();
    }
}
