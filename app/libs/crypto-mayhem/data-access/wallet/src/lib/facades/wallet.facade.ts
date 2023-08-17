import { Injectable } from '@angular/core';
import { WalletType } from '@crypto-mayhem-frontend/crypto-mayhem/data-access/wallet-model';
import { Store } from '@ngrx/store';
import { WalletService } from '../services/wallet.service';
import WalletConnect from '@walletconnect/client';

import {
  hideSpinner,
  hideWallets,
  postSignWalletBeforeBuy,
  setLanguage,
  setWalletAddress,
  showSpinner,
  showWallets,
  signMessageForLauncher,
  showMetaproQr,
} from '../state/wallet.actions';

import * as WalletSelectors from '../state/wallet.selectors';

@Injectable({ providedIn: 'root' })
export class WalletFacade {
  readonly spinner$ = this.store.select(WalletSelectors.getSpinnerState);
  readonly showWallets$ = this.store.select(WalletSelectors.getShowWallets);
  readonly closeWallets$ = this.store.select(WalletSelectors.getCloseWallets);
  readonly showCcProfile$ = this.store.select(WalletSelectors.getShowCcProfile);
  readonly account$ = this.store.select(WalletSelectors.getAccount);
  readonly chainId$ = this.store.select(WalletSelectors.getChainId);
  readonly connected$ = this.store.select(WalletSelectors.getWalletConnected);
  readonly usdcPerStage$ = this.store.select(WalletSelectors.getUsdcPerStage);
  readonly adriaPerStage$ = this.store.select(WalletSelectors.getAdriaPerStage);
  readonly showSummary$ = this.store.select(WalletSelectors.getShowSummary);
  readonly canBuyMore$ = this.store.select(WalletSelectors.getCanBuyMore);
  readonly loadingButton$ = this.store.select(WalletSelectors.getLoadingButton);
  readonly tokensSoldPerStage$ = this.store.select(
    WalletSelectors.getTokensSoldPerStage
  );
  readonly allTokensPerStage$ = this.store.select(
    WalletSelectors.getAllTokensPerStage
  );
  readonly bnbBalanceOf$ = this.store.select(
    WalletSelectors.bnbBalanceOf
  );
  readonly walletType$ = this.store.select(WalletSelectors.getWalletType);
  readonly showMetaproQr$ = this.store.select(WalletSelectors.getShowMetaproQr);
  readonly metaproConnector: WalletConnect | undefined = undefined;

  constructor(
    private readonly store: Store,
    private readonly walletService: WalletService,
  ) {
  }

  public setWalletAddress(walletAddress: string): void {
    this.store.dispatch(setWalletAddress({ walletAddress }));
  }

  public showSpinner(): void {
    this.store.dispatch(showSpinner());
  }

  public hideSpinner(): void {
    this.store.dispatch(hideSpinner());
  }

  public connectWalletAccount(walletType: WalletType): void {
    this.walletService.connectWallet(walletType);
  }

  public disconnectWalletAccount(): void {
    this.walletService.disconnectWallet();
  }

  public showWallets(close?: boolean, showCcProfile? : boolean): void {
    this.store.dispatch(showWallets({ close, showCcProfile }));
  }

  public hideWallets(): void {
    this.store.dispatch(hideWallets());
  }

  public buyPreSaleTokens(amount: number): void {
    this.store.dispatch(postSignWalletBeforeBuy({ amount }));
  }

  public getBalance(): void {
    this.walletService.getBalance();
  }

  public signMessage(data: {wallet: string, nonce: number, handle?: string}): void {
    this.store.dispatch(signMessageForLauncher({ wallet: data.wallet, nonce: data.nonce, handle: data.handle }));
  }

  public setLanguage(language: string): void {
    this.store.dispatch(setLanguage({ language }));
  }

  public getQRCodeUrl(): string {
    return this.walletService.getQRCodeURl();
  }

  public connectMetaPro(): void {
    this.walletService.connectMetaProWallet();
  }

  public showMetaproQr(show: boolean): void {
    this.store.dispatch(showMetaproQr({ showMetaproQr: show }));
  }
}
