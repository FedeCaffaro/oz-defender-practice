import {
  mainnetProvider,
  phalconProvider,
  ENS_COMPOUND_DOMAIN,
  ENS_COMPOUND_KEY,
  ENS_COMPOUND_RESOLVER_ADDRESS,
  ENS_COMPOUND_NODE,
} from "../../../common";

import { Contract } from "ethers";

export async function fetchENSTextRecord(chainId: number): Promise<JSON> {
  try {
    if (chainId === 1) {
      const resolver = await mainnetProvider.getResolver(ENS_COMPOUND_DOMAIN);
      if (!resolver) {
        throw new Error("Resolver not found");
      }
      const textRecords = JSON.parse(
        (await resolver.getText(ENS_COMPOUND_KEY)) as string
      );
      return textRecords;
    } else {
      const contract = new Contract(
        ENS_COMPOUND_RESOLVER_ADDRESS,
        ["function text(bytes32 node, string key) view returns (string)"],
        phalconProvider
      );
      const record = JSON.parse(
        await contract.text(ENS_COMPOUND_NODE, ENS_COMPOUND_KEY)
      );
      return record;
    }
  } catch (error) {
    console.error("Error fetching ENS text record:", error);
    throw error;
  }
}
