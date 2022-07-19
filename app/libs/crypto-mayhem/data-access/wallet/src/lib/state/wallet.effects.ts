import { Injectable } from "@angular/core";
import { getWalletInstance, WalletType } from "@crypto-mayhem-frontend/crypto-mayhem/data-access/wallet-model";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, map, mergeMap } from "rxjs";

import * as WalletActions from '../state/wallet.actions';

@Injectable({ providedIn: 'root'})
export class WalletEffects {
    constructor(
        private readonly actions$: Actions,
    ) {}

    // connectWallet$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(WalletActions.connectWallet),
    //         mergeMap(({walletType}) =>
    //             from(new Promise( resolve => resolve(getWalletInstance(walletType)?.connect())))
    //             .pipe(
    //                 map(() => {
    //                     return WalletActions.connectWalletSuccess()
    //                 })
    //             )
    //         )
    //     )
    // );
}