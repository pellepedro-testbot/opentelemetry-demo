// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using cart.cartstore;
using CartServiceImplementation = cart.services.CartService;
using Grpc.Net.Client;
using Oteldemo;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using OpenFeature;
using Xunit;
using static Oteldemo.CartService;

namespace cart.tests;

public class CartServiceTests
{
    private readonly IHostBuilder _host;

    public CartServiceTests()
    {
        _host = new HostBuilder().ConfigureWebHost(webBuilder =>
        {
            webBuilder
                .UseTestServer()
                .ConfigureServices(services =>
                {
                    services.AddGrpc();
                    services.AddSingleton<ICartStore, InMemoryCartStore>();
                    services.AddSingleton<IFeatureClient>(_ => Api.Instance.GetClient());
                    services.AddSingleton<CartServiceImplementation>();
                })
                .Configure(app =>
                {
                    app.UseRouting();
                    app.UseEndpoints(endpoints => endpoints.MapGrpcService<CartServiceImplementation>());
                });
        });
    }

    [Fact]
    public async Task GetItem_NoAddItemBefore_EmptyCartReturned()
    {
        // Setup test server and client
        using var server = await _host.StartAsync();
        var httpClient = server.GetTestClient();

        string userId = Guid.NewGuid().ToString();

        // Create a GRPC communication channel between the client and the server
        var channel = GrpcChannel.ForAddress(httpClient.BaseAddress, new GrpcChannelOptions
        {
            HttpClient = httpClient
        });

        var cartClient = new CartServiceClient(channel);

        var request = new GetCartRequest
        {
            UserId = userId,
        };

        var cart = await cartClient.GetCartAsync(request);
        Assert.NotNull(cart);

        // All grpc objects implement IEquitable, so we can compare equality with by-value semantics
        Assert.Equal(new Cart(), cart);
    }

    [Fact]
    public async Task AddItem_ItemExists_Updated()
    {
        // Setup test server and client
        using var server = await _host.StartAsync();
        var httpClient = server.GetTestClient();

        string userId = Guid.NewGuid().ToString();

        // Create a GRPC communication channel between the client and the server
        var channel = GrpcChannel.ForAddress(httpClient.BaseAddress, new GrpcChannelOptions
        {
            HttpClient = httpClient
        });

        var client = new CartServiceClient(channel);
        var request = new AddItemRequest
        {
            UserId = userId,
            Item = new CartItem
            {
                ProductId = "1",
                Quantity = 1
            }
        };

        // First add - nothing should fail
        await client.AddItemAsync(request);

        // Second add of existing product - quantity should be updated
        await client.AddItemAsync(request);

        var getCartRequest = new GetCartRequest
        {
            UserId = userId
        };
        var cart = await client.GetCartAsync(getCartRequest);
        Assert.NotNull(cart);
        Assert.Equal(userId, cart.UserId);
        Assert.Single(cart.Items);
        Assert.Equal(2, cart.Items[0].Quantity);

        // Cleanup
        await client.EmptyCartAsync(new EmptyCartRequest { UserId = userId });
    }

    [Fact]
    public async Task AddItem_New_Inserted()
    {
        // Setup test server and client
        using var server = await _host.StartAsync();
        var httpClient = server.GetTestClient();

        string userId = Guid.NewGuid().ToString();

        // Create a GRPC communication channel between the client and the server
        var channel = GrpcChannel.ForAddress(httpClient.BaseAddress, new GrpcChannelOptions
        {
            HttpClient = httpClient
        });

        // Create a proxy object to work with the server
        var client = new CartServiceClient(channel);

        var request = new AddItemRequest
        {
            UserId = userId,
            Item = new CartItem
            {
                ProductId = "1",
                Quantity = 1
            }
        };

        await client.AddItemAsync(request);

        var getCartRequest = new GetCartRequest
        {
            UserId = userId
        };
        var cart = await client.GetCartAsync(getCartRequest);
        Assert.NotNull(cart);
        Assert.Equal(userId, cart.UserId);
        Assert.Single(cart.Items);

        await client.EmptyCartAsync(new EmptyCartRequest { UserId = userId });
        cart = await client.GetCartAsync(getCartRequest);
        Assert.Empty(cart.Items);
    }

    [Fact]
    public async Task AddItem_CartFailureFlagFullyOn_ItemStoredInCartStore()
    {
        const string domain = "cart-tests-cart-failure";
        await Api.Instance.SetProviderAsync(domain, new OpenFeature.Providers.Memory.InMemoryProvider(new Dictionary<string, OpenFeature.Providers.Memory.Flag>
        {
            ["cartFailure"] = new OpenFeature.Providers.Memory.Flag<double>(new Dictionary<string, double> { ["100%"] = 1.0 }, "100%"),
        }));
        var featureClient = Api.Instance.GetClient(domain);
        Assert.Equal(1.0, await featureClient.GetDoubleValueAsync("cartFailure", 0));

        var goodStore = new InMemoryCartStore();
        var badStore = new FailingCartStore();
        var host = new HostBuilder().ConfigureWebHost(webBuilder =>
        {
            webBuilder
                .UseTestServer()
                .ConfigureServices(services =>
                {
                    services.AddGrpc();
                    services.AddSingleton(_ => new CartServiceImplementation(goodStore, badStore, featureClient));
                })
                .Configure(app =>
                {
                    app.UseRouting();
                    app.UseEndpoints(endpoints => endpoints.MapGrpcService<CartServiceImplementation>());
                });
        });

        using var server = await host.StartAsync();
        var httpClient = server.GetTestClient();
        var channel = GrpcChannel.ForAddress(httpClient.BaseAddress, new GrpcChannelOptions
        {
            HttpClient = httpClient
        });
        var cartClient = new CartServiceClient(channel);

        string userId = Guid.NewGuid().ToString();
        await cartClient.AddItemAsync(new AddItemRequest
        {
            UserId = userId,
            Item = new CartItem { ProductId = "1", Quantity = 2 }
        });

        var stored = await goodStore.GetCartAsync(userId);
        var item = Assert.Single(stored.Items);
        Assert.Equal("1", item.ProductId);
        Assert.Equal(2, item.Quantity);
    }

    private sealed class FailingCartStore : ICartStore
    {
        private static Exception Failure() =>
            new Grpc.Core.RpcException(new Grpc.Core.Status(Grpc.Core.StatusCode.FailedPrecondition, "bad cart store"));

        public void Initialize() => throw Failure();
        public Task AddItemAsync(string userId, string productId, int quantity) => throw Failure();
        public Task EmptyCartAsync(string userId) => throw Failure();
        public Task<Cart> GetCartAsync(string userId) => throw Failure();
        public bool Ping() => false;
    }

    private sealed class InMemoryCartStore : ICartStore
    {
        private readonly ConcurrentDictionary<string, Cart> _carts = new();

        public void Initialize()
        {
        }

        public Task AddItemAsync(string userId, string productId, int quantity)
        {
            _carts.AddOrUpdate(
                userId,
                new Cart
                {
                    UserId = userId,
                    Items = { new CartItem { ProductId = productId, Quantity = quantity } }
                },
                (_, cart) =>
                {
                    var item = cart.Items.SingleOrDefault(item => item.ProductId == productId);
                    if (item is null)
                    {
                        cart.Items.Add(new CartItem { ProductId = productId, Quantity = quantity });
                    }
                    else
                    {
                        item.Quantity += quantity;
                    }

                    return cart;
                });

            return Task.CompletedTask;
        }

        public Task EmptyCartAsync(string userId)
        {
            _carts[userId] = new Cart();
            return Task.CompletedTask;
        }

        public Task<Cart> GetCartAsync(string userId)
        {
            return Task.FromResult(_carts.TryGetValue(userId, out var cart) ? cart : new Cart());
        }

        public bool Ping()
        {
            return true;
        }
    }
}
