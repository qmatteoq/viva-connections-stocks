export interface IStockPrice {
    openingPrice: number;
    closingPrice: number;
    highestPrice: number;
    lowestPrice: number;
    volume: number;
    time: Date;
    companyName: string;
    exchange: string;
    symbol: string;
}