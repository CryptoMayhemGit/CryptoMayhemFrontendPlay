import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { select } from "@ngrx/store";
import * as fromVesting from '../state/vesting.reducer';
import * as VestingSelectors from '../state/vesting.selectors';

import { selectAppSignedIn } from '../state/vesting.selectors';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VestingFacade {
    public signedIn$: Observable<string>;
    public vestingLargeSpinnerActive$: Observable<boolean>;

    constructor(
        private readonly store: Store<fromVesting.VestingState>,
    )
    {
        this.signedIn$ = this.store.pipe(select(selectAppSignedIn));
        this.vestingLargeSpinnerActive$ = this.store.select(VestingSelectors.selectVestingLargeSpinnerActive);
    }
}