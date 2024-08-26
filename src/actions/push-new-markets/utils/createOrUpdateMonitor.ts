// import { defenderClient } from "../../../common";

// export async function createOrUpdateMonitor(
//   network: string,
//   address: string,
//   monitorName: string
// ) {
//   try {
//     const monitors = await defenderClient.monitor.list();
//     const existingMonitor = monitors.items.find(
//       (monitor) => monitor.name === monitorName && monitor.network === network
//     );

//     if (existingMonitor) {
//       // Update existing monitor
//       await defenderClient.monitor.update(existingMonitor.monitorId, {
//         addresses: [...new Set([...existingMonitor.addresses, address])],
//       });
//       console.log(
//         `Updated monitor: ${monitorName} with new address ${address}`
//       );
//     } else {
//       // Create new monitor
//       await defenderClient.monitor.create({
//         name: monitorName,
//         network,
//         type: "BLOCK",
//         addresses: [address],
//         confirmLevel: "safe",
//         notifyConfig: {
//           timeout: 0,
//           message: "Monitor triggered!",
//           channels: [],
//         },
//       });
//       console.log(`Created new monitor: ${monitorName}`);
//     }
//   } catch (error) {
//     console.error(`Failed to create or update monitor: ${error}`);
//   }
// }
