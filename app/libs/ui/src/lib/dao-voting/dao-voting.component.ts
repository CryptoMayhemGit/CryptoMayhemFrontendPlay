import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WalletFacade } from '@crypto-mayhem-frontend/crypto-mayhem/data-access/wallet';
import { Observable, of, tap } from 'rxjs';
import { DAOFacade } from "@crypto-mayhem-frontend/crypto-mayhem/data-access/dao";
import { DaoAnswer, DaoTopic } from '@crypto-mayhem-frontend/crypto-mayhem/data-access/dao-model';

@Component({
  selector: 'ui-dao-voting',
  templateUrl: './dao-voting.component.html',
  styleUrls: ['./dao-voting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DaoVotingComponent{
  form!: FormGroup;
  daoTopics$!: Observable<DaoTopic[]>;
  walletConnected$: Observable<boolean> = of(false);
  tabs: string[] = [];
  activeTab = 0;
  numberOfTabs = 0;
  index = 0;

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

  public connect(): void {
    this.walletFacade.showWallets();
  }

  public answersOrderByVotesCount(answers: DaoAnswer[]): DaoAnswer[] {
    return answers.sort((a, b) => b.voteCount - a.voteCount);
  }

  public answersOrderByOrder(answers: DaoAnswer[]): DaoAnswer[] {
    return answers.sort((a, b) => a.orderId - b.orderId);
  }

  public onSubmit(): void {
    console.log("this.voteForm.value: ", this.form.value)
  }

  public getTimeFromDate(date: Date): number {
    return new Date(date).getTime();
  }

  public setTabs(length: number): void {
    this.numberOfTabs = length;
    for (let i = 1; i <= length; i++) {
      this.tabs.push('Question ' + i);
    }
  }

  public checkIfHighestVoteCount(answers: DaoAnswer[]): boolean {
    return answers[0].voteCount > answers[1].voteCount;
  }

  public countTab(index: number): number {
    index++;
    return index--;
  }
}
