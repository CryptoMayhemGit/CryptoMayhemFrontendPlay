import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { WalletFacade } from "@crypto-mayhem-frontend/crypto-mayhem/data-access/wallet";
import { Observable, Subject, takeUntil, tap } from "rxjs";

@Component({
    templateUrl: './ccProfile.component.html',
    styleUrls: ['./ccProfile.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CcProfileComponent implements OnInit, OnDestroy {
    handle = '';
    account$!: Observable<string>
    show = true;
    private destroyed$ = new Subject<void>();
    formGroup!: FormGroup;

    constructor(
        private walletFacade: WalletFacade,
        private readonly formBuilder: FormBuilder
    ) {
        this.account$ = this.walletFacade.account$
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    ngOnInit(): void {
        this.formGroup = this.formBuilder.group({
            handle: ['', [Validators.required]]
        });

        this.account$.pipe(
        takeUntil(this.destroyed$),
        tap(
            (account) => {
                 const message: {wallet: string, nonce: number, handle: string} = {
                    wallet: account,
                    nonce: Date.now(),
                    handle: this.handle
                 }
                 if(account) { this.signMessage(message) }
            }
        )
        ).subscribe();
    }

    signMessage(message:  {wallet: string, nonce: number, handle: string}) {
        this.walletFacade.signMessage(message);
    }

    public onSubmit() {
        if (this.formGroup.valid){
            this.handle = this.formGroup.value.handle;
            this.show = false;
            this.walletFacade.showWallets(false, false);
        }

    }
}