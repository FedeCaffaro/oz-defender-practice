import { fetchENSTextRecord, defenderClient } from "../../common";
import { detectNewMarkets, formatNewMarketsHTMLMessage } from "./utils";
import { MONITOR_CHAIN_ID, NOTIFICATION_CHANNEL_ALIAS } from "../../constants";
// import { MonitorConditionResponse } from "@openzeppelin/defender-sdk-action-client";

export async function handler(payload: any, context: any) {
  try {
    const conditionRequest = payload.request.body;
    const events = conditionRequest.events;
    const matches = [];
    const { notificationClient } = context;

    // Fetch all the deployed market addresses from ENS text records
    const textRecords = await fetchENSTextRecord(MONITOR_CHAIN_ID);
    // Get the active monitors from Defender for the addresses
    const activeMonitors = (await defenderClient.monitor.list()).items;
    // Detect new markets not currently monitored
    const newMarkets = detectNewMarkets(textRecords, activeMonitors);

    // Send notifications & generate a match if new markets are detected
    if (newMarkets.length > 0) {
      try {
        const formattedMessage = formatNewMarketsHTMLMessage(newMarkets);
        await notificationClient.send({
          channelAlias: NOTIFICATION_CHANNEL_ALIAS,
          subject: "New Markets Detected",
          message: formattedMessage,
        });
        console.log("Notification sent successfully.");
      } catch (err) {
        console.error("Error sending notification or creating contracts:", err);
      }
      matches.push({
        hash: events[0].hash,
        metadata: {
          newMarkets: newMarkets,
          activeMonitors: activeMonitors,
        },
      });
    }
    return { matches };
  } catch (err) {
    console.error("Error in detecting new markets:", err);
  }
}
