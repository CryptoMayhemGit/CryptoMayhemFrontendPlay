import { Injectable } from '@angular/core';
import {
  getWalletInstance,
  MetaMaskWallet,
  WalletType,
} from '@crypto-mayhem-frontend/crypto-mayhem/data-access/wallet-model';
import { Store } from '@ngrx/store';
import {
  hideSpinner,
  setWalletAddress,
  showSpinner,
} from '../state/wallet.actions';

import * as WalletSelectors from '../state/wallet.selectors';

@Injectable({ providedIn: 'root' })
export class WalletFacade {
  readonly wallet$ = this.store.select(WalletSelectors.getWalletAddress);
  readonly spinner$ = this.store.select(WalletSelectors.getSpinnerState);

  constructor(private readonly store: Store) {}

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
    getWalletInstance(walletType)
      ?.connect()
      .then((data) => console.log('data', data))
      .catch(() => console.log('error'));
  }

  public disconnectWalletAccount(walletType: WalletType) {}
}
