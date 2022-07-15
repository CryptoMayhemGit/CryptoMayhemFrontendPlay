import { createFeatureSelector, createSelector } from "@ngrx/store";

import * as fromWallets from './wallet.reducer';

export const selectWallet = createFeatureSelector<fromWallets.WalletState>(fromWallets.walletKey);

export const getWalletAddress = createSelector(
    selectWallet,
    state => state.walletAddress
);