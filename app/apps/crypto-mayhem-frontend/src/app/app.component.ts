import { Component, OnInit } from '@angular/core';
import { WalletFacade } from '@crypto-mayhem-frontend/crypto-mayhem/data-access/wallet';
import { WalletType } from '@crypto-mayhem-frontend/crypto-mayhem/data-access/wallet-model';
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
    <ui-metapro-qr *ngIf="this.walletFacade.showMetaproQr$ | async"></ui-metapro-qr>
  `,
})
export class AppComponent implements OnInit {

  constructor(
    public walletFacade: WalletFacade,
    private translocoService: TranslocoService,
  ) {
  }

  ngOnInit() {
    this.translocoService.setActiveLang(getBrowserLang() as string);
  }

  public get walletType(): typeof WalletType {
    return WalletType;
}
}
