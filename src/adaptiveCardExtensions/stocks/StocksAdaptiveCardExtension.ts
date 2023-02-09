import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseAdaptiveCardExtension } from '@microsoft/sp-adaptive-card-extension-base';
import { CardView } from './cardView/CardView';
import { QuickView } from './quickView/QuickView';
import { StocksPropertyPane } from './StocksPropertyPane';
import { Quote } from './models/IStockPrice';
import { AadHttpClient } from '@microsoft/sp-http';

export interface IStocksAdaptiveCardExtensionProps {
  title: string;
  stockSymbol: string;
  appId: string;
}

export interface IStocksAdaptiveCardExtensionState {
  stock: Quote
}

const CARD_VIEW_REGISTRY_ID: string = 'Stocks_CARD_VIEW';
export const QUICK_VIEW_REGISTRY_ID: string = 'Stocks_QUICK_VIEW';

export default class StocksAdaptiveCardExtension extends BaseAdaptiveCardExtension<
  IStocksAdaptiveCardExtensionProps,
  IStocksAdaptiveCardExtensionState
> {
  private _deferredPropertyPane: StocksPropertyPane | undefined;

  public async onInit(): Promise<void> {
    this.state = { 
      stock: null
    };

    if (this.properties.stockSymbol !== "") {

      const url = "https://stockpricesapi.azurewebsites.net/api/stockPrices/" + this.properties.stockSymbol;

      let response;

      if (this.properties.appId !== "") {
        const aadClient = await this.context.aadHttpClientFactory.getClient("api://" + this.properties.appId);
        response = await aadClient.get(url, AadHttpClient.configurations.v1);
      }
      else {
        response = await fetch(url);
      }

      const json = await response.text();
      const parsedJson: Quote = JSON.parse(json) as Quote;

      this.setState({stock: parsedJson});
    }
    else {
      this.setState({ stock: null});
    }

    this.cardNavigator.register(CARD_VIEW_REGISTRY_ID, () => new CardView());
    this.quickViewNavigator.register(QUICK_VIEW_REGISTRY_ID, () => new QuickView());

    return Promise.resolve();
  }

  protected loadPropertyPaneResources(): Promise<void> {
    return import(
      /* webpackChunkName: 'Stocks-property-pane'*/
      './StocksPropertyPane'
    )
      .then(
        (component) => {
          this._deferredPropertyPane = new component.StocksPropertyPane();
        }
      );
  }

  protected renderCard(): string | undefined {
    return CARD_VIEW_REGISTRY_ID;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return this._deferredPropertyPane?.getPropertyPaneConfiguration();
  }
}
