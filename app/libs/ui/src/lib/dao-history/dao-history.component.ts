import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DAOFacade } from "@crypto-mayhem-frontend/crypto-mayhem/data-access/dao";
import { DaoTopic } from '@crypto-mayhem-frontend/crypto-mayhem/data-access/dao-model';
import { map, Observable, of, take } from 'rxjs';

@Component({
  selector: 'ui-dao-history',
  templateUrl: './dao-history.component.html',
  styleUrls: ['./dao-history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DaoHistoryComponent implements OnInit {

  spinnerSmall$: Observable<boolean> = of(false);
  spinnerLarge$: Observable<boolean> = of(true);
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
    this.spinnerSmall$ = this.daoFacade.daoSmallSpinner$;
    this.spinnerLarge$ = this.daoFacade.daoLargeSpinner$;
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

  public trackById(index:number, el:any): number {
    return el.id;
  }

  public onScroll() {
    this.skip += this.take;
    this.take += this.take;
    this.daoFacade.getDaoAllHistoricTopics(this.skip, this.take);
  }

  public onQuestionClick(id: number): void {
    this.daoFacade.getDaoHistoryTopicById(id)
    .subscribe((dao) => {
      this.choiceDaoHistoryTopic = dao;
    })
  }

  public makeShorterAnswer(answer: string): string {
    return answer.length > 18 ? answer.slice(0, 18) + '...' : answer;
  }
}
