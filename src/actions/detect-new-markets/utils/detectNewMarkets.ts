import { Market, MarketInfo } from "../interfaces/interfaces";

export function detectNewMarkets(textRecords: JSON, activeMonitors: any[]): Market[] {
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
