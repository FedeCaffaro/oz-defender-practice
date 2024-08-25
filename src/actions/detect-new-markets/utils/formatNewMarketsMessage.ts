import { Market, MarketInfo } from "../interfaces";

export function formatNewMarketsMessage(newMarkets: Market[]): string {
    // Group markets by network
    const marketsByNetwork = newMarkets.reduce((acc, market) => {
      const { network, marketInfo } = market;
      if (!acc[network]) {
        acc[network] = [];
      }
      acc[network].push(marketInfo);
      return acc;
    }, {} as Record<string, MarketInfo[]>);
  
    // Format the message
    let message = "";
    for (const [network, markets] of Object.entries(marketsByNetwork)) {
      message += `Network ID: ${network}\n`;
      markets.forEach((marketInfo) => {
        message += `  - Market: ${marketInfo.baseSymbol}, Address: ${marketInfo.cometAddress}\n`;
      });
      message += "\n";
    }
  
    return message.trim();
  }