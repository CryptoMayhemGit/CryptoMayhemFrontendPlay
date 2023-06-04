// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// **** IMPORTANT - After you add another property please add this also in AppConfig interface ***
export const environment = {
  debug: true,
  production: false,
  externalUrl: 'http://localhost:4200/',
  baseUrl: 'https://mayhemwebapi.azurewebsites.net/',
  //rpcUrl: "http://localhost:8545/",
  rpcChainId: '0x539',
  defaultAsset: 'ADRIAT',

  rpcUrlBinance: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
  chainIdNumberBinance: 97, //Binance Smart Chain
  chainIdHexBinance: '0x61', //Binance Smart Chain
  networkId: '', //Binance Smart Chain
  stage: 7,
  maxNumberOfUsdcPerStage: 0,
  usdcContractAddress: '0x86b2A0AFA563cB23fFcA25EB796438A8Eb43FDcF',
  adriaContractAddress: '0x88DF935B3B545C52EdFcb12cf3770e05AF954461',
  adriaVestingContractAddress: '0xccC71c500754A49D1F565e04393f747408ba5B0D',
  adriaPrice: 0.002,
  webGlLocation: 'assets/unity/',
  metamaskDeepLink:
    'https://metamask.app.link/dapp/black-mushroom-0ae7fe803-develop.westeurope.1.azurestaticapps.net/presale',
  domain: 'cryptomayhem.io',
  cyberConnectUrl: 'https://api.cyberconnect.dev/',
  faceWalletAPIKey: '',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
