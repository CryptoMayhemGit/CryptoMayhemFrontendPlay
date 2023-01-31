import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WalletFacade } from '@crypto-mayhem-frontend/crypto-mayhem/data-access/wallet';
import { Observable, of, tap } from 'rxjs';
import { DAOFacade } from "@crypto-mayhem-frontend/crypto-mayhem/data-access/dao";
import { DaoTopic } from '@crypto-mayhem-frontend/crypto-mayhem/data-access/dao-model';

@Component({
  selector: 'ui-dao-voting',
  templateUrl: './dao-voting.component.html',
  styleUrls: ['./dao-voting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DaoVotingComponent{
  votingTime = new Date(Date.UTC(2022, 11, 24, 15, 0, 0)).getTime();
  form!: FormGroup;
  daoTopics$!: Observable<DaoTopic[]>;
  walletConnected$: Observable<boolean> = of(false);
  tabs: string[] = [];
  activeTab = 0;
  numberOfTabs = 0;
  index = 0;

  daoFakeTopics: DaoTopic[] = [
    {
      id: 1,
      name: 'Pytanie 1 Co jest lepsze? Co może być jeszcze lepsze niż to?',
      description: 'Opis pytania 1',
      votesCount: 0,
      startDate: new Date(),
      endDate: new Date(),
      answerRankings: [
        {
          answerName: 'Odpowiedź 1',
          voteCount: 0,
          votePowerSum: 0
        },
        {
          answerName: 'Odpowiedź 2',
          voteCount: 0,
          votePowerSum: 0
        },
      ]
    },
    {
      id: 2,
      name: 'Pytanie 2',
      description: 'Opis pytania 2',
      votesCount: 0,
      startDate: new Date(),
      endDate: new Date(),
      answerRankings: [
        {
          answerName: 'Odpowiedź 2',
          voteCount: 0,
          votePowerSum: 0
        },
        {
          answerName: 'Odpowiedź 3',
          voteCount: 0,
          votePowerSum: 0
        },
      ]
    }];


  constructor(
    public readonly walletFacade: WalletFacade,
    public readonly daoFacade: DAOFacade,
    private fb: FormBuilder) {
    this.walletConnected$ = this.walletFacade.connected$;
    this.daoTopics$ = this.daoFacade.daoAllActiveTopics$;
    this.daoTopics$.pipe(
      tap((topics) => this.setTabs(topics.length))
      ).subscribe();

    this.form = this.fb.group({
      answer: ['']
    });
  }

  connect() {
    this.walletFacade.showWallets();
  }

  onSubmit() {
    console.log("this.voteForm.value: ", this.form.value)
  }

  setTabs(length: number) {
    this.numberOfTabs = length;
    for (let i = 1; i <= length; i++) {
      this.tabs.push('Pytanie ' + i);
    }
  }

  countTab(index: number) {
    index++;
    return index--;
  }
}
