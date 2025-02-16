import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import {
    getAllActiveTopics,
    getAllHistoricTopics,
    signMessageForDao } from '../state/dao.actions';
import * as DaoSelectors from '../state/dao.selectors';
import { Observable } from 'rxjs';
import { DaoTopic } from '@crypto-mayhem-frontend/crypto-mayhem/data-access/dao-model';

@Injectable({ providedIn: 'root' })
export class DAOFacade {
    public daoAllActiveTopics$: Observable<DaoTopic[]>;
    public daoAllHistoricTopics$: Observable<DaoTopic[]>;
    public daoSmallSpinnerActive$: Observable<boolean>;
    public daoLargeSpinnerActive$: Observable<boolean>;
    public daoSmallSpinnerHistoric$: Observable<boolean>;
    public daoLargeSpinnerHistoric$: Observable<boolean>;
    public daoHistoryTopicById$: (id: number) => Observable<DaoTopic | undefined>;
    public daoVotingSuccess$: Observable<boolean>;

    constructor(
        private readonly store: Store,
    ) 
    {
        this.daoAllActiveTopics$ = this.store.select(DaoSelectors.selectAllActiveTopics);
        this.daoAllHistoricTopics$ = this.store.select(DaoSelectors.selectAllHistoricTopics);
        this.daoSmallSpinnerActive$ = this.store.select(DaoSelectors.selectDaoSmallSpinnerActive);
        this.daoLargeSpinnerActive$ = this.store.select(DaoSelectors.selectDaoLargeSpinnerActive);
        this.daoSmallSpinnerHistoric$ = this.store.select(DaoSelectors.selectDaoSmallSpinnerHistoric);
        this.daoLargeSpinnerHistoric$ = this.store.select(DaoSelectors.selectDaoLargeSpinnerHistoric);
        this.daoHistoryTopicById$ = (id: number) => this.store.select(DaoSelectors.selectDaoHistoryTopicById(id));
        this.daoVotingSuccess$ = this.store.select(DaoSelectors.selectDaoVotingSuccess);
    }

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
