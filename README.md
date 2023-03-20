# Viva Connection stocks

## Summary

This project is a card for Viva Connections to display stock prices. The card is built using SharePoint Adaptive Card extensions. The card uses a backend built using an Azure Function and Azure Cache for Redis.

![stock-card](https://user-images.githubusercontent.com/1230332/226460758-325308e8-3c1d-4c36-9a73-ee4132e78077.png)

This project is described in the following articles:

- [Build a Viva Connections card to display stock prices - Part 1: the backend](https://techcommunity.microsoft.com/t5/modern-work-app-consult-blog/build-a-viva-connections-card-to-display-stock-prices-part-1-the/ba-p/3773345)

## Used SharePoint Framework Version

![version](https://img.shields.io/badge/version-1.13-green.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## Prerequisites

- An Azure subscription

## Version history

| Version | Date             | Comments        |
| ------- | ---------------- | --------------- |
| 1.1     | March 10, 2021   | Update comment  |
| 1.0     | January 29, 2021 | Initial release |

## Disclaimer

**THIS CODE IS PROVIDED _AS IS_ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---
## Features

This card can be used to display any stock price in the Viva Connections portal. When you drag this card into the dashboard, you can customize:

- The stock to track
- The URL of your backend
- (Optional) If the API is protected by the Microsoft Identity platform, the id of the AAD app which supports single sign-on

## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft teams](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development
