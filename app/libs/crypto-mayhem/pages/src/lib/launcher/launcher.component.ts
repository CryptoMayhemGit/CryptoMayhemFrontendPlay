import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { WalletFacade } from '@crypto-mayhem-frontend/crypto-mayhem/data-access/wallet';
import { Observable, Subject, takeUntil, tap } from 'rxjs';

@Component({
  template: `<div></div>`,
  styles: [`
    div {
      height: 300px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LauncherComponent implements OnInit, OnDestroy {

  account$!: Observable<string>
  private destroyed$ = new Subject<void>();

  constructor(
    private walletFacade: WalletFacade
  ) {
    this.account$ = this.walletFacade.account$
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  ngOnInit(): void {
    this.walletFacade.showWallets(false);

    this.account$.pipe(
      takeUntil(this.destroyed$),
      tap(
        (account) => {
            const message: {wallet: string, nonce: number} = {
              wallet: account,
              nonce: Date.now()
            }

            if(account) { this.signMessage(message) }
        }
      )
    ).subscribe();
  }

  signMessage(message:  {wallet: string, nonce: number}) {
    this.walletFacade.signMessage(message);
  }

}
