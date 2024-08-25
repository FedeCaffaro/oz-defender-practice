import { ethers } from "ethers";
import { PHALCON_RPC_URL, ALCHEMY_RPC_URL } from "../constants";

export const phalconProvider = new ethers.JsonRpcProvider(PHALCON_RPC_URL);
export const mainnetProvider = new ethers.JsonRpcProvider(ALCHEMY_RPC_URL);
