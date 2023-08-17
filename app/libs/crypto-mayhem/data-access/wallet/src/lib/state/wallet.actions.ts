import { WalletType } from '@crypto-mayhem-frontend/crypto-mayhem/data-access/wallet-model';
import { createAction, props } from '@ngrx/store';

export const accountsChanged = createAction(
  '[Wallet] Account changed',
  props<{ account: string }>()
);

export const accountsChangedSuccess = createAction(
  '[Wallet] Account changed success'
);

export const chainChanged = createAction(
  '[Wallet] Chain changed',
  props<{ chainId: string }>()
);

export const disconnectWallet = createAction('[Wallet] Disconnect wallet');

export const connectWallet = createAction('[Wallet] Connect wallet');

export const connectWalletSuccess = createAction(
  '[Wallet] Connect wallet success',
  props<{ walletType: WalletType }>()
);

export const changeWalletType = createAction(
  '[Wallet] Change wallet type',
  props<{ walletType: WalletType }>()
);

export const showMetaproQr = createAction(
  '[Wallet] Show metapro qr code',
  props<{ showMetaproQr: boolean }>()
);

export const connectWalletError = createAction(
  '[Wallet] Connect wallet action'
);

export const setWalletAddress = createAction(
  '[Wallet] Set wallet address',
  props<{ walletAddress: string }>()
);

export const showSpinner = createAction('[Wallet] Show spinner');

export const hideSpinner = createAction('[Wallet] Hide spinner');

export const showWallets = createAction(
  '[Wallet] Show available wallets',
  props<{ close: boolean | undefined, showCcProfile: boolean | undefined }>()
  );

export const hideWallets = createAction('[Wallet] Hide available wallets');

export const signMessageForLauncher = createAction(
  '[Wallet] Sign message for launcher',
  props<{wallet: string, nonce: number, handle?: string}>()
);

export const signMessageForLauncherSuccess = createAction(
  '[Wallet] Send signed data to launcher'
);

export const postSignWalletBeforeBuy = createAction(
  '[Wallet] Pre-sale buy',
  props<{ amount: number }>()
);

export const postSignWalletBeforeBuySuccess = createAction(
  '[Wallet] Pre-sale buy success',
  props<{ sign: any }>()
);

export const usdcPerStageByUser = createAction(
  '[Wallet] Get number of usdc per stage on logged user',
  props<{
    numberOfUsdc: string;
    numberOfAdria: number;
    showSummary: boolean;
    canBuyMore: boolean;
  }>()
);

export const tokensPerStage = createAction(
  '[Wallet] Get number of tokens sold and total amount available per stage',
  props<{ tokensSoldPerStage: number; maxAdriaTokenAmount: number }>()
);

export const buyAdriaSuccess = createAction('[Wallet] Success buy Adria');

export const setUserCanBuy = createAction(
  '[Wallet] Set if user can buy presale',
  props<{ canBuy: boolean }>()
);

export const hideSummary = createAction(
  '[Wallet] Hide summary on presale window'
);

export const transaction = createAction('[Wallet] Start transaction buy Adria');

export const transactionSuccess = createAction(
  '[Wallet] Start transaction buy Adria success'
);

export const getBnbBalance = createAction(
  '[Wallet] Get balance of BNB',
  props<{ bnbBalanceOf: number}>()
);

export const setLanguage = createAction(
  '[Wallet] Set language',
  props<{ language: string }>()
);