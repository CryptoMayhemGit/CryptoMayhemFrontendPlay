import { Component, OnInit } from '@angular/core';
import { WalletFacade } from '@crypto-mayhem-frontend/crypto-mayhem/data-access/wallet';
import { getBrowserLang, TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'crypto-mayhem-app',
  template: `
    <ui-notifications></ui-notifications>
    <ui-nav></ui-nav>
    <router-outlet></router-outlet>
    <ui-wallet-choice
      *ngIf="walletFacade.showWallets$ | async"
    ></ui-wallet-choice>
  `,
})
export class AppComponent implements OnInit {
  constructor(
    public walletFacade: WalletFacade,
    private translocoService: TranslocoService,
  ) {}

  ngOnInit() {
    this.translocoService.setActiveLang(getBrowserLang());
  }
}
