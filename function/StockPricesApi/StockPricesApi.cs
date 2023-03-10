using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
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
        [OpenApiResponseWithBody(statusCode: HttpStatusCode.OK, contentType: "application/json", bodyType: typeof(Quote), Description = "The stock quote")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "stockPrices/{stockSymbol}")] HttpRequest req, string stockSymbol)
        {
            _logger.LogInformation("C# HTTP trigger function processed a request.");
            _logger.LogInformation($"Requested stock symbol: {stockSymbol}");

            var db = _redisCache.GetDatabase();
            var json = await db.StringGetAsync($"StockPrice-{stockSymbol}");

            Quote stockQuote;

            if (string.IsNullOrEmpty(json))
            {
                _logger.LogInformation($"Stock price for {stockSymbol} not available in cache, getting a fresh value");
                HttpClient client = new HttpClient();
                var stock = await client.GetFromJsonAsync<StockPrice>($"https://query1.finance.yahoo.com/v7/finance/options/{stockSymbol}");
                if (stock.optionChain.result.Length > 0)
                {
                    stockQuote = stock.optionChain.result[0].quote;
                    var stockQuoteJson = JsonConvert.SerializeObject(stockQuote);
                    int cacheExpireInHours = _configuration.GetValue<int>("CacheExpirationInHours");
                    await db.StringSetAsync($"StockPrice-{stockSymbol}", stockQuoteJson, TimeSpan.FromHours(cacheExpireInHours));
                    _logger.LogInformation($"Json saved into in Redis: {stockQuoteJson}");
                }
                else
                {
                    stockQuote = null;
                }
            }
            else
            {
                stockQuote = JsonConvert.DeserializeObject<Quote>(json);
                _logger.LogInformation($"Stock price for {stockSymbol} retrieved from Redis cache");
                _logger.LogInformation($"Json read from Redis: {json}");
            }



            return stockQuote != null ? new OkObjectResult(stockQuote) : new NotFoundResult();

        }
    }
}

