import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppConfig, APP_CONFIG } from '@crypto-mayhem-frontend/crypto-mayhem/config';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { WalletFacade } from 'libs/crypto-mayhem/data-access/wallet/src/lib/facades/wallet.facade';
import { map, Observable, of } from 'rxjs';

@Component({
  selector: 'ui-pre-sale',
  templateUrl: './pre-sale.component.html',
  styleUrls: ['./pre-sale.component.scss'],
})
export class PreSaleComponent implements OnInit {
  formGroup: FormGroup;
  walletConnected$: Observable<boolean> = of(false);
  usdcPerStage$: Observable<string> = of('0.0');
  presaleStartTime = new Date('JUL 30, 2022, 00:16').getTime();
  caretRight = faCaretRight;
  presale = true;
  details = [
    'PRESALE.INFO.DETAILS.1',
    'PRESALE.INFO.DETAILS.2',
    'PRESALE.INFO.DETAILS.3',
    'PRESALE.INFO.DETAILS.4',
    'PRESALE.INFO.DETAILS.5',
    'PRESALE.INFO.DETAILS.6',
    'PRESALE.INFO.DETAILS.7',
  ];
  maxUsdcToBuy: number;

  constructor(
    private readonly formBuilder: FormBuilder,
    public readonly walletFacade: WalletFacade,
    @Inject(APP_CONFIG) private readonly appConfig: AppConfig
  ) {
    this.formGroup = this.createFormGroup();
    this.walletConnected$ = this.walletFacade.connected$;
    this.maxUsdcToBuy = this.appConfig.maxNumberOfUsdcPerStage;
    this.usdcPerStage$ = this.walletFacade.usdcPerStage$;
  }

  ngOnInit(): void {
    this.calcMaxNumberOfAdria();
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      amount: [
        '',
        [Validators.required, Validators.min(1), Validators.max(1000)],
      ],
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

  connect(): void {
    this.walletFacade.showWallets();
  }

  calcMaxNumberOfAdria() {
    this.usdcPerStage$.pipe(
      map((numberOfUsdc) => {
        return this.appConfig.maxNumberOfUsdcPerStage - Number(numberOfUsdc);
      })
    ).subscribe((result) => this.maxUsdcToBuy = result);
  }
}
