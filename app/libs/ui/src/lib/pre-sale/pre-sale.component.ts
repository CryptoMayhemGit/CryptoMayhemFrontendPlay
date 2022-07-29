import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {
  AppConfig,
  APP_CONFIG,
} from '@crypto-mayhem-frontend/crypto-mayhem/config';
import {
  faCaretRight,
  faCircleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { WalletFacade } from 'libs/crypto-mayhem/data-access/wallet/src/lib/facades/wallet.facade';
import { map, Observable, of } from 'rxjs';

@Component({
  selector: 'ui-pre-sale',
  templateUrl: './pre-sale.component.html',
  styleUrls: ['./pre-sale.component.scss'],
})
export class PreSaleComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({
    amount: new FormControl(''),
  });
  walletConnected$: Observable<boolean> = of(false);
  usdcPerStage$: Observable<string> = of('0.0');
  presaleStartTime = new Date('AUG 06, 2022, 16:00').getTime();
  caretRight = faCaretRight;
  circleExclamation = faCircleExclamation;
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
        [
          Validators.required,
          Validators.min(1),
          Validators.max(this.maxUsdcToBuy),
        ],
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
    this.usdcPerStage$
      .pipe(
        map((numberOfUsdc) => {
          return this.appConfig.maxNumberOfUsdcPerStage - Number(numberOfUsdc);
        })
      )
      .subscribe((result) => {
        this.maxUsdcToBuy = result;
        this.formGroup = this.createFormGroup();
      });
  }
}
