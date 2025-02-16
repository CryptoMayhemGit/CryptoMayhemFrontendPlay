import { Injectable } from '@angular/core';
import { WalletType } from '@crypto-mayhem-frontend/crypto-mayhem/data-access/wallet-model';
import { Store } from '@ngrx/store';
import { WalletService } from '../services/wallet.service';

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
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WalletFacade {
  public spinner$: Observable<boolean>;
  public showWallets$: Observable<boolean>;
  public closeWallets$: Observable<boolean | undefined>;
  public account$: Observable<string>;
  public chainId$: Observable<string | undefined>;
  public connected$: Observable<boolean>;
  public usdcPerStage$: Observable<string>;
  public adriaPerStage$: Observable<number>;
  public showSummary$: Observable<boolean>;
  public canBuyMore$: Observable<boolean>;
  public loadingButton$: Observable<boolean>;
  public tokensSoldPerStage$: Observable<number>;
  public allTokensPerStage$: Observable<number>;
  public bnbBalanceOf$: Observable<number>;
  public walletType$: Observable<WalletType>;
  public showMetaproQr$: Observable<boolean>;

  constructor(
    private readonly store: Store,
    private readonly walletService: WalletService,
  ) 
  {
    this.spinner$ = this.store.select(WalletSelectors.getSpinnerState);
    this.showWallets$ = this.store.select(WalletSelectors.getShowWallets);
    this.closeWallets$ = this.store.select(WalletSelectors.getCloseWallets);
    this.account$ = this.store.select(WalletSelectors.getAccount);
    this.chainId$ = this.store.select(WalletSelectors.getChainId);
    this.connected$ = this.store.select(WalletSelectors.getWalletConnected);
    this.usdcPerStage$ = this.store.select(WalletSelectors.getUsdcPerStage);
    this.adriaPerStage$ = this.store.select(WalletSelectors.getAdriaPerStage);
    this.showSummary$ = this.store.select(WalletSelectors.getShowSummary);
    this.canBuyMore$ = this.store.select(WalletSelectors.getCanBuyMore);
    this.loadingButton$ = this.store.select(WalletSelectors.getLoadingButton);
    this.tokensSoldPerStage$ = this.store.select( WalletSelectors.getTokensSoldPerStage );
    this.allTokensPerStage$ = this.store.select( WalletSelectors.getAllTokensPerStage );
    this.bnbBalanceOf$ = this.store.select( WalletSelectors.bnbBalanceOf );
    this.walletType$ = this.store.select(WalletSelectors.getWalletType);
    this.showMetaproQr$ = this.store.select(WalletSelectors.getShowMetaproQr);
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

  public showWallets(close?: boolean): void {
    this.store.dispatch(showWallets({ close }));
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

  public signMessage(data: {wallet: string, nonce: number}): void {
    this.store.dispatch(signMessageForLauncher({ wallet: data.wallet, nonce: data.nonce }));
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
