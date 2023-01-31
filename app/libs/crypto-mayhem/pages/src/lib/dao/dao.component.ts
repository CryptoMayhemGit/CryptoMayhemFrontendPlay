import { Component } from '@angular/core';
import { DAOFacade } from '@crypto-mayhem-frontend/crypto-mayhem/data-access/dao';
import { DaoTopic } from '@crypto-mayhem-frontend/crypto-mayhem/data-access/dao-model';
import { Observable, of } from 'rxjs';

@Component({
  templateUrl: './dao.component.html',
  styleUrls: ['./dao.component.scss'],
})
export class DaoComponent {
  tabs: string[] = ['DAO.TABS.INFO', 'DAO.TABS.VOTING', 'DAO.TABS.HISTORY'];
  activeTab = 2;
  allHistoricTopics$: Observable<DaoTopic[]> = of([]);

  constructor(
    private readonly daoFacade: DAOFacade,
  ) {
    this.allHistoricTopics$ = this.daoFacade.daoAllHistoricTopics$;
  }
}
