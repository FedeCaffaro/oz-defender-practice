import { fetchENSTextRecord, defenderClient } from "../../common";
import { detectNewMarkets, formatNewMarketsMessage } from "./utils";
import { MONITOR_CHAIN_ID, NOTIFICATION_CHANNEL_ALIAS } from "../../constants";
import { MonitorConditionResponse } from "@openzeppelin/defender-sdk-action-client";
export async function handler(event: any, context: any) {
  // shall I define this as MonitorConditionRequest?
  try {
    const payload = event.request.body;
    const { notificationClient } = context;

    // Fetch all the deployed market addresses from ENS text records
    const textRecords = await fetchENSTextRecord(MONITOR_CHAIN_ID);

    // Get the active monitors from Defender for the addresses
    const activeMonitors = (await defenderClient.monitor.list()).items;

    // Detect new markets not currently monitored
    const conditionResponse: MonitorConditionResponse = { matches: [] };
    const newMarkets = detectNewMarkets(textRecords, activeMonitors);

    // Send notifications & generate a match if new markets are detected
    if (newMarkets.length > 0) {
      try {
        // Send a notification if new markets are detected
        const message = formatNewMarketsMessage(newMarkets);
        await notificationClient.send({
          channelAlias: NOTIFICATION_CHANNEL_ALIAS,
          subject: "New Markets Detected",
          message: `<p> The following new markets have been detected:\n\n${message}. </p>`,
        });
        console.log("Notification sent successfully.");
      } catch (err) {
        console.error("Error sending notification:", err);
      }
      const match = {
        hash: payload.events[0].transaction.transactionHash,
        metadata: {
          newMarkets: newMarkets,
        },
      };
      conditionResponse.matches.push(match);
    }
    return conditionResponse;
  } catch (err) {
    console.error("Error in detecting new markets:", err);
  }
}
