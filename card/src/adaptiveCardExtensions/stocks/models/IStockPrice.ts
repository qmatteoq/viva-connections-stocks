export interface Quote {
    language: string;
    region: string;
    quoteType: string;
    typeDisp: string;
    quoteSourceName: string;
    triggerable: boolean;
    customPriceAlertConfidence: string;
    gmtOffSetMilliseconds: number;
    market: string;
    esgPopulated: boolean;
    exchange: string;
    shortName: string;
    exchangeTimezoneName: string;
    exchangeTimezoneShortName: string;
    regularMarketPrice: number;
    marketState: string;
    regularMarketChangePercent: number;
    fiftyTwoWeekLowChange: number;
    fiftyTwoWeekLowChangePercent: number;
    fiftyTwoWeekRange: string;
    fiftyTwoWeekHighChange: number;
    fiftyTwoWeekHighChangePercent: number;
    fiftyTwoWeekLow: number;
    fiftyTwoWeekHigh: number;
    regularMarketChange: number;
    regularMarketTime: number;
    regularMarketDayHigh: number;
    regularMarketDayRange: string;
    regularMarketDayLow: number;
    regularMarketVolume: number;
    regularMarketPreviousClose: number;
    bid: number;
    ask: number;
    fullExchangeName: string;
    regularMarketOpen: number;
    sourceInterval: number;
    exchangeDataDelayedBy: number;
    tradeable: boolean;
    cryptoTradeable: boolean;
    priceHint: number;
    symbol: string;
}

export interface Result {
    underlyingSymbol: string;
    hasMiniOptions: boolean;
    quote: Quote;
}

export interface OptionChain {
    result: Result[];
    error?: string;
}

export interface RootObject {
    optionChain: OptionChain;
}

