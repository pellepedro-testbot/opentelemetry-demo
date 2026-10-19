// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

using Microsoft.EntityFrameworkCore;
using Oteldemo;

namespace Accounting;

internal class DBContext : DbContext
{
    private readonly string _connectionString;

    public DBContext(string connectionString)
    {
        _connectionString = connectionString;
    }

    public DbSet<OrderEntity> Orders { get; set; }
    public DbSet<OrderItemEntity> CartItems { get; set; }
    public DbSet<ShippingEntity> Shipping { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql(_connectionString).UseSnakeCaseNamingConvention();
    }
}

/// <summary>
/// Stores orders in the accounting schema. An order, its items and its shipping
/// are written in one transaction, so a failure never leaves part of an order behind.
/// </summary>
internal sealed class OrderRepository
{
    private readonly string _connectionString;

    public OrderRepository(string connectionString)
    {
        _connectionString = connectionString;
    }

    public void Save(OrderResult order)
    {
        using var dbContext = new DBContext(_connectionString);
        using var transaction = dbContext.Database.BeginTransaction();

        dbContext.Add(ToOrderEntity(order));
        dbContext.AddRange(order.Items.Select(item => ToOrderItemEntity(order.OrderId, item)));
        dbContext.Add(ToShippingEntity(order));
        dbContext.SaveChanges();

        transaction.Commit();
    }

    private static OrderEntity ToOrderEntity(OrderResult order) => new()
    {
        Id = order.OrderId
    };

    private static OrderItemEntity ToOrderItemEntity(string orderId, OrderItem item) => new()
    {
        ItemCostCurrencyCode = item.Cost.CurrencyCode,
        ItemCostUnits = item.Cost.Units,
        ItemCostNanos = item.Cost.Nanos,
        ProductId = item.Item.ProductId,
        Quantity = item.Item.Quantity,
        OrderId = orderId
    };

    private static ShippingEntity ToShippingEntity(OrderResult order) => new()
    {
        ShippingTrackingId = order.ShippingTrackingId,
        ShippingCostCurrencyCode = order.ShippingCost.CurrencyCode,
        ShippingCostUnits = order.ShippingCost.Units,
        ShippingCostNanos = order.ShippingCost.Nanos,
        StreetAddress = order.ShippingAddress.StreetAddress,
        City = order.ShippingAddress.City,
        State = order.ShippingAddress.State,
        Country = order.ShippingAddress.Country,
        ZipCode = order.ShippingAddress.ZipCode,
        OrderId = order.OrderId
    };
}
