import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { WalletFacade } from '@crypto-mayhem-frontend/crypto-mayhem/data-access/wallet';
import { Observable, tap } from 'rxjs';

@Component({
  templateUrl: './launcher.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LauncherComponent implements OnInit {

  account$!: Observable<string>

  constructor(
    private walletFacade: WalletFacade
  ) {
    this.account$ = this.walletFacade.account$
  }

  ngOnInit(): void {
    this.walletFacade.showWallets();

    this.account$.pipe(
      tap(
        (account) => {
          const message = {
            wallet: account,
            nonce: Date.now()
          }
          if(account) { this.signMessage(JSON.stringify(message)) }
        }
      )
    ).subscribe();
  }

  signMessage(message: string) {
    this.walletFacade.signMessage(message);
  }

}
