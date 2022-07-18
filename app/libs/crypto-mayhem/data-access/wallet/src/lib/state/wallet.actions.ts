import { createAction, props } from "@ngrx/store";

export const connectWallet = createAction(
    '[Wallet] Connect wallet'
);

export const connectWalletSuccess = createAction(
    '[Wallet] Connect wallet success'
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