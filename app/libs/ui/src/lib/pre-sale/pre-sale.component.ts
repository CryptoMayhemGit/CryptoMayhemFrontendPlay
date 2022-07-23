import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { WalletFacade } from "libs/crypto-mayhem/data-access/wallet/src/lib/facades/wallet.facade";
import { Observable, of } from "rxjs";

@Component({
    selector: 'ui-pre-sale',
    templateUrl: './pre-sale.component.html',
    styleUrls: ['./pre-sale.component.scss']
})
export class PreSaleComponent implements OnInit {
    formGroup: FormGroup;
    walletConnected$: Observable<boolean> = of(false);

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly walletFacade: WalletFacade
    ) {
        this.formGroup = this.createFormGroup();
    }

    ngOnInit(): void {
        this.walletConnected$ = this.walletFacade.connected$;
    }

    createFormGroup(): FormGroup {
        return this.formBuilder.group({
            amount: [0, [Validators.required, Validators.min(1), Validators.max(1000)]]
        });
    }

    onBuy(): void {
        if (this.formGroup.valid) {
            const formValues = this.formGroup.getRawValue();
            this.walletFacade.buyPreSaleTokens(formValues.amount);
        } else {
            this.formGroup.markAllAsTouched();
        }
    }
}