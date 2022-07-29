import { WalletType } from "@crypto-mayhem-frontend/crypto-mayhem/data-access/wallet-model";
import { Action, createReducer, on } from "@ngrx/store";

import * as WalletActions from './wallet.actions';

export const walletKey = 'wallets';

export interface WalletState {
    account: string,
    chainId: string | undefined,
    connected: boolean,
    spinner: boolean,
    showWallets: boolean,
    walletType: WalletType
    usdcPerStage: string
}

export const initialState: WalletState = {
    account: '',
    chainId: undefined,
    connected: false,
    spinner: false,
    showWallets: false,
    walletType: WalletType.none,
    usdcPerStage: '0.0'
}

export const walletReducer = createReducer(
    initialState,
    on(WalletActions.connectWallet, state => ({...state, spinner: true})),
    on(WalletActions.connectWalletSuccess, (state, {walletType}) => ({...state, spinner: false, connected: true, walletType})),
    on(WalletActions.connectWalletError, state => ({...state, spinner: false, connected: false})),
    on(WalletActions.disconnectWallet, state => ({...state, connected: false, account: '', chainId: undefined, walletType: WalletType.none})),
    on(WalletActions.accountsChanged, (state, {account, chainId}) => ({...state, account, chainId})),
    on(WalletActions.chainChanged, (state, {chainId}) => ({...state, chainId})),
    on(WalletActions.setWalletAddress,
        (state, {walletAddress}) => ({...state, walletAddress: walletAddress})),
    on(WalletActions.usdcPerStageByUser, (state, {numberOfUsdc}) => ({...state, usdcPerStage: numberOfUsdc})),
    on(WalletActions.showSpinner, state => ({...state, spinner: true})),
    on(WalletActions.hideSpinner, state => ({...state, spinner: false})),
    on(WalletActions.showWallets, state => ({...state, showWallets: true})),
    on(WalletActions.hideWallets, state => ({...state, showWallets: false}))
);

export function reducer(state: WalletState | undefined, action: Action) {
    return walletReducer(state, action);
}