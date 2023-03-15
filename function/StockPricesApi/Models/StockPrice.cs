using System;

namespace StockPricesApi.Models
{
    public class StockPrice
    {
         public decimal OpeningPrice {get; set;}
        
        public decimal ClosingPrice {get; set;}
        
        public decimal HighestPrice {get; set;}
        
        public decimal LowestPrice {get; set;}
        
        public long Volume {get; set;}

        public string CompanyName { get; set; }

        public string Exchange { get; set; }

        public string Symbol { get; set; }

        public DateTime Time { get; set; }
    }
}
