import { fetchENSTextRecord } from "../../utils";

export async function handler() {
  const textRecords = await fetchENSTextRecord();
  console.log(textRecords);
}

handler();
