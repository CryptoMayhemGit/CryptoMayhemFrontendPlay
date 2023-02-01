import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DAOFacade } from "@crypto-mayhem-frontend/crypto-mayhem/data-access/dao";
import { DaoTopic } from '@crypto-mayhem-frontend/crypto-mayhem/data-access/dao-model';
import { map, Observable, take } from 'rxjs';

@Component({
  selector: 'ui-dao-history',
  templateUrl: './dao-history.component.html',
  styleUrls: ['./dao-history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DaoHistoryComponent implements OnInit {

  daoHistoryTopics$!: Observable<DaoTopic[]>;
  daoShortHistoryTopics$!: Observable<{id: number, name: string}[]>;
  choiceDaoHistoryTopicId = 1;
  choiceDaoHistoryTopic: DaoTopic | undefined = undefined;
  scrollDistance = 2;
  scrollThrottle = 50;
  skip = 0;
  take = 20;

  constructor(
    private readonly daoFacade: DAOFacade,
  ) {
    this.daoHistoryTopics$ = this.daoFacade.daoAllHistoricTopics$;
    this.daoShortHistoryTopics$ = this.daoFacade.daoAllHistoricTopics$
    .pipe(
      map((topics) => topics.map((topic) => ({id: topic.id, name: topic.name}))
    ));
  }

  ngOnInit(): void {
    this.daoFacade.daoAllHistoricTopics$
    .pipe(
      take(1)
    ).subscribe((topics) => {
      this.choiceDaoHistoryTopic = topics[0];
    });
  }

  trackById(index:number, el:any): number {
    return el.id;
  }

  onScroll() {
    this.skip += this.take;
    this.take += this.take;
    this.daoFacade.getDaoAllHistoricTopics(this.skip, this.take);
  }

  onQuestionClick(id: number) {
    this.daoFacade.getDaoHistoryTopicById(id)
    .subscribe((dao) => {
      this.choiceDaoHistoryTopic = dao;
    })
  }
}
