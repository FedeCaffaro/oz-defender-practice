import { mainnetProvider } from "./rpcProvider";
import { ENS_COMPOUND_DOMAIN, ENS_COMPOUND_KEY } from "../constants";

export async function fetchENSTextRecord(): Promise<string | null> {
  try {
    const resolver = await mainnetProvider.getResolver(ENS_COMPOUND_DOMAIN);
    if (!resolver) {
      throw new Error("ENS Resolver not found for the specified domain.");
    }
    const textRecords = await resolver.getText(ENS_COMPOUND_KEY);
    return textRecords;
  } catch (error) {
    console.error("Error fetching ENS text record:", error);
    throw error;
  }
}
