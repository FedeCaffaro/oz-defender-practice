import { defenderClient } from "../../../common";

export async function createContract(
  network: string,
  name: string,
  address: string,
  abi: string
) {
  try {
    const response = await defenderClient.proposal.addContract({
      network,
      name,
      address,
      abi,
    });
    console.log(`Contract created: ${response.name} at ${response.address}`);
  } catch (error) {
    console.error(`Failed to create contract: ${error}`);
  }
}
