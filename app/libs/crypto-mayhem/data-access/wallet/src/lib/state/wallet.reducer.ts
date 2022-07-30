import { WalletType } from "@crypto-mayhem-frontend/crypto-mayhem/data-access/wallet-model";
import { Action, createReducer, on } from "@ngrx/store";

import * as WalletActions from './wallet.actions';

export const walletKey = 'wallets';

export interface WalletState {
    account: string,
    chainId: string | undefined,
    connected: boolean,
    spinner: boolean,
    walletType: WalletType
    usdcPerStage: string,
    adriaPerStage: number,
    canBuyMore:boolean,
    showWallets: boolean,
    showSummary: boolean,
}

export const initialState: WalletState = {
    account: '',
    chainId: undefined,
    connected: false,
    spinner: false,
    walletType: WalletType.none,
    usdcPerStage: '0.0',
    adriaPerStage: 0.0,
    canBuyMore: true,
    showWallets: false,
    showSummary: false,
}

export const walletReducer = createReducer(
    initialState,
    on(WalletActions.connectWallet, state => ({...state, spinner: true})),
    on(WalletActions.connectWalletSuccess, (state, {walletType}) => ({...state, spinner: false, connected: true, walletType})),
    on(WalletActions.connectWalletError, state => ({...state, spinner: false, connected: false})),
    on(WalletActions.disconnectWallet, state => ({...state, connected: false, account: '', chainId: undefined, walletType: WalletType.none})),
    on(WalletActions.accountsChanged, (state, {account}) => ({...state, account})),
    on(WalletActions.chainChanged, (state, {chainId}) => ({...state, chainId})),
    on(WalletActions.setWalletAddress,
        (state, {walletAddress}) => ({...state, walletAddress: walletAddress})),
    on(WalletActions.usdcPerStageByUser, (state, {numberOfUsdc, numberOfAdria, showSummary, canBuyMore}) => ({...state, usdcPerStage: numberOfUsdc, adriaPerStage: numberOfAdria, showSummary, canBuyMore })),
    on(WalletActions.showSpinner, state => ({...state, spinner: true})),
    on(WalletActions.hideSpinner, state => ({...state, spinner: false})),
    on(WalletActions.showWallets, state => ({...state, showWallets: true})),
    on(WalletActions.hideWallets, state => ({...state, showWallets: false})),
    on(WalletActions.hideSummary, state => ({...state, showSummary: false, usdcPerStage: '0.0', adriaPerStage: 0.0, canBuyMore: true}))
);

export function reducer(state: WalletState | undefined, action: Action) {
    return walletReducer(state, action);
}