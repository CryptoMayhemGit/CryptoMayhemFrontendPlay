import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { setWalletAddress } from "../state/wallet.actions";

import * as WalletSelectors from '../state/wallet.selectors';

@Injectable({providedIn: 'root'})
export class WalletFacade {

    readonly wallet$ = this.store.select(WalletSelectors.getWalletAddress);

    constructor(
        private readonly store: Store,
    ) {}

    setWalletAddress(walletAddress: string) {
        this.store.dispatch(setWalletAddress({walletAddress}));
    }
}