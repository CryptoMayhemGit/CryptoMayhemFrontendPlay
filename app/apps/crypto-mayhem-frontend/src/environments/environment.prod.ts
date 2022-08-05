// **** IMPORTANT - After you add another property please add this also in AppConfig interface ***
export const environment = {
  debug: false,
  production: true,
  externalUrl: 'http://localhost:4200/',
  baseUrl: 'https://mayhemwebapi.azurewebsites.net/',
  //rpcUrl: "http://localhost:8545/",
  rpcChainId: '0x539',
  defaultAsset: 'ADRIAT',

  rpcUrlBinance: 'https://bsc-dataseed.binance.org/',
  chainIdNumberBinance: 56, //Binance Smart Chain
  chainIdHexBinance: '0x38', //Binance Smart Chain
  networkId: '',
  stage: 0, //Binance Smart Chain
  maxNumberOfUsdcPerStage: 150,
  usdcContractAddress: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
  adriaContractAddress: '0x2Ae411D012fEeA14d2d1305550a99Fcf82FB8594',
  adriaVestingContractAddress: '0x73d18c8675cCafA22865Ac9D5A02cFCf3a8e679c',
  adriaPrice: 0.0016,
  webGlLocation: 'assets/unity/',
  metamaskDeepLink:
    'https://metamask.app.link/dapp/play.cryptomayhem.io/presale',
};
