import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromVesting from './vesting.reducer';

export const selectVesting = createFeatureSelector<fromVesting.VestingState>(fromVesting.vestingKey);

export const selectAppSignedIn = createSelector(
  selectVesting,
  (state) => state.blockedTokens
);

export const selectVestingLargeSpinnerActive = createSelector(
  selectVesting,
    (state) => state.spinnerLargeActive
);