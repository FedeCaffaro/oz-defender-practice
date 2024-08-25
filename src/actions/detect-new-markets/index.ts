import { fetchENSTextRecord, defenderClient } from "../../utils";
import { Market, MarketInfo } from "./interfaces";

export async function handler() {
  try {
    // Fetch all the deployed market addresses from ENS text records
    const textRecords = await fetchENSTextRecord(9991);

    // Get the active monitors from Defender for the addresses
    const activeMonitors = (await defenderClient.monitor.list()).items;

    // Detect new markets not currently monitored
    const newMarkets = detectNewMarkets(textRecords, activeMonitors);
    const message = formatNewMarketsMessage(newMarkets);

    console.log("New Markets Detected: \n", message);
  } catch (err) {
    console.error("Error in detecting new markets:", err);
  }
}

function detectNewMarkets(textRecords: JSON, activeMonitors: any[]): Market[] {
  // Initialize a map to store monitored addresses by network
  const monitoredAddressesByNetwork = new Map<string, string[]>();

  // Populate the monitored addresses map
  activeMonitors.forEach((monitor: any) => {
    const network = monitor.network.toLowerCase();
    if (!monitoredAddressesByNetwork.has(network)) {
      monitoredAddressesByNetwork.set(network, []);
    }
    monitor.addressRules?.forEach((rule: any) => {
      if (Array.isArray(rule.addresses)) {
        rule.addresses.forEach((address: string) => {
          const addressLower = address.toLowerCase();
          const addressesArray = monitoredAddressesByNetwork.get(network)!;

          if (!addressesArray.includes(addressLower)) {
            addressesArray.push(addressLower);
          }
        });
      }
    });
  });

  // Identify new markets that are not monitored
  const newMarkets: Market[] = [];

  for (const [networkId, markets] of Object.entries(textRecords)) {
    const monitoredAddresses =
      monitoredAddressesByNetwork.get(networkId.toLowerCase()) || [];

    (markets as MarketInfo[]).forEach((marketInfo) => {
      const marketAddress = marketInfo.cometAddress.toLowerCase();
      if (!monitoredAddresses.includes(marketAddress)) {
        newMarkets.push({ network: networkId, marketInfo });
      }
    });
  }

  return newMarkets;
}

function formatNewMarketsMessage(newMarkets: Market[]): string {
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

// Execute the handler
handler();
