import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WalletFacade } from '@crypto-mayhem-frontend/crypto-mayhem/data-access/wallet';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'ui-dao-info',
  templateUrl: './dao-info.component.html',
  styleUrls: ['./dao-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DaoInfoComponent {
  walletConnected$: Observable<boolean> = of(false);

  constructor(public readonly walletFacade: WalletFacade) {
    this.walletConnected$ = this.walletFacade.connected$;
  }

  connect() {
    this.walletFacade.showWallets();
  }
}
