declare interface IStocksAdaptiveCardExtensionStrings {
  PropertyPaneDescription: string;
  TitleFieldLabel: string;
  StockCodeLabel:string;
  ApiUrlLabel: string;
  AADClientIdLabel: string;
  Title: string;
  SubTitle: string;
  PrimaryText: string;
  Description: string;
  QuickViewButton: string;
}

declare module 'StocksAdaptiveCardExtensionStrings' {
  const strings: IStocksAdaptiveCardExtensionStrings;
  export = strings;
}
