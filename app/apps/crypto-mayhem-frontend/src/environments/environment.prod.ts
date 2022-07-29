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
  usdcContractAddress: '0x6D9e2BAAAe74E348254F507b3d536A084F9ecdbA',
    adriaContractAddress: '0x1Cb96bbEae0227eE8840f78b2158B5316ff00BE9',
    adriaVestingContractAddress: '0x5dD02ca1eBa2FE73f71B1895931389E8cAB557a2'
};
