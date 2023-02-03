import { DaoTopic } from "@crypto-mayhem-frontend/crypto-mayhem/data-access/dao-model";
import { Action, createReducer, on } from "@ngrx/store";

import * as DaoActions from "./dao.actions";

export const daoKey = 'dao';

export interface DaoState {
    daoTopics: DaoTopic[];
    daoTopicHistory: DaoTopic[];
    spinnerSmall: boolean;
    spinnerLarge: boolean;
}

export const initialState: DaoState = {
    daoTopics: [],
    daoTopicHistory: [],
    spinnerSmall: false,
    spinnerLarge: false
};

export const daoReducer = createReducer(
    initialState,
    on(DaoActions.getAllActiveTopicsSuccess, (state, { topics }) => ({
        ...state,
        daoTopics: topics
    })),
    on(DaoActions.getAllHistoricTopicsSuccess, (state, { topics }) => ({
        ...state,
        daoTopicHistory: [...topics]
    })),
    on(DaoActions.showDaoSmallSpinner, (state) => ({
        ...state,
        spinnerSmall: true
    })),
    on(DaoActions.hideDaoSmallSpinner, (state) => ({
        ...state,
        spinnerSmall: false
    })),
    on(DaoActions.showDaoLargeSpinner, (state) => ({
        ...state,
        spinnerLarge: true
    })),
    on(DaoActions.hideDaoLargeSpinner, (state) => ({
        ...state,
        spinnerLarge: false
    }))
    );

export function reducer(state: DaoState | undefined, action: Action) {
    return daoReducer(state, action);
}