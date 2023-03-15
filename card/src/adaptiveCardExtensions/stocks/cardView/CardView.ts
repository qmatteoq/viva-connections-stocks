import {
  BasePrimaryTextCardView,
  IPrimaryTextCardParameters,
  IExternalLinkCardAction,
  IQuickViewCardAction,
  ICardButton
} from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'StocksAdaptiveCardExtensionStrings';
import { IStocksAdaptiveCardExtensionProps, IStocksAdaptiveCardExtensionState, QUICK_VIEW_REGISTRY_ID } from '../StocksAdaptiveCardExtension';

export class CardView extends BasePrimaryTextCardView<IStocksAdaptiveCardExtensionProps, IStocksAdaptiveCardExtensionState> {
  public get cardButtons(): [ICardButton] | [ICardButton, ICardButton] | undefined {
    return [
      {
        title: strings.QuickViewButton,
        action: {
          type: 'QuickView',
          parameters: {
            view: QUICK_VIEW_REGISTRY_ID
          }
        }
      }
    ];
  }

  public get data(): IPrimaryTextCardParameters {
    return {
      description: this.state.stock !== null ? this.properties.stockSymbol : "Please set a stock symbol",
      primaryText: this.state.stock !== null ? this.state.stock.openingPrice.toString() + " USD": "Please set a stock symbol",
      title: this.properties.title
    };
  }

  public get onCardSelection(): IQuickViewCardAction | IExternalLinkCardAction | undefined {
    return {
      type: 'ExternalLink',
      parameters: {
        target: 'https://finance.yahoo.com/quote/EGS95001C011.CA/' + this.properties.stockSymbol
      }
    };
  }
}
