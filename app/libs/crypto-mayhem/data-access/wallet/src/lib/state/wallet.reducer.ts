import { Action, createReducer, on } from "@ngrx/store";

import * as WalletActions from './wallet.actions';

export const walletKey = 'wallets';

export interface WalletState {
    walletAddress: string,
    spinner: boolean
}

export const initialState: WalletState = {
    walletAddress: '',
    spinner: false
}

export const walletReducer = createReducer(
    initialState,
    on(WalletActions.setWalletAddress,
        (state, {walletAddress}) => ({...state, walletAddress: walletAddress})),
    on(WalletActions.showSpinner, state => ({...state, spinner: true})),
    on(WalletActions.hideSpinner, state => ({...state, spinner: false}))
);

export function reducer(state: WalletState | undefined, action: Action) {
    return walletReducer(state, action);
}