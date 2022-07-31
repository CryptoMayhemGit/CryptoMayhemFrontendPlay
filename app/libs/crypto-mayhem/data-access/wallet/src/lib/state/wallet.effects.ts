import { Inject, Injectable } from '@angular/core';
import { AppConfig, APP_CONFIG } from '@crypto-mayhem-frontend/crypto-mayhem/config';
import { NotificationDroneService } from '@crypto-mayhem-frontend/crypto-mayhem/data-access/notification-drone';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, from, map, mergeMap, of } from 'rxjs';
import { WalletService } from '../services/wallet.service';

import * as WalletActions from '../state/wallet.actions';
import * as WalletSelectors from '../state/wallet.selectors';

@Injectable({ providedIn: 'root' })
export class WalletEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly store: Store,
    private readonly walletService: WalletService,
    private readonly notificationDroneService: NotificationDroneService,
    @Inject(APP_CONFIG) private readonly appConfig: AppConfig
  ) {}

  buyPresaleTokens$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WalletActions.postSignWalletBeforeBuy),
      concatLatestFrom(() => this.store.select(WalletSelectors.getAccount)),
      mergeMap(([{ amount }, account]) =>
        this.walletService.postSignWalletBeforeBuy(amount, account).pipe(
          map((result: any) => {
            this.walletService.signWalletTransaction(result);
            return WalletActions.postSignWalletBeforeBuySuccess({
              sign: result,
            });
          }),
          catchError((error) => {
            switch (error.error.code) {
              case ResponseErrorCodes.TOKEN_ZERO_AMOUNT:
                this.notificationDroneService.error(
                  'NOTIFICATIONS.ERROR_OCCURRED',
                  'NOTIFICATIONS.TOKEN_ZERO_AMOUNT',
                  'NOTIFICATIONS.TRY_AGAIN'
                );
                break;
              case ResponseErrorCodes.TOKENS_GREATER_THAN_MAX:
                this.notificationDroneService.error(
                  'NOTIFICATIONS.ERROR_OCCURRED',
                  'NOTIFICATIONS.TOKENS_GREATER_THAN_MAX',
                  'NOTIFICATIONS.TRY_AGAIN'
                );
                break;
              case ResponseErrorCodes.WALLET_WRONG_STRUCTURE:
                this.notificationDroneService.error(
                  'NOTIFICATIONS.ERROR_OCCURRED',
                  'NOTIFICATIONS.WALLET_WRONG_STRUCTURE',
                  'NOTIFICATIONS.TRY_AGAIN'
                );
                break;
              case ResponseErrorCodes.ALL_TOKENS_PURCHASED:
                this.notificationDroneService.error(
                  'NOTIFICATIONS.ERROR_OCCURRED',
                  'NOTIFICATIONS.ALL_TOKENS_PURCHASED',
                  'NOTIFICATIONS.TRY_AGAIN'
                );
                break;
              case ResponseErrorCodes.NOT_ENOUGH_TOKENS_LEFT:
                this.notificationDroneService.error(
                  'NOTIFICATIONS.ERROR_OCCURRED',
                  'NOTIFICATIONS.NOT_ENOUGH_TOKENS_LEFT',
                  'NOTIFICATIONS.TRY_AGAIN'
                );
                break;
              case ResponseErrorCodes.CANT_COMMUNICATE_WITH_SMART_CONTRACT:
                this.notificationDroneService.error(
                  'NOTIFICATIONS.ERROR_OCCURRED',
                  'NOTIFICATIONS.CANT_COMMUNICATE_WITH_SMART_CONTRACT',
                  'NOTIFICATIONS.TRY_AGAIN'
                );
                break;
              case ResponseErrorCodes.WALLET_NOT_AUTHORIZED:
                this.notificationDroneService.error(
                  'NOTIFICATIONS.ERROR_OCCURRED',
                  'NOTIFICATIONS.WALLET_NOT_AUTHORIZED',
                  'NOTIFICATIONS.TRY_AGAIN'
                );
                break;
              default:
                break;
            }
            return of();
          })
        )
      ),
    )
  );

  getUsdcNumberPerStage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WalletActions.connectWalletSuccess, WalletActions.buyAdriaSuccess),
      concatLatestFrom(() => this.store.select(WalletSelectors.getAccount)),
      mergeMap(([, account]) =>
        from(this.walletService.getNumberOfUsdcPerStageByUser(account)).pipe(
          map((numberOfUsdc: any) => {
            const showSummary = this.appConfig.maxNumberOfUsdcPerStage - numberOfUsdc === this.appConfig.maxNumberOfUsdcPerStage ? false : true;
            const numberOfAdria = numberOfUsdc / this.appConfig.adriaPrice;
            const canBuyMore = this.appConfig.maxNumberOfUsdcPerStage <= numberOfUsdc ? false : true;
            return WalletActions.usdcPerStageByUser({ numberOfUsdc, numberOfAdria, showSummary, canBuyMore });
          })
        )
      )
    )
  );

  loadingButton$ = createEffect(() =>
  this.actions$.pipe(
    ofType(WalletActions.buyAdriaSuccess),
    concatLatestFrom(() => this.store.select(WalletSelectors.getAccount)),
    map(() =>
      {
        return WalletActions.transactionSuccess();
      }
    )
  )
);

  hidePresaleSummary$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WalletActions.disconnectWallet),
      concatLatestFrom(() => this.store.select(WalletSelectors.getAccount)),
      map(() =>
        {
          return WalletActions.hideSummary()
        }
      )
    )
  );
}

export enum ResponseErrorCodes {
  TOKEN_ZERO_AMOUNT = 'TOKENS_ZERO_AMOUNT',
  TOKENS_GREATER_THAN_MAX = 'TOKENS_GREATER_THAN_MAX',
  WALLET_WRONG_STRUCTURE = 'WALLET_WRONG_STRUCTURE',
  ALL_TOKENS_PURCHASED = 'ALL_TOKENS_PURCHASED',
  NOT_ENOUGH_TOKENS_LEFT = 'NOT_ENOUGH_TOKENS_LEFT',
  CANT_COMMUNICATE_WITH_SMART_CONTRACT = 'CANT_COMMUNICATE_WITH_SMART_CONTRACT',
  WALLET_NOT_AUTHORIZED = 'WALLET_NOT_AUTHORIZED',
}
