import { Component } from '@angular/core';
import { WalletFacade } from 'libs/crypto-mayhem/data-access/wallet/src/lib/facades/wallet.facade';

@Component({
  selector: 'crypto-mayhem-app',
  template: `
    <div style="z-index:20;height:100%; width:100%;position:fixed;background:black;" *ngIf="walletFacade.spinner$ | async">
      <img style="display: block; margin-left:auto; margin-right:auto;margin-top:20em;" src="https://c.tenor.com/n8DB4bmpduIAAAAM/yeah-bwoi-grin.gif" alt="" srcset="">
    </div>
    <ui-nav></ui-nav>
    <router-outlet></router-outlet>
    <ui-notification></ui-notification>
    <ui-wallet-choice *ngIf="walletFacade.showWallets$ | async"></ui-wallet-choice>
  `,
})
export class AppComponent {
  constructor(
    public walletFacade: WalletFacade
  ) {}
}
