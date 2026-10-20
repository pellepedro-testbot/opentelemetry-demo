// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

using Confluent.Kafka;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Oteldemo;
using System.Diagnostics;

namespace Accounting;

// Runs the order consumer for the lifetime of the host: StartAsync starts the
// consume loop on its own thread, StopAsync cancels it and waits for the
// message in flight to finish.
internal sealed class Consumer : IHostedService, IDisposable
{
    private static readonly string TopicName = Environment.GetEnvironmentVariable("KAFKA_TOPIC") ?? "orders";
    private const string GroupId = "accounting";

    private readonly ILogger _logger;
    private readonly ConsumerHealth _health;
    private readonly IConsumer<string, byte[]> _consumer;
    private readonly OrderRepository? _repository;
    private readonly CancellationTokenSource _stopping = new();
    private Task? _loop;
    private static readonly ActivitySource MyActivitySource = new("Accounting.Consumer");

    public Consumer(ILogger<Consumer> logger, ConsumerHealth health)
    {
        _logger = logger;
        _health = health;

        var servers = Environment.GetEnvironmentVariable("KAFKA_ADDR")
            ?? throw new InvalidOperationException("The KAFKA_ADDR environment variable is not set.");

        _consumer = BuildConsumer(servers);
        _consumer.Subscribe(TopicName);

        Log.KafkaConnecting(_logger, servers);

        var dbConnectionString = Environment.GetEnvironmentVariable("DB_CONNECTION_STRING");
        _repository = dbConnectionString == null ? null : new OrderRepository(dbConnectionString);
    }

    public Task StartAsync(CancellationToken cancellationToken)
    {
        // Consume blocks, so the loop gets a thread of its own instead of a pool thread.
        _loop = Task.Factory.StartNew(() => ConsumeLoop(_stopping.Token),
            CancellationToken.None, TaskCreationOptions.LongRunning, TaskScheduler.Default);
        Log.ConsumerStarted(_logger, TopicName, GroupId);
        return Task.CompletedTask;
    }

    public async Task StopAsync(CancellationToken cancellationToken)
    {
        if (_loop == null)
        {
            return;
        }

        Log.ConsumerStopping(_logger, _health.OrdersProcessed);
        _stopping.Cancel();

        // Wait for the order in flight, but never longer than the host allows for shutdown.
        await Task.WhenAny(_loop, Task.Delay(Timeout.Infinite, cancellationToken)).ConfigureAwait(false);
        _health.MarkStopped();
        Log.ConsumerStopped(_logger, _health.OrdersProcessed);
    }

    private void ConsumeLoop(CancellationToken stoppingToken)
    {
        _health.MarkConsuming();
        try
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    using var activity = MyActivitySource.StartActivity("order-consumed",  ActivityKind.Internal);
                    var consumeResult = _consumer.Consume(stoppingToken);
                    ProcessMessage(consumeResult.Message);
                    _health.RecordMessage();
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
            GroupId = GroupId,
            BootstrapServers = servers,
            // https://github.com/confluentinc/confluent-kafka-dotnet/tree/07de95ed647af80a0db39ce6a8891a630423b952#basic-consumer-example
            AutoOffsetReset = AutoOffsetReset.Earliest,
            EnableAutoCommit = true
        };

        return new ConsumerBuilder<string, byte[]>(conf)
            .Build();
    }

    public void Dispose()
    {
        _consumer.Dispose();
        _stopping.Dispose();
    }
}
