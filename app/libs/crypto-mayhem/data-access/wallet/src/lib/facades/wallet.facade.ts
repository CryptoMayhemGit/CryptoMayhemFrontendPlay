import { Injectable } from '@angular/core';
import {
  getWalletInstance,
  WalletType,
} from '@crypto-mayhem-frontend/crypto-mayhem/data-access/wallet-model';
import { Store } from '@ngrx/store';
import {
  hideSpinner,
  hideWallets,
  setWalletAddress,
  showSpinner,
  showWallets,
} from '../state/wallet.actions';

import * as WalletSelectors from '../state/wallet.selectors';

@Injectable({ providedIn: 'root' })
export class WalletFacade {
  readonly wallet$ = this.store.select(WalletSelectors.getWalletAddress);
  readonly spinner$ = this.store.select(WalletSelectors.getSpinnerState);
  readonly showWallets$ = this.store.select(WalletSelectors.getShowWallets);

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
    this.showSpinner();
    getWalletInstance(walletType)
      ?.connect()
      .subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          this.hideSpinner();
        }
      });
  }

  public disconnectWalletAccount(walletType: WalletType) {
    getWalletInstance(walletType).disconnect()
    .subscribe(() => console.log('ok'));
  }

  public onConnectWallet() {}

  public showWallets() {
    this.store.dispatch(showWallets());
  }

  public hideWallets() {
    this.store.dispatch(hideWallets());
  }
}
