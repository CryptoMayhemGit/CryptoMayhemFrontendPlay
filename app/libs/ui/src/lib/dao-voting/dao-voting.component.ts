import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WalletFacade } from '@crypto-mayhem-frontend/crypto-mayhem/data-access/wallet';
import { Observable, of } from 'rxjs';
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

  constructor(
    public readonly walletFacade: WalletFacade,
    public readonly daoFacade: DAOFacade,
    private fb: FormBuilder) {
    this.walletConnected$ = this.walletFacade.connected$;
    this.daoTopics$ = this.daoFacade.daoAllActiveTopics$;

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
}
