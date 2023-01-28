import { DaoTopic } from "@crypto-mayhem-frontend/crypto-mayhem/data-access/dao-model";
import { Action, createReducer, on } from "@ngrx/store";

import * as DaoActions from "./dao.actions";

export const daoKey = 'dao';

export interface DaoState {
    daoTopics: DaoTopic[];
    daoTopicHistory: DaoTopic[];
}

export const initialState: DaoState = {
    daoTopics: [],
    daoTopicHistory: []
};

export const daoReducer = createReducer(
    initialState,
    on(DaoActions.getAllActiveTopicsSuccess, (state, { topics }) => ({
        ...state,
        daoTopics: topics
    })),
    on(DaoActions.getAllHistoricTopicsSuccess, (state, { topics }) => ({
        ...state,
        daoTopicHistory: topics
    })));

export function reducer(state: DaoState | undefined, action: Action) {
    return daoReducer(state, action);
}