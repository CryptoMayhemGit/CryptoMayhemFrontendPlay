import { Component } from '@angular/core';
import { getBrowserLang, TranslocoService } from '@ngneat/transloco';
import { WalletFacade } from 'libs/crypto-mayhem/data-access/wallet/src/lib/facades/wallet.facade';

@Component({
  selector: 'crypto-mayhem-app',
  template: `
    <ui-modal-drone></ui-modal-drone>
    <ui-nav></ui-nav>
    <router-outlet></router-outlet>
    <ui-notification></ui-notification>
    <ui-wallet-choice
      *ngIf="walletFacade.showWallets$ | async"
    ></ui-wallet-choice>
  `,
})
export class AppComponent {
  constructor(
    public walletFacade: WalletFacade,
    private translocoService: TranslocoService
  ) {}

  ngOnInit() {
    this.translocoService.setActiveLang(getBrowserLang());
  }
}
