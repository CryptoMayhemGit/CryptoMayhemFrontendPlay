import { Injectable } from "@angular/core";
import { getWalletInstance, WalletType } from "@crypto-mayhem-frontend/crypto-mayhem/data-access/wallet-model";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap } from "rxjs";

import * as WalletActions from '../state/wallet.actions';

@Injectable({ providedIn: 'root'})
export class WalletEffects {
    constructor(
        private readonly actions$: Actions,
    ) {}
}