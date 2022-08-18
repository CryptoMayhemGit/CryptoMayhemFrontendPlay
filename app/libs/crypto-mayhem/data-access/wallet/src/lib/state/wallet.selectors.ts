import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromWallets from './wallet.reducer';

export const selectWallet = createFeatureSelector<fromWallets.WalletState>(
  fromWallets.walletKey
);

export const getSpinnerState = createSelector(
  selectWallet,
  (state) => state.spinner
);

export const getShowWallets = createSelector(
  selectWallet,
  (state) => state.showWallets
);

export const getAccount = createSelector(
  selectWallet,
  (state) => state.account
);

export const getChainId = createSelector(
  selectWallet,
  (state) => state.chainId
);

export const getWalletConnected = createSelector(
  selectWallet,
  (state) => state.connected
);

export const getWalletType = createSelector(
  selectWallet,
  (state) => state.walletType
);

export const getUsdcPerStage = createSelector(
  selectWallet,
  (state) => state.usdcPerStage
);

export const getShowSummary = createSelector(
  selectWallet,
  (state) => state.showSummary
);

export const getAdriaPerStage = createSelector(
  selectWallet,
  (state) => state.adriaPerStage
);

export const getCanBuyMore = createSelector(
  selectWallet,
  (state) => state.canBuyMore
);

export const getLoadingButton = createSelector(
  selectWallet,
  (state) => state.loading
);

export const getTokensSoldPerStage = createSelector(
  selectWallet,
  (state) => state.tokensSoldPerStage
);

export const getAllTokensPerStage = createSelector(
  selectWallet,
  (state) => state.maxAdriaTokenAmount
);
