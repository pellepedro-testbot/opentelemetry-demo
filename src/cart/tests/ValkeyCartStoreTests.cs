// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0
using System;
using System.Collections.Concurrent;
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
    private sealed class CapturingLogger : ILogger<ValkeyCartStore>
    {
        public ConcurrentQueue<(EventId EventId, IReadOnlyList<KeyValuePair<string, object>> State)> Entries { get; } = new();

        public IDisposable BeginScope<TState>(TState state) where TState : notnull => null;

        public bool IsEnabled(LogLevel logLevel) => true;

        public void Log<TState>(LogLevel logLevel, EventId eventId, TState state, Exception exception, Func<TState, Exception, string> formatter)
        {
            if (state is IReadOnlyList<KeyValuePair<string, object>> fields)
            {
                Entries.Enqueue((eventId, fields.ToList()));
            }
        }
    }

    [Fact]
    public async Task AddItemAsync_LogsUserIdAndProductIdInTheirOwnFields()
    {
        var logger = new CapturingLogger();
        var store = new ValkeyCartStore(logger, "localhost:1");

        // Nothing listens on localhost:1; the cart.add_item record is written before the store is reached.
        await Assert.ThrowsAsync<RpcException>(() => store.AddItemAsync("user-1", "PROD-1", 2));

        var entry = Assert.Single(logger.Entries, e => e.EventId.Name == "cart.add_item");
        var fields = entry.State.ToDictionary(kv => kv.Key, kv => kv.Value);
        Assert.Equal("user-1", fields["userId"]);
        Assert.Equal("PROD-1", fields["productId"]);
        Assert.Equal(2, fields["quantity"]);
    }
}
