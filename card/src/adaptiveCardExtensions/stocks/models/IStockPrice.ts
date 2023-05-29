export interface IStockPrice {
    closingPrice: number;
    highestPrice: number;
    lowestPrice: number;
    openingPrice: number;
    volume: number;
    time: Date;
    companyName: string;
    exchange: string;
    symbol: string;
}