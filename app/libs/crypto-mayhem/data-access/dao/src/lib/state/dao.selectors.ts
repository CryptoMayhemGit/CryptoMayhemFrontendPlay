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

export const selectDaoSmallSpinner = createSelector(
    selectDao,
    (state) => state.spinnerSmall
);

export const selectDaoLargeSpinner = createSelector(
    selectDao,
    (state) => state.spinnerLarge
);

export const selectDaoVotingSuccess = createSelector(
    selectDao,
    (state) => state.votingSuccess
);