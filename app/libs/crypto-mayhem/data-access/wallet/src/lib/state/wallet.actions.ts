import { WalletType } from "@crypto-mayhem-frontend/crypto-mayhem/data-access/wallet-model";
import { createAction, props } from "@ngrx/store";

export const connectWallet = createAction(
    '[Wallet] Connect wallet',
    props<{walletType: WalletType}>()
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

export const showWallets = createAction(
    '[Wallet] Show available wallets'
);

export const hideWallets = createAction(
    '[Wallet] Hide available wallets'
);