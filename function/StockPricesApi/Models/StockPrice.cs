namespace StockPricesApi.Models
{
    public class StockPrice
    {
        public Optionchain optionChain { get; set; }
    }

    public class Optionchain
    {
        public Result[] result { get; set; }
        public object error { get; set; }
    }

    public class Result
    {
        public string underlyingSymbol { get; set; }
        public object[] expirationDates { get; set; }
        public object[] strikes { get; set; }
        public bool hasMiniOptions { get; set; }
        public Quote quote { get; set; }
        public object[] options { get; set; }
    }

    public class Quote
    {
        public string language { get; set; }
        public string region { get; set; }
        public string quoteType { get; set; }
        public string typeDisp { get; set; }
        public string quoteSourceName { get; set; }
        public bool triggerable { get; set; }
        public string customPriceAlertConfidence { get; set; }
        public int gmtOffSetMilliseconds { get; set; }
        public string market { get; set; }
        public bool esgPopulated { get; set; }
        public string exchange { get; set; }
        public string shortName { get; set; }
        public string exchangeTimezoneName { get; set; }
        public string exchangeTimezoneShortName { get; set; }
        public float regularMarketPrice { get; set; }
        public string marketState { get; set; }
        public float regularMarketChangePercent { get; set; }
        public float fiftyTwoWeekLowChange { get; set; }
        public float fiftyTwoWeekLowChangePercent { get; set; }
        public string fiftyTwoWeekRange { get; set; }
        public float fiftyTwoWeekHighChange { get; set; }
        public float fiftyTwoWeekHighChangePercent { get; set; }
        public float fiftyTwoWeekLow { get; set; }
        public float fiftyTwoWeekHigh { get; set; }
        public float regularMarketChange { get; set; }
        public int regularMarketTime { get; set; }
        public float regularMarketDayHigh { get; set; }
        public string regularMarketDayRange { get; set; }
        public float regularMarketDayLow { get; set; }
        public int regularMarketVolume { get; set; }
        public float regularMarketPreviousClose { get; set; }
        public float bid { get; set; }
        public float ask { get; set; }
        public string fullExchangeName { get; set; }
        public float regularMarketOpen { get; set; }
        public int sourceInterval { get; set; }
        public int exchangeDataDelayedBy { get; set; }
        public bool tradeable { get; set; }
        public bool cryptoTradeable { get; set; }
        public int priceHint { get; set; }
        public string symbol { get; set; }
    }

}
