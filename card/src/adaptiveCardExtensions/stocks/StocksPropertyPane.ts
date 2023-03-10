import { IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import * as strings from 'StocksAdaptiveCardExtensionStrings';

export class StocksPropertyPane {
  public getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: { description: strings.PropertyPaneDescription },
          groups: [
            {
              groupFields: [
                PropertyPaneTextField('title', {
                  label: strings.TitleFieldLabel
                }),
                PropertyPaneTextField('stockSymbol', {
                  label: strings.StockCodeLabel
                }),
                PropertyPaneTextField('apiUrl', {
                  label: strings.ApiUrlLabel
                }),
                PropertyPaneTextField('appId', {
                  label: strings.AADClientIdLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
