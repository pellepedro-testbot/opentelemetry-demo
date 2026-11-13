// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using cart.cartstore;
using Grpc.Core;
using Microsoft.Extensions.Logging;
using Xunit;

namespace cart.tests;

public class ValkeyCartStoreTests
{
    [Fact]
    public async Task AddItemAsync_LogsUserIdProductIdAndQuantityInTheirOwnFields()
    {
        var logger = new CapturingLogger();
        var store = new ValkeyCartStore(logger, "127.0.0.1:1");

        await Assert.ThrowsAsync<RpcException>(() => store.AddItemAsync("user-1", "prod-9", 2));

        var record = Assert.Single(logger.Records, r => r.EventName == "cart.add_item");
        Assert.Equal("user-1", record.State["userId"]);
        Assert.Equal("prod-9", record.State["productId"]);
        Assert.Equal(2, record.State["quantity"]);
        Assert.Equal("AddItemAsync called with userId=user-1, productId=prod-9, quantity=2", record.Message);
    }

    private sealed record LogRecord(string EventName, string Message, IReadOnlyDictionary<string, object> State);

    private sealed class CapturingLogger : ILogger<ValkeyCartStore>
    {
        public List<LogRecord> Records { get; } = new();

        public IDisposable BeginScope<TState>(TState state) where TState : notnull => null;

        public bool IsEnabled(LogLevel logLevel) => true;

        public void Log<TState>(LogLevel logLevel, EventId eventId, TState state, Exception exception, Func<TState, Exception, string> formatter)
        {
            var fields = state is IEnumerable<KeyValuePair<string, object>> pairs
                ? pairs.ToDictionary(p => p.Key, p => p.Value)
                : new Dictionary<string, object>();
            Records.Add(new LogRecord(eventId.Name, formatter(state, exception), fields));
        }
    }
}
