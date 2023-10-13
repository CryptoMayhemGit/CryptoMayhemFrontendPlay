import { Action, createReducer, on} from "@ngrx/store";

export const vestingKey = 'vesting';

import * as VestingActions from "./vesting.actions";

export interface VestingState {
    blockedTokens: string;
    spinnerLargeActive: boolean;
}

export const initialState: VestingState = {
    blockedTokens: "0",
    spinnerLargeActive: false
};

export const vestingReducer = createReducer(
    initialState,
    on(VestingActions.getBlockedTokensSuccess, (state, { result }) => ({
        ...state, blockedTokens: result
    })),
    on(VestingActions.showVestingLargeSpinnerActive, (state) => ({
        ...state,
        spinnerLargeActive: true
    })),
    on(VestingActions.hideVestingLargeSpinnerActive, (state) => ({
        ...state,
        spinnerLargeActive: false
    })),
    );

export function reducer(state: VestingState | undefined, action: Action) {
    return vestingReducer(state, action);
}