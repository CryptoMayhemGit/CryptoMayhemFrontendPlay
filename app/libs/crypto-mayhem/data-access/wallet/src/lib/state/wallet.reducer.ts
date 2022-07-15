import { Action, createReducer, on } from "@ngrx/store";

import * as WalletActions from './wallet.actions';

export const walletKey = 'wallets';

export interface WalletState {
    walletAddress: string,
}

export const initialState: WalletState = {
    walletAddress: ''
}

export const walletReducer = createReducer(
    initialState,
    on(WalletActions.setWalletAddress,
        (state, {walletAddress}) => ({...state, walletAddress: walletAddress}))
);

export function reducer(state: WalletState | undefined, action: Action) {
    return walletReducer(state, action);
}