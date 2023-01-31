import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DAOFacade } from "@crypto-mayhem-frontend/crypto-mayhem/data-access/dao";
import { DaoTopic } from '@crypto-mayhem-frontend/crypto-mayhem/data-access/dao-model';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'ui-dao-history',
  templateUrl: './dao-history.component.html',
  styleUrls: ['./dao-history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DaoHistoryComponent {

  daoHistoryTopics$!: Observable<DaoTopic[]>;
  daoShortHistoryTopics$!: Observable<{id: number, name: string}[]>;
  choiceDaoHistoryTopicId = 1;
  choiceDaoHistoryTopic: DaoTopic | undefined = undefined;

  constructor(
    private readonly daoFacade: DAOFacade,
  ) {
    this.daoHistoryTopics$ = this.daoFacade.daoAllHistoricTopics$;
    this.daoShortHistoryTopics$ = this.daoFacade.daoAllHistoricTopics$
    .pipe(
      map((topics) => topics.map((topic) => ({id: topic.id, name: topic.name}))
    ));
  }

  trackById(index:number, el:any): number {
    return el.id;
  }

  // Dummy implementation of infinite scroll
  onScroll() {
    const newQuestions = [
      {
        "id": Math.random(),
        "title": "Question 5"
      },
      {
        "id": Math.random(),
        "title": "Question 6"
      },
      {
        "id": Math.random(),
        "title": "Q7"
      }
    ]
    console.log('scrolled down!!');
    //this.questions.push(...newQuestions);
  }

  onQuestionClick(id: number) {
    this.daoFacade.getDaoHistoryTopicById(id)
    .subscribe((dao) => {
      console.log(dao);
      this.choiceDaoHistoryTopic = dao;
    })
  }
}
