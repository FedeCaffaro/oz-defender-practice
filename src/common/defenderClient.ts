import { Defender } from "@openzeppelin/defender-sdk";
import { DEFENDER_API_KEY, DEFENDER_API_SECRET } from "./constants";

const creds = {
  apiKey: DEFENDER_API_KEY,
  apiSecret: DEFENDER_API_SECRET,
};

export const defenderClient = new Defender(creds);

