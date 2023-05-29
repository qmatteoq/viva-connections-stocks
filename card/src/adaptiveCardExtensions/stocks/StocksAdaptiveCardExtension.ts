import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseAdaptiveCardExtension } from '@microsoft/sp-adaptive-card-extension-base';
import { CardView } from './cardView/CardView';
import { QuickView } from './quickView/QuickView';
import { StocksPropertyPane } from './StocksPropertyPane';
import { IStockPrice } from './models/IStockPrice';
import { AadHttpClient, BeforeRedirectEventArgs } from '@microsoft/sp-http';

export interface IStocksAdaptiveCardExtensionProps {
  title: string;
  stockSymbol: string;
  appId: string;
  apiUrl: string;
}

export interface IStocksAdaptiveCardExtensionState {
  stock: IStockPrice;
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

    if (this.properties.stockSymbol !== "" && this.properties.apiUrl !== "") {
      await this.fetchData();
    }

    this.cardNavigator.register(CARD_VIEW_REGISTRY_ID, () => new CardView());
    this.quickViewNavigator.register(QUICK_VIEW_REGISTRY_ID, () => new QuickView());

    return Promise.resolve();
  }

  public async fetchData(): Promise<void> { 
  
      const url = this.properties.apiUrl + "/" + this.properties.stockSymbol;

      let response;

      if (this.properties.appId !== "") {
        const tokenProvider = await this.context.aadTokenProviderFactory.getTokenProvider();
        tokenProvider.onBeforeRedirectEvent.add(this, (args: BeforeRedirectEventArgs) => {
          console.log("onBeforeRedirectEvent");
          console.log(args);
        });
        const aadClient = await this.context.aadHttpClientFactory.getClient("api://" + this.properties.appId);
        response = await aadClient.get(url, AadHttpClient.configurations.v1);
      }
      else {
        response = await fetch(url);
      }

      try {
        const json = await response.text();
        const parsedJson: IStockPrice = JSON.parse(json) as IStockPrice;
        this.setState({stock: parsedJson});
      }
      catch {
        this.setState({stock: null});
      }

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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void {
      if (propertyPath === 'stockSymbol' && newValue !== oldValue) {
        if (newValue) {
          // eslint-disable-next-line no-void
          void this.fetchData();
        } 
      }

      if (propertyPath === 'apiUrl' && newValue !== oldValue) {
        if (newValue) {
          // eslint-disable-next-line no-void
          void this.fetchData();
        } 
      }

      if (propertyPath === 'appId' && newValue !== oldValue) {
        if (newValue) {
          // eslint-disable-next-line no-void
          void this.fetchData();
        } 
      }
    }

  protected renderCard(): string | undefined {
    return CARD_VIEW_REGISTRY_ID;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return this._deferredPropertyPane?.getPropertyPaneConfiguration();
  }
}
