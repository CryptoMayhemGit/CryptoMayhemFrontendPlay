import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromDao from './dao.reducer';

export const selectDao = createFeatureSelector<fromDao.DaoState>(fromDao.daoKey);

export const selectAllActiveTopics = createSelector(
    selectDao,
    (state) => state.daoTopics
);
export const selectAllHistoricTopics = createSelector(
    selectDao,
    (state) => state.daoTopicHistory
);

export const selectDaoHistoryTopicById = (id: number) => createSelector(
    selectDao,
    (state) => state.daoTopicHistory.find(topic => topic.id === id)
);

export const selectDaoSmallSpinnerActive = createSelector(
    selectDao,
    (state) => state.spinnerSmallActive
);

export const selectDaoLargeSpinnerActive = createSelector(
    selectDao,
    (state) => state.spinnerLargeActive
);

export const selectDaoSmallSpinnerHistoric = createSelector(
    selectDao,
    (state) => state.spinnerSmallHistoric
);

export const selectDaoLargeSpinnerHistoric = createSelector(
    selectDao,
    (state) => state.spinnerLargeHistoric
);

export const selectDaoVotingSuccess = createSelector(
    selectDao,
    (state) => state.votingSuccess
);