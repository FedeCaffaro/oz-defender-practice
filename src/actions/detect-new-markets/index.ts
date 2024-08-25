import { fetchENSTextRecord, defenderClient } from "../../common";
import { detectNewMarkets, formatNewMarketsMessage } from "./utils";
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

// Execute the handler
handler();
