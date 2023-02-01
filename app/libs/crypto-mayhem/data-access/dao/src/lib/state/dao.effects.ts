import { Inject, Injectable } from '@angular/core';
import { AppConfig, APP_CONFIG } from '@crypto-mayhem-frontend/crypto-mayhem/config';
import { NotificationsService } from '@crypto-mayhem-frontend/crypto-mayhem/data-access/notification-drone';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, from, map, mergeMap, of, switchMap } from 'rxjs';
import { DAOService } from '../services/dao.service';
import { WalletService } from '@crypto-mayhem-frontend/crypto-mayhem/data-access/wallet';
import { SetVoteRequest, SignData } from '@crypto-mayhem-frontend/crypto-mayhem/data-access/dao-model';

import * as DAOActions from './dao.actions';
import * as WalletSelectors from '../../../../wallet/src/lib/state/wallet.selectors';

@Injectable({ providedIn: 'root' })
export class DAOEffects {
    constructor(
        private readonly actions$: Actions,
        private readonly store: Store,
        private readonly daoService: DAOService,
        private readonly walletService: WalletService,
        private readonly notificationsService: NotificationsService,
        @Inject(APP_CONFIG) private readonly appConfig: AppConfig
    ) {}

    getAllActiveTopics$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DAOActions.getAllActiveTopics),
            concatLatestFrom(() => [
                this.store.select(WalletSelectors.getAccount),
                this.store.select(WalletSelectors.getLanguage),
            ]),
            switchMap(([,wallet, lang]) =>
                this.daoService.getDaoAllActiveTopics(wallet, lang).pipe(
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
            concatLatestFrom(() => this.store.select(WalletSelectors.getLanguage)),
            switchMap(([{skip, take}, localization]) =>
                this.daoService.getAllHistoricTopics(skip, take, localization).pipe(
                    map((response) => response.topics),
                    map((topics) => DAOActions.getAllHistoricTopicsSuccess({ topics })),
                    catchError((error) => of(DAOActions.getAllHistoricTopicsFailure({ error })))
                )
            )
        )
    );

    signMessageForDao$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DAOActions.signMessageForDao),
      mergeMap(({messages}) => from(this.walletService.signMessage(messages)).pipe(
          map((dataAndSignedMessage) => DAOActions.signMessageForDaoSuccess({ dataAndSignedMessage })),
        ))
    )
  );

    postDaoVoteWithSignature$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DAOActions.signMessageForDaoSuccess),
            concatLatestFrom(() => this.store.select(WalletSelectors.getAccount)),
            map(([{dataAndSignedMessage}, wallet]) => {
                const signData: SignData = {
                    topicId: parseInt(dataAndSignedMessage[0], 10),
                    answerId: parseInt(dataAndSignedMessage[1], 10),
                    nonce: parseInt(dataAndSignedMessage[2], 10),
                };

                const setVoteRequest: SetVoteRequest = {
                    wallet: wallet,
                    signedMessage: dataAndSignedMessage[3],
                    signData: signData,
                }

                return setVoteRequest;
            }),
            switchMap((setVoteRequest) =>
                this.daoService.postDaoVoteWithSignature(setVoteRequest).pipe(
                    map(() => DAOActions.postDaoVoteWithSignatureSuccess()),
                    catchError((error) => of(DAOActions.postDaoVoteWithSignatureFailure({ error })))
                )
            )
        )
    );
}