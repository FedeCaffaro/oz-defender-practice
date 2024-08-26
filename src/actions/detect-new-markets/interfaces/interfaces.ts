export interface MarketInfo {
  baseSymbol: string;
  cometAddress: string;
}
export interface Market {
  network: string;
  marketInfo: MarketInfo;
}
