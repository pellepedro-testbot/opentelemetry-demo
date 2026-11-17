// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Threading.Tasks;
using cart.cartstore;
using Grpc.Core;
using Microsoft.Extensions.Logging;
using Xunit;

namespace cart.tests;

public class ValkeyCartStoreLogTests
{
    private sealed record LogEntry(EventId EventId, IReadOnlyDictionary<string, object> State);

    private sealed class CapturingLogger : ILogger<ValkeyCartStore>
    {
        public ConcurrentQueue<LogEntry> Entries { get; } = new();

        public IDisposable BeginScope<TState>(TState state) where TState : notnull => null;

        public bool IsEnabled(LogLevel logLevel) => true;

        public void Log<TState>(LogLevel logLevel, EventId eventId, TState state, Exception exception, Func<TState, Exception, string> formatter)
        {
            var fields = new Dictionary<string, object>();
            if (state is IEnumerable<KeyValuePair<string, object>> pairs)
            {
                foreach (var pair in pairs)
                {
                    fields[pair.Key] = pair.Value;
                }
            }
            Entries.Enqueue(new LogEntry(eventId, fields));
        }
    }

    [Fact]
    public async Task AddItem_LogRecord_CarriesUserIdAndProductIdInTheirOwnFields()
    {
        var logger = new CapturingLogger();
        var store = new ValkeyCartStore(logger, "localhost:1,connectTimeout=100");

        try
        {
            await store.AddItemAsync("user-1", "prod-1", 2);
        }
        catch (RpcException)
        {
            // The store is unreachable on purpose; only the log record matters here.
        }

        var record = Assert.Single(logger.Entries, e => e.EventId.Name == "cart.add_item");
        Assert.Equal("user-1", record.State["userId"]);
        Assert.Equal("prod-1", record.State["productId"]);
        Assert.Equal(2, record.State["quantity"]);
    }
}
