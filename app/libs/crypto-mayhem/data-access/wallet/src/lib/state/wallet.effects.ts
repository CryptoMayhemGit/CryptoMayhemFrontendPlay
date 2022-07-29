import { Injectable } from "@angular/core";
import { NotificationDroneService } from "@crypto-mayhem-frontend/crypto-mayhem/data-access/notification-drone";
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from "@ngrx/store";
import { catchError, from, map, mergeMap, of } from "rxjs";
import { WalletService } from "../services/wallet.service";

import * as WalletActions from '../state/wallet.actions';
import * as WalletSelectors from '../state/wallet.selectors';

@Injectable({ providedIn: 'root'})
export class WalletEffects {
    constructor(
        private readonly actions$: Actions,
        private readonly store: Store,
        private readonly walletService: WalletService,
        private readonly notificationDroneService: NotificationDroneService
    ) {}

    buyPresaleTokens$ = createEffect(() =>
        this.actions$.pipe(
            ofType(WalletActions.postSignWalletBeforeBuy),
            concatLatestFrom(() => this.store.select(WalletSelectors.getAccount)),
            mergeMap(([{amount}, account],) =>
            this.walletService.postSignWalletBeforeBuy(amount, account)
            .pipe(
                map((result: any) => {
                    this.walletService.signWalletTransaction(result);
                    return WalletActions.postSignWalletBeforeBuySuccess({sign: result});
                }),
            )),
            catchError((error) => {
                switch (error.error.code) {
                    case ResponseErrorCodes.TOKENS_GREATER_THAN_MAX:
                        this.notificationDroneService.error('POLISH')
                        break;
                    case ResponseErrorCodes.WALLET_WRONG_STRUCTURE:
                        this.notificationDroneService.error('POLISH')
                        break;
                    case ResponseErrorCodes.ALL_TOKENS_PURCHASED:
                        this.notificationDroneService.error('POLISH')
                        break;
                    case ResponseErrorCodes.NOT_ENOUGH_TOKENS_LEFT:
                        this.notificationDroneService.error('POLISH')
                        break;
                    case ResponseErrorCodes.CANT_COMMUNICATE_WITH_SMART_CONTRACT:
                        this.notificationDroneService.error('POLISH')
                        break;
                    case ResponseErrorCodes.WALLET_NOT_AUTHORIZED:
                        this.notificationDroneService.error('POLISH')
                        break;
                    default:
                        break;
                }
                return of();
            })
    ));

    getUsdcNumberPerStage$ = createEffect(() =>
     this.actions$.pipe(
        ofType(WalletActions.connectWalletSuccess),
        concatLatestFrom(() => this.store.select(WalletSelectors.getAccount)),
        mergeMap(([, account],) =>
            from(this.walletService.getNumberOfUsdcPerStageByUser(account))
            .pipe(
                map((result: any) => {
                    return WalletActions.usdcPerStageByUser({numberOfUsdc: result});
                })
            ))
    ))
}

export enum ResponseErrorCodes {
    TOKEN_ZERO_AMOUNT = 'TOKENS_ZERO_AMOUNT',
    TOKENS_GREATER_THAN_MAX = 'TOKENS_GREATER_THAN_MAX',
    WALLET_WRONG_STRUCTURE = 'WALLET_WRONG_STRUCTURE',
    ALL_TOKENS_PURCHASED = 'ALL_TOKENS_PURCHASED',
    NOT_ENOUGH_TOKENS_LEFT = 'NOT_ENOUGH_TOKENS_LEFT',
    CANT_COMMUNICATE_WITH_SMART_CONTRACT = 'CANT_COMMUNICATE_WITH_SMART_CONTRACT',
    WALLET_NOT_AUTHORIZED = 'WALLET_NOT_AUTHORIZED'
}