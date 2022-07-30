import { Injectable } from '@angular/core';
import { WalletType } from '@crypto-mayhem-frontend/crypto-mayhem/data-access/wallet-model';
import { Store } from '@ngrx/store';
import { WalletService } from '../services/wallet.service';

import {
  hideSpinner,
  hideWallets,
  postSignWalletBeforeBuy,
  setWalletAddress,
  showSpinner,
  showWallets,
} from '../state/wallet.actions';

import * as WalletSelectors from '../state/wallet.selectors';

@Injectable({ providedIn: 'root' })
export class WalletFacade {
  readonly spinner$ = this.store.select(WalletSelectors.getSpinnerState);
  readonly showWallets$ = this.store.select(WalletSelectors.getShowWallets);

  readonly account$ = this.store.select(WalletSelectors.getAccount);
  readonly chainId$ = this.store.select(WalletSelectors.getChainId);
  readonly connected$ = this.store.select(WalletSelectors.getWalletConnected);
  readonly usdcPerStage$ = this.store.select(WalletSelectors.getUsdcPerStage);
  readonly canBuy$ = this.store.select(WalletSelectors.getCanBuy);
  readonly numberOfAdria$ = this.store.select(WalletSelectors.getNumberOfAdria);

  constructor(
    private readonly store: Store,
    private readonly walletService: WalletService
  ) {}

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

  public disconnectWalletAccount(walletType: WalletType) {
    this.walletService.disconnectWallet();
  }

  public showWallets() {
    this.store.dispatch(showWallets());
  }

  public hideWallets() {
    this.store.dispatch(hideWallets());
  }

  public buyPreSaleTokens(amount: number) {
    this.store.dispatch(postSignWalletBeforeBuy({ amount }));
  }
}
