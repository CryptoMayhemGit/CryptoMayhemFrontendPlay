import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  AppConfig,
  APP_CONFIG,
} from '@crypto-mayhem-frontend/crypto-mayhem/config';
import {
  faCaretRight
} from '@fortawesome/free-solid-svg-icons';
import { WalletFacade } from 'libs/crypto-mayhem/data-access/wallet/src/lib/facades/wallet.facade';
import { map, Observable, of } from 'rxjs';

@Component({
  templateUrl: './pre-sale.component.html',
  styleUrls: ['./pre-sale.component.scss'],
})
export class PreSaleComponent implements OnInit{
  formGroup!: FormGroup;
  walletConnected$: Observable<boolean> = of(false);
  usdcPerStage$: Observable<string> = of('0.0');
  adriaPerStage$: Observable<number> = of(0.0);
  showSummary$: Observable<boolean> = of(false);
  canBuyMore$: Observable<boolean> = of(true);
  //presaleEndTime = new Date(Date.UTC(2022, 11, 28, 10, 0, 0)).getTime();
  presaleStartTime = new Date(Date.UTC(2022, 11, 2, 6, 0, 0)).getTime();
  tokensSoldPerStage$: Observable<number> = of(0);
  allTokensPerStage$: Observable<number> = of(0);
  adriaPrice = 0;
  caretRight = faCaretRight;
  presale!: boolean;
  sold = false;
  timeUp = false;
  details = [
    'PRESALE.INFO.DETAILS.1',
    'PRESALE.INFO.DETAILS.2',
    'PRESALE.INFO.DETAILS.3',
    'PRESALE.INFO.DETAILS.4',
  ];
  maxUsdcToBuy: number;
  loadingButton$: Observable<boolean> = of(false);

  constructor(
    private readonly formBuilder: FormBuilder,
    public readonly walletFacade: WalletFacade,
    @Inject(APP_CONFIG) private readonly appConfig: AppConfig
  ) {
    this.walletConnected$ = this.walletFacade.connected$;
    this.maxUsdcToBuy = this.appConfig.maxNumberOfUsdcPerStage;
    this.adriaPrice = this.appConfig.adriaPrice;
    this.usdcPerStage$ = this.walletFacade.usdcPerStage$;
    this.adriaPerStage$ = this.walletFacade.adriaPerStage$;
    this.showSummary$ = this.walletFacade.showSummary$;
    this.canBuyMore$ = this.walletFacade.canBuyMore$;
    this.loadingButton$ = this.walletFacade.loadingButton$;
    this.tokensSoldPerStage$ = this.walletFacade.tokensSoldPerStage$;
    this.allTokensPerStage$ = this.walletFacade.allTokensPerStage$;
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      amount: new FormControl('', [Validators.required, Validators.min(1)]),
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

  onTokensSold(): void {
    this.presale = false;
    this.sold = true;
  }

  connect(): void {
    this.walletFacade.showWallets();
  }

  calcMaxNumberOfAdria() {
    this.usdcPerStage$
      .pipe(
        map((numberOfUsdc) => this.appConfig.maxNumberOfUsdcPerStage - Number(numberOfUsdc))
      )
      .subscribe((result) => {
        this.maxUsdcToBuy = result;
      });
  }
}
