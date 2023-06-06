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
  stage: 1, //Binance Smart Chain
  maxNumberOfUsdcPerStage: 0,
  usdcContractAddress: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
  adriaContractAddress: '0x2Ae411D012fEeA14d2d1305550a99Fcf82FB8594',
  adriaVestingContractAddress: '0xBbD93569C664ce6FBA65B4B7f36BA93B1E8C7a86',
  adriaPrice: 0.002,
  webGlLocation: 'assets/unity/',
  metamaskDeepLink:
    'https://metamask.app.link/dapp/play.cryptomayhem.io/presale',
  domain: 'cryptomayhem.io',
  cyberConnectUrl: 'https://api.cyberconnect.dev/',
  faceWalletAPIKey: 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCgcRqVN5IAyPfP6gd_Qs0tMYjqjFi08bsa2_76Ai80exJfB0A9PrtHCEmQ52w2YIFJHWlt2y1BpZH01lNTSoYMtz5UVVGbUqyHMXTeWnsNY0IcbqQw_x4YpMDeZtB--U7Zo9FMSq7zEXmrj6HdnzyLWJNLzPBnS9lnGEOdo4FNcwIDAQAB',
};
