import { WalletType } from "@crypto-mayhem-frontend/crypto-mayhem/data-access/wallet-model";
import { Action, createReducer, on } from "@ngrx/store";

import * as WalletActions from './wallet.actions';

export const walletKey = 'wallets';

export interface WalletState {
    walletAddress: string,
    spinner: boolean,
    walletType: WalletType
}

export const initialState: WalletState = {
    walletAddress: '',
    spinner: false,
    walletType: WalletType.none
}

export const walletReducer = createReducer(
    initialState,
    on(WalletActions.connectWallet, (state, {walletType}) => ({...state, spinner: true, walletType: walletType})),
    on(WalletActions.setWalletAddress,
        (state, {walletAddress}) => ({...state, walletAddress: walletAddress})),
    on(WalletActions.showSpinner, state => ({...state, spinner: true})),
    on(WalletActions.hideSpinner, state => ({...state, spinner: false}))
);

export function reducer(state: WalletState | undefined, action: Action) {
    return walletReducer(state, action);
}