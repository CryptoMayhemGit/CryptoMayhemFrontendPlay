import { WalletType } from "@crypto-mayhem-frontend/crypto-mayhem/data-access/wallet-model";
import { createAction, props } from "@ngrx/store";


export const accountsChanged = createAction(
    '[Wallet] Account changed',
    props<{account: string}>()
);

export const accountsChangedSuccess = createAction(
    '[Wallet] Account changed success',
);

export const chainChanged = createAction(
    '[Wallet] Chain changed',
    props<{chainId: string}>()
);

export const disconnectWallet = createAction(
    '[Wallet] Disconnect wallet'
);

export const connectWallet = createAction(
    '[Wallet] Connect wallet'
);

export const connectWalletSuccess = createAction(
    '[Wallet] Connect wallet success',
    props<{walletType: WalletType}>()
);

export const connectWalletError = createAction(
    '[Wallet] Connect wallet action',
);

export const setWalletAddress = createAction(
    '[Wallet] Set wallet address',
    props<{walletAddress: string}>()
);

export const showSpinner = createAction(
    '[Wallet] Show spinner'
);

export const hideSpinner = createAction(
    '[Wallet] Hide spinner'
);

export const showWallets = createAction(
    '[Wallet] Show available wallets'
);

export const hideWallets = createAction(
    '[Wallet] Hide available wallets'
);

export const postSignWalletBeforeBuy = createAction(
    '[Wallet] Pre-sale buy',
    props<{amount: number}>()
);

export const postSignWalletBeforeBuySuccess = createAction(
    '[Wallet] Pre-sale buy success',
    props<{sign: any}>()
);

export const usdcPerStageByUser = createAction(
    '[Wallet] Get number of usdc per stage on logged user',
    props<{numberOfUsdc: string, numberOfAdria: number, showSummary: boolean, canBuyMore: boolean}>()
);

export const buyAdriaSuccess = createAction(
    '[Wallet] Success buy Adria'
);

export const setUserCanBuy = createAction(
    '[Wallet] Set if user can buy presale',
    props<{canBuy: boolean}>()
);

export const hideSummary = createAction(
    '[Wallet] Hide summary on presale window'
);

export const transaction = createAction(
    '[Wallet] Start transaction buy Adria'
);

export const transactionSuccess = createAction(
    '[Wallet] Start transaction buy Adria success'
);