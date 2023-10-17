import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { select } from "@ngrx/store";
import * as fromVesting from '../state/vesting.reducer';
import * as VestingSelectors from '../state/vesting.selectors';

import { selectAppSignedIn } from '../state/vesting.selectors';

@Injectable({ providedIn: 'root' })
export class VestingFacade {
    signedIn$ = this.store.pipe(select(selectAppSignedIn));
    readonly vestingLargeSpinnerActive$ = this.store.select(VestingSelectors.selectVestingLargeSpinnerActive);

    constructor(
        private readonly store: Store<fromVesting.VestingState>,
    ) {
    }
}