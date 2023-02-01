import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { DAOFacade } from "@crypto-mayhem-frontend/crypto-mayhem/data-access/dao";
import { WalletFacade } from "@crypto-mayhem-frontend/crypto-mayhem/data-access/wallet";

@Injectable({providedIn: 'root'})
export class DaoResolver implements Resolve<void> {
  constructor(
    private daoFacade: DAOFacade,
    private walletFacade: WalletFacade
    ) {}

  resolve(route: ActivatedRouteSnapshot) {
    this.daoFacade.getDaoAllActiveTopics();
    this.daoFacade.getDaoAllHistoricTopics(0, 20);
  }

}