// **** IMPORTANT - After you add another property please add this also in AppConfig interface ***
export const environment = {
  debug: false,
  production: true,
  externalUrl: "http://localhost:4200/",
  baseUrl: "https://mayhemwebapi.azurewebsites.net/",
  //rpcUrl: "http://localhost:8545/",
  rpcChainId: "0x539",
  defaultAsset: "ADRIAT",

  rpcUrlBinance: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
  chainIdNumberBinance: 97, //Binance Smart Chain
  chainIdHexBinance: '0x61', //Binance Smart Chain
  networkId: '',
  stage: 0, //Binance Smart Chain
  maxNumberOfUsdcPerStage: 1000,
  usdcContractAddress: '',
    adriaContractAddress: '',
    adriaVestingContractAddress: ''
};
