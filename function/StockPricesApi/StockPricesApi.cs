using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text.Json;
using System.Threading.Tasks;
using AlphaVantage.Net.Common;
using AlphaVantage.Net.Common.Intervals;
using AlphaVantage.Net.Common.Size;
using AlphaVantage.Net.Core.Client;
using AlphaVantage.Net.Stocks;
using AlphaVantage.Net.Stocks.Client;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Extensions.OpenApi.Core.Attributes;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json;
using StackExchange.Redis;
using StockPricesApi.Models;
using static System.Net.WebRequestMethods;

namespace StockPricesApi
{
    public class StockPricesApi
    {
        private readonly ILogger<StockPricesApi> _logger;
        private readonly IConnectionMultiplexer _redisCache;
        private readonly IConfiguration _configuration;

        public StockPricesApi(ILogger<StockPricesApi> log, IConnectionMultiplexer redisCache, IConfiguration configuration)
        {
            _logger = log;
            _redisCache = redisCache;
            _configuration = configuration;
        }

        [FunctionName("StockPricesApi")]
        [OpenApiOperation(operationId: "Run", tags: new[] { "name" })]
        [OpenApiParameter(name: "stock", In = ParameterLocation.Path, Required = true, Type = typeof(string), Description = "The **Stock** symbol")]
        [OpenApiResponseWithBody(statusCode: HttpStatusCode.OK, contentType: "application/json", bodyType: typeof(StockPrice), Description = "The stock quote")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "stockPrices/{stockSymbol}")] HttpRequest req, string stockSymbol)
        {
            _logger.LogInformation("C# HTTP trigger function processed a request.");
            _logger.LogInformation($"Requested stock symbol: {stockSymbol}");

            var db = _redisCache.GetDatabase();
            // var json = await db.StringGetAsync($"StockPrice-{stockSymbol}");
            var json = string.Empty;

            StockPrice stockQuote;

            if (string.IsNullOrEmpty(json))
            {
                _logger.LogInformation($"Stock price for {stockSymbol} not available in cache, getting a fresh value");

                string apiKey = "2175NFW0TSAEJGFC";
                // there are 5 more constructors available
                var client = new AlphaVantageClient(apiKey);
                var stocksClient = client.Stocks();

                StockTimeSeries stock = await stocksClient.GetTimeSeriesAsync("MSFT", Interval.Min60, OutputSize.Compact, isAdjusted: true);

                var query = new Dictionary<string, string>()
                {
                    {"symbol", stockSymbol }
                };

                JsonDocument company = await client.RequestParsedJsonAsync(ApiFunction.OVERVIEW, query);


                stockQuote = new StockPrice {
                    OpeningPrice = stock.DataPoints.FirstOrDefault().OpeningPrice,
                    ClosingPrice = stock.DataPoints.FirstOrDefault().ClosingPrice,
                    HighestPrice = stock.DataPoints.FirstOrDefault().HighestPrice,
                    LowestPrice = stock.DataPoints.FirstOrDefault().LowestPrice,
                    Time = stock.DataPoints.FirstOrDefault().Time,
                    Volume = stock.DataPoints.FirstOrDefault().Volume,
                    CompanyName = company.RootElement.GetProperty("Name").GetString(),
                    Exchange = company.RootElement.GetProperty("Exchange").GetString(),
                    Symbol = company.RootElement.GetProperty("Symbol").GetString()
                };

                var stockQuoteJson = JsonConvert.SerializeObject(stockQuote);
                int cacheExpireInHours = _configuration.GetValue<int>("CacheExpirationInHours");
                await db.StringSetAsync($"StockPrice-{stockSymbol}", stockQuoteJson, TimeSpan.FromHours(cacheExpireInHours));
                _logger.LogInformation($"Json saved into in Redis: {stockQuoteJson}");
            }
            else
            {
                stockQuote = JsonConvert.DeserializeObject<StockPrice>(json);
                _logger.LogInformation($"Stock price for {stockSymbol} retrieved from Redis cache");
                _logger.LogInformation($"Json read from Redis: {json}");
            }

            return stockQuote != null ? new OkObjectResult(stockQuote) : new NotFoundResult();

        }
    }
}

