import { defenderClient } from "../../../common";
import cometAbi from "../../../common/abis/comet.json";
import { ExternalCreateMonitorRequest } from "@openzeppelin/defender-sdk-monitor-client/lib/models/monitor";

export async function createMonitor(
  networkName: string,
  commetAddress: string
) {
  const monitorBody: ExternalCreateMonitorRequest = {
    name: `${networkName} Monitor for Commet Contracts`,
    addresses: [commetAddress],
    type: "BLOCK",
    notificationChannels: ["email"],
    abi: JSON.stringify(cometAbi),
    network: networkName,
  };
  const monitor = await defenderClient.monitor.create(monitorBody);
  return monitor;
}
