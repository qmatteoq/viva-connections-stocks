using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using StackExchange.Redis;
using System;
using System.Reflection;

[assembly: FunctionsStartup(typeof(StockPricesApi.Startup))]

namespace StockPricesApi
{
    public class Startup: FunctionsStartup
    {
        public override void Configure(IFunctionsHostBuilder builder)
        {
            var connection = builder.GetContext().Configuration["CacheConnection"];
            var muxer = ConnectionMultiplexer.Connect(connection);
            builder.Services.AddSingleton<IConnectionMultiplexer>(muxer);
        }

        public override void ConfigureAppConfiguration(IFunctionsConfigurationBuilder builder)
        {
            builder.ConfigurationBuilder
                   .SetBasePath(Environment.CurrentDirectory)
                   .AddJsonFile("local.settings.json", true)
                   .AddUserSecrets(Assembly.GetExecutingAssembly(), true)
                   .AddEnvironmentVariables()
                   .Build();
        }
    }
}
