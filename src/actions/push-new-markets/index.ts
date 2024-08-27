import { chainIds } from "../../common";
import cometAbi from "../../common/abis/comet.json";
import { Market } from "../detect-new-markets/interfaces/interfaces";
import { createMonitor, updateMonitor, createContract } from "./utils";

export async function handler(params: any) {
  const {
    request: {
      body: {
        metadata: { newMarkets, activeMonitors },
      },
    },
  } = params;

  // Iterate through the new markets
  for (const market of newMarkets as Market[]) {
    const { network: networkId, marketInfo } = market;
    const { baseSymbol, cometAddress } = marketInfo;

    const networkName = chainIds[networkId as keyof typeof chainIds];

    // Step 1: Create a contract in Defender's address book
    await createContract(
      networkName,
      baseSymbol,
      cometAddress,
      JSON.stringify(cometAbi)
    );

    // Step 2: Update or create a monitor in Defender to watch the market
    const existingMonitor = activeMonitors.find(
      (monitor: any) =>
        monitor.network.toLowerCase() === networkName.toLowerCase()
    );
    if (existingMonitor) {
      await updateMonitor(existingMonitor, cometAddress);
    } else {
      await createMonitor(networkName, cometAddress);
    }
  }
}
