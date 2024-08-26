import * as dotenv from "dotenv";
dotenv.config();

export const DEFENDER_API_KEY = process.env.DEFENDER_API_KEY as string;
export const DEFENDER_API_SECRET = process.env.DEFENDER_API_SECRET as string;
export const ALCHEMY_RPC_URL = process.env.ALCHEMY_RPC_URL as string;
export const PHALCON_RPC_URL = process.env.PHALCON_RPC_URL as string;
export const ENS_COMPOUND_DOMAIN = process.env.ENS_COMPOUND_DOMAIN as string;
export const ENS_COMPOUND_RESOLVER_ADDRESS = process.env
  .ENS_COMPOUND_RESOLVER_ADDRESS as string;
export const ENS_COMPOUND_KEY = process.env.ENS_COMPOUND_KEY as string;
export const ENS_COMPOUND_NODE = process.env.ENS_COMPOUND_NODE as string;
export const MONITOR_CHAIN_ID = parseInt(
  process.env.MONITOR_CHAIN_ID as string
);
export const NOTIFICATION_CHANNEL_ALIAS = process.env
  .NOTIFICATION_CHANNEL_ALIAS as string;
