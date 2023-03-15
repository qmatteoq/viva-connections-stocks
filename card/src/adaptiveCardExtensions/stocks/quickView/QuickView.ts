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
      companyName: this.state.stock.companyName,
      symbol: this.state.stock.symbol,
      latestPrice: this.state.stock.openingPrice,
      high: this.state.stock.highestPrice,
      low: this.state.stock.lowestPrice,
      primaryExchange: this.state.stock.exchange,
      time: this.state.stock.time
    };
  }

  public get template(): ISPFxAdaptiveCard {
    return require('./template/QuickViewTemplate.json');
  }
}