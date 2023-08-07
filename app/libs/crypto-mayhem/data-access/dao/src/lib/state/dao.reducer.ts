import { DaoTopic } from "@crypto-mayhem-frontend/crypto-mayhem/data-access/dao-model";
import { Action, createReducer, on } from "@ngrx/store";

import * as DaoActions from "./dao.actions";

export const daoKey = 'dao';

export interface DaoState {
    daoTopics: DaoTopic[];
    daoTopicHistory: DaoTopic[];
    spinnerSmallActive: boolean;
    spinnerLargeActive: boolean;
    spinnerSmallHistoric: boolean;
    spinnerLargeHistoric: boolean;
    votingSuccess: boolean;
}

export const initialState: DaoState = {
    daoTopics: [],
    daoTopicHistory: [],
    spinnerSmallActive: false,
    spinnerLargeActive: false,
    spinnerSmallHistoric: false,
    spinnerLargeHistoric: false,
    votingSuccess: false
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
    on(DaoActions.showDaoSmallSpinnerActive, (state) => ({
        ...state,
        spinnerSmallActive: true
    })),
    on(DaoActions.hideDaoSmallSpinnerActive, (state) => ({
        ...state,
        spinnerSmallActive: false
    })),
    on(DaoActions.showDaoLargeSpinnerActive, (state) => ({
        ...state,
        spinnerLargeActive: true
    })),
    on(DaoActions.hideDaoLargeSpinnerActive, (state) => ({
        ...state,
        spinnerLargeActive: false
    })),
    on(DaoActions.showDaoSmallSpinnerHistoric, (state) => ({
        ...state,
        spinnerSmallHistoric: true
    })),
    on(DaoActions.hideDaoSmallSpinnerHistoric, (state) => ({
        ...state,
        spinnerSmallHistoric: false
    })),
    on(DaoActions.showDaoLargeSpinnerHistoric, (state) => ({
        ...state,
        spinnerLargeHistoric: true
    })),
    on(DaoActions.hideDaoLargeSpinnerHistoric, (state) => ({
        ...state,
        spinnerLargeHistoric: false
    })),
    on(DaoActions.postDaoVoteWithSignatureSuccess, (state) => ({
        ...state,
        votingSuccess: true
    })),
    );

export function reducer(state: DaoState | undefined, action: Action) {
    return daoReducer(state, action);
}