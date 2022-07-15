import { createAction, props } from "@ngrx/store";

export const setWalletAddress = createAction(
    '[Wallet] Set wallet address',
    props<{walletAddress: string}>()
);