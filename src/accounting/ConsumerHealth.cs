// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

namespace Accounting;

// Tracks whether the order consumer is running, so the container health check
// and the logs can tell a stopped consumer apart from a quiet topic.
internal sealed class ConsumerHealth
{
    private static readonly string HealthFile =
        Environment.GetEnvironmentVariable("ACCOUNTING_HEALTH_FILE") ?? "/tmp/accounting-consuming";

    private long _ordersProcessed;
    private long _lastMessageTicks;

    public bool IsConsuming { get; private set; }

    public long OrdersProcessed => Interlocked.Read(ref _ordersProcessed);

    public DateTimeOffset? LastMessageAt
    {
        get
        {
            var ticks = Interlocked.Read(ref _lastMessageTicks);
            return ticks == 0 ? null : new DateTimeOffset(ticks, TimeSpan.Zero);
        }
    }

    public void MarkConsuming()
    {
        IsConsuming = true;
        TryWriteHealthFile();
    }

    public void MarkStopped()
    {
        IsConsuming = false;
        TryDeleteHealthFile();
    }

    public void RecordMessage()
    {
        Interlocked.Increment(ref _ordersProcessed);
        Interlocked.Exchange(ref _lastMessageTicks, DateTimeOffset.UtcNow.UtcTicks);
    }

    private static void TryWriteHealthFile()
    {
        try
        {
            File.WriteAllText(HealthFile, DateTimeOffset.UtcNow.ToString("O"));
        }
        catch (IOException)
        {
            // The health file is a convenience for the container probe; the consumer runs without it.
        }
        catch (UnauthorizedAccessException)
        {
        }
    }

    private static void TryDeleteHealthFile()
    {
        try
        {
            File.Delete(HealthFile);
        }
        catch (IOException)
        {
        }
        catch (UnauthorizedAccessException)
        {
        }
    }
}
