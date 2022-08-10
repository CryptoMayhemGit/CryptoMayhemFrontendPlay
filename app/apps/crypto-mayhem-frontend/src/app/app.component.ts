import { Component } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
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
    private translocoService: TranslocoService,
    private route: ActivatedRoute,
    private router: Router) {
    //translocoService.setActiveLang(getBrowserLang());
  }

  ngOnInit() {
    this.router.events.subscribe(val => {
      if (val instanceof RoutesRecognized && (val as RoutesRecognized)?.state?.root.firstChild.params.lang) {
        this.translocoService.setActiveLang(val.state.root.firstChild.params.lang);      } else {
        this.translocoService.setActiveLang(getBrowserLang());
      }
  });
  }
}
