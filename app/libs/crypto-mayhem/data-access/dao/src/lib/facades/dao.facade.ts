import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import {
    getAllActiveTopics,
    getAllHistoricTopics,
    signMessageForDao } from '../state/dao.actions';
import * as DaoSelectors from '../state/dao.selectors';

@Injectable({ providedIn: 'root' })
export class DAOFacade {
    readonly daoAllActiveTopics$ = this.store.select(DaoSelectors.selectAllActiveTopics);
    readonly daoAllHistoricTopics$ = this.store.select(DaoSelectors.selectAllHistoricTopics);
    readonly daoSmallSpinnerActive$ = this.store.select(DaoSelectors.selectDaoSmallSpinnerActive);
    readonly daoLargeSpinnerActive$ = this.store.select(DaoSelectors.selectDaoLargeSpinnerActive);
    readonly daoSmallSpinnerHistoric$ = this.store.select(DaoSelectors.selectDaoSmallSpinnerHistoric);
    readonly daoLargeSpinnerHistoric$ = this.store.select(DaoSelectors.selectDaoLargeSpinnerHistoric);
    readonly daoHistoryTopicById$ = (id: number) => this.store.select(DaoSelectors.selectDaoHistoryTopicById(id));
    readonly daoVotingSuccess$ = this.store.select(DaoSelectors.selectDaoVotingSuccess);

    constructor(
        private readonly store: Store,
    ) {}

    public getDaoAllActiveTopics() {
        this.store.dispatch(getAllActiveTopics());
    }

    public getDaoAllHistoricTopics(skip: number, take: number) {
        this.store.dispatch(getAllHistoricTopics({ skip, take }));
    }

    public getDaoHistoryTopicById(id: number) {
        return this.daoHistoryTopicById$(id);
    }

    public signMessageForDao(...messages: string[]): void {
        this.store.dispatch(signMessageForDao({ messages }));
    }

    public postDaoVoteWithSignature(topicId: number, answerId: number, nonce: number): void {
        this.signMessageForDao(topicId.toString(), answerId.toString(), nonce.toString());
    }
}
