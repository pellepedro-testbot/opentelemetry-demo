// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using cart.cartstore;
using Microsoft.Extensions.Logging;
using Xunit;

namespace cart.tests;

public class ValkeyCartStoreTests
{
    private sealed class CapturingLogger : ILogger<ValkeyCartStore>
    {
        public List<(EventId EventId, IReadOnlyList<KeyValuePair<string, object>> State)> Records { get; } = new();

        public IDisposable BeginScope<TState>(TState state) where TState : notnull => null;

        public bool IsEnabled(LogLevel logLevel) => true;

        public void Log<TState>(LogLevel logLevel, EventId eventId, TState state, Exception exception, Func<TState, Exception, string> formatter)
        {
            var fields = state as IReadOnlyList<KeyValuePair<string, object>> ?? Array.Empty<KeyValuePair<string, object>>();
            lock (Records)
            {
                Records.Add((eventId, fields.ToList()));
            }
        }
    }

    [Fact]
    public async Task AddItem_LogRecordCarriesRequestUserAndProduct()
    {
        var logger = new CapturingLogger();
        var store = new ValkeyCartStore(logger, "localhost:1");

        try
        {
            await store.AddItemAsync("user-1", "product-9", 2);
        }
        catch (Exception)
        {
            // No Valkey listens on localhost:1; the log record is written before the store is reached.
        }

        List<(EventId EventId, IReadOnlyList<KeyValuePair<string, object>> State)> records;
        lock (logger.Records)
        {
            records = logger.Records.ToList();
        }
        var addItem = Assert.Single(records, r => r.EventId.Name == "cart.add_item");
        var fields = addItem.State.ToDictionary(kv => kv.Key, kv => kv.Value);

        Assert.Equal("user-1", fields["userId"]);
        Assert.Equal("product-9", fields["productId"]);
        Assert.Equal(2, fields["quantity"]);
    }
}
