import { WalletType } from '@crypto-mayhem-frontend/crypto-mayhem/data-access/wallet-model';
import { Action, createReducer, on } from '@ngrx/store';

import * as WalletActions from './wallet.actions';

export const walletKey = 'wallets';

export interface WalletState {
  account: string;
  chainId: string | undefined;
  connected: boolean;
  spinner: boolean;
  walletType: WalletType;
  usdcPerStage: string;
  adriaPerStage: number;
  canBuyMore: boolean;
  showWallets: boolean;
  closeWallets: boolean | undefined;
  showCcProfile: boolean | undefined;
  showSummary: boolean;
  loading: boolean;
  tokensSoldPerStage: number;
  maxAdriaTokenAmount: number;
  bnbBalanceOf: number;
  language: string;
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
  closeWallets: true,
  showCcProfile: false,
  showSummary: false,
  loading: false,
  tokensSoldPerStage: 0,
  maxAdriaTokenAmount: 0,
  bnbBalanceOf: 0,
  language: 'en',
};

export const walletReducer = createReducer(
  initialState,
  on(WalletActions.connectWallet, (state) => ({ ...state, spinner: true })),
  on(WalletActions.connectWalletSuccess, (state, { walletType }) => ({
    ...state,
    spinner: false,
    connected: true,
    walletType,
  })),
  on(WalletActions.connectWalletError, (state) => ({
    ...state,
    spinner: false,
    connected: false,
  })),
  on(WalletActions.disconnectWallet, (state) => ({
    ...state,
    connected: false,
    account: '',
    chainId: undefined,
    walletType: WalletType.none,
  })),
  on(WalletActions.accountsChanged, (state, { account }) => ({
    ...state,
    account,
  })),
  on(WalletActions.chainChanged, (state, { chainId }) => ({
    ...state,
    chainId,
  })),
  on(WalletActions.setWalletAddress, (state, { walletAddress }) => ({
    ...state,
    walletAddress: walletAddress,
  })),
  on(
    WalletActions.usdcPerStageByUser,
    (state, { numberOfUsdc, numberOfAdria, showSummary, canBuyMore }) => ({
      ...state,
      usdcPerStage: numberOfUsdc,
      adriaPerStage: numberOfAdria,
      showSummary,
      canBuyMore,
    })
  ),
  on(
    WalletActions.tokensPerStage,
    (state, { tokensSoldPerStage, maxAdriaTokenAmount }) => ({
      ...state,
      tokensSoldPerStage: tokensSoldPerStage,
      maxAdriaTokenAmount: maxAdriaTokenAmount,
    })
  ),
  on(WalletActions.showSpinner, (state) => ({ ...state, spinner: true })),
  on(WalletActions.hideSpinner, (state) => ({ ...state, spinner: false })),
  on(WalletActions.showWallets, (state, { close, showCcProfile }) => ({ ...state, showWallets: true, closeWallets: close === false ? close : true, showCcProfile: showCcProfile === true ? showCcProfile : false })),
  on(WalletActions.hideWallets, (state) => ({ ...state, showWallets: false, closeWallets: true })),
  on(WalletActions.hideSummary, (state) => ({
    ...state,
    showSummary: false,
    usdcPerStage: '0.0',
    adriaPerStage: 0.0,
    canBuyMore: true,
  })),
  on(WalletActions.transaction, (state) => ({ ...state, loading: true })),
  on(WalletActions.transactionSuccess, (state) => ({
    ...state,
    loading: false,
  })),
  on(WalletActions.getBnbBalance,(state, { bnbBalanceOf }) => ({...state, bnbBalanceOf })),
  on(WalletActions.setLanguage, (state, { language }) => ({ ...state, language }))
);

export function reducer(state: WalletState | undefined, action: Action) {
  return walletReducer(state, action);
}
