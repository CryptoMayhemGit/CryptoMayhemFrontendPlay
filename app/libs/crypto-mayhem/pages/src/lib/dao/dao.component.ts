import { Component } from '@angular/core';
import { WalletFacade } from '@crypto-mayhem-frontend/crypto-mayhem/data-access/wallet';
import { Observable, of } from 'rxjs';

@Component({
  templateUrl: './dao.component.html',
  styleUrls: ['./dao.component.scss'],
})
export class DaoComponent{
  tabs: string[] = ['DAO.TABS.INFO', 'DAO.TABS.VOTING', 'DAO.TABS.HISTORY'];
  activeTab = 0;

  walletConnected$: Observable<boolean> = of(false);

  constructor(public readonly walletFacade: WalletFacade) {
    this.walletConnected$ = this.walletFacade.connected$;
  }

  connect() {
    this.walletFacade.showWallets();
  }

}
