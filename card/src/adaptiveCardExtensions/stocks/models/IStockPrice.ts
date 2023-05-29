export interface IStockPrice {
    closingPrice: number;
    regularMarketDayHigh: number;
    regularMarketDayLow: number;
    regularMarketPrice: number;
    volume: number;
    regularMarketTime: Date;
    shortName: string;
    fullExchangeName: string;
    symbol: string;
}