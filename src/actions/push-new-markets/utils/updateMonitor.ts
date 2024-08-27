import { defenderClient } from "../../../common";
export async function updateMonitor(monitor: any, cometAddress: string) {
  const { monitorId } = monitor;
  const addresses = monitor.addressRules[0].addresses;
  await defenderClient.monitor.update(monitorId, {
    ...addresses,
    cometAddress,
  });
}
