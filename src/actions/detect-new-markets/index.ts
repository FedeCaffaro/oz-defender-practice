import { fetchENSTextRecord, defenderClient } from "../../common";
import { detectNewMarkets, formatNewMarketsHTMLMessage } from "./utils";
import { MONITOR_CHAIN_ID, NOTIFICATION_CHANNEL_ALIAS } from "../../constants";
import { MonitorConditionResponse } from "@openzeppelin/defender-sdk-action-client";
import { ethers } from "ethers";
import { createContract } from "../push-new-markets/utils/createContract";
import cometAbi from "../../abis/comet.json";

export async function handler(event: any, context: any) {
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
        // Format the message in an HTML template
        const formattedMessage = formatNewMarketsHTMLMessage(newMarkets);
        await notificationClient.send({
          channelAlias: NOTIFICATION_CHANNEL_ALIAS,
          subject: "New Markets Detected",
          message: formattedMessage,
        });
        console.log("Notification sent successfully.");

        // After sending notifications, create contracts for each new market
        for (const market of newMarkets) {
          const { network: networkId, marketInfo } = market;
          const { baseSymbol, cometAddress } = marketInfo;

          // Convert network ID to network name
          const networkDetails = ethers.providers.getNetwork(Number(networkId));
          const networkName = networkDetails ? networkDetails.name : "unknown";
          console.log(networkName);
          // Create a contract in Defender's address book
          await createContract(
            networkName,
            baseSymbol,
            cometAddress,
            JSON.stringify(cometAbi)
          );
        }
      } catch (err) {
        console.error("Error sending notification or creating contracts:", err);
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
