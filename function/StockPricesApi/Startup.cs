using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection;
using StackExchange.Redis;

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
    }
}
