import { createAction, props } from "@ngrx/store";

export const getBlockedTokens = createAction(
    '[Vesting] Get Blocked Tokens'
);

export const getBlockedTokensSuccess = createAction(
    '[Vesting] Get Blocked Tokens Success',
    props<{ result: string }>()
  );

export const getBlockedTokensFailure = createAction(
    '[Vesting] Get Blocked Tokens Failure',
    props<{ error: any }>()
);

export const showVestingLargeSpinnerActive = createAction(
    '[Vesting] Show Large Spinner Active'
);

export const hideVestingLargeSpinnerActive = createAction(
    '[Vesting] Hide Large Spinner Active'
);