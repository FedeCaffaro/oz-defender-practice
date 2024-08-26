import { providers } from "ethers";
import { PHALCON_RPC_URL, ALCHEMY_RPC_URL } from "../constants";

export const phalconProvider = new providers.JsonRpcProvider(PHALCON_RPC_URL);
export const mainnetProvider = new providers.JsonRpcProvider(ALCHEMY_RPC_URL);
