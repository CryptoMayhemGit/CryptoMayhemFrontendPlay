export interface AppConfig {
  debug: boolean;
  production: boolean;
  externalUrl: string;
  baseUrl: string;
  rpcChainId: string;
  defaultAsset: string;
  rpcUrlBinance: string;
  chainIdNumberBinance: number;
  chainIdHexBinance: string;
  networkId: string;
  stage: number;
  maxNumberOfUsdcPerStage: number;
  usdcContractAddress: string;
  adriaContractAddress: string;
  adriaVestingContractAddress: string;
  adriaPrice: number;
  webGlLocation: string;
  metamaskDeepLink: string;
  domain: string;
}
