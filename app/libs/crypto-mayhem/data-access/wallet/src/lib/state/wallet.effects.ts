import { Injectable } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from "@ngrx/store";
import { map, mergeMap } from "rxjs";
import { WalletService } from "../services/wallet.service";

import * as WalletActions from '../state/wallet.actions';
import * as WalletSelectors from '../state/wallet.selectors';

@Injectable({ providedIn: 'root'})
export class WalletEffects {
    constructor(
        private readonly actions$: Actions,
        private readonly store: Store,
        private readonly walletService: WalletService
    ) {}

    buyPresaleTokens$ = createEffect(() =>
        this.actions$.pipe(
            ofType(WalletActions.postBuyPreSaleTokens),
            concatLatestFrom(() => this.store.select(WalletSelectors.getAccount)),
            mergeMap(([{amount}, account],) =>
            this.walletService.postBuyPreSaleTokens(amount, account)
            .pipe(
                map((result: any) => {
                    this.walletService.signWalletTransaction(result);
                    return WalletActions.postBuyPreSaleTokensSuccess({sign: result});
                })
            ))
    ));
}