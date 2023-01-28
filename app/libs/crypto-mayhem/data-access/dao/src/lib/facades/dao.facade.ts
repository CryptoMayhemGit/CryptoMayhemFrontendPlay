import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { getAllActiveTopics, getAllHistoricTopics } from '../state/dao.actions';
import * as DaoSelectors from '../state/dao.selectors';

@Injectable({ providedIn: 'root' })
export class DAOFacade {
    readonly daoAllActiveTopics$ = this.store.select(DaoSelectors.selectAllActiveTopics);
    readonly daoAllHistoricTopics$ = this.store.select(DaoSelectors.selectAllHistoricTopics);
    constructor(
        private readonly store: Store,
    ) {}

    public getDaoAllActiveTopics() {
        this.store.dispatch(getAllActiveTopics());
    }

    public getDaoAllHistoricTopics(skip: number, take: number) {
        this.store.dispatch(getAllHistoricTopics({ skip, take }));
    }
}