import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { DAOFacade } from "@crypto-mayhem-frontend/crypto-mayhem/data-access/dao";
import { take, tap } from "rxjs";

@Injectable({providedIn: 'root'})
export class DaoResolver implements Resolve<void> {
  constructor(
    private daoFacade: DAOFacade,
    ) {}

  resolve(route: ActivatedRouteSnapshot) {
    this.daoFacade.daoAllActiveTopics$
    .pipe(
      take(1),
      tap((topics) => {
        if (topics.length === 0) {
          this.daoFacade.getDaoAllActiveTopics();
          this.daoFacade.getDaoAllHistoricTopics(0, 20);
        }
      })
    ).subscribe();
  }

}