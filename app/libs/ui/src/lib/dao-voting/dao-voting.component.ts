import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WalletFacade } from '@crypto-mayhem-frontend/crypto-mayhem/data-access/wallet';
import { Observable, of, take } from 'rxjs';
import { DAOFacade } from "@crypto-mayhem-frontend/crypto-mayhem/data-access/dao";
import { DaoTopic } from '@crypto-mayhem-frontend/crypto-mayhem/data-access/dao-model';

@Component({
  selector: 'ui-dao-voting',
  templateUrl: './dao-voting.component.html',
  styleUrls: ['./dao-voting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DaoVotingComponent{

  spinnerSmall$: Observable<boolean> = of(false);
  spinnerLarge$: Observable<boolean> = of(true);
  daoTopics$!: Observable<DaoTopic[]>;
  tabs: string[] = [];
  activeTab = 0;
  numberOfTabs = 0;
  index = 0;

  constructor(
    public readonly walletFacade: WalletFacade,
    public readonly daoFacade: DAOFacade) {
    this.daoTopics$ = this.daoFacade.daoAllActiveTopics$;
    this.spinnerSmall$ = this.daoFacade.daoSmallSpinner$;
    this.spinnerLarge$ = this.daoFacade.daoLargeSpinner$;
    this.daoTopics$.pipe(
      take(1),
      ).subscribe(
        (topics) => {
          this.setTabs(topics.length);
        }
      );

  }

  public setTabs(length: number): void {
    this.numberOfTabs = length;
    for (let i = 1; i <= length; i++) {
      this.tabs.push('DAO.QUESTION');
    }
  }
}
