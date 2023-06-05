import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { DAOFacade } from "@crypto-mayhem-frontend/crypto-mayhem/data-access/dao";
import { DaoTopic } from "@crypto-mayhem-frontend/crypto-mayhem/data-access/dao-model";
import { WalletFacade } from "@crypto-mayhem-frontend/crypto-mayhem/data-access/wallet";
import { Observable, of } from "rxjs";

@Component({
    selector: 'ui-dao-voting-detail',
    templateUrl: './dao-voting-detail.component.html',
    styleUrls: ['./dao-voting-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DaoVotingDetailComponent {
    @Input() topic!: DaoTopic;

    form!: FormGroup;
    walletConnected$: Observable<boolean> = of(false);
    spinnerSmall$: Observable<boolean> = of(false);
    votingSuccess$: Observable<boolean> = of(false);

    myAnswer = 0;

    constructor(
        public readonly walletFacade: WalletFacade,
        public readonly daoFacade: DAOFacade,
        private fb: FormBuilder
    ) {
        this.walletConnected$ = this.walletFacade.connected$;
        this.spinnerSmall$ = this.daoFacade.daoSmallSpinner$;
        this.votingSuccess$ = this.daoFacade.daoVotingSuccess$;
        this.form = this.fb.group({
            answer: [0]
        });
    }

    public getTimeFromDate(date: Date): number {
        return new Date(date).getTime();
    }

    public connect(): void {
        this.walletFacade.showWallets();
    }

    public onSubmit(): void {
        this.daoFacade.postDaoVoteWithSignature(this.topic.id, this.form.value['answer'], new Date().getTime());
    }

    public onQuestionClick(answerId: number): void {
        this.myAnswer = answerId;
        this.form.patchValue({ answer: answerId });
    }

    public newLineParser(text: string | undefined): string[] {
        if (!text) {
          return [];
        }

        if (text.includes('\n')) {
          return text.split('\n');
        }

        if (text.includes('<br>')) {
          return text.split('<br>');
        }

        return [text];
      }
}