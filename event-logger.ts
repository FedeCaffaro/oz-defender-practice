import * as dotenv from "dotenv";
dotenv.config();
import { Alchemy, Network, Utils } from "alchemy-sdk";

import resolverAbi from "./src/abis/ens-resolver.json";

const settings = {
  apiKey: process.env.ALCHEMY_API_KEY as string,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

const ENS_RESOLVER_ADDRESS = "0x4976fb03C32e5B8cfe2b6cCB31c09Ba78EBaBa41";

const ENS_RESOLVER_INTERFACE = new Utils.Interface(resolverAbi);
const ENS_RESOLVER_SET_TEXT_TOPICS = ENS_RESOLVER_INTERFACE.encodeFilterTopics(
  "TextChanged",
  [
    "0x7dcf87198fd673716e5a32b206d9379c4fcbad8875073f52bfd0656759bf89ed",
    "v3-official-markets",
  ]
);

async function getAllTextChangedEver() {
  const logs = await alchemy.core.getLogs({
    fromBlock: "0x0",
    toBlock: "latest",
    address: ENS_RESOLVER_ADDRESS,
    topics: ENS_RESOLVER_SET_TEXT_TOPICS,
  });
  console.log(logs);

  if (logs.length > 0) {
    const log = logs[0];
    const decoded = ENS_RESOLVER_INTERFACE.decodeEventLog(
      "TextChanged",
      log.data,
      log.topics
    );
    console.log(decoded);
  } else {
    console.log("No logs found");
  }
}

getAllTextChangedEver();
