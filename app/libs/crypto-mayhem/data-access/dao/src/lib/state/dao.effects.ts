import { Inject, Injectable } from '@angular/core';
import { AppConfig, APP_CONFIG } from '@crypto-mayhem-frontend/crypto-mayhem/config';
import { NotificationsService } from '@crypto-mayhem-frontend/crypto-mayhem/data-access/notification-drone';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, of, switchMap } from 'rxjs';
import { DAOService } from '../services/dao.service';

import * as DAOActions from './dao.actions';

@Injectable({ providedIn: 'root' })
export class DAOEffects {
    constructor(
        private readonly actions$: Actions,
        private readonly store: Store,
        private readonly daoService: DAOService,
        private readonly notificationsService: NotificationsService,
        @Inject(APP_CONFIG) private readonly appConfig: AppConfig
    ) {}

    getAllActiveTopics$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DAOActions.getAllActiveTopics),
            switchMap(() =>
                this.daoService.getDaoAllActiveTopics().pipe(
                    map((response) => response.topics),
                    map((topics) => DAOActions.getAllActiveTopicsSuccess({ topics })),
                    catchError((error) => of(DAOActions.getAllActiveTopicsFailure({ error })))
                )
            )
        )
    );

    getAllHistoricTopics$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DAOActions.getAllHistoricTopics),
            switchMap(({skip, take}) =>
                this.daoService.getAllHistoricTopics(skip, take).pipe(
                    map((response) => response.topics),
                    map((topics) => DAOActions.getAllHistoricTopicsSuccess({ topics })),
                    catchError((error) => of(DAOActions.getAllHistoricTopicsFailure({ error })))
                )
            )
        )
    );
}