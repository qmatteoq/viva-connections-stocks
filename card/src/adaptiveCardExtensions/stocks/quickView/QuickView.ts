import { ISPFxAdaptiveCard, BaseAdaptiveCardView } from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'StocksAdaptiveCardExtensionStrings';
import { IStocksAdaptiveCardExtensionProps, IStocksAdaptiveCardExtensionState } from '../StocksAdaptiveCardExtension';

export interface IQuickViewData {
  subTitle: string;
  title: string;
  companyName: string;
  symbol: string;
  latestPrice: number;
  high: number;
  low: number;
  primaryExchange: string;
  time: Date;
}

export class QuickView extends BaseAdaptiveCardView<
  IStocksAdaptiveCardExtensionProps,
  IStocksAdaptiveCardExtensionState,
  IQuickViewData
> {
  public get data(): IQuickViewData {
    return {
      subTitle: strings.SubTitle,
      title: strings.Title,
      companyName: this.state.stock.shortName,
      symbol: this.state.stock.symbol,
      latestPrice: this.state.stock.regularMarketPrice,
      high: this.state.stock.regularMarketDayHigh,
      low: this.state.stock.regularMarketDayLow,
      primaryExchange: this.state.stock.fullExchangeName,
      time: this.state.stock.regularMarketTime,
    };
  }

  public get template(): ISPFxAdaptiveCard {
    return require('./template/QuickViewTemplate.json');
  }
}