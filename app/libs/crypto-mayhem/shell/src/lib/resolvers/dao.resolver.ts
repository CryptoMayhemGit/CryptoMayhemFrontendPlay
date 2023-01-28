import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { DAOFacade } from "@crypto-mayhem-frontend/crypto-mayhem/data-access/dao";

@Injectable({providedIn: 'root'})
export class DaoResolver implements Resolve<boolean> {
  constructor(private daoFacade: DAOFacade) {}

  resolve(route: ActivatedRouteSnapshot) {
    this.daoFacade.getDaoAllActiveTopics();
    this.daoFacade.getDaoAllHistoricTopics(0, 50);
    return true;
  }
}